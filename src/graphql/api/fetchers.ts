import { type Address, getAddress } from 'viem'

import { query } from '..'
import {
  accountsQuery,
  type AccountsQueryType,
  buildAuthorizerRolesQuery,
  buildFloorElevationsQuery,
  buildMarketActivityQuery,
  buildPresalesQuery,
  buildStakingActivitiesQuery,
  buildStrategiesQuery,
  combineMarketActivity,
  computeGlobalMetricsWithHistory,
  computePlatformMetrics,
  createChart7dQuery,
  createChart24hQuery,
  createChart30dQuery,
  createGlobalStatsHistoryQuery,
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
  type TGlobalMetricsWithHistory,
  type TGlobalStats,
  type TGraphQLAccount,
  type TGraphQLFloorElevation,
  type TGraphQLLoan,
  type TGraphQLStakingActivity,
  type TGraphQLStrategy,
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
import { cloneQuery, type ExtendableQueryArgs, mergeFieldArgs, toNumber } from './utils'

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

  // Fetch active strategies for this market's StakingManager (if any)
  let activeStrategyAddresses: string[] = []
  let firstStrategyAddress: string | null = null
  if (moduleRegistry?.staking) {
    const strategyResponse = await query({
      Strategy: {
        __args: {
          where: { stakingManager_id: { _eq: moduleRegistry.staking }, isActive: { _eq: true } },
          order_by: [{ addedAt: 'asc' }],
        },
        id: true,
      },
    })
    const strategies = strategyResponse.Strategy ?? []
    activeStrategyAddresses = strategies.map((strategy) => strategy.id)
    firstStrategyAddress = activeStrategyAddresses[0] ?? null
  }

  // Fetch all candle periods in parallel for different timeframes
  // ONE_HOUR: for 1D timeframe (24 data points per day)
  // FOUR_HOURS: for 1W timeframe (42 data points per week)
  // ONE_DAY: for 1M+ timeframes (30-365 data points)
  const [hourlyResponse, fourHourResponse, dailyResponse] = await Promise.all([
    query(
      buildPriceCandleQuery({
        where: {
          market_id: { _eq: id },
          period: { _eq: 'ONE_HOUR' },
        },
        order_by: [{ timestamp: 'desc' }],
        limit: 168, // 7 days of hourly data (7 * 24)
      })
    ),
    query(
      buildPriceCandleQuery({
        where: {
          market_id: { _eq: id },
          period: { _eq: 'FOUR_HOURS' },
        },
        order_by: [{ timestamp: 'desc' }],
        limit: 84, // ~14 days of 4-hour data (14 * 6)
      })
    ),
    query(
      buildPriceCandleQuery({
        where: {
          market_id: { _eq: id },
          period: { _eq: 'ONE_DAY' },
        },
        order_by: [{ timestamp: 'desc' }],
        limit: 365, // Max 1 year of daily candles
      })
    ),
  ])

  // Reverse to get chronological order (oldest first for chart)
  const priceCandles = {
    hourly: (hourlyResponse.PriceCandle ?? []).reverse(),
    fourHour: (fourHourResponse.PriceCandle ?? []).reverse(),
    daily: (dailyResponse.PriceCandle ?? []).reverse(),
  }

  const mappedMarket = mapMarketToFloorAssetData(market, moduleRegistry)

  // Add priceCandles and strategy data to the mapped market data
  return {
    ...mappedMarket,
    priceCandles,
    activeStrategyAddresses,
    firstStrategyAddress,
  } as TFloorAssetData
}

export async function fetchPlatformMetrics(): Promise<TPlatformMetrics> {
  // Fetch GlobalStats to get chain timestamp
  const [response, globalStatsResponse] = await Promise.all([
    query(buildPlatformMetricsQuery()),
    query(buildGlobalStatsQuery()),
  ])
  const globalStats = (globalStatsResponse.GlobalStats ?? [])[0]
  const chainTimestamp = globalStats?.lastUpdatedAt
    ? toNumber(globalStats.lastUpdatedAt)
    : undefined
  return computePlatformMetrics(response, chainTimestamp)
}

export async function fetchGlobalStats(): Promise<TGlobalStats | null> {
  const response = await query(buildGlobalStatsQuery())
  const stats = (response.GlobalStats ?? [])[0]
  return mapGlobalStats(stats)
}

