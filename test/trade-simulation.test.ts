/**
 * @description Tier-1 hermetic tests for `trade-simulation.ts`. Verifies the
 *              simulator composes the curve primitive with on-chain fee math
 *              correctly for buy / sell / borrow / repay / buyAndBorrow.
 *              Bit-exact parity with the on-chain `IssuanceBase_v2` +
 *              `RedeemingIssuanceBase_v2` + `CreditFacility_v1` flows is the
 *              property under test; complex composition is verified via
 *              algebraic invariants (round-trip, conservation of debt vs
 *              borrowReceived, per-loop monotonicity). The Tier-2 Anvil
 *              parity test is the canonical vs-Solidity comparison.
 */
import { describe, expect, it } from 'bun:test'

import { CurveMathError, SCALING_FACTOR } from '../src/utils/discrete-curve-math'
import {
  type DecodedSegment,
  DEFAULT_FLOOR_SEGMENT,
  DEFAULT_PREMIUM_SEGMENTS,
} from '../src/utils/segments'
import {
  simulateBorrow,
  simulateBuy,
  simulateBuyAndBorrow,
  simulateRepay,
  simulateSell,
  SimulationError,
} from '../src/utils/trade-simulation'

const ONE = SCALING_FACTOR // 1e18
const BPS = BigInt(10_000)

const decode = (s: {
  initialPrice: bigint
  priceIncrease: bigint
  supplyPerStep: bigint
  numberOfSteps: number
}): DecodedSegment => ({
  initialPrice: s.initialPrice,
  priceIncreasePerStep: s.priceIncrease,
  supplyPerStep: s.supplyPerStep,
  numberOfSteps: s.numberOfSteps,
  totalSupply: s.supplyPerStep * BigInt(s.numberOfSteps),
  finalPrice:
    s.numberOfSteps > 0
      ? s.initialPrice + s.priceIncrease * BigInt(s.numberOfSteps - 1)
      : s.initialPrice,
  isFloorSegment: s.priceIncrease === BigInt(0) && s.numberOfSteps === 1,
})

const FLOOR = decode(DEFAULT_FLOOR_SEGMENT)
const FULL_CURVE: DecodedSegment[] = [DEFAULT_FLOOR_SEGMENT, ...DEFAULT_PREMIUM_SEGMENTS].map(
  decode
)

describe('simulateBuy', () => {
  it('zero fee: tokensReceived equals curve mint', () => {
    const r = simulateBuy({
      depositAmount: BigInt(1_000),
      segments: [FLOOR],
      totalSupply: BigInt(0),
      buyFeeBps: BigInt(0),
    })
    expect(r.feePaid).toBe(BigInt(0))
    expect(r.tokensReceived).toBe(BigInt(1_000))
    expect(r.collateralSpent).toBe(BigInt(1_000))
    expect(r.refund).toBe(BigInt(0))
    expect(r.finalSupply).toBe(BigInt(1_000))
  })

  it('100bps fee: deducts 1% before curve math', () => {
    // 1_000 deposit, 100 bps → 10 fee, 990 net → 990 tokens at price 1e18.
    const r = simulateBuy({
      depositAmount: BigInt(1_000),
      segments: [FLOOR],
      totalSupply: BigInt(0),
      buyFeeBps: BigInt(100),
    })
    expect(r.feePaid).toBe(BigInt(10))
    expect(r.tokensReceived).toBe(BigInt(990))
    expect(r.collateralSpent).toBe(BigInt(990))
  })

  it('throws TradeAmountTooLow when fee rounds to zero with non-zero rate', () => {
    // deposit 5, fee 100bps → fee = 5*100/10_000 = 0 (floor).
    let thrown: SimulationError | null = null
    try {
      simulateBuy({
        depositAmount: BigInt(5),
        segments: [FLOOR],
        totalSupply: BigInt(0),
        buyFeeBps: BigInt(100),
      })
    } catch (e) {
      thrown = e as SimulationError
    }
    expect(thrown?.name).toBe('Module__IssuanceBase__TradeAmountTooLow')
  })

  it('exhausted curve: refund > 0, tokensReceived limited', () => {
    const totalCapacity = FULL_CURVE.reduce(
      (acc, s) => acc + BigInt(s.numberOfSteps) * s.supplyPerStep,
      BigInt(0)
    )
    const r = simulateBuy({
      depositAmount: BigInt(1_000),
      segments: FULL_CURVE,
      totalSupply: totalCapacity,
      buyFeeBps: BigInt(0),
    })
    expect(r.tokensReceived).toBe(BigInt(0))
    expect(r.collateralSpent).toBe(BigInt(0))
    expect(r.refund).toBe(BigInt(1_000))
  })

  it('priceImpactBps is non-negative for buys', () => {
    const r = simulateBuy({
      depositAmount: FLOOR.totalSupply / BigInt(10),
      segments: FULL_CURVE,
      totalSupply: BigInt(0),
      buyFeeBps: BigInt(0),
    })
    expect(r.priceImpactBps >= BigInt(0)).toBe(true)
  })
})

