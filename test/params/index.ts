/**
 * @description Parameter Gap Detection Test Runner
 * Main entry point for the parameter gap detection framework
 */

import {
  extractContractSignatures,
  findSlippageFunctions,
  type FunctionSignature,
} from './contract-signatures'
import {
  findParameterGaps,
  formatParameterGaps,
  hasCriticalGaps,
  type ParameterGap,
} from './param-comparator'
import { extractSDKCalls, findHardcodedSlippageCalls, type SDKCall } from './sdk-call-extractor'

export interface GapDetectionResult {
  contractSignatures: Map<string, FunctionSignature[]>
  sdkCalls: SDKCall[]
  gaps: ParameterGap[]
  slippageFunctions: Array<{ interface: string; function: FunctionSignature }>
  hardcodedSlippageCalls: Array<{
    call: SDKCall
    paramIndex: number
  }>
  hasCriticalGaps: boolean
  report: string
}

/**
 * @description Run the complete parameter gap detection analysis
 */
export function runGapDetection(): GapDetectionResult {
  // Step 1: Extract contract function signatures
  const contractSignatures = extractContractSignatures()

  // Step 2: Extract SDK writeContract calls
  const sdkCalls = extractSDKCalls()

  // Step 3: Find slippage-related functions in contracts
  const slippageFunctions = findSlippageFunctions(contractSignatures)

  // Step 4: Find hardcoded slippage calls in SDK
  const hardcodedSlippageCalls = findHardcodedSlippageCalls(sdkCalls)

  // Step 5: Compare and find parameter gaps
  const gaps = findParameterGaps(contractSignatures, sdkCalls)

  // Step 6: Generate report
  const report = formatParameterGaps(gaps)

  return {
    contractSignatures,
    sdkCalls,
    gaps,
    slippageFunctions,
    hardcodedSlippageCalls,
    hasCriticalGaps: hasCriticalGaps(gaps),
    report,
  }
}

/**
 * @description Get a summary of the analysis
 */
export function getAnalysisSummary(result: GapDetectionResult): string {
  let summary = '\n=== Parameter Gap Analysis Summary ===\n\n'

  summary += `Contract interfaces analyzed: ${result.contractSignatures.size}\n`
  summary += `SDK function calls analyzed: ${result.sdkCalls.length}\n`
  summary += `Slippage-related contract functions: ${result.slippageFunctions.length}\n`
  summary += `Hardcoded slippage calls found: ${result.hardcodedSlippageCalls.length}\n`
  summary += `Total parameter gaps: ${result.gaps.length}\n`
  summary += `Critical gaps: ${result.gaps.filter((g) => g.severity === 'critical').length}\n`
  summary += `Warning gaps: ${result.gaps.filter((g) => g.severity === 'warning').length}\n`

  if (result.hasCriticalGaps) {
    summary += '\n⚠️  CRITICAL GAPS DETECTED - SDK parameter forwarding is incomplete!\n'
  } else {
    summary += '\n✅ All parameters are correctly forwarded!\n'
  }

  summary += '\n=====================================\n'

  return summary
}

// Re-export all types and functions
export * from './contract-signatures'
export * from './param-comparator'
export * from './sdk-call-extractor'
