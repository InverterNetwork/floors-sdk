/**
 * @description Tests for permission grant vs. function enablement separation
 *
 * This test file validates the changes made to prevent premature function enablement:
 * - PUBLIC_ROLE permissions for buy/sell are always granted by default
 * - But enableBuy/enableSell are only called when explicitly requested (openBuy/openSell === true)
 * - openStaking now defaults to false (was !== false)
 *
 * Key design: Permission grants are separated from function enablement.
 * This allows flexible phased rollouts (e.g., presale phase before open trading).
 */

import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import type { Chain, PublicClient, Transport } from 'viem'
import { decodeFunctionData } from 'viem'

import AUT_Roles_v2 from '../../src/abis/AUT_Roles_v2'
import CreditFacility_v1 from '../../src/abis/CreditFacility_v1'
import ERC20Issuance_v1 from '../../src/abis/ERC20Issuance_v1'
import Floor_v1 from '../../src/abis/Floor_v1'
import Presale_v1 from '../../src/abis/Presale_v1'
import StakingManager_v1 from '../../src/abis/StakingManager_v1'
import { Client } from '../../src/graphql/client'
import { Launch } from '../../src/launch'
import type { PopWalletClient } from '../../src/types'
import { FLOOR_SELECTORS, STAKING_SELECTORS } from '../../src/utils/selectors'
import {
  ANVIL_ADDRESSES,
  createTestLaunchConfig,
  deployTestTokens,
  getFloorFactoryFromIndexer,
  LOCAL_GRAPHQL_URL,
  requireLocalDevEnvironment,
} from './helpers/index'

// =============================================================================
// Mock Clients Helper
// =============================================================================

const ZERO_ROLE = `0x${'0'.repeat(64)}` as `0x${string}`

interface CallCapture {
  target: string
  functionName: string
  args?: unknown[]
}

function createMockClientsWithCallCapture() {
  const capturedCalls: CallCapture[] = []
  const multicallCalls: CallCapture[][] = []

  const publicClient = {
    readContract: async ({
      functionName,
      address,
    }: {
      functionName: string
      address: `0x${string}`
    }) => {
      if (functionName === 'getAdminRole') return ZERO_ROLE
      if (functionName === 'getLastAssignedRoleId') return 1n
      if (functionName === 'isTrustedForwarder') return true
      if (functionName === 'simulateContract') {
        throw new Error('simulateContract should be called on publicClient, not readContract')
      }
      throw new Error(`Unexpected readContract function: ${functionName}`)
    },
    simulateContract: async ({
      functionName,
      args,
    }: {
      functionName: string
      args?: unknown[]
    }) => {
      // Simulate successful contract simulation
      return {
        request: {
          address: '0x1111111111111111111111111111111111111111' as `0x${string}`,
          functionName,
          args,
        },
        result: true,
      }
    },
    waitForTransactionReceipt: async ({ hash }: { hash: `0x${string}` }) => ({
      transactionHash: hash,
      status: 'success',
      logs: [],
    }),
  } as any

  const walletClient = {
    account: { address: ANVIL_ADDRESSES.ADMIN },
    writeContract: async (params: any) => {
      if (params?.functionName === 'executeMulticall') {
        const calls = params?.args?.[0] || []
        // Decode callData to extract function names and args
        const decodedCalls = calls.map((call: any) => {
          const selector = call.callData?.slice(0, 10) // 0x + 8 hex chars
          let fnName = 'unknown'
          let decodedArgs: any[] | undefined

          // Try to decode using known ABIs
          const allABIs = [
            ERC20Issuance_v1,
            AUT_Roles_v2,
            Floor_v1,
            StakingManager_v1,
            Presale_v1,
            CreditFacility_v1,
          ]

          try {
            for (const abi of allABIs) {
              try {
                const decoded = decodeFunctionData({
                  abi,
                  data: call.callData as `0x${string}`,
                })
                fnName = decoded.functionName || 'unknown'
                decodedArgs = [...decoded.args] as any
                break
              } catch {
                // Try next ABI
              }
            }
          } catch (e) {
            // Decoding failed, keep unknown
          }

          return {
            ...call,
            functionName: fnName,
            selector,
            args: decodedArgs,
          }
        })
        multicallCalls.push(decodedCalls)
      }
      return `0x${'1'.repeat(64)}` as `0x${string}`
    },
    sendTransaction: async ({ to, data }: { to: `0x${string}`; data: `0x${string}` }) => {
      capturedCalls.push({ target: to, functionName: 'direct', args: [data] })
      return `0x${'2'.repeat(64)}` as `0x${string}`
    },
  } as any

  return {
    publicClient,
    walletClient,
    getCapturedCalls: () => capturedCalls,
    getMulticallCalls: () => multicallCalls,
  }
}

