'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type ReactElement, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import type { Address } from 'viem'
import { useAccount, useBalance } from 'wagmi'

import {
  FloorsContext,
  type TFloorsTokenBalances,
  type TTokenBalanceMetadata,
  useFloors,
} from './floors-context'
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

const toAddress = (value?: string | null): Address | null => {
  if (!value) return null
  return value as Address
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
  const { address: walletAddress } = useAccount()

  const marketsQuery = useMarketsQuery(marketsOptions)
  const marketQuery = useMarketQuery(selectedMarketId, marketOptions)
  const activeMarket = marketQuery.data

  const reserveTokenMetadata = useMemo<TTokenBalanceMetadata>(
    () => ({
      address: toAddress(activeMarket?.reserveToken_id),
      symbol: activeMarket?.reserveToken?.symbol,
      name: activeMarket?.reserveToken?.name,
      decimals: activeMarket?.reserveToken?.decimals,
    }),
    [activeMarket]
  )

  const issuanceTokenMetadata = useMemo<TTokenBalanceMetadata>(
    () => ({
      address: toAddress(activeMarket?.issuanceToken_id),
      symbol: activeMarket?.issuanceToken?.symbol ?? activeMarket?.symbol,
      name: activeMarket?.issuanceToken?.name ?? activeMarket?.name,
      decimals: activeMarket?.issuanceToken?.decimals,
    }),
    [activeMarket]
  )

  const reserveBalance = useBalance({
    address: walletAddress,
    token: reserveTokenMetadata.address ?? undefined,
    query: {
      enabled: Boolean(walletAddress && reserveTokenMetadata.address),
      staleTime: 30_000,
    },
  })

  const issuanceBalance = useBalance({
    address: walletAddress,
    token: issuanceTokenMetadata.address ?? undefined,
    query: {
      enabled: Boolean(walletAddress && issuanceTokenMetadata.address),
      staleTime: 30_000,
    },
  })

  const balances = useMemo<TFloorsTokenBalances>(
    () => ({
      reserve: {
        token: reserveTokenMetadata,
        ...reserveBalance,
      },
      issuance: {
        token: issuanceTokenMetadata,
        ...issuanceBalance,
      },
    }),
    [reserveTokenMetadata, reserveBalance, issuanceTokenMetadata, issuanceBalance]
  )

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
      reserveBalance: async () => {
        await reserveBalance.refetch()
      },
      issuanceBalance: async () => {
        await issuanceBalance.refetch()
      },
    }),
    [refetchAll, refetchMarkets, refetchMarket, reserveBalance, issuanceBalance]
  )

  const contextValue = useMemo(
    () => ({
      markets: marketsQuery,
      market: marketQuery,
      selectedMarketId,
      setSelectedMarketId,
      balances,
      refetch,
    }),
    [marketsQuery, marketQuery, selectedMarketId, balances, refetch]
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

export type {
  TFloorsContextValue,
  TFloorsTokenBalances,
  TTokenBalanceContextValue,
  TTokenBalanceMetadata,
} from './floors-context'
export { useFloors } from './floors-context'
