import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'

// Time constants in seconds
const DAY = 86400
const WEEK = 7 * DAY
const MONTH = 30 * DAY

/**
 * Get the current timestamp in seconds
 */
function now(): number {
  return Math.floor(Date.now() / 1000)
}

/**
 * GraphQL query for historical market data to calculate global metrics
 * Uses MarketSnapshot for historical comparisons and Market for current values
 */
export const createGlobalStatsHistoryQuery = () => {
  const currentTime = now()

  return {
    // Current market state for latest TVL/MarketCap
    Market: {
      __args: {
        where: { status: { _eq: 'ACTIVE' } },
      },
      id: true,
      totalSupplyRaw: true,
      totalSupplyFormatted: true,
      marketSupplyRaw: true,
      marketSupplyFormatted: true,
      currentPriceRaw: true,
      currentPriceFormatted: true,
    },

    // Market snapshots from ~24h ago for daily change
    MarketSnapshot: {
      __args: {
        where: {
          timestamp: {
            _gte: String(currentTime - DAY - 3600), // Allow 1h buffer
            _lte: String(currentTime - DAY + 3600),
          },
        },
        order_by: [{ timestamp: 'desc' }],
      },
      id: true,
      market_id: true,
      timestamp: true,
      totalSupplyRaw: true,
      totalSupplyFormatted: true,
      marketSupplyRaw: true,
      marketSupplyFormatted: true,
      priceRaw: true,
      priceFormatted: true,
      volume24hRaw: true,
      volume24hFormatted: true,
    },
  } satisfies GraphQLQueryArgs
}

/**
 * GraphQL query for chart data - hourly snapshots for the last 24h
 */
export const createChart24hQuery = () => {
  const currentTime = now()

  return {
    MarketSnapshot: {
      __args: {
        where: {
          timestamp: { _gte: String(currentTime - DAY) },
        },
        order_by: [{ timestamp: 'asc' }],
      },
      id: true,
      market_id: true,
      timestamp: true,
      totalSupplyRaw: true,
      totalSupplyFormatted: true,
      marketSupplyRaw: true,
      marketSupplyFormatted: true,
      priceRaw: true,
      priceFormatted: true,
      volume24hRaw: true,
      volume24hFormatted: true,
    },
  } satisfies GraphQLQueryArgs
}

/**
 * GraphQL query for 7-day chart data
 */
export const createChart7dQuery = () => {
  const currentTime = now()

  return {
    MarketSnapshot: {
      __args: {
        where: {
          timestamp: { _gte: String(currentTime - WEEK) },
        },
        order_by: [{ timestamp: 'asc' }],
      },
      id: true,
      market_id: true,
      timestamp: true,
      totalSupplyRaw: true,
      totalSupplyFormatted: true,
      marketSupplyRaw: true,
      marketSupplyFormatted: true,
      priceRaw: true,
      priceFormatted: true,
    },
  } satisfies GraphQLQueryArgs
}

/**
 * GraphQL query for 30-day chart data
 */
export const createChart30dQuery = () => {
  const currentTime = now()

  return {
    MarketSnapshot: {
      __args: {
        where: {
          timestamp: { _gte: String(currentTime - MONTH) },
        },
        order_by: [{ timestamp: 'asc' }],
      },
      id: true,
      market_id: true,
      timestamp: true,
      totalSupplyRaw: true,
      totalSupplyFormatted: true,
      marketSupplyRaw: true,
      marketSupplyFormatted: true,
      priceRaw: true,
      priceFormatted: true,
    },
  } satisfies GraphQLQueryArgs
}

export type GlobalStatsHistoryQueryType = ReturnType<typeof createGlobalStatsHistoryQuery>
export type GlobalStatsHistoryQueryResultType = GraphQLQueryResult<GlobalStatsHistoryQueryType>

export type Chart24hQueryType = ReturnType<typeof createChart24hQuery>
export type Chart24hQueryResultType = GraphQLQueryResult<Chart24hQueryType>

export type Chart7dQueryType = ReturnType<typeof createChart7dQuery>
export type Chart7dQueryResultType = GraphQLQueryResult<Chart7dQueryType>

export type Chart30dQueryType = ReturnType<typeof createChart30dQuery>
export type Chart30dQueryResultType = GraphQLQueryResult<Chart30dQueryType>

/**
 * Chart data point for time series visualization
 */
export interface TChartDataPoint {
  timestamp: number
  tvl: number
  marketCap: number
  volume: number
}

/**
 * Global metrics with historical data and calculated changes
 */
export interface TGlobalMetricsWithHistory {
  // Current values
  totalValueLocked: number
  totalMarketCap: number
  totalMarkets: number

  // Percentage changes
  tvlChange24h: number
  marketCapChange24h: number

  // Chart data for different time ranges
  chartData24h: TChartDataPoint[]
  chartData7d: TChartDataPoint[]
  chartData30d: TChartDataPoint[]

