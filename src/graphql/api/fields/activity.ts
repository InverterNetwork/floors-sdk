import type { GraphQLQueryArgs, GraphQLQueryResult, GraphQLSubscriptionArgs } from '../..'

// ============================================================================
// Base Field Definitions
// ============================================================================

/**
 * @description Base fields for loan entity (activity view)
 */
export const loanActivityFields = {
  id: true,
  borrower_id: true,
  market_id: true,
  borrowAmountRaw: true,
  borrowAmountFormatted: true,
  lockedCollateralRaw: true,
  lockedCollateralFormatted: true,
  originationFeeRaw: true,
  originationFeeFormatted: true,
  remainingDebtRaw: true,
  remainingDebtFormatted: true,
  status: true,
  openedAt: true,
  closedAt: true,
  lastUpdatedAt: true,
  transactionHash: true,
} as const

/**
 * @description Base fields for trade entity (activity view)
 */
export const tradeActivityFields = {
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

/**
 * @description Base fields for floor elevation entity (activity view)
 */
export const floorElevationActivityFields = {
  id: true,
  market_id: true,
  deployedAmountRaw: true,
  deployedAmountFormatted: true,
  oldFloorPriceRaw: true,
  oldFloorPriceFormatted: true,
  newFloorPriceRaw: true,
  newFloorPriceFormatted: true,
  timestamp: true,
  transactionHash: true,
} as const

// ============================================================================
// Combined Query Definition
// ============================================================================

/**
 * @description Builds a combined query for market activity (trades + loans + floor elevations)
 * This fetches all in a single GraphQL request for efficiency
 */
export const buildMarketActivityQuery = (marketId: string, limit: number = 100) =>
  ({
    Trade: {
      __args: {
        where: { market_id: { _eq: marketId } },
        order_by: [{ timestamp: 'desc' as const }],
        limit,
      },
      ...tradeActivityFields,
    },
    Loan: {
      __args: {
        where: { market_id: { _eq: marketId } },
        order_by: [{ openedAt: 'desc' as const }],
        limit,
      },
      ...loanActivityFields,
    },
    FloorElevation: {
      __args: {
        where: { market_id: { _eq: marketId } },
        order_by: [{ timestamp: 'desc' as const }],
        limit,
      },
      ...floorElevationActivityFields,
    },
  }) satisfies GraphQLQueryArgs

// ============================================================================
// Subscription Definition
// ============================================================================

/**
 * @description Builds a combined subscription for market activity (trades + loans + floor elevations)
 * Uses WebSocket for real-time updates via Hasura subscriptions
 */
export const buildMarketActivitySubscription = (marketId: string, limit: number = 100) =>
  ({
    Trade: {
      __args: {
        where: { market_id: { _eq: marketId } },
        order_by: [{ timestamp: 'desc' as const }],
        limit,
      },
      ...tradeActivityFields,
    },
    Loan: {
      __args: {
        where: { market_id: { _eq: marketId } },
        order_by: [{ openedAt: 'desc' as const }],
        limit,
      },
      ...loanActivityFields,
    },
    FloorElevation: {
      __args: {
        where: { market_id: { _eq: marketId } },
        order_by: [{ timestamp: 'desc' as const }],
        limit,
      },
      ...floorElevationActivityFields,
    },
  }) satisfies GraphQLSubscriptionArgs

export type MarketActivitySubscriptionFields = ReturnType<typeof buildMarketActivitySubscription>

export type MarketActivityQueryType = ReturnType<typeof buildMarketActivityQuery>
export type MarketActivityQueryResultType = GraphQLQueryResult<MarketActivityQueryType>

// Type aliases for individual entities from GraphQL result
export type TGraphQLTradeActivity = NonNullable<MarketActivityQueryResultType['Trade']>[0]
export type TGraphQLLoanActivity = NonNullable<MarketActivityQueryResultType['Loan']>[0]
export type TGraphQLFloorElevationActivity = NonNullable<
  MarketActivityQueryResultType['FloorElevation']
>[0]

// ============================================================================
// Unified Activity Types
// ============================================================================

/**
 * @description Activity types for the market activity table
 */
export type TActivityType =
  | 'buy'
  | 'sell'
  | 'loop'
  | 'borrow'
  | 'repay'
  | 'loan_closed'
  | 'stake'
  | 'unstake'
  | 'claim'
  | 'floor_elevation'

/**
 * @description Unified market activity data for UI
 * Combines trades and loan events into a single format
 */
export interface TMarketActivityData {
  id: string
  market_id: string
  user_id: string
  type: TActivityType
  timestamp: string // Unix timestamp as string for consistency

  // Token amounts (fToken for trades, collateral for loans)
  tokenAmountRaw: string
  tokenAmountFormatted: string

  // Reserve amounts (reserve for trades, borrow amount for loans)
  reserveAmountRaw: string
  reserveAmountFormatted: string

  // Fee information
  feeRaw: string
  feeFormatted: string

  // Price information (only for trades, null for loans)
  newPriceRaw: string | null
  newPriceFormatted: string | null

  // Transaction info
  transactionHash: string

  // Computed UI fields
  amounts: {
    input: number
    output: number
    fee: number
  }
  prices: {
    before: number
    after: number
    priceImpact: number
  } | null
  timestampDate: Date
  status: 'pending' | 'confirmed' | 'failed'

  // Source indicator
  source: 'trade' | 'loan' | 'floor_elevation'
}

// ============================================================================
// Transformation Functions
// ============================================================================

/**
 * @description Transforms a GraphQL trade to unified activity format
 * @param trade - The trade entity from GraphQL
 * @param priceBefore - Optional price before the trade (from previous trade's newPrice)
 */
export function tradeToActivity(
  trade: TGraphQLTradeActivity,
  priceBefore?: number
): TMarketActivityData {
  const tokenAmount = Number.parseFloat(trade.tokenAmountFormatted) || 0
  const reserveAmount = Number.parseFloat(trade.reserveAmountFormatted) || 0
  const fee = Number.parseFloat(trade.feeFormatted) || 0
  const newPrice = Number.parseFloat(trade.newPriceFormatted) || 0

  // Calculate price impact from the trade's own execution data
  // effectivePrice = what the user actually paid/received per token
  // newPrice = the market price after the trade
  //
  // For a BUY: user pushes price UP, so effectivePrice < newPrice
  //   - Impact = (newPrice - effectivePrice) / newPrice (how much cheaper the pre-trade price was)
  // For a SELL: user pushes price DOWN, so effectivePrice > newPrice
  //   - Impact = (effectivePrice - newPrice) / effectivePrice (how much higher the pre-trade price was)
  //
  // This matches the trade form's calculation which compares expected vs actual output
  let priceImpact = 0
  if (tokenAmount > 0 && newPrice > 0) {
    const effectivePrice = reserveAmount / tokenAmount

    if (trade.tradeType === 'BUY') {
      // For buys: effectivePrice < newPrice (you paid at prices leading up to newPrice)
      // Price impact = how much more expensive the average execution was vs the starting price
      // Since effectivePrice is the average and newPrice is the final (higher) price,
      // the starting price was lower than effectivePrice
      // Approximate impact as the spread between effective and new price
      if (effectivePrice > 0) {
        priceImpact = Math.abs(newPrice - effectivePrice) / newPrice
      }
    } else {
      // For sells: effectivePrice > newPrice (you sold at prices leading down to newPrice)
      // Price impact = how much less you got compared to the starting price
      // Since effectivePrice is the average and newPrice is the final (lower) price,
      // the starting price was higher than effectivePrice
      // Approximate impact as the spread between effective and new price
      if (effectivePrice > 0) {
        priceImpact = Math.abs(effectivePrice - newPrice) / effectivePrice
      }
    }
  }

  return {
    id: trade.id,
    market_id: trade.market_id,
    user_id: trade.user_id,
    type: trade.tradeType === 'BUY' ? 'buy' : 'sell',
    timestamp: trade.timestamp,
    tokenAmountRaw: trade.tokenAmountRaw,
    tokenAmountFormatted: trade.tokenAmountFormatted,
    reserveAmountRaw: trade.reserveAmountRaw,
    reserveAmountFormatted: trade.reserveAmountFormatted,
    feeRaw: trade.feeRaw,
    feeFormatted: trade.feeFormatted,
    newPriceRaw: trade.newPriceRaw,
    newPriceFormatted: trade.newPriceFormatted,
    transactionHash: trade.transactionHash,
    amounts: {
      input: trade.tradeType === 'BUY' ? reserveAmount : tokenAmount,
      output: trade.tradeType === 'BUY' ? tokenAmount : reserveAmount,
      fee,
    },
    prices: {
      before: priceBefore ?? 0,
      after: newPrice,
      priceImpact,
    },
    timestampDate: new Date(Number.parseInt(trade.timestamp) * 1000),
    status: 'confirmed',
    source: 'trade',
  }
}

/**
 * @description Transforms a GraphQL loan to unified activity format
 * A loan can generate multiple activity events (borrow, repay, close)
 * @param loan - The loan entity from GraphQL
 * @param skipBorrow - If true, skip creating the borrow activity (used for loop transactions)
 */
export function loanToActivity(
  loan: TGraphQLLoanActivity,
  skipBorrow: boolean = false
): TMarketActivityData[] {
  const activities: TMarketActivityData[] = []
  const collateralAmount = Number.parseFloat(loan.lockedCollateralFormatted) || 0
  const borrowAmount = Number.parseFloat(loan.borrowAmountFormatted) || 0
  const remainingDebt = Number.parseFloat(loan.remainingDebtFormatted) || 0
  const fee = Number.parseFloat(loan.originationFeeFormatted) || 0

  // Create borrow activity for loan creation (unless it's part of a loop)
  if (!skipBorrow) {
    activities.push({
      id: `${loan.id}-borrow`,
      market_id: loan.market_id,
      user_id: loan.borrower_id,
      type: 'borrow',
      timestamp: loan.openedAt,
      tokenAmountRaw: loan.lockedCollateralRaw,
      tokenAmountFormatted: loan.lockedCollateralFormatted,
      reserveAmountRaw: loan.borrowAmountRaw,
      reserveAmountFormatted: loan.borrowAmountFormatted,
      feeRaw: loan.originationFeeRaw,
      feeFormatted: loan.originationFeeFormatted,
      newPriceRaw: null,
      newPriceFormatted: null,
      transactionHash: loan.transactionHash,
      amounts: {
        input: collateralAmount, // Collateral locked
        output: borrowAmount - fee, // Net borrowed amount
        fee,
      },
      prices: null,
      timestampDate: new Date(Number.parseInt(loan.openedAt) * 1000),
      status: 'confirmed',
      source: 'loan',
    })
  }

  // Create repay activities from status history (tracks individual repay transactions)
  const statusHistory = (loan as any).statusHistory || []
  if (statusHistory.length > 0) {
    // Sort by timestamp ascending to process chronologically
    const sortedHistory = [...statusHistory].sort(
      (a, b) => Number.parseInt(a.timestamp) - Number.parseInt(b.timestamp)
    )

    // Track previous debt to calculate repay amount
    let previousDebt = borrowAmount

    for (const historyEntry of sortedHistory) {
      const currentDebt = Number.parseFloat(historyEntry.remainingDebtFormatted) || 0
      const repayAmount = previousDebt - currentDebt

      // Only create activity if there was an actual repayment (debt decreased)
      if (repayAmount > 0 && historyEntry.status === 'ACTIVE') {
        // Calculate proportional collateral unlocked (simplified - assumes linear relationship)
        const collateralUnlocked = (repayAmount / borrowAmount) * collateralAmount

        activities.push({
          id: `${loan.id}-repay-${historyEntry.id}`,
          market_id: loan.market_id,
          user_id: loan.borrower_id,
          type: 'repay',
          timestamp: historyEntry.timestamp,
          tokenAmountRaw: String(Math.round(collateralUnlocked * 1e18)), // Approximate
          tokenAmountFormatted: collateralUnlocked.toFixed(6),
          reserveAmountRaw: String(Math.round(repayAmount * 1e18)), // Approximate
          reserveAmountFormatted: repayAmount.toFixed(6),
          feeRaw: '0',
          feeFormatted: '0',
          newPriceRaw: null,
          newPriceFormatted: null,
          transactionHash: historyEntry.transactionHash,
          amounts: {
            input: repayAmount, // Amount repaid
            output: collateralUnlocked, // Collateral unlocked (approximate)
            fee: 0,
          },
          prices: null,
          timestampDate: new Date(Number.parseInt(historyEntry.timestamp) * 1000),
          status: 'confirmed',
          source: 'loan',
        })
      }

      previousDebt = currentDebt
    }
  } else {
    // Fallback: If no status history, create a single repay activity if loan has been repaid
    // This handles loans that were fully repaid before status history tracking was added
    if (loan.status === 'REPAID' && loan.closedAt) {
      const totalRepaid = borrowAmount - remainingDebt
      if (totalRepaid > 0) {
        activities.push({
          id: `${loan.id}-repay`,
          market_id: loan.market_id,
          user_id: loan.borrower_id,
          type: 'repay',
          timestamp: loan.closedAt,
          tokenAmountRaw: loan.lockedCollateralRaw,
          tokenAmountFormatted: loan.lockedCollateralFormatted,
          reserveAmountRaw: String(Math.round(totalRepaid * 1e18)),
          reserveAmountFormatted: totalRepaid.toFixed(6),
          feeRaw: '0',
          feeFormatted: '0',
          newPriceRaw: null,
          newPriceFormatted: null,
          transactionHash: loan.transactionHash,
          amounts: {
            input: totalRepaid, // Amount repaid
            output: collateralAmount, // Collateral unlocked
            fee: 0,
          },
          prices: null,
          timestampDate: new Date(Number.parseInt(loan.closedAt) * 1000),
          status: 'confirmed',
          source: 'loan',
        })
      }
    } else if (remainingDebt < borrowAmount && loan.lastUpdatedAt) {
      // Partial repayment detected (remainingDebt < borrowAmount) but no status history
      // Use lastUpdatedAt as timestamp for the repay activity
      const totalRepaid = borrowAmount - remainingDebt
      const collateralUnlocked = (totalRepaid / borrowAmount) * collateralAmount

      activities.push({
        id: `${loan.id}-repay-partial`,
        market_id: loan.market_id,
        user_id: loan.borrower_id,
        type: 'repay',
        timestamp: loan.lastUpdatedAt,
        tokenAmountRaw: String(Math.round(collateralUnlocked * 1e18)),
        tokenAmountFormatted: collateralUnlocked.toFixed(6),
        reserveAmountRaw: String(Math.round(totalRepaid * 1e18)),
        reserveAmountFormatted: totalRepaid.toFixed(6),
        feeRaw: '0',
        feeFormatted: '0',
        newPriceRaw: null,
        newPriceFormatted: null,
        transactionHash: loan.transactionHash,
        amounts: {
          input: totalRepaid, // Amount repaid
          output: collateralUnlocked, // Collateral unlocked (approximate)
          fee: 0,
        },
        prices: null,
        timestampDate: new Date(Number.parseInt(loan.lastUpdatedAt) * 1000),
        status: 'confirmed',
        source: 'loan',
      })
    }
  }

  return activities
}

/**
 * @description Transforms a GraphQL floor elevation to unified activity format
 * @param elevation - The floor elevation entity from GraphQL
 */
export function floorElevationToActivity(
  elevation: TGraphQLFloorElevationActivity
): TMarketActivityData {
  const deployedAmount = Number.parseFloat(elevation.deployedAmountFormatted) || 0

  return {
    id: elevation.id,
    market_id: elevation.market_id,
    user_id: '0x0000000000000000000000000000000000000000', // System action, no user
    type: 'floor_elevation',
    timestamp: String(elevation.timestamp),
    tokenAmountRaw: '0',
    tokenAmountFormatted: '0',
    reserveAmountRaw: String(elevation.deployedAmountRaw),
    reserveAmountFormatted: elevation.deployedAmountFormatted,
    feeRaw: '0',
    feeFormatted: '0',
    newPriceRaw: String(elevation.newFloorPriceRaw),
    newPriceFormatted: elevation.newFloorPriceFormatted,
    transactionHash: elevation.transactionHash,
    amounts: {
      input: deployedAmount, // Amount injected
      output: 0,
      fee: 0,
    },
    prices: null,
    timestampDate: new Date(Number.parseInt(String(elevation.timestamp)) * 1000),
    status: 'confirmed',
    source: 'floor_elevation',
  }
}

/**
 * @description Combines and sorts trades, loans, and floor elevations into unified activity list
 * Detects "loop" transactions by matching BUY trades with loans that share the same txHash
 * Price impact is calculated from each trade's own execution data (effective price vs post-trade price)
 */
export function combineMarketActivity(
  trades: TGraphQLTradeActivity[],
  loans: TGraphQLLoanActivity[],
  floorElevations: TGraphQLFloorElevationActivity[] = []
): TMarketActivityData[] {
  // Create a set of loan transaction hashes for quick lookup
  // These are loans created in the same tx as a buy (indicating a loop/buyAndBorrow)
  const loanTxHashes = new Set(loans.map((loan) => loan.transactionHash.toLowerCase()))

  // Sort trades by timestamp ascending (oldest first) to calculate price impact
  // Each trade's "before price" is the previous trade's "newPrice"
  const sortedTrades = [...trades].sort(
    (a, b) => Number.parseInt(a.timestamp) - Number.parseInt(b.timestamp)
  )

  // Transform trades with price impact calculation
  const tradeActivities: TMarketActivityData[] = []
  for (let i = 0; i < sortedTrades.length; i++) {
    const trade = sortedTrades[i]
    // Use previous trade's newPrice as the price before this trade
    const priceBefore =
      i > 0 ? Number.parseFloat(sortedTrades[i - 1].newPriceFormatted) || undefined : undefined

    const activity = tradeToActivity(trade, priceBefore)

    // If this is a BUY and there's a loan with the same txHash, it's a loop
    if (trade.tradeType === 'BUY' && loanTxHashes.has(trade.transactionHash.toLowerCase())) {
      tradeActivities.push({ ...activity, type: 'loop' as TActivityType })
    } else {
      tradeActivities.push(activity)
    }
  }

  // For loans, skip creating "borrow" activity if it was part of a loop (same txHash as a BUY trade)
  const tradeTxHashes = new Set(
    trades.filter((t) => t.tradeType === 'BUY').map((t) => t.transactionHash.toLowerCase())
  )

  const loanActivities = loans.flatMap((loan) => {
    // If this loan was created as part of a loop, skip the borrow activity
    // (it's already shown as "loop" from the trade side)
    const isLoopLoan = tradeTxHashes.has(loan.transactionHash.toLowerCase())
    return loanToActivity(loan, isLoopLoan)
  })

  // Transform floor elevations
  const floorElevationActivities = floorElevations.map(floorElevationToActivity)

  // Combine and sort by timestamp (newest first)
  return [...tradeActivities, ...loanActivities, ...floorElevationActivities].sort(
    (a, b) => Number.parseInt(b.timestamp) - Number.parseInt(a.timestamp)
  )
}
