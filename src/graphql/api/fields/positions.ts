import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'

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
