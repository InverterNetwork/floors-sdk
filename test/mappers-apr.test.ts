import { describe, expect, it } from 'bun:test'

import { calculateFloorAPR } from '../src/graphql/api/mappers'

describe('calculateFloorAPR', () => {
  const makeElevation = (oldPrice: string, newPrice: string, timestamp: number) => ({
    oldFloorPriceFormatted: oldPrice,
    oldFloorPriceRaw: oldPrice,
    newFloorPriceFormatted: newPrice,
    newFloorPriceRaw: newPrice,
    timestamp: String(timestamp),
    deployedAmountFormatted: '100',
    deployedAmountRaw: '100',
    transactionHash: '0x123',
  })

  it('annualizes a single-event correctly (× 365)', () => {
    // Single elevation: floor went from 1.0 to 1.1 (10% increase)
    const elevations = [makeElevation('1.0', '1.1', 1000)]
    const apr = calculateFloorAPR(elevations, 1.1)
    // Single event ⇒ (0.1 / 1.1) * 365 ≈ 33.18
    expect(apr).toBeGreaterThan(30)
    expect(apr).toBeLessThan(40)
  })

  it('annualizes multi-event over time correctly', () => {
    const dayInSeconds = 86400
    const now = 1_000_000
    // Two elevations spread over 10 days
    const elevations = [
      makeElevation('1.0', '1.05', now), // latest (sorted desc)
      makeElevation('0.95', '1.0', now - 10 * dayInSeconds), // older
    ]
    const apr = calculateFloorAPR(elevations, 1.05)
    // totalIncrease = 0.05 + 0.05 = 0.1, timeSpan = 10 days
    // (0.1 / 1.05) * (365 / 10) ≈ 3.476 → ~347.6%
    expect(apr).toBeGreaterThan(3)
    expect(apr).toBeLessThan(4)
  })

  it('caps extreme APR at 1000 (100,000%)', () => {
    const dayInSeconds = 86400
    const now = 1_000_000
    // Huge increase in very short time
    const elevations = [
      makeElevation('1.0', '100.0', now),
      makeElevation('0.5', '1.0', now - 1 * dayInSeconds),
    ]
    const apr = calculateFloorAPR(elevations, 100.0)
    expect(apr).toBeLessThanOrEqual(1000)
  })

  it('returns 0 for zero floor price', () => {
    const elevations = [makeElevation('0', '0.1', 1000)]
    const apr = calculateFloorAPR(elevations, 0)
    expect(apr).toBe(0)
  })

  it('returns 0 for empty elevations', () => {
    const apr = calculateFloorAPR([], 1.0)
    expect(apr).toBe(0)
  })
})
