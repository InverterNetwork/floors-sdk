import { getAddress } from 'viem'

import type { GraphQLQueryArgs, GraphQLQueryResult, GraphQLSubscriptionArgs } from '../..'

// GraphQL Query Args for UserMarketPosition
export const userMarketPositionQuery = {
  UserMarketPosition: {
    __args: {
      where: {
        user_id: { _eq: '' },
        market_id: { _eq: '' },
      },
    },
    id: true,
    user_id: true,
    market_id: true,
    totalDebtRaw: true,
    totalDebtFormatted: true,
    lockedCollateralRaw: true,
    lockedCollateralFormatted: true,
    netFTokenChangeRaw: true,
    netFTokenChangeFormatted: true,
    presaleDepositRaw: true,
    presaleDepositFormatted: true,
    presaleLeverage: true,
    stakedAmountRaw: true,
    stakedAmountFormatted: true,
    claimableRewardsRaw: true,
    claimableRewardsFormatted: true,
    lastUpdatedAt: true,
    __typename: true,
  },
} satisfies GraphQLQueryArgs

export type UserMarketPositionQueryType = typeof userMarketPositionQuery
export type UserMarketPositionQueryResultType = GraphQLQueryResult<UserMarketPositionQueryType>
export type TGraphQLUserMarketPosition = NonNullable<
  UserMarketPositionQueryResultType['UserMarketPosition']
>[0]

const userMarketPositionSubscriptionFields = {
  id: true,
  user_id: true,
  market_id: true,
  totalDebtRaw: true,
  totalDebtFormatted: true,
  lockedCollateralRaw: true,
  lockedCollateralFormatted: true,
  netFTokenChangeRaw: true,
  netFTokenChangeFormatted: true,
  presaleDepositRaw: true,
  presaleDepositFormatted: true,
  presaleLeverage: true,
  stakedAmountRaw: true,
  stakedAmountFormatted: true,
  claimableRewardsRaw: true,
  claimableRewardsFormatted: true,
  lastUpdatedAt: true,
  __typename: true,
} as const

/**
 * @description Live subscription for a user's collateral/debt row on one market.
 */
export const buildUserMarketPositionSubscription = (userId: string, marketId: string) => {
  const uid = getAddress(userId as `0x${string}`)
  const mid = getAddress(marketId as `0x${string}`)
  return {
    UserMarketPosition: {
      __args: {
        where: { user_id: { _eq: uid }, market_id: { _eq: mid } },
        limit: 1,
      },
      ...userMarketPositionSubscriptionFields,
    },
  } satisfies GraphQLSubscriptionArgs
}

export type UserMarketPositionSubscriptionFields = ReturnType<
  typeof buildUserMarketPositionSubscription
>
