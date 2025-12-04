import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'
import type { ExtendableQueryArgs } from '../utils'
import { cloneQuery, mergeFieldArgs } from '../utils'

export const presaleQuery = {
  PreSaleContract: {
    __args: {
      order_by: [{ createdAt: 'desc' }],
    },
    whitelistedAddresses: true,
    whitelistSize: true,
    totalRaisedRaw: true,
    totalParticipants: true,
    totalRaisedFormatted: true,
    startTime: true,
    timeSafeguardTs: true,
    saleToken_id: true,
    saleToken: {
      db_write_timestamp: true,
      decimals: true,
      id: true,
      maxSupplyFormatted: true,
      maxSupplyRaw: true,
      name: true,
      symbol: true,
    },
    purchaseToken_id: true,
    purchaseToken: {
      decimals: true,
      db_write_timestamp: true,
      id: true,
      maxSupplyFormatted: true,
      maxSupplyRaw: true,
      name: true,
      symbol: true,
    },
    priceBreakpointsFlat: true,
    priceBreakpointOffsets: true,
    perAddressDepositCapRaw: true,
    perAddressDepositCapFormatted: true,
    maxLeverage: true,
    market_id: true,
    lendingFacility: true,
    lastUpdatedAt: true,
    id: true,
    globalDepositCapRaw: true,
    globalDepositCapFormatted: true,
    feeTreasury: true,
    endTime: true,
    db_write_timestamp: true,
    currentState: true,
    createdAt: true,
    commissionBps: true,
    authorizer: true,
    participations: {
      __args: {
        order_by: [{ timestamp: 'desc' }],
        limit: 100,
      },
      id: true,
      user_id: true,
      positionId: true,
      depositAmountRaw: true,
      depositAmountFormatted: true,
      mintedAmountRaw: true,
      mintedAmountFormatted: true,
      loopCount: true,
      leverage: true,
      timestamp: true,
      transactionHash: true,
      __typename: true,
    },
    claims: {
      __args: {
        order_by: [{ timestamp: 'desc' }],
        limit: 100,
      },
      id: true,
      positionId: true,
      claimType: true,
      amountRaw: true,
      amountFormatted: true,
      trancheIndex: true,
      loanId: true,
      timestamp: true,
      transactionHash: true,
      __typename: true,
    },
    __typename: true,
  },
} satisfies GraphQLQueryArgs

export type PresaleQueryType = typeof presaleQuery
export type PresaleQueryResultType = GraphQLQueryResult<typeof presaleQuery>

// Convenience type for a single presale entry
export type TGraphQLPresale = NonNullable<PresaleQueryResultType['PreSaleContract']>[0]

/**
 * @description Builds a presale query with optional arguments
 */
export const buildPresalesQuery = (
  args?: ExtendableQueryArgs<PresaleQueryType['PreSaleContract']['__args']>
) => {
  const selection = cloneQuery(presaleQuery)
  return mergeFieldArgs(selection, 'PreSaleContract', args)
}

// UI-specific computed types (not available in GraphQL schema)
export interface TComputedPresaleData {
  // Progress percentage (0-100)
  progressPercent: number
  // Time remaining in milliseconds
  timeRemaining: number
  // Is presale active
  isActive: boolean
  // Is presale ended
  isEnded: boolean
  // Is presale upcoming
  isUpcoming: boolean
  // Commission amount in purchase token
  commissionAmount: number
  // Remaining capacity
  remainingCapacity: number
  // Current price per token
  currentPrice: number
}

// Extended type that combines GraphQL Presale data with computed UI fields
export interface TPresale extends TGraphQLPresale, TComputedPresaleData {}
