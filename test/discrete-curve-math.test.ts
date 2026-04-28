/**
 * @description Tier-1 hermetic tests for the TypeScript port of
 *              `DiscreteCurveMathLib_v1.sol`.
 *
 *              Two assertion styles:
 *               - Hand-computed golden values for small fixtures whose
 *                 expected output can be derived mechanically (single floor
 *                 segment, basic flat curves) — these are bit-exact contracts
 *                 with the Solidity library.
 *               - Algebraic invariants (round-trip, monotonicity, segment-sum
 *                 equivalence, boundary equivalence) for complex fixtures.
 *
 *              A forge-generated golden-vector JSON (separate PR) can later
 *              replace the algebraic-invariant assertions with bit-exact
 *              comparisons; the hand-computed values stay as a sanity check.
 *              The Tier-2 Anvil parity test is the canonical
 *              vs-Solidity comparison.
 */
import { describe, expect, it } from 'bun:test'

import {
  calculatePurchaseReturn,
  calculateReserveForSupply,
  calculateReservesForTwoSupplies,
  calculateSaleReturn,
  calculateSegmentReserve,
  CurveMathError,
  findPositionForSupply,
  MAX_SEGMENTS,
  mulDivFloor,
  mulDivUp,
  SCALING_FACTOR,
  validateSegmentArray,
} from '../src/utils/discrete-curve-math'
import {
  type DecodedSegment,
  DEFAULT_FLOOR_SEGMENT,
  DEFAULT_PREMIUM_SEGMENTS,
} from '../src/utils/segments'

const ONE = SCALING_FACTOR // 1e18

/** Decode a `SegmentConfig`-shaped object into the {@link DecodedSegment} the math primitive consumes. */
const decode = (s: {
  initialPrice: bigint
  priceIncrease: bigint
  supplyPerStep: bigint
  numberOfSteps: number
}): DecodedSegment => {
  const totalSupply = s.supplyPerStep * BigInt(s.numberOfSteps)
  const finalPrice =
    s.numberOfSteps > 0
      ? s.initialPrice + s.priceIncrease * BigInt(s.numberOfSteps - 1)
      : s.initialPrice
  return {
    initialPrice: s.initialPrice,
    priceIncreasePerStep: s.priceIncrease,
    supplyPerStep: s.supplyPerStep,
    numberOfSteps: s.numberOfSteps,
    totalSupply,
    finalPrice,
    isFloorSegment: s.priceIncrease === BigInt(0) && s.numberOfSteps === 1,
  }
}

describe('mulDivUp', () => {
  it('matches Solady semantics: ceil division', () => {
    expect(mulDivUp(BigInt(10), BigInt(3), BigInt(7))).toBe(BigInt(5)) // 30/7 = 4.28 -> 5
    expect(mulDivUp(BigInt(14), BigInt(1), BigInt(7))).toBe(BigInt(2)) // exact
    expect(mulDivUp(BigInt(0), BigInt(123), BigInt(7))).toBe(BigInt(0))
  })

  it('throws on zero denominator', () => {
    expect(() => mulDivUp(BigInt(1), BigInt(1), BigInt(0))).toThrow(CurveMathError)
  })

  it('agrees with floor only on exact divisions', () => {
    const a = BigInt(123_456_789)
    const b = BigInt(987_654_321)
    const d = BigInt(1_000_000)
    const floor = mulDivFloor(a, b, d)
    const ceil = mulDivUp(a, b, d)
    // Either ceil == floor (exact) or ceil == floor + 1
    expect(ceil === floor || ceil === floor + BigInt(1)).toBe(true)
    // Confirm exactness when product is divisible.
    expect(mulDivUp(BigInt(6), BigInt(4), BigInt(8))).toBe(BigInt(3))
    expect(mulDivFloor(BigInt(6), BigInt(4), BigInt(8))).toBe(BigInt(3))
  })
})

