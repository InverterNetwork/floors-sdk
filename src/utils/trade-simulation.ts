/**
 * @description Trade simulation layer. Composes the curve primitive
 *              ({@link ./discrete-curve-math}) with on-chain fee math
 *              (`IssuanceBase_v2.sol`, `RedeemingIssuanceBase_v2.sol`) and
 *              credit-facility math (`CreditFacility_v1.sol`) to produce
 *              full-fidelity trade quotes locally.
 *
 * Inputs and outputs are in **on-chain native** units (same shape as the
 * curve primitive). All errors thrown from this module are
 * {@link CurveMathError} or {@link SimulationError} instances whose `name`
 * mirrors the corresponding Solidity custom error name.
 */
import {
  calculatePurchaseReturn,
  calculateSaleReturn,
  findPositionForSupply,
  mulDivFloor,
  SCALING_FACTOR,
} from './discrete-curve-math'
import type { DecodedSegment } from './segments'

const BPS = BigInt(10_000)

/**
 * @description Solidity-error-named JS error for non-curve simulator failures
 *              (fee rounding, credit-facility constraints).
 */
export class SimulationError extends Error {
  public readonly args?: readonly bigint[]

  constructor(name: string, message: string, args?: readonly bigint[]) {
    super(message)
    this.name = name
    this.args = args
  }
}

const sErr = (name: string, message: string, args?: readonly bigint[]): never => {
  throw new SimulationError(name, message, args)
}

/**
 * @description Compute price impact in basis points: (finalPrice - startPrice) * 10_000 / startPrice.
 *              Signed: positive for buys (price up), negative for sells (price down).
 *              Returns 0n when `startPrice` is 0n to avoid division by zero.
 */
function priceImpactBps(startPrice: bigint, finalPrice: bigint): bigint {
  if (startPrice === BigInt(0)) return BigInt(0)
  if (finalPrice >= startPrice) {
    return ((finalPrice - startPrice) * BPS) / startPrice
  }
  return -(((startPrice - finalPrice) * BPS) / startPrice)
}

/**
 * @description Step price at a given supply, or the final segment's last
 *              step price when the supply equals total curve capacity. Mirrors
 *              the Solidity convention used by `getStaticPriceForBuying` /
 *              `getStaticPriceForSelling` consumers.
 */
function stepPriceAtSupply(segments: DecodedSegment[], supply: bigint): bigint {
  if (segments.length === 0) return BigInt(0)
  const totalCapacity = segments.reduce(
    (acc, s) => acc + BigInt(s.numberOfSteps) * s.supplyPerStep,
    BigInt(0)
  )
  if (supply >= totalCapacity) {
    const last = segments[segments.length - 1]
    return last.initialPrice + BigInt(last.numberOfSteps - 1) * last.priceIncreasePerStep
  }
  return findPositionForSupply(segments, supply).priceAtCurrentStep
}

// ---------------------------------------------------------------------------
// simulateBuy
// ---------------------------------------------------------------------------

export interface TSimulateBuyInput {
  /** Reserve collateral the user is depositing (native units). */
  depositAmount: bigint
  segments: DecodedSegment[]
  /** Current `totalIssuanceSupply` of the floor at simulation time. */
  totalSupply: bigint
  /** Buy fee in basis points (e.g. 100 = 1%). */
  buyFeeBps: bigint
}

export interface TSimulateBuyResult {
  /** Issuance tokens the user will receive. */
  tokensReceived: bigint
  /** Curve-side collateral spent (after fee). */
  collateralSpent: bigint
  /** `net - collateralSpent` — the curve-side dust the on-chain wrapper hides. */
  refund: bigint
  /** Project fee taken from `depositAmount`. */
  feePaid: bigint
  /** Total issuance supply after the buy. */
  finalSupply: bigint
  /** Step price at `finalSupply`. */
  finalPrice: bigint
  /** Signed price impact in bps (positive — price moves up on buys). */
  priceImpactBps: bigint
}

