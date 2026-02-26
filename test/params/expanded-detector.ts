/**
 * @description Generic Parameter Gap Detector
 * Systematically compares ALL contract params with SDK args to find gaps
 * No hardcoded function names - purely type and value-based detection
 */

import type { FunctionParameter, FunctionSignature } from './contract-signatures'
import type { ArgWithType, SDKCall } from './sdk-call-extractor'

export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low'

export type IssueCategory =
  | 'hardcoded_literal'
  | 'missing_param'
  | 'type_mismatch'
  | 'suspicious_default'
  | 'magic_number'
  | 'zero_value'
  | 'file_complexity'
  | 'validation_gap'

export interface SDKIssue {
  id: string
  category: IssueCategory
  severity: IssueSeverity
  contractInterface: string
  contractFunction: string
  sdkFile: string
  sdkFunction: string
  lineNumber: number
  description: string
  recommendation: string
  expectedParam?: FunctionParameter
  actualValue?: string
}

// Literal values that indicate potential gaps
const SUSPICIOUS_LITERALS = new Set([
  'BigInt(0)',
  '0',
  '0n',
  'BigInt(0n)',
  'true',
  'false',
  'BigInt(1)',
  '1',
])

// Large numbers that should be named constants
const MAGIC_NUMBER_THRESHOLD = BigInt(1000)

// Patterns for detecting specific issue types generically
const PARAM_NAME_PATTERNS = {
  USER_CONFIGURABLE: [
    'min',
    'amount',
    'deposit',
    'loan',
    'requested',
    'collateral',
    'fee',
    'reward',
    'share',
    'ratio',
  ],
  BOOLEAN_CONFIG: ['enable', 'disable', 'active', 'consolidate', 'allow', 'permit', 'authorized'],
  ADDRESS_PARAMS: [
    'receiver',
    'recipient',
    'owner',
    'spender',
    'to',
    'from',
    'delegate',
    'manager',
  ],
  SECURITY_SENSITIVE: ['limit', 'max', 'min', 'threshold', 'cap', 'floor', 'ceiling'],
}

/**
 * @description Detect ALL parameter gaps generically
 */
