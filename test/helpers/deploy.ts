/**
 * @description Token deployment utilities for testing
 * Uses the main Deploy class from the SDK for production-level testing
 */

import type { Address, Chain, PublicClient, Transport } from 'viem'

import { Deploy, type TokenConfig } from '../../src/deploy'
import type { PopWalletClient } from '../../src/types'

// Re-export TokenConfig from the main SDK
export type { TokenConfig }

/**
 * @description Default issuance token configuration for testing
 */
export const DEFAULT_ISSUANCE_TOKEN_CONFIG: TokenConfig = {
  name: 'Test Floor Token',
  symbol: 'TFT',
  decimals: 18,
  maxSupply: BigInt(1_000_000_000e18), // 1B tokens
}

/**
 * @description Default collateral token configuration (USDC-like) for testing
 */
export const DEFAULT_COLLATERAL_TOKEN_CONFIG: TokenConfig = {
  name: 'Test USDC',
  symbol: 'TUSDC',
  decimals: 6,
  maxSupply: BigInt(1_000_000_000e6), // 1B tokens
}

/**
 * @description Deploy an ERC20Issuance_v1 token using the main SDK Deploy class
 * @returns The deployed token address
 */
export async function deployERC20Issuance(
  walletClient: PopWalletClient,
  publicClient: PublicClient<Transport, Chain>,
  config: TokenConfig = DEFAULT_ISSUANCE_TOKEN_CONFIG
): Promise<Address> {
  const deploy = new Deploy({
    publicClient,
    walletClient,
  })

  const ownerAddress = walletClient.account?.address
  if (!ownerAddress) {
    throw new Error('Wallet client must have an account')
  }

  const result = await deploy.deployToken({
    config,
    ownerAddress,
  })

  return result.tokenAddress
}

/**
 * @description Deploy both issuance and collateral tokens for testing
 * Uses the main SDK Deploy class for production-level testing
 * Deploys sequentially to avoid nonce conflicts
 */
export async function deployTestTokens(
  walletClient: PopWalletClient,
  publicClient: PublicClient<Transport, Chain>,
  options?: {
    issuance?: Partial<TokenConfig>
    collateral?: Partial<TokenConfig>
  }
): Promise<{ issuanceToken: Address; collateralToken: Address }> {
  const issuanceConfig: TokenConfig = {
    ...DEFAULT_ISSUANCE_TOKEN_CONFIG,
    ...options?.issuance,
  }
  const collateralConfig: TokenConfig = {
    ...DEFAULT_COLLATERAL_TOKEN_CONFIG,
    ...options?.collateral,
  }

  // Deploy sequentially to avoid nonce conflicts with remote devnet
  const issuanceToken = await deployERC20Issuance(walletClient, publicClient, issuanceConfig)
  const collateralToken = await deployERC20Issuance(walletClient, publicClient, collateralConfig)

  return { issuanceToken, collateralToken }
}
