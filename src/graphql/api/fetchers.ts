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
  TPlatformMetrics,
  TradesQueryType,
  TTradeData,
  TUserAssetPosition,
} from './fields'
import {
  accountsQuery,
  computePlatformMetrics,
  globalStatsQuery,
  mapGlobalStats,
  marketsQuery,
  platformMetricsQuery,
  tradesQuery,
} from './fields'
import {
  buildAccountUserPositions,
  buildCreditPositions,
  mapMarketToFloorAssetData,
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
  return mapMarketToFloorAssetData(market)
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