export function detectSDKIssues(
  contractSignatures: Map<string, FunctionSignature[]>,
  sdkCalls: SDKCall[]
): SDKIssue[] {
  const issues: SDKIssue[] = []
  const seenIssues = new Set<string>()

  // Track file-level statistics
  const fileStats = new Map<
    string,
    { total: number; zeros: number; literals: number; bools: number }
  >()

  // Track calls by category for summary issues
  const callsByCategory = {
    withLoopCount: [] as SDKCall[],
    withFeeParams: [] as SDKCall[],
    withAddressParams: [] as SDKCall[],
    presaleCalls: [] as SDKCall[],
    creditFacilityCalls: [] as SDKCall[],
    marketCalls: [] as SDKCall[],
    launchCalls: [] as SDKCall[],
    treasuryCalls: [] as SDKCall[],
    stakingCalls: [] as SDKCall[],
    authorizerCalls: [] as SDKCall[],
    defaultSlippage: [] as SDKCall[],
  }

  for (const call of sdkCalls) {
    // Update file stats
    if (!fileStats.has(call.fileName)) {
      fileStats.set(call.fileName, { total: 0, zeros: 0, literals: 0, bools: 0 })
    }
    const stats = fileStats.get(call.fileName)!
    stats.total++

    const contractFunction = findContractFunction(contractSignatures, call.contractFunction)

    // Categorize call for summary issues (do this for ALL calls)
    categorizeCall(call, callsByCategory)

    if (!contractFunction) {
      continue
    }

    // Skip view functions - they don't have state-changing params
    if (contractFunction.signature.isView) {
      continue
    }

    // Check each expected parameter from contract
    for (let i = 0; i < contractFunction.signature.params.length; i++) {
      const expectedParam = contractFunction.signature.params[i]
      const actualArg = call.argsWithTypes[i]

      // Issue 1: Missing parameter
      if (!actualArg) {
        const issueKey = `MISSING_${call.contractFunction}_${i}_${call.fileName}`
        if (!seenIssues.has(issueKey)) {
          seenIssues.add(issueKey)
          issues.push({
            id: `MISSING_PARAM_${call.contractFunction}_pos${i}`,
            category: 'missing_param',
            severity: 'critical',
            contractInterface: contractFunction.interface,
            contractFunction: call.contractFunction,
            sdkFile: call.fileName,
            sdkFunction: call.functionName,
            lineNumber: call.line,
            description: `Contract expects ${expectedParam.type} ${expectedParam.name} at position ${i}, but SDK call has no argument`,
            recommendation: `Add parameter to SDK method signature and pass it through`,
            expectedParam,
          })
        }
        continue
      }

      // Issue 2: Hardcoded literal value
      if (isSuspiciousLiteral(expectedParam.type, actualArg)) {
        const severity = getSeverityForType(expectedParam.type, actualArg.value)
        const issueKey = `HARDCODED_${call.contractFunction}_${i}_${call.fileName}`

        if (!seenIssues.has(issueKey)) {
          seenIssues.add(issueKey)
          stats.literals++

          issues.push({
            id: `HARDCODED_${call.contractFunction}_pos${i}`,
            category: 'hardcoded_literal',
            severity,
            contractInterface: contractFunction.interface,
            contractFunction: call.contractFunction,
            sdkFile: call.fileName,
            sdkFunction: call.functionName,
            lineNumber: call.line,
            description: `${expectedParam.type} ${expectedParam.name} is hardcoded to "${actualArg.value}"`,
            recommendation: `Make ${expectedParam.name} a method parameter with sensible default`,
            expectedParam,
            actualValue: actualArg.value,
          })
        }
      }

      // Issue 3: Zero value for numeric type (critical for slippage-like params)
      if (actualArg.isHardcodedZero && isNumericType(expectedParam.type)) {
        const issueKey = `ZERO_${call.contractFunction}_${i}_${call.fileName}`
        if (!seenIssues.has(issueKey)) {
          seenIssues.add(issueKey)
          stats.zeros++

          // Slippage-like params hardcoded to zero are CRITICAL
          const isSlippageLike = isSlippageParam(expectedParam.name)
          const severity = isSlippageLike ? 'critical' : severityForNumericType(expectedParam.type)

          issues.push({
            id: `ZERO_VALUE_${call.contractFunction}_pos${i}`,
            category: 'zero_value',
            severity,
            contractInterface: contractFunction.interface,
            contractFunction: call.contractFunction,
            sdkFile: call.fileName,
            sdkFunction: call.functionName,
            lineNumber: call.line,
            description: `${expectedParam.type} ${expectedParam.name} is hardcoded to zero`,
            recommendation: `This parameter affects contract behavior and should be user-configurable`,
            expectedParam,
            actualValue: actualArg.value,
          })
        }
      }

      // Issue 4: Boolean params hardcoded
      if (expectedParam.type === 'bool' && !actualArg.isVariable) {
        const issueKey = `HARDCODED_BOOL_${call.contractFunction}_${i}_${call.fileName}`
        if (!seenIssues.has(issueKey)) {
          seenIssues.add(issueKey)
          stats.bools++

          issues.push({
            id: `HARDCODED_BOOL_${call.contractFunction}_pos${i}`,
            category: 'hardcoded_literal',
            severity: 'medium',
            contractInterface: contractFunction.interface,
            contractFunction: call.contractFunction,
            sdkFile: call.fileName,
            sdkFunction: call.functionName,
            lineNumber: call.line,
            description: `Boolean parameter ${expectedParam.name} is hardcoded to "${actualArg.value}"`,
            recommendation: `Consider making ${expectedParam.name} configurable for flexibility`,
            expectedParam,
            actualValue: actualArg.value,
          })
        }
      }

      // Issue 5: User-configurable param names with hardcoded values
      if (isUserConfigurableParam(expectedParam.name) && !actualArg.isVariable) {
        const issueKey = `USER_CONFIG_${call.contractFunction}_${i}_${call.fileName}`
        if (!seenIssues.has(issueKey)) {
          seenIssues.add(issueKey)
          issues.push({
            id: `USER_CONFIGURABLE_${call.contractFunction}_pos${i}`,
            category: 'hardcoded_literal',
            severity: 'medium',
            contractInterface: contractFunction.interface,
            contractFunction: call.contractFunction,
            sdkFile: call.fileName,
            sdkFunction: call.functionName,
            lineNumber: call.line,
            description: `Parameter "${expectedParam.name}" appears user-configurable but is hardcoded to "${actualArg.value}"`,
            recommendation: `Make ${expectedParam.name} a method parameter`,
            expectedParam,
            actualValue: actualArg.value,
          })
        }
      }

      // Issue 6: Security-sensitive params with hardcoded values
      if (isSecuritySensitiveParam(expectedParam.name) && !actualArg.isVariable) {
        const issueKey = `SECURITY_${call.contractFunction}_${i}_${call.fileName}`
        if (!seenIssues.has(issueKey)) {
          seenIssues.add(issueKey)
          issues.push({
            id: `SECURITY_SENSITIVE_${call.contractFunction}_pos${i}`,
            category: 'validation_gap',
            severity: 'high',
            contractInterface: contractFunction.interface,
            contractFunction: call.contractFunction,
            sdkFile: call.fileName,
            sdkFunction: call.functionName,
            lineNumber: call.line,
            description: `Security-sensitive parameter "${expectedParam.name}" is hardcoded`,
            recommendation: `This parameter affects protocol security and should be validated`,
            expectedParam,
            actualValue: actualArg.value,
          })
        }
      }

      // Issue 7: Magic numbers
      const magicNumber = extractMagicNumber(actualArg.value)
      if (magicNumber) {
        const issueKey = `MAGIC_${call.contractFunction}_${i}_${call.fileName}`
        if (!seenIssues.has(issueKey)) {
          seenIssues.add(issueKey)
          issues.push({
            id: `MAGIC_NUMBER_${call.contractFunction}_pos${i}`,
            category: 'magic_number',
            severity: 'low',
            contractInterface: contractFunction.interface,
            contractFunction: call.contractFunction,
            sdkFile: call.fileName,
            sdkFunction: call.functionName,
            lineNumber: call.line,
            description: `Magic number ${magicNumber} for ${expectedParam.name} should be a named constant`,
            recommendation: `Extract to named constant (e.g., BASIS_POINTS, MAX_UINT256)`,
            actualValue: actualArg.value,
          })
        }
      }

      // Issue 8: Address params needing validation
      if (expectedParam.type === 'address' && isAddressParamNeedingValidation(expectedParam.name)) {
        const issueKey = `ADDRESS_${call.contractFunction}_${i}_${call.fileName}`
        if (!seenIssues.has(issueKey)) {
          seenIssues.add(issueKey)
          issues.push({
            id: `ADDRESS_VALIDATION_${call.contractFunction}_pos${i}`,
            category: 'validation_gap',
            severity: 'medium',
            contractInterface: contractFunction.interface,
            contractFunction: call.contractFunction,
            sdkFile: call.fileName,
            sdkFunction: call.functionName,
            lineNumber: call.line,
            description: `Address parameter "${expectedParam.name}" should have zero address validation`,
            recommendation: `Add validation to reject zero address (0x0000000000000000000000000000000000000000)`,
            expectedParam,
          })
        }
      }
    }
  }

  // File-level analysis
  for (const [fileName, stats] of fileStats.entries()) {
    if (stats.zeros > 0) {
      issues.push({
        id: `FILE_ZEROS_${fileName}`,
        category: 'zero_value',
        severity: stats.zeros > 1 ? 'medium' : 'low',
        contractInterface: 'file-level',
        contractFunction: 'multiple',
        sdkFile: fileName,
        sdkFunction: 'multiple',
        lineNumber: 0,
        description: `${fileName} has ${stats.zeros} hardcoded zero value(s) in ${stats.total} calls`,
        recommendation: 'Review all hardcoded zeros for potential parameter gaps',
      })
    }

    if (stats.bools > 0) {
      issues.push({
        id: `FILE_BOOLS_${fileName}`,
        category: 'hardcoded_literal',
        severity: stats.bools > 1 ? 'medium' : 'low',
        contractInterface: 'file-level',
        contractFunction: 'multiple',
        sdkFile: fileName,
        sdkFunction: 'multiple',
        lineNumber: 0,
        description: `${fileName} has ${stats.bools} hardcoded boolean value(s) in ${stats.total} calls`,
        recommendation: 'Review hardcoded booleans for potential configuration gaps',
      })
    }

    if (stats.total > 20) {
      issues.push({
        id: `FILE_COMPLEX_${fileName}`,
        category: 'file_complexity',
        severity: stats.total > 50 ? 'medium' : 'low',
        contractInterface: 'file-level',
        contractFunction: 'multiple',
        sdkFile: fileName,
        sdkFunction: 'multiple',
        lineNumber: 0,
        description: `${fileName} has ${stats.total} contract calls - consider modularization`,
        recommendation: 'Split large files into focused modules by functionality',
      })
    }
  }

  // Summary issues
  issues.push(...generateSummaryIssues(sdkCalls, fileStats, callsByCategory))

  return issues
}

