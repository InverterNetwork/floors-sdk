/**
 * @description Environment loader for tests
 * Reads configuration from .env files and GraphQL indexer
 * Provides real contract addresses and RPC connections for integration tests
 */

import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import type { Address } from 'viem'

import { fetchGlobalRegistry } from '../../../src/graphql/api/fetchers'
import { Client } from '../../../src/graphql/client'

// =============================================================================
// Types
// =============================================================================

export interface TestEnvironment {
  /** RPC URL for local Anvil */
  rpcUrl: string
  /** GraphQL URL for local indexer */
  graphqlUrl: string
  /** FloorFactory address */
  floorFactoryAddress: Address
  /** ModuleFactory address */
  moduleFactoryAddress: Address
  /** TransactionForwarder address */
  transactionForwarderAddress: Address
  /** Governor/Admin address */
  governorAddress: Address
  /** Collateral token address from env */
  collateralTokenAddress: Address
  /** Anvil test accounts */
  accounts: TestAccounts
}

export interface TestAccounts {
  deployer: { address: Address; privateKey: `0x${string}` }
  manager: { address: Address; privateKey: `0x${string}` }
  user1: { address: Address; privateKey: `0x${string}` }
  user2: { address: Address; privateKey: `0x${string}` }
  user3: { address: Address; privateKey: `0x${string}` }
}

// =============================================================================
// Constants
// =============================================================================

// __filename in ES modules gives us the file URL, need to handle it properly
const __filename = new URL(import.meta.url).pathname
const FLOORMARKETS_DIR = join(dirname(__filename), '../../../../../') // /Users/anon/Desktop/inverter/floormarkets
const CONTRACTS_ENV = join(FLOORMARKETS_DIR, 'contracts/.env')
const ENV_LOCAL = join(FLOORMARKETS_DIR, '.env.local')

const ANVIL_ACCOUNTS: TestAccounts = {
  deployer: {
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' as Address,
    privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  },
  manager: {
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8' as Address,
    privateKey: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
  },
  user1: {
    address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC' as Address,
    privateKey: '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
  },
  user2: {
    address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' as Address,
    privateKey: '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
  },
  user3: {
    address: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65' as Address,
    privateKey: '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a',
  },
}

// =============================================================================
// Environment Parsing
// =============================================================================

/**
 * Parse .env file content into key-value pairs
 */
function parseEnvFile(content: string): Record<string, string> {
  const result: Record<string, string> = {}
  const lines = content.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    // Skip comments and empty lines
    if (!trimmed || trimmed.startsWith('#')) continue

    const [key, ...valueParts] = trimmed.split('=')
    if (key && valueParts.length > 0) {
      result[key.trim()] = valueParts.join('=').trim()
    }
  }

  return result
}

/**
 * Load environment variables from .env files
 */
function loadEnvFiles(): {
  contractsEnv: Record<string, string>
  localEnv: Record<string, string>
} {
  let contractsEnv: Record<string, string> = {}
  let localEnv: Record<string, string> = {}

  try {
    const contractsContent = readFileSync(CONTRACTS_ENV, 'utf-8')
    contractsEnv = parseEnvFile(contractsContent)
  } catch (error) {
    console.warn(`Warning: Could not read ${CONTRACTS_ENV}:`, error)
  }

  try {
    const localContent = readFileSync(ENV_LOCAL, 'utf-8')
    localEnv = parseEnvFile(localContent)
  } catch (error) {
    console.warn(`Warning: Could not read ${ENV_LOCAL}:`, error)
  }

  return { contractsEnv, localEnv }
}

// =============================================================================
// GraphQL Queries
// =============================================================================

/**
 * Fetch global registry addresses from the indexer using SDK utility
 */
async function fetchGlobalRegistryFromIndexer(graphqlUrl: string): Promise<{
  floorFactoryAddress: Address
  moduleFactoryAddress: Address
  trustedForwarderAddress: Address
  governorAddress: Address
} | null> {
  // Configure SDK client to use the local indexer
  Client.updateUrl(graphqlUrl)
  return await fetchGlobalRegistry()
}

// =============================================================================
// Main Environment Loader
// =============================================================================

/**
 * Load test environment from .env files and indexer
 * Falls back to defaults if files are not available
 */
export async function loadTestEnvironment(): Promise<TestEnvironment> {
  const { contractsEnv, localEnv } = loadEnvFiles()

  // Get RPC and GraphQL URLs from .env.local or fall back to defaults
  const rpcUrl =
    localEnv['NEXT_PUBLIC_RPC_URL'] || contractsEnv['LOCAL_RPC_URL'] || 'http://127.0.0.1:8545'

  const graphqlUrl = localEnv['NEXT_PUBLIC_GRAPHQL_URL'] || 'http://localhost:8080/v1/graphql'

  // Get collateral token from contracts/.env
  const collateralTokenAddress =
    (contractsEnv['COLLATERAL_TOKEN_ADDRESS'] as Address) ||
    ('0x67832b9Fc47eb3CdBF7275b95a29740EC58193D2' as Address)

  // Try to fetch addresses from indexer first (most authoritative)
  const indexerAddresses = await fetchGlobalRegistryFromIndexer(graphqlUrl)

  if (indexerAddresses) {
    console.log('Loaded addresses from GraphQL indexer')
    return {
      rpcUrl,
      graphqlUrl,
      floorFactoryAddress: indexerAddresses.floorFactoryAddress,
      moduleFactoryAddress: indexerAddresses.moduleFactoryAddress,
      transactionForwarderAddress: indexerAddresses.trustedForwarderAddress,
      governorAddress: indexerAddresses.governorAddress,
      collateralTokenAddress,
      accounts: ANVIL_ACCOUNTS,
    }
  }

  // Fall back to .env files
  console.log('Falling back to .env files for addresses')
  const floorFactoryAddress =
    (contractsEnv['FLOOR_FACTORY'] as Address) ||
    ('0x53299141d0cb1d75da156b7cd5e8ea076d02f41f' as Address)

  const forwarderAddress =
    (contractsEnv['FORWARDER'] as Address) ||
    ('0xf5656952eb383f01305ae1d973a32416122c0c2f' as Address)

  const moduleFactoryAddress =
    (contractsEnv['MODULE_FACTORY'] as Address) ||
    ('0x79C230218626A33118b5bae08f28A5d342dCCD36' as Address)

  const governorAddress =
    (contractsEnv['ADMIN_ADDRESS'] as Address) || ANVIL_ACCOUNTS.deployer.address

  return {
    rpcUrl,
    graphqlUrl,
    floorFactoryAddress,
    moduleFactoryAddress,
    transactionForwarderAddress: forwarderAddress,
    governorAddress,
    collateralTokenAddress,
    accounts: ANVIL_ACCOUNTS,
  }
}

/**
 * Check if the test environment is available
 */
export async function isTestEnvironmentAvailable(): Promise<boolean> {
  try {
    const env = await loadTestEnvironment()

    // Check RPC
    const rpcResponse = await fetch(env.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_blockNumber',
        params: [],
      }),
    })

    if (!rpcResponse.ok) return false

    const rpcData = await rpcResponse.json()
    if (!rpcData.result) return false

    // Check GraphQL using SDK utility
    Client.updateUrl(env.graphqlUrl)
    const registry = await fetchGlobalRegistry()

    return registry !== null
  } catch {
    return false
  }
}
