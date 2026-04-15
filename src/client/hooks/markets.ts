import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { useCallback, useEffect, useMemo } from 'react'
import type { Address } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import {
  buildMarketsSubscription,
  buildMarketSubscription,
  buildPriceCandlesSubscription,
  fetchMarketById,
  fetchMarkets,
  mapMarketToFloorAssetData,
  type TFloorAssetData,
  type TGraphQLMarket,
  type TPriceCandle,
} from '../../graphql/api'
import {
  Market,
  type TMarketApproveParams,
  type TMarketBorrowParams,
  type TMarketBuyAndBorrowParams,
  type TMarketBuyForParams,
  type TMarketBuyParams,
  type TMarketMutationResult,
  type TMarketRepayParams,
  type TMarketSellParams,
} from '../../market'
import { useFloors } from '../floors-context'
import { marketQueryKey, marketsQueryKey } from '../query-keys'
import { useSubscription } from './subscriptions'

export type UseMarketsQueryOptions<TData = TFloorAssetData[]> = Omit<
  UseQueryOptions<TFloorAssetData[], Error, TData, typeof marketsQueryKey>,
  'queryKey' | 'queryFn'
>

export type UseMarketQueryOptions<TData = TFloorAssetData | null> = Omit<
  UseQueryOptions<TFloorAssetData | null, Error, TData, ReturnType<typeof marketQueryKey>>,
  'queryKey' | 'queryFn'
>

