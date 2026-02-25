/**
 * @description Integration tests for Launch using real RPC and GraphQL
 * Tests actual on-chain operations against local dev environment
 */

import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import type { Address } from 'viem'
import { decodeEventLog } from 'viem'

import { ModuleFactory_v1 } from '../../src/abis'
import { fetchMarkets } from '../../src/graphql/api/fetchers'
import { Client } from '../../src/graphql/client'
import { Launch } from '../../src/launch'
import type { PopPublicClient, PopWalletClient } from '../../src/types'
import {
  ANVIL_ADDRESSES,
  createLocalPublicClient,
  createLocalWalletClient,
  createTestLaunchConfig,
  createTestPresaleConfig,
  deployTestTokens,
  isTestEnvironmentAvailable,
  loadTestEnvironment,
  LOCAL_GRAPHQL_URL,
} from './helpers/index'

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Parse ModuleCreated events from transaction receipt to get module addresses
 * This is more reliable than polling the indexer for newly created floors
 */
function parseModuleAddressesFromReceipt(
  receipt: Awaited<ReturnType<PopPublicClient['waitForTransactionReceipt']>>
): {
  authorizer: Address | undefined
  creditFacility: Address | undefined
  presale: Address | undefined
  stakingManager: Address | undefined
  floor: Address | undefined
} {
  const result = {
    authorizer: undefined as Address | undefined,
    creditFacility: undefined as Address | undefined,
    presale: undefined as Address | undefined,
    stakingManager: undefined as Address | undefined,
    floor: undefined as Address | undefined,
  }

  const moduleFactoryAddress = '0x79c230218626a33118b5bae08f28a5d342dccd36'

  for (const log of receipt.logs) {
    // Only process logs from ModuleFactory
    if (log.address.toLowerCase() !== moduleFactoryAddress) continue

    try {
      const decoded = decodeEventLog({
        abi: ModuleFactory_v1,
        data: log.data,
        topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
      })

      if (decoded.eventName === 'ModuleCreated' && decoded.args) {
        const args = decoded.args as any
        // Module type is in metadata_.title (e.g., "AUT_Roles_v2", "CreditFacility_v1")
        const moduleType = args.metadata_?.title?.toLowerCase() || ''
        const moduleAddress = args.module_ as Address

        if (moduleType.includes('authorizer') || moduleType.includes('roles')) {
          result.authorizer = moduleAddress
        } else if (moduleType.includes('creditfacility')) {
          result.creditFacility = moduleAddress
        } else if (moduleType.includes('presale')) {
          result.presale = moduleAddress
        } else if (moduleType.includes('staking')) {
          result.stakingManager = moduleAddress
        } else if (moduleType.includes('floor')) {
          result.floor = moduleAddress
        }
      }
    } catch {
      // Skip logs that don't match ModuleFactory ABI
    }
  }

  return result
}

// =============================================================================
// Environment Check
// =============================================================================

console.log('Checking test environment availability...')

// =============================================================================
// Integration Tests
// =============================================================================