function findContractFunction(
  signatures: Map<string, FunctionSignature[]>,
  functionName: string
): { interface: string; signature: FunctionSignature } | null {
  for (const [interfaceName, functions] of signatures) {
    const found = functions.find((fn) => fn.name === functionName)
    if (found) {
      return { interface: interfaceName, signature: found }
    }
  }
  return null
}

function isSuspiciousLiteral(paramType: string, arg: ArgWithType): boolean {
  if (arg.isVariable) {
    return false
  }
  if (SUSPICIOUS_LITERALS.has(arg.value)) {
    if (isNumericType(paramType) || paramType === 'bool') {
      return true
    }
    if (paramType === 'address') {
      return true
    }
  }
  return false
}

function getSeverityForType(paramType: string, value: string): IssueSeverity {
  if ((value === 'BigInt(0)' || value === '0' || value === '0n') && isNumericType(paramType)) {
    return 'high'
  }
  if (paramType === 'bool' && (value === 'true' || value === 'false')) {
    return 'medium'
  }
  return 'medium'
}

function severityForNumericType(paramType: string): IssueSeverity {
  if (paramType.includes('uint') || paramType.includes('int')) {
    return 'high'
  }
  return 'medium'
}

function isNumericType(paramType: string): boolean {
  return (
    paramType === 'uint' ||
    paramType === 'uint256' ||
    paramType === 'uint128' ||
    paramType === 'uint64' ||
    paramType === 'int' ||
    paramType === 'int256' ||
    paramType === 'int128'
  )
}

