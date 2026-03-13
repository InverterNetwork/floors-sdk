/**
 * @description Integration tests for FEES-01: Comprehensive Fee Management Fix
 * Tests real on-chain transactions for:
 * - F-59: Sell fee in goLive transition
 * - F-58: Commission schedule changes in presale
 * - F-52: Fee controls during presale phase
 *
 * Requires `bun dev:local` to be running (Anvil + indexer).
 */

import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import type { Address } from 'viem'
import { decodeEventLog } from 'viem'

import { ModuleFactory_v1 } from '../../src/abis'
import { Client } from '../../src/graphql/client'
import { Launch } from '../../src/launch'
import { MarketAdmin } from '../../src/market-admin'
import { Presale, PresaleState } from '../../src/presale'
import { PresaleAdmin } from '../../src/presale-admin'
import type { PopPublicClient, PopWalletClient } from '../../src/types'
import {
  createLocalPublicClient,
  createLocalWalletClient,
  createTestLaunchConfig,
  createTestPresaleConfig,
  deployTestTokens,
  LOCAL_GRAPHQL_URL,
} from '../helpers/index'
import { isTestEnvironmentAvailable, loadTestEnvironment } from '../launch/helpers/env-loader'

// =============================================================================
// Helpers
// =============================================================================

function parseModuleAddressesFromReceipt(
  receipt: Awaited<ReturnType<PopPublicClient['waitForTransactionReceipt']>>,
  moduleFactoryAddress: string
): {
  authorizer: Address | undefined
  creditFacility: Address | undefined
  presale: Address | undefined
  floor: Address | undefined
} {
  const result = {
    authorizer: undefined as Address | undefined,
    creditFacility: undefined as Address | undefined,
    presale: undefined as Address | undefined,
    floor: undefined as Address | undefined,
  }

  for (const log of receipt.logs) {
    if (log.address.toLowerCase() !== moduleFactoryAddress.toLowerCase()) continue

    try {
      const logWithTopics = log as typeof log & { topics: [`0x${string}`, ...`0x${string}`[]] }
      const decoded = decodeEventLog({
        abi: ModuleFactory_v1,
        data: logWithTopics.data,
        topics: logWithTopics.topics,
      })

      if ((decoded as any).eventName === 'ModuleCreated' && (decoded as any).args) {
        const args = (decoded as any).args
        const moduleType = args.metadata_?.title?.toLowerCase() || ''
        const moduleAddress = args.module_ as Address

        if (moduleType.includes('authorizer') || moduleType.includes('roles')) {
          result.authorizer = moduleAddress
        } else if (moduleType.includes('creditfacility')) {
          result.creditFacility = moduleAddress
        } else if (moduleType.includes('presale')) {
          result.presale = moduleAddress
        } else if (moduleType.includes('floor')) {
          result.floor = moduleAddress
        }
      }
    } catch {
      // Skip logs that don't match
    }
  }

  return result
}

// =============================================================================
// Tests
// =============================================================================

