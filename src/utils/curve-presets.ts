/**
 * Named bonding-curve presets. Each preset is a factory: it produces a
 * `{ floor, premium }` pair for given floor-price/supply/reserve inputs so the
 * shape stays meaningful across different reserve assets.
 *
 * Prices are emitted in 18-decimal WAD (matches `LaunchFormData`); call
 * {@link scaleSegmentPricesWadToReserve} via `transformLaunchFormDataToLaunchConfig`
 * at submit time.
 */
import { parseUnits } from 'viem'

import type { SegmentConfig } from '../schemas/launch.schema'
import {
  DEFAULT_PREMIUM_SEGMENTS,
  generateDefaultCurve,
  scaleCurveSupplyForReserveUsdPrice,
} from './segments'

const WAD = BigInt(10) ** BigInt(18)

export interface BuildPresetOptions {
  /** Floor price in 18-decimal WAD (reserve-per-issuance-token). */
  floorPriceWad: bigint
  /** Floor token supply, in issuance token native decimals. */
  floorSupply: bigint
  /** USD per 1 whole reserve token, 18-decimal WAD. Optional: omit for a $1 reserve. */
  reserveUsdPriceWad?: bigint
  /** Issuance token decimals — used by presets whose supply numbers are intrinsic (not USD-derived). */
  issuanceDecimals: number
}

export interface CurvePreset {
  /** Stable slug, safe for URLs / persistence. */
  id: string
  /** Display name shown in the UI. */
  name: string
  description: string
  /** Free-form labels for filtering / future grouping. */
  tags: readonly string[]
  build(opts: BuildPresetOptions): { floor: SegmentConfig; premium: SegmentConfig[] }
}

// =============================================================================
// Preset implementations
// =============================================================================

/**
 * Default S-curve — the existing protocol default. Slow growth → acceleration → deceleration.
 */
const defaultSCurve: CurvePreset = {
  id: 'default-s-curve',
  name: 'Default S-Curve',
  description:
    'Three-phase S-curve: gradual at the floor, accelerating mid-curve, then easing toward the cap. Range ~1.0× → ~7.0× floor.',
  tags: ['balanced', 'recommended'],
  build({ floorPriceWad, floorSupply, reserveUsdPriceWad }) {
    return generateDefaultCurve(floorPriceWad, floorSupply, { reserveUsdPriceWad })
  },
}

/**
 * Flat-floor only — single floor segment plus a minimal premium tier.
 * Useful as a starting skeleton when designing a custom curve.
 */
const flatFloor: CurvePreset = {
  id: 'flat-floor-only',
  name: 'Flat Floor + Single Tier',
  description:
    'Floor segment plus one shallow premium tier. A skeleton you can extend tier by tier.',
  tags: ['minimal', 'starter'],
  build({ floorPriceWad, floorSupply, reserveUsdPriceWad, issuanceDecimals }) {
    const floor: SegmentConfig = {
      initialPrice: floorPriceWad,
      priceIncrease: BigInt(0),
      supplyPerStep: floorSupply,
      numberOfSteps: 1,
    }
    const premium: SegmentConfig[] = [
      {
        initialPrice: floorPriceWad,
        priceIncrease: (floorPriceWad * BigInt(2)) / BigInt(1000), // +0.2% per step
        supplyPerStep: parseUnits('1000', issuanceDecimals),
        numberOfSteps: 100,
      },
    ]
    if (reserveUsdPriceWad !== undefined) {
      return scaleCurveSupplyForReserveUsdPrice(floor, premium, reserveUsdPriceWad)
    }
    return { floor, premium }
  },
}

/**
 * Aggressive early — front-loaded premium slope so early buyers see steeper
 * appreciation. Mirrors the default's segment count for chart parity.
 */
