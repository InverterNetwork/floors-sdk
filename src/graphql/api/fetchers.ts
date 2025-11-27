import { getAddress } from 'viem'

import { query } from '..'
import type {
  AccountsQueryType,
  GlobalStatsQueryType,
  MarketsQueryType,
  TCreditPositionData,
  TFloorAssetData,
  TGlobalStats,
  TGraphQLAccount,
  TGraphQLLoan,
  TGraphQLUserMarketPosition,
  TPlatformMetrics,
  TPresale,
  TradesQueryType,
  TTradeData,
  TUserAssetPosition,
} from './fields'
import {
  accountsQuery,
  buildPresalesQuery,
  computePlatformMetrics,
  globalStatsQuery,
  mapGlobalStats,
  marketsQuery,
  platformMetricsQuery,
  tradesQuery,
  userMarketPositionQuery,
} from './fields'
import {
  buildAccountUserPositions,
  buildCreditPositions,
  mapMarketToFloorAssetData,
  mapPresaleToPresaleData,
  mapTradeToTradeData,
} from './mappers'
import type { ExtendableQueryArgs } from './utils'
import { cloneQuery, mergeFieldArgs } from './utils'

export const buildMarketsQuery = (
  args?: ExtendableQueryArgs<MarketsQueryType['Market']['__args']>
) => {
  const selection = cloneQuery(marketsQuery)
  return mergeFieldArgs(selection, 'Market', args)
}

export const buildTradesQuery = (
  args?: ExtendableQueryArgs<TradesQueryType['Trade']['__args']>
) => {
  const selection = cloneQuery(tradesQuery)
  return mergeFieldArgs(selection, 'Trade', args)
}

export const buildAccountsQuery = (
  args?: ExtendableQueryArgs<AccountsQueryType['Account']['__args']>
) => {
  const selection = cloneQuery(accountsQuery)
  return mergeFieldArgs(selection, 'Account', args)
}

export const buildPlatformMetricsQuery = () => cloneQuery(platformMetricsQuery)

export const buildGlobalStatsQuery = (args?: ExtendableQueryArgs<GlobalStatsQueryType>) => {
  const selection = cloneQuery(globalStatsQuery)
  return mergeFieldArgs(selection, 'GlobalStats', args)
}

export async function fetchMarkets(): Promise<TFloorAssetData[]> {
  const response = await query(buildMarketsQuery())
  const markets = response.Market ?? []
  return markets.map((market) => mapMarketToFloorAssetData(market))
}

export async function fetchMarketById(id: string): Promise<TFloorAssetData | null> {
  const response = await query(buildMarketsQuery({ where: { id: { _eq: id } } }))
  const market = (response.Market ?? [])[0]
  if (!market) return null

  // Fetch ModuleRegistry to get credit facility address
  const registryResponse = await query({
    ModuleRegistry_by_pk: {
      __args: { id },
      id: true,
      creditFacility: true,
      floor: true,
      authorizer: true,
      feeTreasury: true,
      presale: true,
      staking: true,
      createdAt: true,
      lastUpdatedAt: true,
      __typename: true,
    },
  })

  const moduleRegistry = registryResponse.ModuleRegistry_by_pk

  return mapMarketToFloorAssetData(market, moduleRegistry)
}

export async function fetchPlatformMetrics(): Promise<TPlatformMetrics> {
  const response = await query(buildPlatformMetricsQuery())
  return computePlatformMetrics(response)
}

export async function fetchGlobalStats(): Promise<TGlobalStats | null> {
  const response = await query(buildGlobalStatsQuery())
  const stats = (response.GlobalStats ?? [])[0]
  return mapGlobalStats(stats)
}

export async function fetchTradesByMarket(marketId: string): Promise<TTradeData[]> {
  const response = await query(
    buildTradesQuery({
      where: { market_id: { _eq: marketId } },
      limit: 50,
    })
  )
  const trades = response.Trade ?? []
  return trades.map((trade) => mapTradeToTradeData(trade))
}

export async function fetchTradesByUser(userId: string): Promise<TTradeData[]> {
  const response = await query(
    buildTradesQuery({
      where: { user_id: { _eq: userId } },
      limit: 50,
    })
  )
  const trades = response.Trade ?? []
  return trades.map((trade) => mapTradeToTradeData(trade))
}

export async function fetchAccountById(id: string): Promise<TGraphQLAccount | null> {
  const response = await query(
    buildAccountsQuery({
      where: { id: { _eq: id } },
      order_by: [{ id: 'desc' }],
      limit: 1,
    })
  )
  return (response.Account ?? [])[0] ?? null
}

export function buildUserPositionsFromAccount(
  account: TGraphQLAccount,
  assets: TFloorAssetData[]
): TUserAssetPosition[] {
  return buildAccountUserPositions(account, assets)
}

export function buildCreditPositionsFromLoans(
  loans: TGraphQLLoan[],
  assets: TFloorAssetData[]
): TCreditPositionData[] {
  return buildCreditPositions(loans, assets)
}

/**
 * Fetch all presales
 */
export async function fetchPresales(): Promise<TPresale[]> {
  const response = await query(buildPresalesQuery())
  const presales = response.PreSaleContract ?? []
  return presales.map((presale) => mapPresaleToPresaleData(presale))
}

/**
 * Fetch a single presale by ID
 */
export async function fetchPresaleById(id: string): Promise<TPresale | null> {
  const response = await query(buildPresalesQuery({ where: { id: { _eq: id } } }))
  const presale = (response.PreSaleContract ?? [])[0]
  if (!presale) return null
  return mapPresaleToPresaleData(presale)
}

/**
 * Fetch presales by market ID
 */
export async function fetchPresalesByMarket(marketId: string): Promise<TPresale[]> {
  const response = await query(buildPresalesQuery({ where: { market_id: { _eq: marketId } } }))
  const presales = response.PreSaleContract ?? []
  return presales.map((presale) => mapPresaleToPresaleData(presale))
}

/**
 * Fetch user market position (loan collateral and debt info)
 */
export async function fetchUserMarketPosition(
  userAddress: string,
  marketId: string
): Promise<TGraphQLUserMarketPosition | null> {
  if (!userAddress || !marketId) return null

  try {
    // Normalize addresses to checksummed format (matches indexer storage)
    // The indexer uses normalizeAddress which uses getAddress from viem
    const normalizedUserAddress = getAddress(userAddress as `0x${string}`)
    const normalizedMarketId = getAddress(marketId as `0x${string}`)

    const queryWithArgs = cloneQuery(userMarketPositionQuery)
    queryWithArgs.UserMarketPosition.__args = {
      where: {
        user_id: { _eq: normalizedUserAddress },
        market_id: { _eq: normalizedMarketId },
      },
    }

    const response = await query(queryWithArgs)
    return response.UserMarketPosition?.[0] ?? null
  } catch (error) {
    console.error('Error fetching user market position:', error)
    return null
  }
}
