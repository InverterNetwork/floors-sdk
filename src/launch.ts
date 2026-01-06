/**
 * @description Launch module for creating Floor Markets
 * Handles encoding configs and calling FloorFactory.createFloor()
 */

import { Schema } from 'effect'
import {
  type Address,
  decodeEventLog,
  encodeAbiParameters,
  parseAbiParameters,
  type TransactionReceipt,
} from 'viem'

import { FloorFactory_v1 } from './abis'
import {
  AUTHORIZER_METADATA,
  CREDIT_FACILITY_METADATA,
  FLOOR_METADATA,
  type ModuleMetadata,
  PRESALE_METADATA,
  TREASURY_METADATA,
} from './constants/metadata'
import {
  type CreditFacilityConfig,
  CreditFacilityConfigSchema,
  type FloorConfig,
  FloorConfigSchema,
  type LaunchConfig,
  LaunchConfigSchema,
  type LaunchResult,
  type PresaleConfig,
  PresaleConfigSchema,
  type TreasuryConfig,
  TreasuryConfigSchema,
} from './schemas/launch.schema'
import type { PopPublicClient, PopWalletClient } from './types'

// =============================================================================
// Types
// =============================================================================

export type {
  CreditFacilityConfig,
  FloorConfig,
  LaunchConfig,
  LaunchResult,
  PresaleConfig,
  TreasuryConfig,
} from './schemas/launch.schema'

// Note: SegmentConfig is already exported from ./utils/segments
export { SegmentConfigSchema } from './schemas/launch.schema'

// =============================================================================
// Launch Class
// =============================================================================

interface LaunchConstructorArgs {
  /** FloorFactory contract address */
  floorFactoryAddress: Address
  /** Public client for reading */
  publicClient: PopPublicClient
  /** Wallet client for writing (optional, required for mutations) */
  walletClient?: PopWalletClient
}

/**
 * @description Class for launching new Floor Markets
 * @example
 * ```typescript
 * const launch = new Launch({
 *   floorFactoryAddress: '0x...',
 *   publicClient,
 *   walletClient,
 * })
 *
 * const result = await launch.create({
 *   floor: {
 *     issuanceTokenAddress: '0x...',
 *     reserveTokenAddress: '0x...',
 *     segments: [...],
 *     buyFeeBps: 0,
 *     sellFeeBps: 80,
 *   },
 *   initialAdmin: '0x...',
 *   treasury: {
 *     recipients: [{ address: '0x...', shares: 7000n }],
 *     floorFeePercentage: 6800,
 *     floorFeeTreasury: '0x...',
 *   },
 * })
 * ```
 */