describe('validateSegmentArray', () => {
  const single = decode(DEFAULT_FLOOR_SEGMENT)

  it('accepts a valid floor + premium curve', () => {
    const segs = [DEFAULT_FLOOR_SEGMENT, ...DEFAULT_PREMIUM_SEGMENTS].map(decode)
    expect(() => validateSegmentArray(segs)).not.toThrow()
  })

  it('rejects empty array', () => {
    let thrown: CurveMathError | null = null
    try {
      validateSegmentArray([])
    } catch (e) {
      thrown = e as CurveMathError
    }
    expect(thrown?.name).toBe('DiscreteCurveMathLib__NoSegmentsConfigured')
  })

  it('rejects too many segments', () => {
    const segs: DecodedSegment[] = []
    for (let i = 0; i < MAX_SEGMENTS + 1; i++) segs.push(single)
    let thrown: CurveMathError | null = null
    try {
      validateSegmentArray(segs)
    } catch (e) {
      thrown = e as CurveMathError
    }
    expect(thrown?.name).toBe('DiscreteCurveMathLib__TooManySegments')
  })

  it('rejects single-step segment with non-zero priceIncrease', () => {
    const bad = decode({
      initialPrice: ONE,
      priceIncrease: BigInt(1), // > 0 with numberOfSteps == 1
      supplyPerStep: BigInt(100),
      numberOfSteps: 1,
    })
    const next = decode(DEFAULT_FLOOR_SEGMENT)
    let thrown: CurveMathError | null = null
    try {
      validateSegmentArray([bad, next])
    } catch (e) {
      thrown = e as CurveMathError
    }
    expect(thrown?.name).toBe('DiscreteCurveMathLib__SingleStepMustBeFlat')
  })

  it('rejects decreasing inter-segment price progression', () => {
    const high = decode({
      initialPrice: BigInt(10) * ONE,
      priceIncrease: BigInt(0),
      supplyPerStep: BigInt(100),
      numberOfSteps: 1,
    })
    const low = decode({
      initialPrice: ONE,
      priceIncrease: BigInt(0),
      supplyPerStep: BigInt(100),
      numberOfSteps: 1,
    })
    let thrown: CurveMathError | null = null
    try {
      validateSegmentArray([high, low])
    } catch (e) {
      thrown = e as CurveMathError
    }
    expect(thrown?.name).toBe('DiscreteCurveMathLib__InvalidPriceProgression')
  })
})

describe('calculateSegmentReserve — hand-computed', () => {
  it('flat segment, full step', () => {
    // initialPrice = 1e18, supplyPerStep = 100, fullSteps = 1
    // collateral = mulDivUp(1*100, 1e18, 1e18) = 100
    expect(calculateSegmentReserve(ONE, BigInt(0), BigInt(100), BigInt(100))).toBe(BigInt(100))
  })

  it('flat segment, partial step', () => {
    // initialPrice = 2e18, partialSupply = 25, supplyPerStep = 100
    // partialStepPrice = 2e18; collateral = mulDivUp(25, 2e18, 1e18) = 50
    expect(calculateSegmentReserve(BigInt(2) * ONE, BigInt(0), BigInt(100), BigInt(25))).toBe(
      BigInt(50)
    )
  })

  it('sloped segment, two full steps', () => {
    // initialPrice = 1e18, priceIncrease = 1e18, fullSteps = 2, supplyPerStep = 100
    // first = 1e18, last = 2e18, sum = 3e18, totalPrice = floor(2 * 3e18 / 2) = 3e18
    // collateral = mulDivUp(100, 3e18, 1e18) = 300
    expect(calculateSegmentReserve(ONE, ONE, BigInt(100), BigInt(200))).toBe(BigInt(300))
  })
})

