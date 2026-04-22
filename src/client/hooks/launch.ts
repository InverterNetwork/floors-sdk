'use client'

import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import type { Address } from 'viem'
import { decodeEventLog } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import { Floor_v1, ModuleFactory_v1 } from '../../abis'
import {
  type ConfigureParams,
  type ConfigureResult,
  Launch,
  type LaunchConfig,
  type LaunchResult,
} from '../../launch'
import type { CreateMarketFromFormParams, LaunchFormData } from '../../schemas/launch.schema'
import { transformLaunchFormDataToLaunchConfig } from '../../utils/segments'
import { useFloors } from '../floors-context'

export type {
  ConfigurationFormData,
  CreateMarketFromFormParams,
  CreditFacilityFormData,
  IssuanceTokenFormData,
  LaunchFormData,
  PresaleFormData,
  SegmentConfig,
  StakingFormData,
  TreasuryRecipientFormData,
} from '../../schemas/launch.schema'
export { transformLaunchFormDataToLaunchConfig } from '../../utils/segments'

// =============================================================================
// Transaction Progress Types
// =============================================================================

export type TransactionProgressStatus =
  | 'waiting'
  | 'pending'
  | 'confirming'
  | 'confirmed'
  | 'failed'

export type TransactionStepId = 'create-floor' | 'configure-market'

export interface TransactionStep {
  id: TransactionStepId
  label: string
  description?: string
  status: TransactionProgressStatus
  txHash?: string
  error?: string
}

export interface TransactionProgress {
  steps: TransactionStep[]
  currentStepId?: TransactionStepId
  isComplete: boolean
  hasError: boolean
}

// =============================================================================
// Combined Result Types
// =============================================================================

/**
 * @description Result of creating and configuring a market in one flow
 */
export type CreateAndConfigureResult = {
  /** Result of market creation */
  launch: LaunchResult
  /** Result of market configuration (null if skipped or failed) */
  configure: ConfigureResult | null
  /** Error that occurred during configuration (create succeeded but configure failed) */
  configureError?: string
}

type ModuleAddressExtractionOptions = {
  needsCreditFacility?: boolean
  needsPresale?: boolean
  needsStaking?: boolean
  needsStrategy?: boolean
}

type ModuleAddressExtractionResult = {
  creditFacilityAddress?: Address
  presaleAddress?: Address
  stakingManagerAddress?: Address
  strategyAddress?: Address
}

type ReceiptLogLike = {
  data: `0x${string}`
  topics: readonly `0x${string}`[]
}

export function extractModuleAddressesFromLogs(
  logs: readonly ReceiptLogLike[],
  options: ModuleAddressExtractionOptions
): ModuleAddressExtractionResult {
  const result: ModuleAddressExtractionResult = {}

  for (const log of logs) {
    if (log.topics.length === 0) continue

    try {
      const decoded = decodeEventLog({
        abi: ModuleFactory_v1,
        eventName: 'ModuleCreated',
        data: log.data,
        topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
      })

      const metadata = decoded.args.metadata_ as { title?: string }
      const title = metadata?.title?.toLowerCase() || ''

      if (title.includes('creditfacility') && !result.creditFacilityAddress) {
        result.creditFacilityAddress = decoded.args.module_ as Address
      } else if (title.includes('presale') && !result.presaleAddress) {
        result.presaleAddress = decoded.args.module_ as Address
      } else if (title.includes('stakingmanager') && !result.stakingManagerAddress) {
        result.stakingManagerAddress = decoded.args.module_ as Address
      } else if (title.includes('strategy') && !result.strategyAddress) {
        result.strategyAddress = decoded.args.module_ as Address
      }

      const hasCreditFacility =
        !options.needsCreditFacility || Boolean(result.creditFacilityAddress)
      const hasPresale = !options.needsPresale || Boolean(result.presaleAddress)
      const hasStaking = !options.needsStaking || Boolean(result.stakingManagerAddress)
      const hasStrategy = !options.needsStrategy || Boolean(result.strategyAddress)
      if (hasCreditFacility && hasPresale && hasStaking && hasStrategy) {
        break
      }
    } catch {
      // Ignore non-ModuleCreated logs.
    }
  }

  return result
}

// =============================================================================
// Types
// =============================================================================

