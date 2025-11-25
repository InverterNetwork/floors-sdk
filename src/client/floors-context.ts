'use client'

import type { UseQueryResult } from '@tanstack/react-query'
import { createContext, useContext } from 'react'

import type { TFloorAssetData } from '../graphql/api'

export type TFloorsContextValue = {
  markets: UseQueryResult<TFloorAssetData[], Error>
  market: UseQueryResult<TFloorAssetData | null, Error>
  selectedMarketId: string | null
  setSelectedMarketId: (marketId: string | null) => void
  refetch: {
    all: () => Promise<void>
    markets: () => Promise<void>
    market: () => Promise<void>
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