/**
 * Fetch global metrics with historical data for charts and change calculations
 * Returns TVL, Market Cap, and volume with 24h/7d/30d changes + chart data
 */
export async function fetchGlobalMetricsWithHistory(): Promise<TGlobalMetricsWithHistory> {
  // Fetch GlobalStats first to get chain timestamp
  const globalStatsResponse = await query(buildGlobalStatsQuery())
  const globalStats = (globalStatsResponse.GlobalStats ?? [])[0]
  const chainTimestamp = globalStats?.lastUpdatedAt
    ? toNumber(globalStats.lastUpdatedAt)
    : undefined

  // Fetch all data in parallel
  const [currentData, chart24hData, chart7dData, chart30dData] = await Promise.all([
    query(createGlobalStatsHistoryQuery()),
    query(createChart24hQuery()),
    query(createChart7dQuery()),
    query(createChart30dQuery()),
  ])

  return computeGlobalMetricsWithHistory(
    currentData,
    chart24hData,
    chart7dData,
    chart30dData,
    chainTimestamp
  )
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
  // Fetch GlobalStats to get the latest chain timestamp
  const [response, globalStatsResponse] = await Promise.all([
    query(buildPresalesQuery()),
    query(buildGlobalStatsQuery()),
  ])
  const presales = response.PreSaleContract ?? []
  const globalStats = (globalStatsResponse.GlobalStats ?? [])[0]
  const chainTimestampMs = globalStats?.lastUpdatedAt
    ? toNumber(globalStats.lastUpdatedAt) * 1000
    : undefined

  return presales.map((presale) => mapPresaleToPresaleData(presale, chainTimestampMs))
}

/**
 * Fetch a single presale by ID
 */
export async function fetchPresaleById(id: string): Promise<TPresale | null> {
  // Fetch GlobalStats to get the latest chain timestamp
  const [response, globalStatsResponse] = await Promise.all([
    query(buildPresalesQuery({ where: { id: { _eq: id } } })),
    query(buildGlobalStatsQuery()),
  ])
  const presale = (response.PreSaleContract ?? [])[0]
  const globalStats = (globalStatsResponse.GlobalStats ?? [])[0]
  const chainTimestampMs = globalStats?.lastUpdatedAt
    ? toNumber(globalStats.lastUpdatedAt) * 1000
    : undefined
  if (!presale) return null
  return mapPresaleToPresaleData(presale, chainTimestampMs)
}

/**
 * Fetch presales by market ID
 */