export type { ConfigureParams, ConfigureResult, LaunchConfig, LaunchResult }

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
  /** Callback for transaction progress updates */
  onProgress?: (progress: TransactionProgress) => void
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

  const transformFormData = useCallback(
    (formData: LaunchFormData, creatorAddress: Address): LaunchConfig =>
      transformLaunchFormDataToLaunchConfig(formData, creatorAddress),
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
  // State for tracking transaction progress
  const [transactionProgress, setTransactionProgress] = useState<TransactionProgress | null>(null)

  const createAndConfigureMutation = useMutation({
    mutationFn: async (params: CreateMarketFromFormParams): Promise<CreateAndConfigureResult> => {
      const creatorAddress = params.creatorAddress ?? address
      if (!creatorAddress) {
        throw new Error('Wallet not connected')
      }

      if (!publicClient) {
        throw new Error('Public client not available')
      }
      if (!walletClient) {
        throw new Error('Please connect your wallet')
      }

      // Helper to report progress
      const reportProgress = (steps: TransactionStep[], currentStepId?: TransactionStepId) => {
        const progress: TransactionProgress = {
          steps,
          currentStepId,
          isComplete: steps.every((s) => s.status === 'confirmed'),
          hasError: steps.some((s) => s.status === 'failed'),
        }
        setTransactionProgress(progress)
        options?.onProgress?.(progress)
      }

      // Initialize steps based on form data. Staking always bundles a fresh
      // TestnetStrategy into createFloor — strategies are exclusive per market.
      const needsStaking = Boolean(params.formData.staking?.enabled)
      const needsConfiguration =
        params.formData.configuration?.grantMinterRole !== false ||
        params.formData.configuration?.openBuy !== false ||
        params.formData.configuration?.openSell === true ||
        params.formData.configuration?.openBorrow === true

      const steps: TransactionStep[] = [
        {
          id: 'create-floor',
          label: needsStaking ? 'Deploy Floor & Yield Strategy' : 'Deploy Floor Contract',
          description: needsStaking
            ? 'Creating the Floor, modules, and a bundled TestnetStrategy'
            : 'Creating the base Floor contract with bonding curve',
          status: 'pending' as const,
        },
      ]

      if (needsConfiguration) {
        steps.push({
          id: 'configure-market',
          label: needsStaking ? 'Configure Market & Register Strategy' : 'Configure Market',
          description: needsStaking
            ? 'Setting up roles, permissions, and registering strategy'
            : 'Setting up roles, permissions, and modules',
          status: 'waiting' as const,
        })
      }

      reportProgress(steps, 'create-floor')

      const launch = getLaunchInstance(params.floorFactoryAddress)
      const launchConfig = transformFormData(params.formData, creatorAddress)

      let launchResult: LaunchResult | null = null

      try {
        // Step 1: Create the market
        launchResult = await launch.create(launchConfig)

        // Update create-floor step to confirmed
        const createFloorStep = steps.find((s) => s.id === 'create-floor')
        if (createFloorStep) {
          createFloorStep.status = 'confirmed'
          createFloorStep.txHash = launchResult.transactionHash
        }

        // Check if configuration is needed
        const configOptions = params.formData.configuration
        if (!needsConfiguration) {
          reportProgress(steps)
          return { launch: launchResult, configure: null }
        }

        // Require forwarder — fail explicitly instead of silently skipping
        const transactionForwarderAddress = config.transactionForwarderAddress
        if (!transactionForwarderAddress) {
          const configureStep = steps.find((s) => s.id === 'configure-market')
          if (configureStep) {
            configureStep.status = 'failed'
            configureStep.error = 'TransactionForwarder not configured'
          }
          reportProgress(steps)
          return {
            launch: launchResult,
            configure: null,
            configureError:
              'TransactionForwarder is not configured. Market was created but roles and permissions were not set up. Complete configuration from the admin panel.',
          }
        }

        // Read contract data for configuration
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

        // All optional modules — including the bundled TestnetStrategy — are
        // created inside createFloor, so a single receipt read is enough.
        let creditFacilityAddress: Address | undefined
        let presaleAddress: Address | undefined
        let stakingManagerAddress: Address | undefined
        let bundledStrategyAddress: Address | undefined

        if (
          params.formData.creditFacility?.enabled ||
          params.formData.presale?.enabled ||
          needsStaking
        ) {
          const receipt = await publicClient.getTransactionReceipt({
            hash: launchResult.transactionHash as `0x${string}`,
          })

          const extracted = extractModuleAddressesFromLogs(receipt.logs, {
            needsCreditFacility: params.formData.creditFacility?.enabled,
            needsPresale: params.formData.presale?.enabled,
            needsStaking,
            needsStrategy: needsStaking,
          })
          creditFacilityAddress = extracted.creditFacilityAddress
          presaleAddress = extracted.presaleAddress
          stakingManagerAddress = extracted.stakingManagerAddress
          bundledStrategyAddress = extracted.strategyAddress
        }

        if (needsStaking && !bundledStrategyAddress) {
          throw new Error(
            'Bundled TestnetStrategy address not found in createFloor logs. ' +
              'The strategy module config may not have been included in the launch tx.'
          )
        }

        const strategyAddresses = bundledStrategyAddress ? [bundledStrategyAddress] : undefined

        // Update configure-market step to pending
        const configureStep = steps.find((s) => s.id === 'configure-market')
        if (configureStep) {
          configureStep.status = 'pending'
        }
        reportProgress(steps, 'configure-market')

        // Step 3: Configure the market
        const configureResult = await launch.configure({
          floorAddress,
          authorizerAddress,
          issuanceTokenAddress,
          transactionForwarderAddress,
          creditFacilityAddress,
          presaleAddress,
          stakingManagerAddress,
          grantMinterRole: configOptions?.grantMinterRole ?? true,
          openBuy: configOptions?.openBuy ?? true,
          openSell: configOptions?.openSell ?? false,
          openBorrow: configOptions?.openBorrow ?? false,
          openStaking: params.formData.staking?.enabled ?? false,
          strategyAddresses,
        })

        // Update configure step to confirmed
        if (configureStep) {
          configureStep.status = 'confirmed'
          configureStep.txHash = configureResult.transactionHash
        }

        reportProgress(steps)
        return { launch: launchResult, configure: configureResult }
      } catch (configError) {
        // Mark current step as failed
        const currentStep = steps.find((s) => s.status === 'pending' || s.status === 'confirming')
        if (currentStep) {
          currentStep.status = 'failed'
          currentStep.error = configError instanceof Error ? configError.message : 'Unknown error'
        }
        reportProgress(steps)

        // If launch failed, rethrow to let the mutation error handler deal with it
        if (!launchResult) {
          throw configError
        }

        // Create succeeded but configure failed — return create result with error
        return {
          launch: launchResult,
          configure: null,
          configureError:
            configError instanceof Error
              ? configError.message
              : 'Configuration failed. Complete setup from the admin panel.',
        }
      }
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
    /** Current transaction progress */
    transactionProgress,
    /** Reset all mutations */
    reset: () => {
      createMutation.reset()
      configureMutation.reset()
      createAndConfigureMutation.reset()
      setTransactionProgress(null)
    },
  }
}
