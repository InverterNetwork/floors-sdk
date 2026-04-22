import { Schema } from 'effect'

import { AddressSchema } from './base.schema'

/**
 * ## Decimal conventions (on-chain `LaunchConfig` / `FloorConfig` / `PresaleConfig`)
 *
 * **Reserve (collateral) token — prices:** `initialPrice`, `priceIncrease`, and presale
 * `priceBreakpoints` MUST use the reserve token’s **native decimals** (e.g. USDC → 6, WETH → 18).
 * They are **not** 18-decimal WAD unless the reserve token itself has 18 decimals.
 *
 * **Presale `priceBreakpoints`:** flat `uint256[]` shared across all leverage levels
 * (non-decreasing per contract validation).
 *
 * **Issuance (sale) token — amounts:** `supplyPerStep`, `globalIssuanceCap`, `perAddressIssuanceCap`
 * MUST use the issuance token’s **native decimals** (not WAD).
 *
 * **`LaunchFormData`** segment prices and presale `priceBreakpoints` are **18-decimal WAD** (same as the
 * web form). **`transformLaunchFormDataToLaunchConfig`** always scales those to reserve native decimals via
 * `scaleSegmentPricesWadToReserve`. Issuance amounts may still be corrected from mistaken WAD-style values when
 * `issuanceTokenDecimals < 18` (see `normalizeIssuanceAmountFromWadOrNative`).
 *
 * For **`LaunchConfig`** built without the form transform, pass prices already in reserve native decimals.
 */

// =============================================================================
// Shared field schemas (single definition per validation rule)
// =============================================================================

const Bps0_10000 = Schema.Number.pipe(Schema.int(), Schema.between(0, 10_000))
const Bps1_10000 = Schema.Number.pipe(Schema.int(), Schema.between(1, 10_000))
const TokenDecimals0_255 = Schema.Number.pipe(Schema.int(), Schema.between(0, 255))
const MaxLeverage1_255 = Schema.Number.pipe(Schema.int(), Schema.between(1, 255))

/** Buy/sell fee fields shared by {@link FloorConfigSchema} and {@link LaunchFormSchema}. */
const FloorFeesSchema = Schema.Struct({
  buyFeeBps: Bps0_10000,
  sellFeeBps: Bps0_10000,
}).annotations({ title: 'FloorFees' })

/** `floorFeePercentage` shared by {@link TreasuryConfigSchema} and {@link LaunchFormSchema}. */
const FloorFeePercentageSchema = Schema.Struct({
  floorFeePercentage: Bps0_10000,
}).annotations({ title: 'FloorFeePercentage' })

/** Shared `shares` field for treasury recipients (form vs on-chain address typing). */
const TreasuryRecipientSharesSchema = Schema.Struct({
  shares: Schema.BigIntFromSelf,
}).annotations({ title: 'TreasuryRecipientShares' })

// =============================================================================
// Segment Configuration
// =============================================================================

/**
 * @description Segment configuration for bonding curve
 * Matches PackedSegmentLib._create() parameters from Solidity
 */
export const SegmentConfigSchema = Schema.Struct({
  /**
   * Starting price in **reserve token native decimals** (must match `reserveTokenAddress` on the Floor).
   * Example: `1_000_000n` = 1 USDC when the reserve is 6 decimals.
   */
  initialPrice: Schema.BigIntFromSelf,
  /**
   * Price increase per step in **reserve token native decimals** (0 for flat floor segment).
   */
  priceIncrease: Schema.BigIntFromSelf,
  /**
   * Token supply per step in **issuance token native decimals** (not 18-decimal WAD unless the
   * issuance token has 18 decimals).
   */
  supplyPerStep: Schema.BigIntFromSelf,
  /** Number of steps in this segment (must be >= 1) */
  numberOfSteps: Schema.Number.pipe(Schema.int(), Schema.greaterThan(0)),
}).annotations({
  title: 'SegmentConfig',
  description: 'Bonding curve segment configuration matching PackedSegmentLib',
})

export type SegmentConfig = typeof SegmentConfigSchema.Type

