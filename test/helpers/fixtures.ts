/**
 * @description Test fixtures for creating test configs
 * Contains helpers for creating floor, treasury, credit facility, and launch configs
 */

import type { Address } from 'viem'

import type {
  CreditFacilityConfig,
  FloorConfig,
  LaunchConfig,
  PresaleConfig,
  TreasuryConfig,
} from '../../src/schemas/launch.schema'
import { ANVIL_ADDRESSES } from './config'

// =============================================================================
// Segment Fixtures
// =============================================================================

/**
 * Segment configuration for testing
 */
export interface SegmentConfig {
  initialPrice: bigint
  priceIncrease: bigint
  supplyPerStep: bigint
  numberOfSteps: number
}

/**
 * Creates test segments with native BigInt values
 * Default: two-segment bonding curve with flat floor + rising premium
 */
export const createTestSegments = (): SegmentConfig[] => [
  {
    initialPrice: BigInt(1e18), // 1.0
    priceIncrease: BigInt(0), // Flat floor segment
    supplyPerStep: BigInt(100_000e18), // 100k tokens
    numberOfSteps: 1,
  },
  {
    initialPrice: BigInt(1e18), // 1.0
    priceIncrease: BigInt(0.013e18), // 0.013 increase per step
    supplyPerStep: BigInt(250_000e18), // 250k per step
    numberOfSteps: 77,
  },
]

// =============================================================================
// Floor Config Fixtures
// =============================================================================

/**
 * Creates a floor config with native BigInt values
 */
export const createTestFloorConfig = (
  issuanceToken: Address,
  reserveToken: Address,
  options?: Partial<Omit<FloorConfig, 'issuanceTokenAddress' | 'reserveTokenAddress'>>
): FloorConfig => ({
  issuanceTokenAddress: issuanceToken,
  reserveTokenAddress: reserveToken,
  segments: options?.segments ?? createTestSegments(),
  buyFeeBps: options?.buyFeeBps ?? 0,
  sellFeeBps: options?.sellFeeBps ?? 80,
})

// =============================================================================
// Treasury Config Fixtures
// =============================================================================

/**
 * Creates a treasury config with native BigInt values
 */
export const createTestTreasuryConfig = (
  floorAddress: Address,
  options?: Partial<Omit<TreasuryConfig, 'floorFeeTreasury'>>
): TreasuryConfig => ({
  recipients: options?.recipients ?? [
    { address: ANVIL_ADDRESSES.ADMIN, shares: BigInt(7000) },
    { address: ANVIL_ADDRESSES.MANAGER, shares: BigInt(3000) },
  ],
  floorFeePercentage: options?.floorFeePercentage ?? 6800,
  floorFeeTreasury: floorAddress,
})

// =============================================================================
// Credit Facility Config Fixtures
// =============================================================================

/**
 * Default credit facility configuration for testing
 */
export const DEFAULT_CREDIT_FACILITY_CONFIG: CreditFacilityConfig = {
  loanToValueRatio: 9900, // 99%
  maxLeverage: 25,
  borrowingFeeRate: 0,
}

/**
 * Creates a credit facility config
 */
export const createTestCreditFacilityConfig = (
  options?: Partial<CreditFacilityConfig>
): CreditFacilityConfig => ({
  loanToValueRatio: options?.loanToValueRatio ?? 9900,
  maxLeverage: options?.maxLeverage ?? 25,
  borrowingFeeRate: options?.borrowingFeeRate ?? 0,
})

// =============================================================================
// Presale Config Fixtures
// =============================================================================

/**
 * Creates a presale config with native BigInt values
 */
export const createTestPresaleConfig = (
  creditFacilityAddress: Address,
  options?: Partial<PresaleConfig>
): PresaleConfig => ({
  creditFacilityAddress,
  baseCommissionBps: options?.baseCommissionBps ?? [BigInt(100), BigInt(200), BigInt(450)],
  endTimestamp: options?.endTimestamp ?? BigInt(Math.floor(Date.now() / 1000) + 86400 * 365),
  globalIssuanceCap: options?.globalIssuanceCap ?? BigInt(100_000e18),
  perAddressIssuanceCap: options?.perAddressIssuanceCap ?? BigInt(0),
  priceBreakpoints: options?.priceBreakpoints ?? [[BigInt(1e18)], [BigInt(1e18), BigInt(1e18)]],
})

// =============================================================================
// Launch Config Fixtures
// =============================================================================

/**
 * Creates a complete launch config with native BigInt values
 */
export const createTestLaunchConfig = (
  issuanceToken: Address,
  reserveToken: Address,
  options?: {
    floor?: Partial<Omit<FloorConfig, 'issuanceTokenAddress' | 'reserveTokenAddress'>>
    treasury?: Partial<Omit<TreasuryConfig, 'floorFeeTreasury'>>
    creditFacility?: Partial<CreditFacilityConfig>
    initialAdmin?: Address
  }
): LaunchConfig => ({
  floor: createTestFloorConfig(issuanceToken, reserveToken, options?.floor),
  initialAdmin: options?.initialAdmin ?? ANVIL_ADDRESSES.ADMIN,
  treasury: createTestTreasuryConfig(
    options?.initialAdmin ?? ANVIL_ADDRESSES.ADMIN,
    options?.treasury
  ),
  creditFacility: options?.creditFacility
    ? createTestCreditFacilityConfig(options.creditFacility)
    : DEFAULT_CREDIT_FACILITY_CONFIG,
})
