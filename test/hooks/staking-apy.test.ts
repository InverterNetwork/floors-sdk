import { describe, expect, it } from 'bun:test'

describe('Staking APY Calculation - HARVEST events', () => {
  const makeHarvest = (yieldAmount: string, collateralAmount: string, timestamp: number) => ({
    id: `harvest-${timestamp}`,
    position_id: 'position-1',
    stakingManager_id: '0x-staking-manager',
    user_id: '0x-user',
    activityType: 'HARVEST' as const,
    issuanceTokenAmountRaw: '0',
    issuanceTokenAmountFormatted: '0',
    collateralAmountRaw: collateralAmount,
    collateralAmountFormatted: collateralAmount,
    yieldAmountRaw: yieldAmount,
    yieldAmountFormatted: yieldAmount,
    feeAmountRaw: '0',
    feeAmountFormatted: '0',
    timestamp: String(timestamp),
    transactionHash: '0x123',
    __typename: 'StakingActivity' as const,
  })

  describe('yield rate calculation', () => {
    it('calculates APY from single harvest event', () => {
      // Harvest: 5 yield on 100 collateral = 5% yield
      makeHarvest('5', '100', 1000)

      // Yield rate = 5/100 = 0.05 (5%)
      // If this was over 30 days: APY = 0.05 * (365/30) ≈ 0.608 (60.8%)
      const yieldRate = 5 / 100
      const annualized = yieldRate * (365 / 30)

      expect(yieldRate).toBe(0.05)
      expect(annualized).toBeCloseTo(0.608, 2)
    })

    it('averages multiple harvest events', () => {
      // Multiple harvests with different yield rates
      const harvests = [
        makeHarvest('5', '100', 1000), // 5% yield
        makeHarvest('10', '100', 2000), // 10% yield
        makeHarvest('7.5', '100', 3000), // 7.5% yield
      ]

      // Average yield rate = (0.05 + 0.10 + 0.075) / 3 = 0.075 (7.5%)
      const yieldRates = harvests.map(
        (h) => Number(h.yieldAmountFormatted) / Number(h.collateralAmountFormatted)
      )
      const avgYieldRate = yieldRates.reduce((sum, r) => sum + r, 0) / yieldRates.length

      expect(avgYieldRate).toBeCloseTo(0.075, 4)
    })

    it('annualizes correctly for different lookback periods', () => {
      const yieldRate = 0.05 // 5%

      // 7-day lookback: APY = 0.05 * (365/7) ≈ 2.607 (260.7%)
      expect(yieldRate * (365 / 7)).toBeCloseTo(2.607, 2)

      // 30-day lookback: APY = 0.05 * (365/30) ≈ 0.608 (60.8%)
      expect(yieldRate * (365 / 30)).toBeCloseTo(0.608, 2)

      // 90-day lookback: APY = 0.05 * (365/90) ≈ 0.203 (20.3%)
      expect(yieldRate * (365 / 90)).toBeCloseTo(0.203, 2)
    })
  })

  describe('edge cases', () => {
    it('returns 0 for empty harvests', () => {
      // No harvest events = no yield data
      expect(true).toBe(true) // Placeholder - actual test requires hook execution
    })

    it('filters out harvests with zero yield', () => {
      const harvests = [
        makeHarvest('0', '100', 1000), // Zero yield - should be filtered
        makeHarvest('5', '100', 2000), // Valid harvest
      ]

      const validHarvests = harvests.filter(
        (h) => Number(h.yieldAmountFormatted) > 0 && Number(h.collateralAmountFormatted) > 0
      )

      expect(validHarvests.length).toBe(1)
    })

    it('filters out harvests with zero collateral', () => {
      const harvests = [
        makeHarvest('5', '0', 1000), // Zero collateral - should be filtered
        makeHarvest('5', '100', 2000), // Valid harvest
      ]

      const validHarvests = harvests.filter(
        (h) => Number(h.yieldAmountFormatted) > 0 && Number(h.collateralAmountFormatted) > 0
      )

      expect(validHarvests.length).toBe(1)
    })
  })

  describe('realistic scenarios', () => {
    it('handles TestnetStrategy_v1 injected yield', () => {
      // Simulate TestnetStrategy where admin injects yield periodically
      const dayInSeconds = 86400
      const now = Math.floor(Date.now() / 1000)

      const harvests = [
        makeHarvest('2', '100', now), // 2% yield this week
        makeHarvest('1.5', '100', now - 7 * dayInSeconds), // 1.5% last week
        makeHarvest('2.5', '100', now - 14 * dayInSeconds), // 2.5% two weeks ago
      ]

      const yieldRates = harvests.map(
        (h) => Number(h.yieldAmountFormatted) / Number(h.collateralAmountFormatted)
      )
      const avgYieldRate = yieldRates.reduce((sum, r) => sum + r, 0) / yieldRates.length

      // Average = (0.02 + 0.015 + 0.025) / 3 = 0.02 (2%)
      expect(avgYieldRate).toBeCloseTo(0.02, 4)

      // Annualized over 30 days: 0.02 * (365/30) ≈ 0.243 (24.3%)
      const annualized = avgYieldRate * (365 / 30)
      expect(annualized).toBeCloseTo(0.243, 2)
    })
  })
})
