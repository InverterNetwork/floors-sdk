'use client'

import { useMutation, type UseMutationOptions, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address, TransactionReceipt } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import {
  CreditFacilityAdmin,
  type TCreditFacilityAdminState,
  type TSetBorrowingFeeParams,
  type TSetLTVParams,
  type TSetMaxLeverageParams,
} from '../../credit-facility-admin'

// =============================================================================
// Types
// =============================================================================

export type { TCreditFacilityAdminState }

export type UseCreditFacilityAdminOptions = {
  /** Credit Facility contract address */
  creditFacilityAddress: Address
  /** Whether to auto-fetch state on mount */
  autoFetch?: boolean
  /** Mutation options for setLTV */
  setLTVOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, TSetLTVParams>, 'mutationFn'>
  /** Mutation options for setBorrowingFeeRate */
  setBorrowingFeeOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TSetBorrowingFeeParams>,
    'mutationFn'
  >
  /** Mutation options for setMaxLeverage */
  setMaxLeverageOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TSetMaxLeverageParams>,
    'mutationFn'
  >
}

// =============================================================================
// Hook
// =============================================================================

/**
 * @description Hook for administering Credit Facility contracts
 * Provides mutations for LTV, borrowing fee, and max leverage configuration
 *
 * @example
 * ```tsx
 * const {
 *   creditFacilityState,
 *   setLTV,
 *   setBorrowingFee,
 *   setMaxLeverage,
 * } = useCreditFacilityAdmin({ creditFacilityAddress: '0x...' })
 *
 * // Update LTV to 95%
 * await setLTV.mutateAsync(9500)
 * ```
 */
export function useCreditFacilityAdmin(options: UseCreditFacilityAdminOptions) {
  const { creditFacilityAddress, autoFetch = true } = options
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  /**
   * @description Get a configured CreditFacilityAdmin instance
   */
  const getCreditFacilityAdminInstance = useCallback((): CreditFacilityAdmin => {
    if (!publicClient) {
      throw new Error('Public client not available')
    }
    if (!walletClient) {
      throw new Error('Please connect your wallet')
    }

    return new CreditFacilityAdmin({
      address: creditFacilityAddress,
      publicClient,
      walletClient,
    })
  }, [publicClient, walletClient, creditFacilityAddress])

  /**
   * @description Get a read-only CreditFacilityAdmin instance (for queries)
   */
  const getReadOnlyInstance = useCallback((): CreditFacilityAdmin | null => {
    if (!publicClient) {
      return null
    }

    return new CreditFacilityAdmin({
      address: creditFacilityAddress,
      publicClient,
    })
  }, [publicClient, creditFacilityAddress])

  // ===========================================================================
  // Query - Credit Facility State
  // ===========================================================================

  const creditFacilityStateQuery = useQuery({
    queryKey: ['creditFacilityAdmin', 'state', creditFacilityAddress],
    queryFn: async (): Promise<TCreditFacilityAdminState> => {
      const instance = getReadOnlyInstance()
      if (!instance) {
        throw new Error('Public client not available')
      }
      return instance.getCreditFacilityState()
    },
    enabled: autoFetch && !!publicClient && !!creditFacilityAddress,
    staleTime: 30_000,
  })

  // ===========================================================================
  // Mutations
  // ===========================================================================

  const setLTVMutation = useMutation({
    mutationFn: async (params: TSetLTVParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.setLoanToValueRatio(params)
    },
    ...options.setLTVOptions,
  })

  const setBorrowingFeeMutation = useMutation({
    mutationFn: async (params: TSetBorrowingFeeParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.setBorrowingFeeRate(params)
    },
    ...options.setBorrowingFeeOptions,
  })

  const setMaxLeverageMutation = useMutation({
    mutationFn: async (params: TSetMaxLeverageParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.setMaxLeverage(params)
    },
    ...options.setMaxLeverageOptions,
  })

  // ===========================================================================
  // Loading State
  // ===========================================================================

  const isLoading =
    setLTVMutation.isPending ||
    setBorrowingFeeMutation.isPending ||
    setMaxLeverageMutation.isPending

  return {
    // Credit facility state query
    creditFacilityState: creditFacilityStateQuery.data ?? null,
    isLoadingState: creditFacilityStateQuery.isLoading,
    stateError: creditFacilityStateQuery.error,
    refetchState: creditFacilityStateQuery.refetch,

    // Mutations
    setLTV: setLTVMutation,
    setBorrowingFee: setBorrowingFeeMutation,
    setMaxLeverage: setMaxLeverageMutation,

    // Combined loading state
    isLoading,

    // Individual loading states
    isSettingLTV: setLTVMutation.isPending,
    isSettingBorrowingFee: setBorrowingFeeMutation.isPending,
    isSettingMaxLeverage: setMaxLeverageMutation.isPending,
  }
}
