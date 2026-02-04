import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'

// StakingManager query
export const stakingManagersQuery = {
  StakingManager: {
    __args: { order_by: [{ createdAt: 'desc' }] },
    id: true,
    market_id: true,
    performanceFeeBps: true,
    totalStakedIssuanceRaw: true,
    totalStakedIssuanceFormatted: true,
    totalCollateralDeployedRaw: true,
    totalCollateralDeployedFormatted: true,
    totalYieldHarvestedRaw: true,
    totalYieldHarvestedFormatted: true,
    totalFeesCapturedRaw: true,
    totalFeesCapturedFormatted: true,
    createdAt: true,
    lastUpdatedAt: true,
    strategies: {
      id: true,
      isActive: true,
      addedAt: true,
    },
    __typename: true,
  },
} satisfies GraphQLQueryArgs

// StakePosition query (user positions)
export const stakePositionsQuery = {
  StakePosition: {
    __args: { order_by: [{ createdAt: 'desc' }], limit: 100 },
    id: true,
    user_id: true,
    stakingManager_id: true,
    strategy_id: true,
    issuanceTokenAmountRaw: true,
    issuanceTokenAmountFormatted: true,
    collateralDeployedRaw: true,
    collateralDeployedFormatted: true,
    floorPriceAtStakeRaw: true,
    floorPriceAtStakeFormatted: true,
    totalYieldHarvestedRaw: true,
    totalYieldHarvestedFormatted: true,
    totalFeePaidRaw: true,
    totalFeePaidFormatted: true,
    status: true,
    createdAt: true,
    lastUpdatedAt: true,
    transactionHash: true,
    __typename: true,
  },
} satisfies GraphQLQueryArgs

// StakingActivity query
export const stakingActivitiesQuery = {
  StakingActivity: {
    __args: { order_by: [{ timestamp: 'desc' }], limit: 50 },
    id: true,
    position_id: true,
    stakingManager_id: true,
    user_id: true,
    activityType: true,
    issuanceTokenAmountRaw: true,
    issuanceTokenAmountFormatted: true,
    collateralAmountRaw: true,
    collateralAmountFormatted: true,
    yieldAmountRaw: true,
    yieldAmountFormatted: true,
    feeAmountRaw: true,
    feeAmountFormatted: true,
    timestamp: true,
    transactionHash: true,
    __typename: true,
  },
} satisfies GraphQLQueryArgs

// Type exports
export type TGraphQLStakingManager = NonNullable<
  GraphQLQueryResult<typeof stakingManagersQuery>['StakingManager']
>[0]

export type TGraphQLStakePosition = NonNullable<
  GraphQLQueryResult<typeof stakePositionsQuery>['StakePosition']
>[0]

export type TGraphQLStakingActivity = NonNullable<
  GraphQLQueryResult<typeof stakingActivitiesQuery>['StakingActivity']
>[0]

// Client DTO types
export interface TStakingManagerData {
  id: string
  marketId: string
  performanceFeeBps: number
  totalStakedIssuance: number
  totalCollateralDeployed: number
  totalYieldHarvested: number
  totalFeesCaptured: number
  strategies: TStrategyData[]
  createdAt: Date
  lastUpdatedAt: Date
}

export interface TStrategyData {
  id: string
  isActive: boolean
  addedAt: Date
}

export interface TStakePositionData {
  id: string
  userId: string
  stakingManagerId: string
  strategyId: string
  issuanceTokenAmount: number
  collateralDeployed: number
  floorPriceAtStake: number
  totalYieldHarvested: number
  totalFeePaid: number
  status: 'ACTIVE' | 'WITHDRAWN'
  createdAt: Date
  lastUpdatedAt: Date
  transactionHash: string
  // Note: Current yield must be fetched from chain at runtime
}

export interface TStakingActivityData {
  id: string
  positionId: string
  userId: string
  activityType: 'STAKE' | 'HARVEST' | 'WITHDRAW' | 'REBALANCE'
  issuanceTokenAmount: number | null
  collateralAmount: number | null
  yieldAmount: number | null
  feeAmount: number | null
  timestamp: Date
  transactionHash: string
}
