'use client'

import type { UseQueryResult } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import type { Address } from 'viem'

import type { TFloorAssetData, TPresale } from '../graphql/api'
import type { TUserMarketPositionData } from '../graphql/api/mappers'

export type TTokenBalanceMetadata = {
  address: Address | null
  symbol?: string
  name?: string
  decimals?: number
  logoUrl?: string
}

export type TTokenBalanceData = {
  value: bigint
  decimals: number
  formatted: string
}

export type TTokenBalanceContextValue = {
  token: TTokenBalanceMetadata
  data: TTokenBalanceData | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => Promise<unknown>
  status: 'pending' | 'error' | 'success'
  fetchStatus: 'fetching' | 'paused' | 'idle'
}

export type TFloorsTokenBalances = {
  reserve: TTokenBalanceContextValue
  issuance: TTokenBalanceContextValue
}

export type TFloorsConfig = {
  /** FloorFactory contract address for creating new markets */
  floorFactoryAddress?: Address
  /** ModuleFactory contract address */
  moduleFactoryAddress?: Address
  /** TransactionForwarder address for batching configuration calls */
  transactionForwarderAddress?: Address
  /** Governor contract address */
  governorAddress?: Address
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
  /** Contract addresses and configuration */
  config: TFloorsConfig
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