// =============================================================================
// Floor Configuration
// =============================================================================

const FloorTokensAndSegmentsSchema = Schema.Struct({
  /** Address of the issuance token (fToken) */
  issuanceTokenAddress: AddressSchema,
  /** Address of the reserve/collateral token */
  reserveTokenAddress: AddressSchema,
  /**
   * Bonding curve segments (at least 1 required). Segment prices use **reserve** token decimals;
   * `supplyPerStep` uses **issuance** token decimals (see module docstring above).
   */
  segments: Schema.Array(SegmentConfigSchema).pipe(Schema.minItems(1)),
}).annotations({ title: 'FloorTokensAndSegments' })

/**
 * @description Floor module configuration
 * Encoding order matches floorSetup.s.sol:
 * abi.encode(issuanceToken, collateralToken, segments, buyFeeBps, sellFeeBps)
 */
export const FloorConfigSchema = FloorTokensAndSegmentsSchema.pipe(
  Schema.extend(FloorFeesSchema)
).annotations({
  title: 'FloorConfig',
  description: 'Floor module configuration for bonding curve initialization',
})

export type FloorConfig = typeof FloorConfigSchema.Type

// =============================================================================
// Treasury Configuration
// =============================================================================

/**
 * @description Treasury recipient with share allocation
 */
export const TreasuryRecipientSchema = Schema.Struct({
  /** Recipient address */
  address: AddressSchema,
})
  .pipe(Schema.extend(TreasuryRecipientSharesSchema))
  .annotations({
    title: 'TreasuryRecipient',
    description: 'Treasury recipient with share allocation',
  })

export type TreasuryRecipient = typeof TreasuryRecipientSchema.Type

/**
 * @description Treasury module configuration
 * Encoding order matches splitterTreasurySetup.s.sol:
 * abi.encode(recipients[], shares[], floorFeePercentage, floorFeeTreasury)
 */
export const TreasuryConfigSchema = Schema.Struct({
  /** Array of recipients with their shares */
  recipients: Schema.Array(TreasuryRecipientSchema).pipe(Schema.minItems(1)),
})
  .pipe(Schema.extend(FloorFeePercentageSchema))
  .pipe(
    Schema.extend(
      Schema.Struct({
        /** Address receiving floor fees (typically the Floor contract itself) */
        floorFeeTreasury: AddressSchema,
      })
    )
  )
  .annotations({
    title: 'TreasuryConfig',
    description: 'Treasury module configuration for fee splitting',
  })

export type TreasuryConfig = typeof TreasuryConfigSchema.Type

// =============================================================================
// Credit Facility Configuration
// =============================================================================

const CreditFacilityParamsSchema = Schema.Struct({
  /** Loan-to-value ratio in basis points (e.g., 10000 = 100%) */
  loanToValueRatio: Bps1_10000,
  /** Maximum leverage multiplier (e.g., 25) */
  maxLeverage: MaxLeverage1_255,
  /** Borrowing fee rate in basis points (e.g., 600 = 6%) */
  borrowingFeeRate: Bps0_10000,
}).annotations({ title: 'CreditFacilityParams' })

/**
 * @description Credit facility module configuration
 * Encoding order matches creditFacilitySetup.s.sol:
 * abi.encode(loanToValueRatio, maxLeverage, borrowingFeeRate)
 */
export const CreditFacilityConfigSchema = CreditFacilityParamsSchema.annotations({
  title: 'CreditFacilityConfig',
  description: 'Credit facility module configuration for lending',
})

export type CreditFacilityConfig = typeof CreditFacilityConfigSchema.Type

// =============================================================================
// Presale Configuration
// =============================================================================

