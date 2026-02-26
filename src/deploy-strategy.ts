/**
 * @description Deploy module for TestnetStrategy_v1 deployment
 * Handles deploying new TestnetStrategy_v1 contracts for staking
 */

import type { Address, TransactionReceipt } from 'viem'

import { TestnetStrategy_v1 } from './abis'
import { TESTNET_STRATEGY_BYTECODE } from './constants/bytecode'
import type { PopPublicClient, PopWalletClient } from './types'

// =============================================================================
// Types
// =============================================================================

/**
 * @description Parameters for deploying a TestnetStrategy
 */
export type DeployStrategyParams = {
  /** The Floor address (for initialization) */
  floorAddress: Address
  /** The Authorizer address (for initialization) */
  authorizerAddress: Address
  /** The fee treasury address (for initialization) */
  feeTreasuryAddress: Address
  /** The trusted forwarder address */
  trustedForwarderAddress: Address
}

/**
 * @description Result of deploying a strategy
 */
export type DeployStrategyResult = {
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Deployed strategy address */
  strategyAddress: Address
  /** Transaction hash */
  transactionHash: `0x${string}`
}

// =============================================================================
// DeployStrategy Class
// =============================================================================

interface DeployStrategyConstructorArgs {
  /** Public client for reading */
  publicClient: PopPublicClient
  /** Wallet client for writing */
  walletClient: PopWalletClient
}

/**
 * @description Class for deploying TestnetStrategy contracts
 * @example
 * ```typescript
 * const deployStrategy = new DeployStrategy({
 *   publicClient,
 *   walletClient,
 * })
 *
 * const result = await deployStrategy.deployStrategy({
 *   floorAddress: '0x...',
 *   authorizerAddress: '0x...',
 *   feeTreasuryAddress: '0x...',
 *   trustedForwarderAddress: '0x...',
 * })
 * ```
 */
export class DeployStrategy {
  private readonly publicClient: PopPublicClient
  private readonly walletClient: PopWalletClient

  constructor({ publicClient, walletClient }: DeployStrategyConstructorArgs) {
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  // ===========================================================================
  // Public Methods
  // ===========================================================================

  /**
   * @description Deploy a new TestnetStrategy contract
   * @param params Deployment parameters
   * @returns Deployment result with strategy address and receipt
   */
  public async deployStrategy(params: DeployStrategyParams): Promise<DeployStrategyResult> {
    const { floorAddress, authorizerAddress, feeTreasuryAddress, trustedForwarderAddress } = params

    // Deploy the contract with the trusted forwarder address in constructor
    const hash = await this.walletClient.deployContract({
      abi: TestnetStrategy_v1,
      bytecode: TESTNET_STRATEGY_BYTECODE,
      args: [trustedForwarderAddress],
      account: this.walletClient.account?.address as Address,
    })

    // Wait for receipt
    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    if (receipt.status === 'reverted') {
      throw new Error('Strategy deployment reverted')
    }

    if (!receipt.contractAddress) {
      throw new Error('Strategy deployment failed - no address returned')
    }

    const strategyAddress = receipt.contractAddress

    // Initialize the strategy
    const initHash = await this.walletClient.writeContract({
      address: strategyAddress,
      abi: TestnetStrategy_v1,
      functionName: 'init',
      args: [floorAddress, authorizerAddress, feeTreasuryAddress, '0x'],
      account: this.walletClient.account?.address as Address,
    })

    const initReceipt = await this.publicClient.waitForTransactionReceipt({ hash: initHash })

    if (initReceipt.status === 'reverted') {
      throw new Error('Strategy initialization reverted')
    }

    return {
      receipt,
      strategyAddress,
      transactionHash: hash,
    }
  }
}
