/**
 * @description Parameter Comparator
 * Compares contract function signatures with SDK calls to find parameter gaps
 */

import type { FunctionSignature } from './contract-signatures'
import type { SDKCall } from './sdk-call-extractor'

export interface ParameterGap {
  contractInterface: string
  contractFunction: string
  sdkFile: string
  sdkFunction: string
  lineNumber: number
  expectedParam: ExpectedParameter
  actualValue: ActualValue
  severity: 'critical' | 'warning'
  description: string
}

export interface ExpectedParameter {
  name: string
  type: string
  position: number
  isSlippageParam: boolean
}

export interface ActualValue {
  value: string
  isHardcodedZero: boolean
  isVariable: boolean
  variableName?: string
}

// Slippage parameter name patterns
const SLIPPAGE_PARAM_PATTERNS = [
  'minAmountOut',
  'minAmountOut_',
  'slippage',
  'minimum',
  'minTokens',
]

/**
 * @description Compare contract signatures with SDK calls to find gaps
 * Only checks mutating functions (not view/pure read-only functions)
 */
export function findParameterGaps(
  contractSignatures: Map<string, FunctionSignature[]>,
  sdkCalls: SDKCall[]
): ParameterGap[] {
  const gaps: ParameterGap[] = []

  for (const call of sdkCalls) {
    // Find matching contract function
    const contractFunction = findContractFunction(contractSignatures, call.contractFunction)

    if (!contractFunction) {
      // Contract function not found in interfaces - may be admin function or internal
      continue
    }

    // Skip view/pure functions - they are read-only and don't need slippage params
    if (contractFunction.signature.isView) {
      continue
    }

    // Compare parameters
    const paramGaps = compareFunctionParameters(contractFunction, call)
    gaps.push(...paramGaps)
  }

  return gaps
}

/**
 * @description Find contract function by name across all interfaces
 */
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

/**
 * @description Compare parameters between contract and SDK call
 */
function compareFunctionParameters(
  contractFunction: { interface: string; signature: FunctionSignature },
  sdkCall: SDKCall
): ParameterGap[] {
  const gaps: ParameterGap[] = []
  const expectedParams = contractFunction.signature.params

  for (let i = 0; i < expectedParams.length; i++) {
    const expectedParam = expectedParams[i]
    const actualArg = sdkCall.argsWithTypes[i]

    if (!actualArg) {
      // SDK call has fewer arguments than contract expects
      gaps.push({
        contractInterface: contractFunction.interface,
        contractFunction: contractFunction.signature.name,
        sdkFile: sdkCall.fileName,
        sdkFunction: sdkCall.functionName,
        lineNumber: sdkCall.line,
        expectedParam: {
          name: expectedParam.name,
          type: expectedParam.type,
          position: i,
          isSlippageParam: isSlippageParameter(expectedParam.name),
        },
        actualValue: {
          value: 'MISSING',
          isHardcodedZero: false,
          isVariable: false,
        },
        severity: 'critical',
        description: `Contract expects ${expectedParam.type} ${expectedParam.name} at position ${i}, but SDK call has no argument`,
      })
      continue
    }

    // Check if slippage parameter is hardcoded to zero
    if (isSlippageParameter(expectedParam.name) && actualArg.isHardcodedZero) {
      gaps.push({
        contractInterface: contractFunction.interface,
        contractFunction: contractFunction.signature.name,
        sdkFile: sdkCall.fileName,
        sdkFunction: sdkCall.functionName,
        lineNumber: sdkCall.line,
        expectedParam: {
          name: expectedParam.name,
          type: expectedParam.type,
          position: i,
          isSlippageParam: true,
        },
        actualValue: actualArg,
        severity: 'critical',
        description: `Slippage parameter '${expectedParam.name}' is hardcoded to ${actualArg.value} instead of being user-configurable`,
      })
    }
  }

  return gaps
}

/**
 * @description Check if parameter name indicates a slippage parameter
 */
function isSlippageParameter(paramName: string): boolean {
  const lowerName = paramName.toLowerCase()
  return SLIPPAGE_PARAM_PATTERNS.some((pattern) => lowerName.includes(pattern.toLowerCase()))
}

/**
 * @description Format parameter gaps for reporting
 */
export function formatParameterGaps(gaps: ParameterGap[]): string {
  if (gaps.length === 0) {
    return 'No parameter gaps detected!'
  }

  let report = '\n'
  report += '='.repeat(80) + '\n'
  report += 'PARAMETER GAP DETECTION REPORT\n'
  report += '='.repeat(80) + '\n\n'

  report += `Found ${gaps.length} parameter gap(s):\n\n`

  for (let i = 0; i < gaps.length; i++) {
    const gap = gaps[i]
    report += `${i + 1}. [${gap.severity.toUpperCase()}] ${gap.contractFunction} (${gap.contractInterface})\n`
    report += `   SDK: ${gap.sdkFile}:${gap.lineNumber} (${gap.sdkFunction})\n`
    report += `   Expected: ${gap.expectedParam.type} ${gap.expectedParam.name} (position ${gap.expectedParam.position})\n`
    report += `   Actual: ${gap.actualValue.value}\n`
    report += `   Issue: ${gap.description}\n`

    if (gap.severity === 'critical') {
      report += `   FIX: Add ${gap.expectedParam.name} to ${gap.sdkFunction} params and pass it through\n`
    }

    report += '\n'
  }

  report += '='.repeat(80) + '\n'

  return report
}

/**
 * @description Check if there are any critical gaps
 */
export function hasCriticalGaps(gaps: ParameterGap[]): boolean {
  return gaps.some((gap) => gap.severity === 'critical')
}

/**
 * @description Get gaps filtered by severity
 */
export function getGapsBySeverity(
  gaps: ParameterGap[],
  severity: 'critical' | 'warning'
): ParameterGap[] {
  return gaps.filter((gap) => gap.severity === severity)
}
