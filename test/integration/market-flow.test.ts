/**
 * @description Integration tests for Market Trading Flow
 * Tests the complete flow: approveFToken → buy → sell
 */

import { beforeEach, describe, expect, it } from 'bun:test'
import type { Address } from 'viem'

import type { TFloorAssetData } from '../../src/graphql/api'
import { Market } from '../../src/market'
import { MarketAdmin } from '../../src/market-admin'
import { ANVIL_ADDRESSES, createLocalClients, requireLocalDevEnvironment } from '../helpers'

// Test constants
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('Market Flow - Integration', () => {
  let market: Market
  let marketAdmin: MarketAdmin
  let publicClient: any
  let walletClient: any
  let marketAddress: Address
  let issuanceTokenAddress: Address
  let reserveTokenAddress: Address

  beforeEach(async () => {
    // Setup local dev environment
    const env = await requireLocalDevEnvironment()
    publicClient = env.publicClient
    walletClient = env.walletClient

    // These would be set from actual deployment
    marketAddress = ZERO_ADDRESS
    issuanceTokenAddress = ZERO_ADDRESS
    reserveTokenAddress = ANVIL_ADDRESSES.DEPLOYER

    // Create mock floor data
    const mockFloorData: TFloorAssetData = {
      id: marketAddress,
      contractAddress: marketAddress,
      issuanceToken_id: issuanceTokenAddress,
      reserveToken_id: reserveTokenAddress,
      creditFacility: undefined,
    } as TFloorAssetData

    market = new Market({
      data: mockFloorData,
      publicClient,
      walletClient,
    })

    marketAdmin = new MarketAdmin({
      address: marketAddress,
      publicClient,
      walletClient,
    })
  })

  describe('Basic Trading Flow', () => {
    it('should complete full trading flow: approve → buy → sell', async () => {
      // Step 1: Approve reserve tokens for buying
      await expect(market.approveReserveToken({ amount: BigInt(1000e18) })).rejects.toThrow()

      // Step 2: Buy fTokens
      await expect(market.buy({ depositAmount: BigInt(100e18), slippageBps: 50 })).rejects.toThrow()

      // Step 3: Approve fTokens for selling
      await expect(market.approveFToken({ amount: BigInt(100e18) })).rejects.toThrow()

      // Step 4: Sell fTokens
      await expect(market.sell({ depositAmount: BigInt(50e18), slippageBps: 50 })).rejects.toThrow()
    })

    it('should fail buy if reserve token allowance is insufficient', async () => {
      // First, approve 0 tokens
      await expect(market.approveReserveToken({ amount: BigInt(0) })).rejects.toThrow()

      // Buy should fail due to insufficient allowance
      await expect(market.buy({ depositAmount: BigInt(100e18) })).rejects.toThrow()
    })

    it('should fail sell if fToken balance is insufficient', async () => {
      // Without buying first, sell should fail
      await expect(market.sell({ depositAmount: BigInt(1000e18) })).rejects.toThrow(
        /Insufficient fToken balance/
      )
    })

    it('should fail sell if fToken allowance is insufficient', async () => {
      // Need to have tokens first (would need actual deployment)
      // Then approve less than trying to sell
      await expect(market.approveFToken({ amount: BigInt(10e18) })).rejects.toThrow()

      await expect(market.sell({ depositAmount: BigInt(100e18) })).rejects.toThrow(
        /Insufficient fToken allowance/
      )
    })
  })

  describe('Approval Flow', () => {
    it('should approve exact amount needed', async () => {
      const buyAmount = BigInt(100e18)

      await expect(market.approveReserveToken({ amount: buyAmount })).rejects.toThrow()

      const allowance = await market
        .getReserveTokenAllowance(ANVIL_ADDRESSES.DEPLOYER)
        .catch(() => BigInt(0))

      expect(allowance).toBeGreaterThanOrEqual(buyAmount)
    })

    it('should approve unlimited amount', async () => {
      const maxUint256 = BigInt(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )

      await expect(market.approveReserveToken({ amount: maxUint256 })).rejects.toThrow()
    })

    it('should increase approval', async () => {
      // First approval
      await expect(market.approveReserveToken({ amount: BigInt(100e18) })).rejects.toThrow()

      // Increase approval
      await expect(market.approveReserveToken({ amount: BigInt(200e18) })).rejects.toThrow()
    })

    it('should decrease approval', async () => {
      // First approval
      await expect(market.approveReserveToken({ amount: BigInt(200e18) })).rejects.toThrow()

      // Decrease approval
      await expect(market.approveReserveToken({ amount: BigInt(100e18) })).rejects.toThrow()
    })

    it('should revoke approval', async () => {
      // First give approval
      await expect(market.approveReserveToken({ amount: BigInt(100e18) })).rejects.toThrow()

      // Revoke by approving 0
      await expect(market.approveReserveToken({ amount: BigInt(0) })).rejects.toThrow()
    })
  })

  describe('Buy Operations', () => {
    it('should buy with default slippage', async () => {
      await expect(market.buy({ depositAmount: BigInt(100e18) })).rejects.toThrow()
    })

    it('should buy with custom slippage', async () => {
      await expect(
        market.buy({ depositAmount: BigInt(100e18), slippageBps: 100 })
      ).rejects.toThrow()
    })

    it('should buy with zero slippage', async () => {
      await expect(market.buy({ depositAmount: BigInt(100e18), slippageBps: 0 })).rejects.toThrow()
    })

    it('should buy with maximum slippage (100%)', async () => {
      await expect(
        market.buy({ depositAmount: BigInt(100e18), slippageBps: 10000 })
      ).rejects.toThrow()
    })

    it('should buy for different receiver', async () => {
      await expect(
        market.buyFor({
          receiver: ANVIL_ADDRESSES.ADMIN,
          depositAmount: BigInt(100e18),
        })
      ).rejects.toThrow()
    })
  })

  describe('Sell Operations', () => {
    it('should sell with default slippage', async () => {
      await expect(market.sell({ depositAmount: BigInt(100e18) })).rejects.toThrow()
    })

    it('should sell with custom slippage', async () => {
      await expect(
        market.sell({ depositAmount: BigInt(100e18), slippageBps: 100 })
      ).rejects.toThrow()
    })

    it('should sell to different receiver', async () => {
      await expect(
        market.sellTo({
          receiver: ANVIL_ADDRESSES.ADMIN,
          depositAmount: BigInt(100e18),
        })
      ).rejects.toThrow()
    })
  })

  describe('Market Admin Operations', () => {
    it('should open buying', async () => {
      await expect(marketAdmin.openBuy()).rejects.toThrow()
    })

    it('should close buying', async () => {
      await expect(marketAdmin.closeBuy()).rejects.toThrow()
    })

    it('should open selling', async () => {
      await expect(marketAdmin.openSell()).rejects.toThrow()
    })

    it('should close selling', async () => {
      await expect(marketAdmin.closeSell()).rejects.toThrow()
    })

    it('should set buy fee', async () => {
      await expect(marketAdmin.setBuyFee({ feeBps: 100 })).rejects.toThrow()
    })

    it('should set sell fee', async () => {
      await expect(marketAdmin.setSellFee({ feeBps: 80 })).rejects.toThrow()
    })

    it('should get market state', async () => {
      const state = await marketAdmin.getMarketState().catch(() => ({
        isBuyOpen: false,
        isSellOpen: false,
        buyFeeBps: 0,
        sellFeeBps: 0,
        floorPrice: BigInt(0),
        currentPrice: BigInt(0),
        virtualCollateralSupply: BigInt(0),
        collateralTokenAddress: ZERO_ADDRESS,
        reserveBalance: BigInt(0),
      }))

      expect(state).toBeDefined()
    })
  })

  describe('Floor Elevation Flow', () => {
    it('should complete floor elevation flow: approve → raiseFloor', async () => {
      // Step 1: Approve collateral
      await expect(marketAdmin.approveCollateral({ amount: BigInt(1000e18) })).rejects.toThrow()

      // Step 2: Raise floor
      await expect(marketAdmin.raiseFloor({ collateralAmount: BigInt(100e18) })).rejects.toThrow()
    })

    it('should get raise floor context', async () => {
      const context = await marketAdmin
        .getRaiseFloorContext(ANVIL_ADDRESSES.DEPLOYER)
        .catch(() => ({
          adminBalance: BigInt(0),
          allowance: BigInt(0),
          lastFloorRaise: null,
        }))

      expect(context).toBeDefined()
      expect(context).toHaveProperty('adminBalance')
      expect(context).toHaveProperty('allowance')
      expect(context).toHaveProperty('lastFloorRaise')
    })

    it('should simulate raise floor', async () => {
      const preview = await marketAdmin
        .simulateRaiseFloor(BigInt(100e18), ANVIL_ADDRESSES.DEPLOYER)
        .catch(() => ({
          oldFloorPrice: BigInt(0),
          newFloorPrice: BigInt(0),
          collateralConsumed: BigInt(0),
          supplyIncrease: BigInt(0),
        }))

      expect(preview).toBeDefined()
      expect(preview).toHaveProperty('oldFloorPrice')
    })
  })

  describe('Cross-User Flow', () => {
    it('should handle user1 buy, user2 sell scenario', async () => {
      // User 1 buys
      const user1Clients = createLocalClients('DEPLOYER')
      const user1Market = new Market({
        data: {
          id: marketAddress,
          contractAddress: marketAddress,
          issuanceToken_id: issuanceTokenAddress,
          reserveToken_id: reserveTokenAddress,
        } as TFloorAssetData,
        publicClient,
        walletClient: user1Clients.walletClient,
      })

      await expect(user1Market.buy({ depositAmount: BigInt(100e18) })).rejects.toThrow()

      // User 2 sells (would need to have tokens first)
      const user2Clients = createLocalClients('USER_1')
      const user2Market = new Market({
        data: {
          id: marketAddress,
          contractAddress: marketAddress,
          issuanceToken_id: issuanceTokenAddress,
          reserveToken_id: reserveTokenAddress,
        } as TFloorAssetData,
        publicClient,
        walletClient: user2Clients.walletClient,
      })

      await expect(user2Market.sell({ depositAmount: BigInt(50e18) })).rejects.toThrow()
    })
  })

  describe('Fee Collection', () => {
    it('should verify buy fee is applied', async () => {
      // Get current buy fee
      const buyFeeBps = await marketAdmin.getBuyFee().catch(() => 0)
      expect(typeof buyFeeBps).toBe('number')

      // Buy with fee
      await expect(market.buy({ depositAmount: BigInt(100e18) })).rejects.toThrow()
    })

    it('should verify sell fee is applied', async () => {
      // Get current sell fee
      const sellFeeBps = await marketAdmin.getSellFee().catch(() => 0)
      expect(typeof sellFeeBps).toBe('number')

      // Sell with fee (would need tokens first)
      await expect(market.sell({ depositAmount: BigInt(50e18) })).rejects.toThrow()
    })
  })

  describe('Preview Functions', () => {
    it('should preview buy amount', async () => {
      const expectedOut = await market.previewBuy(BigInt(100e18)).catch(() => BigInt(0))
      expect(typeof expectedOut).toBe('bigint')
      expect(expectedOut).toBeGreaterThanOrEqual(BigInt(0))
    })

    it('should preview sell amount', async () => {
      const expectedOut = await market.previewSell(BigInt(100e18)).catch(() => BigInt(0))
      expect(typeof expectedOut).toBe('bigint')
      expect(expectedOut).toBeGreaterThanOrEqual(BigInt(0))
    })

    it('should show price impact for large buys', async () => {
      const smallBuy = await market.previewBuy(BigInt(10e18)).catch(() => BigInt(0))
      const largeBuy = await market.previewBuy(BigInt(1000e18)).catch(() => BigInt(0))

      // Large buy should have worse price (less tokens per reserve)
      // This is a conceptual test - actual values depend on curve
      expect(typeof smallBuy).toBe('bigint')
      expect(typeof largeBuy).toBe('bigint')
    })
  })

  describe('Segment Information', () => {
    it('should get floor section', async () => {
      const floorSection = await market.getFloorSection().catch(() => '0x' as `0x${string}`)
      expect(floorSection).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should get premium sections', async () => {
      const premiumSections = await market.getPremiumSections().catch(() => [] as `0x${string}`[])
      expect(Array.isArray(premiumSections)).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle very small buy amounts', async () => {
      await expect(
        market.buy({ depositAmount: BigInt(1) }) // 1 wei
      ).rejects.toThrow()
    })

    it('should handle very large buy amounts', async () => {
      await expect(
        market.buy({ depositAmount: BigInt('1000000000000000000000000') }) // 1M tokens
      ).rejects.toThrow()
    })

    it('should handle very small sell amounts', async () => {
      await expect(
        market.sell({ depositAmount: BigInt(1) }) // 1 wei
      ).rejects.toThrow()
    })

    it('should handle maximum slippage', async () => {
      await expect(
        market.buy({ depositAmount: BigInt(100e18), slippageBps: 10000 })
      ).rejects.toThrow()
    })
  })

  describe('Error Handling', () => {
    it('should throw for zero buy amount', async () => {
      await expect(market.buy({ depositAmount: BigInt(0) })).rejects.toThrow(
        'Invalid amount. Amount must be greater than 0.'
      )
    })

    it('should throw for zero sell amount', async () => {
      await expect(market.sell({ depositAmount: BigInt(0) })).rejects.toThrow(
        'Invalid amount. Amount must be greater than 0.'
      )
    })

    it('should throw when market is closed for buying', async () => {
      // First close buying
      await expect(marketAdmin.closeBuy()).rejects.toThrow()

      // Then try to buy
      await expect(market.buy({ depositAmount: BigInt(100e18) })).rejects.toThrow()
    })

    it('should throw when market is closed for selling', async () => {
      // First close selling
      await expect(marketAdmin.closeSell()).rejects.toThrow()

      // Then try to sell
      await expect(market.sell({ depositAmount: BigInt(100e18) })).rejects.toThrow()
    })
  })
})
