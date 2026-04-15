import type { GraphQLQueryArgs, GraphQLQueryResult, GraphQLSubscriptionArgs } from '../..'
import { cloneQuery, type ExtendableQueryArgs, mergeFieldArgs } from '../utils'

/**
 * Query for MarketSnapshot - provides historical price and floor price data
 * Use this to calculate premium change over time
 */
export const marketSnapshotQuery = {
  MarketSnapshot: {
    __args: {
      order_by: [{ timestamp: 'desc' }],
      limit: 1,
    },
    id: true,
    market_id: true,
    timestamp: true,
    priceRaw: true,
    priceFormatted: true,
    floorPriceRaw: true,
    floorPriceFormatted: true,
    volume24hRaw: true,
    volume24hFormatted: true,
    trades24h: true,
    __typename: true,
  },
} satisfies GraphQLQueryArgs

export type MarketSnapshotQueryType = typeof marketSnapshotQuery
export type MarketSnapshotQueryResultType = GraphQLQueryResult<typeof marketSnapshotQuery>

/**
 * Query for PriceCandle - provides OHLCV data for charting
 * Use ONE_DAY period to get daily candles for 24h calculations
 */
export const priceCandleQuery = {
  PriceCandle: {
    __args: {
      order_by: [{ timestamp: 'desc' }],
      limit: 1,
    },
    id: true,
    market_id: true,
    period: true,
    timestamp: true,
    openRaw: true,
    openFormatted: true,
    highRaw: true,
    highFormatted: true,
    lowRaw: true,
    lowFormatted: true,
    closeRaw: true,
    closeFormatted: true,
    volumeRaw: true,
    volumeFormatted: true,
    trades: true,
    __typename: true,
  },
} satisfies GraphQLQueryArgs

export type PriceCandleQueryType = typeof priceCandleQuery
export type PriceCandleQueryResultType = GraphQLQueryResult<typeof priceCandleQuery>

/**
 * @description Live subscription for price candles of a single market across all periods.
 * Enables real-time chart updates without requiring explicit refetches after trades.
 * Limit covers max historical fetch: 168 hourly + 84 four-hour + 365 daily + buffer.
 */
export const buildPriceCandlesSubscription = (marketId: string) => {
  const selection = cloneQuery(priceCandleQuery) as Record<string, unknown>
  return mergeFieldArgs(selection, 'PriceCandle', {
    where: { market_id: { _eq: marketId } },
    order_by: [{ timestamp: 'desc' }],
    limit: 620,
  } as ExtendableQueryArgs<
    PriceCandleQueryType['PriceCandle']['__args']
  >) as GraphQLSubscriptionArgs
}

export type PriceCandlesSubscriptionFields = ReturnType<typeof buildPriceCandlesSubscription>
