'use client'

import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { decodeEventLog } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import { Floor_v1, ModuleFactory_v1 } from '../../abis'
import {
  type ConfigureParams,
  type ConfigureResult,
  type CreditFacilityConfig,
  type FloorConfig,
  Launch,
  type LaunchConfig,
  type LaunchResult,
  type PresaleConfig,
  type StakingConfig,
  type TreasuryConfig,
} from '../../launch'
import { useFloors } from '../floors-context'

// =============================================================================
// Combined Result Types
// =============================================================================

/**
 * @description Result of creating and configuring a market in one flow
 */
export type CreateAndConfigureResult = {
  /** Result of market creation */
  launch: LaunchResult
  /** Result of market configuration (null if skipped) */
  configure: ConfigureResult | null
}

// =============================================================================
// Types
// =============================================================================

export type { ConfigureParams, ConfigureResult, LaunchConfig, LaunchResult }

/**
 * @description Form-friendly segment configuration
 * Uses the same structure as the UI form
 */
export type SegmentFormData = {
  initialPrice: bigint
  priceIncrease: bigint
  supplyPerStep: bigint
  numberOfSteps: number
}

/**
 * @description Form-friendly treasury recipient
 */
export type TreasuryRecipientFormData = {
  address: string
  shares: bigint
}

/**
 * @description Form-friendly presale configuration
 */
export type PresaleFormData = {
  enabled: boolean
  creditFacilityAddress: string
  maxLeverage: number
  baseCommissionBps: bigint[]
  endTimestamp: bigint
  globalIssuanceCap: bigint
  perAddressIssuanceCap: bigint
  priceBreakpoints: bigint[][]
  /** Initial fee multiplier in BPS (10000 = 1x, 20000 = 2x) */
  initialMultiplier: bigint
  /** Decay duration in seconds (0 = no decay) */
  decayDuration: bigint
}

/**
 * @description Form-friendly credit facility configuration
 */
export type CreditFacilityFormData = {
  enabled: boolean
  /** Loan-to-value ratio in basis points (e.g., 9900 = 99%) */
  loanToValueRatio: number
  /** Maximum leverage multiplier (e.g., 25) */
  maxLeverage: number
  /** Borrowing fee rate in basis points (e.g., 600 = 6%) */
  borrowingFeeRate: number
}

/**
 * @description Form-friendly staking configuration
 */
export type StakingFormData = {
  enabled: boolean
  /** Performance fee on harvested yield in basis points (e.g., 1000 = 10%) */
  performanceFeeBps: number
}

/**
 * @description Form-friendly configuration options for post-deployment setup
 */
export type ConfigurationFormData = {
  /** Grant minter role to Floor contract (required for buying) */
  grantMinterRole: boolean
  /** Open buy immediately after creation */
  openBuy: boolean
  /** Open sell immediately after creation */
  openSell: boolean
  /** Open public borrowing immediately after creation */
  openBorrow?: boolean
}

/**
 * @description Form-friendly issuance token configuration
 */
export type IssuanceTokenFormData = {
  mode: 'existing' | 'create'
  existingAddress: string
  newToken: {
    name: string
    symbol: string
    decimals: number
    maxSupply: bigint
  }
}

/**
 * @description Form data structure matching the create-market wizard
 */
export type LaunchFormData = {
  // Step 1: Tokens
  issuanceToken: IssuanceTokenFormData
  reserveTokenAddress: string

  // Step 2: Curve
  floorSegment: SegmentFormData
  premiumSegments: SegmentFormData[]

  // Step 3: Fees
  buyFeeBps: number
  sellFeeBps: number

  // Step 4: Treasury
  recipients: TreasuryRecipientFormData[]
  floorFeePercentage: number

  // Step 5: Credit Facility (Optional)
  creditFacility: CreditFacilityFormData

  // Step 6: Staking (Optional)
  staking: StakingFormData

  // Step 7: Presale (Optional)
  presale: PresaleFormData

  // Step 7: Configuration (post-deployment)
  configuration: ConfigurationFormData
}

/**
 * @description Parameters for creating a market from form data
 */
export type CreateMarketFromFormParams = {
  formData: LaunchFormData
  /** Override the floor factory address (uses context by default) */
  floorFactoryAddress?: Address
  /** Override the creator address (uses connected wallet by default) */
  creatorAddress?: Address
}

// =============================================================================
// Hook
// =============================================================================

export type UseLaunchOptions = {
  /** Mutation options for the create market operation */
  createOptions?: Omit<
    UseMutationOptions<LaunchResult, Error, CreateMarketFromFormParams>,
    'mutationFn'
  >
  /** Mutation options for the configure operation */
  configureOptions?: Omit<UseMutationOptions<ConfigureResult, Error, ConfigureParams>, 'mutationFn'>
  /** Mutation options for the combined create and configure operation */
  createAndConfigureOptions?: Omit<
    UseMutationOptions<CreateAndConfigureResult, Error, CreateMarketFromFormParams>,
    'mutationFn'
  >
}

