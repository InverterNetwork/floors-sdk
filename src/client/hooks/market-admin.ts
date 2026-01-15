'use client'

import { useMutation, type UseMutationOptions, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address, TransactionReceipt } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import {
  MarketAdmin,
  type TMarketAdminParams,
  type TMarketAdminState,
  type TSetFeeParams,
} from '../../market-admin'

// =============================================================================
// Types
// =============================================================================

export type { TMarketAdminParams, TMarketAdminState, TSetFeeParams }

export type UseMarketAdminOptions = {
  /** Market/Floor contract address */
  marketAddress: Address
  /** Whether to auto-fetch market state on mount */
  autoFetch?: boolean
  /** Mutation options for openBuy */
  openBuyOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, void>, 'mutationFn'>
  /** Mutation options for closeBuy */
  closeBuyOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, void>, 'mutationFn'>
  /** Mutation options for openSell */
  openSellOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, void>, 'mutationFn'>
  /** Mutation options for closeSell */
  closeSellOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, void>, 'mutationFn'>
  /** Mutation options for setBuyFee */
  setBuyFeeOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, number>, 'mutationFn'>
  /** Mutation options for setSellFee */
  setSellFeeOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, number>, 'mutationFn'>
  /** Mutation options for raiseFloor */
  raiseFloorOptions?: Omit<UseMutationOptions<TransactionReceipt, Error, void>, 'mutationFn'>
}

// =============================================================================
// Hook
// =============================================================================

/**
 * @description Hook for administering Floor Markets
 * Provides mutations for opening/closing trading, setting fees, and floor elevation
 *
 * @example
 * ```tsx
 * const {
 *   marketState,
 *   openBuy,
 *   closeBuy,
 *   openSell,
 *   closeSell,
 *   setBuyFee,
 *   setSellFee,
 *   raiseFloor,
 *   isLoading,
 * } = useMarketAdmin({ marketAddress: '0x...' })
 *
 * // Toggle buy status
 * const handleToggleBuy = async () => {
 *   if (marketState?.isBuyOpen) {
 *     await closeBuy.mutateAsync()
 *   } else {
 *     await openBuy.mutateAsync()
 *   }
 * }
 * ```
 */
export function useMarketAdmin(options: UseMarketAdminOptions) {
  const { marketAddress, autoFetch = true } = options
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  /**
   * @description Get a configured MarketAdmin instance
   */
  const getMarketAdminInstance = useCallback((): MarketAdmin => {
    if (!publicClient) {
      throw new Error('Public client not available')
    }
    if (!walletClient) {
      throw new Error('Please connect your wallet')
    }

    return new MarketAdmin({
      address: marketAddress,
      publicClient,
      walletClient,
    })
  }, [publicClient, walletClient, marketAddress])

  /**
   * @description Get a read-only MarketAdmin instance (for queries)
   */
  const getReadOnlyInstance = useCallback((): MarketAdmin | null => {
    if (!publicClient) {
      return null
    }

    return new MarketAdmin({
      address: marketAddress,
      publicClient,
    })
  }, [publicClient, marketAddress])

  // ===========================================================================
  // Query - Market State
  // ===========================================================================

  const marketStateQuery = useQuery({
    queryKey: ['marketAdmin', 'state', marketAddress],
    queryFn: async (): Promise<TMarketAdminState> => {
      const instance = getReadOnlyInstance()
      if (!instance) {
        throw new Error('Public client not available')
      }
      return instance.getMarketState()
    },
    enabled: autoFetch && !!publicClient && !!marketAddress,
    staleTime: 30_000, // 30 seconds
  })

  // ===========================================================================
  // Mutations - Trading Status
  // ===========================================================================

  const openBuyMutation = useMutation({
    mutationFn: async (): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.openBuy()
    },
    ...options.openBuyOptions,
  })

  const closeBuyMutation = useMutation({
    mutationFn: async (): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.closeBuy()
    },
    ...options.closeBuyOptions,
  })

  const openSellMutation = useMutation({
    mutationFn: async (): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.openSell()
    },
    ...options.openSellOptions,
  })

  const closeSellMutation = useMutation({
    mutationFn: async (): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.closeSell()
    },
    ...options.closeSellOptions,
  })

  // ===========================================================================
  // Mutations - Fee Configuration
  // ===========================================================================

  const setBuyFeeMutation = useMutation({
    mutationFn: async (feeBps: number): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.setBuyFee({ feeBps })
    },
    ...options.setBuyFeeOptions,
  })

  const setSellFeeMutation = useMutation({
    mutationFn: async (feeBps: number): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.setSellFee({ feeBps })
    },
    ...options.setSellFeeOptions,
  })

  // ===========================================================================
  // Mutations - Floor Elevation
  // ===========================================================================

  const raiseFloorMutation = useMutation({
    mutationFn: async (): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.raiseFloor()
    },
    ...options.raiseFloorOptions,
  })

  // ===========================================================================
  // Loading State
  // ===========================================================================

  const isLoading =
    openBuyMutation.isPending ||
    closeBuyMutation.isPending ||
    openSellMutation.isPending ||
    closeSellMutation.isPending ||
    setBuyFeeMutation.isPending ||
    setSellFeeMutation.isPending ||
    raiseFloorMutation.isPending

  return {
    // Market state query
    marketState: marketStateQuery.data ?? null,
    isLoadingState: marketStateQuery.isLoading,
    stateError: marketStateQuery.error,
    refetchState: marketStateQuery.refetch,

    // Trading status mutations
    openBuy: openBuyMutation,
    closeBuy: closeBuyMutation,
    openSell: openSellMutation,
    closeSell: closeSellMutation,

    // Fee mutations
    setBuyFee: setBuyFeeMutation,
    setSellFee: setSellFeeMutation,

    // Floor elevation
    raiseFloor: raiseFloorMutation,

    // Combined loading state
    isLoading,

    // Individual loading states
    isOpeningBuy: openBuyMutation.isPending,
    isClosingBuy: closeBuyMutation.isPending,
    isOpeningSell: openSellMutation.isPending,
    isClosingSell: closeSellMutation.isPending,
    isSettingBuyFee: setBuyFeeMutation.isPending,
    isSettingSellFee: setSellFeeMutation.isPending,
    isRaisingFloor: raiseFloorMutation.isPending,
  }
}