/**
 * @description Mirrors `IssuanceBase_v2.calculatePurchaseReturn` (`:155-171`)
 *              composed with `_calculateNetAndSplitFees` (`:320-335`) and the
 *              full curve tuple from {@link calculatePurchaseReturn}.
 *
 * @throws `Module__IssuanceBase__TradeAmountTooLow` when `buyFeeBps > 0n` and
 *         the computed fee rounds to zero.
 * @throws curve errors propagated from the underlying primitive.
 */
export function simulateBuy(input: TSimulateBuyInput): TSimulateBuyResult {
  const { depositAmount, segments, totalSupply, buyFeeBps } = input

  let feePaid = BigInt(0)
  if (buyFeeBps > BigInt(0)) {
    feePaid = (depositAmount * buyFeeBps) / BPS
    if (feePaid === BigInt(0)) {
      sErr(
        'Module__IssuanceBase__TradeAmountTooLow',
        `Deposit ${depositAmount} too low for buy fee ${buyFeeBps} bps to round above zero`
      )
    }
  }
  const net = depositAmount - feePaid

  const startPrice = stepPriceAtSupply(segments, totalSupply)
  const { tokensToMint, collateralSpent } = calculatePurchaseReturn(segments, net, totalSupply)
  const refund = net - collateralSpent
  const finalSupply = totalSupply + tokensToMint
  const finalPrice = stepPriceAtSupply(segments, finalSupply)

  return {
    tokensReceived: tokensToMint,
    collateralSpent,
    refund,
    feePaid,
    finalSupply,
    finalPrice,
    priceImpactBps: priceImpactBps(startPrice, finalPrice),
  }
}

// ---------------------------------------------------------------------------
// simulateSell
// ---------------------------------------------------------------------------

export interface TSimulateSellInput {
  /** Issuance tokens the user is selling. */
  tokensIn: bigint
  segments: DecodedSegment[]
  totalSupply: bigint
  /** Sell fee in basis points. */
  sellFeeBps: bigint
}

export interface TSimulateSellResult {
  /** Net collateral the user will receive (after fee). */
  collateralReceived: bigint
  /** Issuance tokens actually burned. */
  tokensBurned: bigint
  /** Project fee taken from the curve's gross collateral output. */
  feePaid: bigint
  finalSupply: bigint
  finalPrice: bigint
  /** Signed price impact in bps (negative — price moves down on sells). */
  priceImpactBps: bigint
}

/**
 * @description Mirrors `RedeemingIssuanceBase_v2.calculateSaleReturn`
 *              (`:104-121`) — fee comes off the curve's collateral output, not
 *              the issuance input.
 *
 * @throws `Module__IssuanceBase__TradeAmountTooLow` when `sellFeeBps > 0n` and
 *         the computed fee rounds to zero.
 */
export function simulateSell(input: TSimulateSellInput): TSimulateSellResult {
  const { tokensIn, segments, totalSupply, sellFeeBps } = input

  const startPrice = stepPriceAtSupply(segments, totalSupply)
  const { collateralReturned, tokensBurned } = calculateSaleReturn(segments, tokensIn, totalSupply)

  let feePaid = BigInt(0)
  if (sellFeeBps > BigInt(0)) {
    feePaid = (collateralReturned * sellFeeBps) / BPS
    if (feePaid === BigInt(0)) {
      sErr(
        'Module__IssuanceBase__TradeAmountTooLow',
        `Sale collateral ${collateralReturned} too low for sell fee ${sellFeeBps} bps to round above zero`
      )
    }
  }
  const collateralReceived = collateralReturned - feePaid
  const finalSupply = totalSupply - tokensBurned
  const finalPrice = stepPriceAtSupply(segments, finalSupply)

  return {
    collateralReceived,
    tokensBurned,
    feePaid,
    finalSupply,
    finalPrice,
    priceImpactBps: priceImpactBps(startPrice, finalPrice),
  }
}

