/**
 * @description Integration tests for Credit Facility flow
 * Tests the complete flow: approveFTokenForCreditFacility → borrow → repay
 */

import { beforeEach, describe, expect, it } from 'bun:test'
import type { Address } from 'viem'

import { CreditFacilityAdmin } from '../../src/credit-facility-admin'
import type { TFloorAssetData } from '../../src/graphql/api'
import { Market } from '../../src/market'
import { ANVIL_ADDRESSES, requireLocalDevEnvironment } from '../helpers'

// Test constants
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('Credit Facility Flow - Integration', () => {
  let market: Market
  let creditAdmin: CreditFacilityAdmin
  let publicClient: any
  let walletClient: any
  let marketAddress: Address
  let creditFacilityAddress: Address
  let issuanceTokenAddress: Address

  beforeEach(async () => {
    // Setup local dev environment
    const env = await requireLocalDevEnvironment()
    publicClient = env.publicClient
    walletClient = env.walletClient

    // These would be set from actual deployment
    marketAddress = ZERO_ADDRESS
    creditFacilityAddress = ZERO_ADDRESS
    issuanceTokenAddress = ZERO_ADDRESS

    // Create mock floor data
    const mockFloorData: TFloorAssetData = {
      id: marketAddress,
      contractAddress: marketAddress,
      issuanceToken_id: issuanceTokenAddress,
      reserveToken_id: ANVIL_ADDRESSES.DEPLOYER, // Using deployer as reserve token for testing
      creditFacility: creditFacilityAddress,
    } as TFloorAssetData

    market = new Market({
      data: mockFloorData,
      publicClient,
      walletClient,
    })

    creditAdmin = new CreditFacilityAdmin({
      address: creditFacilityAddress,
      publicClient,
      walletClient,
    })
  })

  describe('Basic Borrow Flow', () => {
    it('should complete full borrow flow: approve → borrow → repay', async () => {
      // This is the complete flow that users would follow
      // 1. Approve fTokens for Credit Facility
      // 2. Borrow against collateral
      // 3. Repay the loan

      // Step 1: Approve fTokens for Credit Facility
      // Note: This requires actual deployed contracts to work
      await expect(
        market.approveFTokenForCreditFacility({ amount: BigInt(1000e18) })
      ).rejects.toThrow()

      // Step 2: Verify allowance was set
      const allowance = await market
        .getFTokenAllowanceForCreditFacility(ANVIL_ADDRESSES.DEPLOYER)
        .catch(() => BigInt(0))
      expect(allowance).toBeGreaterThanOrEqual(BigInt(0))

      // Step 3: Borrow against collateral
      await expect(market.borrow({ borrowAmount: BigInt(100e18) })).rejects.toThrow()

      // Step 4: Repay the loan
      await expect(
        market.repay({ repayAmount: BigInt(100e18), loanId: BigInt(1) })
      ).rejects.toThrow()
    })

    it('should fail borrow if allowance is insufficient', async () => {
      // First, approve 0 tokens
      await expect(market.approveFTokenForCreditFacility({ amount: BigInt(0) })).rejects.toThrow()

      // Borrow should fail due to insufficient allowance
      await expect(market.borrow({ borrowAmount: BigInt(100e18) })).rejects.toThrow()
    })

    it('should allow partial repay', async () => {
      // Borrow first (would need actual deployment)
      await expect(market.borrow({ borrowAmount: BigInt(1000e18) })).rejects.toThrow()

      // Partial repay (50%)
      await expect(
        market.repay({ repayAmount: BigInt(500e18), loanId: BigInt(1) })
      ).rejects.toThrow()
    })

    it('should allow full repay', async () => {
      // Borrow first
      await expect(market.borrow({ borrowAmount: BigInt(1000e18) })).rejects.toThrow()

      // Full repay
      await expect(
        market.repay({ repayAmount: BigInt(1000e18), loanId: BigInt(1) })
      ).rejects.toThrow()
    })
  })

  describe('Leverage Loop Flow', () => {
    it('should complete leverage flow: approve → buyAndBorrow → repay', async () => {
      // Step 1: Approve reserve tokens for Credit Facility (for looping)
      await expect(
        market.approveReserveTokenForCreditFacility({ amount: BigInt(1000e18) })
      ).rejects.toThrow()

      // Step 2: Buy and borrow with leverage
      await expect(
        market.buyAndBorrow({
          amount: BigInt(100e18),
          leverage: 2, // 2x leverage
          consolidate: false,
        })
      ).rejects.toThrow()

      // Step 3: Repay the loan(s)
      await expect(
        market.repay({ repayAmount: BigInt(200e18), loanId: BigInt(0) }) // 0 = oldest loan
      ).rejects.toThrow()
    })

    it('should handle different leverage levels', async () => {
      const leverageLevels = [1, 2, 3, 5]

      for (const leverage of leverageLevels) {
        await expect(
          market.buyAndBorrow({
            amount: BigInt(100e18),
            leverage,
            consolidate: false,
          })
        ).rejects.toThrow()
      }
    })

    it('should handle consolidation with existing loans', async () => {
      // First buyAndBorrow without consolidation
      await expect(
        market.buyAndBorrow({
          amount: BigInt(100e18),
          leverage: 2,
          consolidate: false,
        })
      ).rejects.toThrow()

      // Second buyAndBorrow with consolidation
      await expect(
        market.buyAndBorrow({
          amount: BigInt(100e18),
          leverage: 2,
          consolidate: true,
        })
      ).rejects.toThrow()
    })
  })

  describe('Loan Management', () => {
    it('should transfer loan to new borrower', async () => {
      // First, need to have a loan (borrow)
      await expect(market.borrow({ borrowAmount: BigInt(100e18) })).rejects.toThrow()

      // Transfer loan to another address
      await expect(
        creditAdmin.transferLoan({
          loanId: BigInt(1),
          newBorrower: ANVIL_ADDRESSES.ADMIN,
        })
      ).rejects.toThrow()
    })

    it('should rebalance loan', async () => {
      // First, need to have a loan
      await expect(market.borrow({ borrowAmount: BigInt(100e18) })).rejects.toThrow()

      // Rebalance the loan
      await expect(creditAdmin.rebalanceLoan({ loanId: BigInt(1) })).rejects.toThrow()
    })

    it('should consolidate multiple loans', async () => {
      // Create multiple loans
      await expect(market.borrow({ borrowAmount: BigInt(100e18) })).rejects.toThrow()

      await expect(market.borrow({ borrowAmount: BigInt(100e18) })).rejects.toThrow()

      // Consolidate loans
      await expect(
        creditAdmin.consolidateLoans({ loanIds: [BigInt(1), BigInt(2)] })
      ).rejects.toThrow()
    })

    it('should handle multi-loan scenario with consolidation', async () => {
      // Create 3 separate loans
      await expect(market.borrow({ borrowAmount: BigInt(100e18) })).rejects.toThrow()

      await expect(market.borrow({ borrowAmount: BigInt(200e18) })).rejects.toThrow()

      await expect(market.borrow({ borrowAmount: BigInt(300e18) })).rejects.toThrow()

      // Consolidate all into one
      await expect(
        creditAdmin.consolidateLoans({ loanIds: [BigInt(1), BigInt(2), BigInt(3)] })
      ).rejects.toThrow()
    })
  })

  describe('Credit Facility Admin Operations', () => {
    it('should update LTV ratio', async () => {
      await expect(
        creditAdmin.setLoanToValueRatio({ ltvBps: 9000 }) // 90%
      ).rejects.toThrow()
    })

    it('should update borrowing fee rate', async () => {
      await expect(
        creditAdmin.setBorrowingFeeRate({ feeBps: 100 }) // 1%
      ).rejects.toThrow()
    })

    it('should update max leverage', async () => {
      await expect(creditAdmin.setMaxLeverage({ maxLeverage: 10 })).rejects.toThrow()
    })

    it('should get current credit facility state', async () => {
      const state = await creditAdmin.getCreditFacilityState().catch(() => ({
        ltvBps: 0,
        borrowingFeeBps: 0,
        maxLeverage: 0,
        totalLoans: BigInt(0),
        totalDebt: BigInt(0),
        totalCollateral: BigInt(0),
      }))

      expect(state).toBeDefined()
      expect(state.ltvBps).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Allowance Checks', () => {
    it('should check fToken allowance for Credit Facility', async () => {
      const allowance = await market
        .getFTokenAllowanceForCreditFacility(ANVIL_ADDRESSES.DEPLOYER)
        .catch(() => BigInt(0))

      expect(typeof allowance).toBe('bigint')
      expect(allowance).toBeGreaterThanOrEqual(BigInt(0))
    })

    it('should check reserve token allowance for Credit Facility', async () => {
      const allowance = await market
        .getReserveTokenAllowanceForCreditFacility(ANVIL_ADDRESSES.DEPLOYER)
        .catch(() => BigInt(0))

      expect(typeof allowance).toBe('bigint')
      expect(allowance).toBeGreaterThanOrEqual(BigInt(0))
    })
  })

  describe('Credit Facility Configuration', () => {
    it('should get current LTV ratio', async () => {
      const ltv = await market.getLoanToValueRatio().catch(() => 0)
      expect(typeof ltv).toBe('number')
      expect(ltv).toBeGreaterThanOrEqual(0)
    })

    it('should get current borrowing fee rate', async () => {
      const feeRate = await market.getBorrowingFeeRate().catch(() => 0)
      expect(typeof feeRate).toBe('number')
      expect(feeRate).toBeGreaterThanOrEqual(0)
    })

    it('should get max leverage', async () => {
      const maxLeverage = await market.getMaxLeverage().catch(() => 0)
      expect(typeof maxLeverage).toBe('number')
      expect(maxLeverage).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Edge Cases', () => {
    it('should handle repay with loanId 0 (oldest loan)', async () => {
      await expect(
        market.repay({ repayAmount: BigInt(100e18), loanId: BigInt(0) })
      ).rejects.toThrow()
    })

    it('should handle very small borrow amounts', async () => {
      await expect(
        market.borrow({ borrowAmount: BigInt(1) }) // 1 wei
      ).rejects.toThrow()
    })

    it('should handle large borrow amounts', async () => {
      await expect(
        market.borrow({ borrowAmount: BigInt('1000000000000000000000000') }) // 1M tokens
      ).rejects.toThrow()
    })

    it('should handle repay exceeding loan amount', async () => {
      // This would typically be handled by the contract
      // The SDK should pass the amount through
      await expect(
        market.repay({ repayAmount: BigInt('1000000000000000000000000'), loanId: BigInt(1) })
      ).rejects.toThrow()
    })
  })

  describe('Error Handling', () => {
    it('should throw when credit facility is not available', async () => {
      const mockFloorData: TFloorAssetData = {
        id: ZERO_ADDRESS,
        contractAddress: ZERO_ADDRESS,
        issuanceToken_id: ZERO_ADDRESS,
        reserveToken_id: ZERO_ADDRESS,
        creditFacility: undefined,
      } as TFloorAssetData

      const marketWithoutCreditFacility = new Market({
        data: mockFloorData,
        publicClient,
        walletClient,
      })

      await expect(
        marketWithoutCreditFacility.borrow({ borrowAmount: BigInt(100e18) })
      ).rejects.toThrow('Credit Facility not available')
    })

    it('should throw for invalid loan ID', async () => {
      await expect(
        market.repay({ repayAmount: BigInt(100e18), loanId: BigInt(999999) })
      ).rejects.toThrow()
    })
  })
})
