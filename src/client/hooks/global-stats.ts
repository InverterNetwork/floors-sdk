import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

import {
  buildGlobalStatsSubscription,
  fetchGlobalMetricsWithHistory,
  fetchGlobalStats,
  mapGlobalStats,
  type TGlobalMetricsWithHistory,
  type TGlobalStats,
} from '../../graphql/api'
import { globalMetricsHistoryQueryKey, globalStatsQueryKey } from '../query-keys'
import { useSubscription } from './subscriptions'

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

/**
 * @description Global stats row: initial query plus live subscription updates.
 */
export const useGlobalStatsSubscription = <TData = TGlobalStats | null>(
  options?: UseGlobalStatsQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const queryClient = useQueryClient()
  const gcTime = options?.gcTime ?? 5 * 60_000
  const { staleTime: _st, ...restOptions } = options ?? {}

  const queryResult = useQuery({
    queryKey: globalStatsQueryKey,
    queryFn: fetchGlobalStats,
    ...restOptions,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime,
  })

  const subFields = useMemo(() => buildGlobalStatsSubscription(), [])
  const sub = useSubscription({ fields: subFields, enabled: true })

  useEffect(() => {
    const row = sub.data?.GlobalStats?.[0]
    if (!row) return
    queryClient.setQueryData(globalStatsQueryKey, mapGlobalStats(row))
  }, [sub.data, queryClient])

  return queryResult as UseQueryResult<TData, Error>
}

/**
 * @description Pushes GlobalStats subscription updates into cache and refreshes metrics-with-history.
 */
export const useGlobalStatsLiveSync = (): void => {
  const queryClient = useQueryClient()
  const subFields = useMemo(() => buildGlobalStatsSubscription(), [])
  const sub = useSubscription({ fields: subFields, enabled: true })

  useEffect(() => {
    const row = sub.data?.GlobalStats?.[0]
    if (!row) return
    queryClient.setQueryData(globalStatsQueryKey, mapGlobalStats(row))
    void queryClient.invalidateQueries({ queryKey: globalMetricsHistoryQueryKey })
  }, [sub.data, queryClient])
}
