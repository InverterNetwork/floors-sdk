import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import type { Address } from 'viem'
import { getAddress } from 'viem'

import { buildUserMarketPositionSubscription } from '../../graphql/api'
import { fetchUserMarketPosition } from '../../graphql/api/fetchers'
import type { TUserMarketPositionData } from '../../graphql/api/mappers'
import { mapUserMarketPositionToDTO } from '../../graphql/api/mappers'
import { useSubscription } from './subscriptions'

export const userMarketPositionQueryKey = (
  userAddress: Address | null | undefined,
  marketId: string | null | undefined
) => ['userMarketPosition', userAddress?.toLowerCase(), marketId] as const

type UseUserMarketPositionQueryOptions<TData = TUserMarketPositionData | null> = Omit<
  UseQueryOptions<
    TUserMarketPositionData | null,
    Error,
    TData,
    ReturnType<typeof userMarketPositionQueryKey>
  >,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches user position for a specific market from indexer.
 * Returns collateral locked, current debt, and whether user has leveraged position.
 */
export const useUserMarketPositionQuery = <TData = TUserMarketPositionData | null>(
  userAddress: Address | null | undefined,
  marketId: string | null | undefined,
  options?: UseUserMarketPositionQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(userAddress && marketId)

  return useQuery({
    queryKey: userMarketPositionQueryKey(userAddress, marketId),
    queryFn: async () => {
      if (!userAddress || !marketId) return null
      const position = await fetchUserMarketPosition(userAddress, marketId)
      return position ? mapUserMarketPositionToDTO(position) : null
    },
    staleTime: 0, // Always consider data stale to allow refetching
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
    ...options,
    enabled,
  })
}

/**
 * @description User market position from an initial query plus live UserMarketPosition row updates.
 */
export const useUserMarketPositionSubscription = <TData = TUserMarketPositionData | null>(
  userAddress: Address | null | undefined,
  marketId: string | null | undefined,
  options?: UseUserMarketPositionQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const queryClient = useQueryClient()
  const enabled = options?.enabled ?? Boolean(userAddress && marketId)
  const gcTime = options?.gcTime ?? 5 * 60_000
  const {
    staleTime: _st,
    refetchOnMount: _rom,
    refetchOnWindowFocus: _rwf,
    ...restOptions
  } = options ?? {}

  const queryResult = useQuery({
    queryKey: userMarketPositionQueryKey(userAddress, marketId),
    queryFn: async () => {
      if (!userAddress || !marketId) return null
      const position = await fetchUserMarketPosition(userAddress, marketId)
      return position ? mapUserMarketPositionToDTO(position) : null
    },
    ...restOptions,
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime,
  })

  const subFields = useMemo(() => {
    if (!userAddress || !marketId) return null
    try {
      return buildUserMarketPositionSubscription(
        getAddress(userAddress),
        getAddress(marketId as `0x${string}`)
      )
    } catch {
      return null
    }
  }, [userAddress, marketId])

  const sub = useSubscription({
    fields: subFields ?? ({} as NonNullable<typeof subFields>),
    enabled: enabled && subFields !== null,
  })

  useEffect(() => {
    const row = sub.data?.UserMarketPosition?.[0]
    if (!userAddress || !marketId || !row) return
    queryClient.setQueryData(
      userMarketPositionQueryKey(userAddress, marketId),
      mapUserMarketPositionToDTO(row)
    )
  }, [sub.data, userAddress, marketId, queryClient])

  return queryResult as UseQueryResult<TData, Error>
}
