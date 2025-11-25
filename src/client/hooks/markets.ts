import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import type { Address } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import { fetchMarketById, fetchMarkets, type TFloorAssetData } from '../../graphql/api'
import {
  Market,
  type TMarketApproveParams,
  type TMarketBuyParams,
  type TMarketMutationResult,
  type TMarketSellParams,
} from '../../market'
import { marketQueryKey, marketsQueryKey } from '../query-keys'

type UseMarketsQueryOptions<TData = TFloorAssetData[]> = Omit<
  UseQueryOptions<TFloorAssetData[], Error, TData, typeof marketsQueryKey>,
  'queryKey' | 'queryFn'
>

type UseMarketQueryOptions<TData = TFloorAssetData | null> = Omit<
  UseQueryOptions<TFloorAssetData | null, Error, TData, ReturnType<typeof marketQueryKey>>,
  'queryKey' | 'queryFn'
>

type UseMarketMutationsReturnType = {
  buy: UseMutationResult<TMarketMutationResult, Error, TMarketBuyParams>
  sell: UseMutationResult<TMarketMutationResult, Error, TMarketSellParams>
  approveIssuance: UseMutationResult<TMarketMutationResult, Error, TMarketApproveParams>
  approveReserve: UseMutationResult<TMarketMutationResult, Error, TMarketApproveParams>
  previewBuy: UseMutationResult<bigint, Error, bigint>
  previewSell: UseMutationResult<bigint, Error, bigint>
  getIssuanceAllowance: UseMutationResult<bigint, Error, Address | undefined>
  getReserveAllowance: UseMutationResult<bigint, Error, Address | undefined>
}

/**
 * @description Fetches and caches the latest Floor Markets data.
 */
export const useMarketsQuery = <TData = TFloorAssetData[]>(
  options?: UseMarketsQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const staleTime = options?.staleTime ?? 60_000
  const gcTime = options?.gcTime ?? 5 * 60_000

  return useQuery({
    queryKey: marketsQueryKey,
    queryFn: fetchMarkets,
    ...options,
    staleTime,
    gcTime,
  })
}

/**
 * @description Fetches and caches a single Floor Market by id.
 * @param {string | null | undefined} marketId - The target market identifier.
 */
export const useMarketQuery = <TData = TFloorAssetData | null>(
  marketId: string | null | undefined,
  options?: UseMarketQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(marketId)
  const staleTime = options?.staleTime ?? 30_000

  return useQuery({
    queryKey: marketQueryKey(marketId),
    queryFn: () => fetchMarketById(marketId!),
    ...options,
    enabled,
    staleTime,
  })
}

/**
 * @description Provides buy/sell/approve mutations backed by the pure Market class.
 */
export const useMarketMutations = (
  market: TFloorAssetData | null | undefined
): UseMarketMutationsReturnType => {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const walletAddress = walletClient?.account?.address as Address | undefined

  const marketClient = useMemo(() => {
    if (!market || !publicClient) return null
    return new Market({
      data: market,
      publicClient,
      walletClient: walletClient ?? undefined,
    })
  }, [market, publicClient, walletClient])

  const ensureMarket = useCallback(() => {
    if (!marketClient)
      throw new Error(
        'Market client unavailable. Provide market data and ensure wallet/network is ready.'
      )

    return marketClient
  }, [marketClient])

  const ensureWalletAddress = useCallback(
    (override?: Address) => {
      const targetAddress = override ?? walletAddress
      if (!targetAddress)
        throw new Error('Wallet not connected. Please connect your wallet to continue.')

      return targetAddress
    },
    [walletAddress]
  )

  const buy = useMutation({
    mutationFn: (params: TMarketBuyParams) => ensureMarket().buy(params),
  })

  const sell = useMutation({
    mutationFn: (params: TMarketSellParams) => ensureMarket().sell(params),
  })

  const approveIssuance = useMutation({
    mutationFn: (params: TMarketApproveParams) => ensureMarket().approveFToken(params),
  })

  const approveReserve = useMutation({
    mutationFn: (params: TMarketApproveParams) => ensureMarket().approveReserveToken(params),
  })

  const previewBuy = useMutation({
    mutationFn: (depositAmount: bigint) => ensureMarket().previewBuy(depositAmount),
  })

  const previewSell = useMutation({
    mutationFn: (depositAmount: bigint) => ensureMarket().previewSell(depositAmount),
  })

  const getIssuanceAllowance = useMutation({
    mutationFn: async (owner?: Address) =>
      ensureMarket().getFTokenAllowance(ensureWalletAddress(owner)),
  })

  const getReserveAllowance = useMutation({
    mutationFn: async (owner?: Address) =>
      ensureMarket().getReserveTokenAllowance(ensureWalletAddress(owner)),
  })

  return {
    buy,
    sell,
    approveIssuance,
    approveReserve,
    previewBuy,
    previewSell,
    getIssuanceAllowance,
    getReserveAllowance,
  }
}
