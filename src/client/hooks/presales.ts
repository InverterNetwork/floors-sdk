import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'

import {
  fetchPresaleById,
  fetchPresales,
  fetchPresalesByMarket,
  type TPresale,
} from '../../graphql/api'
import { presaleQueryKey, presalesQueryKey } from '../query-keys'

export type UsePresalesQueryOptions<TData = TPresale[]> = Omit<
  UseQueryOptions<TPresale[], Error, TData, typeof presalesQueryKey>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches and caches all presales.
 */
export const usePresalesQuery = <TData = TPresale[]>(
  options?: UsePresalesQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const staleTime = options?.staleTime ?? 60_000
  const gcTime = options?.gcTime ?? 5 * 60_000

  return useQuery({
    queryKey: presalesQueryKey,
    queryFn: fetchPresales,
    ...options,
    staleTime,
    gcTime,
  })
}

export type UsePresaleQueryOptions<TData = TPresale | null> = Omit<
  UseQueryOptions<TPresale | null, Error, TData, ReturnType<typeof presaleQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches and caches a single presale by ID.
 * @param {string | null | undefined} presaleId - The target presale identifier.
 */
export const usePresaleQuery = <TData = TPresale | null>(
  presaleId: string | null | undefined,
  options?: UsePresaleQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(presaleId)
  const staleTime = options?.staleTime ?? 30_000

  return useQuery({
    queryKey: presaleQueryKey(presaleId),
    queryFn: () => fetchPresaleById(presaleId!),
    ...options,
    enabled,
    staleTime,
  })
}

const presalesByMarketQueryKey = (marketId: string) => ['presales', 'market', marketId] as const

export type UsePresalesByMarketQueryOptions<TData = TPresale[]> = Omit<
  UseQueryOptions<TPresale[], Error, TData, ReturnType<typeof presalesByMarketQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches and caches presales scoped to a market.
 * @param {string | null | undefined} marketId - The target market identifier.
 */
export const usePresalesByMarketQuery = <TData = TPresale[]>(
  marketId: string | null | undefined,
  options?: UsePresalesByMarketQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(marketId)
  const staleTime = options?.staleTime ?? 30_000

  return useQuery({
    queryKey: presalesByMarketQueryKey(marketId || ''),
    queryFn: () => fetchPresalesByMarket(marketId!),
    ...options,
    enabled,
    staleTime,
  })
}

import { useCallback, useMemo } from 'react'
import type { Address } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import {
  Presale,
  type TPresaleApproveParams,
  type TPresaleBuyParams,
  type TPresaleBuyWithLeverageParams,
  type TPresaleClaimParams,
  type TPresaleMutationResult,
  type TPresalePositionWithState,
} from '../../presale'
import { useFloors } from '../floors-context'

export type UsePresalePositionsQueryOptions = Omit<
  UseQueryOptions<TPresalePositionWithState[], Error>,
  'queryKey' | 'queryFn'
>