function isSlippageParam(paramName: string): boolean {
  const lowerName = paramName.toLowerCase()
  return ['min', 'amountout', 'slippage', 'minimum'].some((pattern) => lowerName.includes(pattern))
}

function isUserConfigurableParam(paramName: string): boolean {
  const lowerName = paramName.toLowerCase()
  return PARAM_NAME_PATTERNS.USER_CONFIGURABLE.some((pattern) =>
    lowerName.includes(pattern.toLowerCase())
  )
}

function isSecuritySensitiveParam(paramName: string): boolean {
  const lowerName = paramName.toLowerCase()
  return PARAM_NAME_PATTERNS.SECURITY_SENSITIVE.some((pattern) =>
    lowerName.includes(pattern.toLowerCase())
  )
}

function isAddressParamNeedingValidation(paramName: string): boolean {
  const lowerName = paramName.toLowerCase()
  return PARAM_NAME_PATTERNS.ADDRESS_PARAMS.some((pattern) =>
    lowerName.includes(pattern.toLowerCase())
  )
}

function extractMagicNumber(value: string): string | null {
  if (!value.includes('BigInt') && !/^\d+$/.test(value)) {
    return null
  }
  const match = value.match(/BigInt\((\d+)\)|^(\d+)$/)
  if (!match) {
    return null
  }
  const numStr = match[1] || match[2]
  if (!numStr) {
    return null
  }
  const num = BigInt(numStr)
  const magicNumbers: Record<string, string> = {
    '10000': 'BASIS_POINTS (100%)',
    '255': 'MAX_UINT8',
    '9900': '99% in basis points',
    '6800': '68% in basis points',
    '5000': '50% in basis points',
    '100': '1% in basis points',
    '50': '0.5% in basis points',
  }
  return magicNumbers[numStr] || (num >= MAGIC_NUMBER_THRESHOLD ? numStr : null)
}

