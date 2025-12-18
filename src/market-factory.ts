/**
 * @description Market Factory for creating Floor Markets
 * Handles encoding configs and calling FloorFactory.createFloor()
 */

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
import type { PopPublicClient, PopWalletClient } from './types'
import { type SegmentConfig, validateSegments } from './utils/segments'

// =============================================================================
// Types
// =============================================================================

/**
 * @description Floor module configuration
 */
export type FloorConfig = {
  /** Address of the issuance token (fToken) */
  issuanceTokenAddress: Address
  /** Address of the reserve/collateral token */
  reserveTokenAddress: Address
  /** Floor segment (first segment, must be flat) */
  floorSegment: SegmentConfig
  /** Premium segments (after floor) */
  premiumSegments: SegmentConfig[]
  /** Buy fee in basis points (0-10000) */
  buyFeeBps: number
  /** Sell fee in basis points (0-10000) */
  sellFeeBps: number
}

/**
 * @description Treasury recipient configuration
 */
export type TreasuryRecipient = {
  /** Recipient address */
  address: Address
  /** Share amount (relative to total shares) */
  shares: bigint
}

/**
 * @description Treasury module configuration
 */
export type TreasuryConfig = {
  /** Array of recipients with their shares */
  recipients: TreasuryRecipient[]
  /** Floor fee percentage in basis points (e.g., 6800 = 68%) */
  floorFeePercentage: number
  /** Address receiving floor fees (typically the Floor contract itself) */
  floorFeeTreasury: Address
}

/**
 * @description Credit facility module configuration
 */
export type CreditFacilityConfig = {
  /** Loan-to-value ratio in basis points (e.g., 8000 = 80%) */
  loanToValueRatio: number
  /** Maximum leverage multiplier (e.g., 25) */
  maxLeverage: number
  /** Borrowing fee rate in basis points (e.g., 600 = 6%) */
  borrowingFeeRate: number
}

/**
 * @description Presale module configuration
 */
export type PresaleConfig = {
  /** Credit facility address (or zero address if none) */
  creditFacilityAddress?: Address
  /** Commission schedule - array of fees per leverage level in basis points */
  baseCommissionBps: bigint[]
  /** Presale end timestamp (unix seconds) */
  endTimestamp: bigint
  /** Global issuance cap in reserve tokens (0 = unlimited) */
  globalIssuanceCap: bigint
  /** Per-address issuance cap in reserve tokens (0 = unlimited) */
  perAddressIssuanceCap: bigint
  /** Price breakpoints - 2D array: [leverage level][tranche unlock price] */
  priceBreakpoints: bigint[][]
}

/**
 * @description Full market creation parameters
 */
export type CreateMarketParams = {
  /** Floor module configuration */
  floor: FloorConfig
  /** Initial admin address for authorizer (typically the creator) */
  initialAdmin: Address
  /** Treasury configuration */
  treasury: TreasuryConfig
  /** Credit facility configuration (optional) */
  creditFacility?: CreditFacilityConfig
  /** Presale configuration (optional) */
  presale?: PresaleConfig
}

/**
 * @description Market creation result
 */
export type CreateMarketResult = {
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Created Floor/Market address */
  floorAddress: Address
  /** Market ID */
  marketId: bigint
}

// =============================================================================
// MarketFactory Class
// =============================================================================

interface MarketFactoryConstructorArgs {
  /** FloorFactory contract address */
  floorFactoryAddress: Address
  /** Public client for reading */
  publicClient: PopPublicClient
  /** Wallet client for writing (optional, required for mutations) */
  walletClient?: PopWalletClient
}

/**
 * @description Factory class for creating new Floor Markets
 * @example
 * ```typescript
 * const factory = new MarketFactory({
 *   floorFactoryAddress: '0x...',
 *   publicClient,
 *   walletClient,
 * })
 *
 * const result = await factory.createMarket({
 *   floor: {
 *     issuanceTokenAddress: '0x...',
 *     reserveTokenAddress: '0x...',
 *     floorSegment: { ... },
 *     premiumSegments: [ ... ],
 *     buyFeeBps: 50,
 *     sellFeeBps: 80,
 *   },
 *   initialAdmin: '0x...',
 *   treasury: { ... },
 * })
 * ```
 */
