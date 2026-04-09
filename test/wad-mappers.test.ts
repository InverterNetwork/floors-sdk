/**
 * Tests that verify WAD pricing fixes actually work end-to-end through
 * mapper functions. Each test exercises the real mapper with WAD-only raw
 * data (formatted = null/undefined) to validate that toWadNumber fallback
 * is correctly wired through the pipeline.
 *
 * Key invariant: bonding-curve prices are always WAD (1e18 fixed-point)
 * regardless of the reserve token's decimals. When formatted is missing,
 * raw WAD strings must be decoded with formatUnits(raw, 18).
 */

import { describe, expect, it } from 'bun:test'

import { transformCandlesToChartData } from '../src/client/utils/chart'
import { computePlatformMetrics } from '../src/graphql/api/fields/platform'
import {
  mapLoanToUserLoanData,
  mapMarketSnapshotToPremiumChange,
  mapMarketToFloorAssetData,
  mapPresaleToPresaleData,
} from '../src/graphql/api/mappers'

// Price helpers — prices are in reserve-token decimals (e.g. 6 for USDC, 18 for WETH)
const WAD = '1000000000000000000' // 1e18 = 1.0 (for 18-decimal tokens)
const toWad = (n: number) => String(BigInt(Math.round(n * 1e18)))
// For USDC (6 decimals): price "1.8" is stored as 1800000 on-chain
const toUsdcPrice = (n: number) => String(BigInt(Math.round(n * 1e6)))

// ─── Fixtures ──────────────────────────────────────────────────────────────

/** Minimal market with WAD-only raw price data (no Formatted fields) */
function makeMarketWithWadOnlyPrices(overrides?: Record<string, any>) {
  return {
    id: '0x1111111111111111111111111111111111111111',
    creator_id: '0x0000',
    factory_id: '0x0000',
    reserveToken_id: '0xUSDC',
    issuanceToken_id: '0xISSUE',
    // Prices: only Raw (reserve-decimal scaled), Formatted is null
    currentPriceRaw: toUsdcPrice(2.5),
    currentPriceFormatted: null,
    floorPriceRaw: toUsdcPrice(1.8),
    floorPriceFormatted: null,
    initialFloorPriceRaw: toUsdcPrice(1.0),
    initialFloorPriceFormatted: null,
    // Supply: use formatted (these are not prices, so toNumber is fine)
    totalSupplyRaw: '1000000000000000000000', // 1000 tokens at 18 dec
    totalSupplyFormatted: '1000',
    marketSupplyRaw: '500000000000000000000',
    marketSupplyFormatted: '500',
    floorSupplyRaw: '300000000',
    floorSupplyFormatted: '0.3',
    tradingFeeBps: '300',
    buyFeeBps: '100',
    sellFeeBps: '50',
    maxLTV: '800000000000000000', // 0.8
    status: 'ACTIVE',
    isBuyOpen: true,
    isSellOpen: true,
    createdAt: '1700000000',
    lastUpdatedAt: '1700010000',
    lastTradeTimestamp: '1700009000',
    lastElevationTimestamp: '1700008000',
    reserveToken: { name: 'USD Coin', symbol: 'USDC', decimals: 6 },
    issuanceToken: {
      name: 'Test Floor Token',
      symbol: 'TFT',
      decimals: 18,
      maxSupplyRaw: '0',
      maxSupplyFormatted: '0',
    },
    trades: [],
    floorElevations: [],
    __typename: 'Market',
    ...overrides,
  } as any
}

// ─── mapMarketToFloorAssetData ─────────────────────────────────────────────

