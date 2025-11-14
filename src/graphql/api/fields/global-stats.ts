import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'

export const globalStatsQuery = {
  GlobalStats: {
    id: true,
    lastUpdatedAt: true,
    totalLockedCollateralRaw: true,
    totalLockedCollateralFormatted: true,
    totalMarkets: true,
    totalVolumeFormatted: true,
    totalOutstandingDebtFormatted: true,
    totalOutstandingDebtRaw: true,
    totalVolumeRaw: true,
    activeMarkets: true,
    db_write_timestamp: true,
  },
} satisfies GraphQLQueryArgs

export type GlobalStatsQueryType = typeof globalStatsQuery
export type GlobalStatsQueryResultType = GraphQLQueryResult<typeof globalStatsQuery>

export type TGraphQLGlobalStats = NonNullable<GlobalStatsQueryResultType['GlobalStats']>[number]

export interface TGlobalStats {
  id: string
  lastUpdatedAt: string | number | null
  totalLockedCollateralRaw: string | null
  totalLockedCollateralFormatted: string | null
  totalMarkets: number | null
  totalVolumeFormatted: string | null
  totalOutstandingDebtFormatted: string | null
  totalOutstandingDebtRaw: string | null
  totalVolumeRaw: string | null
  activeMarkets: number | null
  dbWriteTimestamp: string | null
}

export const mapGlobalStats = (stats?: TGraphQLGlobalStats | null): TGlobalStats | null => {
  if (!stats) {
    return null
  }

  return {
    id: stats.id,
    lastUpdatedAt: stats.lastUpdatedAt ?? null,
    totalLockedCollateralRaw: stats.totalLockedCollateralRaw ?? null,
    totalLockedCollateralFormatted: stats.totalLockedCollateralFormatted ?? null,
    totalMarkets: stats.totalMarkets ?? null,
    totalVolumeFormatted: stats.totalVolumeFormatted ?? null,
    totalOutstandingDebtFormatted: stats.totalOutstandingDebtFormatted ?? null,
    totalOutstandingDebtRaw: stats.totalOutstandingDebtRaw ?? null,
    totalVolumeRaw: stats.totalVolumeRaw ?? null,
    activeMarkets: stats.activeMarkets ?? null,
    dbWriteTimestamp: stats.db_write_timestamp ?? null,
  }
}
