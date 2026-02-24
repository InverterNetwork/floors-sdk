import { Schema } from 'effect'

import { AddressSchema } from './base.schema'

// =============================================================================
// Segment Configuration
// =============================================================================

/**
 * @description Segment configuration for bonding curve
 * Matches PackedSegmentLib._create() parameters from Solidity
 */
export const SegmentConfigSchema = Schema.Struct({
  /** Starting price in 18 decimal format (e.g., 1e18 = 1 token) */
  initialPrice: Schema.BigIntFromSelf,
  /** Price increase per step in 18 decimal format (0 for flat floor segment) */
  priceIncrease: Schema.BigIntFromSelf,
  /** Token supply per step in 18 decimal format */
  supplyPerStep: Schema.BigIntFromSelf,
  /** Number of steps in this segment (must be >= 1) */
  numberOfSteps: Schema.Number.pipe(Schema.int(), Schema.greaterThan(0)),
}).annotations({
  title: 'SegmentConfig',
  description: 'Bonding curve segment configuration matching PackedSegmentLib',
})

// Note: SegmentConfig type is exported from utils/segments.ts to avoid duplicate exports

// =============================================================================
// Floor Configuration
// =============================================================================

/**
 * @description Floor module configuration
 * Encoding order matches floorSetup.s.sol:
 * abi.encode(issuanceToken, collateralToken, segments, buyFeeBps, sellFeeBps)
 */
export const FloorConfigSchema = Schema.Struct({
  /** Address of the issuance token (fToken) */
  issuanceTokenAddress: AddressSchema,
  /** Address of the reserve/collateral token */
  reserveTokenAddress: AddressSchema,
  /** Bonding curve segments (at least 1 required) */
  segments: Schema.Array(SegmentConfigSchema).pipe(Schema.minItems(1)),
  /** Buy fee in basis points (0-10000) */
  buyFeeBps: Schema.Number.pipe(Schema.int(), Schema.between(0, 10_000)),
  /** Sell fee in basis points (0-10000) */
  sellFeeBps: Schema.Number.pipe(Schema.int(), Schema.between(0, 10_000)),
}).annotations({
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
  /** Share amount (relative to total shares) */
  shares: Schema.BigIntFromSelf,
}).annotations({
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
  /** Floor fee percentage in basis points (e.g., 6800 = 68%) */
  floorFeePercentage: Schema.Number.pipe(Schema.int(), Schema.between(0, 10_000)),
  /** Address receiving floor fees (typically the Floor contract itself) */
  floorFeeTreasury: AddressSchema,
}).annotations({
  title: 'TreasuryConfig',
  description: 'Treasury module configuration for fee splitting',
})

export type TreasuryConfig = typeof TreasuryConfigSchema.Type

// =============================================================================
// Credit Facility Configuration
// =============================================================================

/**
 * @description Credit facility module configuration
 * Encoding order matches creditFacilitySetup.s.sol:
 * abi.encode(loanToValueRatio, maxLeverage, borrowingFeeRate)
 */
export const CreditFacilityConfigSchema = Schema.Struct({
  /** Loan-to-value ratio in basis points (e.g., 10000 = 100%) */
  loanToValueRatio: Schema.Number.pipe(Schema.int(), Schema.between(1, 10_000)),
  /** Maximum leverage multiplier (e.g., 25) */
  maxLeverage: Schema.Number.pipe(Schema.int(), Schema.between(1, 255)),
  /** Borrowing fee rate in basis points (e.g., 600 = 6%) */
  borrowingFeeRate: Schema.Number.pipe(Schema.int(), Schema.between(0, 10_000)),
}).annotations({
  title: 'CreditFacilityConfig',
  description: 'Credit facility module configuration for lending',
})

export type CreditFacilityConfig = typeof CreditFacilityConfigSchema.Type

// =============================================================================
// Presale Configuration
// =============================================================================

/**
 * @description Presale module configuration
 * Encoding order matches Presale_v1.sol init:
 * abi.encode(creditFacility, baseCommissionBps[], endTimestamp, globalIssuanceCap,
 *            perAddressIssuanceCap, priceBreakpoints[][], initialMultiplier, decayDuration)
 */
export const PresaleConfigSchema = Schema.Struct({
  /** Credit facility address (or zero address if none) */
  creditFacilityAddress: Schema.optional(AddressSchema),
  /** Commission schedule - array of fees per leverage level in basis points (index 0 = direct, 1+ = leverage) */
  baseCommissionBps: Schema.Array(Schema.BigIntFromSelf).pipe(Schema.minItems(1)),
  /** Presale end timestamp (unix seconds) */
  endTimestamp: Schema.BigIntFromSelf,
  /** Global issuance cap in issuance tokens (0 = unlimited) */
  globalIssuanceCap: Schema.BigIntFromSelf,
  /** Per-address issuance cap in issuance tokens (0 = unlimited) */
  perAddressIssuanceCap: Schema.BigIntFromSelf,
  /** Price breakpoints - 2D array: [leverage level][tranche unlock price]. Length must be baseCommissionBps.length - 1 */
  priceBreakpoints: Schema.Array(Schema.Array(Schema.BigIntFromSelf)),
  /** Initial fee multiplier in BPS (10000 = 1x, 20000 = 2x). Used with DecayingFeeMultiplier */
  initialMultiplier: Schema.BigIntFromSelf,
  /** Decay duration in seconds (0 = no decay). Multiplier decays from initial to 1x over this period */
  decayDuration: Schema.BigIntFromSelf,
}).annotations({
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
  performanceFeeBps: Schema.Number.pipe(Schema.int(), Schema.between(0, 10_000)),
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
