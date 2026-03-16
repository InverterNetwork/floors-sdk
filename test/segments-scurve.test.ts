import { describe, expect, it } from 'bun:test'

import {
  calculateSegmentEndPrice,
  DEFAULT_PREMIUM_SEGMENTS,
  validateSegmentConnection,
} from '../src/utils/segments'

describe('DEFAULT_PREMIUM_SEGMENTS S-curve shape', () => {
  it('has 9 segments', () => {
    expect(DEFAULT_PREMIUM_SEGMENTS).toHaveLength(9)
  })

  it('slope peaks in middle third and decreases in final third', () => {
    // Calculate slope (priceIncrease per step) for each segment
    const slopes = DEFAULT_PREMIUM_SEGMENTS.map((seg) => Number(seg.priceIncrease) / 1e18)

    // Divide into thirds
    const firstThird = slopes.slice(0, 3)
    const middleThird = slopes.slice(3, 6)
    const lastThird = slopes.slice(6, 9)

    const avgFirst = firstThird.reduce((a, b) => a + b, 0) / firstThird.length
    const avgMiddle = middleThird.reduce((a, b) => a + b, 0) / middleThird.length
    const avgLast = lastThird.reduce((a, b) => a + b, 0) / lastThird.length

    // Middle third should have highest average slope (acceleration phase)
    expect(avgMiddle).toBeGreaterThan(avgFirst)
    // Last third should decelerate — lower average slope than middle
    expect(avgLast).toBeLessThan(avgMiddle)
  })

  it('segments connect properly (end price of N ≈ start price of N+1)', () => {
    for (let i = 0; i < DEFAULT_PREMIUM_SEGMENTS.length - 1; i++) {
      const current = DEFAULT_PREMIUM_SEGMENTS[i]
      const next = DEFAULT_PREMIUM_SEGMENTS[i + 1]
      const result = validateSegmentConnection(current, next)
      expect(result.valid).toBe(true)
    }
  })

  it('overall price range spans roughly 1.0 to 8.0', () => {
    const firstPrice = Number(DEFAULT_PREMIUM_SEGMENTS[0].initialPrice) / 1e18
    const lastSeg = DEFAULT_PREMIUM_SEGMENTS[DEFAULT_PREMIUM_SEGMENTS.length - 1]
    const lastEndPrice = Number(calculateSegmentEndPrice(lastSeg)) / 1e18

    expect(firstPrice).toBeCloseTo(1.0, 0)
    expect(lastEndPrice).toBeGreaterThan(6)
    expect(lastEndPrice).toBeLessThan(10)
  })
})
