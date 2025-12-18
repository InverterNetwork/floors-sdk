import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'
import type { TFloorAssetData } from './assets'
import type { TTokenData } from './tokens'

// GraphQL Query Args for Loans
export const loansQuery = {
  Loan: {
    __args: {
      order_by: [{ openedAt: 'desc' }],
      limit: 100,
    },
    id: true,
    borrower_id: true,
    facility_id: true,
    market_id: true,
    lockedCollateralRaw: true,
    lockedCollateralFormatted: true,
    borrowAmountRaw: true,
    borrowAmountFormatted: true,
    originationFeeRaw: true,
    originationFeeFormatted: true,
    remainingDebtRaw: true,
    remainingDebtFormatted: true,
    floorPriceAtBorrowRaw: true,
    floorPriceAtBorrowFormatted: true,
    status: true,
    openedAt: true,
    closedAt: true,
    lastUpdatedAt: true,
    transactionHash: true,
    __typename: true,
  },
} satisfies GraphQLQueryArgs

export type LoansQueryType = typeof loansQuery
export type LoansQueryResultType = GraphQLQueryResult<typeof loansQuery>

// Type alias for individual Loan from GraphQL result
export type TGraphQLLoan = NonNullable<LoansQueryResultType['Loan']>[0]

// GraphQL Query Args for Credit Facilities
export const creditFacilitiesQuery = {
  CreditFacilityContract: {
    __args: {
      order_by: [{ totalVolumeRaw: 'desc' }],
    },
    id: true,
    market_id: true,
    collateralToken_id: true,
    borrowToken_id: true,
    totalLoans: true,
    totalVolumeRaw: true,
    totalVolumeFormatted: true,
    totalDebtRaw: true,
    totalDebtFormatted: true,
    totalLockedCollateralRaw: true,
    totalLockedCollateralFormatted: true,
    createdAt: true,
    lastUpdatedAt: true,
    loans: {
      __args: {
        order_by: [{ openedAt: 'desc' }],
        limit: 50,
      },
      id: true,
      borrowAmountRaw: true,
      borrowAmountFormatted: true,
      lockedCollateralRaw: true,
      lockedCollateralFormatted: true,
      status: true,
      openedAt: true,
    },
    __typename: true,
  },
} satisfies GraphQLQueryArgs

export type CreditFacilitiesQueryType = typeof creditFacilitiesQuery
export type CreditFacilitiesQueryResultType = GraphQLQueryResult<typeof creditFacilitiesQuery>

// Type alias for individual CreditFacilityContract from GraphQL result
export type TGraphQLCreditFacility = NonNullable<
  CreditFacilitiesQueryResultType['CreditFacilityContract']
>[0]

export interface TCollateralData {
  token: TTokenData
  totalLocked: number
  reserveRatio: number
  liquidityAvailable: number
}

export interface TBackingAssetData {
  token: TTokenData
  amount: number
  yieldRate: number
  contribution: number // Percentage of total backing
}

export interface TRevenueData {
  tradingFees: number
  tradingFeeRate: number
  protocolRevenue: number
  revenueGrowthRate: number
  feeCapture24h: number
}

export interface TYieldData {
  totalYieldGenerated: number
  currentApr: number
  yieldSources: TYieldSourceData[]
  stakingRewards: number
}

export interface TYieldSourceData {
  source: 'trading_fees' | 'backing_assets' | 'appreciation'
  amount: number
  apr: number
}

export interface TAvailableLoan {
  id: string
  poolAsset: {
    symbol: string
    name: string
    reserveAsset: string
    logo?: string
  }
  walletBalance: {
    amount: number
    usdValue: number
    available: number
  }
  borrowCapacity: {
    maxAmount: number
    usdValue: number
    utilizationRate: number
  }
  pricing: {
    currentFloorPrice: number
    currentMarketPrice: number
    creditRatio: number
  }
}

export interface TLoanPosition {
  id: string
  poolAsset: {
    symbol: string
    name: string
    reserveAsset: string
    logo?: string
  }
  walletBalance: {
    amount: number
    usdValue: number
    available: number
  }
  collateral: {
    amount: number
    usdValue: number
    locked: number
  }
  debt: {
    amount: number
    usdValue: number
    borrowed: number
  }
  utilizationRate: number
  availableCapacity: number
  maxBorrowCapacity: number
  pricing: {
    currentFloorPrice: number
    currentMarketPrice: number
  }
}

// UI-specific computed types (not available in GraphQL schema)
export interface TComputedCreditData {
  positionId: string // UI-specific identifier for the position
  asset: TFloorAssetData
  collateral: {
    amount: number
    value: number
  }
  borrowed: {
    amount: number
    value: number
  }
  creditRatio: number
  liquidationFree: boolean
  floorPriceProtection: number
  healthFactor: number // Always > 1 due to floor price guarantee
  timeCreated: Date
  lastUpdated: Date
  safetyMargin: number
  loanStatus: 'healthy' | 'safe' | 'protected'
}

// Extended type that combines GraphQL Loan data with computed UI fields
export interface TCreditPositionData extends TGraphQLLoan, TComputedCreditData {}

/**
 * UI-friendly loan data for repay form
 */
export interface TUserLoanData {
  id: string
  loanId: bigint
  borrowerId: string
  marketId: string
  lockedCollateral: number
  lockedCollateralRaw: string
  borrowAmount: number
  borrowAmountRaw: string
  remainingDebt: number
  remainingDebtRaw: string
  originationFee: number
  floorPriceAtBorrow: number
  status: 'ACTIVE' | 'REPAID' | 'DEFAULTED'
  openedAt: Date
  closedAt: Date | null
  lastUpdatedAt: Date
  transactionHash: string
}