/** Fields shared by {@link PresaleConfigSchema} (on-chain) and {@link PresaleFormSchema} (form). */
const PresaleCurveParamsSchema = Schema.Struct({
  /** Commission schedule - array of fees per leverage level in basis points (index 0 = direct, 1+ = leverage) */
  baseCommissionBps: Schema.Array(Schema.BigIntFromSelf).pipe(Schema.minItems(1)),
  /** Presale end timestamp (unix seconds) */
  endTimestamp: Schema.BigIntFromSelf,
  /** Global issuance cap in **issuance token native decimals** (0 = unlimited) */
  globalIssuanceCap: Schema.BigIntFromSelf,
  /** Per-address issuance cap in **issuance token native decimals** (0 = unlimited) */
  perAddressIssuanceCap: Schema.BigIntFromSelf,
  /**
   * Tranche unlock prices: same scale as bonding-curve spot price — **reserve token native decimals**
   * (not WAD unless reserve is 18 decimals). Flat `uint256[]` shared across all leverage levels;
   * must be non-decreasing.
   */
  priceBreakpoints: Schema.Array(Schema.BigIntFromSelf),
  /** Initial fee multiplier in BPS (10000 = 1x, 20000 = 2x). Used with DecayingFeeMultiplier */
  initialMultiplier: Schema.BigIntFromSelf,
  /** Decay duration in seconds (0 = no decay). Multiplier decays from initial to 1x over this period */
  decayDuration: Schema.BigIntFromSelf,
}).annotations({ title: 'PresaleCurveParams' })

/**
 * @description Presale module configuration
 * Encoding order matches Presale_v1.sol init:
 * abi.encode(creditFacility, baseCommissionBps[], endTimestamp, globalIssuanceCap,
 *            perAddressIssuanceCap, priceBreakpoints[], initialMultiplier, decayDuration)
 */
export const PresaleConfigSchema = Schema.Struct({
  /** Credit facility address (or zero address if none) */
  creditFacilityAddress: Schema.optional(AddressSchema),
})
  .pipe(Schema.extend(PresaleCurveParamsSchema))
  .annotations({
    title: 'PresaleConfig',
    description: 'Presale module configuration for leveraged presales with decaying fee multiplier',
  })

export type PresaleConfig = typeof PresaleConfigSchema.Type

// =============================================================================
// Staking Configuration
// =============================================================================

/**
 * @description StakingManager module configuration
 * Encoding order matches stakingManagerSetup.s.sol:
 * abi.encode(performanceFeeBps)
 */
export const StakingConfigSchema = Schema.Struct({
  /** Performance fee on harvested yield in basis points (e.g., 1000 = 10%) */
  performanceFeeBps: Bps0_10000,
}).annotations({
  title: 'StakingConfig',
  description: 'StakingManager module configuration for yield staking',
})

export type StakingConfig = typeof StakingConfigSchema.Type

// =============================================================================
// Combined Launch Configuration
// =============================================================================

/**
 * @description Full market launch parameters
 */
export const LaunchConfigSchema = Schema.Struct({
  /** Floor module configuration */
  floor: FloorConfigSchema,
  /** Initial admin address for authorizer (typically the creator) */
  initialAdmin: AddressSchema,
  /** Treasury configuration */
  treasury: TreasuryConfigSchema,
  /** Credit facility configuration (optional) */
  creditFacility: Schema.optional(CreditFacilityConfigSchema),
  /** Presale configuration (optional) */
  presale: Schema.optional(PresaleConfigSchema),
  /** Staking configuration (optional) */
  staking: Schema.optional(StakingConfigSchema),
}).annotations({
  title: 'LaunchConfig',
  description: 'Complete market launch configuration',
})

export type LaunchConfig = typeof LaunchConfigSchema.Type

// =============================================================================
// Launch Result
// =============================================================================

/**
 * @description Market launch result
 */
export const LaunchResultSchema = Schema.Struct({
  /** Created Floor/Market address */
  floorAddress: AddressSchema,
  /** Market ID */
  marketId: Schema.BigIntFromSelf,
  /** Transaction hash */
  transactionHash: Schema.String,
}).annotations({
  title: 'LaunchResult',
  description: 'Result of a successful market launch',
})

export type LaunchResult = typeof LaunchResultSchema.Type

// =============================================================================
// Form / API input (pre-normalization) — inferred from schemas below
// =============================================================================

