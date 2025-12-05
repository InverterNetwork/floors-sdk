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
