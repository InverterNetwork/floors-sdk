/**
 * @description Static query key for markets collections.
 */
export const marketsQueryKey = ['markets'] as const

/**
 * @description Parameterized query key for a single market.
 */
export const marketQueryKey = (marketId: string | null | undefined) =>
  ['market', marketId ?? ''] as const

/**
 * @description Static query key for platform level metrics.
 */
export const platformMetricsQueryKey = ['platform-metrics'] as const

/**
 * @description Static query key for global statistics.
 */
export const globalStatsQueryKey = ['global-stats'] as const

/**
 * @description Static query key for global metrics with history (TVL, MarketCap changes + charts).
 */
export const globalMetricsHistoryQueryKey = ['global-metrics-history'] as const

/**
 * @description Parameterized query key for trades scoped to a market.
 */
export const marketTradesQueryKey = (marketId: string | null | undefined) =>
  ['trades', 'market', marketId ?? ''] as const

/**
 * @description Parameterized query key for trades scoped to a user.
 */
export const userTradesQueryKey = (userId: string | null | undefined) =>
  ['trades', 'user', userId ?? ''] as const

/**
 * @description Parameterized query key for a single account.
 */
export const accountQueryKey = (accountId: string | null | undefined) =>
  ['account', accountId ?? ''] as const

/**
 * @description Static query key for presales collections.
 */
export const presalesQueryKey = ['presales'] as const

/**
 * @description Parameterized query key for a single presale.
 */
export const presaleQueryKey = (presaleId: string | null | undefined) =>
  ['presale', presaleId ?? ''] as const

/**
 * @description Parameterized query key for authorizer roles scoped to an authorizer.
 */
export const authorizerRolesQueryKey = (
  authorizerId: string | null | undefined,
  userAddress?: string | null
) => ['authorizer-roles', authorizerId ?? '', userAddress ?? ''] as const

/**
 * @description Parameterized query key for user loans scoped to a market.
 */
export const userLoansQueryKey = (
  userAddress: string | null | undefined,
  marketId: string | null | undefined
) => ['user-loans', userAddress?.toLowerCase() ?? '', marketId ?? ''] as const

/**
 * @description Parameterized query key for all user loans across all markets.
 */
export const allUserLoansQueryKey = (userAddress: string | null | undefined) =>
  ['user-loans', 'all', userAddress?.toLowerCase() ?? ''] as const

/**
 * @description Parameterized query key for market activity (trades + loans combined).
 */
export const marketActivityQueryKey = (marketId: string | null | undefined) =>
  ['market-activity', marketId ?? ''] as const

// ============================================================================
// Subscription Keys
// ============================================================================

/**
 * @description Parameterized subscription key for presale participations.
 */
export const presaleParticipationsSubKey = (presaleId: string | null | undefined) =>
  ['subscription', 'presale-participations', presaleId ?? ''] as const

/**
 * @description Parameterized subscription key for presale claims.
 */
export const presaleClaimsSubKey = (presaleId: string | null | undefined) =>
  ['subscription', 'presale-claims', presaleId ?? ''] as const

/**
 * @description Parameterized subscription key for market trades.
 */
export const marketTradesSubKey = (marketId: string | null | undefined) =>
  ['subscription', 'market-trades', marketId ?? ''] as const
