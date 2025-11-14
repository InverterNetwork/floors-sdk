import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'

import { fetchGlobalStats, type TGlobalStats } from '../../graphql/api'
import { globalStatsQueryKey } from '../query-keys'

type UseGlobalStatsQueryOptions<TData = TGlobalStats | null> = Omit<
  UseQueryOptions<TGlobalStats | null, Error, TData, typeof globalStatsQueryKey>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches global Floor Markets statistics including total TVL, volume, and market counts.
 */
export const useGlobalStatsQuery = <TData = TGlobalStats | null>(
  options?: UseGlobalStatsQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const staleTime = options?.staleTime ?? 120_000 // 2 minutes
  const gcTime = options?.gcTime ?? 5 * 60_000 // 5 minutes

  return useQuery({
    queryKey: globalStatsQueryKey,
    queryFn: fetchGlobalStats,
    ...options,
    staleTime,
    gcTime,
  })
}
