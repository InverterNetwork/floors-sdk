import type { TFloorAssetData } from '../../graphql/api'

export interface ChartDataPoint {
  date: string
  timestamp: number
  floorPrice: number
  marketPrice: number
  volume?: number
  elevationEvent?: ElevationAnnotation
}

/**
 * @description Generate historical price data based on floor elevation events
 * @param {TFloorAssetData} asset - The asset data
 * @returns {ChartDataPoint[]} The chart data points
 */
export function generateHistoricalData(asset: TFloorAssetData): ChartDataPoint[] {
  const data: ChartDataPoint[] = []
  const now = new Date()
  const daysAgo = 365 // Generate 1 year of data to support all time ranges
  const priceState = getInitialPriceState(asset)

  for (let i = daysAgo; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const elevationEvent = findElevationEvent(asset, date, 'daily')

    if (elevationEvent) {
      applyElevationEventToState(priceState, elevationEvent, 'daily')
    } else {
      applyMarketDriftToState(priceState, 'daily')
    }

    data.push({
      date: date.toISOString().split('T')[0],
      timestamp: date.getTime(),
      floorPrice: priceState.floorPrice,
      marketPrice: priceState.marketPrice,
      volume: getVolumeForPoint(asset, date, Boolean(elevationEvent), 'daily'),
      elevationEvent: formatElevationEventForChart(elevationEvent),
    })
  }

  return data
}

/**
 * @description Generate hourly historical price data for the past 7 days (168 hours)
 * @param {TFloorAssetData} asset - The asset data
 * @returns {ChartDataPoint[]} The chart data points
 */
export function generateHourlyHistoricalData(asset: TFloorAssetData): ChartDataPoint[] {
  const data: ChartDataPoint[] = []
  const now = new Date()
  const hoursAgo = 7 * 24 // 7 days × 24 hours = 168 hours
  const priceState = getInitialPriceState(asset)

  for (let i = hoursAgo; i >= 0; i--) {
    const date = new Date(now)
    date.setHours(date.getHours() - i, 0, 0, 0) // Set to exact hour
    const elevationEvent = findElevationEvent(asset, date, 'hourly')

    if (elevationEvent) {
      applyElevationEventToState(priceState, elevationEvent, 'hourly')
    } else {
      applyMarketDriftToState(priceState, 'hourly')
    }

    data.push({
      date: date.toISOString(),
      timestamp: date.getTime(),
      floorPrice: priceState.floorPrice,
      marketPrice: priceState.marketPrice,
      volume: getVolumeForPoint(asset, date, Boolean(elevationEvent), 'hourly'),
      elevationEvent: formatElevationEventForChart(elevationEvent),
    })
  }

  return data
}

// -----------------------------------------------------------------------------
// Helper utilities
// -----------------------------------------------------------------------------

export interface ElevationAnnotation {
  feesDeployed: number
  priceIncrease: number
  transactionHash: string
}

type ChartGranularity = 'daily' | 'hourly'
type ElevationHistoryEvent = TFloorAssetData['floorElevation']['elevationHistory'][number]

interface PriceState {
  floorPrice: number
  marketPrice: number
}

const INITIAL_MARKET_PREMIUM = 1.15
const MARKET_VOLATILITY: Record<ChartGranularity, number> = {
  daily: 0.02,
  hourly: 0.008,
}

const EVENT_MARKET_PREMIUM_RANGE: Record<ChartGranularity, { base: number; spread: number }> = {
  daily: {
    base: 1.1,
    spread: 0.2,
  },
  hourly: {
    base: 1.1,
    spread: 0.15,
  },
}

function getInitialPriceState(asset: TFloorAssetData): PriceState {
  const priceIncreaseTotal = (asset.floorElevation.elevationHistory ?? []).reduce(
    (sum, event) => sum + event.priceIncrease,
    0
  )

  const floorPrice = asset.pricing.currentFloorPrice - priceIncreaseTotal

  return {
    floorPrice,
    marketPrice: floorPrice * INITIAL_MARKET_PREMIUM,
  }
}

function findElevationEvent(
  asset: TFloorAssetData,
  date: Date,
  granularity: ChartGranularity
): ElevationHistoryEvent | undefined {
  const events = asset.floorElevation.elevationHistory ?? []

  if (granularity === 'daily') {
    const dateString = date.toISOString().split('T')[0]
    return events.find((event) => {
      const eventDate = new Date(event.timestamp)
      return eventDate.toISOString().split('T')[0] === dateString
    })
  }

  const targetHour = new Date(date)
  targetHour.setMinutes(0, 0, 0)

  return events.find((event) => {
    const eventHour = new Date(event.timestamp)
    eventHour.setMinutes(0, 0, 0)
    return eventHour.getTime() === targetHour.getTime()
  })
}

const getRandomPremium = (granularity: ChartGranularity): number => {
  const config = EVENT_MARKET_PREMIUM_RANGE[granularity]
  return config.base + Math.random() * config.spread
}

function applyElevationEventToState(
  state: PriceState,
  event: ElevationHistoryEvent,
  granularity: ChartGranularity
): void {
  state.floorPrice = event.newFloorPrice
  state.marketPrice = state.floorPrice * getRandomPremium(granularity)
}

function applyMarketDriftToState(state: PriceState, granularity: ChartGranularity): void {
  const volatility = MARKET_VOLATILITY[granularity]
  const marketChange = (Math.random() - 0.5) * volatility

  state.marketPrice = Math.max(state.marketPrice * (1 + marketChange), state.floorPrice)
}

function getVolumeForPoint(
  asset: TFloorAssetData,
  date: Date,
  hasElevationEvent: boolean,
  granularity: ChartGranularity
): number {
  if (granularity === 'daily') {
    const baseVolume = asset.metrics.volume24h * (0.7 + Math.random() * 0.6)
    return hasElevationEvent ? baseVolume * 2.5 : baseVolume
  }

  const hour = date.getHours()
  const isBusinessHour = hour >= 9 && hour <= 17
  const baseVolume = asset.metrics.volume24h / 24
  const hourlyMultiplier = isBusinessHour ? 1.3 + Math.random() * 0.4 : 0.7 + Math.random() * 0.6

  return hasElevationEvent ? baseVolume * hourlyMultiplier * 3 : baseVolume * hourlyMultiplier
}

function formatElevationEventForChart(
  event?: ElevationHistoryEvent
): ElevationAnnotation | undefined {
  if (!event) return undefined

  return {
    feesDeployed: event.feesDeployed,
    priceIncrease: event.priceIncrease,
    transactionHash: event.transactionHash,
  }
}
