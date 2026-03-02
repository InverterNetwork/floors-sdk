import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  buildFloorElevationActivitySubscription,
  buildLoanActivitySubscription,
  buildStakingActivitySubscription,
  buildTradeActivitySubscription,
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

  // Separate subscriptions for live updates (GraphQL subscriptions require one top-level field each)
  const tradeFields = useMemo(
    () => (isEnabled && marketId ? buildTradeActivitySubscription(marketId, limit) : null),
    [isEnabled, marketId, limit]
  )
  const loanFields = useMemo(
    () => (isEnabled && marketId ? buildLoanActivitySubscription(marketId, limit) : null),
    [isEnabled, marketId, limit]
  )
  const elevationFields = useMemo(
    () => (isEnabled && marketId ? buildFloorElevationActivitySubscription(marketId, limit) : null),
    [isEnabled, marketId, limit]
  )
  const stakingFields = useMemo(
    () =>
      isEnabled && resolvedStakingId
        ? buildStakingActivitySubscription(resolvedStakingId, limit)
        : null,
    [isEnabled, resolvedStakingId, limit]
  )

  const tradeSub = useSubscription({
    fields: tradeFields ?? ({} as NonNullable<typeof tradeFields>),
    enabled: isEnabled && tradeFields !== null,
  })
  const loanSub = useSubscription({
    fields: loanFields ?? ({} as NonNullable<typeof loanFields>),
    enabled: isEnabled && loanFields !== null,
  })
  const elevationSub = useSubscription({
    fields: elevationFields ?? ({} as NonNullable<typeof elevationFields>),
    enabled: isEnabled && elevationFields !== null,
  })
  const stakingSub = useSubscription({
    fields: stakingFields ?? ({} as NonNullable<typeof stakingFields>),
    enabled: isEnabled && stakingFields !== null,
  })

  const subError = tradeSub.error ?? loanSub.error ?? elevationSub.error ?? stakingSub.error

  // Transform subscription data into unified activity format
  const subscriptionActivity = useMemo(() => {
    // Wait until at least one subscription has returned data
    if (!tradeSub.data && !loanSub.data && !elevationSub.data && !stakingSub.data) return null

    const trades = (tradeSub.data?.Trade ?? []) as TGraphQLTradeActivity[]
    const loans = (loanSub.data?.Loan ?? []) as TGraphQLLoanActivity[]
    const floorElevations = (elevationSub.data?.FloorElevation ??
      []) as TGraphQLFloorElevationActivity[]
    const stakingActivities = (stakingSub.data?.StakingActivity ??
      []) as TGraphQLStakingActivityItem[]

    return combineMarketActivity(trades, loans, floorElevations, stakingActivities)
  }, [tradeSub.data, loanSub.data, elevationSub.data, stakingSub.data])

  // Prefer subscription data when available, fall back to query data
  const activity = subscriptionActivity ?? queryResult.data ?? []

  return {
    key,
    activity,
    error: subError ?? queryResult.error?.message ?? null,
    isLoading: queryResult.isLoading && !subscriptionActivity,
  }
}

// Re-export types for convenience
export type { TActivityType, TMarketActivityData } from '../../graphql/api/fields/activity'