type UseMarketMutationsReturnType = {
  buy: UseMutationResult<TMarketMutationResult, Error, TMarketBuyParams>
  sell: UseMutationResult<TMarketMutationResult, Error, TMarketSellParams>
  approveIssuance: UseMutationResult<TMarketMutationResult, Error, TMarketApproveParams>
  approveReserve: UseMutationResult<TMarketMutationResult, Error, TMarketApproveParams>
  approveFTokenForCredit: UseMutationResult<TMarketMutationResult, Error, TMarketApproveParams>
  borrow: UseMutationResult<TMarketMutationResult, Error, TMarketBorrowParams>
  buyAndBorrow: UseMutationResult<TMarketMutationResult, Error, TMarketBuyAndBorrowParams>
  repay: UseMutationResult<TMarketMutationResult, Error, TMarketRepayParams>
  previewBuy: UseMutationResult<bigint, Error, bigint>
  previewSell: UseMutationResult<bigint, Error, bigint>
  getIssuanceAllowance: UseMutationResult<bigint, Error, Address | undefined>
  getReserveAllowance: UseMutationResult<bigint, Error, Address | undefined>
  getFTokenCreditAllowance: UseMutationResult<bigint, Error, Address | undefined>
  getReserveCreditAllowance: UseMutationResult<bigint, Error, Address | undefined>
  getLoanToValueRatio: UseMutationResult<number, Error, void>
  getBorrowingFeeRate: UseMutationResult<number, Error, void>
  getMaxLeverage: UseMutationResult<number, Error, void>
  approveReserveForCredit: UseMutationResult<TMarketMutationResult, Error, TMarketApproveParams>
  buyFor: UseMutationResult<TMarketMutationResult, Error, TMarketBuyForParams>
  getFloorSection: UseMutationResult<`0x${string}`, Error, void>
  getPremiumSections: UseMutationResult<`0x${string}`[], Error, void>
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
 * @description Markets catalog with an initial query plus live indexer updates via subscription.
 */
export const useMarketsSubscription = <TData = TFloorAssetData[]>(
  options?: UseMarketsQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const queryClient = useQueryClient()
  const gcTime = options?.gcTime ?? 5 * 60_000
  const { staleTime: _st, ...restOptions } = options ?? {}

  const queryResult = useQuery({
    queryKey: marketsQueryKey,
    queryFn: fetchMarkets,
    ...restOptions,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime,
  })

  const subFields = useMemo(() => buildMarketsSubscription(), [])
  const sub = useSubscription({ fields: subFields, enabled: true })

  useEffect(() => {
    if (!sub.data?.Market?.length) return
    const mapped = sub.data.Market.map((m) =>
      mapMarketToFloorAssetData(m as unknown as TGraphQLMarket)
    )
    queryClient.setQueryData(marketsQueryKey, mapped)
  }, [sub.data, queryClient])

  return queryResult as UseQueryResult<TData, Error>
}

/**
 * @description Single market: full initial load (module registry, candles) with live Market row updates.
 */
export const useMarketSubscription = <TData = TFloorAssetData | null>(
  marketId: string | null | undefined,
  options?: UseMarketQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const queryClient = useQueryClient()
  const enabled = options?.enabled ?? Boolean(marketId)
  const gcTime = options?.gcTime ?? 5 * 60_000
  const { staleTime: _st, ...restOptions } = options ?? {}

  const queryResult = useQuery({
    queryKey: marketQueryKey(marketId),
    queryFn: () => fetchMarketById(marketId!),
    ...restOptions,
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime,
  })

  const subFields = useMemo(() => (marketId ? buildMarketSubscription(marketId) : null), [marketId])
  const sub = useSubscription({
    fields: subFields ?? ({} as NonNullable<typeof subFields>),
    enabled: enabled && subFields !== null,
  })

  const candleSubFields = useMemo(
    () => (marketId ? buildPriceCandlesSubscription(marketId) : null),
    [marketId]
  )
  const candleSub = useSubscription({
    fields: candleSubFields ?? ({} as NonNullable<typeof candleSubFields>),
    enabled: enabled && candleSubFields !== null,
  })

  useEffect(() => {
    const row = sub.data?.Market?.[0]
    if (!marketId || !row) return
    queryClient.setQueryData(
      marketQueryKey(marketId),
      (old: TFloorAssetData | null | undefined) => {
        const gqlMarket = row as unknown as TGraphQLMarket
        const registry = old
          ? {
              floor: old.floorModuleAddress ?? null,
              creditFacility: old.creditFacility ?? null,
              authorizer: old.authorizer ?? null,
              presale: old.presale ?? null,
              feeTreasury: old.treasury ?? null,
              staking: old.stakingManagerAddress ?? null,
            }
          : null
        const mapped = mapMarketToFloorAssetData(gqlMarket, registry)
        if (!old) return mapped as TFloorAssetData
        return {
          ...mapped,
          priceCandles: old.priceCandles,
          activeStrategyAddresses: old.activeStrategyAddresses,
          firstStrategyAddress: old.firstStrategyAddress,
        } as TFloorAssetData
      }
    )
  }, [sub.data, marketId, queryClient])

  useEffect(() => {
    const incoming = candleSub.data?.PriceCandle as TPriceCandle[] | undefined
    if (!marketId || !incoming?.length) return

    // Ponder subscriptions may send only the updated candle(s), not the full history.
    // Merge by id so we preserve all historical candles from the initial fetch.
    const mergeCandles = (existing: TPriceCandle[], updates: TPriceCandle[]): TPriceCandle[] => {
      const map = new Map(existing.map((c) => [c.id, c]))
      for (const c of updates) map.set(c.id, c)
      return [...map.values()].sort((a, b) => Number(a.timestamp) - Number(b.timestamp))
    }

    queryClient.setQueryData(
      marketQueryKey(marketId),
      (old: TFloorAssetData | null | undefined) => {
        if (!old?.priceCandles) return old
        return {
          ...old,
          priceCandles: {
            hourly: mergeCandles(
              old.priceCandles.hourly,
              incoming.filter((c) => c.period === 'ONE_HOUR')
            ),
            fourHour: mergeCandles(
              old.priceCandles.fourHour,
              incoming.filter((c) => c.period === 'FOUR_HOURS')
            ),
            daily: mergeCandles(
              old.priceCandles.daily,
              incoming.filter((c) => c.period === 'ONE_DAY')
            ),
          },
        } as TFloorAssetData
      }
    )
  }, [candleSub.data, marketId, queryClient])

  return queryResult as UseQueryResult<TData, Error>
}

/**
 * @description Provides buy/sell/approve mutations backed by the pure Market class.
 */
export const useMarketMutations = (): UseMarketMutationsReturnType => {
  const floorsContext = useFloors()
  const resolvedMarket = floorsContext.market.data ?? null
  const {
    refetch: { reserveBalance: refetchReserveBalance, issuanceBalance: refetchIssuanceBalance },
  } = floorsContext
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const walletAddress = walletClient?.account?.address as Address | undefined

  const marketClient = useMemo(() => {
    if (!resolvedMarket || !publicClient) return null
    return new Market({
      data: resolvedMarket,
      publicClient,
      walletClient: walletClient ?? undefined,
    })
  }, [resolvedMarket, publicClient, walletClient])

  const ensureMarket = useCallback(() => {
    if (!marketClient)
      throw new Error('Market client unavailable. Wait for FloorsProvider market query to resolve.')

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

  // Market data and candles are subscription-driven — only balances need explicit refresh.
  const refetchAfterMutation = useCallback(async () => {
    await Promise.allSettled([refetchReserveBalance(), refetchIssuanceBalance()])
  }, [refetchIssuanceBalance, refetchReserveBalance])

  const buy = useMutation({
    mutationFn: (params: TMarketBuyParams) => ensureMarket().buy(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const sell = useMutation({
    mutationFn: (params: TMarketSellParams) => ensureMarket().sell(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const approveIssuance = useMutation({
    mutationFn: (params: TMarketApproveParams) => ensureMarket().approveFToken(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const approveReserve = useMutation({
    mutationFn: (params: TMarketApproveParams) => ensureMarket().approveReserveToken(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
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

  // Credit Facility Mutations
  const approveFTokenForCredit = useMutation({
    mutationFn: (params: TMarketApproveParams) =>
      ensureMarket().approveFTokenForCreditFacility(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const borrow = useMutation({
    mutationFn: (params: TMarketBorrowParams) => ensureMarket().borrow(params),
    onSuccess: async () => {
      await refetchAfterMutation()
      await floorsContext.refetch.userPosition()
    },
  })

  const buyAndBorrow = useMutation({
    mutationFn: (params: TMarketBuyAndBorrowParams) => ensureMarket().buyAndBorrow(params),
    onSuccess: async () => {
      await refetchAfterMutation()
      await floorsContext.refetch.userPosition()
    },
  })

  const repay = useMutation({
    mutationFn: (params: TMarketRepayParams) => ensureMarket().repay(params),
    onSuccess: async () => {
      await refetchAfterMutation()
      await floorsContext.refetch.userPosition()
    },
  })

  const getFTokenCreditAllowance = useMutation({
    mutationFn: async (owner?: Address) =>
      ensureMarket().getFTokenAllowanceForCreditFacility(ensureWalletAddress(owner)),
  })

  // New Mutations for Loop
  const approveReserveForCredit = useMutation({
    mutationFn: (params: TMarketApproveParams) =>
      ensureMarket().approveReserveTokenForCreditFacility(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const getReserveCreditAllowance = useMutation({
    mutationFn: async (owner?: Address) =>
      ensureMarket().getReserveTokenAllowanceForCreditFacility(ensureWalletAddress(owner)),
  })

  const getLoanToValueRatio = useMutation({
    mutationFn: async () => ensureMarket().getLoanToValueRatio(),
  })

  const getBorrowingFeeRate = useMutation({
    mutationFn: async () => ensureMarket().getBorrowingFeeRate(),
  })

  const getMaxLeverage = useMutation({
    mutationFn: async () => ensureMarket().getMaxLeverage(),
  })

  const buyFor = useMutation({
    mutationFn: (params: TMarketBuyForParams) => ensureMarket().buyFor(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const getFloorSection = useMutation({
    mutationFn: async () => ensureMarket().getFloorSection(),
  })

  const getPremiumSections = useMutation({
    mutationFn: async () => ensureMarket().getPremiumSections(),
  })

  return {
    buy,
    sell,
    approveIssuance,
    approveReserve,
    approveFTokenForCredit,
    approveReserveForCredit,
    borrow,
    buyAndBorrow,
    repay,
    previewBuy,
    previewSell,
    getIssuanceAllowance,
    getReserveAllowance,
    getFTokenCreditAllowance,
    getReserveCreditAllowance,
    getLoanToValueRatio,
    getBorrowingFeeRate,
    getMaxLeverage,
    buyFor,
    getFloorSection,
    getPremiumSections,
  }
}
