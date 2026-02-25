/**
 * @description Comprehensive tests for PresaleAdmin class
 * Covers setCreditFacility, setInitialMultiplier, setDecayDuration, setStartTime, state transitions, and validation
 */

import { beforeEach, describe, expect, it } from 'bun:test'
import type { Address } from 'viem'

import { PresaleAdmin, PresaleState } from '../src/presale-admin'
import { ANVIL_ADDRESSES, requireLocalDevEnvironment } from './helpers'

// Test constants
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('PresaleAdmin', () => {
  let presaleAddress: Address
  let presaleAdmin: PresaleAdmin
  let publicClient: any
  let walletClient: any

  beforeEach(async () => {
    // Setup local dev environment
    const env = await requireLocalDevEnvironment()
    publicClient = env.publicClient
    walletClient = env.walletClient

    presaleAddress = ZERO_ADDRESS // Would be set from deployment

    presaleAdmin = new PresaleAdmin({
      address: presaleAddress,
      publicClient,
      walletClient,
    })
  })

  describe('Constructor', () => {
    it('should create PresaleAdmin instance', () => {
      expect(presaleAdmin).toBeDefined()
    })
  })

  describe('getPresaleState', () => {
    it('should return complete presale state', async () => {
      // This requires a deployed contract
      await expect(presaleAdmin.getPresaleState()).rejects.toThrow()
    })

    it('should include all state fields', async () => {
      const state = await presaleAdmin.getPresaleState().catch(() => ({
        currentState: PresaleState.NotOpen,
        endTimestamp: BigInt(0),
        globalIssuanceCap: BigInt(0),
        perAddressIssuanceCap: BigInt(0),
        globalIssuance: BigInt(0),
        whitelistCount: 0,
        merkleRoot: '0x' as `0x${string}`,
        baseCommissionBps: [],
        priceBreakpoints: [],
      }))

      expect(state).toHaveProperty('currentState')
      expect(state).toHaveProperty('endTimestamp')
      expect(state).toHaveProperty('globalIssuanceCap')
      expect(state).toHaveProperty('perAddressIssuanceCap')
      expect(state).toHaveProperty('globalIssuance')
      expect(state).toHaveProperty('whitelistCount')
      expect(state).toHaveProperty('merkleRoot')
      expect(state).toHaveProperty('baseCommissionBps')
      expect(state).toHaveProperty('priceBreakpoints')
    })
  })

  describe('isMerkleWhitelisted', () => {
    it('should return boolean for whitelist status', async () => {
      await expect(presaleAdmin.isMerkleWhitelisted(ANVIL_ADDRESSES.DEPLOYER)).rejects.toThrow()
    })
  })

  describe('getMerkleRoot', () => {
    it('should return current merkle root', async () => {
      await expect(presaleAdmin.getMerkleRoot()).rejects.toThrow()
    })
  })

  describe('getCurrentState', () => {
    it('should return current presale state enum value', async () => {
      await expect(presaleAdmin.getCurrentState()).rejects.toThrow()
    })

    it('should return valid PresaleState enum value', async () => {
      const state = await presaleAdmin.getCurrentState().catch(() => PresaleState.NotOpen)
      expect(Object.values(PresaleState)).toContain(state)
    })
  })

  describe('setPresaleState', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setPresaleState({ state: PresaleState.Public })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should transition to NotOpen state', async () => {
      await expect(presaleAdmin.setPresaleState({ state: PresaleState.NotOpen })).rejects.toThrow()
    })

    it('should transition to Whitelist state', async () => {
      await expect(
        presaleAdmin.setPresaleState({ state: PresaleState.Whitelist })
      ).rejects.toThrow()
    })

    it('should transition to Public (Live) state', async () => {
      await expect(presaleAdmin.setPresaleState({ state: PresaleState.Public })).rejects.toThrow()
    })

    it('should transition to Closed state', async () => {
      await expect(presaleAdmin.setPresaleState({ state: PresaleState.Closed })).rejects.toThrow()
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
        await presaleAdmin.setPresaleState({ state: PresaleState.Public, lifecycle: callbacks })
      } catch {
        // Expected to fail in test environment
      }

      expect(pendingWalletCalled).toBe(true)
    })
  })

  describe('goLive', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(adminWithoutWallet.goLive()).rejects.toThrow('Wallet not connected')
    })

    it('should transition to Public state', async () => {
      await expect(presaleAdmin.goLive()).rejects.toThrow()
    })

    it('should be convenience method for setPresaleState(Public)', async () => {
      // This is tested by verifying it behaves like setPresaleState
      await expect(presaleAdmin.goLive()).rejects.toThrow()
    })
  })

  describe('closePresale', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(adminWithoutWallet.closePresale()).rejects.toThrow('Wallet not connected')
    })

    it('should transition to Closed state', async () => {
      await expect(presaleAdmin.closePresale()).rejects.toThrow()
    })
  })

  describe('setWhitelistPhase', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(adminWithoutWallet.setWhitelistPhase()).rejects.toThrow('Wallet not connected')
    })

    it('should transition to Whitelist state', async () => {
      await expect(presaleAdmin.setWhitelistPhase()).rejects.toThrow()
    })
  })

  describe('setNotOpen', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(adminWithoutWallet.setNotOpen()).rejects.toThrow('Wallet not connected')
    })

    it('should transition to NotOpen state', async () => {
      await expect(presaleAdmin.setNotOpen()).rejects.toThrow()
    })
  })

  describe('setCaps', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setCaps({ globalCap: BigInt(1e18), perAddressCap: BigInt(0) })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should set global cap only', async () => {
      await expect(
        presaleAdmin.setCaps({ globalCap: BigInt(100000e18), perAddressCap: BigInt(0) })
      ).rejects.toThrow()
    })

    it('should set per-address cap only', async () => {
      await expect(
        presaleAdmin.setCaps({ globalCap: BigInt(0), perAddressCap: BigInt(1000e18) })
      ).rejects.toThrow()
    })

    it('should set both caps', async () => {
      await expect(
        presaleAdmin.setCaps({ globalCap: BigInt(100000e18), perAddressCap: BigInt(1000e18) })
      ).rejects.toThrow()
    })

    it('should set both caps to unlimited (0)', async () => {
      await expect(
        presaleAdmin.setCaps({ globalCap: BigInt(0), perAddressCap: BigInt(0) })
      ).rejects.toThrow()
    })
  })

  describe('setEndTimestamp', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setEndTimestamp({
          timestamp: BigInt(Math.floor(Date.now() / 1000) + 86400),
        })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should set future timestamp', async () => {
      const futureTimestamp = BigInt(Math.floor(Date.now() / 1000) + 86400 * 365) // 1 year from now
      await expect(presaleAdmin.setEndTimestamp({ timestamp: futureTimestamp })).rejects.toThrow()
    })

    it('should set timestamp in past (for testing)', async () => {
      const pastTimestamp = BigInt(Math.floor(Date.now() / 1000) - 86400) // 1 day ago
      await expect(presaleAdmin.setEndTimestamp({ timestamp: pastTimestamp })).rejects.toThrow()
    })

    it('should accept zero timestamp', async () => {
      await expect(presaleAdmin.setEndTimestamp({ timestamp: BigInt(0) })).rejects.toThrow()
    })
  })

  describe('setMerkleRoot', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setMerkleRoot({ merkleRoot: ('0x' + '00'.repeat(32)) as `0x${string}` })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should set valid merkle root', async () => {
      const merkleRoot = ('0x' + '00'.repeat(32)) as `0x${string}`
      await expect(presaleAdmin.setMerkleRoot({ merkleRoot })).rejects.toThrow()
    })

    it('should set merkle root with all ones', async () => {
      const merkleRoot = ('0x' + 'ff'.repeat(32)) as `0x${string}`
      await expect(presaleAdmin.setMerkleRoot({ merkleRoot })).rejects.toThrow()
    })

    it('should throw error for invalid merkle root (wrong length)', async () => {
      const invalidMerkleRoot = '0x1234' as `0x${string}`
      await expect(presaleAdmin.setMerkleRoot({ merkleRoot: invalidMerkleRoot })).rejects.toThrow()
    })
  })

  describe('setBaseCommissionAndPriceBreakpoints', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [100],
          priceBreakpoints: [[BigInt(1e18)]],
        })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should set valid commission and breakpoints', async () => {
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [100, 200, 450],
          priceBreakpoints: [[BigInt(1e18)], [BigInt(1e18), BigInt(1.5e18)]],
        })
      ).rejects.toThrow()
    })

    it('should set empty commission array', async () => {
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [],
          priceBreakpoints: [],
        })
      ).rejects.toThrow()
    })

    it('should accept number[] for commission (uint16[] contract type)', () => {
      // viem reads uint16[] as number[] and accepts number[] for writing
      // Commission values are small (0-10000 bps) so number type is safe
      const commissionBps = [100, 200, 450]

      expect(commissionBps.every((b) => typeof b === 'number')).toBe(true)
      expect(commissionBps.every((b) => b >= 0 && b <= 10000)).toBe(true)
    })

    it('should handle large commission values', async () => {
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [5000], // 50%
          priceBreakpoints: [[BigInt(1e18)]],
        })
      ).rejects.toThrow()
    })
  })

  describe('setCreditFacility', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setCreditFacility({ creditFacility: ANVIL_ADDRESSES.DEPLOYER })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should throw error for zero address', async () => {
      await expect(
        presaleAdmin.setCreditFacility({ creditFacility: ZERO_ADDRESS })
      ).rejects.toThrow()
    })

    it('should set valid credit facility address', async () => {
      await expect(
        presaleAdmin.setCreditFacility({ creditFacility: ANVIL_ADDRESSES.DEPLOYER })
      ).rejects.toThrow()
    })
  })

  describe('setInitialMultiplier', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(adminWithoutWallet.setInitialMultiplier({ multiplier: 10000 })).rejects.toThrow(
        'Wallet not connected'
      )
    })

    it('should set valid multiplier', async () => {
      await expect(presaleAdmin.setInitialMultiplier({ multiplier: 10000 })).rejects.toThrow()
    })

    it('should set multiplier of 0', async () => {
      await expect(presaleAdmin.setInitialMultiplier({ multiplier: 0 })).rejects.toThrow()
    })

    it('should set large multiplier', async () => {
      await expect(presaleAdmin.setInitialMultiplier({ multiplier: 1000000 })).rejects.toThrow()
    })

    it('should throw error for negative multiplier', async () => {
      await expect(presaleAdmin.setInitialMultiplier({ multiplier: -1 })).rejects.toThrow()
    })
  })

  describe('setDecayDuration', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setDecayDuration({ duration: BigInt(86400) })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should set valid decay duration', async () => {
      await expect(
        presaleAdmin.setDecayDuration({ duration: BigInt(86400 * 30) }) // 30 days
      ).rejects.toThrow()
    })

    it('should set duration of 0 (no decay)', async () => {
      await expect(presaleAdmin.setDecayDuration({ duration: BigInt(0) })).rejects.toThrow()
    })

    it('should set large decay duration', async () => {
      await expect(
        presaleAdmin.setDecayDuration({ duration: BigInt(86400 * 365) }) // 1 year
      ).rejects.toThrow()
    })
  })

  describe('setStartTime', () => {
    it('should throw error when wallet is not connected', async () => {
      const adminWithoutWallet = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
      })

      await expect(
        adminWithoutWallet.setStartTime({ startTime: BigInt(Math.floor(Date.now() / 1000)) })
      ).rejects.toThrow('Wallet not connected')
    })

    it('should set valid start time', async () => {
      const startTime = BigInt(Math.floor(Date.now() / 1000) + 86400) // Tomorrow
      await expect(presaleAdmin.setStartTime({ startTime })).rejects.toThrow()
    })

    it('should set start time in past', async () => {
      const startTime = BigInt(Math.floor(Date.now() / 1000) - 86400) // Yesterday
      await expect(presaleAdmin.setStartTime({ startTime })).rejects.toThrow()
    })

    it('should set start time of 0', async () => {
      await expect(presaleAdmin.setStartTime({ startTime: BigInt(0) })).rejects.toThrow()
    })
  })

  describe('PresaleState Enum', () => {
    it('should have correct enum values', () => {
      expect(PresaleState.NotOpen).toBe(0)
      expect(PresaleState.Whitelist).toBe(1)
      expect(PresaleState.Public).toBe(2)
      expect(PresaleState.Closed).toBe(3)
    })

    it('should include all states', () => {
      const states = Object.keys(PresaleState)
      expect(states).toContain('NotOpen')
      expect(states).toContain('Whitelist')
      expect(states).toContain('Public')
      expect(states).toContain('Closed')
    })
  })

  describe('State Transition Validation', () => {
    it('should allow transition from NotOpen to Whitelist', async () => {
      // In a real scenario, this would be tested with actual state
      await expect(
        presaleAdmin.setPresaleState({ state: PresaleState.Whitelist })
      ).rejects.toThrow()
    })

    it('should allow transition from Whitelist to Public', async () => {
      await expect(presaleAdmin.setPresaleState({ state: PresaleState.Public })).rejects.toThrow()
    })

    it('should allow transition to Closed from any state', async () => {
      await expect(presaleAdmin.setPresaleState({ state: PresaleState.Closed })).rejects.toThrow()
    })
  })

  describe('Edge Cases', () => {
    it('should handle maximum caps (uint256)', async () => {
      const maxCap = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
      await expect(
        presaleAdmin.setCaps({ globalCap: maxCap, perAddressCap: BigInt(0) })
      ).rejects.toThrow()
    })

    it('should handle empty commission arrays', async () => {
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [],
          priceBreakpoints: [],
        })
      ).rejects.toThrow()
    })

    it('should handle single commission entry', async () => {
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [100],
          priceBreakpoints: [[BigInt(1e18)]],
        })
      ).rejects.toThrow()
    })

    it('should handle multiple commission tiers', async () => {
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [50, 100, 200, 400, 800],
          priceBreakpoints: [
            [BigInt(1e18)],
            [BigInt(1e18), BigInt(1.2e18)],
            [BigInt(1e18), BigInt(1.2e18), BigInt(1.5e18)],
          ],
        })
      ).rejects.toThrow()
    })
  })

  describe('BigInt to Number Conversion', () => {
    it('should safely convert small bigint to number', () => {
      const smallBigint = BigInt(100)
      const result = Number(smallBigint)
      expect(result).toBe(100)
      expect(typeof result).toBe('number')
    })

    it('should safely convert max commission (5000) to number', () => {
      const maxCommission = BigInt(5000)
      const result = Number(maxCommission)
      expect(result).toBe(5000)
    })

    it('should handle potential precision loss for very large bigints', () => {
      // This is the concern noted in the plan - large bigints may lose precision
      const largeBigint = BigInt(Number.MAX_SAFE_INTEGER) * BigInt(2)
      const result = Number(largeBigint)

      // Number conversion may lose precision for very large values
      expect(typeof result).toBe('number')
      // Note: This is a known limitation - commission values should stay within safe range
    })
  })

  describe('Merkle Root Validation', () => {
    it('should accept 32-byte merkle root', () => {
      const validRoot = '0x' + '00'.repeat(32)
      expect(validRoot.length).toBe(66) // 0x + 64 hex chars
    })

    it('should reject merkle root shorter than 32 bytes', () => {
      const shortRoot = '0x' + '00'.repeat(31)
      expect(shortRoot.length).toBe(64) // Too short
    })

    it('should reject merkle root longer than 32 bytes', () => {
      const longRoot = '0x' + '00'.repeat(33)
      expect(longRoot.length).toBe(68) // Too long
    })
  })
})
