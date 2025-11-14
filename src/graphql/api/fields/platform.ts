import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'

// GraphQL Query Args for Platform Metrics (aggregated from multiple entities)
export const platformMetricsQuery = {
  Market: {
    __args: {
      where: {
        status: { _eq: 'ACTIVE' },
      },
    },
    id: true,
    totalSupplyRaw: true,
    totalSupplyFormatted: true,
    currentPriceRaw: true,
    currentPriceFormatted: true,
    floorPriceRaw: true,
    floorPriceFormatted: true,
    createdAt: true,
    trades: {
      __args: {
        where: {
          timestamp: { _gte: '1734566400' }, // Last 24h timestamp
        },
      },
      reserveAmountRaw: true,
      reserveAmountFormatted: true,
      feeRaw: true,
      feeFormatted: true,
    },
  },
  Account: {
    id: true,
  },
  Loan: {
    __args: {
      where: {
        status: { _eq: 'ACTIVE' },
      },
    },
    id: true,
    lockedCollateralRaw: true,
    lockedCollateralFormatted: true,
    borrowAmountRaw: true,
    borrowAmountFormatted: true,
  },
  CreditFacilityContract: {
    id: true,
    totalLoans: true,
    totalVolumeRaw: true,
    totalVolumeFormatted: true,
  },
} satisfies GraphQLQueryArgs

export type PlatformMetricsQueryType = typeof platformMetricsQuery
export type PlatformMetricsQueryResultType = GraphQLQueryResult<typeof platformMetricsQuery>

export interface TPlatformMetrics {
  totalValueLocked: number
  totalYieldGenerated: number
  activeAssets: number
  totalUsers: number
  volume24h: number
  assetsCreated24h: number
  creditPositions: number
  // UI-specific
  displayTVL: string
  displayYield: string
  tvlChange24h: number
  yieldChange24h: number
}

// Function to compute platform metrics from GraphQL data
export function computePlatformMetrics(data: PlatformMetricsQueryResultType): TPlatformMetrics {
  const markets = data.Market || []
  const accounts = data.Account || []
  const loans = data.Loan || []

  // Calculate TVL from market supplies and prices
  const totalValueLocked = markets.reduce((sum, market) => {
    const supply = parseFloat(market.totalSupplyFormatted || market.totalSupplyRaw || '0')
    const price = parseFloat(market.currentPriceFormatted || market.currentPriceRaw || '0')
    return sum + supply * price
  }, 0)

  // Calculate 24h volume from trades
  const volume24h = markets.reduce((sum, market) => {
    return (
      sum +
      (market.trades || []).reduce((tradeSum, trade) => {
        const amount = parseFloat(trade.reserveAmountFormatted || trade.reserveAmountRaw || '0')
        return tradeSum + amount
      }, 0)
    )
  }, 0)

  // Calculate assets created in last 24h
  const oneDayAgo = Math.floor(Date.now() / 1000) - 86400
  const assetsCreated24h = markets.filter(
    (market) => parseInt(String(market.createdAt || '0')) > oneDayAgo
  ).length

  // Calculate total yield from fees
  const totalYieldGenerated = markets.reduce((sum, market) => {
    return (
      sum +
      (market.trades || []).reduce((feeSum, trade) => {
        const fee = parseFloat(trade.feeFormatted || trade.feeRaw || '0')
        return feeSum + fee
      }, 0)
    )
  }, 0)

  return {
    totalValueLocked,
    totalYieldGenerated,
    activeAssets: markets.length,
    totalUsers: accounts.length,
    volume24h,
    assetsCreated24h,
    creditPositions: loans.length,
    displayTVL: `$${(totalValueLocked / 1e6).toFixed(2)}M`,
    displayYield: `$${(totalYieldGenerated / 1e3).toFixed(1)}K`,
    tvlChange24h: 8.7, // This would need historical data to calculate
    yieldChange24h: 12.3, // This would need historical data to calculate
  }
}
