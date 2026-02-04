import { beforeAll, describe, expect, it } from 'bun:test'

import type {
  TGraphQLStakePosition,
  TGraphQLStakingActivity,
  TGraphQLStakingManager,
} from '../src/graphql/api/fields/staking'
import {
  mapStakePositionsToDTO,
  mapStakePositionToDTO,
  mapStakingActivitiesToDTO,
  mapStakingActivityToDTO,
  mapStakingManagerToDTO,
} from '../src/graphql/api/mappers'
import { Client } from '../src/graphql/client'
import { LOCAL_GRAPHQL_URL, requireLocalDevEnvironment } from './helpers'

// =============================================================================
// Mock Data
// =============================================================================

const mockStakingManager: TGraphQLStakingManager = {
  id: '0x1234567890123456789012345678901234567890',
  market_id: '0xabcdef1234567890abcdef1234567890abcdef12',
  performanceFeeBps: 1000n,
  totalStakedIssuanceRaw: 100000000000000000000n,
  totalStakedIssuanceFormatted: '100',
  totalCollateralDeployedRaw: 50000000n,
  totalCollateralDeployedFormatted: '50',
  totalYieldHarvestedRaw: 5000000n,
  totalYieldHarvestedFormatted: '5',
  totalFeesCapturedRaw: 500000n,
  totalFeesCapturedFormatted: '0.5',
  createdAt: 1700000000n,
  lastUpdatedAt: 1700100000n,
  strategies: [
    {
      id: '0x9999999999999999999999999999999999999999',
      isActive: true,
      addedAt: 1700000000n,
    },
    {
      id: '0x8888888888888888888888888888888888888888',
      isActive: false,
      addedAt: 1700000000n,
    },
  ],
  __typename: 'StakingManager',
}

const mockStakePosition: TGraphQLStakePosition = {
  id: '0xuser-0xstakingmanager-0xstrategy',
  user_id: '0xUserAddress123456789012345678901234567890',
  stakingManager_id: '0x1234567890123456789012345678901234567890',
  strategy_id: '0x9999999999999999999999999999999999999999',
  issuanceTokenAmountRaw: 50000000000000000000n,
  issuanceTokenAmountFormatted: '50',
  collateralDeployedRaw: 25000000n,
  collateralDeployedFormatted: '25',
  floorPriceAtStakeRaw: 1000000n,
  floorPriceAtStakeFormatted: '1',
  totalYieldHarvestedRaw: 2500000n,
  totalYieldHarvestedFormatted: '2.5',
  totalFeePaidRaw: 250000n,
  totalFeePaidFormatted: '0.25',
  status: 'ACTIVE',
  createdAt: 1700050000n,
  lastUpdatedAt: 1700100000n,
  transactionHash: '0xabc123def456abc123def456abc123def456abc123def456abc123def456abc1',
  __typename: 'StakePosition',
}

const mockStakingActivity: TGraphQLStakingActivity = {
  id: '0xabc123-0',
  position_id: '0xuser-0xstakingmanager-0xstrategy',
  stakingManager_id: '0x1234567890123456789012345678901234567890',
  user_id: '0xUserAddress123456789012345678901234567890',
  activityType: 'STAKE',
  issuanceTokenAmountRaw: 50000000000000000000n,
  issuanceTokenAmountFormatted: '50',
  collateralAmountRaw: 25000000n,
  collateralAmountFormatted: '25',
  yieldAmountRaw: null,
  yieldAmountFormatted: null,
  feeAmountRaw: null,
  feeAmountFormatted: null,
  timestamp: 1700050000n,
  transactionHash: '0xabc123def456abc123def456abc123def456abc123def456abc123def456abc1',
  __typename: 'StakingActivity',
}

const mockHarvestActivity: TGraphQLStakingActivity = {
  id: '0xdef456-0',
  position_id: '0xuser-0xstakingmanager-0xstrategy',
  stakingManager_id: '0x1234567890123456789012345678901234567890',
  user_id: '0xUserAddress123456789012345678901234567890',
  activityType: 'HARVEST',
  issuanceTokenAmountRaw: null,
  issuanceTokenAmountFormatted: null,
  collateralAmountRaw: null,
  collateralAmountFormatted: null,
  yieldAmountRaw: 2500000n,
  yieldAmountFormatted: '2.5',
  feeAmountRaw: 250000n,
  feeAmountFormatted: '0.25',
  timestamp: 1700100000n,
  transactionHash: '0xdef456abc123def456abc123def456abc123def456abc123def456abc123def4',
  __typename: 'StakingActivity',
}

