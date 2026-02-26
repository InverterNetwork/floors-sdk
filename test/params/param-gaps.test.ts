/**
 * @description Parameter Gap Detection Tests
 * Fails when SDK parameter forwarding gaps are detected
 * Expanded to detect 20+ types of SDK issues
 */

import { describe, expect, it } from 'bun:test'

import { getAnalysisSummary, getExpandedSummary, runGapDetection } from './index'

describe('SDK Parameter Gap Detection', () => {
  describe('Basic Parameter Gaps', () => {
    it('should detect all parameter gaps between contracts and SDK', () => {
      const result = runGapDetection()

      // Log the analysis summary
      console.log(getAnalysisSummary(result))

      // Log detailed report if gaps found
      if (result.gaps.length > 0) {
        console.log(result.report)
      }

      // Assert no critical gaps (tests should fail when gaps exist)
      expect(result.hasCriticalGaps).toBe(false)

      // Assert no parameter gaps at all
      expect(result.gaps).toHaveLength(0)
    })

    it('should detect hardcoded slippage parameters', () => {
      const result = runGapDetection()

      // Log hardcoded slippage calls found
      if (result.hardcodedSlippageCalls.length > 0) {
        console.log('\n=== Hardcoded Slippage Calls Detected ===\n')
        for (const { call, paramIndex } of result.hardcodedSlippageCalls) {
          console.log(
            `${call.fileName}:${call.line} - ${call.functionName} -> ${call.contractFunction}`
          )
          console.log(`   Param index ${paramIndex}: ${call.argsWithTypes[paramIndex]?.value}`)
          console.log(`   Raw call: ${call.rawCall}\n`)
        }
      }

      // Should not have any hardcoded slippage calls
      expect(result.hardcodedSlippageCalls).toHaveLength(0)
    })

    it('should have matching parameter counts for all contract functions', () => {
      const result = runGapDetection()

      // Check for missing parameters (SDK call has fewer args than contract expects)
      const missingParamGaps = result.gaps.filter((gap) => gap.actualValue.value === 'MISSING')

      if (missingParamGaps.length > 0) {
        console.log('\n=== Missing Parameters Detected ===\n')
        for (const gap of missingParamGaps) {
          console.log(
            `${gap.contractFunction} (${gap.contractInterface}): ${gap.sdkFile}:${gap.lineNumber}`
          )
          console.log(
            `   Missing: ${gap.expectedParam.type} ${gap.expectedParam.name} at position ${gap.expectedParam.position}`
          )
        }
      }

      expect(missingParamGaps).toHaveLength(0)
    })

    it('should detect all slippage-related contract functions', () => {
      const result = runGapDetection()

      // Expected slippage functions based on contract interfaces
      const expectedSlippageFunctions = [
        // IFloor_v1 / IBC_Discrete_Redeeming_VirtualSupply_v1
        { name: 'buy', paramCount: 2 },
        { name: 'buyFor', paramCount: 3 },
        { name: 'sell', paramCount: 2 },
        { name: 'sellTo', paramCount: 3 },
        // ICreditFacility_v1
        { name: 'buyAndBorrow', paramCount: 4 },
        { name: 'buyAndBorrowFor', paramCount: 5 },
        // IPresale_v1
        { name: 'buyPresale', paramCount: 2 },
        { name: 'buyPresaleWithLoops', paramCount: 3 },
      ]

      // Verify all expected functions are found
      for (const expected of expectedSlippageFunctions) {
        const found = result.slippageFunctions.find(
          (fn) =>
            fn.function.name === expected.name && fn.function.params.length === expected.paramCount
        )
        if (!found) {
          console.warn(`Expected slippage function not found: ${expected.name}`)
        }
        expect(found).toBeDefined()
      }
    })
  })

  describe('Expanded Issue Detection (20+ Issues)', () => {
    it('should detect all SDK issues including hardcoded values and suspicious patterns', () => {
      const result = runGapDetection()

      // Log the expanded summary
      console.log(getExpandedSummary(result))

      // Log detailed expanded report
      if (result.sdkIssues.length > 0) {
        console.log(result.expandedReport)
      }

      // Report issue counts
      console.log('\n=== Issue Counts by Category ===\n')
      for (const [category, count] of Object.entries(result.issueCounts)) {
        console.log(`${category}: ${count}`)
      }

      // The test expects issues to be found - this validates the detector works
      expect(result.sdkIssues.length).toBeGreaterThan(0)
    })

    it('should detect critical severity issues', () => {
      const result = runGapDetection()
      const criticalIssues = result.sdkIssues.filter((i) => i.severity === 'critical')

      console.log(`\n=== Critical Issues Found: ${criticalIssues.length} ===\n`)
      for (const issue of criticalIssues) {
        console.log(`[${issue.id}] ${issue.contractFunction}: ${issue.description}`)
      }

      // Should find critical issues (like hardcoded slippage)
      expect(criticalIssues.length).toBeGreaterThan(0)
    })

    it('should detect high severity issues', () => {
      const result = runGapDetection()
      const highIssues = result.sdkIssues.filter((i) => i.severity === 'high')

      console.log(`\n=== High Severity Issues Found: ${highIssues.length} ===\n`)
      for (const issue of highIssues) {
        console.log(`[${issue.id}] ${issue.contractFunction}: ${issue.description}`)
      }

      // Should find high severity issues
      expect(highIssues.length).toBeGreaterThan(0)
    })

    it('should detect medium severity issues', () => {
      const result = runGapDetection()
      const mediumIssues = result.sdkIssues.filter((i) => i.severity === 'medium')

      console.log(`\n=== Medium Severity Issues Found: ${mediumIssues.length} ===\n`)
      for (const issue of mediumIssues) {
        console.log(`[${issue.id}] ${issue.contractFunction}: ${issue.description}`)
      }

      // Should find medium severity issues
      expect(mediumIssues.length).toBeGreaterThan(0)
    })

    it('should detect issues in multiple categories', () => {
      const result = runGapDetection()
      const categories = new Set(result.sdkIssues.map((i) => i.category))

      console.log(`\n=== Issue Categories Found: ${categories.size} ===\n`)
      for (const category of categories) {
        const count = result.sdkIssues.filter((i) => i.category === category).length
        console.log(`${category}: ${count} issues`)
      }

      // Should find issues in at least 3 different categories
      expect(categories.size).toBeGreaterThanOrEqual(3)
    })

    it('should find at least 20 total issues', () => {
      const result = runGapDetection()

      console.log(`\n=== Total Issues Detected: ${result.sdkIssues.length} ===\n`)

      // List all unique issues
      const uniqueIssues = new Map(result.sdkIssues.map((i) => [i.id, i]))

      console.log('Unique Issue IDs:')
      for (const [id, issue] of uniqueIssues.entries()) {
        console.log(`  - ${id} (${issue.severity})`)
      }

      // Should find at least 20 issues
      expect(result.sdkIssues.length).toBeGreaterThanOrEqual(20)
    })
  })
})
