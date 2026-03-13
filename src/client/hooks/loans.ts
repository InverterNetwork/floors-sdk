import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'
import { type Address, getAddress } from 'viem'

import {
  buildUserLoansSubscription,
  fetchAllUserLoans,
  fetchUserLoans,
  type TGraphQLLoan,
  type TUserLoanData,
} from '../../graphql/api'
import { mapLoansToUserLoanData } from '../../graphql/api/mappers'
import { allUserLoansQueryKey, userLoansQueryKey } from '../query-keys'
import { useSubscription } from './subscriptions'

export type UseUserLoansQueryOptions<TData = TUserLoanData[]> = Omit<
  UseQueryOptions<TUserLoanData[], Error, TData, ReturnType<typeof userLoansQueryKey>>,
  'queryKey' | 'queryFn'
>

export type UseAllUserLoansQueryOptions<TData = TUserLoanData[]> = Omit<
  UseQueryOptions<TUserLoanData[], Error, TData, ReturnType<typeof allUserLoansQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches user's active loans for a specific market from the indexer.
 * Returns loan data including remaining debt, locked collateral, and loan status.
 * @param userAddress - The user's wallet address
 * @param marketId - The market to fetch loans for
 * @param options - Additional query options
 */
export const useUserLoansQuery = <TData = TUserLoanData[]>(
  userAddress: Address | string | null | undefined,
  marketId: string | null | undefined,
  options?: UseUserLoansQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(userAddress && marketId)

  return useQuery({
    queryKey: userLoansQueryKey(userAddress ?? null, marketId),
    queryFn: async () => {
      if (!userAddress || !marketId) return []
      const loans = await fetchUserLoans(userAddress, marketId)
      return mapLoansToUserLoanData(loans)
    },
    staleTime: 0, // Always consider data stale to allow refetching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    ...options,
    enabled,
  })
}

/**
 * @description Live subscription for user's active loans in a specific market.
 * Uses GraphQL subscriptions via the indexer for real-time updates instead of polling.
 * Falls back gracefully when subscription is not available.
 *
 * @param userAddress - The user's wallet address
 * @param marketId - The market to subscribe to
 */
export const useUserLoansSubscription = (
  userAddress: Address | string | null | undefined,
  marketId: string | null | undefined
): {
  data: TUserLoanData[]
  error: string | null
  isLoading: boolean
} => {
  const isEnabled = Boolean(userAddress && marketId)

  const subFields = useMemo(() => {
    if (!isEnabled || !userAddress || !marketId) return null
    try {
      const normalizedAddress = getAddress(userAddress as `0x${string}`)
      const normalizedMarket = getAddress(marketId as `0x${string}`)
      return buildUserLoansSubscription(normalizedAddress, normalizedMarket)
    } catch {
      return null
    }
  }, [isEnabled, userAddress, marketId])

  const sub = useSubscription({
    fields: subFields ?? ({} as NonNullable<typeof subFields>),
    enabled: isEnabled && subFields !== null,
  })

  const loans = useMemo(() => {
    if (!sub.data?.Loan) return []
    const mapped = mapLoansToUserLoanData(sub.data.Loan as unknown as TGraphQLLoan[])
    // Filter out loans with zero remaining debt (indexer may lag status update to REPAID)
    return mapped.filter((loan) => loan.remainingDebt > 0)
  }, [sub.data])

  return {
    data: loans,
    error: sub.error,
    isLoading: sub.isLoading,
  }
}

/**
 * @description Fetches all user's active loans across all markets from the indexer.
 * @param userAddress - The user's wallet address
 * @param options - Additional query options
 */
export const useAllUserLoansQuery = <TData = TUserLoanData[]>(
  userAddress: Address | string | null | undefined,
  options?: UseAllUserLoansQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(userAddress)

  return useQuery({
    queryKey: allUserLoansQueryKey(userAddress ?? null),
    queryFn: async () => {
      if (!userAddress) return []
      const loans = await fetchAllUserLoans(userAddress)
      return mapLoansToUserLoanData(loans)
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    ...options,
    enabled,
  })
}

/**
 * @description Helper to calculate total debt from loans
 */
export function calculateTotalDebt(loans: TUserLoanData[]): number {
  return loans.reduce((sum, loan) => sum + loan.remainingDebt, 0)
}

/**
 * @description Helper to calculate total locked collateral from loans
 */
export function calculateTotalLockedCollateral(loans: TUserLoanData[]): number {
  return loans.reduce((sum, loan) => sum + loan.lockedCollateral, 0)
}

/**
 * @description Helper to get the oldest loan (first to be repaid)
 */
export function getOldestLoan(loans: TUserLoanData[]): TUserLoanData | null {
  if (loans.length === 0) return null
  return loans.reduce((oldest, loan) => (loan.openedAt < oldest.openedAt ? loan : oldest), loans[0])
}
