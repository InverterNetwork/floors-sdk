'use client'

import { useQuery } from '@tanstack/react-query'
import * as React from 'react'

import type { GraphQLQueryArgs, GraphQLSubscriptionArgs } from '../../graphql'
import { query, subscription } from '../../graphql'
import type { QueryResult, SubscriptionResult } from '../../graphql/gen'

// ============================================================================
// Helpers
// ============================================================================

/**
 * @description Deduplicates an array of items by their `id` field
 */
export const dedupeById = <T extends { id: string }>(items: T[]): T[] => {
  const uniqueMap = new Map<string, T>()
  for (const item of items) {
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item)
    }
  }
  return Array.from(uniqueMap.values())
}

/**
 * @description Deduplicates an array of items by their `transactionHash` field
 */
export const dedupeByTxHash = <T extends { transactionHash: string }>(items: T[]): T[] => {
  const uniqueMap = new Map<string, T>()
  for (const item of items) {
    if (!uniqueMap.has(item.transactionHash)) {
      uniqueMap.set(item.transactionHash, item)
    }
  }
  return Array.from(uniqueMap.values())
}

// ============================================================================
// Types
// ============================================================================

export type DataFetchType = 'query' | 'subscription'

export type UseGraphQLQueryParams<T extends GraphQLQueryArgs> = {
  fields: T
  queryKey: readonly unknown[]
  enabled?: boolean
  staleTime?: number
  gcTime?: number
}

export type UseGraphQLQueryResult<T extends GraphQLQueryArgs> = {
  data: QueryResult<T> | null
  error: string | null
  isLoading: boolean
}

export type UseSubscriptionParams<T extends GraphQLSubscriptionArgs> = {
  fields: T
  enabled?: boolean
}

export type UseSubscriptionResult<T extends GraphQLSubscriptionArgs> = {
  data: SubscriptionResult<T> | null
  error: string | null
  isLoading: boolean
}

// ============================================================================
// Query Hook
// ============================================================================

/**
 * @description Generic hook for GraphQL queries using react-query
 */
export const useGraphQLQuery = <T extends GraphQLQueryArgs>({
  fields,
  queryKey,
  enabled = true,
  staleTime = 30_000,
  gcTime = 5 * 60_000,
}: UseGraphQLQueryParams<T>): UseGraphQLQueryResult<T> => {
  const result = useQuery({
    queryKey,
    queryFn: () => query(fields),
    enabled,
    staleTime,
    gcTime,
  })

  return {
    data: result.data ?? null,
    error: result.error?.message ?? null,
    isLoading: result.isLoading,
  }
}

// ============================================================================
// Subscription Hook
// ============================================================================

/**
 * @description Generic hook for GraphQL subscriptions with auto-cleanup
 */
export const useSubscription = <T extends GraphQLSubscriptionArgs>({
  fields,
  enabled = true,
}: UseSubscriptionParams<T>): UseSubscriptionResult<T> => {
  const [data, setData] = React.useState<SubscriptionResult<T> | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!enabled) {
      setData(null)
      setError(null)
      return () => {}
    }

    setData(null)
    setError(null)

    try {
      const sub = subscription(fields)
      const callbackId = sub.addCallback(setData)

      return () => {
        sub.removeCallback(callbackId)
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'
      console.error('[useSubscription] Error:', message)
      setError(message)
      return () => {}
    }
  }, [JSON.stringify(fields), enabled])

  return {
    data,
    error,
    isLoading: enabled && !data && !error,
  }
}

// ============================================================================
// Unified Data Hook
// ============================================================================

export type UseDataParams<Q extends GraphQLQueryArgs, S extends GraphQLSubscriptionArgs> = {
  type?: DataFetchType
  queryFields: Q
  subscriptionFields: S
  queryKey: readonly unknown[]
  enabled?: boolean
  staleTime?: number
}

export type UseDataResult<Q extends GraphQLQueryArgs, S extends GraphQLSubscriptionArgs> = {
  data: QueryResult<Q> | SubscriptionResult<S> | null
  error: string | null
  isLoading: boolean
  type: DataFetchType
}

/**
 * @description Unified hook that supports both query and subscription modes
 * @example
 * ```tsx
 * const { data, isLoading } = useData({
 *   type: 'subscription', // or 'query'
 *   queryFields: { ... },
 *   subscriptionFields: { ... },
 *   queryKey: ['my-key'],
 *   enabled: true,
 * })
 * ```
 */
export const useData = <Q extends GraphQLQueryArgs, S extends GraphQLSubscriptionArgs>({
  type = 'query',
  queryFields,
  subscriptionFields,
  queryKey,
  enabled = true,
  staleTime,
}: UseDataParams<Q, S>): UseDataResult<Q, S> => {
  const queryResult = useGraphQLQuery({
    fields: queryFields,
    queryKey,
    enabled: type === 'query' && enabled,
    staleTime,
  })

  const subscriptionResult = useSubscription({
    fields: subscriptionFields,
    enabled: type === 'subscription' && enabled,
  })

  const result = type === 'query' ? queryResult : subscriptionResult

  return {
    data: result.data as QueryResult<Q> | SubscriptionResult<S> | null,
    error: result.error,
    isLoading: result.isLoading,
    type,
  }
}
