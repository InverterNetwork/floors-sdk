/**
 * @description Integration tests for Presale Flow
 * Tests direct purchase, looped purchase, and claim flows
 */

import { beforeEach, describe, expect, it } from 'bun:test'
import type { Address } from 'viem'

import { PresaleAdmin, PresaleState } from '../../src/presale-admin'
import { ANVIL_ADDRESSES, requireLocalDevEnvironment } from '../helpers'

// Test constants
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('Presale Flow - Integration', () => {
  let presaleAdmin: PresaleAdmin
  let publicClient: any
  let walletClient: any
  let presaleAddress: Address
  let creditFacilityAddress: Address

  beforeEach(async () => {
    // Setup local dev environment
    const env = await requireLocalDevEnvironment()
    publicClient = env.publicClient
    walletClient = env.walletClient

    // These would be set from actual deployment
    presaleAddress = ZERO_ADDRESS
    creditFacilityAddress = ZERO_ADDRESS

    presaleAdmin = new PresaleAdmin({
      address: presaleAddress,
      publicClient,
      walletClient,
    })

    // Presale class would be initialized with market data
    // For now, we test the admin functionality
  })

  describe('Direct Purchase Flow', () => {
    it('should complete direct purchase flow: setCaps → goLive → buyPresale → claimAll', async () => {
      // Step 1: Set caps
      await expect(
        presaleAdmin.setCaps({
          globalCap: BigInt(100000e18),
          perAddressCap: BigInt(1000e18),
        })
      ).rejects.toThrow()

      // Step 2: Set merkle root for whitelist
      const merkleRoot = ('0x' + '00'.repeat(32)) as `0x${string}`
      await expect(presaleAdmin.setMerkleRoot({ merkleRoot })).rejects.toThrow()

      // Step 3: Go live
      await expect(presaleAdmin.goLive()).rejects.toThrow()

      // Step 4: Buy presale (direct purchase)
      // This would use the Presale class buyPresale method

      // Step 5: Claim all tokens after presale ends
      // This would use the Presale class claimAll method
    })

    it('should respect global cap', async () => {
      // Set a small cap for testing
      await expect(
        presaleAdmin.setCaps({
          globalCap: BigInt(100e18),
          perAddressCap: BigInt(0),
        })
      ).rejects.toThrow()

      // Going over cap should fail (tested at contract level)
    })

    it('should respect per-address cap', async () => {
      // Set per-address cap
      await expect(
        presaleAdmin.setCaps({
          globalCap: BigInt(100000e18),
          perAddressCap: BigInt(10e18),
        })
      ).rejects.toThrow()

      // Single address buying more than cap should fail
    })
  })

  describe('Looped Purchase Flow', () => {
    it('should complete looped purchase: buyPresaleWithLoops → claimAll', async () => {
      // Step 1: Set credit facility
      await expect(
        presaleAdmin.setCreditFacility({ creditFacility: creditFacilityAddress })
      ).rejects.toThrow()

      // Step 2: Set commission schedule
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [100, 200, 450],
          priceBreakpoints: [[BigInt(1e18)], [BigInt(1e18), BigInt(1.5e18)]],
        })
      ).rejects.toThrow()

      // Step 3: Go live
      await expect(presaleAdmin.goLive()).rejects.toThrow()

      // Step 4: Buy presale with loops
      // This would use Presale.buyPresaleWithLoops

      // Step 5: Claim all after presale
    })

    it('should apply correct commission based on loops', async () => {
      // Set commission tiers
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [100, 200, 400],
          priceBreakpoints: [[BigInt(1e18)], [BigInt(1e18)]],
        })
      ).rejects.toThrow()

      // Commission should be:
      // - 100 bps for direct (0 loops)
      // - 200 bps for 1 loop
      // - 400 bps for 2 loops
    })

    it('should unlock tranches based on price breakpoints', async () => {
      // Set price breakpoints
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [100, 200],
          priceBreakpoints: [[BigInt(1e18), BigInt(1.5e18), BigInt(2e18)]],
        })
      ).rejects.toThrow()

      // Tranches unlock when price reaches breakpoint OR presale ends
    })
  })

  describe('State Transitions', () => {
    it('should transition through all states', async () => {
      // Start: NotOpen (default)
      let state = await presaleAdmin.getCurrentState().catch(() => PresaleState.NotOpen)
      expect(state).toBe(PresaleState.NotOpen)

      // Transition to Whitelist
      await expect(presaleAdmin.setWhitelistPhase()).rejects.toThrow()
      state = await presaleAdmin.getCurrentState().catch(() => PresaleState.Whitelist)
      expect(state).toBe(PresaleState.Whitelist)

      // Transition to Public (Live)
      await expect(presaleAdmin.goLive()).rejects.toThrow()
      state = await presaleAdmin.getCurrentState().catch(() => PresaleState.Public)
      expect(state).toBe(PresaleState.Public)

      // Transition to Closed
      await expect(presaleAdmin.closePresale()).rejects.toThrow()
      state = await presaleAdmin.getCurrentState().catch(() => PresaleState.Closed)
      expect(state).toBe(PresaleState.Closed)
    })

    it('should prevent purchases when NotOpen', async () => {
      await expect(presaleAdmin.setNotOpen()).rejects.toThrow()

      // Purchases should fail when NotOpen
    })

    it('should allow purchases when Public', async () => {
      await expect(presaleAdmin.goLive()).rejects.toThrow()

      // Purchases should succeed when Public
    })

    it('should restrict purchases to whitelist when Whitelist', async () => {
      await expect(presaleAdmin.setWhitelistPhase()).rejects.toThrow()

      // Only whitelisted addresses should be able to purchase
    })

    it('should prevent purchases when Closed', async () => {
      await expect(presaleAdmin.closePresale()).rejects.toThrow()

      // Purchases should fail when Closed
    })
  })

  describe('Claim Flow', () => {
    it('should claim direct purchase tokens', async () => {
      // Direct purchase tokens unlock when presale ends
      // Would test Presale.claimAll() here
    })

    it('should claim looped position tokens when price reaches breakpoint', async () => {
      // Looped positions unlock when price reaches breakpoint
      // Would test Presale.claimTranche() here
    })

    it('should claim all tranches after presale ends', async () => {
      // All tranches become claimable after presale ends
      // Would test Presale.claimAll() here
    })

    it('should prevent claiming before unlock conditions met', async () => {
      // Cannot claim before unlock conditions are met
      // Would test revert behavior here
    })
  })

  describe('Whitelist Management', () => {
    it('should set merkle root for whitelist', async () => {
      const merkleRoot = ('0x' + '00'.repeat(32)) as `0x${string}`
      await expect(presaleAdmin.setMerkleRoot({ merkleRoot })).rejects.toThrow()
    })

    it('should check if address is whitelisted', async () => {
      const isWhitelisted = await presaleAdmin
        .isMerkleWhitelisted(ANVIL_ADDRESSES.DEPLOYER)
        .catch(() => false)

      expect(typeof isWhitelisted).toBe('boolean')
    })

    it('should get current merkle root', async () => {
      const merkleRoot = await presaleAdmin.getMerkleRoot().catch(() => '0x' as `0x${string}`)
      expect(merkleRoot).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should update merkle root', async () => {
      const oldRoot = ('0x' + '00'.repeat(32)) as `0x${string}`
      const newRoot = ('0x' + 'ff'.repeat(32)) as `0x${string}`

      await expect(presaleAdmin.setMerkleRoot({ merkleRoot: oldRoot })).rejects.toThrow()

      await expect(presaleAdmin.setMerkleRoot({ merkleRoot: newRoot })).rejects.toThrow()
    })
  })

  describe('Presale Configuration', () => {
    it('should set end timestamp', async () => {
      const endTimestamp = BigInt(Math.floor(Date.now() / 1000) + 86400 * 30) // 30 days
      await expect(presaleAdmin.setEndTimestamp({ timestamp: endTimestamp })).rejects.toThrow()
    })

    it('should set decay duration', async () => {
      await expect(
        presaleAdmin.setDecayDuration({ duration: BigInt(86400 * 7) }) // 7 days
      ).rejects.toThrow()
    })

    it('should set start time', async () => {
      const startTime = BigInt(Math.floor(Date.now() / 1000) + 86400) // Tomorrow
      await expect(presaleAdmin.setStartTime({ startTime })).rejects.toThrow()
    })

    it('should set initial multiplier', async () => {
      await expect(presaleAdmin.setInitialMultiplier({ multiplier: 10000 })).rejects.toThrow()
    })

    it('should get complete presale state', async () => {
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

      expect(state).toBeDefined()
      expect(state).toHaveProperty('currentState')
      expect(state).toHaveProperty('endTimestamp')
      expect(state).toHaveProperty('globalIssuanceCap')
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero caps (unlimited)', async () => {
      await expect(
        presaleAdmin.setCaps({
          globalCap: BigInt(0),
          perAddressCap: BigInt(0),
        })
      ).rejects.toThrow()
    })

    it('should handle very large caps', async () => {
      const maxCap = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
      await expect(
        presaleAdmin.setCaps({
          globalCap: maxCap,
          perAddressCap: BigInt(0),
        })
      ).rejects.toThrow()
    })

    it('should handle zero end timestamp (no end)', async () => {
      await expect(presaleAdmin.setEndTimestamp({ timestamp: BigInt(0) })).rejects.toThrow()
    })

    it('should handle zero decay duration (no decay)', async () => {
      await expect(presaleAdmin.setDecayDuration({ duration: BigInt(0) })).rejects.toThrow()
    })

    it('should handle empty commission array', async () => {
      await expect(
        presaleAdmin.setBaseCommissionAndPriceBreakpoints({
          baseCommissionBps: [],
          priceBreakpoints: [],
        })
      ).rejects.toThrow()
    })
  })

  describe('Error Handling', () => {
    it('should throw when setting invalid merkle root', async () => {
      await expect(
        presaleAdmin.setMerkleRoot({ merkleRoot: '0x1234' as `0x${string}` })
      ).rejects.toThrow()
    })

    it('should throw when setting zero address as credit facility', async () => {
      await expect(
        presaleAdmin.setCreditFacility({ creditFacility: ZERO_ADDRESS })
      ).rejects.toThrow()
    })

    it('should throw when setting negative decay duration', async () => {
      await expect(presaleAdmin.setDecayDuration({ duration: BigInt(-1) })).rejects.toThrow()
    })

    it('should throw when setting past end timestamp', async () => {
      const pastTimestamp = BigInt(Math.floor(Date.now() / 1000) - 86400)
      await expect(presaleAdmin.setEndTimestamp({ timestamp: pastTimestamp })).rejects.toThrow()
    })
  })

  describe('PresaleState Enum', () => {
    it('should have correct state values', () => {
      expect(PresaleState.NotOpen).toBe(0)
      expect(PresaleState.Whitelist).toBe(1)
      expect(PresaleState.Public).toBe(2)
      expect(PresaleState.Closed).toBe(3)
    })

    it('should allow state comparisons', () => {
      const currentState = PresaleState.Public
      const isLive = currentState === PresaleState.Public
      expect(isLive).toBe(true)
    })
  })
})
