/**
 * Strict export / import helpers for bonding-curve presets.
 *
 * Round-trip contract: `importCurveFromJson(exportCurveToJson(x), expected) ≈ x`
 * (segments equal field-for-field; metadata preserved on the JSON envelope).
 *
 * Validation layers — each throws {@link CurveImportError} with a distinct code:
 *  1. JSON.parse                → INVALID_JSON
 *  2. Schema decode             → SCHEMA              (Effect field-level errors)
 *  3. Decimals comparison       → DECIMALS_MISMATCH   (unless rescale-supply opt-in)
 *  4. Floor segment shape       → FLOOR_INVALID
 *  5. Segment connection check  → CONNECTION_BROKEN
 *  6. Packed-bitfield bounds    → PROTOCOL_LIMIT
 */
import { Schema } from 'effect'

import {
  CURVE_PRESET_JSON_VERSION,
  type CurvePresetJson,
  CurvePresetJsonSchema,
  type SegmentJson,
} from '../schemas/curve-preset.schema'
import type { SegmentConfig } from '../schemas/launch.schema'
import {
  scaleSegmentSupplyForReserveUsdTransition,
  validateFloorSegment,
  validateSegments,
} from './segments'

export type CurveImportErrorCode =
  | 'INVALID_JSON'
  | 'SCHEMA'
  | 'DECIMALS_MISMATCH'
  | 'FLOOR_INVALID'
  | 'CONNECTION_BROKEN'
  | 'PROTOCOL_LIMIT'

export class CurveImportError extends Error {
  public readonly code: CurveImportErrorCode
  public readonly details?: unknown

  constructor(code: CurveImportErrorCode, message: string, details?: unknown) {
    super(message)
    this.name = 'CurveImportError'
    this.code = code
    this.details = details
  }
}

// =============================================================================
// Packed-segment bitfield limits (mirror PackedSegmentLib bit layout)
// =============================================================================

const MAX_72_BIT = (BigInt(1) << BigInt(72)) - BigInt(1)
const MAX_96_BIT = (BigInt(1) << BigInt(96)) - BigInt(1)
const MAX_16_BIT = 0xffff

function checkProtocolLimits(segment: SegmentConfig, label: string): void {
  if (segment.initialPrice < BigInt(0) || segment.initialPrice > MAX_72_BIT) {
    throw new CurveImportError(
      'PROTOCOL_LIMIT',
      `${label}: initialPrice must fit in 72 bits (got ${segment.initialPrice.toString()})`
    )
  }
  if (segment.priceIncrease < BigInt(0) || segment.priceIncrease > MAX_72_BIT) {
    throw new CurveImportError(
      'PROTOCOL_LIMIT',
      `${label}: priceIncrease must fit in 72 bits (got ${segment.priceIncrease.toString()})`
    )
  }
  if (segment.supplyPerStep <= BigInt(0) || segment.supplyPerStep > MAX_96_BIT) {
    throw new CurveImportError(
      'PROTOCOL_LIMIT',
      `${label}: supplyPerStep must be positive and fit in 96 bits (got ${segment.supplyPerStep.toString()})`
    )
  }
  if (
    !Number.isInteger(segment.numberOfSteps) ||
    segment.numberOfSteps < 1 ||
    segment.numberOfSteps > MAX_16_BIT
  ) {
    throw new CurveImportError(
      'PROTOCOL_LIMIT',
      `${label}: numberOfSteps must be 1..${MAX_16_BIT} (got ${segment.numberOfSteps})`
    )
  }
}

// =============================================================================
// JSON ↔ runtime conversion
// =============================================================================

function segmentJsonToConfig(seg: SegmentJson): SegmentConfig {
  return {
    initialPrice: seg.initialPrice,
    priceIncrease: seg.priceIncrease,
    supplyPerStep: seg.supplyPerStep,
    numberOfSteps: seg.numberOfSteps,
  }
}

function segmentConfigToJson(seg: SegmentConfig): SegmentJson {
  return {
    initialPrice: seg.initialPrice,
    priceIncrease: seg.priceIncrease,
    supplyPerStep: seg.supplyPerStep,
    numberOfSteps: seg.numberOfSteps,
  }
}

// =============================================================================
// Export
// =============================================================================

export interface ExportCurveOptions {
  name: string
  description?: string
  /** Decimals the price bigints are denominated in (18 for WAD form). */
  priceDecimals: number
  /** Decimals the `supplyPerStep` bigints are denominated in (issuance token decimals). */
  supplyDecimals: number
  floorSegment: SegmentConfig
  premiumSegments: readonly SegmentConfig[]
}

/**
 * Serialise a curve to a deterministic, pretty-printed JSON string.
 * Throws {@link CurveImportError} with code `SCHEMA` if the input segments
 * cannot be encoded (defensive — Schema only rejects malformed bigints here).
 */
export function exportCurveToJson(opts: ExportCurveOptions): string {
  const payload: CurvePresetJson = {
    version: CURVE_PRESET_JSON_VERSION,
    name: opts.name,
    description: opts.description,
    priceDecimals: opts.priceDecimals,
    supplyDecimals: opts.supplyDecimals,
    floorSegment: segmentConfigToJson(opts.floorSegment),
    premiumSegments: opts.premiumSegments.map(segmentConfigToJson),
  }

  try {
    const encoded = Schema.encodeUnknownSync(CurvePresetJsonSchema)(payload)
    return JSON.stringify(encoded, null, 2)
  } catch (err) {
    throw new CurveImportError('SCHEMA', 'Failed to encode curve to JSON', err)
  }
}

