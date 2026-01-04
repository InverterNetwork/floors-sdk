import { getAddress } from 'viem'

import { query } from '..'
import {
  accountsQuery,
  type AccountsQueryType,
  buildAuthorizerRolesQuery,
  buildMarketActivityQuery,
  buildPresalesQuery,
  combineMarketActivity,
  computePlatformMetrics,
  globalStatsQuery,
  type GlobalStatsQueryType,
  loansQuery,
  type LoansQueryType,
  mapGlobalStats,
  marketSnapshotQuery,
  type MarketSnapshotQueryType,
  marketsQuery,
  type MarketsQueryType,
  platformMetricsQuery,
  priceCandleQuery,
  type PriceCandleQueryType,
  type TAuthorizerRole,
  type TCreditPositionData,
  type TFloorAssetData,
  type TGlobalStats,
  type TGraphQLAccount,
  type TGraphQLLoan,
  type TGraphQLUserMarketPosition,
  type TMarketActivityData,
  type TPlatformMetrics,
  type TPresale,
  tradesQuery,
  type TradesQueryType,
  type TTradeData,
  type TUserAssetPosition,
  userMarketPositionQuery,
} from './fields'
import {
  buildAccountUserPositions,
  buildCreditPositions,
  mapMarketSnapshotToPremiumChange,
  mapMarketToFloorAssetData,
  mapPresaleToPresaleData,
  mapRolesToAuthorizerRoles,
  mapTradeToTradeData,
} from './mappers'
import { cloneQuery, type ExtendableQueryArgs, mergeFieldArgs } from './utils'

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

export const buildLoansQuery = (args?: ExtendableQueryArgs<LoansQueryType['Loan']['__args']>) => {
  const selection = cloneQuery(loansQuery)
  return mergeFieldArgs(selection, 'Loan', args)
}

export const buildMarketSnapshotQuery = (
  args?: ExtendableQueryArgs<MarketSnapshotQueryType['MarketSnapshot']['__args']>
) => {
  const selection = cloneQuery(marketSnapshotQuery)
  return mergeFieldArgs(selection, 'MarketSnapshot', args)
}

export const buildPriceCandleQuery = (
  args?: ExtendableQueryArgs<PriceCandleQueryType['PriceCandle']['__args']>
) => {
  const selection = cloneQuery(priceCandleQuery)
  return mergeFieldArgs(selection, 'PriceCandle', args)
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

  // Fetch daily volume candles for volume chart
  const priceCandlesResponse = await query(
    buildPriceCandleQuery({
      where: {
        market_id: { _eq: id },
        period: { _eq: 'ONE_DAY' },
      },
      order_by: [{ timestamp: 'desc' }],
      limit: 365, // Max 1 year of daily candles
    })
  )

  // Reverse to get chronological order (oldest first for chart)
  const priceCandles = (priceCandlesResponse.PriceCandle ?? []).reverse()

  const mappedMarket = mapMarketToFloorAssetData(market, moduleRegistry)

  // Add priceCandles to the mapped market data (already reversed to chronological order)
  return {
    ...mappedMarket,
    priceCandles: priceCandles,
  } as TFloorAssetData
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
 * @description Fetch authorizer roles by authorizer ID
 */
export async function fetchAuthorizerRolesById(
  authorizerId: string,
  userAddress?: string
): Promise<TAuthorizerRole[]> {
  const normalizedAuthorizer = getAddress(authorizerId as `0x${string}`)
  const response = await query(
    buildAuthorizerRolesQuery({
      where: { authorizer_id: { _eq: normalizedAuthorizer } },
    })
  )
  const roles = response.Role ?? []
  return mapRolesToAuthorizerRoles(roles, userAddress)
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

/**
 * Fetch user's active loans for a specific market
 * @param userAddress - The user's wallet address
 * @param marketId - The market ID to filter loans by
 * @returns Array of active loans for the user in that market
 */
export async function fetchUserLoans(
  userAddress: string,
  marketId: string
): Promise<TGraphQLLoan[]> {
  if (!userAddress || !marketId) return []

  try {
    const normalizedUserAddress = getAddress(userAddress as `0x${string}`)
    const normalizedMarketId = getAddress(marketId as `0x${string}`)

    const response = await query(
      buildLoansQuery({
        where: {
          borrower_id: { _eq: normalizedUserAddress },
          market_id: { _eq: normalizedMarketId },
          status: { _neq: 'REPAID' },
        },
        // Oldest first for repay priority
        order_by: [{ openedAt: 'asc' }] as unknown as [{ openedAt: 'desc' }],
      })
    )

    return response.Loan ?? []
  } catch (error) {
    console.error('Error fetching user loans:', error)
    return []
  }
}

/**
 * Fetch all loans for a user across all markets
 * @param userAddress - The user's wallet address
 * @returns Array of all active loans for the user
 */
export async function fetchAllUserLoans(userAddress: string): Promise<TGraphQLLoan[]> {
  if (!userAddress) return []

  try {
    const normalizedUserAddress = getAddress(userAddress as `0x${string}`)

    const response = await query(
      buildLoansQuery({
        where: {
          borrower_id: { _eq: normalizedUserAddress },
          status: { _neq: 'REPAID' },
        },
        // Oldest first
        order_by: [{ openedAt: 'asc' }] as unknown as [{ openedAt: 'desc' }],
      })
    )

    return response.Loan ?? []
  } catch (error) {
    console.error('Error fetching all user loans:', error)
    return []
  }
}

/**
 * Fetch premium change 24h for a market
 * @param marketId - The market ID
 * @param currentMarketPrice - Current market price
 * @param currentFloorPrice - Current floor price
 * @returns Premium change percentage over 24 hours, or null if no historical data available
 */
export async function fetchPremiumChange24h(
  marketId: string,
  currentMarketPrice: number,
  currentFloorPrice: number
): Promise<number | null> {
  try {
    // Calculate 24 hours ago timestamp (in seconds)
    const now = Math.floor(Date.now() / 1000)
    const twentyFourHoursAgo = now - 86400 // 24 hours in seconds

    // Query for MarketSnapshot closest to 24h ago
    const snapshotResponse = await query(
      buildMarketSnapshotQuery({
        where: {
          market_id: { _eq: marketId },
          timestamp: { _lte: String(twentyFourHoursAgo) },
        },
        order_by: [{ timestamp: 'desc' }],
        limit: 1,
      })
    )
    const snapshot = snapshotResponse.MarketSnapshot?.[0]

    // Use mapper to calculate premium change
    return mapMarketSnapshotToPremiumChange(snapshot, currentMarketPrice, currentFloorPrice)
  } catch (error) {
    console.error('Error fetching premium change 24h:', error)
    return null
  }
}

/**
 * Fetch all market activity (trades + loans) in a single query
 * @param marketId - The market ID
 * @param limit - Maximum number of items per entity type (default: 100)
 * @returns Combined and sorted array of market activity
 */
export async function fetchMarketActivity(
  marketId: string,
  limit: number = 100
): Promise<TMarketActivityData[]> {
  if (!marketId) return []

  try {
    const normalizedMarketId = getAddress(marketId as `0x${string}`)

    // Single GraphQL query fetching both trades and loans
    const response = await query(buildMarketActivityQuery(normalizedMarketId, limit))

    const trades = response.Trade ?? []
    const loans = response.Loan ?? []

    // Combine and sort by timestamp
    return combineMarketActivity(trades, loans)
  } catch (error) {
    console.error('Error fetching market activity:', error)
    return []
  }
}
