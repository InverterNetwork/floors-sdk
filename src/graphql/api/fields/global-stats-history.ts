import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'

// Time constants in seconds
const DAY = 86400
const WEEK = 7 * DAY
const MONTH = 30 * DAY

/**
 * Get the current timestamp in seconds
 * Uses chain timestamp if provided, otherwise falls back to wall-clock
 */
function now(chainTimestamp?: number): number {
  return chainTimestamp ?? Math.floor(Date.now() / 1000)
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
 * Time bucket intervals for different time ranges (in seconds)
 */
export const TIME_BUCKET_INTERVALS = {
  '24h': 10 * 60, // 10 minutes for 24h view (144 points)
  '7d': 60 * 60, // 1 hour for 7d view (168 points)
  '30d': 4 * 60 * 60, // 4 hours for 30d view (180 points)
} as const

export type TimeRange = keyof typeof TIME_BUCKET_INTERVALS

/**
 * Fill gaps in chart data with interpolated values
 *
 * This function takes sparse data points and creates a dense time series
 * with regular intervals. Missing values are filled using linear interpolation
 * between the nearest known points.
 *
 * @param data - Sparse data points (may have gaps)
 * @param timeRange - The time range ('24h', '7d', '30d')
 * @param currentValues - Optional current values to use as the last point
 * @param chainTimestamp - Optional chain timestamp (defaults to wall-clock)
 * @returns Dense array of data points at regular intervals
 */
export function fillChartDataGaps(
  data: TChartDataPoint[],
  timeRange: TimeRange,
  currentValues?: { tvl: number; marketCap: number; volume: number },
  chainTimestamp?: number
): TChartDataPoint[] {
  const interval = TIME_BUCKET_INTERVALS[timeRange]
  const currentTime = now(chainTimestamp)

  // Calculate start time based on range
  const rangeDuration = {
    '24h': DAY,
    '7d': WEEK,
    '30d': MONTH,
  }[timeRange]

  const startTime = currentTime - rangeDuration
  // Round start time down to nearest interval
  const alignedStart = Math.floor(startTime / interval) * interval

  // Generate all time buckets
  const buckets: number[] = []
  for (let t = alignedStart; t <= currentTime; t += interval) {
    buckets.push(t)
  }

  // If no data at all, return empty buckets or fill with current values if provided
  if (data.length === 0) {
    if (currentValues) {
      // Fill all buckets with current values (flat line)
      return buckets.map((timestamp) => ({
        timestamp,
        tvl: currentValues.tvl,
        marketCap: currentValues.marketCap,
        volume: currentValues.volume,
      }))
    }
    return []
  }

  // Create a map of existing data points for quick lookup
  // Map to nearest bucket
  const dataMap = new Map<number, TChartDataPoint>()
  for (const point of data) {
    const bucketTs = Math.round(point.timestamp / interval) * interval
    // If multiple points fall into same bucket, keep the latest
    const existing = dataMap.get(bucketTs)
    if (!existing || point.timestamp > existing.timestamp) {
      dataMap.set(bucketTs, { ...point, timestamp: bucketTs })
    }
  }

  // Add current values as the last data point if provided
  if (currentValues) {
    const lastBucket = buckets[buckets.length - 1]
    if (!dataMap.has(lastBucket) || lastBucket >= currentTime - interval) {
      dataMap.set(lastBucket, {
        timestamp: lastBucket,
        ...currentValues,
      })
    }
  }

  // Sort known points by timestamp
  const knownPoints = Array.from(dataMap.values()).sort((a, b) => a.timestamp - b.timestamp)

  if (knownPoints.length === 0) {
    return []
  }

  // If only one point, fill all buckets with that value (flat line)
  if (knownPoints.length === 1) {
    const singlePoint = knownPoints[0]
    return buckets.map((timestamp) => ({
      timestamp,
      tvl: singlePoint.tvl,
      marketCap: singlePoint.marketCap,
      volume: singlePoint.volume,
    }))
  }

  // Fill gaps using linear interpolation
  const result: TChartDataPoint[] = []

  for (const bucketTs of buckets) {
    // Check if we have exact data for this bucket
    const exactData = dataMap.get(bucketTs)
    if (exactData) {
      result.push(exactData)
      continue
    }

    // Find surrounding known points for interpolation
    let prevPoint: TChartDataPoint | null = null
    let nextPoint: TChartDataPoint | null = null

    for (const point of knownPoints) {
      if (point.timestamp <= bucketTs) {
        prevPoint = point
      } else if (point.timestamp > bucketTs && !nextPoint) {
        nextPoint = point
        break
      }
    }

    // Interpolate or extrapolate
    if (prevPoint && nextPoint) {
      // Linear interpolation between two points
      const ratio = (bucketTs - prevPoint.timestamp) / (nextPoint.timestamp - prevPoint.timestamp)
      result.push({
        timestamp: bucketTs,
        tvl: prevPoint.tvl + (nextPoint.tvl - prevPoint.tvl) * ratio,
        marketCap: prevPoint.marketCap + (nextPoint.marketCap - prevPoint.marketCap) * ratio,
        volume: prevPoint.volume + (nextPoint.volume - prevPoint.volume) * ratio,
      })
    } else if (prevPoint) {
      // No next point - use last known value (forward fill)
      result.push({
        timestamp: bucketTs,
        tvl: prevPoint.tvl,
        marketCap: prevPoint.marketCap,
        volume: prevPoint.volume,
      })
    } else if (nextPoint) {
      // No previous point - use first known value (backward fill)
      result.push({
        timestamp: bucketTs,
        tvl: nextPoint.tvl,
        marketCap: nextPoint.marketCap,
        volume: nextPoint.volume,
      })
    }
  }

  return result
}

/**
 * Compute global metrics from current markets and historical snapshots
 */
export function computeGlobalMetricsWithHistory(
  currentData: GlobalStatsHistoryQueryResultType,
  chart24hData?: Chart24hQueryResultType,
  chart7dData?: Chart7dQueryResultType,
  chart30dData?: Chart30dQueryResultType,
  chainTimestamp?: number
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

  // Aggregate raw chart data from snapshots
  const rawChartData24h = chart24hData
    ? aggregateSnapshotsByTimestamp(chart24hData.MarketSnapshot || [])
    : []

  const rawChartData7d = chart7dData
    ? aggregateSnapshotsByTimestamp(chart7dData.MarketSnapshot || [])
    : []

  const rawChartData30d = chart30dData
    ? aggregateSnapshotsByTimestamp(chart30dData.MarketSnapshot || [])
    : []

  // Current values for filling gaps to present time
  const currentValues = {
    tvl: currentTVL,
    marketCap: currentMarketCap,
    volume: 0, // Volume is cumulative, not a point-in-time value
  }

  // Fill gaps in chart data with interpolated values at regular intervals
  const chartData24h = fillChartDataGaps(rawChartData24h, '24h', currentValues, chainTimestamp)
  const chartData7d = fillChartDataGaps(rawChartData7d, '7d', currentValues, chainTimestamp)
  const chartData30d = fillChartDataGaps(rawChartData30d, '30d', currentValues, chainTimestamp)

  return {
    totalValueLocked: currentTVL,
    totalMarketCap: currentMarketCap,
    totalMarkets: markets.length,

    tvlChange24h: calculateChange(currentTVL, tvl24hAgo),
    marketCapChange24h: calculateChange(currentMarketCap, marketCap24hAgo),

    chartData24h,
    chartData7d,
    chartData30d,

    lastUpdatedAt: chainTimestamp ?? Math.floor(Date.now() / 1000),
  }
}