// =============================================================================
// Test Suite
// =============================================================================

describe('Launch.configure - Permission vs Enablement Separation', () => {
  describe('Default Behavior (All Disabled)', () => {
    it('should grant PUBLIC_ROLE permission for buy but NOT call enableBuy by default', async () => {
      const { publicClient, walletClient, getMulticallCalls } = createMockClientsWithCallCapture()

      const launch = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: true,
        // openBuy not specified - should default to false (no enableBuy call)
      })

      expect(result.success).toBe(true)

      const calls = getMulticallCalls()[0] || []

      // Should have setMinter (grantMinterRole: true)
      expect(calls.some((c: any) => c.functionName === 'setMinter')).toBe(true)

      // Should have addAccessPermission for buy (PUBLIC_ROLE permission grant)
      const buyPermissionCall = calls.find(
        (c: any) =>
          c.functionName === 'addAccessPermission' &&
          c.args?.[1]?.toLowerCase() === FLOOR_SELECTORS.buy.toLowerCase()
      )
      expect(buyPermissionCall).toBeDefined()

      // Should NOT have enableBuy call (openBuy defaults to false)
      const enableBuyCall = calls.find((c: any) => c.functionName === 'enableBuy')
      expect(enableBuyCall).toBeUndefined()
    })

    it('should grant PUBLIC_ROLE permission for sell but NOT call enableSell by default', async () => {
      const { publicClient, walletClient, getMulticallCalls } = createMockClientsWithCallCapture()

      const launch = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: false,
        // openBuy and openSell not specified - should default to false
      })

      expect(result.success).toBe(true)

      const calls = getMulticallCalls()[0] || []

      // Should have addAccessPermission for sell (PUBLIC_ROLE permission grant)
      const sellPermissionCall = calls.find(
        (c: any) =>
          c.functionName === 'addAccessPermission' &&
          c.args?.[1]?.toLowerCase() === FLOOR_SELECTORS.sell.toLowerCase()
      )
      expect(sellPermissionCall).toBeDefined()

      // Should NOT have enableSell call (openSell defaults to false)
      const enableSellCall = calls.find((c: any) => c.functionName === 'enableSell')
      expect(enableSellCall).toBeUndefined()
    })

    it('should NOT grant PUBLIC_ROLE staking permissions by default (openStaking defaults to false)', async () => {
      const { publicClient, walletClient, getMulticallCalls } = createMockClientsWithCallCapture()

      const launch = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: false,
        stakingManagerAddress: '0x5757575757575757575757575757575757575757' as `0x${string}`,
        // openStaking not specified - should default to false (no staking permissions)
      })

      expect(result.success).toBe(true)

      const calls = getMulticallCalls()[0] || []

      // Should NOT have addAccessPermission for stake (openStaking defaults to false)
      const stakePermissionCall = calls.find(
        (c: any) =>
          c.functionName === 'addAccessPermission' &&
          c.args?.[1]?.toLowerCase() === '0x9193f4dd'.toLowerCase() // stake selector
      )
      expect(stakePermissionCall).toBeUndefined()
    })
  })

  describe('Explicit Enablement (All Enabled)', () => {
    it('should grant permission AND call enableBuy when openBuy is explicitly true', async () => {
      const { publicClient, walletClient, getMulticallCalls } = createMockClientsWithCallCapture()

      const launch = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: true,
        openBuy: true, // Explicitly enable
      })

      expect(result.success).toBe(true)

      const calls = getMulticallCalls()[0] || []

      // Should have addAccessPermission for buy (PUBLIC_ROLE permission grant)
      const buyPermissionCall = calls.find(
        (c: any) =>
          c.functionName === 'addAccessPermission' &&
          c.args?.[1]?.toLowerCase() === FLOOR_SELECTORS.buy.toLowerCase()
      )
      expect(buyPermissionCall).toBeDefined()

      // Should ALSO have enableBuy call (explicit enablement)
      const enableBuyCall = calls.find((c: any) => c.functionName === 'enableBuy')
      expect(enableBuyCall).toBeDefined()
    })

    it('should grant permission AND call enableSell when openSell is explicitly true', async () => {
      const { publicClient, walletClient, getMulticallCalls } = createMockClientsWithCallCapture()

      const launch = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: true,
        openBuy: true,
        openSell: true, // Explicitly enable
      })

      expect(result.success).toBe(true)

      const calls = getMulticallCalls()[0] || []

      // Should have addAccessPermission for sell (PUBLIC_ROLE permission grant)
      const sellPermissionCall = calls.find(
        (c: any) =>
          c.functionName === 'addAccessPermission' &&
          c.args?.[1]?.toLowerCase() === FLOOR_SELECTORS.sell.toLowerCase()
      )
      expect(sellPermissionCall).toBeDefined()

      // Should ALSO have enableSell call (explicit enablement)
      const enableSellCall = calls.find((c: any) => c.functionName === 'enableSell')
      expect(enableSellCall).toBeDefined()
    })

    it('should grant PUBLIC_ROLE staking permissions when openStaking is explicitly true', async () => {
      const { publicClient, walletClient, getMulticallCalls } = createMockClientsWithCallCapture()

      const launch = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: false,
        stakingManagerAddress: '0x5757575757575757575757575757575757575757' as `0x${string}`,
        openStaking: true, // Explicitly enable
      })

      expect(result.success).toBe(true)

      const calls = getMulticallCalls()[0] || []

      // Should have addAccessPermission for stake, harvestYield, withdrawFunds, rebalance
      const stakingSelectors = [
        STAKING_SELECTORS.stake,
        STAKING_SELECTORS.harvestYield,
        STAKING_SELECTORS.withdrawFunds,
        STAKING_SELECTORS.rebalance,
      ]

      for (const selector of stakingSelectors) {
        const permissionCall = calls.find(
          (c: any) =>
            c.functionName === 'addAccessPermission' &&
            c.args?.[1]?.toLowerCase() === selector.toLowerCase()
        )
        expect(permissionCall).toBeDefined()
      }
    })
  })

  describe('Phased Rollout Scenarios', () => {
    it('should support presale-only phase (permissions granted, trading disabled)', async () => {
      const { publicClient, walletClient, getMulticallCalls } = createMockClientsWithCallCapture()

      const launch = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: true,
        openBuy: false, // Presale phase - no open trading yet
        openSell: false,
        presaleAddress: '0x5656565656565656565656565656565656565656' as `0x${string}`,
      })

      expect(result.success).toBe(true)

      const calls = getMulticallCalls()[0] || []

      // Should have Presale role created
      const presaleRoleCall = calls.find(
        (c: any) => c.functionName === 'createRole' && c.args?.[0] === 'Presale'
      )
      expect(presaleRoleCall).toBeDefined()

      // Should have buy permission for Presale role
      const presaleBuyPermission = calls.find(
        (c: any) =>
          c.functionName === 'addAccessPermission' &&
          c.args?.[0]?.toLowerCase() ===
            '0x3333333333333333333333333333333333333333'.toLowerCase() &&
          c.args?.[1]?.toLowerCase() === FLOOR_SELECTORS.buy.toLowerCase()
      )
      expect(presaleBuyPermission).toBeDefined()

      // Should NOT have enableBuy call (trading not open yet)
      const enableBuyCall = calls.find((c: any) => c.functionName === 'enableBuy')
      expect(enableBuyCall).toBeUndefined()
    })

    it('should support enabling trading after presale (follow-up configure call)', async () => {
      const { publicClient, walletClient, getMulticallCalls } = createMockClientsWithCallCapture()

      const launch = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient,
        walletClient,
      })

      // First call: presale phase (trading disabled)
      const result1 = await launch.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: true,
        openBuy: false,
        openSell: false,
      })
      expect(result1.success).toBe(true)

      // Second call: enable trading (permissions already granted)
      const result2 = await launch.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: false, // Already granted
        openBuy: true, // Now enable trading
        openSell: true,
      })
      expect(result2.success).toBe(true)

      const calls = getMulticallCalls()[1] || []

      // Should have enableBuy and enableSell calls
      const enableBuyCall = calls.find((c: any) => c.functionName === 'enableBuy')
      const enableSellCall = calls.find((c: any) => c.functionName === 'enableSell')
      expect(enableBuyCall).toBeDefined()
      expect(enableSellCall).toBeDefined()
    })
  })

  describe('Call Count Verification', () => {
    it('should have fewer calls with defaults (openBuy=false, openSell=false)', async () => {
      const {
        publicClient: p1,
        walletClient: w1,
        getMulticallCalls: g1,
      } = createMockClientsWithCallCapture()
      const launch1 = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient: p1,
        walletClient: w1,
      })

      await launch1.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: true,
        openBuy: false,
        openSell: false,
      })

      const {
        publicClient: p2,
        walletClient: w2,
        getMulticallCalls: g2,
      } = createMockClientsWithCallCapture()
      const launch2 = new Launch({
        floorFactoryAddress: '0x1111111111111111111111111111111111111111' as `0x${string}`,
        publicClient: p2,
        walletClient: w2,
      })

      await launch2.configure({
        floorAddress: '0x3333333333333333333333333333333333333333' as `0x${string}`,
        authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`,
        issuanceTokenAddress: '0x4444444444444444444444444444444444444444' as `0x${string}`,
        transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
        grantMinterRole: true,
        openBuy: true,
        openSell: true,
      })

      const callsWithDefaults = g1()[0]?.length || 0
      const callsWithEnabled = g2()[0]?.length || 0

      // Enabled should have 2 more calls (enableBuy and enableSell)
      expect(callsWithEnabled).toBeGreaterThan(callsWithDefaults)
    })
  })
})

// =============================================================================
// Integration Tests (with local Anvil)
// =============================================================================

describe('Launch.configure - Integration Tests', () => {
  let itIfEnv: typeof it = it.skip
  let launch: Launch
  let publicClient: PublicClient<Transport, Chain>
  let walletClient: PopWalletClient

  beforeAll(async () => {
    const env = await requireLocalDevEnvironment()
    if (!env) {
      console.log('Local dev environment not available, skipping tests')
      return
    }
    itIfEnv = it
    publicClient = env.publicClient
    walletClient = env.walletClient

    Client.updateUrl(LOCAL_GRAPHQL_URL)
    const floorFactoryAddress = await getFloorFactoryFromIndexer(LOCAL_GRAPHQL_URL)
    if (!floorFactoryAddress) {
      console.log('FloorFactory not found in indexer, skipping tests')
      return
    }

    launch = new Launch({
      floorFactoryAddress,
      publicClient,
      walletClient,
    })
  })

  afterAll(() => {
    console.log('\n=== Integration Test Suite Complete ===')
  })

  itIfEnv('should create market and configure with trading disabled (presale phase)', async () => {
    // Deploy test tokens
    const { issuanceToken, collateralToken } = await deployTestTokens(walletClient, publicClient, {
      issuance: { name: `Test Token ${Date.now()}`, symbol: `TT${Date.now() % 10000}` },
      collateral: { name: 'Test USDC', symbol: 'TUSDC' },
    })

    // Create market
    const config = createTestLaunchConfig(
      issuanceToken as `0x${string}`,
      collateralToken as `0x${string}`
    )
    const createResult = await launch.create(config)

    expect(createResult.floorAddress).toBeDefined()
    expect(createResult.marketId).toBeGreaterThan(0n)

    // Configure with trading disabled (presale phase)
    const configureResult = await launch.configure({
      floorAddress: createResult.floorAddress,
      authorizerAddress: '0x2222222222222222222222222222222222222222' as `0x${string}`, // Would be actual authorizer
      issuanceTokenAddress: issuanceToken as `0x${string}`,
      transactionForwarderAddress: '0x6666666666666666666666666666666666666666' as `0x${string}`,
      grantMinterRole: true,
      openBuy: false,
      openSell: false,
    })

    expect(configureResult.success).toBe(true)
  })
})
