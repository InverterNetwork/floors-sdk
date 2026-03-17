'use client'

import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address, TransactionReceipt } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

// PresaleState is re-exported via TPresaleAdminSetStateParams
import {
  PresaleAdmin,
  type TPresaleAdminParams,
  type TPresaleAdminSetCapsParams,
  type TPresaleAdminSetCommissionParams,
  type TPresaleAdminSetCreditFacilityParams,
  type TPresaleAdminSetDecayDurationParams,
  type TPresaleAdminSetEndTimestampParams,
  type TPresaleAdminSetInitialMultiplierParams,
  type TPresaleAdminSetMerkleRootParams,
  type TPresaleAdminSetStartTimeParams,
  type TPresaleAdminSetStateParams,
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
  setStateOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TPresaleAdminSetStateParams>,
    'mutationFn'
  >
  /** Mutation options for setCaps */
  setCapsOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TPresaleAdminSetCapsParams>,
    'mutationFn'
  >
  /** Mutation options for setEndTimestamp */
  setEndTimestampOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TPresaleAdminSetEndTimestampParams>,
    'mutationFn'
  >
  /** Mutation options for setMerkleRoot */
  setMerkleRootOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TPresaleAdminSetMerkleRootParams>,
    'mutationFn'
  >
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
 *   setMerkleRoot,
 * } = usePresaleAdminConfig({ presaleAddress: '0x...' })
 *
 * // Transition to live
 * await goLive.mutateAsync()
 *
 * // Set merkle root for whitelist
 * await setMerkleRoot.mutateAsync('0x...')
 * ```
 */
export function usePresaleAdminConfig(options: UsePresaleAdminConfigOptions) {
  const { presaleAddress, autoFetch = true } = options
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const queryClient = useQueryClient()

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

  const stateQueryKey = ['presaleAdmin', 'state', presaleAddress] as const

  const setPresaleStateMutation = useMutation({
    mutationFn: async (params: TPresaleAdminSetStateParams): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setPresaleState(params)
    },
    onSuccess: async (_receipt, variables) => {
      // Optimistically update the cached state so the UI reflects the change
      // immediately — even if the RPC node hasn't caught up yet.
      queryClient.setQueryData<TPresaleAdminState>(stateQueryKey, (old) =>
        old ? { ...old, currentState: variables.state } : undefined
      )
      // Then refetch to sync the full on-chain state.
      await presaleStateQuery.refetch()
    },
    ...options.setStateOptions,
  })

  const goLiveMutation = useMutation({
    mutationFn: async (params?: TPresaleAdminParams): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.goLive(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
  })

  const closePresaleMutation = useMutation({
    mutationFn: async (params?: TPresaleAdminParams): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.closePresale(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
  })

  const setWhitelistPhaseMutation = useMutation({
    mutationFn: async (params?: TPresaleAdminParams): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setWhitelistPhase(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
  })

  // ===========================================================================
  // Mutations - Cap Configuration
  // ===========================================================================

  const setCapsMutation = useMutation({
    mutationFn: async (params: TPresaleAdminSetCapsParams): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setCaps(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
    ...options.setCapsOptions,
  })

  // ===========================================================================
  // Mutations - End Timestamp
  // ===========================================================================

  const setEndTimestampMutation = useMutation({
    mutationFn: async (params: TPresaleAdminSetEndTimestampParams): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setEndTimestamp(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
    ...options.setEndTimestampOptions,
  })

  // ===========================================================================
  // Mutations - Merkle Whitelist Management
  // ===========================================================================

  const setMerkleRootMutation = useMutation({
    mutationFn: async (params: TPresaleAdminSetMerkleRootParams): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setMerkleRoot(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
    ...options.setMerkleRootOptions,
  })

  // ===========================================================================
  // Mutations - Commission Configuration
  // ===========================================================================

  const setCommissionMutation = useMutation({
    mutationFn: async (params: TPresaleAdminSetCommissionParams): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setBaseCommissionAndPriceBreakpoints(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
  })

  // ===========================================================================
  // Mutations - Multiplier & Decay Configuration
  // ===========================================================================

  const setCreditFacilityMutation = useMutation({
    mutationFn: async (
      params: TPresaleAdminSetCreditFacilityParams
    ): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setCreditFacility(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
  })

  const setInitialMultiplierMutation = useMutation({
    mutationFn: async (
      params: TPresaleAdminSetInitialMultiplierParams
    ): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setInitialMultiplier(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
  })

  const setDecayDurationMutation = useMutation({
    mutationFn: async (
      params: TPresaleAdminSetDecayDurationParams
    ): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setDecayDuration(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
    },
  })

  const setStartTimeMutation = useMutation({
    mutationFn: async (params: TPresaleAdminSetStartTimeParams): Promise<TransactionReceipt> => {
      const admin = getPresaleAdminInstance()
      return admin.setStartTime(params)
    },
    onSuccess: async () => {
      await presaleStateQuery.refetch()
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
      return instance.isMerkleWhitelisted(address)
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
    setMerkleRootMutation.isPending ||
    setCommissionMutation.isPending ||
    setCreditFacilityMutation.isPending ||
    setInitialMultiplierMutation.isPending ||
    setDecayDurationMutation.isPending ||
    setStartTimeMutation.isPending

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

    // Merkle whitelist management
    setMerkleRoot: setMerkleRootMutation,
    checkWhitelist: checkWhitelistMutation,

    // Commission configuration
    setCommission: setCommissionMutation,

    // Multiplier & decay configuration
    setCreditFacility: setCreditFacilityMutation,
    setInitialMultiplier: setInitialMultiplierMutation,
    setDecayDuration: setDecayDurationMutation,
    setStartTime: setStartTimeMutation,

    // Combined loading state
    isLoading,

    // Individual loading states
    isSettingState: setPresaleStateMutation.isPending,
    isGoingLive: goLiveMutation.isPending,
    isClosingPresale: closePresaleMutation.isPending,
    isSettingWhitelistPhase: setWhitelistPhaseMutation.isPending,
    isSettingCaps: setCapsMutation.isPending,
    isSettingEndTimestamp: setEndTimestampMutation.isPending,
    isSettingMerkleRoot: setMerkleRootMutation.isPending,
    isSettingCommission: setCommissionMutation.isPending,
    isSettingCreditFacility: setCreditFacilityMutation.isPending,
    isSettingInitialMultiplier: setInitialMultiplierMutation.isPending,
    isSettingDecayDuration: setDecayDurationMutation.isPending,
    isSettingStartTime: setStartTimeMutation.isPending,
  }
}