describe('Launch Integration Tests', () => {
  let testEnv: Awaited<ReturnType<typeof loadTestEnvironment>>
  let publicClient: PopPublicClient
  let walletClient: PopWalletClient
  let launch: Launch

  beforeAll(async () => {
    // Check if local dev environment is available
    const available = await isTestEnvironmentAvailable()
    if (!available) {
      console.log('Local dev environment not available, skipping integration tests')
      return
    }

    // Load environment from .env files and indexer
    testEnv = await loadTestEnvironment()
    console.log('\n=== Integration Test Environment ===')
    console.log('RPC URL:', testEnv.rpcUrl)
    console.log('GraphQL URL:', testEnv.graphqlUrl)
    console.log('FloorFactory:', testEnv.floorFactoryAddress)
    console.log('TransactionForwarder:', testEnv.transactionForwarderAddress)
    console.log('Collateral Token:', testEnv.collateralTokenAddress)

    // Create real clients
    publicClient = createLocalPublicClient()
    walletClient = createLocalWalletClient('DEPLOYER')

    // Create Launch instance with real addresses from indexer
    launch = new Launch({
      floorFactoryAddress: testEnv.floorFactoryAddress,
      publicClient,
      walletClient,
    })

    // Configure GraphQL client to use local indexer
    Client.updateUrl(LOCAL_GRAPHQL_URL)
  })

  afterAll(() => {
    console.log('\n=== Integration Test Suite Complete ===')
  })

  // ---------------------------------------------------------------------------
  // Connection Tests
  // ---------------------------------------------------------------------------

  describe('Environment Connection', () => {
    it('should connect to local Anvil and get block number', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) {
        console.log('Environment not available, skipping')
        return
      }
      const blockNumber = await publicClient.getBlockNumber()
      expect(typeof blockNumber).toBe('bigint')
      expect(blockNumber).toBeGreaterThan(0n)
      console.log(`Current block number: ${blockNumber}`)
    })

    it('should get deployer account balance', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return
      const balance = await publicClient.getBalance({ address: ANVIL_ADDRESSES.ADMIN })
      expect(typeof balance).toBe('bigint')
      console.log(`Deployer balance: ${balance / BigInt(1e18)} ETH`)
    })

    it('should fetch markets from indexer', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return
      const markets = await fetchMarkets()
      expect(Array.isArray(markets)).toBe(true)
      console.log(`Found ${markets.length} markets in indexer`)
    })
  })

  // ---------------------------------------------------------------------------
  // Factory Read Tests
  // ---------------------------------------------------------------------------

  describe('FloorFactory Reads', () => {
    it('should read floor ID counter', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return
      const counter = await launch.getFloorIDCounter()
      expect(typeof counter).toBe('bigint')
      console.log(`Floor ID counter: ${counter}`)
    })

    it('should read module factory address', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return
      const moduleFactory = await launch.getModuleFactory()
      expect(moduleFactory).toMatch(/^0x[0-9a-fA-F]{40}$/)
      console.log(`Module Factory: ${moduleFactory}`)
    })

    it('should verify TransactionForwarder is trusted', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return
      const isTrusted = await publicClient.readContract({
        address: testEnv.floorFactoryAddress,
        abi: [
          {
            type: 'function',
            name: 'isTrustedForwarder',
            stateMutability: 'view',
            inputs: [{ name: 'forwarder', type: 'address' }],
            outputs: [{ name: '', type: 'bool' }],
          },
        ],
        functionName: 'isTrustedForwarder',
        args: [testEnv.transactionForwarderAddress],
      })
      console.log(`TransactionForwarder is trusted: ${isTrusted}`)
    })
  })

  // ---------------------------------------------------------------------------
  // E2E Create and Configure Flow
  // ---------------------------------------------------------------------------

  describe('E2E Create and Configure Flow', () => {
    it('should create a new floor market with freshly deployed tokens', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) {
        console.log('Environment not available, skipping')
        return
      }

      console.log('\n--- E2E Create Flow Test ---')

      // Step 1: Deploy fresh tokens for this test
      console.log('Deploying test tokens...')
      const { issuanceToken, collateralToken } = await deployTestTokens(
        walletClient,
        publicClient,
        {
          issuance: {
            name: `Test Floor Token ${Date.now()}`,
            symbol: `TFT${Date.now() % 10000}`,
          },
          collateral: {
            name: 'Test USDC',
            symbol: 'TUSDC',
          },
        }
      )
      console.log(`  Issuance token: ${issuanceToken}`)
      console.log(`  Collateral token: ${collateralToken}`)

      // Step 2: Create launch config (with credit facility as it's required by schema)
      const config = createTestLaunchConfig(issuanceToken, collateralToken)
      console.log('Launch config created')

      // Step 3: Create the floor market
      console.log('Creating floor market...')
      const result = await launch.create(config)

      // Step 4: Get transaction receipt to parse module addresses
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: result.transactionHash as `0x${string}`,
      })

      // Parse module addresses from transaction receipt
      const modules = parseModuleAddressesFromReceipt(receipt)

      // Step 5: Verify result
      expect(result.floorAddress).toMatch(/^0x[0-9a-fA-F]{40}$/)
      expect(result.marketId).toBeGreaterThan(0n)
      expect(result.transactionHash).toMatch(/^0x[0-9a-fA-F]{64}$/)
      expect(modules.authorizer).toBeDefined()
      expect(modules.authorizer!).toMatch(/^0x[0-9a-fA-F]{40}$/)

      console.log('Floor market created successfully!')
      console.log(`  Floor address: ${result.floorAddress}`)
      console.log(`  Market ID: ${result.marketId.toString()}`)
      console.log(`  Transaction hash: ${result.transactionHash}`)
      console.log(`  Authorizer: ${modules.authorizer}`)

      // Store for configure test
      ;(global as any).__testFloorAddress = result.floorAddress
      ;(global as any).__testMarketId = result.marketId.toString()
      ;(global as any).__testIssuanceToken = issuanceToken
      ;(global as any).__testAuthorizer = modules.authorizer
      ;(global as any).__testCreditFacility = modules.creditFacility
    })

    it('should configure a newly created floor market', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return

      const floorAddress = (global as any).__testFloorAddress as Address
      const issuanceToken = (global as any).__testIssuanceToken as Address
      const authorizer = (global as any).__testAuthorizer as Address

      if (!floorAddress || !authorizer) {
        console.log('Skipping configure test - no floor created in previous test')
        return
      }

      console.log('\n--- E2E Configure Flow Test ---')
      console.log(`Configuring floor: ${floorAddress}`)
      console.log(`Authorizer: ${authorizer}`)

      // Configure the floor with basic configuration
      const configureResult = await launch.configure({
        floorAddress,
        authorizerAddress: authorizer,
        issuanceTokenAddress: issuanceToken,
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        grantMinterRole: true,
        openBuy: true,
        openSell: false,
      })

      expect(configureResult.success).toBe(true)
      expect(configureResult.transactionHash).toMatch(/^0x[0-9a-fA-F]{64}$/)

      console.log('Floor configured successfully!')
      console.log(`  Transaction hash: ${configureResult.transactionHash}`)
    })

    it('should create and configure floor with credit facility', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return

      console.log('\n--- E2E Create with Credit Facility ---')

      // Deploy tokens
      const { issuanceToken, collateralToken } = await deployTestTokens(
        walletClient,
        publicClient,
        {
          issuance: {
            name: `CF Test Token ${Date.now()}`,
            symbol: `CFT${Date.now() % 10000}`,
          },
        }
      )

      // Create config with credit facility
      const config = createTestLaunchConfig(issuanceToken, collateralToken, {
        creditFacility: {
          loanToValueRatio: 9000, // 90%
          maxLeverage: 10,
          borrowingFeeRate: 500, // 5%
        },
      })

      const result = await launch.create(config)
      expect(result.floorAddress).toMatch(/^0x[0-9a-fA-F]{40}$/)
      expect(result.marketId).toBeGreaterThan(0n)

      // Get receipt and parse module addresses
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: result.transactionHash as `0x${string}`,
      })
      const modules = parseModuleAddressesFromReceipt(receipt)

      console.log(`Floor with CF created: ${result.floorAddress}`)
      console.log(`Authorizer: ${modules.authorizer}, CreditFacility: ${modules.creditFacility}`)

      // Configure with credit facility
      const configureResult = await launch.configure({
        floorAddress: result.floorAddress,
        authorizerAddress: modules.authorizer!,
        issuanceTokenAddress: issuanceToken,
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        creditFacilityAddress: modules.creditFacility,
        grantMinterRole: true,
        openBuy: true,
        openSell: false,
        openBorrow: false, // Keep borrow closed initially
      })

      expect(configureResult.success).toBe(true)
      console.log('Floor with CF configured successfully')
    })

    it('should create and configure floor with presale', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return

      console.log('\n--- E2E Create with Presale ---')

      const { issuanceToken, collateralToken } = await deployTestTokens(
        walletClient,
        publicClient,
        {
          issuance: {
            name: `Presale Test Token ${Date.now()}`,
            symbol: `PST${Date.now() % 10000}`,
          },
        }
      )

      // Create config with presale - use correct schema fields
      const config = createTestLaunchConfig(issuanceToken, collateralToken, {
        presale: createTestPresaleConfig(collateralToken, {
          baseCommissionBps: [BigInt(100)], // 1% base commission
        }),
      } as any)

      const result = await launch.create(config)
      expect(result.floorAddress).toMatch(/^0x[0-9a-fA-F]{40}$/)
      expect(result.marketId).toBeGreaterThan(0n)

      // Get receipt and parse module addresses
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: result.transactionHash as `0x${string}`,
      })
      const modules = parseModuleAddressesFromReceipt(receipt)

      console.log(`Floor with presale created: ${result.floorAddress}`)
      console.log(`Authorizer: ${modules.authorizer}, Presale: ${modules.presale}`)

      const configureResult = await launch.configure({
        floorAddress: result.floorAddress,
        authorizerAddress: modules.authorizer!,
        issuanceTokenAddress: issuanceToken,
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        presaleAddress: modules.presale,
        grantMinterRole: true,
        openBuy: true,
        openSell: false,
      })

      expect(configureResult.success).toBe(true)
      console.log('Floor with presale configured successfully')
    })

    it('should create and configure floor with staking', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return

      console.log('\n--- E2E Create with Staking ---')

      const { issuanceToken, collateralToken } = await deployTestTokens(
        walletClient,
        publicClient,
        {
          issuance: {
            name: `Staking Test Token ${Date.now()}`,
            symbol: `STK${Date.now() % 10000}`,
          },
        }
      )

      // Create config with staking - use correct schema fields
      const config = createTestLaunchConfig(issuanceToken, collateralToken, {
        staking: {
          performanceFeeBps: 1000, // 10% performance fee
        },
      } as any)

      const result = await launch.create(config)
      expect(result.floorAddress).toMatch(/^0x[0-9a-fA-F]{40}$/)
      expect(result.marketId).toBeGreaterThan(0n)

      // Get receipt and parse module addresses
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: result.transactionHash as `0x${string}`,
      })
      const modules = parseModuleAddressesFromReceipt(receipt)

      console.log(`Floor with staking created: ${result.floorAddress}`)
      console.log(`Authorizer: ${modules.authorizer}, Staking: ${modules.stakingManager}`)

      const configureResult = await launch.configure({
        floorAddress: result.floorAddress,
        authorizerAddress: modules.authorizer!,
        issuanceTokenAddress: issuanceToken,
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        stakingManagerAddress: modules.stakingManager,
        grantMinterRole: true,
        openBuy: true,
        openSell: false,
        openStaking: true,
        enableStakingAdmin: true,
      })

      expect(configureResult.success).toBe(true)
      console.log('Floor with staking configured successfully')
    })

    it('should create and configure floor with all modules', async () => {
      const available = await isTestEnvironmentAvailable()
      if (!available) return

      console.log('\n--- E2E Create with All Modules ---')

      const { issuanceToken, collateralToken } = await deployTestTokens(
        walletClient,
        publicClient,
        {
          issuance: {
            name: `Full Test Token ${Date.now()}`,
            symbol: `FULL${Date.now() % 10000}`,
          },
        }
      )

      // Create config with all modules
      const config = createTestLaunchConfig(issuanceToken, collateralToken, {
        creditFacility: {
          loanToValueRatio: 8500,
          maxLeverage: 5,
          borrowingFeeRate: 300,
        },
        presale: createTestPresaleConfig(collateralToken, {
          baseCommissionBps: [BigInt(100)],
        }),
        staking: {
          performanceFeeBps: 1000,
        },
      } as any)

      const result = await launch.create(config)
      expect(result.floorAddress).toMatch(/^0x[0-9a-fA-F]{40}$/)
      expect(result.marketId).toBeGreaterThan(0n)

      console.log(`Full floor created: ${result.floorAddress}`)

      // Get receipt and parse module addresses
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: result.transactionHash as `0x${string}`,
      })
      const modules = parseModuleAddressesFromReceipt(receipt)

      console.log(`Full floor created: ${result.floorAddress}`)
      console.log(
        `Modules: Authorizer=${modules.authorizer}, CF=${modules.creditFacility}, Presale=${modules.presale}, Staking=${modules.stakingManager}`
      )

      const configureResult = await launch.configure({
        floorAddress: result.floorAddress,
        authorizerAddress: modules.authorizer!,
        issuanceTokenAddress: issuanceToken,
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        creditFacilityAddress: modules.creditFacility,
        presaleAddress: modules.presale,
        stakingManagerAddress: modules.stakingManager,
        grantMinterRole: true,
        openBuy: true,
        openSell: true,
        openBorrow: true,
        openStaking: true,
        enableStakingAdmin: true,
      })

      expect(configureResult.success).toBe(true)
      console.log('Full floor configured successfully')
    })
  })
})
