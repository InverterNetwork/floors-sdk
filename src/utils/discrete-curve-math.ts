/**
 * @description 1:1 TypeScript port of `DiscreteCurveMathLib_v1.sol`.
 *
 * Bit-exact parity with the on-chain library is required: every collateral
 * computation rounds up via `mulDivUp` (matches `FixedPointMathLib._mulDivUp`),
 * every issuance computation in a partial-step branch rounds down via floor
 * division (matches OZ `Math.mulDiv`). The mixed rounding in
 * {@link calculateSegmentReserve} (`Math.mulDiv` floor for the arithmetic-series
 * average, `mulDivUp` ceil for the supply multiplication) is preserved exactly.
 *
 * Unit contract: inputs are in **on-chain native** units. `initialPrice` and
 * `priceIncreasePerStep` are 1e18 reserve-scaled (the same shape the on-chain
 * library reads after `PackedSegmentLib._unpack`). Supply is in issuance-token
 * native units. No decimal normalisation is performed by this module.
 */
import type { DecodedSegment } from './segments'

/** 1e18 — matches `DiscreteCurveMathLib_v1.SCALING_FACTOR`. */
export const SCALING_FACTOR = BigInt(10) ** BigInt(18)

/** Maximum number of segments per curve — matches `DiscreteCurveMathLib_v1.MAX_SEGMENTS`. */
export const MAX_SEGMENTS = 10

/**
 * @description Solidity-error-named JS error. The `name` property mirrors the
 *              Solidity custom error name so callers (and the UX-error mapper)
 *              can branch on it identically to selector-hash matching.
 */
export class CurveMathError extends Error {
  /** Optional structured arguments mirroring the Solidity error's parameters. */
  public readonly args?: readonly bigint[]

  constructor(name: string, message: string, args?: readonly bigint[]) {
    super(message)
    this.name = name
    this.args = args
  }
}

const err = (name: string, message: string, args?: readonly bigint[]): never => {
  throw new CurveMathError(name, message, args)
}

/**
 * @description Bit-exact parity with `FixedPointMathLib._mulDivUp`:
 *              `Math.mulDiv(a, b, denom)` (floor) plus 1 if there is any remainder.
 *              For positive bigints, `(a * b + denom - 1) / denom` is equivalent.
 * @throws CurveMathError when denom is zero (Solidity reverts via require).
 */
export function mulDivUp(a: bigint, b: bigint, denom: bigint): bigint {
  if (denom === BigInt(0)) {
    err('DiscreteCurveMathLib__DivisionByZero', 'mulDivUp: denominator must be > 0')
  }
  const product = a * b
  if (product === BigInt(0)) return BigInt(0)
  return (product + denom - BigInt(1)) / denom
}

/**
 * @description Floor mulDiv — bit-exact parity with `Math.mulDiv` for positive bigints.
 *              Used for issuance-out in the partial-step branch and for the
 *              arithmetic-series average inside {@link calculateSegmentReserve}.
 */
export function mulDivFloor(a: bigint, b: bigint, denom: bigint): bigint {
  if (denom === BigInt(0)) {
    err('DiscreteCurveMathLib__DivisionByZero', 'mulDivFloor: denominator must be > 0')
  }
  return (a * b) / denom
}

/**
 * @description Validate the segment array — mirrors `_validateSegmentArray`.
 *              Checks: non-empty, ≤ MAX_SEGMENTS, single-step segments are flat,
 *              non-decreasing inter-segment price progression.
 * @throws CurveMathError with name matching the Solidity error.
 */
export function validateSegmentArray(segments: DecodedSegment[]): void {
  const n = segments.length
  if (n === 0) {
    err('DiscreteCurveMathLib__NoSegmentsConfigured', 'Curve has no segments configured')
  }
  if (n > MAX_SEGMENTS) {
    err('DiscreteCurveMathLib__TooManySegments', `Curve has ${n} segments; max is ${MAX_SEGMENTS}`)
  }

  for (let i = 0; i < n - 1; i++) {
    const cur = segments[i]
    const next = segments[i + 1]

    if (cur.numberOfSteps === 1 && cur.priceIncreasePerStep > BigInt(0)) {
      err(
        'DiscreteCurveMathLib__SingleStepMustBeFlat',
        `Segment ${i} has 1 step but priceIncrease > 0`,
        [BigInt(i)]
      )
    }

    let finalPriceCur = cur.initialPrice
    if (cur.numberOfSteps > 1) {
      finalPriceCur += BigInt(cur.numberOfSteps - 1) * cur.priceIncreasePerStep
    }

    if (next.initialPrice < finalPriceCur) {
      err(
        'DiscreteCurveMathLib__InvalidPriceProgression',
        `Segment ${i + 1} starts at ${next.initialPrice} but segment ${i} ends at ${finalPriceCur}`,
        [BigInt(i), finalPriceCur, next.initialPrice]
      )
    }
  }
}

