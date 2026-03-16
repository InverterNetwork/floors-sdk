import { describe, expect, it } from 'bun:test'

import { calculatePremiumRate } from '../src/graphql/api/utils'

describe('calculatePremiumRate', () => {
  it('calculates premium correctly for normal values', () => {
    // market=2, floor=1 → 100% premium
    expect(calculatePremiumRate(2, 1)).toBe(100)
  })

  it('returns 0 when market equals floor', () => {
    expect(calculatePremiumRate(1, 1)).toBe(0)
  })

  it('returns 0 when floorPrice is 0 (no division by zero)', () => {
    const result = calculatePremiumRate(1, 0)
    expect(result).toBe(0)
    expect(Number.isNaN(result)).toBe(false)
    expect(Number.isFinite(result)).toBe(true)
  })

  it('returns 0 when both prices are 0', () => {
    const result = calculatePremiumRate(0, 0)
    expect(result).toBe(0)
    expect(Number.isNaN(result)).toBe(false)
  })

  it('returns negative premium when market < floor', () => {
    // market=0.5, floor=1 → -50% premium
    expect(calculatePremiumRate(0.5, 1)).toBe(-50)
  })
})