describe('calculateReserveForSupply', () => {
  const floor = decode(DEFAULT_FLOOR_SEGMENT)
  const fullCurve = [DEFAULT_FLOOR_SEGMENT, ...DEFAULT_PREMIUM_SEGMENTS].map(decode)

  it('returns 0 for zero supply', () => {
    expect(calculateReserveForSupply([floor], BigInt(0))).toBe(BigInt(0))
  })

  it('floor-only: cost == initialPrice * supply / 1e18 (rounded up)', () => {
    // DEFAULT_FLOOR_SEGMENT: initialPrice = 1e18, supply = 400_000e18, flat.
    // Reserve at full floor capacity = 400_000e18.
    expect(calculateReserveForSupply([floor], floor.totalSupply)).toBe(floor.totalSupply)
  })

  it('is monotonically non-decreasing in target supply', () => {
    const checkpoints = [
      BigInt(0),
      floor.totalSupply / BigInt(4),
      floor.totalSupply / BigInt(2),
      floor.totalSupply,
      floor.totalSupply + fullCurve[1].supplyPerStep,
    ]
    let last = BigInt(0)
    for (const s of checkpoints) {
      const r = calculateReserveForSupply(fullCurve, s)
      expect(r >= last).toBe(true)
      last = r
    }
  })

  it('matches segment-sum: reserve(A+B) == segmentReserve(A) + segmentReserve(B) for partition at segment boundary', () => {
    // Going from 0 to floor capacity equals going from 0 to half + half to full,
    // since both halves stay within the same flat segment.
    const half = floor.totalSupply / BigInt(2)
    const r1 = calculateReserveForSupply([floor], half)
    const r2 = calculateReserveForSupply([floor], floor.totalSupply)
    expect(r2 - r1).toBe(r1)
  })

  it('rejects target supply > total capacity', () => {
    let thrown: CurveMathError | null = null
    try {
      calculateReserveForSupply([floor], floor.totalSupply + BigInt(1))
    } catch (e) {
      thrown = e as CurveMathError
    }
    expect(thrown?.name).toBe('DiscreteCurveMathLib__SupplyExceedsCurveCapacity')
  })
})

describe('calculateReservesForTwoSupplies', () => {
  const fullCurve = [DEFAULT_FLOOR_SEGMENT, ...DEFAULT_PREMIUM_SEGMENTS].map(decode)
  const totalCapacity = fullCurve.reduce(
    (acc, s) => acc + BigInt(s.numberOfSteps) * s.supplyPerStep,
    BigInt(0)
  )

  it('agrees with two separate calculateReserveForSupply calls', () => {
    const lower = totalCapacity / BigInt(4)
    const higher = totalCapacity / BigInt(2)
    const { lowerReserve, higherReserve } = calculateReservesForTwoSupplies(
      fullCurve,
      lower,
      higher
    )
    expect(lowerReserve).toBe(calculateReserveForSupply(fullCurve, lower))
    expect(higherReserve).toBe(calculateReserveForSupply(fullCurve, higher))
  })

  it('returns equal reserves when lower == higher', () => {
    const at = totalCapacity / BigInt(3)
    const { lowerReserve, higherReserve } = calculateReservesForTwoSupplies(fullCurve, at, at)
    expect(lowerReserve).toBe(higherReserve)
  })

  it('handles zero lower supply', () => {
    const higher = totalCapacity / BigInt(5)
    const { lowerReserve, higherReserve } = calculateReservesForTwoSupplies(
      fullCurve,
      BigInt(0),
      higher
    )
    expect(lowerReserve).toBe(BigInt(0))
    expect(higherReserve).toBe(calculateReserveForSupply(fullCurve, higher))
  })
})