/** Sum of segment capacities — `numberOfSteps * supplyPerStep`. */
function totalCurveCapacity(segments: DecodedSegment[]): bigint {
  let total = BigInt(0)
  for (const s of segments) {
    total += BigInt(s.numberOfSteps) * s.supplyPerStep
  }
  return total
}

/**
 * @description Validate `currentTotalIssuanceSupply` against the segment array.
 *              Mirrors `_validateSupplyAgainstSegments`: empty segments + supply > 0
 *              ⇒ `NoSegmentsConfigured`; supply > total capacity ⇒
 *              `SupplyExceedsCurveCapacity`. Returns the total curve capacity.
 */
export function validateSupplyAgainstSegments(
  segments: DecodedSegment[],
  currentTotalIssuanceSupply: bigint
): bigint {
  if (segments.length === 0) {
    if (currentTotalIssuanceSupply > BigInt(0)) {
      err(
        'DiscreteCurveMathLib__NoSegmentsConfigured',
        'Curve has no segments configured but supply > 0'
      )
    }
    return BigInt(0)
  }
  const capacity = totalCurveCapacity(segments)
  if (currentTotalIssuanceSupply > capacity) {
    err(
      'DiscreteCurveMathLib__SupplyExceedsCurveCapacity',
      `Supply ${currentTotalIssuanceSupply} exceeds curve capacity ${capacity}`,
      [currentTotalIssuanceSupply, capacity]
    )
  }
  return capacity
}

export interface PositionForSupply {
  /** Index of the segment containing `targetSupply`. */
  segmentIndex: number
  /** 0-based step index within that segment. */
  stepIndexWithinSegment: number
  /** Step price = `initialPrice + stepIndex * priceIncreasePerStep`. */
  priceAtCurrentStep: bigint
}

/**
 * @description Mirrors `_findPositionForSupply` (`:98-155`).
 *              Reverts `SupplyExceedsCurveCapacity` if `targetSupply` exceeds
 *              the cumulative capacity of all segments.
 */
export function findPositionForSupply(
  segments: DecodedSegment[],
  targetSupply: bigint
): PositionForSupply {
  const n = segments.length
  let cumulativeSupply = BigInt(0)

  for (let i = 0; i < n; i++) {
    const seg = segments[i]
    const segmentCapacity = BigInt(seg.numberOfSteps) * seg.supplyPerStep
    const segmentEndSupply = cumulativeSupply + segmentCapacity

    if (targetSupply <= segmentEndSupply) {
      const supplyIntoSegment = targetSupply - cumulativeSupply
      const stepIndexWithinSegment =
        supplyIntoSegment === BigInt(0)
          ? 0
          : Number((supplyIntoSegment - BigInt(1)) / seg.supplyPerStep)
      const priceAtCurrentStep =
        seg.initialPrice + BigInt(stepIndexWithinSegment) * seg.priceIncreasePerStep
      return {
        segmentIndex: i,
        stepIndexWithinSegment,
        priceAtCurrentStep,
      }
    }
    cumulativeSupply = segmentEndSupply
  }

  err(
    'DiscreteCurveMathLib__SupplyExceedsCurveCapacity',
    `Supply ${targetSupply} exceeds curve capacity ${cumulativeSupply}`,
    [targetSupply, cumulativeSupply]
  )
  // unreachable
  return { segmentIndex: 0, stepIndexWithinSegment: 0, priceAtCurrentStep: BigInt(0) }
}

/**
 * @description Mirrors `_calculateSegmentReserve` (`:607-653`).
 *
 * Rounding ladder (preserved bit-exact):
 *  - Flat segment, full steps: `mulDivUp(fullSteps * supplyPerStep, initialPrice, 1e18)`.
 *  - Sloped segment, full steps: `mulDivFloor(fullSteps, firstStepPrice + lastStepPrice, 2)`
 *    then `mulDivUp(supplyPerStep, totalPrice, 1e18)`.
 *  - Partial step (any segment): `mulDivUp(partialSupply, partialStepPrice, 1e18)`.
 */