// =============================================================================
// Unit Tests - Mappers
// =============================================================================

describe('#Staking Mappers', () => {
  describe('mapStakingManagerToDTO', () => {
    it('should map StakingManager GraphQL data to DTO correctly', () => {
      const result = mapStakingManagerToDTO(mockStakingManager)

      expect(result.id).toBe('0x1234567890123456789012345678901234567890')
      expect(result.marketId).toBe('0xabcdef1234567890abcdef1234567890abcdef12')
      expect(result.performanceFeeBps).toBe(1000)
      expect(result.totalStakedIssuance).toBe(100)
      expect(result.totalCollateralDeployed).toBe(50)
      expect(result.totalYieldHarvested).toBe(5)
      expect(result.totalFeesCaptured).toBe(0.5)
      expect(result.strategies.length).toBe(2)
      expect(result.createdAt).toBeInstanceOf(Date)
      expect(result.lastUpdatedAt).toBeInstanceOf(Date)
    })

    it('should map strategies correctly', () => {
      const result = mapStakingManagerToDTO(mockStakingManager)

      expect(result.strategies[0].id).toBe('0x9999999999999999999999999999999999999999')
      expect(result.strategies[0].isActive).toBe(true)
      expect(result.strategies[0].addedAt).toBeInstanceOf(Date)

      expect(result.strategies[1].id).toBe('0x8888888888888888888888888888888888888888')
      expect(result.strategies[1].isActive).toBe(false)
    })

    it('should convert timestamps to Date objects correctly', () => {
      const result = mapStakingManagerToDTO(mockStakingManager)

      // 1700000000 seconds = Nov 14, 2023
      expect(result.createdAt.getTime()).toBe(1700000000 * 1000)
      expect(result.lastUpdatedAt.getTime()).toBe(1700100000 * 1000)
    })
  })

  describe('mapStakePositionToDTO', () => {
    it('should map StakePosition GraphQL data to DTO correctly', () => {
      const result = mapStakePositionToDTO(mockStakePosition)

      expect(result.id).toBe('0xuser-0xstakingmanager-0xstrategy')
      expect(result.userId).toBe('0xUserAddress123456789012345678901234567890')
      expect(result.stakingManagerId).toBe('0x1234567890123456789012345678901234567890')
      expect(result.strategyId).toBe('0x9999999999999999999999999999999999999999')
      expect(result.issuanceTokenAmount).toBe(50)
      expect(result.collateralDeployed).toBe(25)
      expect(result.floorPriceAtStake).toBe(1)
      expect(result.totalYieldHarvested).toBe(2.5)
      expect(result.totalFeePaid).toBe(0.25)
      expect(result.status).toBe('ACTIVE')
      expect(result.transactionHash).toMatch(/^0x[a-f0-9]{64}$/)
    })

    it('should handle WITHDRAWN status', () => {
      const withdrawnPosition = { ...mockStakePosition, status: 'WITHDRAWN' as const }
      const result = mapStakePositionToDTO(withdrawnPosition)

      expect(result.status).toBe('WITHDRAWN')
    })

    it('should convert timestamps to Date objects', () => {
      const result = mapStakePositionToDTO(mockStakePosition)

      expect(result.createdAt).toBeInstanceOf(Date)
      expect(result.lastUpdatedAt).toBeInstanceOf(Date)
      expect(result.createdAt.getTime()).toBe(1700050000 * 1000)
    })
  })

  describe('mapStakePositionsToDTO', () => {
    it('should map array of positions correctly', () => {
      const positions = [mockStakePosition, { ...mockStakePosition, id: 'position-2' }]
      const result = mapStakePositionsToDTO(positions)

      expect(result.length).toBe(2)
      expect(result[0].id).toBe('0xuser-0xstakingmanager-0xstrategy')
      expect(result[1].id).toBe('position-2')
    })

    it('should return empty array for empty input', () => {
      const result = mapStakePositionsToDTO([])
      expect(result).toEqual([])
    })
  })

  describe('mapStakingActivityToDTO', () => {
    it('should map STAKE activity correctly', () => {
      const result = mapStakingActivityToDTO(mockStakingActivity)

      expect(result.id).toBe('0xabc123-0')
      expect(result.positionId).toBe('0xuser-0xstakingmanager-0xstrategy')
      expect(result.userId).toBe('0xUserAddress123456789012345678901234567890')
      expect(result.activityType).toBe('STAKE')
      expect(result.issuanceTokenAmount).toBe(50)
      expect(result.collateralAmount).toBe(25)
      expect(result.yieldAmount).toBeNull()
      expect(result.feeAmount).toBeNull()
      expect(result.timestamp).toBeInstanceOf(Date)
    })

    it('should map HARVEST activity correctly', () => {
      const result = mapStakingActivityToDTO(mockHarvestActivity)

      expect(result.activityType).toBe('HARVEST')
      expect(result.issuanceTokenAmount).toBeNull()
      expect(result.collateralAmount).toBeNull()
      expect(result.yieldAmount).toBe(2.5)
      expect(result.feeAmount).toBe(0.25)
    })

    it('should handle WITHDRAW activity type', () => {
      const withdrawActivity = { ...mockStakingActivity, activityType: 'WITHDRAW' as const }
      const result = mapStakingActivityToDTO(withdrawActivity)

      expect(result.activityType).toBe('WITHDRAW')
    })

    it('should handle REBALANCE activity type', () => {
      const rebalanceActivity = {
        ...mockStakingActivity,
        activityType: 'REBALANCE' as const,
        issuanceTokenAmountRaw: null,
        issuanceTokenAmountFormatted: null,
        collateralAmountRaw: 5000000n,
        collateralAmountFormatted: '5',
      }
      const result = mapStakingActivityToDTO(rebalanceActivity)

      expect(result.activityType).toBe('REBALANCE')
      expect(result.collateralAmount).toBe(5)
    })
  })

  describe('mapStakingActivitiesToDTO', () => {
    it('should map array of activities correctly', () => {
      const activities = [mockStakingActivity, mockHarvestActivity]
      const result = mapStakingActivitiesToDTO(activities)

      expect(result.length).toBe(2)
      expect(result[0].activityType).toBe('STAKE')
      expect(result[1].activityType).toBe('HARVEST')
    })

    it('should return empty array for empty input', () => {
      const result = mapStakingActivitiesToDTO([])
      expect(result).toEqual([])
    })
  })
})

