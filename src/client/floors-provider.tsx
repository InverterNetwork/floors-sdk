'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type ReactElement, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import { FloorsContext, useFloors } from './floors-context'
import {
  useMarketQuery,
  type UseMarketQueryOptions,
  useMarketsQuery,
  type UseMarketsQueryOptions,
} from './hooks/markets'

type FloorsProviderProps = {
  children: ReactNode
  marketsOptions?: UseMarketsQueryOptions
  marketOptions?: UseMarketQueryOptions
}

/**
 * @description Fetches Floor markets, provides selected market state, and exposes refetch helpers via context.
 */
export const FloorsProvider = ({
  children,
  marketsOptions,
  marketOptions,
}: FloorsProviderProps): ReactElement => {
  const queryClient = useQueryClient()
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null)

  const marketsQuery = useMarketsQuery(marketsOptions)
  const marketQuery = useMarketQuery(selectedMarketId, marketOptions)

  const { refetch: refetchMarkets } = marketsQuery
  const { refetch: refetchMarket } = marketQuery

  const refetchAll = useCallback(async () => {
    await queryClient.invalidateQueries({ refetchType: 'active' })
  }, [queryClient])

  const refetch = useMemo(
    () => ({
      all: refetchAll,
      markets: async () => {
        await refetchMarkets()
      },
      market: async () => {
        await refetchMarket()
      },
    }),
    [refetchAll, refetchMarkets, refetchMarket]
  )

  const contextValue = useMemo(
    () => ({
      markets: marketsQuery,
      market: marketQuery,
      selectedMarketId,
      setSelectedMarketId,
      refetch,
    }),
    [marketsQuery, marketQuery, selectedMarketId, refetch]
  )

  return <FloorsContext.Provider value={contextValue}>{children}</FloorsContext.Provider>
}

/**
 * @description Accesses the Floors context composed by `FloorsProvider`.
 * @throws If used outside of the provider tree.
 */
export const useSetSelectedMarket = (marketId?: string | null): void => {
  const { setSelectedMarketId } = useFloors()

  useEffect(() => {
    setSelectedMarketId(marketId ?? null)
  }, [marketId, setSelectedMarketId])
}

export { useFloors } from './floors-context'
