/**
 * @description Edge case tests for Launch.configure
 * Tests boundary values, invalid inputs, and error handling
 */

import { describe, expect, it } from 'bun:test'

import { Launch } from '../../src/launch'
import { MOCK_ADDRESSES } from './configs'

const ZERO_ROLE = `0x${'0'.repeat(64)}` as `0x${string}`

function makeHash(index: number): `0x${string}` {
  return `0x${index.toString(16).padStart(64, '0')}` as `0x${string}`
}

// =============================================================================
// Edge Case Tests
// =============================================================================

describe('Launch.configure - Edge Cases', () => {
  const baseParams = {
    floorAddress: MOCK_ADDRESSES.floor,
    authorizerAddress: MOCK_ADDRESSES.authorizer,
    issuanceTokenAddress: MOCK_ADDRESSES.issuanceToken,
    transactionForwarderAddress: MOCK_ADDRESSES.transactionForwarder,
    grantMinterRole: true,
    openBuy: true,
    openSell: false,
  }

  // ---------------------------------------------------------------------------
  // Forwarder Trust Edge Cases
  // ---------------------------------------------------------------------------
  describe('Forwarder Trust Scenarios', () => {
    it('handles partial forwarder trust (some contracts trust, some dont)', async () => {
      const trustedContracts = new Set([
        MOCK_ADDRESSES.floor.toLowerCase(),
        MOCK_ADDRESSES.authorizer.toLowerCase(),
      ])

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
          if (functionName === 'isTrustedForwarder') {
            return trustedContracts.has(address.toLowerCase())
          }
          throw new Error(`Unexpected readContract function: ${functionName}`)
        },
        waitForTransactionReceipt: async ({ hash }: { hash: `0x${string}` }) => ({
          transactionHash: hash,
          status: 'success',
          logs: [],
        }),
      } as any

      let directCalls: `0x${string}`[] = []
      const walletClient = {
        account: { address: MOCK_ADDRESSES.admin },
        writeContract: async () => makeHash(1),
        sendTransaction: async ({ to }: { to: `0x${string}` }) => {
          directCalls.push(to)
          return makeHash(directCalls.length)
        },
      } as any

      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        ...baseParams,
        creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      })

      // Should fall back to direct calls since not all contracts trust forwarder
      expect(result.success).toBe(true)
      expect(directCalls.length).toBeGreaterThan(0)
    })

    it('handles no contracts trusting forwarder', async () => {
      const publicClient = {
        readContract: async ({ functionName }: { functionName: string }) => {
          if (functionName === 'getAdminRole') return ZERO_ROLE
          if (functionName === 'getLastAssignedRoleId') return 1n
          if (functionName === 'isTrustedForwarder') return false
          throw new Error(`Unexpected readContract function: ${functionName}`)
        },
        waitForTransactionReceipt: async ({ hash }: { hash: `0x${string}` }) => ({
          transactionHash: hash,
          status: 'success',
          logs: [],
        }),
      } as any

      let directCallCount = 0
      const walletClient = {
        account: { address: MOCK_ADDRESSES.admin },
        writeContract: async () => makeHash(1),
        sendTransaction: async () => {
          directCallCount++
          return makeHash(directCallCount)
        },
      } as any

      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure(baseParams)

      expect(result.success).toBe(true)
      expect(directCallCount).toBeGreaterThan(0)
    })
  })

  // ---------------------------------------------------------------------------
  // Transaction Reversion Edge Cases
  // ---------------------------------------------------------------------------
  describe('Transaction Reversion Scenarios', () => {
    it('handles multicall reversion with proper error message', async () => {
      const publicClient = {
        readContract: async ({ functionName }: { functionName: string }) => {
          if (functionName === 'getAdminRole') return ZERO_ROLE
          if (functionName === 'getLastAssignedRoleId') return 1n
          if (functionName === 'isTrustedForwarder') return true
          throw new Error(`Unexpected readContract function: ${functionName}`)
        },
        waitForTransactionReceipt: async ({ hash }: { hash: `0x${string}` }) => ({
          transactionHash: hash,
          status: 'reverted',
          logs: [],
        }),
      } as any

      const walletClient = {
        account: { address: MOCK_ADDRESSES.admin },
        writeContract: async () => makeHash(1),
      } as any

      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      await expect(launch.configure(baseParams)).rejects.toThrow('configure transaction reverted')
    })

    it('handles direct call reversion at specific index', async () => {
      let callIndex = 0
      const revertIndex = 2 // Fail on third call

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
          if (functionName === 'isTrustedForwarder') {
            return address !== MOCK_ADDRESSES.issuanceToken // Force direct calls
          }
          throw new Error(`Unexpected readContract function: ${functionName}`)
        },
        waitForTransactionReceipt: async ({ hash }: { hash: `0x${string}` }) => {
          callIndex++
          return {
            transactionHash: hash,
            status: callIndex === revertIndex ? 'reverted' : 'success',
            logs: [],
          }
        },
      } as any

      const walletClient = {
        account: { address: MOCK_ADDRESSES.admin },
        sendTransaction: async () => makeHash(callIndex + 1),
      } as any

      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      await expect(launch.configure(baseParams)).rejects.toThrow('configure direct call reverted')
    })
  })

  // ---------------------------------------------------------------------------
  // Role Creation Edge Cases
  // ---------------------------------------------------------------------------
  describe('Role Creation Scenarios', () => {
    it('handles multiple modules creating sequential role IDs', async () => {
      const { publicClient, walletClient } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        ...baseParams,
        creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
        presaleAddress: MOCK_ADDRESSES.presale,
        stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
        openStaking: true,
        enableStakingAdmin: true,
      })

      expect(result.success).toBe(true)
    })

    it('handles empty strategy array (different from undefined)', async () => {
      const { publicClient, walletClient } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        ...baseParams,
        stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
        strategyAddresses: [], // Empty array, not undefined
        openStaking: true,
        enableStakingAdmin: true,
      })

      expect(result.success).toBe(true)
    })
  })

  // ---------------------------------------------------------------------------
  // Permission Edge Cases
  // ---------------------------------------------------------------------------
  describe('Permission Scenarios', () => {
    it('handles toggling openBuy after initial false', async () => {
      const { publicClient: pc1, walletClient: wc1 } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient: pc1,
        walletClient: wc1,
      })

      // First configure without openBuy
      const result1 = await launch.configure({
        ...baseParams,
        openBuy: false,
      })
      expect(result1.success).toBe(true)

      // Second configure with openBuy (simulating follow-up call)
      const { publicClient: pc2, walletClient: wc2 } = createMockClientsWithCallCapture()
      const launch2 = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient: pc2,
        walletClient: wc2,
      })

      const result2 = await launch2.configure({
        ...baseParams,
        openBuy: true,
      })
      expect(result2.success).toBe(true)
    })

    it('handles openBorrow without credit facility (should be ignored)', async () => {
      const { publicClient, walletClient } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        ...baseParams,
        openBorrow: true, // Should be ignored without creditFacilityAddress
      })

      expect(result.success).toBe(true)
    })

    it('handles openStaking without staking manager (should be ignored)', async () => {
      const { publicClient, walletClient } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        ...baseParams,
        openStaking: true, // Should be ignored without stakingManagerAddress
      })

      expect(result.success).toBe(true)
    })

    it('handles enableStakingAdmin without openStaking', async () => {
      const { publicClient, walletClient } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        ...baseParams,
        stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
        openStaking: false,
        enableStakingAdmin: true,
      })

      expect(result.success).toBe(true)
    })
  })

  // ---------------------------------------------------------------------------
  // Address Validation Edge Cases
  // ---------------------------------------------------------------------------
  describe('Address Validation Scenarios', () => {
    it('handles same address for multiple roles', async () => {
      // Using same address for credit facility and presale
      const sameAddress = MOCK_ADDRESSES.creditFacility

      const { publicClient, walletClient } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        ...baseParams,
        creditFacilityAddress: sameAddress,
        presaleAddress: sameAddress, // Same as credit facility
      })

      expect(result.success).toBe(true)
    })

    it('handles address that matches floor address', async () => {
      const { publicClient, walletClient } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      // This would be a misconfiguration but should not crash
      const result = await launch.configure({
        ...baseParams,
        creditFacilityAddress: MOCK_ADDRESSES.floor, // Same as floor
      })

      expect(result.success).toBe(true)
    })
  })
})