export class Launch {
  private readonly floorFactoryAddress: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ floorFactoryAddress, publicClient, walletClient }: LaunchConstructorArgs) {
    this.floorFactoryAddress = floorFactoryAddress
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  // ===========================================================================
  // Public Methods
  // ===========================================================================

  /**
   * @description Create a new Floor Market with all required modules
   * Validates config with Effect Schema before encoding and submitting
   */
  public async create(params: LaunchConfig): Promise<LaunchResult> {
    const walletClient = this.requireWalletClient()

    // Validate with Effect Schema (throws ParseError on invalid)
    const validated = Schema.decodeUnknownSync(LaunchConfigSchema)(params)

    // Encode configs
    const floorConfig = this.buildModuleConfig(
      FLOOR_METADATA,
      this.encodeFloorConfig(validated.floor)
    )
    const authorizerConfig = this.buildModuleConfig(
      AUTHORIZER_METADATA,
      this.encodeAuthorizerConfig(validated.initialAdmin as Address)
    )
    const treasuryConfig = this.buildModuleConfig(
      TREASURY_METADATA,
      this.encodeTreasuryConfig(validated.treasury)
    )

    // Optional modules
    const optionalModules: Array<{
      metadata: ModuleMetadata
      configData: `0x${string}`
    }> = []

    if (validated.creditFacility) {
      optionalModules.push(
        this.buildModuleConfig(
          CREDIT_FACILITY_METADATA,
          this.encodeCreditFacilityConfig(validated.creditFacility)
        )
      )
    }

    if (validated.presale) {
      optionalModules.push(
        this.buildModuleConfig(PRESALE_METADATA, this.encodePresaleConfig(validated.presale))
      )
    }

    // Execute transaction
    const hash = await walletClient.writeContract({
      address: this.floorFactoryAddress,
      abi: FloorFactory_v1,
      functionName: 'createFloor',
      args: [
        {
          metadata: floorConfig.metadata,
          configData: floorConfig.configData,
        },
        {
          metadata: authorizerConfig.metadata,
          configData: authorizerConfig.configData,
        },
        {
          metadata: treasuryConfig.metadata,
          configData: treasuryConfig.configData,
        },
        optionalModules.map((m) => ({
          metadata: m.metadata,
          configData: m.configData,
        })),
      ],
      account: this.getWalletAddress(walletClient),
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    // Check if transaction succeeded
    if (receipt.status === 'reverted') {
      throw new Error(
        `createFloor transaction reverted. Hash: ${hash}. Check the transaction for details.`
      )
    }

    // Parse FloorCreated event from transaction logs
    const floorCreatedEvent = this.parseFloorCreatedEvent(receipt)

    if (!floorCreatedEvent) {
      throw new Error('FloorCreated event not found in transaction receipt')
    }

    return {
      floorAddress: floorCreatedEvent.floorAddress,
      marketId: floorCreatedEvent.floorId,
      transactionHash: hash,
    }
  }

  /**
   * @description Get the current floor ID counter
   */
  public async getFloorIDCounter(): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.floorFactoryAddress,
      abi: FloorFactory_v1,
      functionName: 'getFloorIDCounter',
    })) as bigint
  }

  /**
   * @description Get floor address by ID
   */
  public async getFloorByID(id: bigint): Promise<Address> {
    return (await this.publicClient.readContract({
      address: this.floorFactoryAddress,
      abi: FloorFactory_v1,
      functionName: 'getFloorByID',
      args: [id],
    })) as Address
  }

  /**
   * @description Get the module factory address
   */
  public async getModuleFactory(): Promise<Address> {
    return (await this.publicClient.readContract({
      address: this.floorFactoryAddress,
      abi: FloorFactory_v1,
      functionName: 'getModuleFactory',
    })) as Address
  }

  // ===========================================================================
  // Validation Methods (public for testing/inspection)
  // ===========================================================================

  /**
   * @description Validate floor configuration using Effect Schema
   */
  public validateFloorConfig(config: FloorConfig): FloorConfig {
    return Schema.decodeUnknownSync(FloorConfigSchema)(config)
  }

  /**
   * @description Validate treasury configuration using Effect Schema
   */
  public validateTreasuryConfig(config: TreasuryConfig): TreasuryConfig {
    return Schema.decodeUnknownSync(TreasuryConfigSchema)(config)
  }

  /**
   * @description Validate credit facility configuration using Effect Schema
   */
  public validateCreditFacilityConfig(config: CreditFacilityConfig): CreditFacilityConfig {
    return Schema.decodeUnknownSync(CreditFacilityConfigSchema)(config)
  }

  /**
   * @description Validate presale configuration using Effect Schema
   */
  public validatePresaleConfig(config: PresaleConfig): PresaleConfig {
    return Schema.decodeUnknownSync(PresaleConfigSchema)(config)
  }

  /**
   * @description Validate complete launch configuration using Effect Schema
   */
  public validateLaunchConfig(config: LaunchConfig): LaunchConfig {
    return Schema.decodeUnknownSync(LaunchConfigSchema)(config)
  }

  // ===========================================================================
  // Encoding Methods (public for testing/inspection)
  // ===========================================================================

  /**
   * @description Encode Floor module configData
   * Format matches floorSetup.s.sol:
   * abi.encode(issuanceToken, collateralToken, PackedSegment[], buyFeeBps, sellFeeBps)
   *
   * PackedSegment is a bytes32 with bit-packed values:
   * - initialPrice: 72 bits at offset 0
   * - priceIncrease: 72 bits at offset 72
   * - supplyPerStep: 96 bits at offset 144
   * - numberOfSteps: 16 bits at offset 240
   */
  public encodeFloorConfig(config: FloorConfig): `0x${string}` {
    // Pack segments into bytes32 format matching contract's PackedSegment type
    const packedSegmentBytes = config.segments.map((seg) => {
      const initialPrice = BigInt(seg.initialPrice)
      const priceIncrease = BigInt(seg.priceIncrease)
      const supplyPerStep = BigInt(seg.supplyPerStep)
      const numberOfSteps = BigInt(seg.numberOfSteps)

      // Validate bit ranges
      const INITIAL_PRICE_MAX = (BigInt(1) << BigInt(72)) - BigInt(1)
      const PRICE_INCREASE_MAX = (BigInt(1) << BigInt(72)) - BigInt(1)
      const SUPPLY_MAX = (BigInt(1) << BigInt(96)) - BigInt(1)
      const STEPS_MAX = (BigInt(1) << BigInt(16)) - BigInt(1)

      if (initialPrice > INITIAL_PRICE_MAX) throw new Error('Initial price exceeds 72-bit max')
      if (priceIncrease > PRICE_INCREASE_MAX) throw new Error('Price increase exceeds 72-bit max')
      if (supplyPerStep > SUPPLY_MAX) throw new Error('Supply per step exceeds 96-bit max')
      if (numberOfSteps > STEPS_MAX) throw new Error('Number of steps exceeds 16-bit max')
      if (numberOfSteps === BigInt(0)) throw new Error('Number of steps cannot be 0')

      // Pack into bytes32: initialPrice | (priceIncrease << 72) | (supplyPerStep << 144) | (numberOfSteps << 240)
      const packed =
        initialPrice |
        (priceIncrease << BigInt(72)) |
        (supplyPerStep << BigInt(144)) |
        (numberOfSteps << BigInt(240))

      return packed
    })

    // Encode as: (address, address, bytes32[], uint256, uint256)
    return encodeAbiParameters(
      parseAbiParameters(
        'address issuanceToken, address reserveToken, bytes32[] segments, uint256 buyFeeBps, uint256 sellFeeBps'
      ),
      [
        config.issuanceTokenAddress as Address,
        config.reserveTokenAddress as Address,
        packedSegmentBytes.map((p) => `0x${p.toString(16).padStart(64, '0')}` as `0x${string}`),
        BigInt(config.buyFeeBps),
        BigInt(config.sellFeeBps),
      ]
    )
  }

  /**
   * @description Encode Authorizer module configData
   * Format: abi.encode(initialAdmin)
   */
  public encodeAuthorizerConfig(initialAdmin: Address): `0x${string}` {
    return encodeAbiParameters(parseAbiParameters('address initialAdmin'), [initialAdmin])
  }

  /**
   * @description Encode Treasury module configData
   * Format matches splitterTreasurySetup.s.sol:
   * abi.encode(recipients[], shares[], floorFeePercentage, floorFeeTreasury)
   */
  public encodeTreasuryConfig(config: TreasuryConfig): `0x${string}` {
    const recipients = config.recipients.map((r) => r.address as Address)
    const shares = config.recipients.map((r) => r.shares)

    return encodeAbiParameters(
      parseAbiParameters(
        'address[] recipients, uint256[] shares, uint256 floorFeePercentage, address floorFeeTreasury'
      ),
      [recipients, shares, BigInt(config.floorFeePercentage), config.floorFeeTreasury as Address]
    )
  }

  /**
   * @description Encode CreditFacility module configData
   * Format matches creditFacilitySetup.s.sol:
   * abi.encode(loanToValueRatio, maxLeverage, borrowingFeeRate)
   */
  public encodeCreditFacilityConfig(config: CreditFacilityConfig): `0x${string}` {
    return encodeAbiParameters(
      parseAbiParameters('uint256 loanToValueRatio, uint256 maxLeverage, uint256 borrowingFeeRate'),
      [BigInt(config.loanToValueRatio), BigInt(config.maxLeverage), BigInt(config.borrowingFeeRate)]
    )
  }

  /**
   * @description Encode Presale module configData
   * Format matches presaleSetup.s.sol:
   * abi.encode(creditFacility, baseCommissionBps[], endTimestamp, globalCap, perAddressCap, priceBreakpoints[][])
   */
  public encodePresaleConfig(config: PresaleConfig): `0x${string}` {
    const zeroAddress = '0x0000000000000000000000000000000000000000' as Address

    return encodeAbiParameters(
      parseAbiParameters(
        'address creditFacility, uint16[] baseCommissionBps, uint64 endTimestamp, uint256 globalIssuanceCap, uint256 perAddressIssuanceCap, uint256[][] priceBreakpoints'
      ),
      [
        (config.creditFacilityAddress as Address) ?? zeroAddress,
        config.baseCommissionBps.map((b) => Number(b)),
        config.endTimestamp,
        config.globalIssuanceCap,
        config.perAddressIssuanceCap,
        config.priceBreakpoints,
      ]
    )
  }

  // ===========================================================================
  // Private Helpers
  // ===========================================================================

  /**
   * @description Parse FloorCreated event from transaction receipt
   */
  private parseFloorCreatedEvent(
    receipt: TransactionReceipt
  ): { floorId: bigint; floorAddress: Address } | null {
    // FloorCreated event ABI
    const floorCreatedEventAbi = {
      type: 'event',
      name: 'FloorCreated',
      inputs: [
        { name: 'floorId_', type: 'uint256', indexed: true },
        { name: 'floorProxy_', type: 'address', indexed: true },
      ],
    } as const

    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: [floorCreatedEventAbi],
          data: log.data,
          topics: log.topics,
        })

        if (decoded.eventName === 'FloorCreated') {
          return {
            floorId: decoded.args.floorId_,
            floorAddress: decoded.args.floorProxy_,
          }
        }
      } catch {
        // Not the event we're looking for, continue
        continue
      }
    }

    return null
  }

  private buildModuleConfig(
    metadata: ModuleMetadata,
    configData: `0x${string}`
  ): { metadata: ModuleMetadata; configData: `0x${string}` } {
    return { metadata, configData }
  }

  private requireWalletClient(): PopWalletClient {
    if (!this.walletClient) {
      throw new Error('Wallet not connected. Please connect your wallet to create a market.')
    }
    return this.walletClient
  }

  private getWalletAddress(walletClient: PopWalletClient): Address {
    const account = walletClient.account
    if (!account?.address) {
      throw new Error('Wallet not connected. Please connect your wallet to continue.')
    }
    return account.address as Address
  }
}

// =============================================================================
// Re-exports
// =============================================================================

export {
  AUTHORIZER_METADATA,
  CREDIT_FACILITY_METADATA,
  FLOOR_METADATA,
  PRESALE_METADATA,
  TREASURY_METADATA,
} from './constants/metadata'
export {
  calculateTotalSupply,
  DEFAULT_FLOOR_SEGMENT,
  DEFAULT_PREMIUM_SEGMENTS,
  generateCommissionSchedule,
  generateDefaultCurve,
  generatePriceBreakpoints,
  packSegments,
  validateSegments,
} from './utils/segments'