// ---------------------------------------------------------------------------
// simulateBorrow
// ---------------------------------------------------------------------------

export interface TSimulateBorrowInput {
  /** Reserve collateral the borrower wants out (`requestedLoanAmount`). */
  requestedLoanAmount: bigint
  /** `Floor.getFloorPrice()` — the protective floor segment price. */
  currentFloorPrice: bigint
  /** Loan-to-value ratio in basis points (e.g. 8000 = 80%). */
  loanToValueRatio: bigint
  /** Borrowing fee rate in basis points. */
  borrowingFeeBps: bigint
}

export interface TSimulateBorrowResult {
  /** Net collateral the borrower receives (`requestedLoanAmount - borrowingFee`). */
  borrowReceived: bigint
  borrowingFee: bigint
  /** Issuance tokens locked as collateral. */
  requiredIssuanceCollateral: bigint
  /**
   * @description Smallest `requestedLoanAmount` that yields a non-zero
   *              `borrowingFee` at the current rate (= `10_000 / borrowingFeeBps`).
   *              Surfaced so the UI can prompt with an actionable minimum
   *              instead of relying on the post-revert error message.
   */
  minimumBorrowAmount: bigint
}

/**
 * @description Mirrors `CreditFacility_v1._borrow` (`:663-707`).
 *
 * @throws `Module__CreditFacility_BorrowAmountTooSmall` when the fee rounds
 *         to zero with a non-zero rate. Args: `[requestedLoanAmount, minimumRequired]`.
 */
export function simulateBorrow(input: TSimulateBorrowInput): TSimulateBorrowResult {
  const { requestedLoanAmount, currentFloorPrice, loanToValueRatio, borrowingFeeBps } = input

  const borrowingFee = (requestedLoanAmount * borrowingFeeBps) / BPS
  const minimumBorrowAmount = borrowingFeeBps > BigInt(0) ? BPS / borrowingFeeBps : BigInt(0)

  if (borrowingFee === BigInt(0) && borrowingFeeBps > BigInt(0)) {
    sErr(
      'Module__CreditFacility_BorrowAmountTooSmall',
      `Loan amount ${requestedLoanAmount} too small for fee ${borrowingFeeBps} bps; minimum ${minimumBorrowAmount}`,
      [requestedLoanAmount, minimumBorrowAmount]
    )
  }

  const denominator = loanToValueRatio * currentFloorPrice
  if (denominator === BigInt(0)) {
    sErr(
      'Module__CreditFacility_InvalidParameters',
      'loanToValueRatio * currentFloorPrice must be > 0'
    )
  }
  const requiredIssuanceCollateral = mulDivFloor(
    requestedLoanAmount,
    SCALING_FACTOR * BPS,
    denominator
  )

  return {
    borrowReceived: requestedLoanAmount - borrowingFee,
    borrowingFee,
    requiredIssuanceCollateral,
    minimumBorrowAmount,
  }
}

// ---------------------------------------------------------------------------
// simulateRepay
// ---------------------------------------------------------------------------

export interface TLoanState {
  remainingLoanAmount: bigint
  lockedIssuanceTokens: bigint
}

export interface TSimulateRepayInput {
  loan: TLoanState
  /** Collateral the user is repaying. */
  repayAmount: bigint
}

export interface TSimulateRepayResult {
  /** Issuance tokens the user gets back from the locked collateral. */
  unlockedIssuance: bigint
  /** Loan's remaining debt after the repayment. */
  remainingDebt: bigint
  /** True when `repayAmount` covers the full remaining debt. */
  isFullRepay: boolean
  /** Actual collateral consumed (capped at `loan.remainingLoanAmount`). */
  actualRepayment: bigint
}

