import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'

// GraphQL Query Args for Trades
export const tradesQuery = {
  Trade: {
    __args: {
      order_by: [{ timestamp: 'desc' }],
      limit: 100,
    },
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
    db_write_timestamp: true,
    __typename: true,
  },
} satisfies GraphQLQueryArgs

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