describe('simulateSell', () => {
  it('zero fee: full collateralReturned reaches user', () => {
    // Floor only, supply at full capacity, sell 100 → 100 collateral back, no fee.
    const r = simulateSell({
      tokensIn: BigInt(100),
      segments: [FLOOR],
      totalSupply: FLOOR.totalSupply,
      sellFeeBps: BigInt(0),
    })
    expect(r.feePaid).toBe(BigInt(0))
    expect(r.tokensBurned).toBe(BigInt(100))
    expect(r.collateralReceived).toBe(BigInt(100))
  })

  it('100bps fee: fee taken from collateral output', () => {
    // 1_000 tokens out → 1_000 gross → 10 fee → 990 net.
    const r = simulateSell({
      tokensIn: BigInt(1_000),
      segments: [FLOOR],
      totalSupply: FLOOR.totalSupply,
      sellFeeBps: BigInt(100),
    })
    expect(r.feePaid).toBe(BigInt(10))
    expect(r.collateralReceived).toBe(BigInt(990))
  })

  it('throws TradeAmountTooLow when sell fee rounds to zero', () => {
    // Sell 5 tokens at 1e18 floor price → 5 collateral out, 100bps → fee 0.
    let thrown: SimulationError | null = null
    try {
      simulateSell({
        tokensIn: BigInt(5),
        segments: [FLOOR],
        totalSupply: FLOOR.totalSupply,
        sellFeeBps: BigInt(100),
      })
    } catch (e) {
      thrown = e as SimulationError
    }
    expect(thrown?.name).toBe('Module__IssuanceBase__TradeAmountTooLow')
  })

  it('priceImpactBps is non-positive for sells', () => {
    const r = simulateSell({
      tokensIn: FLOOR.totalSupply / BigInt(2),
      segments: FULL_CURVE,
      totalSupply: FLOOR.totalSupply,
      sellFeeBps: BigInt(0),
    })
    expect(r.priceImpactBps <= BigInt(0)).toBe(true)
  })
})

describe('simulateBorrow', () => {
  it('zero fee: borrowReceived equals requestedLoanAmount', () => {
    const r = simulateBorrow({
      requestedLoanAmount: BigInt(1_000),
      currentFloorPrice: ONE,
      loanToValueRatio: BigInt(8_000), // 80%
      borrowingFeeBps: BigInt(0),
    })
    expect(r.borrowingFee).toBe(BigInt(0))
    expect(r.borrowReceived).toBe(BigInt(1_000))
    expect(r.minimumBorrowAmount).toBe(BigInt(0))
  })

  it('800 bps fee: 8% taken, minimum = 10_000/800 = 12', () => {
    const r = simulateBorrow({
      requestedLoanAmount: BigInt(1_000),
      currentFloorPrice: ONE,
      loanToValueRatio: BigInt(8_000),
      borrowingFeeBps: BigInt(800),
    })
    expect(r.borrowingFee).toBe(BigInt(80))
    expect(r.borrowReceived).toBe(BigInt(920))
    expect(r.minimumBorrowAmount).toBe(BigInt(12))
  })

  it('throws BorrowAmountTooSmall when fee rounds to zero', () => {
    let thrown: SimulationError | null = null
    try {
      // 5 * 800 / 10_000 = 0
      simulateBorrow({
        requestedLoanAmount: BigInt(5),
        currentFloorPrice: ONE,
        loanToValueRatio: BigInt(8_000),
        borrowingFeeBps: BigInt(800),
      })
    } catch (e) {
      thrown = e as SimulationError
    }
    expect(thrown?.name).toBe('Module__CreditFacility_BorrowAmountTooSmall')
    expect(thrown?.args?.[0]).toBe(BigInt(5))
    expect(thrown?.args?.[1]).toBe(BigInt(12)) // 10_000 / 800
  })

  it('requiredIssuanceCollateral matches mulDiv formula', () => {
    // requested = 1_000_000, ltv = 8_000 (80%), price = 1e18
    // requiredIssuance = 1_000_000 * 1e18 * 10_000 / (8_000 * 1e18) = 1_250_000
    const r = simulateBorrow({
      requestedLoanAmount: BigInt(1_000_000),
      currentFloorPrice: ONE,
      loanToValueRatio: BigInt(8_000),
      borrowingFeeBps: BigInt(0),
    })
    expect(r.requiredIssuanceCollateral).toBe(BigInt(1_250_000))
  })
})

