'use client'

import { useMutation, type UseMutationOptions, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address, TransactionReceipt } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import type { PresaleState } from '../../presale'
import {
  PresaleAdmin,
  type TPresaleAdminSetCapsParams,
  type TPresaleAdminSetCommissionParams,
  type TPresaleAdminState,
} from '../../presale-admin'

// =============================================================================
// Types
// =============================================================================

export type { TPresaleAdminState }

export type UsePresaleAdminConfigOptions = {
  /** Presale contract address */
  presaleAddress: Address
  /** Whether to auto-fetch presale state on mount */
  autoFetch?: boolean
  /** Mutation options for setPresaleState */
  setStateOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, PresaleState>, 'mutationFn'>
  /** Mutation options for setCaps */
  setCapsOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, Omit<TPresaleAdminSetCapsParams, 'lifecycle'>>,
    'mutationFn'
  >
  /** Mutation options for setEndTimestamp */
  setEndTimestampOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, bigint>, 'mutationFn'>
  /** Mutation options for whitelist operations */
  whitelistOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, Address[]>, 'mutationFn'>
}

// =============================================================================
// Hook
// =============================================================================

/**
 * @description Hook for administering Presale contracts
 * Provides mutations for state transitions, caps, whitelist management, etc.
 *
 * @example
 * ```tsx
 * const {
 *   presaleState,
 *   goLive,
 *   closePresale,
 *   setCaps,
 *   addToWhitelist,
 *   removeFromWhitelist,
 * } = usePresaleAdminConfig({ presaleAddress: '0x...' })
 *
 * // Transition to live
 * await goLive.mutateAsync()
 *
 * // Add addresses to whitelist
 * await addToWhitelist.mutateAsync(['0x...', '0x...'])
 * ```
 */
export function usePresaleAdminConfig(options: UsePresaleAdminConfigOptions) {
  const { presaleAddress, autoFetch = true } = options
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  /**
   * @description Get a configured PresaleAdmin instance
   */
  const getPresaleAdminInstance = useCallback((): PresaleAdmin => {
    if (!publicClient) {
      throw new Error('Public client not available')
    }
    if (!walletClient) {
      throw new Error('Please connect your wallet')
    }

    return new PresaleAdmin({
      address: presaleAddress,
      publicClient,
      walletClient,
    })
  }, [publicClient, walletClient, presaleAddress])

  /**
   * @description Get a read-only PresaleAdmin instance (for queries)
   */
  const getReadOnlyInstance = useCallback((): PresaleAdmin | null => {
    if (!publicClient) {
      return null
    }

    return new PresaleAdmin({
      address: presaleAddress,
      publicClient,
    })
  }, [publicClient, presaleAddress])

  // ===========================================================================
  // Query - Presale State
  // ===========================================================================

  const presaleStateQuery = useQuery({
    queryKey: ['presaleAdmin', 'state', presaleAddress],
    queryFn: async (): Promise<TPresaleAdminState> => {
      const instance = getReadOnlyInstance()
      if (!instance) {
        throw new Error('Public client not available')
      }
      return instance.getPresaleState()
    },
    enabled: autoFetch && !!publicClient && !!presaleAddress,
    staleTime: 30_000,
  })

  // ===========================================================================
  // Mutations - State Management
  // ===========================================================================

  const setPresaleStateMutation = useMutation({
    mutationFn: async (state: PresaleState): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setPresaleState({ state })
    },
    ...options.setStateOptions,
  })

  const goLiveMutation = useMutation({
    mutationFn: async (): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.goLive()
    },
  })

  const closePresaleMutation = useMutation({
    mutationFn: async (): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.closePresale()
    },
  })

  const setWhitelistPhaseMutation = useMutation({
    mutationFn: async (): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setWhitelistPhase()
    },
  })

  // ===========================================================================
  // Mutations - Cap Configuration
  // ===========================================================================

  const setCapsMutation = useMutation({
    mutationFn: async (
      params: Omit<TPresaleAdminSetCapsParams, 'lifecycle'>
    ): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setCaps(params)
    },
    ...options.setCapsOptions,
  })

  // ===========================================================================
  // Mutations - End Timestamp
  // ===========================================================================

  const setEndTimestampMutation = useMutation({
    mutationFn: async (timestamp: bigint): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setEndTimestamp({ timestamp })
    },
    ...options.setEndTimestampOptions,
  })

  // ===========================================================================
  // Mutations - Whitelist Management
  // ===========================================================================

  const addToWhitelistMutation = useMutation({
    mutationFn: async (addresses: Address[]): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.addToWhitelist({ addresses })
    },
    ...options.whitelistOptions,
  })

  const removeFromWhitelistMutation = useMutation({
    mutationFn: async (addresses: Address[]): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.removeFromWhitelist({ addresses })
    },
    ...options.whitelistOptions,
  })

  // ===========================================================================
  // Mutations - Commission Configuration
  // ===========================================================================

  const setCommissionMutation = useMutation({
    mutationFn: async (
      params: Omit<TPresaleAdminSetCommissionParams, 'lifecycle'>
    ): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setBaseCommissionAndPriceBreakpoints(params)
    },
  })

  // ===========================================================================
  // Query - Check Whitelist Status
  // ===========================================================================

  const checkWhitelistMutation = useMutation({
    mutationFn: async (address: Address): Promise<boolean> => {
      const instance = getReadOnlyInstance()
      if (!instance) {
        throw new Error('Public client not available')
      }
      return instance.isWhitelisted(address)
    },
  })

  // ===========================================================================
  // Loading State
  // ===========================================================================

  const isLoading =
    setPresaleStateMutation.isPending ||
    goLiveMutation.isPending ||
    closePresaleMutation.isPending ||
    setWhitelistPhaseMutation.isPending ||
    setCapsMutation.isPending ||
    setEndTimestampMutation.isPending ||
    addToWhitelistMutation.isPending ||
    removeFromWhitelistMutation.isPending ||
    setCommissionMutation.isPending

  return {
    // Presale state query
    presaleState: presaleStateQuery.data ?? null,
    isLoadingState: presaleStateQuery.isLoading,
    stateError: presaleStateQuery.error,
    refetchState: presaleStateQuery.refetch,

    // State management mutations
    setPresaleState: setPresaleStateMutation,
    goLive: goLiveMutation,
    closePresale: closePresaleMutation,
    setWhitelistPhase: setWhitelistPhaseMutation,

    // Cap configuration
    setCaps: setCapsMutation,

    // End timestamp
    setEndTimestamp: setEndTimestampMutation,

    // Whitelist management
    addToWhitelist: addToWhitelistMutation,
    removeFromWhitelist: removeFromWhitelistMutation,
    checkWhitelist: checkWhitelistMutation,

    // Commission configuration
    setCommission: setCommissionMutation,

    // Combined loading state
    isLoading,

    // Individual loading states
    isSettingState: setPresaleStateMutation.isPending,
    isGoingLive: goLiveMutation.isPending,
    isClosingPresale: closePresaleMutation.isPending,
    isSettingWhitelistPhase: setWhitelistPhaseMutation.isPending,
    isSettingCaps: setCapsMutation.isPending,
    isSettingEndTimestamp: setEndTimestampMutation.isPending,
    isAddingToWhitelist: addToWhitelistMutation.isPending,
    isRemovingFromWhitelist: removeFromWhitelistMutation.isPending,
    isSettingCommission: setCommissionMutation.isPending,
  }
}