describe('mapMarketToFloorAssetData — WAD-only price fallback', () => {
  it('decodes floor and market prices from WAD raw when formatted is null', () => {
    const market = makeMarketWithWadOnlyPrices()
    const result = mapMarketToFloorAssetData(market)

    expect(result.pricing.currentFloorPrice).toBeCloseTo(1.8, 6)
    expect(result.pricing.currentMarketPrice).toBeCloseTo(2.5, 6)
  })

  it('computes premium correctly from reserve-decimal-decoded prices', () => {
    const market = makeMarketWithWadOnlyPrices({
      floorPriceRaw: toUsdcPrice(2.0),
      currentPriceRaw: toUsdcPrice(3.0),
    })
    const result = mapMarketToFloorAssetData(market)

    // Premium = (market - floor) / floor = (3.0 - 2.0) / 2.0 = 0.5 = 50%
    const premium =
      ((result.pricing.currentMarketPrice - result.pricing.currentFloorPrice) /
        result.pricing.currentFloorPrice) *
      100
    expect(premium).toBeCloseTo(50, 1)
  })

  it('computes TVL and market cap from reserve-decimal-decoded prices', () => {
    const market = makeMarketWithWadOnlyPrices({
      currentPriceRaw: toUsdcPrice(5.0),
      totalSupplyFormatted: '200',
      marketSupplyFormatted: '100',
    })
    const result = mapMarketToFloorAssetData(market)

    // TVL = totalSupply * marketPrice = 200 * 5.0 = 1000
    expect(result.metrics.totalValueLocked).toBeCloseTo(1000, 1)
    // Market cap = marketSupply * marketPrice = 100 * 5.0 = 500
    expect(result.metrics.marketCap).toBeCloseTo(500, 1)
  })

  it('decodes elevation prices from raw when formatted is null', () => {
    const market = makeMarketWithWadOnlyPrices({
      floorPriceRaw: toUsdcPrice(1.5),
      floorElevations: [
        {
          id: 'e1',
          market_id: '0x1111111111111111111111111111111111111111',
          oldFloorPriceRaw: toUsdcPrice(1.0),
          oldFloorPriceFormatted: null,
          newFloorPriceRaw: toUsdcPrice(1.3),
          newFloorPriceFormatted: null,
          deployedAmountRaw: '500',
          deployedAmountFormatted: '500',
          timestamp: '1700005000',
          transactionHash: '0xabc',
          __typename: 'FloorElevation',
        },
        {
          id: 'e2',
          market_id: '0x1111111111111111111111111111111111111111',
          oldFloorPriceRaw: toUsdcPrice(1.3),
          oldFloorPriceFormatted: null,
          newFloorPriceRaw: toUsdcPrice(1.5),
          newFloorPriceFormatted: null,
          deployedAmountRaw: '300',
          deployedAmountFormatted: '300',
          timestamp: '1700008000',
          transactionHash: '0xdef',
          __typename: 'FloorElevation',
        },
      ],
    })
    const result = mapMarketToFloorAssetData(market)

    // Elevation history should have decoded prices in reserve-token decimals
    expect(result.floorElevation.elevationHistory).toHaveLength(2)
    // Sorted desc by timestamp: e2 first, then e1
    const latestElevation = result.floorElevation.elevationHistory[0]
    expect(latestElevation.previousFloorPrice).toBeCloseTo(1.3, 6)
    expect(latestElevation.newFloorPrice).toBeCloseTo(1.5, 6)
    expect(latestElevation.priceIncrease).toBeCloseTo(0.2, 6)

    const olderElevation = result.floorElevation.elevationHistory[1]
    expect(olderElevation.previousFloorPrice).toBeCloseTo(1.0, 6)
    expect(olderElevation.newFloorPrice).toBeCloseTo(1.3, 6)
  })

  it('computes estimatedFloorIncrease from reserve-decimal-decoded elevations', () => {
    const market = makeMarketWithWadOnlyPrices({
      floorPriceRaw: toUsdcPrice(1.5),
      floorElevations: [
        {
          id: 'e1',
          market_id: '0x1111',
          oldFloorPriceRaw: toUsdcPrice(1.0),
          oldFloorPriceFormatted: null,
          newFloorPriceRaw: toUsdcPrice(1.2),
          newFloorPriceFormatted: null,
          deployedAmountRaw: '100',
          deployedAmountFormatted: '100',
          timestamp: '1700000000',
          transactionHash: '0x1',
          __typename: 'FloorElevation',
        },
        {
          id: 'e2',
          market_id: '0x1111',
          oldFloorPriceRaw: toUsdcPrice(1.2),
          oldFloorPriceFormatted: null,
          newFloorPriceRaw: toUsdcPrice(1.5),
          newFloorPriceFormatted: null,
          deployedAmountRaw: '100',
          deployedAmountFormatted: '100',
          timestamp: '1700005000',
          transactionHash: '0x2',
          __typename: 'FloorElevation',
        },
      ],
    })
    const result = mapMarketToFloorAssetData(market)

    // Estimated increase = latestNew - secondNew = 1.5 - 1.2 = 0.3
    expect(result.floorElevation.estimatedFloorIncrease).toBeCloseTo(0.3, 6)
  })
})