describe('simulateRepay', () => {
  it('full repayment: unlocks all locked issuance, debt zeroed', () => {
    const r = simulateRepay({
      loan: { remainingLoanAmount: BigInt(100), lockedIssuanceTokens: BigInt(125) },
      repayAmount: BigInt(100),
    })
    expect(r.isFullRepay).toBe(true)
    expect(r.unlockedIssuance).toBe(BigInt(125))
    expect(r.remainingDebt).toBe(BigInt(0))
    expect(r.actualRepayment).toBe(BigInt(100))
  })

  it('overpay clamps to remainingLoanAmount and behaves as full', () => {
    const r = simulateRepay({
      loan: { remainingLoanAmount: BigInt(100), lockedIssuanceTokens: BigInt(125) },
      repayAmount: BigInt(150),
    })
    expect(r.isFullRepay).toBe(true)
    expect(r.actualRepayment).toBe(BigInt(100))
    expect(r.unlockedIssuance).toBe(BigInt(125))
  })

  it('partial repayment: proportional unlock', () => {
    const r = simulateRepay({
      loan: { remainingLoanAmount: BigInt(100), lockedIssuanceTokens: BigInt(125) },
      repayAmount: BigInt(40),
    })
    expect(r.isFullRepay).toBe(false)
    // unlocked = 125 * 40 / 100 = 50 (floor)
    expect(r.unlockedIssuance).toBe(BigInt(50))
    expect(r.remainingDebt).toBe(BigInt(60))
    expect(r.actualRepayment).toBe(BigInt(40))
  })

  it('throws on zero repayment', () => {
    let thrown: SimulationError | null = null
    try {
      simulateRepay({
        loan: { remainingLoanAmount: BigInt(100), lockedIssuanceTokens: BigInt(125) },
        repayAmount: BigInt(0),
      })
    } catch (e) {
      thrown = e as SimulationError
    }
    expect(thrown?.name).toBe('Module__CreditFacility_InvalidParameters')
  })
})

