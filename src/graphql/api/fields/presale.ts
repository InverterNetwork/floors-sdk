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
    purchaseToken_id: true,
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
  // Formatted time remaining string
  timeRemainingFormatted: string
  // Commission amount in purchase token
  commissionAmount: number
  // Commission amount formatted
  commissionAmountFormatted: string
  // Remaining capacity
  remainingCapacity: number
  // Remaining capacity formatted
  remainingCapacityFormatted: string
  // Current price per token
  currentPrice: number
  // Current price formatted
  currentPriceFormatted: string
}

// Extended type that combines GraphQL Presale data with computed UI fields
export interface TPresale extends TGraphQLPresale, TComputedPresaleData {}