export function calculateSegmentReserve(
  initialPrice: bigint,
  priceIncreasePerStep: bigint,
  supplyPerStep: bigint,
  supplyToProcess: bigint
): bigint {
  let collateral = BigInt(0)
  const fullSteps = supplyToProcess / supplyPerStep
  const partialStepSupply = supplyToProcess % supplyPerStep

  if (fullSteps > BigInt(0)) {
    if (priceIncreasePerStep === BigInt(0)) {
      // Flat segment.
      if (initialPrice > BigInt(0)) {
        collateral += mulDivUp(fullSteps * supplyPerStep, initialPrice, SCALING_FACTOR)
      }
    } else {
      // Sloped segment: arithmetic series (firstPrice + lastPrice) * n / 2.
      const firstStepPrice = initialPrice
      const lastStepPrice = initialPrice + (fullSteps - BigInt(1)) * priceIncreasePerStep
      const sumOfPrices = firstStepPrice + lastStepPrice
      const totalPriceForAllSteps = mulDivFloor(fullSteps, sumOfPrices, BigInt(2))
      collateral += mulDivUp(supplyPerStep, totalPriceForAllSteps, SCALING_FACTOR)
    }
  }

  if (partialStepSupply > BigInt(0)) {
    const partialStepPrice = initialPrice + fullSteps * priceIncreasePerStep
    if (partialStepPrice > BigInt(0)) {
      collateral += mulDivUp(partialStepSupply, partialStepPrice, SCALING_FACTOR)
    }
  }

  return collateral
}

/**
 * @description Mirrors `_calculateReserveForSupply` (`:177-232`). Total
 *              collateral required to back `targetSupply` issuance tokens.
 */
export function calculateReserveForSupply(
  segments: DecodedSegment[],
  targetSupply: bigint
): bigint {
  if (targetSupply === BigInt(0)) return BigInt(0)
  const n = segments.length
  if (n === 0) {
    err('DiscreteCurveMathLib__NoSegmentsConfigured', 'Curve has no segments configured')
  }
  if (n > MAX_SEGMENTS) {
    err('DiscreteCurveMathLib__TooManySegments', `Too many segments: ${n}`)
  }
  validateSupplyAgainstSegments(segments, targetSupply)

  let totalReserve = BigInt(0)
  let cumulativeProcessed = BigInt(0)

  for (let i = 0; i < n; i++) {
    if (cumulativeProcessed >= targetSupply) break

    const seg = segments[i]
    const segmentCapacity = BigInt(seg.numberOfSteps) * seg.supplyPerStep
    const supplyRemaining = targetSupply - cumulativeProcessed
    const supplyToProcess = supplyRemaining > segmentCapacity ? segmentCapacity : supplyRemaining

    totalReserve += calculateSegmentReserve(
      seg.initialPrice,
      seg.priceIncreasePerStep,
      seg.supplyPerStep,
      supplyToProcess
    )
    cumulativeProcessed += supplyToProcess
  }

  return totalReserve
}

/**
 * @description Mirrors `_calculateReservesForTwoSupplies` (`:484-592`).
 *              Single-pass version of two `calculateReserveForSupply` calls.
 *              Caller is responsible for pre-validating segments (the on-chain
 *              version skips structural checks here).
 */
