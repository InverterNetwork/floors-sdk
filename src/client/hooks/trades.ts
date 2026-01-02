import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  buildTradeSubscription,
  fetchTradesByMarket,
  fetchTradesByUser,
  type TTradeData,
} from '../../graphql/api'
import { marketTradesQueryKey, marketTradesSubKey, userTradesQueryKey } from '../query-keys'
import { dedupeByTxHash, useGraphQLQuery, useSubscription } from './subscriptions'

type UseMarketTradesQueryOptions<TData = TTradeData[]> = Omit<
  UseQueryOptions<TTradeData[], Error, TData, ReturnType<typeof marketTradesQueryKey>>,
  'queryKey' | 'queryFn'
>

type UseUserTradesQueryOptions<TData = TTradeData[]> = Omit<
  UseQueryOptions<TTradeData[], Error, TData, ReturnType<typeof userTradesQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches the latest trades for a given market id.
 */
export const useMarketTradesQuery = <TData = TTradeData[]>(
  marketId: string | null | undefined,
  options?: UseMarketTradesQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(marketId)

  return useQuery({
    queryKey: marketTradesQueryKey(marketId),
    queryFn: () => fetchTradesByMarket(marketId!),
    ...options,
    enabled,
  })
}

/**
 * @description Fetches the latest trades executed by a specific user id.
 */
export const useUserTradesQuery = <TData = TTradeData[]>(
  userId: string | null | undefined,
  options?: UseUserTradesQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(userId)

  return useQuery({
    queryKey: userTradesQueryKey(userId),
    queryFn: () => fetchTradesByUser(userId!),
    ...options,
    enabled,
  })
}

// ============================================================================
// Trade Data Hooks (Unified Query + Subscription)
// ============================================================================

/**
 * @description Data type for trade
 */
export type TTradeSubscriptionData = {
  id: string
  market_id: string
  user_id: string
  tradeType: string
  tokenAmountRaw: string
  tokenAmountFormatted: string
  reserveAmountRaw: string
  reserveAmountFormatted: string
  feeRaw: string
  feeFormatted: string
  newPriceRaw: string
  newPriceFormatted: string
  timestamp: string
  transactionHash: string
}

export type UseMarketTradesDataParams = {
  marketId: string | null | undefined
  type?: 'query' | 'subscription'
  enabled?: boolean
  limit?: number
}

export type UseMarketTradesDataResult = {
  key: ReturnType<typeof marketTradesSubKey>
  trades: TTradeSubscriptionData[]
  error: string | null
  isLoading: boolean
  type: 'query' | 'subscription'
}

/**
 * @description Unified hook for market trades - supports both query and subscription
 * @example
 * ```tsx
 * // Real-time subscription (default)
 * const { trades } = useMarketTradesData({ marketId, type: 'subscription' })
 *
 * // One-time query
 * const { trades } = useMarketTradesData({ marketId, type: 'query' })
 * ```
 */
export const useMarketTradesData = ({
  marketId,
  type = 'subscription',
  enabled = true,
  limit = 100,
}: UseMarketTradesDataParams): UseMarketTradesDataResult => {
  const isEnabled = enabled && Boolean(marketId)
  const key = marketTradesSubKey(marketId)

  const fields = useMemo(
    () => (isEnabled && marketId ? buildTradeSubscription(marketId, limit) : null),
    [isEnabled, marketId, limit]
  )

  // Query mode
  const queryResult = useGraphQLQuery({
    fields: fields ?? ({} as NonNullable<typeof fields>),
    queryKey: key,
    enabled: type === 'query' && isEnabled && fields !== null,
  })

  // Subscription mode
  const subResult = useSubscription({
    fields: fields ?? ({} as NonNullable<typeof fields>),
    enabled: type === 'subscription' && isEnabled && fields !== null,
  })

  const result = type === 'query' ? queryResult : subResult

  const trades = useMemo(() => {
    const raw = result.data?.Trade
    if (!raw) return []
    return dedupeByTxHash(raw as TTradeSubscriptionData[])
  }, [result.data])

  return {
    key,
    trades,
    error: result.error,
    isLoading: result.isLoading,
    type,
  }
}
