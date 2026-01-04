import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'

import { fetchMarketActivity, type TMarketActivityData } from '../../graphql/api'
import { marketActivityQueryKey } from '../query-keys'

export type UseMarketActivityQueryOptions<TData = TMarketActivityData[]> = Omit<
  UseQueryOptions<TMarketActivityData[], Error, TData, ReturnType<typeof marketActivityQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches all market activity (trades + loans) in a single query.
 * Returns a combined, time-sorted list of buy/sell trades and borrow/repay events.
 *
 * @param marketId - The market to fetch activity for
 * @param options - Additional query options
 *
 * @example
 * ```tsx
 * const { data: activity, isLoading } = useMarketActivityQuery(marketId)
 *
 * // Filter by type
 * const borrows = activity.filter(a => a.type === 'borrow')
 * const trades = activity.filter(a => a.source === 'trade')
 * ```
 */
export const useMarketActivityQuery = <TData = TMarketActivityData[]>(
  marketId: string | null | undefined,
  options?: UseMarketActivityQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(marketId)
  const staleTime = options?.staleTime ?? 30_000 // 30 seconds

  return useQuery({
    queryKey: marketActivityQueryKey(marketId),
    queryFn: () => fetchMarketActivity(marketId!),
    staleTime,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    ...options,
    enabled,
  })
}

// Re-export types for convenience
export type { TActivityType, TMarketActivityData } from '../../graphql/api/fields/activity'
