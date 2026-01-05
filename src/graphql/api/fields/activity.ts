import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'

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

// ============================================================================
// Combined Query Definition
// ============================================================================

/**
 * @description Builds a combined query for market activity (trades + loans)
 * This fetches both in a single GraphQL request for efficiency
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
  }) satisfies GraphQLQueryArgs

export type MarketActivityQueryType = ReturnType<typeof buildMarketActivityQuery>
export type MarketActivityQueryResultType = GraphQLQueryResult<MarketActivityQueryType>

// Type aliases for individual entities from GraphQL result
export type TGraphQLTradeActivity = NonNullable<MarketActivityQueryResultType['Trade']>[0]
export type TGraphQLLoanActivity = NonNullable<MarketActivityQueryResultType['Loan']>[0]

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
  source: 'trade' | 'loan'
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

  // Calculate price impact if we have the before price
  // Price impact = (priceAfter - priceBefore) / priceBefore
  let priceImpact = 0
  if (priceBefore && priceBefore > 0) {
    priceImpact = Math.abs((newPrice - priceBefore) / priceBefore)
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
 * @description Combines and sorts trades and loans into unified activity list
 * Detects "loop" transactions by matching BUY trades with loans that share the same txHash
 * Calculates price impact by comparing each trade's newPrice with the previous trade's newPrice
 */
export function combineMarketActivity(
  trades: TGraphQLTradeActivity[],
  loans: TGraphQLLoanActivity[]
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

  // Combine and sort by timestamp (newest first)
  return [...tradeActivities, ...loanActivities].sort(
    (a, b) => Number.parseInt(b.timestamp) - Number.parseInt(a.timestamp)
  )
}