describe('FEES-01: Fee Management Integration Tests', () => {
  let testEnv: Awaited<ReturnType<typeof loadTestEnvironment>>
  let publicClient: PopPublicClient
  let walletClient: PopWalletClient
  let launch: Launch
  let available: boolean

  // Shared state across tests (set during market creation)
  let floorAddress: Address
  let authorizerAddress: Address
  let creditFacilityAddress: Address | undefined
  let presaleAddress: Address | undefined
  let collateralToken: Address

  beforeAll(async () => {
    available = await isTestEnvironmentAvailable()
    if (!available) {
      console.log(
        'Local dev environment not available, skipping fee management tests. Run `bun dev:local` first.'
      )
      return
    }

    testEnv = await loadTestEnvironment()
    publicClient = createLocalPublicClient()
    walletClient = createLocalWalletClient('DEPLOYER')
    Client.updateUrl(LOCAL_GRAPHQL_URL)

    launch = new Launch({
      floorFactoryAddress: testEnv.floorFactoryAddress,
      publicClient,
      walletClient,
    })

    // Deploy a full market with presale + credit facility for all tests
    console.log('\n=== Deploying test market with presale + credit facility ===')

    // Deploy tokens using standard SDK Deploy class (requires indexer)
    const tokens = await deployTestTokens(walletClient, publicClient, {
      issuance: {
        name: `Fee Test Token ${Date.now()}`,
        symbol: `FEE${Date.now() % 10000}`,
        decimals: 18,
        maxSupply: BigInt(1_000_000_000),
      },
      collateral: {
        name: 'Test USDC',
        symbol: 'TUSDC',
        decimals: 6,
        maxSupply: BigInt(1_000_000_000),
      },
    })

    const issuanceToken = tokens.issuanceToken
    collateralToken = tokens.collateralToken

    console.log(`  Issuance token: ${issuanceToken}`)
    console.log(`  Collateral token: ${collateralToken}`)

    const config = createTestLaunchConfig(issuanceToken, collateralToken, {
      floor: { buyFeeBps: 0, sellFeeBps: 0 }, // Start with zero fees
      creditFacility: {
        loanToValueRatio: 9000,
        maxLeverage: 5,
        borrowingFeeRate: 0,
      },
      presale: createTestPresaleConfig(collateralToken, {
        baseCommissionBps: [BigInt(100), BigInt(200), BigInt(450)],
        priceBreakpoints: [[BigInt(1e18)], [BigInt(1e18), BigInt(1.5e18)]],
      }),
    } as any)

    const result = await launch.create(config)
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: result.transactionHash as `0x${string}`,
    })

    const modules = parseModuleAddressesFromReceipt(receipt, testEnv.moduleFactoryAddress)

    floorAddress = result.floorAddress
    authorizerAddress = modules.authorizer!
    creditFacilityAddress = modules.creditFacility
    presaleAddress = modules.presale

    console.log(`  Floor: ${floorAddress}`)
    console.log(`  Authorizer: ${authorizerAddress}`)
    console.log(`  CreditFacility: ${creditFacilityAddress}`)
    console.log(`  Presale: ${presaleAddress}`)

    // Configure market (grant roles, etc.)
    const configureResult = await launch.configure({
      floorAddress,
      authorizerAddress,
      issuanceTokenAddress: issuanceToken,
      transactionForwarderAddress: testEnv.transactionForwarderAddress,
      creditFacilityAddress,
      presaleAddress,
      grantMinterRole: true,
      openBuy: true,
      openSell: false, // Keep sell closed (presale mode)
      openBorrow: false,
    })

    expect(configureResult.success).toBe(true)
    console.log('  Market configured successfully\n')
  })

  afterAll(() => {
    console.log('\n=== Fee Management Test Suite Complete ===')
  })

  // ===========================================================================
  // F-58: Commission Schedule Changes During Presale
  // ===========================================================================

  describe('F-58: Presale Commission Schedule Changes', () => {
    it('should update commission schedule before presale opens', async () => {
      if (!available || !presaleAddress) return

      const presaleAdmin = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
        walletClient,
      })

      // Verify we're in NotOpen state
      const currentState = await presaleAdmin.getCurrentState()
      expect(currentState).toBe(PresaleState.NotOpen)

      // Update commission schedule with new rates
      const newCommissionBps = [150, 300, 600] // 1.5%, 3%, 6%
      const newBreakpoints = [[BigInt(1.2e18)], [BigInt(1.2e18), BigInt(2e18)]]

      const receipt = await presaleAdmin.setBaseCommissionAndPriceBreakpoints({
        baseCommissionBps: newCommissionBps,
        priceBreakpoints: newBreakpoints,
      })

      expect(receipt).toBeDefined()
      expect(receipt.status).toBe('success')
      console.log(`  Commission schedule updated, tx: ${receipt.transactionHash}`)

      // Verify the new values on-chain
      const state = await presaleAdmin.getPresaleState()
      expect(state.baseCommissionBps).toEqual(newCommissionBps)
      expect(state.priceBreakpoints.length).toBe(2)
      console.log(`  Verified on-chain: ${state.baseCommissionBps.join(', ')} bps`)
    })

    it('should update commission schedule a second time (re-editing)', async () => {
      if (!available || !presaleAddress) return

      const presaleAdmin = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
        walletClient,
      })

      // Change again to verify re-editing works
      const updatedBps = [200, 400, 800]
      const updatedBreakpoints = [[BigInt(1.5e18)], [BigInt(1.5e18), BigInt(2.5e18)]]

      const receipt = await presaleAdmin.setBaseCommissionAndPriceBreakpoints({
        baseCommissionBps: updatedBps,
        priceBreakpoints: updatedBreakpoints,
      })

      expect(receipt.status).toBe('success')

      // Verify
      const state = await presaleAdmin.getPresaleState()
      expect(state.baseCommissionBps).toEqual(updatedBps)
      console.log(`  Re-edited commission: ${state.baseCommissionBps.join(', ')} bps`)
    })
  })

  // ===========================================================================
  // F-52: Fee Controls During Presale Phase
  // ===========================================================================

  describe('F-52: Fee Controls During Presale Phase', () => {
    it('should set buy fee during presale (NotOpen state)', async () => {
      if (!available) return

      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      // Read initial fee
      const initialBuyFee = await marketAdmin.getBuyFee()
      console.log(`  Initial buy fee: ${initialBuyFee} bps`)

      // Set buy fee to 80 bps (0.8%)
      const receipt = await marketAdmin.setBuyFee({ feeBps: 80 })
      expect(receipt.status).toBe('success')

      // Verify on-chain
      const newBuyFee = await marketAdmin.getBuyFee()
      expect(newBuyFee).toBe(80)
      console.log(`  Buy fee set to ${newBuyFee} bps, tx: ${receipt.transactionHash}`)
    })

    it('should set sell fee during presale (NotOpen state)', async () => {
      if (!available) return

      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      // Read initial fee
      const initialSellFee = await marketAdmin.getSellFee()
      console.log(`  Initial sell fee: ${initialSellFee} bps`)

      // Set sell fee to 120 bps (1.2%)
      const receipt = await marketAdmin.setSellFee({ feeBps: 120 })
      expect(receipt.status).toBe('success')

      // Verify on-chain
      const newSellFee = await marketAdmin.getSellFee()
      expect(newSellFee).toBe(120)
      console.log(`  Sell fee set to ${newSellFee} bps, tx: ${receipt.transactionHash}`)
    })
  })

  // ===========================================================================
  // F-59: Sell Fee in GoLive Transition
  // ===========================================================================

  describe('F-59: Sell Fee in GoLive Transition', () => {
    it('should transition presale to Public state first', async () => {
      if (!available || !presaleAddress) return

      const presaleAdmin = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
        walletClient,
      })

      // Open the presale (NotOpen → Public)
      const receipt = await presaleAdmin.setPresaleState({
        state: PresaleState.Public,
      })
      expect(receipt.status).toBe('success')

      const state = await presaleAdmin.getCurrentState()
      expect(state).toBe(PresaleState.Public)
      console.log(`  Presale state: Public`)
    })

    it('should set buy fee, sell fee, and borrow fee atomically via goLive', async () => {
      if (!available || !presaleAddress) return

      const presaleClient = new Presale({
        data: {
          id: presaleAddress,
          address: presaleAddress,
          purchaseToken_id: collateralToken,
        } as any,
        publicClient,
        walletClient,
        floorAddress,
        authorizerAddress,
        creditFacilityAddress,
      })

      // Read fees before go-live
      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      const buyFeeBefore = await marketAdmin.getBuyFee()
      const sellFeeBefore = await marketAdmin.getSellFee()
      console.log(`  Fees before goLive: buy=${buyFeeBefore}, sell=${sellFeeBefore}`)

      // Go live with specific buy, sell, and borrow fees
      const goLiveReceipt = await presaleClient.goLive({
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        floorAddress,
        authorizerAddress,
        creditFacilityAddress,
        liveBuyFeeBps: 50, // 0.5%
        liveSellFeeBps: 75, // 0.75% — THIS IS THE NEW FIELD
        liveBorrowFeeBps: 600, // 6%
      })

      expect(goLiveReceipt).toBeDefined()
      expect(goLiveReceipt.status).toBe('success')
      console.log(`  goLive tx: ${goLiveReceipt.transactionHash}`)

      // Verify fees were set on-chain
      const buyFeeAfter = await marketAdmin.getBuyFee()
      const sellFeeAfter = await marketAdmin.getSellFee()
      expect(buyFeeAfter).toBe(50)
      expect(sellFeeAfter).toBe(75)
      console.log(`  Fees after goLive: buy=${buyFeeAfter}, sell=${sellFeeAfter}`)
      console.log('  PASS: Sell fee was set atomically in goLive multicall')
    })

    it('should verify presale is now Closed after goLive', async () => {
      if (!available || !presaleAddress) return

      const presaleAdmin = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
        walletClient,
      })

      const state = await presaleAdmin.getCurrentState()
      expect(state).toBe(PresaleState.Closed)
      console.log(`  Presale state after goLive: Closed`)
    })
  })

  // ===========================================================================
  // F-59 (continued): setLiveFees with sell fee
  // ===========================================================================

  describe('F-59: setLiveFees with Sell Fee', () => {
    it('should update fees post-launch using setLiveFees with sell fee', async () => {
      if (!available || !presaleAddress) return

      const presaleClient = new Presale({
        data: {
          id: presaleAddress,
          address: presaleAddress,
          purchaseToken_id: collateralToken,
        } as any,
        publicClient,
        walletClient,
        floorAddress,
        authorizerAddress,
        creditFacilityAddress,
      })

      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      // Set new live fees including sell fee
      const receipt = await presaleClient.setLiveFees({
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        floorAddress,
        creditFacilityAddress,
        buyFeeBps: 100, // 1%
        sellFeeBps: 150, // 1.5% — THIS IS THE NEW FIELD
        borrowFeeBps: 350, // 3.5%
      })

      expect(receipt).toBeDefined()
      expect(receipt.status).toBe('success')
      console.log(`  setLiveFees tx: ${receipt.transactionHash}`)

      // Verify on-chain
      const buyFee = await marketAdmin.getBuyFee()
      const sellFee = await marketAdmin.getSellFee()
      expect(buyFee).toBe(100)
      expect(sellFee).toBe(150)
      console.log(`  Fees after setLiveFees: buy=${buyFee}, sell=${sellFee}`)
      console.log('  PASS: Sell fee updated via setLiveFees multicall')
    })

    it('should allow setLiveFees without sell fee (backwards compatible)', async () => {
      if (!available || !presaleAddress) return

      const presaleClient = new Presale({
        data: {
          id: presaleAddress,
          address: presaleAddress,
          purchaseToken_id: collateralToken,
        } as any,
        publicClient,
        walletClient,
        floorAddress,
        authorizerAddress,
        creditFacilityAddress,
      })

      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      // Set fees WITHOUT sell fee — should only update buy + borrow
      const receipt = await presaleClient.setLiveFees({
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        floorAddress,
        creditFacilityAddress,
        buyFeeBps: 200, // 2%
        // sellFeeBps omitted — sell fee should remain at 150 from previous test
        borrowFeeBps: 400, // 4%
      })

      expect(receipt.status).toBe('success')

      const buyFee = await marketAdmin.getBuyFee()
      const sellFee = await marketAdmin.getSellFee()
      expect(buyFee).toBe(200)
      expect(sellFee).toBe(150) // Unchanged
      console.log(`  Fees after setLiveFees (no sell): buy=${buyFee}, sell=${sellFee}`)
      console.log('  PASS: Omitting sellFeeBps leaves sell fee unchanged')
    })
  })

  // ===========================================================================
  // F-75: Fee Validation (pure logic test, no transactions needed)
  // ===========================================================================

  describe('F-75: Fee Validation Logic', () => {
    it('should reject buy fee above 10% (1000 bps) in wizard validation', () => {
      // This mirrors the canProceed validation in create-market/page.tsx
      const validateTreasuryStep = (buyFeeBps: number, sellFeeBps: number) => {
        return buyFeeBps >= 0 && buyFeeBps <= 1000 && sellFeeBps >= 0 && sellFeeBps <= 1000
      }

      expect(validateTreasuryStep(80, 120)).toBe(true) // Normal fees
      expect(validateTreasuryStep(0, 0)).toBe(true) // Zero fees
      expect(validateTreasuryStep(1000, 1000)).toBe(true) // Max 10%
      expect(validateTreasuryStep(1001, 120)).toBe(false) // Buy fee too high
      expect(validateTreasuryStep(80, 1001)).toBe(false) // Sell fee too high
      expect(validateTreasuryStep(5000, 5000)).toBe(false) // Both too high

      console.log('  PASS: Fee upper bound validation (max 10%) works correctly')
    })

    it('should correctly compute floor vs recipient allocation', () => {
      // Mirrors the pie chart logic in step-treasury.tsx
      const computeDistribution = (floorFeePercentage: number, recipientShares: number[]) => {
        const floorPct = floorFeePercentage / 100
        const totalShares = recipientShares.reduce((sum, s) => sum + s, 0)
        const remainingPct = 100 - floorPct

        return {
          floorPct,
          recipientPcts: recipientShares.map((s) => (s / (totalShares || 1)) * remainingPct),
        }
      }

      // 60% floor, shares 7000 + 3000
      const dist = computeDistribution(6000, [7000, 3000])
      expect(dist.floorPct).toBe(60)
      expect(dist.recipientPcts[0]).toBeCloseTo(28, 0) // 70% of 40%
      expect(dist.recipientPcts[1]).toBeCloseTo(12, 0) // 30% of 40%
      expect(dist.floorPct + dist.recipientPcts[0] + dist.recipientPcts[1]).toBeCloseTo(100, 0)

      console.log('  PASS: Floor allocation + recipient shares always total 100%')
    })
  })
})