// ─── mapPresaleToPresaleData ──────────────────────────────────────────────

describe('mapPresaleToPresaleData — WAD price breakpoints', () => {
  function makePresale(breakpoints: string[]) {
    return {
      id: '0xPresale',
      market_id: '0x1111',
      startTime: '1700000000',
      endTime: '1700100000',
      currentState: 2, // Public
      totalRaisedRaw: '500000000',
      totalRaisedFormatted: '500',
      globalDepositCapRaw: '1000000000',
      globalDepositCapFormatted: '1000',
      perAddressDepositCapRaw: '100000000',
      perAddressDepositCapFormatted: '100',
      commissionBps: ['500'],
      priceBreakpointsFlat: breakpoints,
      priceBreakpointOffsets: [],
      participations: [],
    } as any
  }

  it('decodes WAD price breakpoints correctly', () => {
    // Price breakpoints: 0.5, 1.0, 1.5 in WAD
    const presale = makePresale([toWad(0.5), toWad(1.0), toWad(1.5)])
    const result = mapPresaleToPresaleData(presale, 1700050000000)

    // currentPrice should be the first breakpoint decoded from WAD
    expect(result.currentPrice).toBeCloseTo(0.5, 6)
  })

  it('decodes sub-unit WAD breakpoints (USDC-like prices)', () => {
    // Even for a USDC market, breakpoints are WAD. Price = 0.001 WAD
    const presale = makePresale([toWad(0.001), toWad(0.01)])
    const result = mapPresaleToPresaleData(presale, 1700050000000)

    expect(result.currentPrice).toBeCloseTo(0.001, 6)
  })

  it('returns 0 price when no breakpoints exist', () => {
    const presale = makePresale([])
    const result = mapPresaleToPresaleData(presale, 1700050000000)

    expect(result.currentPrice).toBe(0)
  })

  it('does not interpret breakpoints as plain numbers (regression)', () => {
    // If breakpoints were treated as plain numbers, 1e18 would be 1000000000000000000
    // toWadNumber should decode it as 1.0
    const presale = makePresale([WAD])
    const result = mapPresaleToPresaleData(presale, 1700050000000)

    expect(result.currentPrice).toBe(1)
    // NOT 1e18 (the old bug)
    expect(result.currentPrice).not.toBeGreaterThan(2)
  })
})

// ─── mapLoanToUserLoanData ────────────────────────────────────────────────

describe('mapLoanToUserLoanData — WAD floorPriceAtBorrow', () => {
  function makeLoan(overrides?: Record<string, any>) {
    return {
      id: '0xFacility-42',
      borrower_id: '0xBorrower',
      market_id: '0x1111',
      lockedCollateralRaw: '100000000000000000000', // 100 tokens at 18 dec
      lockedCollateralFormatted: '100',
      borrowAmountRaw: '50000000',
      borrowAmountFormatted: '50',
      remainingDebtRaw: '30000000',
      remainingDebtFormatted: '30',
      originationFeeRaw: '500000',
      originationFeeFormatted: '0.5',
      floorPriceAtBorrowRaw: toWad(1.5),
      floorPriceAtBorrowFormatted: null, // WAD-only!
      status: 'ACTIVE',
      openedAt: '1700000000',
      closedAt: null,
      lastUpdatedAt: '1700005000',
      transactionHash: '0xabc',
      ...overrides,
    } as any
  }

  it('decodes WAD floorPriceAtBorrow from raw when formatted is null', () => {
    const loan = makeLoan()
    const result = mapLoanToUserLoanData(loan)

    expect(result.floorPriceAtBorrow).toBeCloseTo(1.5, 6)
  })

  it('does not treat raw WAD as plain number (regression)', () => {
    const loan = makeLoan({ floorPriceAtBorrowRaw: toWad(0.75) })
    const result = mapLoanToUserLoanData(loan)

    // 0.75 WAD = 750000000000000000 — must NOT be interpreted as 7.5e17
    expect(result.floorPriceAtBorrow).toBeCloseTo(0.75, 6)
    expect(result.floorPriceAtBorrow).toBeLessThan(1)
  })

  it('prefers formatted value over raw when both are present', () => {
    const loan = makeLoan({
      floorPriceAtBorrowRaw: toWad(1.5),
      floorPriceAtBorrowFormatted: '1.5',
    })
    const result = mapLoanToUserLoanData(loan)

    expect(result.floorPriceAtBorrow).toBe(1.5)
  })

  it('extracts loan index from composite ID', () => {
    const loan = makeLoan({ id: '0xFacility-42' })
    const result = mapLoanToUserLoanData(loan)

    expect(result.loanId).toBe(42n)
  })
})

