import { describe, expect, it } from 'bun:test'

import { calculateFloorAPR } from '../src/graphql/api/mappers'
import { calculate24hPriceChangeFromTrades, toNumber, toWadNumber } from '../src/graphql/api/utils'

const WAD = '1000000000000000000' // 1e18

describe('toWadNumber', () => {
  it('returns formatted value when available', () => {
    expect(toWadNumber('1.5', WAD)).toBe(1.5)
  })

  it('falls back to WAD-decoded raw when formatted is null', () => {
    // 2.5 WAD = 2500000000000000000
    expect(toWadNumber(null, '2500000000000000000')).toBe(2.5)
  })

  it('falls back to WAD-decoded raw when formatted is empty', () => {
    expect(toWadNumber('', '1000000000000000000')).toBe(1)
  })

  it('handles sub-1 WAD prices correctly', () => {
    // 0.01 WAD = 10000000000000000
    expect(toWadNumber(null, '10000000000000000')).toBe(0.01)
  })

  it('returns 0 when both are null', () => {
    expect(toWadNumber(null, null)).toBe(0)
  })

  it('returns 0 for invalid raw', () => {
    expect(toWadNumber(null, 'not-a-number')).toBe(0)
  })

  it('does NOT treat raw as plain number (the old bug)', () => {
    // Old toNumber('1000000000000000000') = 1e18 ≈ 1000000000000000000
    // toWadNumber should interpret it as WAD → 1.0
    expect(toWadNumber(null, WAD)).toBe(1)
    // Contrast with toNumber which would return the astronomical value
    expect(toNumber(WAD)).toBe(1e18)
  })
})

describe('toWadNumber with USDC (6-dec) market prices', () => {
  it('correctly interprets a USDC-market floor price when formatted is missing', () => {
    // Even though the reserve is USDC (6 dec), bonding-curve prices are always WAD
    // A floor price of 0.5 in WAD = 500000000000000000
    expect(toWadNumber(null, '500000000000000000')).toBe(0.5)
  })

  it('prefers formatted value over raw', () => {
    // Formatted says 0.5, raw is the WAD encoding — formatted should win
    expect(toWadNumber('0.5', '500000000000000000')).toBe(0.5)
  })
})

describe('calculateFloorAPR with WAD-only elevation prices', () => {
  it('uses toWadNumber for elevation prices (raw WAD)', () => {
    // Simulate elevations where only Raw fields are available
    const elevations = [
      {
        oldFloorPriceFormatted: null as any,
        oldFloorPriceRaw: '1000000000000000000', // 1.0 WAD
        newFloorPriceFormatted: null as any,
        newFloorPriceRaw: '1100000000000000000', // 1.1 WAD
        timestamp: '1000',
        deployedAmountFormatted: '100',
        deployedAmountRaw: '100',
        transactionHash: '0x123',
      },
    ]
    const apr = calculateFloorAPR(elevations, 1.1)
    // (0.1 / 1.1) * 365 ≈ 33.18
    expect(apr).toBeGreaterThan(30)
    expect(apr).toBeLessThan(40)
  })
})

describe('calculate24hPriceChangeFromTrades with WAD raw fallback', () => {
  it('uses WAD decoding for baseline price raw', () => {
    const now = Math.floor(Date.now() / 1000)
    const trades = [
      {
        newPriceFormatted: null,
        newPriceRaw: '1000000000000000000', // 1.0 WAD
        timestamp: String(now - 25 * 3600), // 25h ago
      },
    ]
    // Current price is 1.1 — expect ~10% change
    const change = calculate24hPriceChangeFromTrades(trades, 1.1)
    expect(change).toBeCloseTo(10, 0)
  })

  it('prefers formatted over raw for baseline', () => {
    const now = Math.floor(Date.now() / 1000)
    const trades = [
      {
        newPriceFormatted: '2.0',
        newPriceRaw: '2000000000000000000',
        timestamp: String(now - 25 * 3600),
      },
    ]
    // Current price is 2.2 → 10% change
    const change = calculate24hPriceChangeFromTrades(trades, 2.2)
    expect(change).toBeCloseTo(10, 0)
  })
})
