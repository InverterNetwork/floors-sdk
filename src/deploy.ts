/**
 * @description Deploy module for ERC20Issuance token deployment
 * Handles deploying new ERC20Issuance_v1 tokens for Floor Markets
 */

import type { Address, TransactionReceipt } from 'viem'

import { ERC20Issuance_v1 } from './abis'
import { ERC20_ISSUANCE_BYTECODE } from './constants'
import { query } from './graphql'
import type { PopPublicClient, PopWalletClient } from './types'

// =============================================================================
// Types
// =============================================================================

/**
 * @description Token configuration for deployment
 */
export type TokenConfig = {
  /** Token name (e.g., "Floor AVAX") */
  name: string
  /** Token symbol (e.g., "fAVAX") */
  symbol: string
  /** Token decimals (default: 18) */
  decimals: number
  /** Maximum supply in human-readable format (0 = unlimited, e.g., 100000000 for 100M tokens) */
  maxSupply: bigint
}

/**
 * @description Parameters for deploying a token
 */
export type DeployTokenParams = {
  /** Token configuration */
  config: TokenConfig
  /** Owner address (will have ownership rights) */
  ownerAddress: Address
}

/**
 * @description Result of deploying a token
 */
export type DeployTokenResult = {
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Deployed token address */
  tokenAddress: Address
  /** Transaction hash */
  transactionHash: `0x${string}`
}

// =============================================================================
// Deploy Class
// =============================================================================

interface DeployConstructorArgs {
  /** Public client for reading */
  publicClient: PopPublicClient
  /** Wallet client for writing */
  walletClient: PopWalletClient
}

/**
 * @description Class for deploying ERC20Issuance tokens
 * @example
 * ```typescript
 * const deploy = new Deploy({
 *   publicClient,
 *   walletClient,
 * })
 *
 * const result = await deploy.deployToken({
 *   config: {
 *     name: 'Floor AVAX',
 *     symbol: 'fAVAX',
 *     decimals: 18,
 *     maxSupply: BigInt(0), // unlimited
 *   },
 *   ownerAddress: '0x...',
 * })
 * ```
 */
export class Deploy {
  private readonly publicClient: PopPublicClient
  private readonly walletClient: PopWalletClient

  constructor({ publicClient, walletClient }: DeployConstructorArgs) {
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  // ===========================================================================
  // Public Methods
  // ===========================================================================

  /**
   * @description Fetch the trusted forwarder address from GlobalRegistry
   * @returns The trusted forwarder address
   */
  public async getTrustedForwarderAddress(): Promise<Address> {
    const response = await query({
      GlobalRegistry: {
        __args: { limit: 1 },
        trustedForwarderAddress: true,
      },
    })

    const registry = response.GlobalRegistry?.[0]
    if (!registry?.trustedForwarderAddress) {
      throw new Error('GlobalRegistry not found or missing trustedForwarderAddress')
    }

    return registry.trustedForwarderAddress as Address
  }

  /**
   * @description Deploy a new ERC20Issuance token
   * @param params Token configuration and owner address
   * @returns Deployment result with token address and receipt
   * @note maxSupply is expected in human-readable format (e.g., 100000000 for 100M tokens)
   *       and will be automatically scaled by 10^decimals before deployment
   */
  public async deployToken(params: DeployTokenParams): Promise<DeployTokenResult> {
    const { config, ownerAddress } = params

    // Fetch trusted forwarder address from GlobalRegistry
    const trustedForwarderAddress = await this.getTrustedForwarderAddress()

    // For "unlimited" supply (0), use max uint256 value
    // Otherwise, scale the human-readable maxSupply by 10^decimals
    // e.g., maxSupply=100000000 with decimals=18 becomes 100000000 * 10^18
    const maxSupply =
      config.maxSupply === BigInt(0)
        ? BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') // type(uint256).max
        : config.maxSupply * BigInt(10 ** config.decimals)

    // Deploy contract
    const hash = await this.walletClient.deployContract({
      abi: ERC20Issuance_v1,
      bytecode: ERC20_ISSUANCE_BYTECODE,
      args: [config.name, config.symbol, config.decimals, maxSupply, trustedForwarderAddress],
      account: ownerAddress,
    })

    // Wait for receipt
    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    if (receipt.status === 'reverted') {
      throw new Error('Contract deployment reverted')
    }

    if (!receipt.contractAddress) {
      throw new Error('Contract deployment failed - no address returned')
    }

    return {
      receipt,
      tokenAddress: receipt.contractAddress,
      transactionHash: hash,
    }
  }
}
