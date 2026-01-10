/**
 * @description Test environment configuration
 * Contains RPC URLs, contract addresses, and chain definitions for testing
 */

import type { Address } from 'viem'
import { defineChain } from 'viem'

// =============================================================================
// Environment URLs
// =============================================================================

/**
 * Remote Devnet RPC URL
 * Uses the deployed Anvil-based testnet at AWS
 */
export const DEVNET_RPC_URL = 'https://vfgvanuabr.eu-central-1.awsapprunner.com/'

/**
 * Local Anvil RPC URL
 */
export const LOCAL_RPC_URL = 'http://127.0.0.1:8545'

/**
 * GraphQL Indexer URL
 */
export const GRAPHQL_URL = 'https://indexer.hyperindex.xyz/cada10d/v1/graphql'

// =============================================================================
// Anvil Default Accounts
// =============================================================================

/**
 * Anvil default private keys (safe to use on testnets)
 */
export const ANVIL_PRIVATE_KEYS = {
  /** Account #0 */
  DEPLOYER: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  /** Account #1 */
  MANAGER: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
  /** Account #2 */
  USER_1: '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
  /** Account #3 */
  USER_2: '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
  /** Account #4 */
  USER_3: '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a',
} as const

/**
 * Anvil default addresses
 */
export const ANVIL_ADDRESSES = {
  /** Account #0 - Primary deployer/admin */
  ADMIN: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' as Address,
  /** Account #1 - Manager/team multisig */
  MANAGER: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8' as Address,
  /** Account #2 - Test user 1 */
  USER_1: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC' as Address,
  /** Account #3 - Test user 2 */
  USER_2: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' as Address,
  /** Account #4 - Test user 3 */
  USER_3: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65' as Address,
} as const

// =============================================================================
// Contract Addresses (Devnet)
// =============================================================================

/**
 * Deployed contract addresses on the remote devnet
 */
export const DEVNET_CONTRACTS = {
  /** FloorFactory address (from indexer config.yaml) */
  FLOOR_FACTORY: '0xec8c677e1db317e328a1919298afcb36d36a0b08' as Address,
  /** Collateral token address */
  COLLATERAL_TOKEN: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' as Address,
} as const

// =============================================================================
// Chain Definitions
// =============================================================================

/**
 * Custom devnet chain definition for viem
 */
export const devnetChain = defineChain({
  id: 31337,
  name: 'Floor Markets Devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [DEVNET_RPC_URL],
    },
  },
  testnet: true,
})

/**
 * Local Anvil chain definition for viem
 */
export const localAnvilChain = defineChain({
  id: 31337,
  name: 'Local Anvil',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [LOCAL_RPC_URL],
    },
  },
  testnet: true,
})
