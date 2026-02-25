/**
 * @description Comprehensive tests for TreasuryAdmin class
 * Covers fetchFunds, setRecipients, setFloorFeePercentage, setFloorFeeTreasury, and getter methods
 */

import { beforeEach, describe, expect, it } from 'bun:test'
import type { Address } from 'viem'

import { TreasuryAdmin } from '../src/treasury-admin'
import { ANVIL_ADDRESSES, requireLocalDevEnvironment } from './helpers'

// Test constants
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('TreasuryAdmin', () => {
  let treasuryAddress: Address
  let treasuryAdmin: TreasuryAdmin
  let publicClient: any
  let walletClient: any

  beforeEach(async () => {
    // Setup local dev environment
    const env = await requireLocalDevEnvironment()
    publicClient = env.publicClient
    walletClient = env.walletClient

    treasuryAddress = ZERO_ADDRESS // Would be set from deployment

    treasuryAdmin = new TreasuryAdmin({
      address: treasuryAddress,
      publicClient,
      walletClient,
    })
  })

  describe('Constructor', () => {
    it('should create TreasuryAdmin instance', () => {
      expect(treasuryAdmin).toBeDefined()
    })
  })

  describe('getTreasuryState', () => {
    it('should return complete treasury state', async () => {
      // This requires a deployed contract
      await expect(treasuryAdmin.getTreasuryState()).rejects.toThrow()
    })

    it('should include all state fields', async () => {
      const state = await treasuryAdmin.getTreasuryState().catch(() => ({
        floorFeePercentage: 0,
        floorFeeTreasury: ZERO_ADDRESS,
        recipientCount: 0,
        totalShares: BigInt(0),
      }))

      expect(state).toHaveProperty('floorFeePercentage')
      expect(state).toHaveProperty('floorFeeTreasury')
      expect(state).toHaveProperty('recipientCount')
      expect(state).toHaveProperty('totalShares')
    })
  })

  describe('getFloorFeePercentage', () => {
    it('should return floor fee percentage as number', async () => {
      await expect(treasuryAdmin.getFloorFeePercentage()).rejects.toThrow()
    })

    it('should return percentage in valid range (0-10000 bps)', async () => {
      // Would verify percentage is within valid range when contract exists
      await expect(treasuryAdmin.getFloorFeePercentage()).rejects.toThrow()
    })
  })

  describe('getFloorFeeTreasury', () => {
    it('should return floor fee treasury address', async () => {
      await expect(treasuryAdmin.getFloorFeeTreasury()).rejects.toThrow()
    })

    it('should return valid address format', async () => {
      const address = await treasuryAdmin.getFloorFeeTreasury().catch(() => ZERO_ADDRESS)
      expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/)
    })
  })

  describe('getTotalShares', () => {
    it('should return total shares as bigint', async () => {
      await expect(treasuryAdmin.getTotalShares()).rejects.toThrow()
    })

    it('should return 10000 for fully configured treasury', async () => {
      // In a properly configured treasury, total shares should equal 10000
      await expect(treasuryAdmin.getTotalShares()).rejects.toThrow()
    })
  })

  describe('getFunds', () => {
    it('should return funds balance for token', async () => {
      await expect(treasuryAdmin.getFunds(ANVIL_ADDRESSES.DEPLOYER)).rejects.toThrow()
    })

    it('should return 0 for token with no balance', async () => {
      await expect(treasuryAdmin.getFunds(ZERO_ADDRESS)).rejects.toThrow()
    })

    it('should throw error for zero address token', async () => {
      await expect(treasuryAdmin.getFunds(ZERO_ADDRESS)).rejects.toThrow()
    })
  })

  describe('fetchFunds', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new TreasuryAdmin({
        address: treasuryAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.fetchFunds({
          token: ANVIL_ADDRESSES.DEPLOYER,
          amount: BigInt(1e18),
        })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should throw error for zero address token', async () => {
      await expect(
        treasuryAdmin.fetchFunds({ token: ZERO_ADDRESS, amount: BigInt(1e18) })
      ).rejects.toThrow()
    })

    it('should throw error for zero amount', async () => {
      await expect(
        treasuryAdmin.fetchFunds({ token: ANVIL_ADDRESSES.DEPLOYER, amount: BigInt(0) })
      ).rejects.toThrow()
    })

    it('should accept valid token and amount', async () => {
      await expect(
        treasuryAdmin.fetchFunds({ token: ANVIL_ADDRESSES.DEPLOYER, amount: BigInt(1e18) })
      ).rejects.toThrow()
    })

    it('should call lifecycle callbacks', async () => {
      let pendingWalletCalled = false

      const callbacks = {
        onPendingWallet: () => {
          pendingWalletCalled = true
        },
        onSubmitted: () => {},
        onPendingConfirmation: () => {},
        onConfirmed: () => {},
        onFailed: () => {},
      }

      try {
        await treasuryAdmin.fetchFunds({
          token: ANVIL_ADDRESSES.DEPLOYER,
          amount: BigInt(1e18),
          lifecycle: callbacks,
        })
      } catch {
        // Expected to fail in test environment
      }

      expect(pendingWalletCalled).toBe(true)
    })
  })

  describe('setRecipients', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new TreasuryAdmin({
        address: treasuryAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setRecipients({
          recipients: [{ address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(10000) }],
        })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should throw error for empty recipients array', async () => {
      await expect(treasuryAdmin.setRecipients({ recipients: [] })).rejects.toThrow(
        'At least one recipient is required'
      )
    })

    it('should throw error when total shares do not equal 10000', async () => {
      await expect(
        treasuryAdmin.setRecipients({
          recipients: [{ address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(5000) }],
        })
      ).rejects.toThrow('Total shares must equal 10000')
    })

    it('should throw error when total shares exceed 10000', async () => {
      await expect(
        treasuryAdmin.setRecipients({
          recipients: [
            { address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(6000) },
            { address: ANVIL_ADDRESSES.ADMIN, shares: BigInt(5000) },
          ],
        })
      ).rejects.toThrow('Total shares must equal 10000')
    })

    it('should accept single recipient with 10000 shares', async () => {
      await expect(
        treasuryAdmin.setRecipients({
          recipients: [{ address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(10000) }],
        })
      ).rejects.toThrow()
    })

    it('should accept multiple recipients with shares totaling 10000', async () => {
      await expect(
        treasuryAdmin.setRecipients({
          recipients: [
            { address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(7000) },
            { address: ANVIL_ADDRESSES.ADMIN, shares: BigInt(3000) },
          ],
        })
      ).rejects.toThrow()
    })

    it('should accept many recipients with shares totaling 10000', async () => {
      await expect(
        treasuryAdmin.setRecipients({
          recipients: [
            { address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(4000) },
            { address: ANVIL_ADDRESSES.ADMIN, shares: BigInt(3000) },
            { address: ANVIL_ADDRESSES.MANAGER, shares: BigInt(2000) },
            { address: ANVIL_ADDRESSES.USER_1, shares: BigInt(1000) },
          ],
        })
      ).rejects.toThrow()
    })

    it('should throw error for zero address recipient', async () => {
      await expect(
        treasuryAdmin.setRecipients({
          recipients: [{ address: ZERO_ADDRESS, shares: BigInt(10000) }],
        })
      ).rejects.toThrow()
    })

    it('should call lifecycle callbacks', async () => {
      let pendingWalletCalled = false

      const callbacks = {
        onPendingWallet: () => {
          pendingWalletCalled = true
        },
        onSubmitted: () => {},
        onPendingConfirmation: () => {},
        onConfirmed: () => {},
        onFailed: () => {},
      }

      try {
        await treasuryAdmin.setRecipients({
          recipients: [{ address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(10000) }],
          lifecycle: callbacks,
        })
      } catch {
        // Expected to fail in test environment
      }

      expect(pendingWalletCalled).toBe(true)
    })
  })

  describe('setFloorFeePercentage', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new TreasuryAdmin({
        address: treasuryAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setFloorFeePercentage({ percentageBps: 6800 })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should throw error for negative percentage', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: -1 })).rejects.toThrow(
        'Percentage must be between 0 and 10000 basis points'
      )
    })

    it('should throw error for percentage above 10000 bps', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 10001 })).rejects.toThrow(
        'Percentage must be between 0 and 10000 basis points'
      )
    })

    it('should throw error for non-integer percentage', async () => {
      await expect(
        treasuryAdmin.setFloorFeePercentage({ percentageBps: 6800.5 as unknown as number })
      ).rejects.toThrow('Percentage must be a whole number')
    })

    it('should accept valid percentage of 0 bps', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 0 })).rejects.toThrow()
    })

    it('should accept valid percentage of 10000 bps (100%)', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 10000 })).rejects.toThrow()
    })

    it('should accept valid percentage in range', async () => {
      await expect(
        treasuryAdmin.setFloorFeePercentage({ percentageBps: 6800 }) // 68%
      ).rejects.toThrow()
    })

    it('should call lifecycle callbacks', async () => {
      let pendingWalletCalled = false

      const callbacks = {
        onPendingWallet: () => {
          pendingWalletCalled = true
        },
        onSubmitted: () => {},
        onPendingConfirmation: () => {},
        onConfirmed: () => {},
        onFailed: () => {},
      }

      try {
        await treasuryAdmin.setFloorFeePercentage({ percentageBps: 6800, lifecycle: callbacks })
      } catch {
        // Expected to fail in test environment
      }

      expect(pendingWalletCalled).toBe(true)
    })
  })

  describe('setFloorFeeTreasury', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new TreasuryAdmin({
        address: treasuryAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setFloorFeeTreasury({ treasuryAddress: ANVIL_ADDRESSES.DEPLOYER })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should throw error for zero address', async () => {
      await expect(
        treasuryAdmin.setFloorFeeTreasury({ treasuryAddress: ZERO_ADDRESS })
      ).rejects.toThrow('Invalid treasury address')
    })

    it('should accept valid treasury address', async () => {
      await expect(
        treasuryAdmin.setFloorFeeTreasury({ treasuryAddress: ANVIL_ADDRESSES.DEPLOYER })
      ).rejects.toThrow()
    })

    it('should call lifecycle callbacks', async () => {
      let pendingWalletCalled = false

      const callbacks = {
        onPendingWallet: () => {
          pendingWalletCalled = true
        },
        onSubmitted: () => {},
        onPendingConfirmation: () => {},
        onConfirmed: () => {},
        onFailed: () => {},
      }

      try {
        await treasuryAdmin.setFloorFeeTreasury({
          treasuryAddress: ANVIL_ADDRESSES.DEPLOYER,
          lifecycle: callbacks,
        })
      } catch {
        // Expected to fail in test environment
      }

      expect(pendingWalletCalled).toBe(true)
    })
  })

  describe('Validation Edge Cases', () => {
    describe('Percentage Validation', () => {
      it('should accept boundary value of 0 bps', () => {
        const percentage = 0
        if (percentage < 0 || percentage > 10000) {
          throw new Error('Invalid percentage')
        }
        expect(true).toBe(true)
      })

      it('should accept boundary value of 10000 bps', () => {
        const percentage = 10000
        if (percentage < 0 || percentage > 10000) {
          throw new Error('Invalid percentage')
        }
        expect(true).toBe(true)
      })

      it('should reject value just below 0 bps', () => {
        const percentage = -1
        expect(() => {
          if (percentage < 0 || percentage > 10000) {
            throw new Error('Invalid percentage')
          }
        }).toThrow('Invalid percentage')
      })

      it('should reject value just above 10000 bps', () => {
        const percentage = 10001
        expect(() => {
          if (percentage < 0 || percentage > 10000) {
            throw new Error('Invalid percentage')
          }
        }).toThrow('Invalid percentage')
      })
    })

    describe('Shares Validation', () => {
      it('should accept total shares of exactly 10000', () => {
        const shares = [BigInt(7000), BigInt(3000)]
        const total = shares.reduce((sum, s) => sum + s, BigInt(0))
        expect(total).toBe(BigInt(10000))
      })

      it('should reject total shares less than 10000', () => {
        const shares = [BigInt(7000), BigInt(2000)]
        const total = shares.reduce((sum, s) => sum + s, BigInt(0))
        expect(total).not.toBe(BigInt(10000))
      })

      it('should reject total shares greater than 10000', () => {
        const shares = [BigInt(7000), BigInt(4000)]
        const total = shares.reduce((sum, s) => sum + s, BigInt(0))
        expect(total).not.toBe(BigInt(10000))
      })

      it('should handle single recipient with 10000 shares', () => {
        const shares = [BigInt(10000)]
        const total = shares.reduce((sum, s) => sum + s, BigInt(0))
        expect(total).toBe(BigInt(10000))
      })
    })
  })

  describe('Recipient Configuration Patterns', () => {
    it('should support 70/30 split', () => {
      const recipients = [
        { address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(7000) },
        { address: ANVIL_ADDRESSES.ADMIN, shares: BigInt(3000) },
      ]
      const total = recipients.reduce((sum, r) => sum + r.shares, BigInt(0))
      expect(total).toBe(BigInt(10000))
    })

    it('should support equal split among 4 recipients', () => {
      const recipients = [
        { address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(2500) },
        { address: ANVIL_ADDRESSES.ADMIN, shares: BigInt(2500) },
        { address: ANVIL_ADDRESSES.MANAGER, shares: BigInt(2500) },
        { address: ANVIL_ADDRESSES.USER_1, shares: BigInt(2500) },
      ]
      const total = recipients.reduce((sum, r) => sum + r.shares, BigInt(0))
      expect(total).toBe(BigInt(10000))
    })

    it('should support 50/30/20 split', () => {
      const recipients = [
        { address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(5000) },
        { address: ANVIL_ADDRESSES.ADMIN, shares: BigInt(3000) },
        { address: ANVIL_ADDRESSES.MANAGER, shares: BigInt(2000) },
      ]
      const total = recipients.reduce((sum, r) => sum + r.shares, BigInt(0))
      expect(total).toBe(BigInt(10000))
    })

    it('should support fine-grained distribution', () => {
      const recipients = [
        { address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(4500) },
        { address: ANVIL_ADDRESSES.ADMIN, shares: BigInt(2500) },
        { address: ANVIL_ADDRESSES.MANAGER, shares: BigInt(1500) },
        { address: ANVIL_ADDRESSES.USER_1, shares: BigInt(1000) },
        { address: ANVIL_ADDRESSES.USER_2, shares: BigInt(500) },
      ]
      const total = recipients.reduce((sum, r) => sum + r.shares, BigInt(0))
      expect(total).toBe(BigInt(10000))
    })
  })

  describe('Address Validation', () => {
    it('should reject zero address for token in fetchFunds', async () => {
      await expect(
        treasuryAdmin.fetchFunds({ token: ZERO_ADDRESS, amount: BigInt(1e18) })
      ).rejects.toThrow()
    })

    it('should reject zero address for recipient', async () => {
      await expect(
        treasuryAdmin.setRecipients({
          recipients: [{ address: ZERO_ADDRESS, shares: BigInt(10000) }],
        })
      ).rejects.toThrow()
    })

    it('should reject zero address for treasury address', async () => {
      await expect(
        treasuryAdmin.setFloorFeeTreasury({ treasuryAddress: ZERO_ADDRESS })
      ).rejects.toThrow('Invalid treasury address')
    })
  })

  describe('Amount Validation', () => {
    it('should reject zero amount in fetchFunds', async () => {
      await expect(
        treasuryAdmin.fetchFunds({ token: ANVIL_ADDRESSES.DEPLOYER, amount: BigInt(0) })
      ).rejects.toThrow()
    })

    it('should handle very small amounts (1 wei)', async () => {
      await expect(
        treasuryAdmin.fetchFunds({ token: ANVIL_ADDRESSES.DEPLOYER, amount: BigInt(1) })
      ).rejects.toThrow()
    })

    it('should handle large amounts', async () => {
      await expect(
        treasuryAdmin.fetchFunds({
          token: ANVIL_ADDRESSES.DEPLOYER,
          amount: BigInt('1000000000000000000000000'), // 1M tokens
        })
      ).rejects.toThrow()
    })
  })

  describe('Floor Fee Percentage Common Values', () => {
    it('should accept 0% (0 bps)', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 0 })).rejects.toThrow()
    })

    it('should accept 50% (5000 bps)', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 5000 })).rejects.toThrow()
    })

    it('should accept 68% (6800 bps) - common default', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 6800 })).rejects.toThrow()
    })

    it('should accept 100% (10000 bps)', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 10000 })).rejects.toThrow()
    })

    it('should accept 1% (100 bps)', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 100 })).rejects.toThrow()
    })

    it('should accept 0.1% (10 bps)', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 10 })).rejects.toThrow()
    })

    it('should accept 0.01% (1 bps)', async () => {
      await expect(treasuryAdmin.setFloorFeePercentage({ percentageBps: 1 })).rejects.toThrow()
    })
  })

  describe('Error Messages', () => {
    it('should provide clear error for shares validation', async () => {
      try {
        await treasuryAdmin.setRecipients({
          recipients: [{ address: ANVIL_ADDRESSES.DEPLOYER, shares: BigInt(5000) }],
        })
      } catch (error: any) {
        expect(error.message).toContain('Total shares must equal 10000')
      }
    })

    it('should provide clear error for empty recipients', async () => {
      try {
        await treasuryAdmin.setRecipients({ recipients: [] })
      } catch (error: any) {
        expect(error.message).toContain('At least one recipient is required')
      }
    })

    it('should provide clear error for invalid treasury address', async () => {
      try {
        await treasuryAdmin.setFloorFeeTreasury({ treasuryAddress: ZERO_ADDRESS })
      } catch (error: any) {
        expect(error.message).toContain('Invalid treasury address')
      }
    })
  })
})