/**
 * @description Mirrors `CreditFacility_v1.repay` branches (`:389-426`,
 *              `:917-972`). Full repayment when
 *              `repayAmount >= loan.remainingLoanAmount`.
 */
export function simulateRepay(input: TSimulateRepayInput): TSimulateRepayResult {
  const { loan, repayAmount } = input
  if (repayAmount === BigInt(0)) {
    sErr('Module__CreditFacility_InvalidParameters', 'repayAmount must be > 0')
  }
  if (loan.remainingLoanAmount === BigInt(0)) {
    sErr('Module__CreditFacility_InvalidParameters', 'Loan has no remaining debt')
  }

  if (repayAmount >= loan.remainingLoanAmount) {
    return {
      unlockedIssuance: loan.lockedIssuanceTokens,
      remainingDebt: BigInt(0),
      isFullRepay: true,
      actualRepayment: loan.remainingLoanAmount,
    }
  }

  const unlockedIssuance = (loan.lockedIssuanceTokens * repayAmount) / loan.remainingLoanAmount
  return {
    unlockedIssuance,
    remainingDebt: loan.remainingLoanAmount - repayAmount,
    isFullRepay: false,
    actualRepayment: repayAmount,
  }
}

// ---------------------------------------------------------------------------
// simulateBuyAndBorrow
// ---------------------------------------------------------------------------

export interface TSimulateBuyAndBorrowInput {
  /** Initial collateral the user is investing. */
  collateralAmount: bigint
  /** Number of buy-borrow loop iterations. */
  loops: number
  segments: DecodedSegment[]
  totalSupply: bigint
  buyFeeBps: bigint
  /**
   * `Floor.getFloorPrice()` at simulation start. The on-chain `_buyAndBorrow`
   * loop refreshes this between iterations, but the call returns the
   * **floor segment** price (the protective floor), not the curve step price
   * — which is constant as long as the floor segment itself doesn't move,
   * so the simulator treats this as constant across loops.
   */
  currentFloorPrice: bigint
  loanToValueRatio: bigint
  borrowingFeeBps: bigint
}

export interface TLoopBreakdown {
  /** 0-based iteration index. */
  iteration: number
  /** Remaining collateral input to this iteration's buy. */
  collateralIn: bigint
  /** Issuance tokens minted in this iteration. */
  tokensReceived: bigint
  /** Collateral the curve recorded as spent this iteration. */
  collateralSpent: bigint
  /** Curve-side dust this iteration. */
  buyRefund: bigint
  /** Buy fee paid this iteration. */
  buyFeePaid: bigint
  /** Loan amount opened this iteration (debt added). */
  loanAmount: bigint
  /** Issuance tokens locked for this iteration's loan. */
  requiredIssuance: bigint
  /** Borrowing fee for this iteration's loan. */
  borrowingFee: bigint
  /** Net collateral output this iteration (= input to next iteration). */
  netBorrowed: bigint
  /** Floor totalSupply after this iteration's buy. */
  postIterationSupply: bigint
}

export interface TSimulateBuyAndBorrowResult {
  /** Sum of issuance tokens received across all iterations. */
  totalTokensMinted: bigint
  /** Sum of `loanAmount` across all iterations. */
  totalDebt: bigint
  /** Per-iteration loan summaries. */
  loans: Array<{ loanAmount: bigint; requiredIssuance: bigint; fee: bigint }>
  /** Collateral left over after the final iteration (refunded to user on-chain). */
  remainingCollateral: bigint
  perLoopBreakdown: TLoopBreakdown[]
  /** `{ buy, borrow, total }` aggregated across iterations. */
  aggregateFees: { buy: bigint; borrow: bigint; total: bigint }
  /** Floor totalSupply after all iterations. */
  finalSupply: bigint
}

