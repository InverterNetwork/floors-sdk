/**
 * @description Parameter Gap Detection Test Runner
 * Main entry point for the parameter gap detection framework
 * Expanded to detect 20+ types of SDK issues
 */

import {
  extractContractSignatures,
  findSlippageFunctions,
  type FunctionSignature,
} from './contract-signatures'
import {
  detectSDKIssues,
  formatSDKIssues,
  getIssueCounts,
  type IssueSeverity,
  type SDKIssue,
} from './expanded-detector'
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
  // Expanded detection
  sdkIssues: SDKIssue[]
  issueCounts: Record<string, number>
  expandedReport: string
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

  // Step 7: Run expanded issue detection (20+ issue types)
  const sdkIssues = detectSDKIssues(contractSignatures, sdkCalls)
  const expandedReport = formatSDKIssues(sdkIssues)
  const issueCounts = getIssueCounts(sdkIssues)

  return {
    contractSignatures,
    sdkCalls,
    gaps,
    slippageFunctions,
    hardcodedSlippageCalls,
    hasCriticalGaps: hasCriticalGaps(gaps),
    report,
    // Expanded detection
    sdkIssues,
    issueCounts,
    expandedReport,
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

/**
 * @description Get expanded analysis summary with all detected issues
 */
export function getExpandedSummary(result: GapDetectionResult): string {
  let summary = '\n' + '='.repeat(80) + '\n'
  summary += 'EXPANDED SDK ISSUE DETECTION SUMMARY\n'
  summary += '='.repeat(80) + '\n\n'

  summary += `Total Issues Detected: ${result.sdkIssues.length}\n\n`

  // Count by severity
  const bySeverity = new Map<IssueSeverity, number>()
  for (const issue of result.sdkIssues) {
    bySeverity.set(issue.severity, (bySeverity.get(issue.severity) || 0) + 1)
  }

  summary += 'Issues by Severity:\n'
  summary += `  Critical: ${bySeverity.get('critical') || 0}\n`
  summary += `  High: ${bySeverity.get('high') || 0}\n`
  summary += `  Medium: ${bySeverity.get('medium') || 0}\n`
  summary += `  Low: ${bySeverity.get('low') || 0}\n\n`

  summary += 'Issues by Category:\n'
  for (const [category, count] of Object.entries(result.issueCounts)) {
    summary += `  ${category}: ${count}\n`
  }

  summary += '\n' + '-'.repeat(80) + '\n'

  // List critical and high severity issues
  const criticalAndHigh = result.sdkIssues.filter(
    (issue) => issue.severity === 'critical' || issue.severity === 'high'
  )

  if (criticalAndHigh.length > 0) {
    summary += '\n## CRITICAL & HIGH SEVERITY ISSUES\n\n'
    for (let i = 0; i < criticalAndHigh.length; i++) {
      const issue = criticalAndHigh[i]
      summary += `${i + 1}. [${issue.severity.toUpperCase()}] ${issue.id}\n`
      summary += `   Function: ${issue.contractFunction} (${issue.contractInterface})\n`
      summary += `   Location: ${issue.sdkFile}:${issue.lineNumber}\n`
      summary += `   Issue: ${issue.description}\n`
      summary += `   Fix: ${issue.recommendation}\n\n`
    }
  }

  summary += '='.repeat(80) + '\n'

  return summary
}

// Re-export all types and functions
export * from './contract-signatures'
export * from './expanded-detector'
export * from './param-comparator'
export * from './sdk-call-extractor'