/**
 * @description Hook for launching new Floor Markets
 * Provides mutations for creating and configuring markets
 *
 * @example
 * ```tsx
 * const { create, configure, isCreating } = useLaunch()
 *
 * const handleCreate = async () => {
 *   const result = await create.mutateAsync({ formData })
 *   console.log('Market created:', result.floorAddress)
 * }
 * ```
 */
export function useLaunch(options?: UseLaunchOptions) {
  const { config } = useFloors()
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  /**
   * @description Get a configured Launch instance
   */
  const getLaunchInstance = useCallback(
    (floorFactoryAddress?: Address): Launch => {
      if (!publicClient) {
        throw new Error('Public client not available')
      }
      if (!walletClient) {
        throw new Error('Please connect your wallet')
      }

      const factoryAddress = floorFactoryAddress ?? config.floorFactoryAddress
      if (!factoryAddress) {
        throw new Error('Floor factory address not configured')
      }

      return new Launch({
        floorFactoryAddress: factoryAddress,
        publicClient,
        walletClient,
      })
    },
    [publicClient, walletClient, config.floorFactoryAddress]
  )

  /**
   * @description Transform form data to SDK LaunchConfig
   */
  const transformFormData = useCallback(
    (formData: LaunchFormData, creatorAddress: Address): LaunchConfig => {
      // Validate issuance token address
      const issuanceTokenAddress = formData.issuanceToken.existingAddress as Address
      if (!issuanceTokenAddress || issuanceTokenAddress.length !== 42) {
        throw new Error('Issuance token address is required')
      }

      // Combine floor segment and premium segments
      const segments = [formData.floorSegment, ...formData.premiumSegments]

      const floorConfig: FloorConfig = {
        issuanceTokenAddress,
        reserveTokenAddress: formData.reserveTokenAddress as Address,
        segments,
        buyFeeBps: formData.buyFeeBps,
        sellFeeBps: formData.sellFeeBps,
      }

      const treasuryConfig: TreasuryConfig = {
        recipients: formData.recipients.map((r) => ({
          address: r.address as Address,
          shares: r.shares,
        })),
        floorFeePercentage: formData.floorFeePercentage,
        floorFeeTreasury: creatorAddress,
      }

      // Credit facility configuration (optional)
      let creditFacilityConfig: CreditFacilityConfig | undefined
      if (formData.creditFacility?.enabled) {
        creditFacilityConfig = {
          loanToValueRatio: formData.creditFacility.loanToValueRatio,
          maxLeverage: formData.creditFacility.maxLeverage,
          borrowingFeeRate: formData.creditFacility.borrowingFeeRate,
        }
      }

      // Presale configuration (optional)
      let presaleConfig: PresaleConfig | undefined
      if (formData.presale?.enabled) {
        presaleConfig = {
          creditFacilityAddress: formData.presale.creditFacilityAddress
            ? (formData.presale.creditFacilityAddress as Address)
            : undefined,
          baseCommissionBps: formData.presale.baseCommissionBps,
          endTimestamp: formData.presale.endTimestamp,
          globalIssuanceCap: formData.presale.globalIssuanceCap,
          perAddressIssuanceCap: formData.presale.perAddressIssuanceCap,
          priceBreakpoints: formData.presale.priceBreakpoints,
          initialMultiplier: formData.presale.initialMultiplier,
          decayDuration: formData.presale.decayDuration,
        }
      }

      // Staking configuration (optional)
      let stakingConfig: StakingConfig | undefined
      if (formData.staking?.enabled) {
        stakingConfig = {
          performanceFeeBps: formData.staking.performanceFeeBps,
        }
      }

      return {
        floor: floorConfig,
        initialAdmin: creatorAddress,
        treasury: treasuryConfig,
        creditFacility: creditFacilityConfig,
        presale: presaleConfig,
        staking: stakingConfig,
      }
    },
    []
  )

  /**
   * @description Create a new market from form data
   */
  const createMutation = useMutation({
    mutationFn: async (params: CreateMarketFromFormParams): Promise<LaunchResult> => {
      const creatorAddress = params.creatorAddress ?? address
      if (!creatorAddress) {
        throw new Error('Wallet not connected')
      }

      const launch = getLaunchInstance(params.floorFactoryAddress)
      const launchConfig = transformFormData(params.formData, creatorAddress)

      return launch.create(launchConfig)
    },
    ...options?.createOptions,
  })

  /**
   * @description Configure a deployed market with roles and permissions
   */
  const configureMutation = useMutation({
    mutationFn: async (params: ConfigureParams): Promise<ConfigureResult> => {
      const launch = getLaunchInstance()
      return launch.configure(params)
    },
    ...options?.configureOptions,
  })

  /**
   * @description Create and configure a market in one flow
   * Reads module addresses from the deployed Floor contract
   */
  const createAndConfigureMutation = useMutation({
    mutationFn: async (params: CreateMarketFromFormParams): Promise<CreateAndConfigureResult> => {
      const creatorAddress = params.creatorAddress ?? address
      if (!creatorAddress) {
        throw new Error('Wallet not connected')
      }

      if (!publicClient) {
        throw new Error('Public client not available')
      }

      const launch = getLaunchInstance(params.floorFactoryAddress)
      const launchConfig = transformFormData(params.formData, creatorAddress)

      // Step 1: Create the market
      const launchResult = await launch.create(launchConfig)

      // Check if configuration is needed
      const configOptions = params.formData.configuration
      const needsConfiguration =
        configOptions?.grantMinterRole !== false ||
        configOptions?.openBuy !== false ||
        configOptions?.openSell === true ||
        configOptions?.openBorrow === true

      if (!needsConfiguration) {
        return { launch: launchResult, configure: null }
      }

      // Step 2: Read module addresses from deployed Floor contract
      const floorAddress = launchResult.floorAddress as Address
      const [authorizerAddress, issuanceTokenAddress] = await Promise.all([
        publicClient.readContract({
          address: floorAddress,
          abi: Floor_v1,
          functionName: 'authorizer',
        }) as Promise<Address>,
        publicClient.readContract({
          address: floorAddress,
          abi: Floor_v1,
          functionName: 'getIssuanceToken',
        }) as Promise<Address>,
      ])

      // Get transaction forwarder address from config
      const transactionForwarderAddress = config.transactionForwarderAddress
      if (!transactionForwarderAddress) {
        throw new Error('Transaction forwarder address not configured')
      }

      // Determine credit facility and presale addresses if enabled
      let creditFacilityAddress: Address | undefined
      let presaleAddress: Address | undefined

      // Only fetch receipt if we need to find module addresses
      if (params.formData.creditFacility?.enabled || params.formData.presale?.enabled) {
        // Fetch the transaction receipt to find module addresses from ModuleCreated events
        const receipt = await publicClient.getTransactionReceipt({
          hash: launchResult.transactionHash as `0x${string}`,
        })

        // Parse ModuleCreated events to find credit facility and presale
        for (const log of receipt.logs) {
          try {
            // Try to decode as ModuleCreated event
            const decoded = decodeEventLog({
              abi: ModuleFactory_v1,
              eventName: 'ModuleCreated',
              data: log.data,
              topics: log.topics,
            })

            // Check module type by looking at metadata title
            const metadata = decoded.args.metadata_ as { title?: string }
            const title = metadata?.title?.toLowerCase() || ''

            if (title.includes('creditfacility') && !creditFacilityAddress) {
              creditFacilityAddress = decoded.args.module_ as Address
            } else if (title.includes('presale') && !presaleAddress) {
              presaleAddress = decoded.args.module_ as Address
            }

            // Break early if we found both
            if (creditFacilityAddress && presaleAddress) {
              break
            }
          } catch {
            // Not a ModuleCreated event, skip
          }
        }
      }

      // Step 3: Configure the market
      const configureResult = await launch.configure({
        floorAddress,
        authorizerAddress,
        issuanceTokenAddress,
        transactionForwarderAddress,
        creditFacilityAddress,
        presaleAddress,
        grantMinterRole: configOptions?.grantMinterRole ?? true,
        openBuy: configOptions?.openBuy ?? true,
        openSell: configOptions?.openSell ?? false,
        openBorrow: configOptions?.openBorrow ?? false,
      })

      return { launch: launchResult, configure: configureResult }
    },
    ...options?.createAndConfigureOptions,
  })

  return {
    /** Mutation for creating a new market */
    create: createMutation,
    /** Mutation for configuring a deployed market */
    configure: configureMutation,
    /** Mutation for creating and configuring a market in one flow */
    createAndConfigure: createAndConfigureMutation,
    /** Whether a market is being created */
    isCreating: createMutation.isPending,
    /** Whether a market is being configured */
    isConfiguring: configureMutation.isPending,
    /** Whether create and configure is in progress */
    isCreatingAndConfiguring: createAndConfigureMutation.isPending,
    /** The created market result (if successful) */
    createdMarket: createMutation.data ?? createAndConfigureMutation.data?.launch ?? null,
    /** The configure result (if successful) */
    configureResult: configureMutation.data ?? createAndConfigureMutation.data?.configure ?? null,
    /** Error from create mutation */
    createError: createMutation.error,
    /** Error from configure mutation */
    configureError: configureMutation.error,
    /** Error from create and configure mutation */
    createAndConfigureError: createAndConfigureMutation.error,
    /** Reset all mutations */
    reset: () => {
      createMutation.reset()
      configureMutation.reset()
      createAndConfigureMutation.reset()
    },
  }
}
