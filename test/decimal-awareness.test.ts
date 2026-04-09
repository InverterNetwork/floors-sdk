import { describe, expect, it } from 'bun:test'
import { formatUnits, parseUnits } from 'viem'

import { DEFAULT_FLOOR_SEGMENT, generateDefaultCurve } from '../src/utils/segments'

/**
 * These tests demonstrate the decimal-awareness bug and its fix.
 *
 * The on-chain bonding curve formula is:
 *   collateral = (supplyPerStep × stepPrice) / SCALING_FACTOR
 *   where SCALING_FACTOR = 1e18
 *
 * For the result to be in correct reserve-token atoms, `stepPrice` must be
 * scaled to the reserve token's decimals, NOT hardcoded to 18 decimals.
 */

/** Simulate the contract formula: collateral = (supply * price) / 1e18 */
function simulateCollateralCost(supplyPerStep: bigint, stepPrice: bigint): bigint {
  return (supplyPerStep * stepPrice) / BigInt(1e18)
}

describe('Decimal Awareness — Before Fix (demonstrates the bug)', () => {
  it('WAVAX (18 decimals): 1e18 price produces correct 1 WAVAX per token cost', () => {
    const supplyPerStep = parseUnits('1', 18) // 1 issuance token
    const price = parseUnits('1', 18) // "1" encoded as 18 decimals

    const collateralRaw = simulateCollateralCost(supplyPerStep, price)
    const collateralHuman = Number(formatUnits(collateralRaw, 18)) // WAVAX has 18 decimals

    expect(collateralHuman).toBe(1) // 1 WAVAX — correct
  })

  it('USDC (6 decimals): 1e18 price produces 1 TRILLION USDC per token cost (BUG)', () => {
    const supplyPerStep = parseUnits('1', 18) // 1 issuance token
    const price = parseUnits('1', 18) // "1" encoded as 18 decimals (wrong for USDC)

    const collateralRaw = simulateCollateralCost(supplyPerStep, price)
    const collateralHuman = Number(formatUnits(collateralRaw, 6)) // USDC has 6 decimals

    // BUG: This is 1 trillion USDC, not 1 USDC
    expect(collateralHuman).toBe(1_000_000_000_000)
  })

  it('DEFAULT_FLOOR_SEGMENT uses hardcoded 1e18 price', () => {
    expect(DEFAULT_FLOOR_SEGMENT.initialPrice).toBe(BigInt(1e18))
  })
})

describe('Decimal Awareness — After Fix (correct behavior)', () => {
  it('USDC (6 decimals): 1e6 price produces correct 1 USDC per token cost', () => {
    const supplyPerStep = parseUnits('1', 18) // 1 issuance token
    const price = parseUnits('1', 6) // "1" encoded as 6 decimals (correct for USDC)

    const collateralRaw = simulateCollateralCost(supplyPerStep, price)
    const collateralHuman = Number(formatUnits(collateralRaw, 6)) // USDC has 6 decimals

    expect(collateralHuman).toBe(1) // 1 USDC — correct
  })

  it('USDT (6 decimals): 0.50 price produces correct 0.50 USDT per token cost', () => {
    const supplyPerStep = parseUnits('1', 18)
    const price = parseUnits('0.5', 6) // 0.50 USDT

    const collateralRaw = simulateCollateralCost(supplyPerStep, price)
    const collateralHuman = Number(formatUnits(collateralRaw, 6))

    expect(collateralHuman).toBe(0.5)
  })

  it('BTC.b (8 decimals): 1e8 price produces correct 1 BTC per token cost', () => {
    const supplyPerStep = parseUnits('1', 18)
    const price = parseUnits('1', 8) // "1" encoded as 8 decimals

    const collateralRaw = simulateCollateralCost(supplyPerStep, price)
    const collateralHuman = Number(formatUnits(collateralRaw, 8))

    expect(collateralHuman).toBe(1)
  })

  it('generateDefaultCurve with 6 decimals produces USDC-scaled prices', () => {
    const { floor, premium } = generateDefaultCurve(
      parseUnits('1', 6), // 1 USDC floor price
      BigInt(100_000e18) // 100k supply
    )

    // Floor price should be 1e6 (1 USDC), not 1e18
    expect(floor.initialPrice).toBe(parseUnits('1', 6))

    // Premium segment prices should also be scaled to 6 decimals
    // First premium starts at floor price
    const firstPremiumCollateral = simulateCollateralCost(
      parseUnits('1', 18),
      premium[0].initialPrice
    )
    const firstPremiumCostUSDC = Number(formatUnits(firstPremiumCollateral, 6))

    // Should be around 1 USDC (the starting price), not 1 trillion
    expect(firstPremiumCostUSDC).toBeGreaterThan(0.5)
    expect(firstPremiumCostUSDC).toBeLessThan(2)
  })

  it('full floor segment cost with USDC is reasonable', () => {
    const { floor } = generateDefaultCurve(
      parseUnits('1', 6), // 1 USDC floor price
      parseUnits('400000', 18) // 400k floor supply
    )

    // Total cost for floor segment: 400k tokens * 1 USDC = 400k USDC
    const totalCollateral = simulateCollateralCost(floor.supplyPerStep, floor.initialPrice)
    const totalUSDC = Number(formatUnits(totalCollateral, 6))

    expect(totalUSDC).toBe(400_000)
  })
})