export function calculateReservesForTwoSupplies(
  segments: DecodedSegment[],
  lowerSupply: bigint,
  higherSupply: bigint
): { lowerReserve: bigint; higherReserve: bigint } {
  if (lowerSupply === higherSupply) {
    const reserve = calculateReserveForSupply(segments, lowerSupply)
    return { lowerReserve: reserve, higherReserve: reserve }
  }

  let cumulativeProcessed = BigInt(0)
  let lowerSupplyReached = false
  let lowerReserve = BigInt(0)
  let higherReserve = BigInt(0)

  for (let i = 0; i < segments.length; i++) {
    if (cumulativeProcessed >= higherSupply) break

    const seg = segments[i]
    const segmentCapacity = BigInt(seg.numberOfSteps) * seg.supplyPerStep
    const segmentEndSupply = cumulativeProcessed + segmentCapacity

    // Lower-supply contribution.
    if (!lowerSupplyReached && lowerSupply > BigInt(0) && segmentEndSupply > BigInt(0)) {
      const supplyToProcessForLower =
        lowerSupply > cumulativeProcessed ? lowerSupply - cumulativeProcessed : BigInt(0)
      if (supplyToProcessForLower > BigInt(0) && cumulativeProcessed < lowerSupply) {
        const effective =
          supplyToProcessForLower > segmentCapacity ? segmentCapacity : supplyToProcessForLower
        lowerReserve += calculateSegmentReserve(
          seg.initialPrice,
          seg.priceIncreasePerStep,
          seg.supplyPerStep,
          effective
        )
        if (cumulativeProcessed + effective >= lowerSupply) {
          lowerSupplyReached = true
        }
      }
    }

    // Higher-supply contribution.
    const supplyToProcessForHigher =
      higherSupply > cumulativeProcessed ? higherSupply - cumulativeProcessed : BigInt(0)
    if (supplyToProcessForHigher > BigInt(0)) {
      const effective =
        supplyToProcessForHigher > segmentCapacity ? segmentCapacity : supplyToProcessForHigher
      higherReserve += calculateSegmentReserve(
        seg.initialPrice,
        seg.priceIncreasePerStep,
        seg.supplyPerStep,
        effective
      )
    }

    cumulativeProcessed = segmentEndSupply
  }

  return { lowerReserve, higherReserve }
}

export interface PurchaseReturn {
  /** Total issuance tokens minted for the spent collateral. */
  tokensToMint: bigint
  /**
   * @description Actual collateral consumed from `collateralToSpend`. Equal to
   *              `collateralToSpend` for non-truncated buys; less when the
   *              curve runs out of capacity or the partial-step round-down
   *              leaves dust. The on-chain wrapper truncates this — surfacing
   *              it is the entire point of the SDK port.
   */
  collateralSpent: bigint
}

/**
 * @description Mirrors `_calculatePurchaseReturn` (`:266-423`). Returns
 *              `(tokensToMint, collateralSpent)`. When `currentTotalIssuanceSupply`
 *              is at or beyond the total capacity, returns `(0n, 0n)`.
 *
 * @throws `DiscreteCurveMathLib__ZeroCollateralInput` when `collateralToSpend === 0n`.
 */