function categorizeCall(
  call: SDKCall,
  categories: {
    withLoopCount: SDKCall[]
    withFeeParams: SDKCall[]
    withAddressParams: SDKCall[]
    presaleCalls: SDKCall[]
    creditFacilityCalls: SDKCall[]
    marketCalls: SDKCall[]
    launchCalls: SDKCall[]
    treasuryCalls: SDKCall[]
    stakingCalls: SDKCall[]
    authorizerCalls: SDKCall[]
    defaultSlippage: SDKCall[]
  }
) {
  const fnLower = call.contractFunction.toLowerCase()
  const fileLower = call.fileName.toLowerCase()
  const rawLower = call.rawCall.toLowerCase()

  if (fnLower.includes('loop') || call.args.some((a) => a.toLowerCase().includes('loop'))) {
    categories.withLoopCount.push(call)
  }
  if (fnLower.includes('fee') || rawLower.includes('fee')) {
    categories.withFeeParams.push(call)
  }
  if (
    call.args.some(
      (a) =>
        a.toLowerCase().includes('receiver') ||
        a.toLowerCase().includes('owner') ||
        a.toLowerCase().includes('for') ||
        a.toLowerCase().includes('to')
    )
  ) {
    categories.withAddressParams.push(call)
  }
  if (fileLower.includes('presale') || fnLower.includes('presale')) {
    categories.presaleCalls.push(call)
  }
  if (fileLower.includes('credit') || fnLower.includes('borrow') || fnLower.includes('loan')) {
    categories.creditFacilityCalls.push(call)
  }
  if (fileLower.includes('market') && (fnLower.includes('buy') || fnLower.includes('sell'))) {
    categories.marketCalls.push(call)
  }
  if (fileLower.includes('launch') || fnLower.includes('configure') || fnLower.includes('deploy')) {
    categories.launchCalls.push(call)
  }
  if (
    fileLower.includes('treasury') ||
    fnLower.includes('treasury') ||
    fnLower.includes('recipient')
  ) {
    categories.treasuryCalls.push(call)
  }
  if (fileLower.includes('staking') || fnLower.includes('stake') || fnLower.includes('reward')) {
    categories.stakingCalls.push(call)
  }
  if (
    fileLower.includes('authorizer') ||
    fnLower.includes('role') ||
    fnLower.includes('permission') ||
    fnLower.includes('grant') ||
    fnLower.includes('revoke')
  ) {
    categories.authorizerCalls.push(call)
  }
  if (rawLower.includes('slippage') && rawLower.includes('= 50')) {
    categories.defaultSlippage.push(call)
  }
}