/** Nested new-token fields when `issuanceToken.mode === 'create'`. */
export const IssuanceTokenNewTokenFormSchema = Schema.Struct({
  name: Schema.String,
  symbol: Schema.String,
  decimals: TokenDecimals0_255,
  maxSupply: Schema.BigIntFromSelf,
}).annotations({ title: 'IssuanceTokenNewTokenForm' })

export const IssuanceTokenFormSchema = Schema.Struct({
  mode: Schema.Literal('existing', 'create'),
  existingAddress: Schema.String,
  newToken: IssuanceTokenNewTokenFormSchema,
}).annotations({ title: 'IssuanceTokenForm' })

export type IssuanceTokenFormData = typeof IssuanceTokenFormSchema.Type

/** Presale form block — extends {@link PresaleCurveParamsSchema} with UI-only fields. */
export const PresaleFormSchema = Schema.Struct({
  enabled: Schema.Boolean,
  creditFacilityAddress: Schema.String,
  maxLeverage: Schema.Number.pipe(Schema.int(), Schema.between(0, 255)),
})
  .pipe(Schema.extend(PresaleCurveParamsSchema))
  .annotations({ title: 'PresaleForm' })

export type PresaleFormData = typeof PresaleFormSchema.Type

/** Credit facility form — extends {@link CreditFacilityParamsSchema} with `enabled`. */
export const CreditFacilityFormSchema = Schema.Struct({
  enabled: Schema.Boolean,
})
  .pipe(Schema.extend(CreditFacilityParamsSchema))
  .annotations({ title: 'CreditFacilityForm' })

export type CreditFacilityFormData = typeof CreditFacilityFormSchema.Type

/** Staking form — extends {@link StakingConfigSchema} with `enabled`. */
export const StakingFormSchema = Schema.Struct({
  enabled: Schema.Boolean,
})
  .pipe(Schema.extend(StakingConfigSchema))
  .annotations({ title: 'StakingForm' })

export type StakingFormData = typeof StakingFormSchema.Type

export const ConfigurationFormSchema = Schema.Struct({
  grantMinterRole: Schema.Boolean,
  openBuy: Schema.Boolean,
  openSell: Schema.Boolean,
  openBorrow: Schema.optional(Schema.Boolean),
}).annotations({ title: 'ConfigurationForm' })

export type ConfigurationFormData = typeof ConfigurationFormSchema.Type

/** Treasury form row — same `shares` as {@link TreasuryRecipientSchema}, loose `address` string. */
export const TreasuryRecipientFormSchema = Schema.Struct({
  address: Schema.String,
})
  .pipe(Schema.extend(TreasuryRecipientSharesSchema))
  .annotations({ title: 'TreasuryRecipientForm' })

export type TreasuryRecipientFormData = typeof TreasuryRecipientFormSchema.Type

/**
 * Create-market form / API payload. Numeric fields may mix WAD-style values; use
 * {@link transformLaunchFormDataToLaunchConfig} in `utils/segments.ts` to produce canonical {@link LaunchConfig}.
 */
export const LaunchFormSchema = Schema.Struct({
  issuanceToken: IssuanceTokenFormSchema,
  reserveTokenAddress: Schema.String,
  reserveTokenDecimals: TokenDecimals0_255,
  issuanceTokenDecimals: Schema.optional(TokenDecimals0_255),
  floorSegment: SegmentConfigSchema,
  premiumSegments: Schema.Array(SegmentConfigSchema).pipe(Schema.minItems(1)),
  recipients: Schema.Array(TreasuryRecipientFormSchema).pipe(Schema.minItems(1)),
  creditFacility: CreditFacilityFormSchema,
  staking: StakingFormSchema,
  presale: PresaleFormSchema,
  configuration: ConfigurationFormSchema,
})
  .pipe(Schema.extend(FloorFeesSchema))
  .pipe(Schema.extend(FloorFeePercentageSchema))
  .annotations({
    title: 'LaunchForm',
    description: 'Create-market form payload before normalization to LaunchConfig',
  })