describe('simulateBuyAndBorrow', () => {
  // Synthetic curve large enough to absorb 5+ loop iterations without exhausting.
  const TINY_FLOOR: DecodedSegment = decode({
    initialPrice: ONE,
    priceIncrease: BigInt(0),
    supplyPerStep: BigInt(1_000_000_000),
    numberOfSteps: 1,
  })

  it('1 loop: matches simulateBuy + simulateBorrow', () => {
    const ltv = BigInt(8_000)
    const buyFeeBps = BigInt(100)
    const borrowFeeBps = BigInt(800)
    const initialCollateral = BigInt(10_000)

    const r = simulateBuyAndBorrow({
      collateralAmount: initialCollateral,
      loops: 1,
      segments: [TINY_FLOOR],
      totalSupply: BigInt(0),
      buyFeeBps,
      currentFloorPrice: ONE,
      loanToValueRatio: ltv,
      borrowingFeeBps: borrowFeeBps,
    })

    const expectedBuy = simulateBuy({
      depositAmount: initialCollateral,
      segments: [TINY_FLOOR],
      totalSupply: BigInt(0),
      buyFeeBps,
    })
    const loanAmount = (expectedBuy.tokensReceived * ltv * ONE) / (ONE * BPS)
    const expectedBorrow = simulateBorrow({
      requestedLoanAmount: loanAmount,
      currentFloorPrice: ONE,
      loanToValueRatio: ltv,
      borrowingFeeBps: borrowFeeBps,
    })

    expect(r.totalTokensMinted).toBe(expectedBuy.tokensReceived)
    expect(r.totalDebt).toBe(loanAmount)
    expect(r.remainingCollateral).toBe(expectedBorrow.borrowReceived)
    expect(r.aggregateFees.buy).toBe(expectedBuy.feePaid)
    expect(r.aggregateFees.borrow).toBe(expectedBorrow.borrowingFee)
  })

  it('3 loops: per-iteration debt monotonically decreases (collateral shrinks each pass)', () => {
    const r = simulateBuyAndBorrow({
      collateralAmount: BigInt(100_000),
      loops: 3,
      segments: [TINY_FLOOR],
      totalSupply: BigInt(0),
      buyFeeBps: BigInt(100),
      currentFloorPrice: ONE,
      loanToValueRatio: BigInt(8_000),
      borrowingFeeBps: BigInt(800),
    })
    expect(r.perLoopBreakdown).toHaveLength(3)
    // collateralIn for iteration N+1 = borrowReceived from iteration N
    for (let i = 1; i < 3; i++) {
      expect(r.perLoopBreakdown[i].collateralIn).toBe(r.perLoopBreakdown[i - 1].netBorrowed)
    }
    // Each iteration's collateral input should be smaller than the previous.
    expect(r.perLoopBreakdown[1].collateralIn < r.perLoopBreakdown[0].collateralIn).toBe(true)
    expect(r.perLoopBreakdown[2].collateralIn < r.perLoopBreakdown[1].collateralIn).toBe(true)
    // totalDebt is sum of per-iteration loanAmounts.
    const debtSum = r.perLoopBreakdown.reduce((acc, b) => acc + b.loanAmount, BigInt(0))
    expect(r.totalDebt).toBe(debtSum)
  })

  it('5 loops: aggregate fee == sum of per-iteration fees', () => {
    const r = simulateBuyAndBorrow({
      collateralAmount: BigInt(1_000_000),
      loops: 5,
      segments: [TINY_FLOOR],
      totalSupply: BigInt(0),
      buyFeeBps: BigInt(100),
      currentFloorPrice: ONE,
      loanToValueRatio: BigInt(8_000),
      borrowingFeeBps: BigInt(800),
    })
    expect(r.perLoopBreakdown).toHaveLength(5)
    const buyFeeSum = r.perLoopBreakdown.reduce((a, b) => a + b.buyFeePaid, BigInt(0))
    const borrowFeeSum = r.perLoopBreakdown.reduce((a, b) => a + b.borrowingFee, BigInt(0))
    expect(r.aggregateFees.buy).toBe(buyFeeSum)
    expect(r.aggregateFees.borrow).toBe(borrowFeeSum)
    expect(r.aggregateFees.total).toBe(buyFeeSum + borrowFeeSum)
  })

  it('throws InsufficientCollateralForLoops when an iteration starts with zero collateral', () => {
    // Trigger this with a comically high fee that drains all output to fees.
    // 10_000 bps = 100% fee → borrowReceived = 0 → next iteration has 0 collateral.
    let thrown: SimulationError | null = null
    try {
      simulateBuyAndBorrow({
        collateralAmount: BigInt(1_000_000),
        loops: 3,
        segments: [TINY_FLOOR],
        totalSupply: BigInt(0),
        buyFeeBps: BigInt(0),
        currentFloorPrice: ONE,
        loanToValueRatio: BigInt(8_000),
        borrowingFeeBps: BigInt(10_000), // 100%
      })
    } catch (e) {
      thrown = e as SimulationError
    }
    expect(thrown?.name).toBe('Module__CreditFacility_InsufficientCollateralForLoops')
  })

  it('rejects non-positive loop counts', () => {
    let thrown: SimulationError | null = null
    try {
      simulateBuyAndBorrow({
        collateralAmount: BigInt(1_000),
        loops: 0,
        segments: [TINY_FLOOR],
        totalSupply: BigInt(0),
        buyFeeBps: BigInt(0),
        currentFloorPrice: ONE,
        loanToValueRatio: BigInt(8_000),
        borrowingFeeBps: BigInt(0),
      })
    } catch (e) {
      thrown = e as SimulationError
    }
    expect(thrown?.name).toBe('Module__CreditFacility_InvalidParameters')
  })

  it('curve exhaustion mid-loop throws NoIssuanceTokensReceived', () => {
    // Fully exhausted curve: any buy returns 0 tokens.
    const totalCapacity = TINY_FLOOR.supplyPerStep * BigInt(TINY_FLOOR.numberOfSteps)
    let thrown: SimulationError | null = null
    try {
      simulateBuyAndBorrow({
        collateralAmount: BigInt(1_000),
        loops: 1,
        segments: [TINY_FLOOR],
        totalSupply: totalCapacity,
        buyFeeBps: BigInt(0),
        currentFloorPrice: ONE,
        loanToValueRatio: BigInt(8_000),
        borrowingFeeBps: BigInt(0),
      })
    } catch (e) {
      thrown = e as SimulationError
    }
    expect(thrown?.name).toBe('Module__CreditFacility_NoIssuanceTokensReceived')
  })
})

describe('error name plumbing', () => {
  it('CurveMathError carries Solidity error name and args', () => {
    let caught: unknown
    try {
      simulateSell({
        tokensIn: BigInt(0),
        segments: [FLOOR],
        totalSupply: FLOOR.totalSupply,
        sellFeeBps: BigInt(0),
      })
    } catch (e) {
      caught = e
    }
    expect(caught).toBeInstanceOf(CurveMathError)
    expect((caught as CurveMathError).name).toBe('DiscreteCurveMathLib__ZeroIssuanceInput')
  })

  it('SimulationError extends Error and is distinguishable from CurveMathError', () => {
    let caught: unknown
    try {
      simulateBorrow({
        requestedLoanAmount: BigInt(0),
        currentFloorPrice: ONE,
        loanToValueRatio: BigInt(8_000),
        borrowingFeeBps: BigInt(800),
      })
    } catch (e) {
      caught = e
    }
    expect(caught).toBeInstanceOf(SimulationError)
    expect(caught).toBeInstanceOf(Error)
  })
})
