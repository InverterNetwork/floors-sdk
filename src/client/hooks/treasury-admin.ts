'use client'

import { useMutation, type UseMutationOptions, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address, TransactionReceipt } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import {
  TreasuryAdmin,
  type TTreasuryAdminState,
  type TTreasuryRecipient,
} from '../../treasury-admin'

// =============================================================================
// Types
// =============================================================================

export type { TTreasuryAdminState, TTreasuryRecipient }

export type UseTreasuryAdminOptions = {
  /** SplitterTreasury contract address */
  treasuryAddress: Address
  /** Whether to auto-fetch state on mount */
  autoFetch?: boolean
  /** Mutation options for setRecipients */
  setRecipientsOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TTreasuryRecipient[]>,
    'mutationFn'
  >
  /** Mutation options for setFloorFeePercentage */
  setFloorFeePercentageOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, number>,
    'mutationFn'
  >
  /** Mutation options for setFloorFeeTreasury */
  setFloorFeeTreasuryOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, Address>,
    'mutationFn'
  >
}

// =============================================================================
// Hook
// =============================================================================

/**
 * @description Hook for administering SplitterTreasury contracts
 * Provides mutations for recipients, floor fee percentage, and treasury address
 *
 * @example
 * ```tsx
 * const {
 *   treasuryState,
 *   setRecipients,
 *   setFloorFeePercentage,
 *   setFloorFeeTreasury,
 * } = useTreasuryAdmin({ treasuryAddress: '0x...' })
 *
 * // Update recipients
 * await setRecipients.mutateAsync([
 *   { address: '0x...', shares: BigInt(7000) },
 *   { address: '0x...', shares: BigInt(3000) },
 * ])
 * ```
 */
export function useTreasuryAdmin(options: UseTreasuryAdminOptions) {
  const { treasuryAddress, autoFetch = true } = options
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  /**
   * @description Get a configured TreasuryAdmin instance
   */
  const getTreasuryAdminInstance = useCallback((): TreasuryAdmin => {
    if (!publicClient) {
      throw new Error('Public client not available')
    }
    if (!walletClient) {
      throw new Error('Please connect your wallet')
    }

    return new TreasuryAdmin({
      address: treasuryAddress,
      publicClient,
      walletClient,
    })
  }, [publicClient, walletClient, treasuryAddress])

  /**
   * @description Get a read-only TreasuryAdmin instance (for queries)
   */
  const getReadOnlyInstance = useCallback((): TreasuryAdmin | null => {
    if (!publicClient) {
      return null
    }

    return new TreasuryAdmin({
      address: treasuryAddress,
      publicClient,
    })
  }, [publicClient, treasuryAddress])

  // ===========================================================================
  // Query - Treasury State
  // ===========================================================================

  const treasuryStateQuery = useQuery({
    queryKey: ['treasuryAdmin', 'state', treasuryAddress],
    queryFn: async (): Promise<TTreasuryAdminState> => {
      const instance = getReadOnlyInstance()
      if (!instance) {
        throw new Error('Public client not available')
      }
      return instance.getTreasuryState()
    },
    enabled: autoFetch && !!publicClient && !!treasuryAddress,
    staleTime: 30_000,
  })

  // ===========================================================================
  // Mutations
  // ===========================================================================

  const setRecipientsMutation = useMutation({
    mutationFn: async (recipients: TTreasuryRecipient[]): Promise<TransactionReceipt> => {
      const admin = getTreasuryAdminInstance()
      return admin.setRecipients({ recipients })
    },
    ...options.setRecipientsOptions,
  })

  const setFloorFeePercentageMutation = useMutation({
    mutationFn: async (percentageBps: number): Promise<TransactionReceipt> => {
      const admin = getTreasuryAdminInstance()
      return admin.setFloorFeePercentage({ percentageBps })
    },
    ...options.setFloorFeePercentageOptions,
  })

  const setFloorFeeTreasuryMutation = useMutation({
    mutationFn: async (treasuryAddressParam: Address): Promise<TransactionReceipt> => {
      const admin = getTreasuryAdminInstance()
      return admin.setFloorFeeTreasury({ treasuryAddress: treasuryAddressParam })
    },
    ...options.setFloorFeeTreasuryOptions,
  })

  // ===========================================================================
  // Loading State
  // ===========================================================================

  const isLoading =
    setRecipientsMutation.isPending ||
    setFloorFeePercentageMutation.isPending ||
    setFloorFeeTreasuryMutation.isPending

  return {
    // Treasury state query
    treasuryState: treasuryStateQuery.data ?? null,
    isLoadingState: treasuryStateQuery.isLoading,
    stateError: treasuryStateQuery.error,
    refetchState: treasuryStateQuery.refetch,

    // Mutations
    setRecipients: setRecipientsMutation,
    setFloorFeePercentage: setFloorFeePercentageMutation,
    setFloorFeeTreasury: setFloorFeeTreasuryMutation,

    // Combined loading state
    isLoading,

    // Individual loading states
    isSettingRecipients: setRecipientsMutation.isPending,
    isSettingFloorFeePercentage: setFloorFeePercentageMutation.isPending,
    isSettingFloorFeeTreasury: setFloorFeeTreasuryMutation.isPending,
  }
}