// =============================================================================
// Boundary Value Tests
// =============================================================================

describe('Launch.configure - Boundary Values', () => {
  // ---------------------------------------------------------------------------
  // Call Count Boundaries
  // ---------------------------------------------------------------------------
  describe('Call Count Boundaries', () => {
    it('handles zero calls (all disabled)', async () => {
      const { publicClient, walletClient } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        floorAddress: MOCK_ADDRESSES.floor,
        authorizerAddress: MOCK_ADDRESSES.authorizer,
        issuanceTokenAddress: MOCK_ADDRESSES.issuanceToken,
        transactionForwarderAddress: MOCK_ADDRESSES.transactionForwarder,
        grantMinterRole: false,
        openBuy: false,
        openSell: false,
      })

      expect(result.success).toBe(true)
    })

    it('handles maximum calls (all modules + all permissions)', async () => {
      const { publicClient, walletClient } = createMockClientsWithCallCapture()
      const launch = new Launch({
        floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
        publicClient,
        walletClient,
      })

      const result = await launch.configure({
        floorAddress: MOCK_ADDRESSES.floor,
        authorizerAddress: MOCK_ADDRESSES.authorizer,
        issuanceTokenAddress: MOCK_ADDRESSES.issuanceToken,
        transactionForwarderAddress: MOCK_ADDRESSES.transactionForwarder,
        grantMinterRole: true,
        openBuy: true,
        openSell: true,
        openBorrow: true,
        creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
        presaleAddress: MOCK_ADDRESSES.presale,
        stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
        strategyAddresses: [
          MOCK_ADDRESSES.strategy,
          '0x5858585858585858585858585858585858585859' as `0x${string}`,
          '0x585858585858585858585858585858585858585a' as `0x${string}`,
          '0x585858585858585858585858585858585858585b' as `0x${string}`,
        ],
        openStaking: true,
        enableStakingAdmin: true,
      })

      expect(result.success).toBe(true)
    })
  })
})

// =============================================================================
// Helper Functions
// =============================================================================

function createMockClientsWithCallCapture() {
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
      throw new Error(`Unexpected readContract function: ${functionName}`)
    },
    waitForTransactionReceipt: async ({ hash }: { hash: `0x${string}` }) => ({
      transactionHash: hash,
      status: 'success',
      logs: [],
    }),
  } as any

  let capturedCalls: any[] = []
  const walletClient = {
    account: { address: MOCK_ADDRESSES.admin },
    writeContract: async ({ args }: any) => {
      capturedCalls = args?.[0] || []
      return makeHash(101)
    },
    sendTransaction: async () => makeHash(1),
  } as any

  return {
    publicClient,
    walletClient,
    getCapturedCalls: () => capturedCalls,
  }
}
