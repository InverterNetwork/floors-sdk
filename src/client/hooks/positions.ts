import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'
import type { Address } from 'viem'

import { fetchUserMarketPosition } from '../../graphql/api/fetchers'
import type { TUserMarketPositionData } from '../../graphql/api/mappers'
import { mapUserMarketPositionToDTO } from '../../graphql/api/mappers'

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
