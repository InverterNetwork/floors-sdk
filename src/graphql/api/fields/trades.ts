import type { GraphQLQueryArgs, GraphQLQueryResult, GraphQLSubscriptionArgs } from '../..'

// ============================================================================
// Shared Field Definitions (reusable for both queries and subscriptions)
// ============================================================================

/**
 * @description Base fields for trade entity
 */
export const tradeFields = {
  id: true,
  market_id: true,
  user_id: true,
  tradeType: true,
  tokenAmountRaw: true,
  tokenAmountFormatted: true,
  reserveAmountRaw: true,
  reserveAmountFormatted: true,
  feeRaw: true,
  feeFormatted: true,
  newPriceRaw: true,
  newPriceFormatted: true,
  timestamp: true,
  transactionHash: true,
} as const

// ============================================================================
// Query Definitions
// ============================================================================

// GraphQL Query Args for Trades
export const tradesQuery = {
  Trade: {
    __args: {
      order_by: [{ timestamp: 'desc' }],
      limit: 100,
    },
    ...tradeFields,
    __typename: true,
  },
} satisfies GraphQLQueryArgs

// ============================================================================
// Subscription Builders
// ============================================================================

/**
 * @description Builds subscription fields for market trades
 */
export const buildTradeSubscription = (marketId: string, limit: number = 100) =>
  ({
    Trade: {
      __args: {
        where: { market_id: { _eq: marketId } },
        order_by: [{ timestamp: 'desc' as const }],
        limit,
      },
      ...tradeFields,
    },
  }) satisfies GraphQLSubscriptionArgs

export type TradeSubscriptionFields = ReturnType<typeof buildTradeSubscription>

export type TradesQueryType = typeof tradesQuery
export type TradesQueryResultType = GraphQLQueryResult<typeof tradesQuery>

// Type alias for individual Trade from GraphQL result
export type TGraphQLTrade = NonNullable<TradesQueryResultType['Trade']>[0]

// UI-specific computed types (not available in GraphQL schema)
export interface TComputedTradeData {
  assetAddress: string // Contract address of the traded asset
  assetName?: string // Market name (from Token entity)
  assetSymbol?: string // Market symbol (from Token entity)
  type: 'buy' | 'sell' | 'stake' | 'unstake'
  amounts: {
    input: number
    output: number
    fee: number
  }
  prices: {
    before: number
    after: number
    priceImpact: number
  }
  timestampDate: Date
  gasUsed: number
  blockNumber: number
  status: 'pending' | 'confirmed' | 'failed'
}

// Extended type that combines GraphQL Trade data with computed UI fields
export interface TTradeData extends TGraphQLTrade, TComputedTradeData {}