// ─── mapMarketSnapshotToPremiumChange ─────────────────────────────────────

describe('mapMarketSnapshotToPremiumChange — WAD snapshot prices', () => {
  it('computes premium change from WAD-only snapshot prices', () => {
    // 24h ago: market=2.0, floor=1.5 → premium = (2-1.5)/1.5*100 = 33.33%
    // Now:    market=2.5, floor=1.5 → premium = (2.5-1.5)/1.5*100 = 66.67%
    // Change = ((66.67 - 33.33) / |33.33|) * 100 = 100%
    const snapshot = {
      priceFormatted: null,
      priceRaw: toWad(2.0),
      floorPriceFormatted: null,
      floorPriceRaw: toWad(1.5),
    }
    const change = mapMarketSnapshotToPremiumChange(snapshot, 2.5, 1.5)

    expect(change).toBeCloseTo(100, 0)
  })

  it('returns null when snapshot is null', () => {
    expect(mapMarketSnapshotToPremiumChange(null, 2.5, 1.5)).toBeNull()
  })

  it('returns null when WAD prices decode to zero', () => {
    const snapshot = {
      priceFormatted: null,
      priceRaw: '0',
      floorPriceFormatted: null,
      floorPriceRaw: '0',
    }
    expect(mapMarketSnapshotToPremiumChange(snapshot, 2.5, 1.5)).toBeNull()
  })

  it('does not misinterpret WAD raw as plain number (regression)', () => {
    // If WAD raw "1500000000000000000" were treated as a plain number,
    // the price would be 1.5e18 and premium calculations would be wildly wrong
    const snapshot = {
      priceFormatted: null,
      priceRaw: toWad(2.0),
      floorPriceFormatted: null,
      floorPriceRaw: toWad(1.5),
    }
    const change = mapMarketSnapshotToPremiumChange(snapshot, 2.5, 1.5)

    // Should be a reasonable percentage, not astronomical
    expect(change).not.toBeNull()
    expect(Math.abs(change!)).toBeLessThan(1000)
  })
})

// ─── computePlatformMetrics ───────────────────────────────────────────────

describe('computePlatformMetrics — WAD price fallback for TVL', () => {
  it('computes TVL correctly when only raw WAD prices are available', () => {
    const data = {
      Market: [
        {
          totalSupplyFormatted: '1000',
          totalSupplyRaw: '1000000000000000000000',
          marketSupplyFormatted: '500',
          marketSupplyRaw: '500000000000000000000',
          currentPriceRaw: toWad(3.0),
          currentPriceFormatted: null,
          createdAt: '1700000000',
          trades: [],
        },
      ],
      Account: [{ id: '0xUser1' }],
      Loan: [],
    } as any

    const metrics = computePlatformMetrics(data, 1700010000)

    // TVL = 1000 supply * 3.0 price = 3000
    expect(metrics.totalValueLocked).toBeCloseTo(3000, 1)
    // Market cap = 500 * 3.0 = 1500
    expect(metrics.totalMarketCap).toBeCloseTo(1500, 1)
  })

  it('does not treat raw WAD price as plain number (regression)', () => {
    const data = {
      Market: [
        {
          totalSupplyFormatted: '100',
          totalSupplyRaw: '100000000000000000000',
          marketSupplyFormatted: '100',
          marketSupplyRaw: '100000000000000000000',
          currentPriceRaw: WAD, // 1.0 in WAD
          currentPriceFormatted: null,
          createdAt: '1700000000',
          trades: [],
        },
      ],
      Account: [],
      Loan: [],
    } as any

    const metrics = computePlatformMetrics(data, 1700010000)

    // TVL should be 100 * 1.0 = 100, NOT 100 * 1e18
    expect(metrics.totalValueLocked).toBeCloseTo(100, 1)
    expect(metrics.totalValueLocked).toBeLessThan(200)
  })

  it('aggregates TVL across multiple markets with WAD-only prices', () => {
    const data = {
      Market: [
        {
          totalSupplyFormatted: '500',
          marketSupplyFormatted: '300',
          currentPriceRaw: toWad(2.0),
          currentPriceFormatted: null,
          createdAt: '1700000000',
          trades: [],
        },
        {
          totalSupplyFormatted: '200',
          marketSupplyFormatted: '100',
          currentPriceRaw: toWad(5.0),
          currentPriceFormatted: null,
          createdAt: '1700000000',
          trades: [],
        },
      ],
      Account: [],
      Loan: [],
    } as any

    const metrics = computePlatformMetrics(data, 1700010000)

    // TVL = (500 * 2) + (200 * 5) = 1000 + 1000 = 2000
    expect(metrics.totalValueLocked).toBeCloseTo(2000, 1)
    // MarketCap = (300 * 2) + (100 * 5) = 600 + 500 = 1100
    expect(metrics.totalMarketCap).toBeCloseTo(1100, 1)
  })
})

