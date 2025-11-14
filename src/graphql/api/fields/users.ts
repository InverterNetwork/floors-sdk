import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'
import type { TFloorAssetData } from './assets'

// GraphQL Query Args for Accounts
export const accountsQuery = {
  Account: {
    __args: {
      order_by: [{ id: 'desc' }],
    },
    id: true,
    db_write_timestamp: true,
    marketsCreated: {
      __args: {
        order_by: [{ createdAt: 'desc' }],
        limit: 10,
      },
      id: true,
      currentPriceRaw: true,
      currentPriceFormatted: true,
      floorPriceRaw: true,
      floorPriceFormatted: true,
      status: true,
      createdAt: true,
    },
    trades: {
      __args: {
        order_by: [{ timestamp: 'desc' }],
        limit: 50,
      },
      id: true,
      market_id: true,
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
    },
    loans: {
      __args: {
        order_by: [{ openedAt: 'desc' }],
        limit: 20,
      },
      id: true,
      market_id: true,
      lockedCollateralRaw: true,
      lockedCollateralFormatted: true,
      borrowAmountRaw: true,
      borrowAmountFormatted: true,
      originationFeeRaw: true,
      originationFeeFormatted: true,
      openedAt: true,
      status: true,
    },
    stakes: {
      __args: {
        order_by: [{ timestamp: 'desc' }],
        limit: 20,
      },
      id: true,
      amountRaw: true,
      amountFormatted: true,
      lockDuration: true,
      timestamp: true,
      status: true,
    },
    __typename: true,
  },
} satisfies GraphQLQueryArgs

export type AccountsQueryType = typeof accountsQuery
export type AccountsQueryResultType = GraphQLQueryResult<typeof accountsQuery>

// Type alias for individual Account from GraphQL result
export type TGraphQLAccount = NonNullable<AccountsQueryResultType['Account']>[0]

// UI-specific computed types (not available in GraphQL schema)
export interface TComputedUserData {
  ens?: string
  avatar?: string
  displayName: string
  createdAt: Date
  lastActiveAt: Date
  reputation: number
  isVerified: boolean
  shortAddress: string
  isCurrentUser: boolean
  // Computed from relationships (not in Account schema)
  balance?: string
  totalVolume?: string
  totalFeesPaid?: string
}

export interface TProjectLinks {
  website?: string
  github?: string
  twitter?: string
  discord?: string
  telegram?: string
  docs?: string
}

// Extended type that combines GraphQL Account data with computed UI fields
export interface TUserData extends TGraphQLAccount, TComputedUserData {}

export interface TUserAssetPosition {
  assetId: string
  asset: TFloorAssetData
  balance: number
  averagePurchasePrice: number
  currentValue: number
  floorProtectedValue: number
  unrealizedGains: number
  yieldEarned: number
  stakingRewards?: number
  // UI-specific
  displayBalance: string
  displayValue: string
  displayGains: string
  floorProtectionAmount: string
  positionSize: 'small' | 'medium' | 'large'
  appreciationRate: string
}
