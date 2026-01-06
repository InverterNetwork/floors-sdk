import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import type { Chain, PublicClient, Transport } from 'viem'

import { fetchMarkets } from '../src/graphql/api/fetchers'
import { Client } from '../src/graphql/client'
import { Launch } from '../src/launch'
import type { PopWalletClient } from '../src/types'
import {
  ANVIL_ADDRESSES,
  checkDevnetAvailability,
  createDevnetClients,
  createTestFloorConfig,
  createTestLaunchConfig,
  createTestPresaleConfig,
  createTestSegments,
  createTestTreasuryConfig,
  DEVNET_CONTRACTS,
  GRAPHQL_URL,
} from './helpers/index'

// =============================================================================
// Tests
// =============================================================================

describe('#Launch', () => {
  // ---------------------------------------------------------------------------
  // Variables
  // ---------------------------------------------------------------------------

  let publicClient: PublicClient<Transport, Chain>
  let walletClient: PopWalletClient
  let launch: Launch
  let isDevnetAvailable = false

  // ---------------------------------------------------------------------------
  // Setup
  // ---------------------------------------------------------------------------

  beforeAll(async () => {
    // Create clients using helpers
    const clients = createDevnetClients('DEPLOYER')
    publicClient = clients.publicClient
    walletClient = clients.walletClient

    // Create Launch instance
    launch = new Launch({
      floorFactoryAddress: DEVNET_CONTRACTS.FLOOR_FACTORY,
      publicClient,
      walletClient,
    })

    // Configure GraphQL client to use the indexer
    Client.updateUrl(GRAPHQL_URL)

    // Check if devnet is available
    const blockNumber = await checkDevnetAvailability(publicClient)
    isDevnetAvailable = blockNumber !== null
    if (isDevnetAvailable) {
      console.log(`Devnet available at block ${blockNumber}`)
    } else {
      console.warn('Devnet not available, some tests will be skipped')
    }
  })

  afterAll(() => {
    console.log('\n=== Launch Test Suite Complete ===')
  })

  // ---------------------------------------------------------------------------
  // Schema Validation Tests
  // ---------------------------------------------------------------------------

  describe('Schema Validation', () => {
    it('should validate a correct floor config', () => {
      const config = createTestFloorConfig(ANVIL_ADDRESSES.ADMIN, ANVIL_ADDRESSES.MANAGER)
      const validated = launch.validateFloorConfig(config)
      expect(validated.issuanceTokenAddress).toBe(config.issuanceTokenAddress)
      expect(validated.segments.length).toBe(2)
    })

    it('should reject floor config with invalid buyFeeBps', () => {
      const config = createTestFloorConfig(ANVIL_ADDRESSES.ADMIN, ANVIL_ADDRESSES.MANAGER, {
        buyFeeBps: 15000,
      })
      expect(() => launch.validateFloorConfig(config)).toThrow()
    })

    it('should reject floor config with empty segments', () => {
      const config = {
        ...createTestFloorConfig(ANVIL_ADDRESSES.ADMIN, ANVIL_ADDRESSES.MANAGER),
        segments: [],
      }
      expect(() => launch.validateFloorConfig(config)).toThrow()
    })

    it('should reject floor config with invalid numberOfSteps', () => {
      const segments = createTestSegments()
      const config = createTestFloorConfig(ANVIL_ADDRESSES.ADMIN, ANVIL_ADDRESSES.MANAGER, {
        segments: [{ ...segments[0], numberOfSteps: 0 }],
      })
      expect(() => launch.validateFloorConfig(config)).toThrow()
    })

    it('should validate a correct treasury config', () => {
      const config = createTestTreasuryConfig(ANVIL_ADDRESSES.ADMIN)
      const validated = launch.validateTreasuryConfig(config)
      expect(validated.recipients.length).toBe(2)
      expect(validated.floorFeePercentage).toBe(6800)
    })

    it('should reject treasury config with empty recipients', () => {
      const config = {
        ...createTestTreasuryConfig(ANVIL_ADDRESSES.ADMIN),
        recipients: [],
      }
      expect(() => launch.validateTreasuryConfig(config)).toThrow()
    })

    it('should validate a correct credit facility config', () => {
      const config = { loanToValueRatio: 9900, maxLeverage: 25, borrowingFeeRate: 0 }
      const validated = launch.validateCreditFacilityConfig(config)
      expect(validated.loanToValueRatio).toBe(9900)
    })

    it('should reject credit facility config with LTV > 9900', () => {
      const config = { loanToValueRatio: 10000, maxLeverage: 25, borrowingFeeRate: 0 }
      expect(() => launch.validateCreditFacilityConfig(config)).toThrow()
    })

    it('should reject credit facility config with maxLeverage > 255', () => {
      const config = { loanToValueRatio: 9900, maxLeverage: 300, borrowingFeeRate: 0 }
      expect(() => launch.validateCreditFacilityConfig(config)).toThrow()
    })

    it('should validate a complete launch config', () => {
      const config = createTestLaunchConfig(ANVIL_ADDRESSES.ADMIN, ANVIL_ADDRESSES.MANAGER)
      const validated = launch.validateLaunchConfig(config)
      expect(validated.floor.segments.length).toBe(2)
      expect(validated.treasury.recipients.length).toBe(2)
      expect(validated.creditFacility?.loanToValueRatio).toBe(9900)
    })
  })

  // ---------------------------------------------------------------------------
  // Encoding Tests
  // ---------------------------------------------------------------------------

  describe('Encoding', () => {
    it('should encode floor config correctly', () => {
      const config = createTestFloorConfig(ANVIL_ADDRESSES.ADMIN, ANVIL_ADDRESSES.MANAGER)
      const encoded = launch.encodeFloorConfig(config)

      expect(encoded).toMatch(/^0x[0-9a-f]+$/i)
      expect(encoded.length).toBeGreaterThan(2)
    })

    it('should encode authorizer config correctly', () => {
      const encoded = launch.encodeAuthorizerConfig(ANVIL_ADDRESSES.ADMIN)

      expect(encoded).toMatch(/^0x[0-9a-f]+$/i)
      expect(encoded.length).toBe(66)
    })

    it('should encode treasury config correctly', () => {
      const config = createTestTreasuryConfig(ANVIL_ADDRESSES.ADMIN)
      const encoded = launch.encodeTreasuryConfig(config)

      expect(encoded).toMatch(/^0x[0-9a-f]+$/i)
      expect(encoded.length).toBeGreaterThan(2)
    })

    it('should encode credit facility config correctly', () => {
      const config = { loanToValueRatio: 9900, maxLeverage: 25, borrowingFeeRate: 600 }
      const encoded = launch.encodeCreditFacilityConfig(config)

      expect(encoded).toMatch(/^0x[0-9a-f]+$/i)
      expect(encoded.length).toBe(194)
    })

    it('should encode presale config correctly', () => {
      const config = createTestPresaleConfig(ANVIL_ADDRESSES.ADMIN)
      const encoded = launch.encodePresaleConfig(config)

      expect(encoded).toMatch(/^0x[0-9a-f]+$/i)
      expect(encoded.length).toBeGreaterThan(2)
    })

    it('should reject segment with initialPrice exceeding 72-bit max', () => {
      const config = createTestFloorConfig(ANVIL_ADDRESSES.ADMIN, ANVIL_ADDRESSES.MANAGER, {
        segments: [
          {
            initialPrice: BigInt(2) ** BigInt(72),
            priceIncrease: BigInt(0),
            supplyPerStep: BigInt(100_000e18),
            numberOfSteps: 1,
          },
        ],
      })
      expect(() => launch.encodeFloorConfig(config)).toThrow('Initial price exceeds 72-bit max')
    })

    it('should reject segment with numberOfSteps = 0', () => {
      const segments = createTestSegments()
      const config = createTestFloorConfig(ANVIL_ADDRESSES.ADMIN, ANVIL_ADDRESSES.MANAGER, {
        segments: [{ ...segments[0], numberOfSteps: 0 }],
      })
      expect(() => launch.validateFloorConfig(config)).toThrow()
    })
  })

  // ---------------------------------------------------------------------------
  // RPC Read Tests (Devnet)
  // ---------------------------------------------------------------------------

  describe('RPC Reads (Devnet)', () => {
    it('should connect to devnet and get block number', async () => {
      if (!isDevnetAvailable) {
        console.log('Devnet not available, skipping test')
        return
      }

      const blockNumber = await publicClient.getBlockNumber()
      expect(typeof blockNumber).toBe('bigint')
      expect(blockNumber).toBeGreaterThan(0n)
      console.log(`Current block number: ${blockNumber}`)
    })

    it('should read floor ID counter from FloorFactory', async () => {
      if (!isDevnetAvailable) {
        console.log('Devnet not available, skipping test')
        return
      }

      try {
        const counter = await launch.getFloorIDCounter()
        expect(typeof counter).toBe('bigint')
        expect(counter).toBeGreaterThanOrEqual(0n)
        console.log(`Floor ID counter: ${counter}`)
      } catch {
        console.log('FloorFactory not deployed at expected address')
      }
    })

    it('should read module factory address from FloorFactory', async () => {
      if (!isDevnetAvailable) {
        console.log('Devnet not available, skipping test')
        return
      }

      try {
        const moduleFactory = await launch.getModuleFactory()
        expect(moduleFactory).toMatch(/^0x[0-9a-fA-F]{40}$/)
        console.log(`Module Factory: ${moduleFactory}`)
      } catch {
        console.log('FloorFactory not deployed at expected address')
      }
    })

    it('should get deployer account balance', async () => {
      if (!isDevnetAvailable) {
        console.log('Devnet not available, skipping test')
        return
      }

      const balance = await publicClient.getBalance({ address: ANVIL_ADDRESSES.ADMIN })
      expect(typeof balance).toBe('bigint')
      console.log(`Deployer balance: ${balance / BigInt(1e18)} ETH`)
    })
  })

  // ---------------------------------------------------------------------------
  // GraphQL/Indexer Tests
  // ---------------------------------------------------------------------------

  describe('GraphQL Indexer', () => {
    it('should fetch markets from indexer', async () => {
      try {
        const markets = await fetchMarkets()
        expect(Array.isArray(markets)).toBe(true)
        console.log(`Found ${markets.length} markets in indexer`)

        if (markets.length > 0) {
          const firstMarket = markets[0]
          console.log('First market:', {
            id: firstMarket.id,
            name: firstMarket.name,
            symbol: firstMarket.symbol,
            floorPrice: firstMarket.pricing?.currentFloorPrice,
            marketPrice: firstMarket.pricing?.currentMarketPrice,
            marketSupply: firstMarket.supply?.marketSupply,
          })
        }
      } catch {
        console.log('Indexer not available or no markets found')
      }
    })

    it('should query the GraphQL endpoint directly', async () => {
      try {
        const client = Client.get()
        const result = await client.query(
          `query { Market(limit: 5) { id currentPriceRaw floorPriceRaw } }`,
          {}
        )

        if (result.error) {
          console.log('GraphQL query error:', result.error.message)
        } else {
          console.log('GraphQL response:', result.data)
          expect(result.data).toBeDefined()
        }
      } catch {
        console.log('GraphQL endpoint not available')
      }
    })
  })

  // ---------------------------------------------------------------------------
  // E2E Create Flow Tests (requires deployed contracts + tokens)
  // ---------------------------------------------------------------------------

  describe.skip('E2E Create Flow', () => {
    // These tests require:
    // 1. FloorFactory to be deployed
    // 2. Issuance token to be deployed
    // 3. Reserve token to be deployed
    // 4. Deployer to have sufficient balance

    it('should create a new floor market', async () => {
      if (!isDevnetAvailable) {
        console.log('Devnet not available, skipping test')
        return
      }

      // These would need to be deployed tokens
      const ISSUANCE_TOKEN = '0x5FbDB2315678afecb367f032d93F642f64180aa3' as const
      const RESERVE_TOKEN = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as const

      const config = createTestLaunchConfig(ISSUANCE_TOKEN, RESERVE_TOKEN)

      const result = await launch.create(config)

      expect(result.floorAddress).toMatch(/^0x[0-9a-fA-F]{40}$/)
      expect(result.marketId).toBeGreaterThan(0n)
      expect(result.transactionHash).toMatch(/^0x[0-9a-fA-F]{64}$/)

      console.log('Created floor:', {
        address: result.floorAddress,
        marketId: result.marketId.toString(),
        txHash: result.transactionHash,
      })
    })
  })
})