describe('findPositionForSupply', () => {
  const fullCurve = [DEFAULT_FLOOR_SEGMENT, ...DEFAULT_PREMIUM_SEGMENTS].map(decode)
  const floor = decode(DEFAULT_FLOOR_SEGMENT)

  it('locates supply 0 at the first segment, step 0', () => {
    const pos = findPositionForSupply(fullCurve, BigInt(0))
    expect(pos.segmentIndex).toBe(0)
    expect(pos.stepIndexWithinSegment).toBe(0)
    expect(pos.priceAtCurrentStep).toBe(fullCurve[0].initialPrice)
  })

  it('handles boundary at floor capacity (last step of floor)', () => {
    const pos = findPositionForSupply(fullCurve, floor.totalSupply)
    // Floor has 1 step → stepIndex 0, price = initialPrice.
    expect(pos.segmentIndex).toBe(0)
    expect(pos.stepIndexWithinSegment).toBe(0)
    expect(pos.priceAtCurrentStep).toBe(floor.initialPrice)
  })

  it('locates a supply mid-way through premium segment 1', () => {
    const seg1 = fullCurve[1]
    const intoSeg1 = seg1.supplyPerStep * BigInt(3) + seg1.supplyPerStep / BigInt(2) // ~3.5 steps in
    const pos = findPositionForSupply(fullCurve, floor.totalSupply + intoSeg1)
    expect(pos.segmentIndex).toBe(1)
    expect(pos.stepIndexWithinSegment).toBe(3)
    expect(pos.priceAtCurrentStep).toBe(seg1.initialPrice + BigInt(3) * seg1.priceIncreasePerStep)
  })

  it('throws SupplyExceedsCurveCapacity when target exceeds capacity', () => {
    const total = fullCurve.reduce(
      (acc, s) => acc + BigInt(s.numberOfSteps) * s.supplyPerStep,
      BigInt(0)
    )
    let thrown: CurveMathError | null = null
    try {
      findPositionForSupply(fullCurve, total + BigInt(1))
    } catch (e) {
      thrown = e as CurveMathError
    }
    expect(thrown?.name).toBe('DiscreteCurveMathLib__SupplyExceedsCurveCapacity')
  })
})

describe('calculatePurchaseReturn', () => {
  const floor = decode(DEFAULT_FLOOR_SEGMENT)
  const fullCurve = [DEFAULT_FLOOR_SEGMENT, ...DEFAULT_PREMIUM_SEGMENTS].map(decode)

  it('throws on zero collateral input', () => {
    let thrown: CurveMathError | null = null
    try {
      calculatePurchaseReturn([floor], BigInt(0), BigInt(0))
    } catch (e) {
      thrown = e as CurveMathError
    }
    expect(thrown?.name).toBe('DiscreteCurveMathLib__ZeroCollateralInput')
  })

  it('floor-only fresh curve: deposit = 100 → mints 100 at price 1e18', () => {
    // Floor price = 1e18; deposit X → tokensToMint = X (1:1 at unit price).
    const deposit = BigInt(100)
    const { tokensToMint, collateralSpent } = calculatePurchaseReturn([floor], deposit, BigInt(0))
    expect(tokensToMint).toBe(BigInt(100))
    expect(collateralSpent).toBe(BigInt(100))
  })

  it('exhausts the floor: cannot purchase past full capacity', () => {
    // Buy past floor capacity from supply 0.
    const result = calculatePurchaseReturn([floor], floor.totalSupply + BigInt(1_000), BigInt(0))
    // Limited to floor capacity, dust collateral remains.
    expect(result.tokensToMint).toBe(floor.totalSupply)
    expect(result.collateralSpent).toBe(floor.totalSupply)
    // The unspent 1_000 is implicit refund (collateralIn - collateralSpent).
  })

  it('returns (0, 0) when curve is fully exhausted at entry', () => {
    const totalCapacity = fullCurve.reduce(
      (acc, s) => acc + BigInt(s.numberOfSteps) * s.supplyPerStep,
      BigInt(0)
    )
    const result = calculatePurchaseReturn(fullCurve, BigInt(1_000), totalCapacity)
    expect(result.tokensToMint).toBe(BigInt(0))
    expect(result.collateralSpent).toBe(BigInt(0))
  })

  it('partial-step early return: tokensToMint = floor(budget * 1e18 / stepPrice)', () => {
    // Floor segment: stepPrice = 1e18. Buy with 7 collateral from supply 0 → 7 tokens, 7 spent.
    const result = calculatePurchaseReturn([floor], BigInt(7), BigInt(0))
    expect(result.tokensToMint).toBe(BigInt(7))
    expect(result.collateralSpent).toBe(BigInt(7))
  })

  it('refund property: collateralSpent <= collateralIn', () => {
    const deposits = [
      BigInt(1),
      BigInt(1_000),
      floor.totalSupply / BigInt(2),
      floor.totalSupply,
      floor.totalSupply * BigInt(2),
    ]
    for (const deposit of deposits) {
      const r = calculatePurchaseReturn([floor], deposit, BigInt(0))
      expect(r.collateralSpent <= deposit).toBe(true)
    }
  })

  it('multi-segment crossing: spends across floor + into premium segment 1', () => {
    // Buy with enough to consume floor + half of premium seg 1's first step.
    const seg1 = fullCurve[1]
    const fullFloorCost = floor.totalSupply // 400_000e18 at price 1e18
    const halfStepCost = mulDivUp(seg1.supplyPerStep / BigInt(2), seg1.initialPrice, ONE)
    const deposit = fullFloorCost + halfStepCost
    const r = calculatePurchaseReturn(fullCurve, deposit, BigInt(0))
    // Should mint at least the full floor supply.
    expect(r.tokensToMint > floor.totalSupply).toBe(true)
    // collateralSpent equals what we deposited (no refund — curve has plenty of capacity).
    expect(r.collateralSpent).toBe(deposit)
  })
})