const aggressiveEarly: CurvePreset = {
  id: 'aggressive-early',
  name: 'Aggressive Early',
  description:
    'Front-loads the slope — early premium tiers climb fast, later tiers flatten. Range ~1.0× → ~9.0× floor.',
  tags: ['aggressive'],
  build({ floorPriceWad, floorSupply, reserveUsdPriceWad }) {
    const floor: SegmentConfig = {
      initialPrice: floorPriceWad,
      priceIncrease: BigInt(0),
      supplyPerStep: floorSupply,
      numberOfSteps: 1,
    }
    // Reuse the default S-curve's segment count + supplyPerStep so chart density is comparable,
    // but skew slope front-heavy so early premium tiers move fastest.
    const frontHeavySlopes = [0.014, 0.012, 0.01, 0.008, 0.006, 0.005, 0.004, 0.003, 0.002] as const

    let cursor = floorPriceWad
    const premium: SegmentConfig[] = DEFAULT_PREMIUM_SEGMENTS.map((seg, i) => {
      const slope = frontHeavySlopes[i] ?? 0.002
      const slopeWad = BigInt(Math.round(slope * 1e18))
      const next: SegmentConfig = {
        initialPrice: cursor,
        priceIncrease: slopeWad,
        supplyPerStep: seg.supplyPerStep,
        numberOfSteps: seg.numberOfSteps,
      }
      // End price = initial + slope * (steps - 1); next segment starts there.
      cursor = next.initialPrice + slopeWad * BigInt(seg.numberOfSteps - 1)
      return next
    })

    if (reserveUsdPriceWad !== undefined) {
      return scaleCurveSupplyForReserveUsdPrice(floor, premium, reserveUsdPriceWad)
    }
    return { floor, premium }
  },
}

/**
 * Gentle linear — single premium segment with a constant slope. Predictable
 * appreciation, flatter than the S-curve.
 */
const gentleLinear: CurvePreset = {
  id: 'gentle-linear',
  name: 'Gentle Linear',
  description:
    'Single linear premium segment — steady, predictable price growth. Range ~1.0× → ~3.0× floor.',
  tags: ['conservative', 'linear'],
  build({ floorPriceWad, floorSupply, reserveUsdPriceWad, issuanceDecimals }) {
    const floor: SegmentConfig = {
      initialPrice: floorPriceWad,
      priceIncrease: BigInt(0),
      supplyPerStep: floorSupply,
      numberOfSteps: 1,
    }
    // 2x range across 200 steps → priceIncrease ≈ floorPrice * 2 / 200 = 0.01 × floor per step.
    const slopeWad = (floorPriceWad * BigInt(2)) / BigInt(200)
    const premium: SegmentConfig[] = [
      {
        initialPrice: floorPriceWad,
        priceIncrease: slopeWad,
        supplyPerStep: parseUnits('1000', issuanceDecimals),
        numberOfSteps: 200,
      },
    ]
    if (reserveUsdPriceWad !== undefined) {
      return scaleCurveSupplyForReserveUsdPrice(floor, premium, reserveUsdPriceWad)
    }
    return { floor, premium }
  },
}

// =============================================================================
// Registry
// =============================================================================

export const CURVE_PRESETS: readonly CurvePreset[] = [
  defaultSCurve,
  flatFloor,
  aggressiveEarly,
  gentleLinear,
]

/**
 * Resolve a preset by id. Throws if unknown.
 */
export function getCurvePreset(id: string): CurvePreset {
  const found = CURVE_PRESETS.find((p) => p.id === id)
  if (!found) {
    throw new Error(`Unknown curve preset: ${id}`)
  }
  return found
}

/** Convenience: WAD price builder for callers that have a numeric USD floor price. */
export function floorPriceUsdToWad(floorPriceUsd: number): bigint {
  if (!Number.isFinite(floorPriceUsd) || floorPriceUsd <= 0) {
    throw new Error('floorPriceUsd must be a positive finite number')
  }
  return parseUnits(floorPriceUsd.toFixed(18), 18)
}

/** Re-export so external callers can build their own presets without a second import. */
export { WAD }