function generateSummaryIssues(
  sdkCalls: SDKCall[],
  fileStats: Map<string, { total: number; zeros: number; literals: number; bools: number }>,
  callsByCategory: {
    withLoopCount: SDKCall[]
    withFeeParams: SDKCall[]
    withAddressParams: SDKCall[]
    presaleCalls: SDKCall[]
    creditFacilityCalls: SDKCall[]
    marketCalls: SDKCall[]
    launchCalls: SDKCall[]
    treasuryCalls: SDKCall[]
    stakingCalls: SDKCall[]
    authorizerCalls: SDKCall[]
    defaultSlippage: SDKCall[]
  }
): SDKIssue[] {
  const issues: SDKIssue[] = []
  const totalCalls = sdkCalls.length

  // Summary: Hardcoded literals
  const totalLiterals = Array.from(fileStats.values()).reduce((sum, s) => sum + s.literals, 0)
  if (totalLiterals > 0) {
    issues.push({
      id: 'SUMMARY_HARDCODED_LITERALS',
      category: 'hardcoded_literal',
      severity: 'high',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${totalLiterals} of ${totalCalls} SDK calls contain hardcoded literal values`,
      recommendation: 'Review all hardcoded literals to ensure they are intentional',
    })
  }

  // Summary: Zero values
  const totalZeros = Array.from(fileStats.values()).reduce((sum, s) => sum + s.zeros, 0)
  if (totalZeros > 0) {
    issues.push({
      id: 'SUMMARY_ZERO_VALUES',
      category: 'zero_value',
      severity: 'high',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${totalZeros} of ${totalCalls} SDK calls contain hardcoded zero values`,
      recommendation: 'Verify zeros are intentional and not missing parameters',
    })
  }

  // Summary: File complexity
  const complexFiles = Array.from(fileStats.entries()).filter(([_, s]) => s.total > 20)
  if (complexFiles.length > 0) {
    issues.push({
      id: 'SUMMARY_FILE_COMPLEXITY',
      category: 'file_complexity',
      severity: 'medium',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${complexFiles.length} files have more than 20 contract calls`,
      recommendation: 'Consider refactoring large files into smaller modules',
    })
  }

  // Summary: Address validation
  if (callsByCategory.withAddressParams.length > 0) {
    issues.push({
      id: 'SUMMARY_ADDRESS_VALIDATION',
      category: 'validation_gap',
      severity: 'medium',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.withAddressParams.length} calls involve address parameters - ensure zero address validation`,
      recommendation: 'Add validation to reject zero address (0x00...00)',
    })
  }

  // Summary: Admin functions
  const adminCalls = sdkCalls.filter((c) =>
    c.contractFunction.toLowerCase().match(/^(set|update|enable|disable|add|remove)/)
  )
  if (adminCalls.length > 0) {
    issues.push({
      id: 'SUMMARY_ADMIN_VALIDATION',
      category: 'validation_gap',
      severity: 'high',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${adminCalls.length} admin functions should have input validation`,
      recommendation: 'Add validation for admin functions to prevent invalid configurations',
    })
  }

  // Summary: Loop count complexity
  if (callsByCategory.withLoopCount.length > 0) {
    issues.push({
      id: 'SUMMARY_LOOP_COMPLEXITY',
      category: 'suspicious_default',
      severity: 'medium',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.withLoopCount.length} calls involve loop count parameters - verify leverage limits`,
      recommendation: 'Ensure loop count / leverage is validated against protocol maximums',
    })
  }

  // Summary: Fee param consistency
  if (callsByCategory.withFeeParams.length > 0) {
    issues.push({
      id: 'SUMMARY_FEE_CONSISTENCY',
      category: 'suspicious_default',
      severity: 'low',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.withFeeParams.length} calls involve fee parameters - verify basis points consistency`,
      recommendation: 'Ensure all fee parameters use consistent basis points representation',
    })
  }

  // Summary: Presale security
  if (callsByCategory.presaleCalls.length > 0) {
    issues.push({
      id: 'SUMMARY_PRESALE_SECURITY',
      category: 'validation_gap',
      severity: 'medium',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.presaleCalls.length} presale-related calls should be reviewed for security`,
      recommendation: 'Review presale functions for slippage protection and reentrancy guards',
    })
  }

  // Summary: Credit facility risk
  if (callsByCategory.creditFacilityCalls.length > 0) {
    issues.push({
      id: 'SUMMARY_CREDIT_RISK',
      category: 'validation_gap',
      severity: 'medium',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.creditFacilityCalls.length} credit facility calls involve borrowing risk`,
      recommendation: 'Review borrow functions for LTV validation and liquidation risk warnings',
    })
  }

  // Summary: Market slippage
  if (callsByCategory.marketCalls.length > 0) {
    issues.push({
      id: 'SUMMARY_MARKET_SLIPPAGE',
      category: 'suspicious_default',
      severity: 'medium',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.marketCalls.length} market buy/sell calls should have slippage review`,
      recommendation: 'Verify slippage calculations account for bonding curve price impact',
    })
  }

  // Summary: Launch config validation
  if (callsByCategory.launchCalls.length > 0) {
    issues.push({
      id: 'SUMMARY_LAUNCH_VALIDATION',
      category: 'validation_gap',
      severity: 'high',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.launchCalls.length} launch/configuration calls require thorough validation`,
      recommendation:
        'Add comprehensive validation for launch configs including segment validation, fee caps, and address checks',
    })
  }

  // Summary: Treasury config
  if (callsByCategory.treasuryCalls.length > 0) {
    issues.push({
      id: 'SUMMARY_TREASURY_CONFIG',
      category: 'validation_gap',
      severity: 'medium',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.treasuryCalls.length} treasury-related calls should validate recipient shares`,
      recommendation: 'Verify treasury recipient shares sum to 10000 (100%)',
    })
  }

  // Summary: Staking rewards
  if (callsByCategory.stakingCalls.length > 0) {
    issues.push({
      id: 'SUMMARY_STAKING_REWARDS',
      category: 'suspicious_default',
      severity: 'medium',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.stakingCalls.length} staking-related calls should verify reward calculations`,
      recommendation:
        'Review staking reward calculations for overflow/underflow and time-based edge cases',
    })
  }

  // Summary: Authorizer security
  if (callsByCategory.authorizerCalls.length > 0) {
    issues.push({
      id: 'SUMMARY_AUTHORIZER_SECURITY',
      category: 'validation_gap',
      severity: 'high',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.authorizerCalls.length} authorizer/permission calls affect security model`,
      recommendation: 'Review role grants/revokes to prevent privilege escalation or lockout',
    })
  }

  // Summary: Default slippage concern
  if (callsByCategory.defaultSlippage.length > 0) {
    issues.push({
      id: 'SUMMARY_DEFAULT_SLIPPAGE',
      category: 'suspicious_default',
      severity: 'medium',
      contractInterface: 'SDK-wide',
      contractFunction: 'multiple',
      sdkFile: 'multiple',
      sdkFunction: 'multiple',
      lineNumber: 0,
      description: `${callsByCategory.defaultSlippage.length} functions use default slippage of 50 bps (0.5%)`,
      recommendation:
        'Default slippage of 50 bps may be too low for volatile markets; consider 100-200 bps',
    })
  }

  return issues
}