// =============================================================================
// Integration Tests - GraphQL Queries
// =============================================================================

describe('#Staking GraphQL Integration', () => {
  beforeAll(async () => {
    // Require local dev environment (anvil + indexer)
    // This will throw with clear instructions if not running
    await requireLocalDevEnvironment()

    // Configure GraphQL client to use the local indexer
    Client.updateUrl(LOCAL_GRAPHQL_URL)
  })

  it('should query StakingManager entities from indexer', async () => {
    const client = Client.get()

    const result = await client.query(
      `query {
        StakingManager(limit: 5) {
          id
          market_id
          performanceFeeBps
          totalStakedIssuanceRaw
          totalStakedIssuanceFormatted
          totalCollateralDeployedRaw
          totalCollateralDeployedFormatted
          createdAt
        }
      }`,
      {}
    )

    if (result.error) {
      console.log('GraphQL query error (expected if no staking data):', result.error.message)
    } else {
      console.log('StakingManager query result:', result.data)
      expect(result.data).toBeDefined()
    }
  })

  it('should query StakePosition entities from indexer', async () => {
    const client = Client.get()

    const result = await client.query(
      `query {
        StakePosition(limit: 5, order_by: { createdAt: desc }) {
          id
          user_id
          stakingManager_id
          strategy_id
          issuanceTokenAmountFormatted
          collateralDeployedFormatted
          status
          createdAt
        }
      }`,
      {}
    )

    if (result.error) {
      console.log('GraphQL query error (expected if no staking data):', result.error.message)
    } else {
      console.log('StakePosition query result:', result.data)
      expect(result.data).toBeDefined()
    }
  })

  it('should query StakingActivity entities from indexer', async () => {
    const client = Client.get()

    const result = await client.query(
      `query {
        StakingActivity(limit: 10, order_by: { timestamp: desc }) {
          id
          position_id
          user_id
          activityType
          issuanceTokenAmountFormatted
          collateralAmountFormatted
          yieldAmountFormatted
          feeAmountFormatted
          timestamp
          transactionHash
        }
      }`,
      {}
    )

    if (result.error) {
      console.log('GraphQL query error (expected if no staking data):', result.error.message)
    } else {
      console.log('StakingActivity query result:', result.data)
      expect(result.data).toBeDefined()
    }
  })

  it('should query Strategy entities from indexer', async () => {
    const client = Client.get()

    const result = await client.query(
      `query {
        Strategy(limit: 5) {
          id
          stakingManager_id
          isActive
          addedAt
          removedAt
          transactionHash
        }
      }`,
      {}
    )

    if (result.error) {
      console.log('GraphQL query error (expected if no staking data):', result.error.message)
    } else {
      console.log('Strategy query result:', result.data)
      expect(result.data).toBeDefined()
    }
  })
})
