import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  buildMarketActivitySubscription,
  combineMarketActivity,
  fetchMarketActivity,
  type TGraphQLFloorElevationActivity,
  type TGraphQLLoanActivity,
  type TGraphQLStakingActivityItem,
  type TGraphQLTradeActivity,
  type TMarketActivityData,
} from '../../graphql/api'
import { marketActivityQueryKey, marketActivitySubKey } from '../query-keys'
import { useSubscription } from './subscriptions'

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

// ============================================================================
// Unified Activity Data Hook (Query for initial data + Subscription for live updates)
// ============================================================================

export type UseMarketActivityDataParams = {
  marketId: string | null | undefined
  stakingManagerId?: string | null
  enabled?: boolean
  limit?: number
}

export type UseMarketActivityDataResult = {
  key: ReturnType<typeof marketActivitySubKey>
  activity: TMarketActivityData[]
  error: string | null
  isLoading: boolean
}

/**
 * @description Unified hook for market activity — uses query for instant cached data,
 * then overlays live subscription data when it arrives.
 *
 * @example
 * ```tsx
 * const { activity, isLoading } = useMarketActivityData({ marketId })
 * ```
 */
export const useMarketActivityData = ({
  marketId,
  stakingManagerId,
  enabled = true,
  limit = 100,
}: UseMarketActivityDataParams): UseMarketActivityDataResult => {
  const isEnabled = enabled && Boolean(marketId)
  const key = marketActivitySubKey(marketId)
  const resolvedStakingId = stakingManagerId ?? undefined

  // Query for instant cached data (stale-while-revalidate)
  const queryResult = useMarketActivityQuery(marketId, {
    enabled: isEnabled,
  })

  // Subscription for live updates
  const fields = useMemo(
    () =>
      isEnabled && marketId
        ? buildMarketActivitySubscription(marketId, limit, resolvedStakingId)
        : null,
    [isEnabled, marketId, limit, resolvedStakingId]
  )

  const subResult = useSubscription({
    fields: fields ?? ({} as NonNullable<typeof fields>),
    enabled: isEnabled && fields !== null,
  })

  // Transform subscription data into unified activity format
  const subscriptionActivity = useMemo(() => {
    if (!subResult.data) return null

    const trades = (subResult.data.Trade ?? []) as TGraphQLTradeActivity[]
    const loans = (subResult.data.Loan ?? []) as TGraphQLLoanActivity[]
    const floorElevations = (subResult.data.FloorElevation ??
      []) as TGraphQLFloorElevationActivity[]
    const stakingActivities = ((subResult.data as any).StakingActivity ??
      []) as TGraphQLStakingActivityItem[]

    return combineMarketActivity(trades, loans, floorElevations, stakingActivities)
  }, [subResult.data])

  // Prefer subscription data when available, fall back to query data
  const activity = subscriptionActivity ?? queryResult.data ?? []

  return {
    key,
    activity,
    error: subResult.error ?? queryResult.error?.message ?? null,
    isLoading: queryResult.isLoading && !subscriptionActivity,
  }
}

// Re-export types for convenience
export type { TActivityType, TMarketActivityData } from '../../graphql/api/fields/activity'