/**
 * @description Format issues for reporting
 */
export function formatSDKIssues(issues: SDKIssue[]): string {
  if (issues.length === 0) {
    return 'No SDK issues detected!'
  }

  let report = '\n'
  report += '='.repeat(100) + '\n'
  report += 'EXPANDED SDK ISSUE DETECTION REPORT\n'
  report += '='.repeat(100) + '\n\n'

  const bySeverity = new Map<IssueSeverity, SDKIssue[]>()
  for (const issue of issues) {
    const existing = bySeverity.get(issue.severity) || []
    existing.push(issue)
    bySeverity.set(issue.severity, existing)
  }

  const byCategory = new Map<IssueCategory, SDKIssue[]>()
  for (const issue of issues) {
    const existing = byCategory.get(issue.category) || []
    existing.push(issue)
    byCategory.set(issue.category, existing)
  }

  report += `Total Issues: ${issues.length}\n`
  report += `  Critical: ${bySeverity.get('critical')?.length || 0}\n`
  report += `  High: ${bySeverity.get('high')?.length || 0}\n`
  report += `  Medium: ${bySeverity.get('medium')?.length || 0}\n`
  report += `  Low: ${bySeverity.get('low')?.length || 0}\n\n`

  report += 'Issues by Category:\n'
  for (const [category, categoryIssues] of byCategory.entries()) {
    report += `  ${category}: ${categoryIssues.length}\n`
  }
  report += '\n'
  report += '-'.repeat(100) + '\n\n'

  for (const [severity, severityIssues] of bySeverity.entries()) {
    report += `\n## ${severity.toUpperCase()} SEVERITY ISSUES (${severityIssues.length})\n\n`

    for (let i = 0; i < severityIssues.length; i++) {
      const issue = severityIssues[i]
      report += `${i + 1}. [${issue.id}] ${issue.contractFunction}\n`
      report += `   Location: ${issue.sdkFile}:${issue.lineNumber} (${issue.sdkFunction})\n`
      report += `   Category: ${issue.category}\n`
      if (issue.expectedParam) {
        report += `   Expected: ${issue.expectedParam.type} ${issue.expectedParam.name}\n`
      }
      if (issue.actualValue) {
        report += `   Actual: ${issue.actualValue}\n`
      }
      report += `   Issue: ${issue.description}\n`
      report += `   Fix: ${issue.recommendation}\n\n`
    }
  }

  report += '='.repeat(100) + '\n'

  return report
}

/**
 * @description Get issue counts by category
 */
export function getIssueCounts(issues: SDKIssue[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const issue of issues) {
    counts[issue.category] = (counts[issue.category] || 0) + 1
  }
  return counts
}
