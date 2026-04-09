import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { getAddress } from 'viem'

import { buildAccountSubscription, fetchAccountById, type TGraphQLAccount } from '../../graphql/api'
import { accountQueryKey } from '../query-keys'
import { useSubscription } from './subscriptions'

type UseAccountQueryOptions<TData = TGraphQLAccount | null> = Omit<
  UseQueryOptions<TGraphQLAccount | null, Error, TData, ReturnType<typeof accountQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches a user account and caches it by account id.
 */
export const useAccountQuery = <TData = TGraphQLAccount | null>(
  accountId: string | null | undefined,
  options?: UseAccountQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(accountId)

  return useQuery({
    queryKey: accountQueryKey(accountId),
    queryFn: () => fetchAccountById(accountId!),
    ...options,
    enabled,
  })
}

/**
 * @description Subscribes to Account rows and mirrors updates into the {@link accountQueryKey} cache.
 */
export const useAccountSubscription = (accountId: string | null | undefined): void => {
  const queryClient = useQueryClient()
  const normalized = useMemo(() => {
    if (!accountId || !accountId.startsWith('0x')) return null
    try {
      return getAddress(accountId as `0x${string}`)
    } catch {
      return null
    }
  }, [accountId])

  const fields = useMemo(
    () => (normalized ? buildAccountSubscription(normalized) : null),
    [normalized]
  )

  const sub = useSubscription({
    fields: fields ?? ({} as NonNullable<typeof fields>),
    enabled: Boolean(normalized && fields),
  })

  useEffect(() => {
    const row = sub.data?.Account?.[0]
    if (!normalized || !row) return
    queryClient.setQueryData(accountQueryKey(normalized), row as TGraphQLAccount)
  }, [sub.data, normalized, queryClient])
}