export const usePresalePositionsQuery = (
  ownerAddress: Address | undefined,
  options?: UsePresalePositionsQueryOptions
): UseQueryResult<TPresalePositionWithState[], Error> => {
  const { presale } = useFloors()
  const publicClient = usePublicClient()

  const presaleClient = useMemo(() => {
    if (!presale.data || !publicClient) return null
    return new Presale({ data: presale.data, publicClient })
  }, [presale.data, publicClient])

  const enabled = options?.enabled ?? Boolean(presaleClient && ownerAddress)

  return useQuery({
    queryKey: ['presale', presale.data?.id, 'positions', ownerAddress] as const,
    queryFn: async () => {
      if (!presaleClient || !ownerAddress) return []
      return presaleClient.getPositionsWithState(ownerAddress)
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    ...options,
    enabled,
  })
}

export type UsePresaleMutationsReturnType = {
  buyPresale: UseMutationResult<TPresaleMutationResult, Error, TPresaleBuyParams>
  buyPresaleWithLeverage: UseMutationResult<
    TPresaleMutationResult,
    Error,
    TPresaleBuyWithLeverageParams
  >
  claimAll: UseMutationResult<TPresaleMutationResult, Error, TPresaleClaimParams>
  approvePurchaseToken: UseMutationResult<TPresaleMutationResult, Error, TPresaleApproveParams>
  getPurchaseTokenAllowance: UseMutationResult<bigint, Error, Address | undefined>
  getPurchaseTokenBalance: UseMutationResult<bigint, Error, Address | undefined>
  getPresaleState: UseMutationResult<number, Error, void>
  isWhitelisted: UseMutationResult<boolean, Error, Address | undefined>
  getIssuanceBy: UseMutationResult<bigint, Error, Address | undefined>
  getPositionsByOwner: UseMutationResult<bigint[], Error, Address | undefined>
  getPosition: UseMutationResult<any, Error, bigint>
  getPositionState: UseMutationResult<any, Error, bigint>
  getBaseCommissionBps: UseMutationResult<bigint[], Error, void>
  getPriceBreakpoints: UseMutationResult<bigint[][], Error, void>
}

/**
 * @description Provides presale buy/claim/approve mutations and read queries backed by the pure Presale class.
 */
export const usePresaleMutations = (): UsePresaleMutationsReturnType => {
  const floorsContext = useFloors()
  const resolvedPresale = floorsContext.presale.data ?? null
  const {
    refetch: { presale: refetchPresale },
  } = floorsContext
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const walletAddress = walletClient?.account?.address as Address | undefined

  const presaleClient = useMemo(() => {
    if (!resolvedPresale || !publicClient) return null
    return new Presale({
      data: resolvedPresale,
      publicClient,
      walletClient: walletClient ?? undefined,
    })
  }, [resolvedPresale, publicClient, walletClient])

  const ensurePresale = useCallback(() => {
    if (!presaleClient)
      throw new Error(
        'Presale client unavailable. Wait for FloorsProvider presale query to resolve.'
      )

    return presaleClient
  }, [presaleClient])

  const ensureWalletAddress = useCallback(
    (override?: Address) => {
      const targetAddress = override ?? walletAddress
      if (!targetAddress)
        throw new Error('Wallet not connected. Please connect your wallet to continue.')

      return targetAddress
    },
    [walletAddress]
  )

  const refetchAfterMutation = useCallback(async () => {
    await Promise.allSettled([refetchPresale()])
  }, [refetchPresale])

  // Write mutations
  const buyPresale = useMutation({
    mutationFn: (params: TPresaleBuyParams) => ensurePresale().buyPresale(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const buyPresaleWithLeverage = useMutation({
    mutationFn: (params: TPresaleBuyWithLeverageParams) =>
      ensurePresale().buyPresaleWithLeverage(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const claimAll = useMutation({
    mutationFn: (params: TPresaleClaimParams) => ensurePresale().claimAll(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const approvePurchaseToken = useMutation({
    mutationFn: (params: TPresaleApproveParams) => ensurePresale().approvePurchaseToken(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  // Read queries (using mutations for consistency with Market pattern)
  const getPurchaseTokenAllowance = useMutation({
    mutationFn: async (owner?: Address) =>
      ensurePresale().getPurchaseTokenAllowance(ensureWalletAddress(owner)),
  })

  const getPurchaseTokenBalance = useMutation({
    mutationFn: async (owner?: Address) =>
      ensurePresale().getPurchaseTokenBalance(ensureWalletAddress(owner)),
  })

  const getPresaleState = useMutation({
    mutationFn: async () => ensurePresale().getPresaleState(),
  })

  const isWhitelisted = useMutation({
    mutationFn: async (userAddress?: Address) =>
      ensurePresale().isWhitelisted(ensureWalletAddress(userAddress)),
  })

  const getIssuanceBy = useMutation({
    mutationFn: async (userAddress?: Address) =>
      ensurePresale().getIssuanceBy(ensureWalletAddress(userAddress)),
  })

  const getPositionsByOwner = useMutation({
    mutationFn: async (ownerAddress?: Address) =>
      ensurePresale().getPositionsByOwner(ensureWalletAddress(ownerAddress)),
  })

  const getPosition = useMutation({
    mutationFn: async (positionId: bigint) => ensurePresale().getPosition(positionId),
  })

  const getPositionState = useMutation({
    mutationFn: async (positionId: bigint) => ensurePresale().getPositionState(positionId),
  })

  const getBaseCommissionBps = useMutation({
    mutationFn: async () => ensurePresale().getBaseCommissionBps(),
  })

  const getPriceBreakpoints = useMutation({
    mutationFn: async () => ensurePresale().getPriceBreakpoints(),
  })

  return {
    buyPresale,
    buyPresaleWithLeverage,
    claimAll,
    approvePurchaseToken,
    getPurchaseTokenAllowance,
    getPurchaseTokenBalance,
    getPresaleState,
    isWhitelisted,
    getIssuanceBy,
    getPositionsByOwner,
    getPosition,
    getPositionState,
    getBaseCommissionBps,
    getPriceBreakpoints,
  }
}
