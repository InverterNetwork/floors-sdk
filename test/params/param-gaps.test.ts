/**
 * @description Parameter Gap Detection Tests
 * Fails when SDK parameter forwarding gaps are detected
 */

import { describe, expect, it } from 'bun:test'

import { getAnalysisSummary, runGapDetection } from './index'

describe('SDK Parameter Gap Detection', () => {
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
