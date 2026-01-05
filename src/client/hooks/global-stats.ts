import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'

import {
  fetchGlobalMetricsWithHistory,
  fetchGlobalStats,
  type TGlobalMetricsWithHistory,
  type TGlobalStats,
} from '../../graphql/api'
import { globalMetricsHistoryQueryKey, globalStatsQueryKey } from '../query-keys'

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

type UseGlobalMetricsHistoryQueryOptions<TData = TGlobalMetricsWithHistory> = Omit<
  UseQueryOptions<TGlobalMetricsWithHistory, Error, TData, typeof globalMetricsHistoryQueryKey>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches global metrics with historical data for charts and change calculations.
 * Returns TVL, Market Cap with 24h/7d/30d changes and chart data for each period.
 */
export const useGlobalMetricsHistoryQuery = <TData = TGlobalMetricsWithHistory>(
  options?: UseGlobalMetricsHistoryQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const staleTime = options?.staleTime ?? 120_000 // 2 minutes
  const gcTime = options?.gcTime ?? 5 * 60_000 // 5 minutes

  return useQuery({
    queryKey: globalMetricsHistoryQueryKey,
    queryFn: fetchGlobalMetricsWithHistory,
    ...options,
    staleTime,
    gcTime,
  })
}