  // Last updated timestamp
  lastUpdatedAt: number
}

/**
 * Calculate percentage change between two values
 */
function calculateChange(current: number, past: number): number {
  if (past <= 0) return 0
  return ((current - past) / past) * 100
}

/**
 * Parse formatted string to number, safely handling null/undefined
 */
function parseFormatted(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0
  const parsed = typeof value === 'number' ? value : parseFloat(value)
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Aggregate market snapshots by timestamp to get global TVL/MarketCap at each point
 */
function aggregateSnapshotsByTimestamp(
  snapshots: Array<{
    timestamp?: string | number | bigint | null
    totalSupplyFormatted?: string | null
    marketSupplyFormatted?: string | null
    priceFormatted?: string | null
    volume24hFormatted?: string | null
  }>
): TChartDataPoint[] {
  // Group snapshots by timestamp (rounded to hour)
  const byTimestamp = new Map<number, TChartDataPoint>()

  for (const snapshot of snapshots) {
    const ts = Number(snapshot.timestamp || 0)
    // Round to hour
    const hourTs = Math.floor(ts / 3600) * 3600

    const supply = parseFormatted(snapshot.totalSupplyFormatted)
    const marketSupply = parseFormatted(snapshot.marketSupplyFormatted)
    const price = parseFormatted(snapshot.priceFormatted)
    const volume = parseFormatted(snapshot.volume24hFormatted)

    const tvl = supply * price
    const marketCap = marketSupply * price

    const existing = byTimestamp.get(hourTs)
    if (existing) {
      existing.tvl += tvl
      existing.marketCap += marketCap
      existing.volume += volume
    } else {
      byTimestamp.set(hourTs, {
        timestamp: hourTs,
        tvl,
        marketCap,
        volume,
      })
    }
  }

  // Sort by timestamp and return
  return Array.from(byTimestamp.values()).sort((a, b) => a.timestamp - b.timestamp)
}

/**
 * Compute global metrics from current markets and historical snapshots
 */
export function computeGlobalMetricsWithHistory(
  currentData: GlobalStatsHistoryQueryResultType,
  chart24hData?: Chart24hQueryResultType,
  chart7dData?: Chart7dQueryResultType,
  chart30dData?: Chart30dQueryResultType
): TGlobalMetricsWithHistory {
  const markets = currentData.Market || []
  const snapshots24hAgo = currentData.MarketSnapshot || []

  // Calculate current TVL and Market Cap
  let currentTVL = 0
  let currentMarketCap = 0

  for (const market of markets) {
    const supply = parseFormatted(market.totalSupplyFormatted)
    const marketSupply = parseFormatted(market.marketSupplyFormatted)
    const price = parseFormatted(market.currentPriceFormatted)

    currentTVL += supply * price
    currentMarketCap += marketSupply * price
  }

  // Calculate TVL and Market Cap from 24h ago snapshots
  // Group by market_id and take the most recent for each
  const snapshotsByMarket = new Map<
    string,
    {
      totalSupplyFormatted: string | null
      marketSupplyFormatted: string | null
      priceFormatted: string | null
    }
  >()

  for (const snapshot of snapshots24hAgo) {
    const marketId = snapshot.market_id
    if (!snapshotsByMarket.has(marketId)) {
      snapshotsByMarket.set(marketId, {
        totalSupplyFormatted: snapshot.totalSupplyFormatted ?? null,
        marketSupplyFormatted: snapshot.marketSupplyFormatted ?? null,
        priceFormatted: snapshot.priceFormatted ?? null,
      })
    }
  }

  let tvl24hAgo = 0
  let marketCap24hAgo = 0

  for (const snapshot of snapshotsByMarket.values()) {
    const supply = parseFormatted(snapshot.totalSupplyFormatted)
    const marketSupply = parseFormatted(snapshot.marketSupplyFormatted)
    const price = parseFormatted(snapshot.priceFormatted)

    tvl24hAgo += supply * price
    marketCap24hAgo += marketSupply * price
  }

  // Aggregate chart data
  const chartData24h = chart24hData
    ? aggregateSnapshotsByTimestamp(chart24hData.MarketSnapshot || [])
    : []

  const chartData7d = chart7dData
    ? aggregateSnapshotsByTimestamp(chart7dData.MarketSnapshot || [])
    : []

  const chartData30d = chart30dData
    ? aggregateSnapshotsByTimestamp(chart30dData.MarketSnapshot || [])
    : []

  return {
    totalValueLocked: currentTVL,
    totalMarketCap: currentMarketCap,
    totalMarkets: markets.length,

    tvlChange24h: calculateChange(currentTVL, tvl24hAgo),
    marketCapChange24h: calculateChange(currentMarketCap, marketCap24hAgo),

    chartData24h,
    chartData7d,
    chartData30d,

    lastUpdatedAt: Math.floor(Date.now() / 1000),
  }
}
