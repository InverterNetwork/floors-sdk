/**
 * @description Viem client utilities for testing
 * Contains helpers for creating public and wallet clients
 */

import type { Chain, PublicClient, Transport } from 'viem'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import type { PopWalletClient } from '../../src/types'
import {
  ANVIL_PRIVATE_KEYS,
  DEVNET_RPC_URL,
  devnetChain,
  LOCAL_RPC_URL,
  localAnvilChain,
} from './config'

// =============================================================================
// Client Creation Options
// =============================================================================

export interface ClientOptions {
  /** RPC URL to connect to */
  rpcUrl?: string
  /** Chain definition */
  chain?: Chain
  /** Request timeout in ms */
  timeout?: number
  /** Number of retries */
  retryCount?: number
}

const DEFAULT_OPTIONS: Required<Omit<ClientOptions, 'rpcUrl' | 'chain'>> = {
  timeout: 30_000,
  retryCount: 3,
}

// =============================================================================
// Public Client Creation
// =============================================================================

/**
 * Creates a public client for the remote devnet
 */
export const createDevnetPublicClient = (
  options?: Omit<ClientOptions, 'rpcUrl' | 'chain'>
): PublicClient<Transport, Chain> => {
  return createPublicClient({
    chain: devnetChain,
    transport: http(DEVNET_RPC_URL, {
      timeout: options?.timeout ?? DEFAULT_OPTIONS.timeout,
      retryCount: options?.retryCount ?? DEFAULT_OPTIONS.retryCount,
    }),
  })
}

/**
 * Creates a public client for local Anvil
 */
export const createLocalPublicClient = (
  options?: Omit<ClientOptions, 'rpcUrl' | 'chain'>
): PublicClient<Transport, Chain> => {
  return createPublicClient({
    chain: localAnvilChain,
    transport: http(LOCAL_RPC_URL, {
      timeout: options?.timeout ?? DEFAULT_OPTIONS.timeout,
      retryCount: options?.retryCount ?? DEFAULT_OPTIONS.retryCount,
    }),
  })
}

/**
 * Creates a public client with custom options
 */
export const createTestPublicClient = (options: ClientOptions): PublicClient<Transport, Chain> => {
  if (!options.rpcUrl || !options.chain) {
    throw new Error('rpcUrl and chain are required for custom client')
  }

  return createPublicClient({
    chain: options.chain,
    transport: http(options.rpcUrl, {
      timeout: options.timeout ?? DEFAULT_OPTIONS.timeout,
      retryCount: options.retryCount ?? DEFAULT_OPTIONS.retryCount,
    }),
  })
}

// =============================================================================
// Wallet Client Creation
// =============================================================================

export type AnvilAccount = keyof typeof ANVIL_PRIVATE_KEYS

/**
 * Creates a wallet client for the remote devnet using an Anvil account
 */
export const createDevnetWalletClient = (
  account: AnvilAccount = 'DEPLOYER',
  options?: Omit<ClientOptions, 'rpcUrl' | 'chain'>
): PopWalletClient => {
  const privateKey = ANVIL_PRIVATE_KEYS[account] as `0x${string}`
  const viemAccount = privateKeyToAccount(privateKey)

  return createWalletClient({
    account: viemAccount,
    chain: devnetChain,
    transport: http(DEVNET_RPC_URL, {
      timeout: options?.timeout ?? DEFAULT_OPTIONS.timeout,
      retryCount: options?.retryCount ?? DEFAULT_OPTIONS.retryCount,
    }),
  })
}

/**
 * Creates a wallet client for local Anvil using an Anvil account
 */
export const createLocalWalletClient = (
  account: AnvilAccount = 'DEPLOYER',
  options?: Omit<ClientOptions, 'rpcUrl' | 'chain'>
): PopWalletClient => {
  const privateKey = ANVIL_PRIVATE_KEYS[account] as `0x${string}`
  const viemAccount = privateKeyToAccount(privateKey)

  return createWalletClient({
    account: viemAccount,
    chain: localAnvilChain,
    transport: http(LOCAL_RPC_URL, {
      timeout: options?.timeout ?? DEFAULT_OPTIONS.timeout,
      retryCount: options?.retryCount ?? DEFAULT_OPTIONS.retryCount,
    }),
  })
}

/**
 * Creates a wallet client with a custom private key
 */
export const createTestWalletClient = (
  privateKey: `0x${string}`,
  options: ClientOptions
): PopWalletClient => {
  if (!options.rpcUrl || !options.chain) {
    throw new Error('rpcUrl and chain are required for custom client')
  }

  const account = privateKeyToAccount(privateKey)

  return createWalletClient({
    account,
    chain: options.chain,
    transport: http(options.rpcUrl, {
      timeout: options.timeout ?? DEFAULT_OPTIONS.timeout,
      retryCount: options.retryCount ?? DEFAULT_OPTIONS.retryCount,
    }),
  })
}

// =============================================================================
// Client Pair Creation
// =============================================================================

export interface ClientPair {
  publicClient: PublicClient<Transport, Chain>
  walletClient: PopWalletClient
}

/**
 * Creates both public and wallet clients for the remote devnet
 */
export const createDevnetClients = (
  account: AnvilAccount = 'DEPLOYER',
  options?: Omit<ClientOptions, 'rpcUrl' | 'chain'>
): ClientPair => ({
  publicClient: createDevnetPublicClient(options),
  walletClient: createDevnetWalletClient(account, options),
})

/**
 * Creates both public and wallet clients for local Anvil
 */
export const createLocalClients = (
  account: AnvilAccount = 'DEPLOYER',
  options?: Omit<ClientOptions, 'rpcUrl' | 'chain'>
): ClientPair => ({
  publicClient: createLocalPublicClient(options),
  walletClient: createLocalWalletClient(account, options),
})

// =============================================================================
// Devnet Availability Check
// =============================================================================

/**
 * Checks if the devnet is available and returns the block number
 * @returns Block number if available, null if not
 */
export const checkDevnetAvailability = async (
  client?: PublicClient<Transport, Chain>
): Promise<bigint | null> => {
  const publicClient = client ?? createDevnetPublicClient()

  try {
    const blockNumber = await publicClient.getBlockNumber()
    return blockNumber > 0n ? blockNumber : null
  } catch {
    return null
  }
}

/**
 * Checks if local Anvil is available and returns the block number
 * @returns Block number if available, null if not
 */
export const checkLocalAvailability = async (
  client?: PublicClient<Transport, Chain>
): Promise<bigint | null> => {
  const publicClient = client ?? createLocalPublicClient()

  try {
    const blockNumber = await publicClient.getBlockNumber()
    return blockNumber > 0n ? blockNumber : null
  } catch {
    return null
  }
}
