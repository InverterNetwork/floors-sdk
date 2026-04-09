import type { TPriceCandle, TPriceCandlesByPeriod } from '../../graphql/api'

export type { TPriceCandle, TPriceCandlesByPeriod }

/** UI timeframe options for chart display */
export type ChartTimeframe = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL'

/** Candle period keys matching TPriceCandlesByPeriod */
export type CandlePeriodKey = keyof TPriceCandlesByPeriod

/** Transformed candle data for chart rendering */
export interface TransformedCandleData {
  date: string
  timestamp: number
  floorPrice: number
  marketPrice: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  trades: number
}

/** Result from getBestAvailableCandles */
export interface CandlesWithPeriod {
  candles: TPriceCandle[]
  period: CandlePeriodKey
}

/** Minimum data points needed for a meaningful chart line */
const MIN_CHART_POINTS = 2

/**
 * Maps UI timeframe to the appropriate candle period
 * - 1D: hourly candles
 * - 1W: fourHour candles
 * - 1M+: daily candles
 */
export function getCandlePeriodForTimeframe(timeframe: ChartTimeframe): CandlePeriodKey {
  switch (timeframe) {
    case '1D':
      return 'hourly'
    case '1W':
      return 'fourHour'
    default:
      return 'daily'
  }
}

/** Get the time cutoff in milliseconds for a given timeframe */
export function getTimeframeCutoff(timeframe: ChartTimeframe, chainTimestampMs?: number): number {
  if (timeframe === 'ALL') return 0

  const now = chainTimestampMs ?? Date.now()
  const MS_PER_DAY = 24 * 60 * 60 * 1000

  const cutoffs: Record<string, number> = {
    '1D': now - MS_PER_DAY,
    '1W': now - 7 * MS_PER_DAY,
    '1M': now - 30 * MS_PER_DAY,
    '3M': now - 90 * MS_PER_DAY,
    '6M': now - 180 * MS_PER_DAY,
    '1Y': now - 365 * MS_PER_DAY,
  }

  return cutoffs[timeframe] ?? 0
}

/** Filter candles by timeframe cutoff */
export function filterCandlesByTimeframe(
  candles: TPriceCandle[],
  timeframe: ChartTimeframe,
  chainTimestampMs?: number
): TPriceCandle[] {
  if (timeframe === 'ALL') return candles
  const cutoff = getTimeframeCutoff(timeframe, chainTimestampMs)
  return candles.filter((candle) => Number(candle.timestamp) * 1000 >= cutoff)
}

/** Get fallback order for candle periods when preferred period has insufficient data */
export function getFallbackPeriods(preferredPeriod: CandlePeriodKey): CandlePeriodKey[] {
  switch (preferredPeriod) {
    case 'hourly':
      return ['hourly', 'fourHour', 'daily']
    case 'fourHour':
      return ['fourHour', 'hourly', 'daily']
    case 'daily':
      return ['daily', 'fourHour', 'hourly']
    default:
      return ['daily']
  }
}

/** Transform raw price candles to chart-ready format */
export function transformCandlesToChartData(candles: TPriceCandle[]): TransformedCandleData[] {
  // Sort candles by timestamp ascending to ensure consistent chart rendering
  const sortedCandles = [...candles].sort((a, b) => Number(a.timestamp) - Number(b.timestamp))

  return sortedCandles.map((candle) => {
    const timestamp = Number(candle.timestamp) * 1000
    const open = parseFloat(candle.openFormatted || String(candle.openRaw || 0))
    const high = parseFloat(candle.highFormatted || String(candle.highRaw || 0))
    const low = parseFloat(candle.lowFormatted || String(candle.lowRaw || 0))
    const close = parseFloat(candle.closeFormatted || String(candle.closeRaw || 0))
    const volume = parseFloat(candle.volumeFormatted || String(candle.volumeRaw || 0))
    const trades = Number(candle.trades || 0)

    return {
      date: formatCandleDate(timestamp, candle.period),
      timestamp,
      marketPrice: close,
      floorPrice: 0, // Set by consumer from asset data
      open,
      high,
      low,
      close,
      volume,
      trades,
    }
  })
}

function formatCandleDate(timestamp: number, period: TPriceCandle['period']): string {
  const date = new Date(timestamp)

  if (period === 'ONE_HOUR' || period === 'FOUR_HOURS') {
    return date.toLocaleTimeString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Get chart data for a specific timeframe with fallback to other periods
 * Requires minimum data points for a meaningful chart line
 */
export function getChartDataForTimeframe(
  priceCandles: TPriceCandlesByPeriod | undefined,
  timeframe: ChartTimeframe,
  chainTimestampMs?: number
): TransformedCandleData[] {
  if (!priceCandles) return []

  const preferredPeriod = getCandlePeriodForTimeframe(timeframe)
  const fallbackOrder = getFallbackPeriods(preferredPeriod)

  // Try each period until we find enough data points
  for (let i = 0; i < fallbackOrder.length; i++) {
    const periodKey = fallbackOrder[i]
    const candles = priceCandles[periodKey] ?? []
    const isPreferredPeriod = i === 0

    // Apply timeframe cutoff only to preferred period
    const filteredCandles = isPreferredPeriod
      ? filterCandlesByTimeframe(candles, timeframe, chainTimestampMs)
      : candles

    if (filteredCandles.length >= MIN_CHART_POINTS) {
      return transformCandlesToChartData(filteredCandles)
    }
  }

  // Fallback: return any available data
  for (const periodKey of fallbackOrder) {
    const candles = priceCandles[periodKey] ?? []
    if (candles.length > 0) {
      return transformCandlesToChartData(candles)
    }
  }

  return []
}

/**
 * Get the best available candles for a timeframe with fallback
 * Returns both the candles and their period for proper formatting
 */
export function getBestAvailableCandles(
  priceCandles: TPriceCandlesByPeriod | undefined,
  timeframe: ChartTimeframe,
  chainTimestampMs?: number
): CandlesWithPeriod | null {
  if (!priceCandles) return null

  const preferredPeriod = getCandlePeriodForTimeframe(timeframe)
  const fallbackOrder = getFallbackPeriods(preferredPeriod)

  // Try each period until we find enough data points
  for (let i = 0; i < fallbackOrder.length; i++) {
    const periodKey = fallbackOrder[i]
    const candles = priceCandles[periodKey] ?? []
    const isPreferredPeriod = i === 0

    const filteredCandles = isPreferredPeriod
      ? filterCandlesByTimeframe(candles, timeframe, chainTimestampMs)
      : candles

    if (filteredCandles.length >= MIN_CHART_POINTS) {
      return { candles: filteredCandles, period: periodKey }
    }
  }

  // Fallback: return any available data
  for (const periodKey of fallbackOrder) {
    const candles = priceCandles[periodKey] ?? []
    if (candles.length > 0) {
      return { candles, period: periodKey }
    }
  }

  return null
}