export class MarketFactory {
  private readonly floorFactoryAddress: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ floorFactoryAddress, publicClient, walletClient }: MarketFactoryConstructorArgs) {
    this.floorFactoryAddress = floorFactoryAddress
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  // ===========================================================================
  // Public Methods
  // ===========================================================================

  /**
   * @description Create a new Floor Market with all required modules
   */
  public async createMarket(params: CreateMarketParams): Promise<CreateMarketResult> {
    const walletClient = this.requireWalletClient()

    // Validate inputs
    this.validateCreateMarketParams(params)

    // Encode configs
    const floorConfig = this.buildModuleConfig(FLOOR_METADATA, this.encodeFloorConfig(params.floor))
    const authorizerConfig = this.buildModuleConfig(
      AUTHORIZER_METADATA,
      this.encodeAuthorizerConfig(params.initialAdmin)
    )

    // Treasury needs the floor address, but we don't have it yet
    // Use a placeholder that will be resolved by the contract
    const treasuryConfig = this.buildModuleConfig(
      TREASURY_METADATA,
      this.encodeTreasuryConfig(params.treasury)
    )

    // Optional modules
    const optionalModules: Array<{
      metadata: ModuleMetadata
      configData: `0x${string}`
    }> = []

    if (params.creditFacility) {
      optionalModules.push(
        this.buildModuleConfig(
          CREDIT_FACILITY_METADATA,
          this.encodeCreditFacilityConfig(params.creditFacility)
        )
      )
    }

    if (params.presale) {
      optionalModules.push(
        this.buildModuleConfig(PRESALE_METADATA, this.encodePresaleConfig(params.presale))
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
    // Event signature: FloorCreated(uint indexed floorId_, address indexed floorProxy_)
    const floorCreatedEvent = this.parseFloorCreatedEvent(receipt)

    if (!floorCreatedEvent) {
      throw new Error('FloorCreated event not found in transaction receipt')
    }

    return {
      receipt,
      floorAddress: floorCreatedEvent.floorAddress,
      marketId: floorCreatedEvent.floorId,
    }
  }

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
  // Encoding Methods (public for testing/inspection)
  // ===========================================================================

  /**
   * @description Encode Floor module configData
   * Format: abi.encode(issuanceToken, reserveToken, PackedSegment[], buyFeeBps, sellFeeBps)
   *
   * PackedSegment is a bytes32 with bit-packed values:
   * - initialPrice: 72 bits at offset 0
   * - priceIncrease: 72 bits at offset 72
   * - supplyPerStep: 96 bits at offset 144
   * - numberOfSteps: 16 bits at offset 240
   */
  public encodeFloorConfig(config: FloorConfig): `0x${string}` {
    const allSegments = [config.floorSegment, ...config.premiumSegments]

    // Pack segments into bytes32 format matching contract's PackedSegment type
    const packedSegmentBytes = allSegments.map((seg) => {
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
        config.issuanceTokenAddress,
        config.reserveTokenAddress,
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
   * Format: abi.encode(recipients[], shares[], floorFeePercentage, floorFeeTreasury)
   */
  public encodeTreasuryConfig(config: TreasuryConfig): `0x${string}` {
    const recipients = config.recipients.map((r) => r.address)
    const shares = config.recipients.map((r) => r.shares)

    return encodeAbiParameters(
      parseAbiParameters(
        'address[] recipients, uint256[] shares, uint256 floorFeePercentage, address floorFeeTreasury'
      ),
      [recipients, shares, BigInt(config.floorFeePercentage), config.floorFeeTreasury]
    )
  }

  /**
   * @description Encode CreditFacility module configData
   * Format: abi.encode(loanToValueRatio, maxLeverage, borrowingFeeRate)
   */
  public encodeCreditFacilityConfig(config: CreditFacilityConfig): `0x${string}` {
    return encodeAbiParameters(
      parseAbiParameters('uint256 loanToValueRatio, uint256 maxLeverage, uint256 borrowingFeeRate'),
      [BigInt(config.loanToValueRatio), BigInt(config.maxLeverage), BigInt(config.borrowingFeeRate)]
    )
  }

  /**
   * @description Encode Presale module configData
   * Format: abi.encode(creditFacility, baseCommissionBps[], endTimestamp, globalCap, perAddressCap, priceBreakpoints[][])
   */
  public encodePresaleConfig(config: PresaleConfig): `0x${string}` {
    const zeroAddress = '0x0000000000000000000000000000000000000000' as Address

    return encodeAbiParameters(
      parseAbiParameters(
        'address creditFacility, uint16[] baseCommissionBps, uint64 endTimestamp, uint256 globalIssuanceCap, uint256 perAddressIssuanceCap, uint256[][] priceBreakpoints'
      ),
      [
        config.creditFacilityAddress ?? zeroAddress,
        config.baseCommissionBps.map((b) => Number(b)),
        config.endTimestamp,
        config.globalIssuanceCap,
        config.perAddressIssuanceCap,
        config.priceBreakpoints,
      ]
    )
  }

  // ===========================================================================
  // Validation Methods
  // ===========================================================================

  /**
   * @description Validate all create market parameters
   */
  public validateCreateMarketParams(params: CreateMarketParams): void {
    // Validate floor config
    this.validateFloorConfig(params.floor)

    // Validate treasury config
    this.validateTreasuryConfig(params.treasury)

    // Validate optional configs
    if (params.creditFacility) {
      this.validateCreditFacilityConfig(params.creditFacility)
    }

    if (params.presale) {
      this.validatePresaleConfig(params.presale)
    }
  }

  /**
   * @description Validate floor configuration
   */
  public validateFloorConfig(config: FloorConfig): void {
    // Validate addresses
    if (
      !config.issuanceTokenAddress ||
      config.issuanceTokenAddress === '0x0000000000000000000000000000000000000000'
    ) {
      throw new Error('Invalid issuance token address')
    }
    if (
      !config.reserveTokenAddress ||
      config.reserveTokenAddress === '0x0000000000000000000000000000000000000000'
    ) {
      throw new Error('Invalid reserve token address')
    }

    // Validate fees
    if (config.buyFeeBps < 0 || config.buyFeeBps > 10_000) {
      throw new Error('Buy fee must be between 0 and 10000 basis points')
    }
    if (config.sellFeeBps < 0 || config.sellFeeBps > 10_000) {
      throw new Error('Sell fee must be between 0 and 10000 basis points')
    }

    // Validate segments
    const segmentValidation = validateSegments(config.floorSegment, config.premiumSegments)
    if (!segmentValidation.valid) {
      throw new Error(`Invalid segments: ${segmentValidation.errors.join(', ')}`)
    }
  }

  /**
   * @description Validate treasury configuration
   */
  public validateTreasuryConfig(config: TreasuryConfig): void {
    if (config.recipients.length === 0) {
      throw new Error('Treasury must have at least 1 recipient')
    }

    // Check for duplicate addresses
    const addresses = config.recipients.map((r) => r.address.toLowerCase())
    const uniqueAddresses = new Set(addresses)
    if (uniqueAddresses.size !== addresses.length) {
      throw new Error('Treasury recipients must have unique addresses')
    }

    // Validate shares are positive
    for (const recipient of config.recipients) {
      if (recipient.shares <= BigInt(0)) {
        throw new Error('All recipient shares must be positive')
      }
    }

    // Validate floor fee percentage
    if (config.floorFeePercentage < 0 || config.floorFeePercentage > 10_000) {
      throw new Error('Floor fee percentage must be between 0 and 10000 basis points')
    }

    // Validate floor fee treasury address
    if (
      !config.floorFeeTreasury ||
      config.floorFeeTreasury === '0x0000000000000000000000000000000000000000'
    ) {
      throw new Error('Invalid floor fee treasury address')
    }
  }

  /**
   * @description Validate credit facility configuration
   */
  public validateCreditFacilityConfig(config: CreditFacilityConfig): void {
    if (config.loanToValueRatio <= 0 || config.loanToValueRatio > 9_000) {
      throw new Error('LTV ratio must be between 1 and 9000 basis points (90%)')
    }
    if (config.maxLeverage < 1 || config.maxLeverage > 255) {
      throw new Error('Max leverage must be between 1 and 255')
    }
    if (config.borrowingFeeRate < 0 || config.borrowingFeeRate > 10_000) {
      throw new Error('Borrowing fee rate must be between 0 and 10000 basis points')
    }
  }

  /**
   * @description Validate presale configuration
   */
  public validatePresaleConfig(config: PresaleConfig): void {
    // Validate commission schedule
    if (config.baseCommissionBps.length === 0) {
      throw new Error('Commission schedule cannot be empty')
    }

    for (const fee of config.baseCommissionBps) {
      if (fee < BigInt(0) || fee > BigInt(10_000)) {
        throw new Error('Commission fees must be between 0 and 10000 basis points')
      }
    }

    // Validate end timestamp is in future
    const now = BigInt(Math.floor(Date.now() / 1000))
    if (config.endTimestamp <= now) {
      throw new Error('Presale end timestamp must be in the future')
    }

    // Validate price breakpoints structure
    const expectedLeverage = config.baseCommissionBps.length - 1
    if (config.priceBreakpoints.length !== expectedLeverage) {
      throw new Error(
        `Price breakpoints length (${config.priceBreakpoints.length}) must equal maxLeverage (${expectedLeverage})`
      )
    }

    // Validate each leverage level has correct number of tranches
    for (let i = 0; i < config.priceBreakpoints.length; i++) {
      const expectedTranches = i + 1
      if (config.priceBreakpoints[i].length !== expectedTranches) {
        throw new Error(
          `Leverage level ${i + 1} should have ${expectedTranches} tranches, got ${config.priceBreakpoints[i].length}`
        )
      }
    }
  }

  // ===========================================================================
  // Private Helpers
  // ===========================================================================

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
// Utility Exports
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
  type SegmentConfig,
  validateSegments,
} from './utils/segments'