describe('calculateSaleReturn', () => {
  const floor = decode(DEFAULT_FLOOR_SEGMENT)
  const fullCurve = [DEFAULT_FLOOR_SEGMENT, ...DEFAULT_PREMIUM_SEGMENTS].map(decode)

  it('throws on zero issuance input', () => {
    let thrown: CurveMathError | null = null
    try {
      calculateSaleReturn([floor], BigInt(0), floor.totalSupply)
    } catch (e) {
      thrown = e as CurveMathError
    }
    expect(thrown?.name).toBe('DiscreteCurveMathLib__ZeroIssuanceInput')
  })

  it('throws InsufficientIssuanceToSell when tokensToSell > supply', () => {
    let thrown: CurveMathError | null = null
    try {
      calculateSaleReturn([floor], floor.totalSupply + BigInt(1), floor.totalSupply)
    } catch (e) {
      thrown = e as CurveMathError
    }
    expect(thrown?.name).toBe('DiscreteCurveMathLib__InsufficientIssuanceToSell')
  })

  it('selling into the floor: collateral = tokens at price 1e18', () => {
    // Sell 100 tokens out of full floor supply → collateral = 100.
    const r = calculateSaleReturn([floor], BigInt(100), floor.totalSupply)
    expect(r.tokensBurned).toBe(BigInt(100))
    expect(r.collateralReturned).toBe(BigInt(100))
  })

  it('round-trip: buy(deposit) then sell(tokens) recovers ≤ deposit (rounding-asymmetric)', () => {
    // Buying rounds collateral up, selling rounds collateral up via reserve diff.
    // Net effect: round-trip can yield 0 to N wei *less* than deposit (never more).
    const deposit = BigInt(1_000)
    const buy = calculatePurchaseReturn(fullCurve, deposit, BigInt(0))
    const sell = calculateSaleReturn(fullCurve, buy.tokensToMint, buy.tokensToMint)
    expect(sell.collateralReturned <= deposit).toBe(true)
  })

  it('matches reserve diff: saleReturn(N) == reserve(supply) - reserve(supply - N)', () => {
    const supply = floor.totalSupply
    const sellAmount = floor.totalSupply / BigInt(10)
    const r = calculateSaleReturn([floor], sellAmount, supply)
    const expected =
      calculateReserveForSupply([floor], supply) -
      calculateReserveForSupply([floor], supply - sellAmount)
    expect(r.collateralReturned).toBe(expected)
  })
})
