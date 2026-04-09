import { clamp, cloneDeep, merge } from 'lodash'

/**
 * @description Converts various value types into numbers while guarding against invalid inputs.
 * @param {string | number | null | undefined} value
 * @returns {number}
 */
export const toNumber = (value?: string | number | null): number => {
  if (typeof value === 'number') return value
  if (value == null) return 0
  if (typeof value === 'string' && value.trim() === '') return 0
  const parsed = Number(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

/**
 * @description Ensures a value stays within [0, 1] bounds.
 * @param {number} value - Input percentage.
 * @returns {number}
 */
export const safePercentage = (value: number): number =>
  clamp(Number.isFinite(value) ? value : 0, 0, 1)

/**
 * @description Constructs pricing segments for the UI visualization.
 * @param {number} marketSupply
 * @param {number} floorPrice
 * @param {number} totalSupply
 * @returns {Array<{ index: number; floorPrice: number; supply: number; supplyRemaining: number; isActive: boolean; isComplete: boolean; isFloorProtected: boolean; percentageComplete: number; packedData: string }>}
 */
export const buildSegments = (marketSupply: number, floorPrice: number, totalSupply: number) => {
  const segmentCount = 4
  const baseSupply = totalSupply / segmentCount
  const priceStep = Math.max(1, floorPrice * 0.05)
  const baseFloor = Math.max(1, floorPrice - priceStep)

  return Array.from({ length: segmentCount }, (_, index) => {
    const segmentSupply = baseSupply
    return {
      index,
      floorPrice: baseFloor + priceStep * index,
      supply: segmentSupply,
      supplyRemaining: Math.max(0, segmentSupply - marketSupply / segmentCount),
      isActive: index === Math.floor(segmentCount / 2),
      isComplete: index < Math.floor(segmentCount / 2),
      isFloorProtected: index <= 1,
      percentageComplete: Math.min(100, ((index + 1) / segmentCount) * 100),
      packedData: `0x${(index + 1).toString(16).padStart(2, '0')}face`,
    }
  })
}

export type ExtendableQueryArgs<T> =
  T extends Record<string, unknown> ? Partial<T> & Record<string, unknown> : Record<string, unknown>

export const cloneQuery = <T>(template: T): T => cloneDeep(template)

const hasArgs = (value: unknown): value is { __args?: Record<string, unknown> } =>
  typeof value === 'object' && value !== null

/**
 * @description Merges override arguments into a generated query selection.
 */
export const mergeFieldArgs = <T extends Record<string, unknown>, K extends keyof T>(
  selection: T,
  field: K,
  overrides?: Record<string, unknown>
): T => {
  if (!overrides) return selection
  const target = selection[field]
  if (!hasArgs(target)) return selection
  target.__args = merge({}, target.__args, overrides)
  return selection
}
/**
 * @description Calculates the premium rate between market price and floor price.
 * @param {number} marketPrice
 * @param {number} floorPrice
 * @returns {number}
 */
export const calculatePremiumRate = (marketPrice: number, floorPrice: number) => {
  if (floorPrice === 0) return 0
  return ((marketPrice - floorPrice) / floorPrice) * 100
}

/**
 * @description Calculates the premium change percentage over 24 hours.
 * @param {number} currentPremiumRate - Current premium rate percentage
 * @param {number} premiumRate24hAgo - Premium rate 24 hours ago percentage
 * @returns {number} - Percentage change (positive = increase, negative = decrease)
 */
export const calculatePremiumChange24h = (
  currentPremiumRate: number,
  premiumRate24hAgo: number
): number => {
  if (premiumRate24hAgo === 0) return 0
  return ((currentPremiumRate - premiumRate24hAgo) / Math.abs(premiumRate24hAgo)) * 100
}

/**
 * @description Calculates the 24h price change percentage from trade data.
 * Uses the trade closest to the 24h boundary as baseline.
 * @param trades - Array of trades with newPriceFormatted/newPriceRaw and timestamp
 * @param currentPrice - Current market price
 * @returns Percentage change (positive = increase, negative = decrease), or 0 if insufficient data
 */
export const calculate24hPriceChangeFromTrades = (
  trades: Array<{
    newPriceFormatted?: string | null
    newPriceRaw?: string | number | null
    timestamp: string | number
  }>,
  currentPrice: number
): number => {
  if (trades.length === 0 || currentPrice <= 0) return 0

  const now = Math.floor(Date.now() / 1000)
  const cutoff = now - 24 * 3600

  // Find the trade closest to 24h ago (must be older than 24h)
  const olderTrades = trades.filter((t) => toNumber(t.timestamp) <= cutoff)
  if (olderTrades.length === 0) return 0

  // Sort by timestamp descending to get the one closest to the cutoff
  const baseline = olderTrades.reduce((closest, t) => {
    const tTs = toNumber(t.timestamp)
    const closestTs = toNumber(closest.timestamp)
    return Math.abs(tTs - cutoff) < Math.abs(closestTs - cutoff) ? t : closest
  })

  const baselinePrice = toNumber(baseline.newPriceFormatted || baseline.newPriceRaw)
  if (baselinePrice === 0) return 0

  return ((currentPrice - baselinePrice) / baselinePrice) * 100
}
