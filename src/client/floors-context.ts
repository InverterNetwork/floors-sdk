'use client'

import type { UseQueryResult } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import type { Address } from 'viem'
import type { UseBalanceReturnType } from 'wagmi'

import type { TFloorAssetData, TPresale } from '../graphql/api'
import type { TUserMarketPositionData } from '../graphql/api/mappers'

export type TTokenBalanceMetadata = {
  address: Address | null
  symbol?: string
  name?: string
  decimals?: number
  logoUrl?: string
}

export type TTokenBalanceContextValue = UseBalanceReturnType & {
  token: TTokenBalanceMetadata
}

export type TFloorsTokenBalances = {
  reserve: TTokenBalanceContextValue
  issuance: TTokenBalanceContextValue
}
export type TFloorsContextValue = {
  markets: UseQueryResult<TFloorAssetData[], Error>
  market: UseQueryResult<TFloorAssetData | null, Error>
  presales: UseQueryResult<TPresale[], Error>
  presale: UseQueryResult<TPresale | null, Error>
  selectedMarketId: string | null
  selectedPresaleId: string | null
  setSelectedMarketId: (marketId: string | null) => void
  setSelectedPresaleId: (presaleId: string | null) => void
  balances: TFloorsTokenBalances
  userPosition: UseQueryResult<TUserMarketPositionData | null, Error>
  refetch: {
    all: () => Promise<void>
    markets: () => Promise<void>
    market: () => Promise<void>
    reserveBalance: () => Promise<void>
    issuanceBalance: () => Promise<void>
    presales: () => Promise<void>
    presale: () => Promise<void>
    userPosition: () => Promise<void>
  }
}

export const FloorsContext = createContext<TFloorsContextValue | null>(null)

/**
 * @description Internal access to Floors context without throwing – allows optional fallbacks.
 */
export const useFloors = (): TFloorsContextValue => {
  const context = useContext(FloorsContext)

  if (!context) throw new Error('useFloors must be used within a FloorsProvider.')

  return context
}
