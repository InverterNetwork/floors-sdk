'use client'

import { useMutation, type UseMutationOptions, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address, TransactionReceipt } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import {
  MarketAdmin,
  type TApproveCollateralParams,
  type TDepositCollateralParams,
  type TFloorIncreasedEvent,
  type TMarketAdminParams,
  type TMarketAdminState,
  type TRaiseFloorContext,
  type TRaiseFloorParams,
  type TReconfigureSegmentsParams,
  type TSetFeeParams,
  type TSetVirtualCollateralSupplyParams,
  type TWithdrawCollateralParams,
} from '../../market-admin'

// =============================================================================
// Types
// =============================================================================

export { MarketAdmin }
export type {
  TFloorIncreasedEvent,
  TMarketAdminParams,
  TMarketAdminState,
  TRaiseFloorContext,
  TSetFeeParams,
}

export type UseMarketAdminOptions = {
  /** Market/Floor contract address */
  marketAddress: Address
  /** Whether to auto-fetch market state on mount */
  autoFetch?: boolean
  /** Mutation options for openBuy */
  openBuyOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TMarketAdminParams | undefined>,
    'mutationFn'
  >
  /** Mutation options for closeBuy */
  closeBuyOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TMarketAdminParams | undefined>,
    'mutationFn'
  >
  /** Mutation options for openSell */
  openSellOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TMarketAdminParams | undefined>,
    'mutationFn'
  >
  /** Mutation options for closeSell */
  closeSellOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TMarketAdminParams | undefined>,
    'mutationFn'
  >
  /** Mutation options for setBuyFee */
  setBuyFeeOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TSetFeeParams>,
    'mutationFn'
  >
  /** Mutation options for setSellFee */
  setSellFeeOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TSetFeeParams>,
    'mutationFn'
  >
  /** Mutation options for approveCollateral */
  approveCollateralOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TApproveCollateralParams>,
    'mutationFn'
  >
  /** Mutation options for raiseFloor */
  raiseFloorOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TRaiseFloorParams>,
    'mutationFn'
  >
  /** Mutation options for reconfigureSegments */
  reconfigureSegmentsOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TReconfigureSegmentsParams>,
    'mutationFn'
  >
  /** Mutation options for setVirtualCollateralSupply */
  setVirtualCollateralSupplyOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TSetVirtualCollateralSupplyParams>,
    'mutationFn'
  >
  /** Mutation options for withdrawCollateralTo */
  withdrawCollateralToOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TWithdrawCollateralParams>,
    'mutationFn'
  >
  /** Mutation options for depositCollateralFrom */
  depositCollateralFromOptions?: Omit<
    UseMutationOptions<TransactionReceipt, Error, TDepositCollateralParams>,
    'mutationFn'
  >
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
  const { address: walletAddress } = useAccount()

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
  // Query - Raise Floor Context (balance, allowance, last event)
  // ===========================================================================

  const raiseFloorContextQuery = useQuery({
    queryKey: ['marketAdmin', 'raiseFloorContext', marketAddress, walletAddress],
    queryFn: async (): Promise<TRaiseFloorContext> => {
      const instance = getReadOnlyInstance()
      if (!instance || !walletAddress) {
        throw new Error('Public client or wallet not available')
      }
      return instance.getRaiseFloorContext(walletAddress)
    },
    enabled: autoFetch && !!publicClient && !!marketAddress && !!walletAddress,
    staleTime: 30_000,
  })

  // ===========================================================================
  // Mutations - Collateral Approval
  // ===========================================================================

  const approveCollateralMutation = useMutation({
    mutationFn: async (params: TApproveCollateralParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.approveCollateral(params)
    },
    onSuccess: async () => {
      await raiseFloorContextQuery.refetch()
    },
    ...options.approveCollateralOptions,
  })

  // ===========================================================================
  // Mutations - Trading Status
  // ===========================================================================

  const openBuyMutation = useMutation({
    mutationFn: async (params?: TMarketAdminParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.openBuy(params)
    },
    ...options.openBuyOptions,
  })

  const closeBuyMutation = useMutation({
    mutationFn: async (params?: TMarketAdminParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.closeBuy(params)
    },
    ...options.closeBuyOptions,
  })

  const openSellMutation = useMutation({
    mutationFn: async (params?: TMarketAdminParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.openSell(params)
    },
    ...options.openSellOptions,
  })

  const closeSellMutation = useMutation({
    mutationFn: async (params?: TMarketAdminParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.closeSell(params)
    },
    ...options.closeSellOptions,
  })

  // ===========================================================================
  // Mutations - Fee Configuration
  // ===========================================================================

  const setBuyFeeMutation = useMutation({
    mutationFn: async (params: TSetFeeParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.setBuyFee(params)
    },
    ...options.setBuyFeeOptions,
  })

  const setSellFeeMutation = useMutation({
    mutationFn: async (params: TSetFeeParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.setSellFee(params)
    },
    ...options.setSellFeeOptions,
  })

  // ===========================================================================
  // Mutations - Floor Elevation
  // ===========================================================================

  const raiseFloorMutation = useMutation({
    mutationFn: async (params: TRaiseFloorParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.raiseFloor(params)
    },
    onSuccess: async () => {
      await Promise.all([marketStateQuery.refetch(), raiseFloorContextQuery.refetch()])
    },
    ...options.raiseFloorOptions,
  })

  // ===========================================================================
  // Mutations - Segment & Collateral Management
  // ===========================================================================

  const reconfigureSegmentsMutation = useMutation({
    mutationFn: async (params: TReconfigureSegmentsParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.reconfigureSegments(params)
    },
    onSuccess: async () => {
      await marketStateQuery.refetch()
    },
    ...options.reconfigureSegmentsOptions,
  })

  const setVirtualCollateralSupplyMutation = useMutation({
    mutationFn: async (params: TSetVirtualCollateralSupplyParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.setVirtualCollateralSupply(params)
    },
    onSuccess: async () => {
      await marketStateQuery.refetch()
    },
    ...options.setVirtualCollateralSupplyOptions,
  })

  const withdrawCollateralToMutation = useMutation({
    mutationFn: async (params: TWithdrawCollateralParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.withdrawCollateralTo(params)
    },
    onSuccess: async () => {
      await marketStateQuery.refetch()
    },
    ...options.withdrawCollateralToOptions,
  })

  const depositCollateralFromMutation = useMutation({
    mutationFn: async (params: TDepositCollateralParams): Promise<TransactionReceipt> => {
      const admin = getMarketAdminInstance()
      return admin.depositCollateralFrom(params)
    },
    onSuccess: async () => {
      await marketStateQuery.refetch()
    },
    ...options.depositCollateralFromOptions,
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
    approveCollateralMutation.isPending ||
    raiseFloorMutation.isPending ||
    reconfigureSegmentsMutation.isPending ||
    setVirtualCollateralSupplyMutation.isPending ||
    withdrawCollateralToMutation.isPending ||
    depositCollateralFromMutation.isPending

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
    raiseFloorContext: raiseFloorContextQuery.data ?? null,
    isLoadingRaiseFloorContext: raiseFloorContextQuery.isLoading,
    refetchRaiseFloorContext: raiseFloorContextQuery.refetch,
    approveCollateral: approveCollateralMutation,
    raiseFloor: raiseFloorMutation,

    // Segment & collateral management
    reconfigureSegments: reconfigureSegmentsMutation,
    setVirtualCollateralSupply: setVirtualCollateralSupplyMutation,
    withdrawCollateralTo: withdrawCollateralToMutation,
    depositCollateralFrom: depositCollateralFromMutation,

    // Combined loading state
    isLoading,

    // Individual loading states
    isOpeningBuy: openBuyMutation.isPending,
    isClosingBuy: closeBuyMutation.isPending,
    isOpeningSell: openSellMutation.isPending,
    isClosingSell: closeSellMutation.isPending,
    isSettingBuyFee: setBuyFeeMutation.isPending,
    isSettingSellFee: setSellFeeMutation.isPending,
    isApprovingCollateral: approveCollateralMutation.isPending,
    isRaisingFloor: raiseFloorMutation.isPending,
    isReconfiguringSegments: reconfigureSegmentsMutation.isPending,
    isSettingVirtualCollateralSupply: setVirtualCollateralSupplyMutation.isPending,
    isWithdrawingCollateral: withdrawCollateralToMutation.isPending,
    isDepositingCollateral: depositCollateralFromMutation.isPending,
  }
}