export type LaunchFormData = typeof LaunchFormSchema.Type

export const CreateMarketFromFormParamsSchema = Schema.Struct({
  formData: LaunchFormSchema,
  floorFactoryAddress: Schema.optional(AddressSchema),
  creatorAddress: Schema.optional(AddressSchema),
}).annotations({ title: 'CreateMarketFromFormParams' })

export type CreateMarketFromFormParams = typeof CreateMarketFromFormParamsSchema.Type

// =============================================================================
// Market creation (web + CLI) — extends launch form with reserve metadata & UI fields
// =============================================================================

/** New-token row with optional metadata (blob URL, description, socials). */
export const IssuanceTokenNewTokenExtendedSchema = IssuanceTokenNewTokenFormSchema.pipe(
  Schema.extend(
    Schema.Struct({
      imageUrl: Schema.optional(Schema.NullOr(Schema.String)),
      description: Schema.optional(Schema.String),
      socialMediaUrls: Schema.optional(
        Schema.Struct({
          x: Schema.optional(Schema.String),
          website: Schema.optional(Schema.String),
        })
      ),
    }).annotations({ title: 'IssuanceTokenNewTokenExtendedFields' })
  )
).annotations({ title: 'IssuanceTokenNewTokenExtended' })

export const IssuanceTokenExtendedFormSchema = Schema.Struct({
  mode: Schema.Literal('existing', 'create'),
  existingAddress: Schema.String,
  newToken: IssuanceTokenNewTokenExtendedSchema,
}).annotations({ title: 'IssuanceTokenExtendedForm' })

export type IssuanceTokenExtendedFormData = typeof IssuanceTokenExtendedFormSchema.Type

export const PresaleExtendedFormSchema = Schema.Struct({
  enabled: Schema.Boolean,
  creditFacilityAddress: Schema.String,
  maxLeverage: Schema.Number.pipe(Schema.int(), Schema.between(0, 255)),
  unlockMode: Schema.Literal('priceGrowth', 'atPresaleEnd'),
})
  .pipe(Schema.extend(PresaleCurveParamsSchema))
  .annotations({ title: 'PresaleExtendedForm' })

export type PresaleExtendedFormData = typeof PresaleExtendedFormSchema.Type

/**
 * Full market-creation payload (app, CLI, tests). Superset of {@link LaunchFormData}.
 * Segment prices use 18-decimal WAD in the form; {@link transformLaunchFormDataToLaunchConfig} normalizes.
 */
export const MarketCreationFormSchema = Schema.Struct({
  issuanceToken: IssuanceTokenExtendedFormSchema,
  reserveTokenAddress: Schema.String,
  reserveTokenSymbol: Schema.String,
  reserveTokenDecimals: TokenDecimals0_255,
  reserveTokenUsdPrice: Schema.Number,
  issuanceTokenDecimals: Schema.optional(TokenDecimals0_255),
  floorSegment: SegmentConfigSchema,
  premiumSegments: Schema.Array(SegmentConfigSchema).pipe(Schema.minItems(1)),
  recipients: Schema.Array(TreasuryRecipientFormSchema).pipe(Schema.minItems(1)),
  creditFacility: CreditFacilityFormSchema,
  staking: StakingFormSchema,
  presale: PresaleExtendedFormSchema,
  configuration: ConfigurationFormSchema,
})
  .pipe(Schema.extend(FloorFeesSchema))
  .pipe(Schema.extend(FloorFeePercentageSchema))
  .annotations({
    title: 'MarketCreationForm',
    description: 'Market creation payload (app + CLI) with reserve metadata and UI-only fields',
  })

export type MarketCreationFormData = typeof MarketCreationFormSchema.Type

export const MarketCreationParamsSchema = Schema.Struct({
  formData: MarketCreationFormSchema,
  floorFactoryAddress: Schema.optional(AddressSchema),
  creatorAddress: Schema.optional(AddressSchema),
}).annotations({ title: 'MarketCreationParams' })

export type MarketCreationParams = typeof MarketCreationParamsSchema.Type
