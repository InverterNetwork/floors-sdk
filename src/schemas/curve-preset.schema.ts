/**
 * JSON-serialisable bonding-curve preset schema.
 *
 * Distinct from {@link ./launch.schema.SegmentConfigSchema}, which uses
 * `Schema.BigIntFromSelf` (runtime-only). This schema encodes/decodes bigints
 * as strings so the curve survives `JSON.stringify` / `JSON.parse`.
 *
 * The `priceDecimals` / `supplyDecimals` fields record what scale the bigints
 * were exported against. Importers compare against their expected scales to
 * refuse silent rescaling between contexts (e.g. WAD form ↔ reserve-native admin).
 */
import { Schema } from 'effect'

/** Decoded: bigint. Encoded: numeric string. */
const BigIntFromString = Schema.BigInt

const SegmentJsonSchema = Schema.Struct({
  initialPrice: BigIntFromString,
  priceIncrease: BigIntFromString,
  supplyPerStep: BigIntFromString,
  numberOfSteps: Schema.Number.pipe(Schema.int(), Schema.greaterThan(0)),
}).annotations({ title: 'SegmentJson' })

export type SegmentJson = typeof SegmentJsonSchema.Type
export type SegmentJsonEncoded = typeof SegmentJsonSchema.Encoded

export const CURVE_PRESET_JSON_VERSION = 1 as const

const Decimals = Schema.Number.pipe(Schema.int(), Schema.between(0, 36))

export const CurvePresetJsonSchema = Schema.Struct({
  /** Forward-compat sentinel — bumped if the on-disk shape changes. */
  version: Schema.Literal(CURVE_PRESET_JSON_VERSION),
  name: Schema.String.pipe(Schema.minLength(1), Schema.maxLength(64)),
  description: Schema.optional(Schema.String.pipe(Schema.maxLength(280))),
  /** Decimals the price bigints were encoded against (18 = WAD form). */
  priceDecimals: Decimals,
  /** Decimals the `supplyPerStep` bigints were encoded against (issuance token decimals). */
  supplyDecimals: Decimals,
  floorSegment: SegmentJsonSchema,
  premiumSegments: Schema.Array(SegmentJsonSchema).pipe(Schema.minItems(1)),
}).annotations({
  title: 'CurvePresetJson',
  description: 'JSON-serialisable bonding-curve preset (export/import payload)',
})

export type CurvePresetJson = typeof CurvePresetJsonSchema.Type
export type CurvePresetJsonEncoded = typeof CurvePresetJsonSchema.Encoded
