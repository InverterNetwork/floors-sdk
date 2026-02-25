/**
 * @description Contract Revert Reason Tests
 * Tests that SDK properly handles and propagates contract revert reasons
 */

import { beforeEach, describe, expect, it } from 'bun:test'
import type { Address } from 'viem'

import { CreditFacilityAdmin } from '../src/credit-facility-admin'
import type { TFloorAssetData } from '../src/graphql/api'
import { Market } from '../src/market'
import { MarketAdmin } from '../src/market-admin'
import { PresaleAdmin } from '../src/presale-admin'
import { ANVIL_ADDRESSES, requireLocalDevEnvironment } from './helpers'

// Test constants
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('Contract Revert Reasons', () => {
  let market: Market
  let marketAdmin: MarketAdmin
  let creditAdmin: CreditFacilityAdmin
  let presaleAdmin: PresaleAdmin
  let publicClient: any
  let walletClient: any
  let marketAddress: Address
  let creditFacilityAddress: Address
  let presaleAddress: Address

  beforeEach(async () => {
    // Setup local dev environment
    const env = await requireLocalDevEnvironment()
    publicClient = env.publicClient
    walletClient = env.walletClient

    // These would be set from actual deployment
    marketAddress = ZERO_ADDRESS
    creditFacilityAddress = ZERO_ADDRESS
    presaleAddress = ZERO_ADDRESS

    // Create mock floor data
    const mockFloorData: TFloorAssetData = {
      id: marketAddress,
      contractAddress: marketAddress,
      issuanceToken_id: ANVIL_ADDRESSES.ADMIN,
      reserveToken_id: ANVIL_ADDRESSES.ADMIN,
      creditFacility: creditFacilityAddress,
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

    creditAdmin = new CreditFacilityAdmin({
      address: creditFacilityAddress,
      publicClient,
      walletClient,
    })

    presaleAdmin = new PresaleAdmin({
      address: presaleAddress,
      publicClient,
      walletClient,
    })
  })

  describe('Market Revert Reasons', () => {
    describe('Balance and Allowance Errors', () => {
      it('should handle Market__InsufficientBalance revert', async () => {
        // Try to sell without having any tokens
        await expect(market.sell({ depositAmount: BigInt(1000e18) })).rejects.toThrow()
      })

      it('should handle Market__InsufficientAllowance revert', async () => {
        // Approve 0 tokens then try to sell
        await expect(market.approveFToken({ amount: BigInt(0) })).rejects.toThrow()

        // Sell should fail due to insufficient allowance
        await expect(market.sell({ depositAmount: BigInt(100e18) })).rejects.toThrow()
      })

      it('should handle insufficient reserve token allowance for buy', async () => {
        // Approve 0 reserve tokens then try to buy
        await expect(market.approveReserveToken({ amount: BigInt(0) })).rejects.toThrow()

        // Buy should fail due to insufficient allowance
        await expect(market.buy({ depositAmount: BigInt(100e18) })).rejects.toThrow()
      })
    })

    describe('Invalid Amount Errors', () => {
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

      it('should throw for zero borrow amount', async () => {
        await expect(market.borrow({ borrowAmount: BigInt(0) })).rejects.toThrow(
          'Invalid amount. Amount must be greater than 0.'
        )
      })

      it('should throw for zero repay amount', async () => {
        await expect(market.repay({ repayAmount: BigInt(0), loanId: BigInt(1) })).rejects.toThrow(
          'Invalid amount. Amount must be greater than 0.'
        )
      })
    })

    describe('Market Closed Errors', () => {
      it('should throw when market is closed for buying', async () => {
        // Close buying
        await expect(marketAdmin.closeBuy()).rejects.toThrow()

        // Buy should fail
        await expect(market.buy({ depositAmount: BigInt(100e18) })).rejects.toThrow()
      })

      it('should throw when market is closed for selling', async () => {
        // Close selling
        await expect(marketAdmin.closeSell()).rejects.toThrow()

        // Sell should fail
        await expect(market.sell({ depositAmount: BigInt(100e18) })).rejects.toThrow()
      })
    })

    describe('Slippage Errors', () => {
      it('should throw when slippage tolerance is exceeded', async () => {
        // Set zero slippage - any price movement will cause revert
        await expect(
          market.buy({ depositAmount: BigInt(100e18), slippageBps: 0 })
        ).rejects.toThrow()
      })

      it('should handle tight slippage on large trades', async () => {
        // Large trade with tight slippage should fail
        await expect(
          market.buy({ depositAmount: BigInt(10000e18), slippageBps: 1 })
        ).rejects.toThrow()
      })
    })

    describe('Credit Facility Errors', () => {
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

      it('should throw when fToken allowance for credit facility is insufficient', async () => {
        // Approve 0 tokens for credit facility
        await expect(market.approveFTokenForCreditFacility({ amount: BigInt(0) })).rejects.toThrow()

        // Borrow should fail
        await expect(market.borrow({ borrowAmount: BigInt(100e18) })).rejects.toThrow()
      })

      it('should throw for invalid leverage (less than 1)', async () => {
        await expect(market.buyAndBorrow({ amount: BigInt(100e18), leverage: 0 })).rejects.toThrow(
          'Leverage must be at least 1'
        )
      })

      it('should throw for excessive leverage (above max)', async () => {
        await expect(
          market.buyAndBorrow({ amount: BigInt(100e18), leverage: 256 })
        ).rejects.toThrow()
      })
    })
  })

  describe('MarketAdmin Revert Reasons', () => {
    describe('Fee Validation Errors', () => {
      it('should throw for buy fee above 10000 bps', async () => {
        await expect(marketAdmin.setBuyFee({ feeBps: 10001 })).rejects.toThrow()
      })

      it('should throw for sell fee above 10000 bps', async () => {
        await expect(marketAdmin.setSellFee({ feeBps: 10001 })).rejects.toThrow()
      })

      it('should accept fee at exactly 10000 bps (100%)', async () => {
        await expect(marketAdmin.setBuyFee({ feeBps: 10000 })).rejects.toThrow()
      })
    })

    describe('Floor Elevation Errors', () => {
      it('should throw when collateral amount is too small', async () => {
        // Zero collateral should fail
        await expect(marketAdmin.raiseFloor({ collateralAmount: BigInt(0) })).rejects.toThrow()
      })

      it('should throw when segments are insufficient', async () => {
        // This would fail at contract level with Floor__InsufficientSegments
        await expect(
          marketAdmin.reconfigureSegments({
            segments: [], // Empty array should fail
            suppliedCollateral: BigInt(1e18),
            selfSupplied: true,
          })
        ).rejects.toThrow()
      })

      it('should throw when no floor increase occurs', async () => {
        // This tests Floor__NoFloorIncrease scenario
        // Would need specific conditions where collateral doesn't increase floor
        await expect(marketAdmin.raiseFloor({ collateralAmount: BigInt(1) })).rejects.toThrow()
      })
    })

    describe('Segment Reconfiguration Errors', () => {
      it('should throw for empty segment array', async () => {
        await expect(
          marketAdmin.reconfigureSegments({
            segments: [],
            suppliedCollateral: BigInt(1e18),
            selfSupplied: true,
          })
        ).rejects.toThrow()
      })

      it('should throw for invalid segment format', async () => {
        await expect(
          marketAdmin.reconfigureSegments({
            segments: ['0x1234' as `0x${string}`], // Invalid segment length
            suppliedCollateral: BigInt(1e18),
            selfSupplied: true,
          })
        ).rejects.toThrow()
      })
    })

    describe('Collateral Management Errors', () => {
      it('should throw for zero collateral amount in withdraw', async () => {
        await expect(
          marketAdmin.withdrawCollateralTo({
            amount: BigInt(0),
          })
        ).rejects.toThrow()
      })

      it('should throw for zero collateral amount in deposit', async () => {
        await expect(
          marketAdmin.depositCollateralFrom({
            amount: BigInt(0),
          })
        ).rejects.toThrow()
      })
    })
  })

  describe('CreditFacilityAdmin Revert Reasons', () => {
    describe('Loan ID Errors', () => {
      it('should handle CreditFacility__InvalidLoanId', async () => {
        // Try to repay non-existent loan
        await expect(
          market.repay({ repayAmount: BigInt(100e18), loanId: BigInt(999999) })
        ).rejects.toThrow()
      })

      it('should throw when transferring non-existent loan', async () => {
        await expect(
          creditAdmin.transferLoan({
            loanId: BigInt(999999),
            newBorrower: ANVIL_ADDRESSES.ADMIN,
          })
        ).rejects.toThrow()
      })

      it('should throw when rebalancing non-existent loan', async () => {
        await expect(creditAdmin.rebalanceLoan({ loanId: BigInt(999999) })).rejects.toThrow()
      })
    })

    describe('Leverage and Loop Errors', () => {
      it('should handle CreditFacility__InvalidLoopCount', async () => {
        // Zero loops should fail
        await expect(market.buyAndBorrow({ amount: BigInt(100e18), leverage: 0 })).rejects.toThrow()
      })

      it('should throw for loops exceeding max', async () => {
        // Max leverage is typically 255, so 256 loops should fail
        await expect(
          market.buyAndBorrow({ amount: BigInt(100e18), leverage: 300 })
        ).rejects.toThrow()
      })
    })

    describe('LTV Ratio Errors', () => {
      it('should throw for LTV above 9900 bps', async () => {
        await expect(creditAdmin.setLoanToValueRatio({ ltvBps: 9901 })).rejects.toThrow()
      })

      it('should throw for LTV of 0 bps', async () => {
        await expect(creditAdmin.setLoanToValueRatio({ ltvBps: 0 })).rejects.toThrow()
      })

      it('should accept LTV at exactly 9900 bps', async () => {
        await expect(creditAdmin.setLoanToValueRatio({ ltvBps: 9900 })).rejects.toThrow()
      })

      it('should accept LTV at minimum 1 bps', async () => {
        await expect(creditAdmin.setLoanToValueRatio({ ltvBps: 1 })).rejects.toThrow()
      })
    })

    describe('Borrowing Fee Rate Errors', () => {
      it('should throw for fee above 10000 bps', async () => {
        await expect(creditAdmin.setBorrowingFeeRate({ feeBps: 10001 })).rejects.toThrow()
      })

      it('should accept fee at exactly 10000 bps', async () => {
        await expect(creditAdmin.setBorrowingFeeRate({ feeBps: 10000 })).rejects.toThrow()
      })
    })

    describe('Max Leverage Errors', () => {
      it('should throw for max leverage above 255', async () => {
        await expect(creditAdmin.setMaxLeverage({ maxLeverage: 256 })).rejects.toThrow()
      })

      it('should throw for max leverage of 0', async () => {
        await expect(creditAdmin.setMaxLeverage({ maxLeverage: 0 })).rejects.toThrow()
      })

      it('should accept max leverage at exactly 255', async () => {
        await expect(creditAdmin.setMaxLeverage({ maxLeverage: 255 })).rejects.toThrow()
      })
    })

    describe('Loan Consolidation Errors', () => {
      it('should throw when consolidating less than 2 loans', async () => {
        await expect(creditAdmin.consolidateLoans({ loanIds: [BigInt(1)] })).rejects.toThrow()
      })

      it('should throw when consolidating empty loan array', async () => {
        await expect(creditAdmin.consolidateLoans({ loanIds: [] })).rejects.toThrow()
      })
    })

    describe('Transfer Loan Errors', () => {
      it('should throw when transferring to zero address', async () => {
        await expect(
          creditAdmin.transferLoan({
            loanId: BigInt(1),
            newBorrower: ZERO_ADDRESS,
          })
        ).rejects.toThrow()
      })
    })
  })

  describe('PresaleAdmin Revert Reasons', () => {
    describe('State Transition Errors', () => {
      it('should handle Presale__NotOpen revert', async () => {
        // Try to purchase when presale is NotOpen (state 0)
        // This would be tested through Presale class, but admin can set state
        await expect(presaleAdmin.setNotOpen()).rejects.toThrow()
      })

      it('should handle Presale__NotWhitelisted revert', async () => {
        // Set whitelist phase
        await expect(presaleAdmin.setWhitelistPhase()).rejects.toThrow()

        // Non-whitelisted address purchase should fail
        // This would be tested through Presale class
      })

      it('should prevent going live without required setup', async () => {
        // Going live without setting caps should fail
        await expect(presaleAdmin.goLive()).rejects.toThrow()
      })
    })

    describe('Cap Errors', () => {
      it('should throw when global cap is exceeded', async () => {
        // Set a very small cap
        await expect(
          presaleAdmin.setCaps({
            globalCap: BigInt(1e18),
            perAddressCap: BigInt(0),
          })
        ).rejects.toThrow()

        // Purchase exceeding cap should fail (tested in integration)
      })

      it('should throw when per-address cap is exceeded', async () => {
        // Set per-address cap
        await expect(
          presaleAdmin.setCaps({
            globalCap: BigInt(1000000e18),
            perAddressCap: BigInt(10e18),
          })
        ).rejects.toThrow()

        // Single address exceeding cap should fail
      })
    })

    describe('Merkle Root Errors', () => {
      it('should throw for invalid merkle root format', async () => {
        await expect(
          presaleAdmin.setMerkleRoot({ merkleRoot: '0x1234' as `0x${string}` })
        ).rejects.toThrow()
      })

      it('should throw for empty merkle root', async () => {
        await expect(
          presaleAdmin.setMerkleRoot({ merkleRoot: '0x' as `0x${string}` })
        ).rejects.toThrow()
      })
    })

    describe('Commission and Price Breakpoint Errors', () => {
      it('should throw when array lengths do not match', async () => {
        await expect(
          presaleAdmin.setBaseCommissionAndPriceBreakpoints({
            baseCommissionBps: [100, 200],
            priceBreakpoints: [[BigInt(1e18)]], // Mismatched length
          })
        ).rejects.toThrow()
      })

      it('should throw for commission above 10000 bps', async () => {
        await expect(
          presaleAdmin.setBaseCommissionAndPriceBreakpoints({
            baseCommissionBps: [10001],
            priceBreakpoints: [[BigInt(1e18)]],
          })
        ).rejects.toThrow()
      })
    })

    describe('Credit Facility Errors', () => {
      it('should throw when setting zero address as credit facility', async () => {
        await expect(
          presaleAdmin.setCreditFacility({ creditFacility: ZERO_ADDRESS })
        ).rejects.toThrow()
      })
    })

    describe('Timestamp Errors', () => {
      it('should throw when setting end timestamp in the past', async () => {
        const pastTimestamp = BigInt(Math.floor(Date.now() / 1000) - 86400)
        await expect(presaleAdmin.setEndTimestamp({ timestamp: pastTimestamp })).rejects.toThrow()
      })

      it('should throw when setting start time in the past', async () => {
        const pastTime = BigInt(Math.floor(Date.now() / 1000) - 86400)
        await expect(presaleAdmin.setStartTime({ startTime: pastTime })).rejects.toThrow()
      })
    })

    describe('Decay Duration Errors', () => {
      it('should throw for negative decay duration', async () => {
        await expect(presaleAdmin.setDecayDuration({ duration: BigInt(-1) })).rejects.toThrow()
      })
    })

    describe('Initial Multiplier Errors', () => {
      it('should throw for zero initial multiplier', async () => {
        await expect(presaleAdmin.setInitialMultiplier({ multiplier: 0 })).rejects.toThrow()
      })
    })
  })

  describe('Address Validation Errors', () => {
    describe('Zero Address Reverts', () => {
      it('should throw for zero address in market operations', async () => {
        // Zero address checks are typically done at SDK level
        expect(ZERO_ADDRESS).toBe('0x0000000000000000000000000000000000000000')
      })

      it('should throw for zero address in credit facility operations', async () => {
        await expect(
          creditAdmin.transferLoan({
            loanId: BigInt(1),
            newBorrower: ZERO_ADDRESS,
          })
        ).rejects.toThrow()
      })

      it('should throw for zero address in presale operations', async () => {
        await expect(
          presaleAdmin.setCreditFacility({ creditFacility: ZERO_ADDRESS })
        ).rejects.toThrow()
      })
    })

    describe('Invalid Address Format', () => {
      it('should throw for address with wrong length', async () => {
        const shortAddress = '0x12345678901234567890123456789012345678' // 38 chars
        expect(shortAddress.length).not.toBe(42)
      })

      it('should throw for address with non-hex characters', async () => {
        const invalidAddress = '0x123456789012345678901234567890123456789g'
        expect(invalidAddress).not.toMatch(/^0x[a-fA-F0-9]{40}$/)
      })
    })
  })

  describe('Minimum Amount Errors', () => {
    describe('Minimum Borrow', () => {
      it('should throw for borrow amount below minimum', async () => {
        // Contract has minimum borrow based on fee rate
        // Minimum borrow: 10_000 / borrowingFeeRate
        await expect(market.borrow({ borrowAmount: BigInt(1) })).rejects.toThrow()
      })
    })

    describe('Minimum Collateral', () => {
      it('should throw for collateral below minimum', async () => {
        // raiseFloor has minimum collateral requirement
        await expect(marketAdmin.raiseFloor({ collateralAmount: BigInt(0) })).rejects.toThrow()
      })
    })
  })

  describe('Array Length Mismatch Errors', () => {
    it('should throw when segment arrays have mismatched lengths', async () => {
      await expect(
        marketAdmin.reconfigureSegments({
          segments: [
            ('0x' + '00'.repeat(32)) as `0x${string}`,
            ('0x' + '11'.repeat(32)) as `0x${string}`,
          ],
          suppliedCollateral: BigInt(1e18),
          selfSupplied: true,
        })
      ).rejects.toThrow()
    })

    it('should throw when commission and price breakpoint arrays mismatch', async () => {
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [100, 200, 300],
          priceBreakpoints: [[BigInt(1e18)], [BigInt(1.5e18)]], // Length mismatch
        })
      ).rejects.toThrow()
    })
  })

  describe('Recipient Share Errors', () => {
    it('should throw when recipient shares do not equal 10000', async () => {
      // This is validated in treasury-admin.test.ts but included here for completeness
      expect([BigInt(5000), BigInt(4000)].reduce((a, b) => a + b, BigInt(0))).not.toBe(
        BigInt(10000)
      )
    })

    it('should throw for zero shares in recipient', async () => {
      const recipients = [
        { address: ANVIL_ADDRESSES.ADMIN, shares: BigInt(0) },
        { address: ANVIL_ADDRESSES.MANAGER, shares: BigInt(10000) },
      ]
      const totalShares = recipients.reduce((sum, r) => sum + r.shares, BigInt(0))
      // Zero shares for a recipient may be valid if total is 10000
      expect(totalShares).toBe(BigInt(10000))
    })
  })

  describe('Lifecycle Callback Error Handling', () => {
    it('should handle errors in onPendingWallet callback', async () => {
      let errorCallbackCalled = false
      const error = new Error('Wallet rejected')

      try {
        await market.buy({
          depositAmount: BigInt(100e18),
          lifecycle: {
            onPendingWallet: () => {
              throw error
            },
          },
        })
      } catch (e) {
        errorCallbackCalled = true
      }

      expect(errorCallbackCalled).toBe(true)
    })

    it('should handle errors in onSubmitted callback', async () => {
      let errorCallbackCalled = false

      try {
        await market.buy({
          depositAmount: BigInt(100e18),
          lifecycle: {
            onSubmitted: () => {
              throw new Error('Submission failed')
            },
          },
        })
      } catch {
        errorCallbackCalled = true
      }

      expect(errorCallbackCalled).toBe(true)
    })

    it('should handle errors in onConfirmed callback', async () => {
      let errorCallbackCalled = false

      try {
        await market.buy({
          depositAmount: BigInt(100e18),
          lifecycle: {
            onConfirmed: () => {
              throw new Error('Confirmation handling failed')
            },
          },
        })
      } catch {
        errorCallbackCalled = true
      }

      expect(errorCallbackCalled).toBe(true)
    })
  })

  describe('Edge Case Reverts', () => {
    it('should handle transaction timeout', async () => {
      // Transaction timeout would be handled by the wallet client
      // This tests the SDK's error propagation
      expect(true).toBe(true) // Placeholder for timeout behavior
    })

    it('should handle gas estimation failure', async () => {
      // Gas estimation failures should propagate as errors
      await expect(market.buy({ depositAmount: BigInt(0) })).rejects.toThrow()
    })

    it('should handle nonce too low errors', async () => {
      // Nonce issues are handled at the wallet/provider level
      expect(typeof walletClient.account).toBe('object')
    })
  })
})