export async function fetchPresalesByMarket(marketId: string): Promise<TPresale[]> {
  // Fetch GlobalStats to get the latest chain timestamp
  const [response, globalStatsResponse] = await Promise.all([
    query(buildPresalesQuery({ where: { market_id: { _eq: marketId } } })),
    query(buildGlobalStatsQuery()),
  ])
  const presales = response.PreSaleContract ?? []
  const globalStats = (globalStatsResponse.GlobalStats ?? [])[0]
  const chainTimestampMs = globalStats?.lastUpdatedAt
    ? toNumber(globalStats.lastUpdatedAt) * 1000
    : undefined
  return presales.map((presale) => mapPresaleToPresaleData(presale, chainTimestampMs))
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
    // Fetch GlobalStats to get chain timestamp
    const globalStatsResponse = await query(buildGlobalStatsQuery())
    const globalStats = (globalStatsResponse.GlobalStats ?? [])[0]
    const chainTimestamp = globalStats?.lastUpdatedAt
      ? toNumber(globalStats.lastUpdatedAt)
      : Math.floor(Date.now() / 1000)

    // Calculate 24 hours ago timestamp (in seconds) using chain time
    const twentyFourHoursAgo = chainTimestamp - 86400 // 24 hours in seconds

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
 * Fetch all available strategies from the indexer
 * @param activeOnly - Filter to only active strategies (default: true)
 * @param limit - Maximum number of strategies to fetch (default: 100)
 * @returns Array of available strategies
 */
export async function fetchAvailableStrategies(
  activeOnly: boolean = true,
  limit: number = 100
): Promise<TGraphQLStrategy[]> {
  try {
    const whereClause: Record<string, any> = activeOnly ? { isActive: { _eq: true } } : {}

    const response = await query(
      buildStrategiesQuery({
        where: whereClause,
        order_by: [{ addedAt: 'desc' }],
        limit,
      })
    )

    return response.Strategy ?? []
  } catch (error) {
    console.error('Error fetching available strategies:', error)
    return []
  }
}

/**
 * Fetch GlobalRegistry addresses from the indexer
 * @returns Object containing floorFactoryAddress, moduleFactoryAddress, trustedForwarderAddress, governorAddress
 */
export async function fetchGlobalRegistry(): Promise<{
  floorFactoryAddress: Address
  moduleFactoryAddress: Address
  trustedForwarderAddress: Address
  governorAddress: Address
} | null> {
  try {
    const response = await query({
      GlobalRegistry: {
        __args: {
          where: { id: { _eq: 'global-registry' } },
        },
        floorFactoryAddress: true,
        moduleFactoryAddress: true,
        trustedForwarderAddress: true,
        governorAddress: true,
      },
    })

    const registry = response.GlobalRegistry?.[0]
    if (!registry) return null

    return {
      floorFactoryAddress: registry.floorFactoryAddress.toLowerCase() as Address,
      moduleFactoryAddress: registry.moduleFactoryAddress.toLowerCase() as Address,
      trustedForwarderAddress: registry.trustedForwarderAddress.toLowerCase() as Address,
      governorAddress: registry.governorAddress.toLowerCase() as Address,
    }
  } catch (error) {
    console.error('Error fetching GlobalRegistry:', error)
    return null
  }
}

/**
 * Fetch floor elevation events for a specific market
 * @param marketId - The market ID to fetch elevations for
 * @param limit - Maximum number of elevations to fetch (default: 30)
 * @returns Array of floor elevation events
 */
export async function fetchFloorElevations(
  marketId: string,
  limit: number = 30
): Promise<TGraphQLFloorElevation[]> {
  try {
    const response = await query(buildFloorElevationsQuery(marketId, limit))
    return response.FloorElevation ?? []
  } catch (error) {
    console.error('Error fetching floor elevations:', error)
    return []
  }
}

/**
 * Fetch staking activities with optional filters
 * @param params - Query parameters
 * @param params.stakingManagerId - Filter by staking manager ID
 * @param params.activityType - Filter by activity type (e.g., 'HARVEST')
 * @param params.limit - Maximum number of activities to fetch (default: 100)
 * @param params.timestampGte - Filter activities after this timestamp (Unix seconds)
 * @returns Array of staking activities
 */
export async function fetchStakingActivities(params?: {
  stakingManagerId?: string
  activityType?: 'STAKE' | 'HARVEST' | 'WITHDRAW' | 'REBALANCE'
  limit?: number
  timestampGte?: string
}): Promise<TGraphQLStakingActivity[]> {
  try {
    const response = await query(buildStakingActivitiesQuery(params))
    return response.StakingActivity ?? []
  } catch (error) {
    console.error('Error fetching staking activities:', error)
    return []
  }
}

/**
 * Fetch HARVEST events for a staking manager over a lookback period
 * @param stakingManagerId - The staking manager ID
 * @param days - Number of days to look back (default: 30)
 * @returns Array of harvest activities
 */
export async function fetchHarvestEvents(
  stakingManagerId: string,
  days: number = 30
): Promise<TGraphQLStakingActivity[]> {
  const timestampGte = String(Math.floor(Date.now() / 1000) - days * 86400)
  return fetchStakingActivities({
    stakingManagerId,
    activityType: 'HARVEST',
    timestampGte,
  })
}

/**
 * Fetch all market activity (trades + loans + floor elevations + staking) in a single query
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

    // Resolve stakingManagerId from ModuleRegistry
    let stakingManagerId: string | undefined
    try {
      const registryResponse = await query({
        ModuleRegistry_by_pk: {
          __args: { id: normalizedMarketId },
          staking: true,
        },
      })
      stakingManagerId = registryResponse.ModuleRegistry_by_pk?.staking ?? undefined
    } catch {
      // No staking module — continue without staking activities
    }

    // Single GraphQL query fetching trades, loans, floor elevations, and staking activities
    const response = await query(
      buildMarketActivityQuery(normalizedMarketId, limit, stakingManagerId)
    )

    const trades = response.Trade ?? []
    const loans = response.Loan ?? []
    const floorElevations = response.FloorElevation ?? []
    const stakingActivities = (response as any).StakingActivity ?? []

    // Combine and sort by timestamp
    return combineMarketActivity(trades, loans, floorElevations, stakingActivities)
  } catch (error) {
    console.error('Error fetching market activity:', error)
    return []
  }
}