// =============================================================================
// Import
// =============================================================================

export interface ImportCurveOptions {
  /** Decimals the importing context expects price fields in (18 for WAD form). */
  expectedPriceDecimals: number
  /** Decimals the importing context expects `supplyPerStep` in (issuance token decimals). */
  expectedSupplyDecimals: number
  /**
   * What to do when the import's `priceDecimals` / `supplyDecimals` don't match
   * `expected*Decimals`:
   *  - `'reject'` (default) — throw `DECIMALS_MISMATCH`. Safest.
   *  - `'rescale-supply'` — accept iff price decimals match; rescale supply
   *    field by the decimals delta. Price rescaling is intentionally not offered
   *    because precision can be lost when shrinking decimals.
   */
  decimalsMismatch?: 'reject' | 'rescale-supply'
}

export interface ImportCurveResult {
  floorSegment: SegmentConfig
  premiumSegments: SegmentConfig[]
  /** Preserved metadata from the JSON envelope. */
  meta: {
    name: string
    description?: string
    priceDecimals: number
    supplyDecimals: number
  }
  /** Soft warnings — not import-blocking. */
  warnings: string[]
}

/**
 * Parse and strictly validate a curve preset JSON string.
 * Throws {@link CurveImportError} on hard failure.
 */
export function importCurveFromJson(json: string, opts: ImportCurveOptions): ImportCurveResult {
  // 1. JSON.parse
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch (err) {
    throw new CurveImportError('INVALID_JSON', 'Input is not valid JSON', err)
  }

  // 2. Schema decode — Effect produces a structured error with field paths
  let decoded: CurvePresetJson
  try {
    decoded = Schema.decodeUnknownSync(CurvePresetJsonSchema)(parsed)
  } catch (err) {
    throw new CurveImportError(
      'SCHEMA',
      err instanceof Error ? err.message : 'Curve JSON failed schema validation',
      err
    )
  }

  // 3. Decimals comparison
  const warnings: string[] = []
  let supplyRescaleDelta = 0 // exported - expected
  if (decoded.priceDecimals !== opts.expectedPriceDecimals) {
    throw new CurveImportError(
      'DECIMALS_MISMATCH',
      `Price decimals mismatch: import is ${decoded.priceDecimals}-decimal, current context expects ${opts.expectedPriceDecimals}. ` +
        `Refusing to silently rescale price fields.`
    )
  }
  if (decoded.supplyDecimals !== opts.expectedSupplyDecimals) {
    if (opts.decimalsMismatch !== 'rescale-supply') {
      throw new CurveImportError(
        'DECIMALS_MISMATCH',
        `Supply decimals mismatch: import is ${decoded.supplyDecimals}-decimal, current context expects ${opts.expectedSupplyDecimals}. ` +
          `Pass { decimalsMismatch: 'rescale-supply' } to opt in.`
      )
    }
    supplyRescaleDelta = decoded.supplyDecimals - opts.expectedSupplyDecimals
    warnings.push(
      `Rescaled supplyPerStep from ${decoded.supplyDecimals} to ${opts.expectedSupplyDecimals} decimals.`
    )
  }

  // Apply supply rescale (if any) before downstream validation runs against the
  // segments in the importing context's units.
  const rescaleSupply = (s: SegmentConfig): SegmentConfig => {
    if (supplyRescaleDelta === 0) return s
    if (supplyRescaleDelta > 0) {
      const factor = BigInt(10) ** BigInt(supplyRescaleDelta)
      return { ...s, supplyPerStep: s.supplyPerStep / factor }
    }
    const factor = BigInt(10) ** BigInt(-supplyRescaleDelta)
    return { ...s, supplyPerStep: s.supplyPerStep * factor }
  }

  const floorSegment: SegmentConfig = rescaleSupply(segmentJsonToConfig(decoded.floorSegment))
  const premiumSegments: SegmentConfig[] = decoded.premiumSegments.map((s) =>
    rescaleSupply(segmentJsonToConfig(s))
  )

  // 4. Floor shape
  const floorCheck = validateFloorSegment(floorSegment)
  if (!floorCheck.valid) {
    throw new CurveImportError('FLOOR_INVALID', floorCheck.error ?? 'Floor segment is invalid')
  }

  // 5. Segment connections + per-segment basics
  const connectionCheck = validateSegments(floorSegment, premiumSegments)
  if (!connectionCheck.valid) {
    throw new CurveImportError(
      'CONNECTION_BROKEN',
      connectionCheck.errors.join('; '),
      connectionCheck.errors
    )
  }

  // 6. Packed-bitfield bounds
  checkProtocolLimits(floorSegment, 'floorSegment')
  premiumSegments.forEach((s, i) => checkProtocolLimits(s, `premiumSegments[${i}]`))

  return {
    floorSegment,
    premiumSegments,
    meta: {
      name: decoded.name,
      description: decoded.description,
      priceDecimals: decoded.priceDecimals,
      supplyDecimals: decoded.supplyDecimals,
    },
    warnings,
  }
}

// Defensive re-export so callers don't need a second import for the rescale helper
// when building manual cross-reserve transitions.
export { scaleSegmentSupplyForReserveUsdTransition }
