import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'

import {
  fetchPresaleById,
  fetchPresales,
  fetchPresalesByMarket,
  type TPresale,
} from '../../graphql/api'
import { presaleQueryKey, presalesQueryKey } from '../query-keys'

export type UsePresalesQueryOptions<TData = TPresale[]> = Omit<
  UseQueryOptions<TPresale[], Error, TData, typeof presalesQueryKey>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches and caches all presales.
 */
export const usePresalesQuery = <TData = TPresale[]>(
  options?: UsePresalesQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const staleTime = options?.staleTime ?? 60_000
  const gcTime = options?.gcTime ?? 5 * 60_000

  return useQuery({
    queryKey: presalesQueryKey,
    queryFn: fetchPresales,
    ...options,
    staleTime,
    gcTime,
  })
}

export type UsePresaleQueryOptions<TData = TPresale | null> = Omit<
  UseQueryOptions<TPresale | null, Error, TData, ReturnType<typeof presaleQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches and caches a single presale by ID.
 * @param {string | null | undefined} presaleId - The target presale identifier.
 */
export const usePresaleQuery = <TData = TPresale | null>(
  presaleId: string | null | undefined,
  options?: UsePresaleQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(presaleId)
  const staleTime = options?.staleTime ?? 30_000

  return useQuery({
    queryKey: presaleQueryKey(presaleId),
    queryFn: () => fetchPresaleById(presaleId!),
    ...options,
    enabled,
    staleTime,
  })
}

const presalesByMarketQueryKey = (marketId: string) => ['presales', 'market', marketId] as const

export type UsePresalesByMarketQueryOptions<TData = TPresale[]> = Omit<
  UseQueryOptions<TPresale[], Error, TData, ReturnType<typeof presalesByMarketQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches and caches presales scoped to a market.
 * @param {string | null | undefined} marketId - The target market identifier.
 */
export const usePresalesByMarketQuery = <TData = TPresale[]>(
  marketId: string | null | undefined,
  options?: UsePresalesByMarketQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(marketId)
  const staleTime = options?.staleTime ?? 30_000

  return useQuery({
    queryKey: presalesByMarketQueryKey(marketId || ''),
    queryFn: () => fetchPresalesByMarket(marketId!),
    ...options,
    enabled,
    staleTime,
  })
}