// ─── transformCandlesToChartData ──────────────────────────────────────────

describe('transformCandlesToChartData — WAD OHLC price fallback', () => {
  function makeCandle(overrides?: Record<string, any>) {
    return {
      id: 'c1',
      market_id: '0x1111',
      period: 'hourly' as const,
      timestamp: '1700000000',
      openRaw: toWad(1.0),
      openFormatted: null,
      highRaw: toWad(1.5),
      highFormatted: null,
      lowRaw: toWad(0.8),
      lowFormatted: null,
      closeRaw: toWad(1.2),
      closeFormatted: null,
      volumeRaw: '5000000', // 5 USDC at 6 dec (NOT a price)
      volumeFormatted: '5',
      trades: '10',
      ...overrides,
    } as any
  }

  it('decodes OHLC prices from WAD raw when formatted is null', () => {
    const candle = makeCandle()
    const [result] = transformCandlesToChartData([candle])

    expect(result.open).toBeCloseTo(1.0, 6)
    expect(result.high).toBeCloseTo(1.5, 6)
    expect(result.low).toBeCloseTo(0.8, 6)
    expect(result.close).toBeCloseTo(1.2, 6)
    expect(result.marketPrice).toBeCloseTo(1.2, 6) // marketPrice = close
  })

  it('uses formatted volume (not WAD-decoded)', () => {
    const candle = makeCandle()
    const [result] = transformCandlesToChartData([candle])

    // Volume should be 5 (from formatted), not WAD-decoded 5000000
    expect(result.volume).toBe(5)
  })

  it('does not interpret OHLC raw as plain numbers (regression)', () => {
    const candle = makeCandle({
      openRaw: WAD, // 1.0 in WAD
      closeRaw: WAD,
    })
    const [result] = transformCandlesToChartData([candle])

    // open/close should be 1.0, NOT 1e18
    expect(result.open).toBe(1)
    expect(result.close).toBe(1)
    expect(result.open).toBeLessThan(2)
  })

  it('sorts candles by timestamp ascending', () => {
    const candles = [
      makeCandle({ timestamp: '1700002000', closeRaw: toWad(3.0) }),
      makeCandle({ timestamp: '1700000000', closeRaw: toWad(1.0) }),
      makeCandle({ timestamp: '1700001000', closeRaw: toWad(2.0) }),
    ]
    const results = transformCandlesToChartData(candles)

    expect(results[0].close).toBeCloseTo(1.0, 6)
    expect(results[1].close).toBeCloseTo(2.0, 6)
    expect(results[2].close).toBeCloseTo(3.0, 6)
  })

  it('prefers formatted over raw when both are present', () => {
    const candle = makeCandle({
      openRaw: toWad(1.0),
      openFormatted: '1.0',
      closeRaw: toWad(2.0),
      closeFormatted: '2.0',
    })
    const [result] = transformCandlesToChartData([candle])

    expect(result.open).toBe(1.0)
    expect(result.close).toBe(2.0)
  })
})
