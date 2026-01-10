'use client'

import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import {
  type ConfigureParams,
  type ConfigureResult,
  type FloorConfig,
  Launch,
  type LaunchConfig,
  type LaunchResult,
  type PresaleConfig,
  type TreasuryConfig,
} from '../../launch'
import { useFloors } from '../floors-context'

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
  baseCommissionBps: bigint[]
  endTimestamp: bigint
  globalIssuanceCap: bigint
  perAddressIssuanceCap: bigint
  priceBreakpoints: bigint[][]
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

  // Step 5: Presale (Optional)
  presale: PresaleFormData
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

      let presaleConfig: PresaleConfig | undefined
      if (formData.presale.enabled) {
        presaleConfig = {
          creditFacilityAddress: formData.presale.creditFacilityAddress
            ? (formData.presale.creditFacilityAddress as Address)
            : undefined,
          baseCommissionBps: formData.presale.baseCommissionBps,
          endTimestamp: formData.presale.endTimestamp,
          globalIssuanceCap: formData.presale.globalIssuanceCap,
          perAddressIssuanceCap: formData.presale.perAddressIssuanceCap,
          priceBreakpoints: formData.presale.priceBreakpoints,
        }
      }

      return {
        floor: floorConfig,
        initialAdmin: creatorAddress,
        treasury: treasuryConfig,
        presale: presaleConfig,
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

  return {
    /** Mutation for creating a new market */
    create: createMutation,
    /** Mutation for configuring a deployed market */
    configure: configureMutation,
    /** Whether a market is being created */
    isCreating: createMutation.isPending,
    /** Whether a market is being configured */
    isConfiguring: configureMutation.isPending,
    /** The created market result (if successful) */
    createdMarket: createMutation.data ?? null,
    /** The configure result (if successful) */
    configureResult: configureMutation.data ?? null,
    /** Error from create mutation */
    createError: createMutation.error,
    /** Error from configure mutation */
    configureError: configureMutation.error,
    /** Reset both mutations */
    reset: () => {
      createMutation.reset()
      configureMutation.reset()
    },
  }
}