export function calculatePurchaseReturn(
  segments: DecodedSegment[],
  collateralToSpend: bigint,
  currentTotalIssuanceSupply: bigint
): PurchaseReturn {
  if (collateralToSpend === BigInt(0)) {
    err('DiscreteCurveMathLib__ZeroCollateralInput', 'Cannot purchase with zero collateral')
  }

  const numSegments = segments.length

  // Phase 1: locate the (segmentIndex, supplyCoveredByPreviousSegments) pair.
  let segmentIndex = 0
  let supplyCoveredByPreviousSegments = BigInt(0)

  if (currentTotalIssuanceSupply > BigInt(0)) {
    let cumulativeProcessed = BigInt(0)
    for (let i = 0; i < numSegments; i++) {
      const seg = segments[i]
      const segmentCapacity = BigInt(seg.numberOfSteps) * seg.supplyPerStep
      const endOfCurrentSegmentSupply = cumulativeProcessed + segmentCapacity

      if (currentTotalIssuanceSupply < endOfCurrentSegmentSupply) {
        segmentIndex = i
        supplyCoveredByPreviousSegments = cumulativeProcessed
        break
      } else if (currentTotalIssuanceSupply === endOfCurrentSegmentSupply) {
        if (i + 1 < numSegments) {
          segmentIndex = i + 1
          supplyCoveredByPreviousSegments = endOfCurrentSegmentSupply
        } else {
          // At the very end of the last segment: signal Phase-3 skip.
          segmentIndex = numSegments
          supplyCoveredByPreviousSegments = endOfCurrentSegmentSupply
        }
        break
      }
      cumulativeProcessed = endOfCurrentSegmentSupply
    }
  }

  // Phase 2: handle partial start step.
  let tokensToMint = BigInt(0)
  let remainingBudget = collateralToSpend
  let stepIndex = 0

  if (segmentIndex >= numSegments) {
    // Curve exhausted at entry — nothing to purchase.
    return { tokensToMint: BigInt(0), collateralSpent: BigInt(0) }
  }

  {
    const segmentIssuanceSupply = currentTotalIssuanceSupply - supplyCoveredByPreviousSegments
    const seg = segments[segmentIndex]
    const supplyPerStep = seg.supplyPerStep
    stepIndex = Number(segmentIssuanceSupply / supplyPerStep)
    const currentStepIssuanceSupply = segmentIssuanceSupply % supplyPerStep
    const stepPrice = seg.initialPrice + seg.priceIncreasePerStep * BigInt(stepIndex)
    const remainingStepIssuanceSupply = supplyPerStep - currentStepIssuanceSupply

    if (remainingStepIssuanceSupply > BigInt(0)) {
      const remainingStepCollateralCapacity = mulDivUp(
        remainingStepIssuanceSupply,
        stepPrice,
        SCALING_FACTOR
      )

      if (remainingBudget >= remainingStepCollateralCapacity) {
        remainingBudget -= remainingStepCollateralCapacity
        tokensToMint += remainingStepIssuanceSupply
        stepIndex++
      } else {
        // Partial fill of the start step — early return path.
        const additionalIssuanceAmount = mulDivFloor(remainingBudget, SCALING_FACTOR, stepPrice)
        tokensToMint += additionalIssuanceAmount
        const collateralSpent = mulDivUp(additionalIssuanceAmount, stepPrice, SCALING_FACTOR)
        return { tokensToMint, collateralSpent }
      }
    }
  }

  // Phase 3: walk full and partial steps until budget runs out or curve ends.
  while (remainingBudget > BigInt(0) && segmentIndex < numSegments) {
    const seg = segments[segmentIndex]
    const numberOfSteps = seg.numberOfSteps

    if (stepIndex >= numberOfSteps) {
      segmentIndex++
      stepIndex = 0
      continue
    }

    const initialPrice = seg.initialPrice
    const priceIncrease = seg.priceIncreasePerStep
    const supplyPerStep = seg.supplyPerStep

    const stepPrice = initialPrice + priceIncrease * BigInt(stepIndex)
    const stepCollateralCapacity = mulDivUp(supplyPerStep, stepPrice, SCALING_FACTOR)

    if (remainingBudget >= stepCollateralCapacity) {
      remainingBudget -= stepCollateralCapacity
      tokensToMint += supplyPerStep
      stepIndex++
    } else {
      const partialIssuance = mulDivFloor(remainingBudget, SCALING_FACTOR, stepPrice)
      tokensToMint += partialIssuance
      remainingBudget = BigInt(0)
      break
    }
  }

  const collateralSpent = collateralToSpend - remainingBudget
  return { tokensToMint, collateralSpent }
}

export interface SaleReturn {
  /** Collateral returned to the seller. */
  collateralReturned: bigint
  /**
   * @description Issuance tokens actually burned. Always equals the requested
   *              `tokensToSell` in the on-chain library (it reverts if the
   *              request exceeds supply); surfaced here to mirror the lib's
   *              tuple shape that the on-chain wrapper truncates.
   */
  tokensBurned: bigint
}

/**
 * @description Mirrors `_calculateSaleReturn` (`:440-467`).
 * @throws `DiscreteCurveMathLib__ZeroIssuanceInput` when `tokensToSell === 0n`.
 * @throws `DiscreteCurveMathLib__InsufficientIssuanceToSell` when
 *         `tokensToSell > currentTotalIssuanceSupply`.
 */
export function calculateSaleReturn(
  segments: DecodedSegment[],
  tokensToSell: bigint,
  currentTotalIssuanceSupply: bigint
): SaleReturn {
  if (tokensToSell === BigInt(0)) {
    err('DiscreteCurveMathLib__ZeroIssuanceInput', 'Cannot sell zero issuance tokens')
  }
  if (tokensToSell > currentTotalIssuanceSupply) {
    err(
      'DiscreteCurveMathLib__InsufficientIssuanceToSell',
      `Cannot sell ${tokensToSell}: only ${currentTotalIssuanceSupply} supply exists`,
      [tokensToSell, currentTotalIssuanceSupply]
    )
  }

  const tokensBurned = tokensToSell
  const finalSupplyAfterSale = currentTotalIssuanceSupply - tokensBurned
  const { lowerReserve, higherReserve } = calculateReservesForTwoSupplies(
    segments,
    finalSupplyAfterSale,
    currentTotalIssuanceSupply
  )
  const collateralReturned = higherReserve - lowerReserve
  return { collateralReturned, tokensBurned }
}
