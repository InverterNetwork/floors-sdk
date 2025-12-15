/**
 * @description Module metadata constants for FloorFactory
 * These values must match registered metadata in ModuleFactory
 * Source: contracts/scripts/deploymentSuite/MetadataCollection_v1.s.sol
 */

export const METADATA_URL = 'https://github.com/InverterNetwork/floors-sc'

/**
 * @description Metadata for Floor_v1 - Floor-aware discrete bonding curve
 */
export const FLOOR_METADATA = {
  majorVersion: BigInt(1),
  minorVersion: BigInt(0),
  patchVersion: BigInt(0),
  url: METADATA_URL,
  title: 'Floor_v1',
} as const

/**
 * @description Metadata for AUT_Roles_v2 - Role-based authorization
 */
export const AUTHORIZER_METADATA = {
  majorVersion: BigInt(2),
  minorVersion: BigInt(0),
  patchVersion: BigInt(0),
  url: METADATA_URL,
  title: 'AUT_Roles_v2',
} as const

/**
 * @description Metadata for SplitterTreasury_v1 - Treasury that splits funds among recipients
 */
export const TREASURY_METADATA = {
  majorVersion: BigInt(1),
  minorVersion: BigInt(0),
  patchVersion: BigInt(0),
  url: METADATA_URL,
  title: 'SplitterTreasury_v1',
} as const

/**
 * @description Metadata for CreditFacility_v1 - Credit facility for borrowing against issuance tokens
 */
export const CREDIT_FACILITY_METADATA = {
  majorVersion: BigInt(1),
  minorVersion: BigInt(0),
  patchVersion: BigInt(0),
  url: METADATA_URL,
  title: 'CreditFacility_v1',
} as const

/**
 * @description Metadata for Presale_v1 - Presale module with leverage
 */
export const PRESALE_METADATA = {
  majorVersion: BigInt(1),
  minorVersion: BigInt(0),
  patchVersion: BigInt(0),
  url: METADATA_URL,
  title: 'Presale_v1',
} as const

/**
 * @description Type for module metadata
 */
export type ModuleMetadata = {
  majorVersion: bigint
  minorVersion: bigint
  patchVersion: bigint
  url: string
  title: string
}