/**
 * @description Mirrors `CreditFacility_v1._buyAndBorrow` (`:716-822`).
 *              Steps through `loops` iterations of buy → borrow, threading
 *              `remainingCollateral` from each iteration's `borrowReceived`
 *              into the next iteration's buy.
 *
 * @throws `Module__CreditFacility_InsufficientCollateralForLoops` when an
 *         iteration starts with zero `remainingCollateral`.
 * @throws `Module__CreditFacility_NoIssuanceTokensReceived` when an iteration's
 *         buy returns zero issuance tokens (curve exhausted).
 * @throws all errors that {@link simulateBuy} and {@link simulateBorrow} throw.
 */
export function simulateBuyAndBorrow(
  input: TSimulateBuyAndBorrowInput
): TSimulateBuyAndBorrowResult {
  const {
    collateralAmount,
    loops,
    segments,
    totalSupply,
    buyFeeBps,
    currentFloorPrice,
    loanToValueRatio,
    borrowingFeeBps,
  } = input

  if (loops <= 0 || !Number.isInteger(loops)) {
    sErr(
      'Module__CreditFacility_InvalidParameters',
      `loops must be a positive integer, got ${loops}`
    )
  }

  let remainingCollateral = collateralAmount
  let supply = totalSupply
  let totalTokensMinted = BigInt(0)
  let totalDebt = BigInt(0)
  let buyFeesAccum = BigInt(0)
  let borrowFeesAccum = BigInt(0)
  const loans: Array<{ loanAmount: bigint; requiredIssuance: bigint; fee: bigint }> = []
  const perLoopBreakdown: TLoopBreakdown[] = []

  for (let i = 0; i < loops; i++) {
    if (remainingCollateral === BigInt(0)) {
      sErr(
        'Module__CreditFacility_InsufficientCollateralForLoops',
        `Iteration ${i}: zero remaining collateral`
      )
    }

    const buy = simulateBuy({
      depositAmount: remainingCollateral,
      segments,
      totalSupply: supply,
      buyFeeBps,
    })

    if (buy.tokensReceived === BigInt(0)) {
      sErr(
        'Module__CreditFacility_NoIssuanceTokensReceived',
        `Iteration ${i}: curve returned zero issuance tokens`
      )
    }

    supply = buy.finalSupply
    totalTokensMinted += buy.tokensReceived
    buyFeesAccum += buy.feePaid

    const loanAmount = mulDivFloor(
      buy.tokensReceived * loanToValueRatio,
      currentFloorPrice,
      SCALING_FACTOR * BPS
    )

    const borrow = simulateBorrow({
      requestedLoanAmount: loanAmount,
      currentFloorPrice,
      loanToValueRatio,
      borrowingFeeBps,
    })

    totalDebt += loanAmount
    borrowFeesAccum += borrow.borrowingFee
    loans.push({
      loanAmount,
      requiredIssuance: borrow.requiredIssuanceCollateral,
      fee: borrow.borrowingFee,
    })
    perLoopBreakdown.push({
      iteration: i,
      collateralIn: remainingCollateral,
      tokensReceived: buy.tokensReceived,
      collateralSpent: buy.collateralSpent,
      buyRefund: buy.refund,
      buyFeePaid: buy.feePaid,
      loanAmount,
      requiredIssuance: borrow.requiredIssuanceCollateral,
      borrowingFee: borrow.borrowingFee,
      netBorrowed: borrow.borrowReceived,
      postIterationSupply: supply,
    })

    // Next iteration's input is the borrow's net output (matches the
    // `_collateralToken.balanceOf(this) - balanceBefore` delta in
    // `CreditFacility_v1._buyAndBorrow:793-796`).
    remainingCollateral = borrow.borrowReceived
  }

  return {
    totalTokensMinted,
    totalDebt,
    loans,
    remainingCollateral,
    perLoopBreakdown,
    aggregateFees: {
      buy: buyFeesAccum,
      borrow: borrowFeesAccum,
      total: buyFeesAccum + borrowFeesAccum,
    },
    finalSupply: supply,
  }
}
