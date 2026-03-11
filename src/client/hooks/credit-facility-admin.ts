'use client'

import { useMutation, type UseMutationOptions, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address, TransactionReceipt } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import {
  CreditFacilityAdmin,
  type TBorrowForParams,
  type TBuyAndBorrowForParams,
  type TConsolidateLoansParams,
  type TCreditFacilityAdminState,
  type TRebalanceLoanParams,
  type TSetBorrowingFeeParams,
  type TSetLTVParams,
  type TSetMaxLeverageParams,
  type TTransferLoanParams,
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
  /** Mutation options for transferLoan */
  transferLoanOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TTransferLoanParams>,
    'mutationFn'
  >
  /** Mutation options for rebalanceLoan */
  rebalanceLoanOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TRebalanceLoanParams>,
    'mutationFn'
  >
  /** Mutation options for consolidateLoans */
  consolidateLoansOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TConsolidateLoansParams>,
    'mutationFn'
  >
  /** Mutation options for borrowFor */
  borrowForOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TBorrowForParams>,
    'mutationFn'
  >
  /** Mutation options for buyAndBorrowFor */
  buyAndBorrowForOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TBuyAndBorrowForParams>,
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
    onSuccess: async () => {
      await creditFacilityStateQuery.refetch()
    },
    ...options.setLTVOptions,
  })

  const setBorrowingFeeMutation = useMutation({
    mutationFn: async (params: TSetBorrowingFeeParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.setBorrowingFeeRate(params)
    },
    onSuccess: async () => {
      await creditFacilityStateQuery.refetch()
    },
    ...options.setBorrowingFeeOptions,
  })

  const setMaxLeverageMutation = useMutation({
    mutationFn: async (params: TSetMaxLeverageParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.setMaxLeverage(params)
    },
    onSuccess: async () => {
      await creditFacilityStateQuery.refetch()
    },
    ...options.setMaxLeverageOptions,
  })

  // ===========================================================================
  // Mutations - Loan Management
  // ===========================================================================

  const transferLoanMutation = useMutation({
    mutationFn: async (params: TTransferLoanParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.transferLoan(params)
    },
    onSuccess: async () => {
      await creditFacilityStateQuery.refetch()
    },
    ...options.transferLoanOptions,
  })

  const rebalanceLoanMutation = useMutation({
    mutationFn: async (params: TRebalanceLoanParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.rebalanceLoan(params)
    },
    onSuccess: async () => {
      await creditFacilityStateQuery.refetch()
    },
    ...options.rebalanceLoanOptions,
  })

  const consolidateLoansMutation = useMutation({
    mutationFn: async (params: TConsolidateLoansParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.consolidateLoans(params)
    },
    onSuccess: async () => {
      await creditFacilityStateQuery.refetch()
    },
    ...options.consolidateLoansOptions,
  })

  const borrowForMutation = useMutation({
    mutationFn: async (params: TBorrowForParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.borrowFor(params)
    },
    onSuccess: async () => {
      await creditFacilityStateQuery.refetch()
    },
    ...options.borrowForOptions,
  })

  const buyAndBorrowForMutation = useMutation({
    mutationFn: async (params: TBuyAndBorrowForParams): Promise<TransactionReceipt> => {
      const admin = getCreditFacilityAdminInstance()
      return admin.buyAndBorrowFor(params)
    },
    onSuccess: async () => {
      await creditFacilityStateQuery.refetch()
    },
    ...options.buyAndBorrowForOptions,
  })

  // ===========================================================================
  // Loading State
  // ===========================================================================

  const isLoading =
    setLTVMutation.isPending ||
    setBorrowingFeeMutation.isPending ||
    setMaxLeverageMutation.isPending ||
    transferLoanMutation.isPending ||
    rebalanceLoanMutation.isPending ||
    consolidateLoansMutation.isPending ||
    borrowForMutation.isPending ||
    buyAndBorrowForMutation.isPending

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
    transferLoan: transferLoanMutation,
    rebalanceLoan: rebalanceLoanMutation,
    consolidateLoans: consolidateLoansMutation,
    borrowFor: borrowForMutation,
    buyAndBorrowFor: buyAndBorrowForMutation,

    // Combined loading state
    isLoading,

    // Individual loading states
    isSettingLTV: setLTVMutation.isPending,
    isSettingBorrowingFee: setBorrowingFeeMutation.isPending,
    isSettingMaxLeverage: setMaxLeverageMutation.isPending,
    isTransferringLoan: transferLoanMutation.isPending,
    isRebalancingLoan: rebalanceLoanMutation.isPending,
    isConsolidatingLoans: consolidateLoansMutation.isPending,
    isBorrowingFor: borrowForMutation.isPending,
    isBuyingAndBorrowingFor: buyAndBorrowForMutation.isPending,
  }
}
