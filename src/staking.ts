import type { Address, TransactionReceipt } from 'viem'

import { ERC20Issuance_v1, StakingManager_v1, TestnetStrategy_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'

export interface TStakingStakeParams {
  strategyAddress: Address
  issuanceTokenAmount: bigint
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TStakingHarvestYieldParams {
  strategyAddress: Address
  receiverAddress: Address
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TStakingWithdrawParams {
  strategyAddress: Address
  collateralAmount: bigint
  receiverAddress: Address
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TStakingRebalanceParams {
  strategyAddress: Address
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TStakingApproveParams {
  amount: bigint
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

// Admin params
export interface TStakingAddStrategyParams {
  strategyAddress: Address
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TStakingRemoveStrategyParams {
  strategyAddress: Address
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TStakingSetPerformanceFeeParams {
  feeBps: number
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

// TestnetStrategy params
export interface TStakingInjectYieldParams {
  strategyAddress: Address
  amount: bigint
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TStakingSimulateLossParams {
  strategyAddress: Address
  amount: bigint
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TStakingApproveCollateralForStrategyParams {
  strategyAddress: Address
  amount: bigint
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export type TStakingMutationResult = TransactionReceipt

interface StakingConstructorArgs {
  stakingManagerAddress: Address
  issuanceTokenAddress: Address
  publicClient: PopPublicClient
  walletClient?: PopWalletClient
}

const ZERO_AMOUNT = BigInt(0)

/**
 * @description Pure utility class for interacting with StakingManager via viem.
 *              This class contains no React or wagmi dependencies so it can be
 *              reused across server and client runtimes.
 */
export class Staking {
  private readonly stakingManagerAddress: Address
  private readonly issuanceTokenAddress: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({
    stakingManagerAddress,
    issuanceTokenAddress,
    publicClient,
    walletClient,
  }: StakingConstructorArgs) {
    this.stakingManagerAddress = stakingManagerAddress
    this.issuanceTokenAddress = issuanceTokenAddress
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  public getStakingManagerAddress(): Address {
    return this.stakingManagerAddress
  }

  /**
   * @description Get user's staking position for a specific strategy
   * @param userAddress Address of the user
   * @param strategyAddress Address of the strategy
   * @returns UserPosition tuple with lockedIssuanceTokens, deployedCollateral, lastFloorPrice
   */
  public async getPosition(
    userAddress: Address,
    strategyAddress: Address
  ): Promise<{ lockedIssuanceTokens: bigint; deployedCollateral: bigint; lastFloorPrice: bigint }> {
    const position = (await this.publicClient.readContract({
      address: this.stakingManagerAddress,
      abi: StakingManager_v1,
      functionName: 'getPosition',
      args: [userAddress, strategyAddress],
    })) as { lockedIssuanceTokens: bigint; deployedCollateral: bigint; lastFloorPrice: bigint }

    return position
  }

  /**
   * @description Get the current value of a user's position in a strategy
   * @param userAddress Address of the user
   * @param strategyAddress Address of the strategy
   * @returns Position value in collateral tokens
   */
  public async getPositionValue(userAddress: Address, strategyAddress: Address): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.stakingManagerAddress,
      abi: StakingManager_v1,
      functionName: 'getPositionValue',
      args: [userAddress, strategyAddress],
    })) as bigint
  }

  /**
   * @description Get available yield for a user's position in a strategy
   * @param userAddress Address of the user
   * @param strategyAddress Address of the strategy
   * @returns Available yield amount
   */
  public async getAvailableYield(userAddress: Address, strategyAddress: Address): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.stakingManagerAddress,
      abi: StakingManager_v1,
      functionName: 'getAvailableYield',
      args: [userAddress, strategyAddress],
    })) as bigint
  }

  /**
   * @description Get the performance fee in basis points
   * @returns Performance fee (e.g., 1000 = 10%)
   */
  public async getPerformanceFeeBps(): Promise<number> {
    const feeBps = (await this.publicClient.readContract({
      address: this.stakingManagerAddress,
      abi: StakingManager_v1,
      functionName: 'getPerformanceFeeBps',
      args: [],
    })) as bigint

    return Number(feeBps)
  }

  /**
   * @description Check if a strategy is approved
   * @param strategyAddress Address of the strategy
   * @returns Whether the strategy is approved
   */
  public async isStrategyApproved(strategyAddress: Address): Promise<boolean> {
    return (await this.publicClient.readContract({
      address: this.stakingManagerAddress,
      abi: StakingManager_v1,
      functionName: 'isStrategyApproved',
      args: [strategyAddress],
    })) as boolean
  }

  /**
   * @description Get issuance token allowance for the StakingManager
   * @param ownerAddress Address of the token owner
   * @returns Allowance amount
   */
  public async getIssuanceTokenAllowance(ownerAddress: Address): Promise<bigint> {
    if (!ownerAddress) {
      throw new Error('Owner address is required to fetch allowance.')
    }

    try {
      const code = await this.publicClient.getBytecode({ address: this.issuanceTokenAddress })
      if (!code || code === '0x') {
        return BigInt(0)
      }

      return (await this.publicClient.readContract({
        address: this.issuanceTokenAddress,
        abi: ERC20Issuance_v1,
        functionName: 'allowance',
        args: [ownerAddress, this.stakingManagerAddress],
      })) as bigint
    } catch (error) {
      console.warn(
        `Failed to get issuance token allowance for ${ownerAddress} on ${this.issuanceTokenAddress}:`,
        error
      )
      return BigInt(0)
    }
  }

  /**
   * @description Stake issuance tokens and deploy collateral to a yield strategy
   * @param strategyAddress Address of the approved yield strategy
   * @param issuanceTokenAmount Amount of issuance tokens to stake
   * @param lifecycle Optional lifecycle callbacks for multi-stage feedback
   * @returns Transaction receipt
   */
  public async stake({
    strategyAddress,
    issuanceTokenAmount,
    lifecycle,
  }: TStakingStakeParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(issuanceTokenAmount)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.stakingManagerAddress,
        abi: StakingManager_v1,
        functionName: 'stake',
        args: [strategyAddress, issuanceTokenAmount],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Harvest yield from a staked position
   * @param strategyAddress Address of the strategy
   * @param receiverAddress Address to receive the net yield
   * @param lifecycle Optional lifecycle callbacks for multi-stage feedback
   * @returns Transaction receipt
   */
  public async harvestYield({
    strategyAddress,
    receiverAddress,
    lifecycle,
  }: TStakingHarvestYieldParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.stakingManagerAddress,
        abi: StakingManager_v1,
        functionName: 'harvestYield',
        args: [strategyAddress, receiverAddress],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        const error = new Error('Harvest yield transaction reverted')
        lifecycle?.onFailed?.(error)
        throw error
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Withdraw funds from a staked position
   * @param strategyAddress Address of the strategy
   * @param collateralAmount Amount of collateral to withdraw
   * @param receiverAddress Address to receive the issuance tokens
   * @param lifecycle Optional lifecycle callbacks for multi-stage feedback
   * @returns Transaction receipt
   */
  public async withdrawFunds({
    strategyAddress,
    collateralAmount,
    receiverAddress,
    lifecycle,
  }: TStakingWithdrawParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(collateralAmount)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.stakingManagerAddress,
        abi: StakingManager_v1,
        functionName: 'withdrawFunds',
        args: [strategyAddress, collateralAmount, receiverAddress],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        const error = new Error('Withdraw funds transaction reverted')
        lifecycle?.onFailed?.(error)
        throw error
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Rebalance position when floor price has increased
   * @param strategyAddress Address of the strategy
   * @param lifecycle Optional lifecycle callbacks for multi-stage feedback
   * @returns Transaction receipt
   */
  public async rebalance({
    strategyAddress,
    lifecycle,
  }: TStakingRebalanceParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.stakingManagerAddress,
        abi: StakingManager_v1,
        functionName: 'rebalance',
        args: [strategyAddress],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        const error = new Error('Rebalance transaction reverted')
        lifecycle?.onFailed?.(error)
        throw error
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Approve issuance tokens for the StakingManager
   * @param amount Amount to approve
   * @param lifecycle Optional lifecycle callbacks for multi-stage feedback
   * @returns Transaction receipt
   */
  public async approveIssuanceToken({
    amount,
    lifecycle,
  }: TStakingApproveParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(amount)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.issuanceTokenAddress,
        abi: ERC20Issuance_v1,
        functionName: 'approve',
        args: [this.stakingManagerAddress, amount],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  // ===========================================================================
  // Admin Methods
  // ===========================================================================

  /**
   * @description Add a yield strategy to the approved list (admin only)
   * @param strategyAddress Address of the ERC4626 strategy to add
   * @param lifecycle Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async addStrategy({
    strategyAddress,
    lifecycle,
  }: TStakingAddStrategyParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.stakingManagerAddress,
        abi: StakingManager_v1,
        functionName: 'addStrategy',
        args: [strategyAddress],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Remove a yield strategy from the approved list (admin only)
   * @param strategyAddress Address of the strategy to remove (must have 0 assets)
   * @param lifecycle Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async removeStrategy({
    strategyAddress,
    lifecycle,
  }: TStakingRemoveStrategyParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.stakingManagerAddress,
        abi: StakingManager_v1,
        functionName: 'removeStrategy',
        args: [strategyAddress],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Update the performance fee percentage (admin only)
   * @param feeBps Fee in basis points (e.g., 1000 = 10%). Max 10000.
   * @param lifecycle Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async setPerformanceFeeBps({
    feeBps,
    lifecycle,
  }: TStakingSetPerformanceFeeParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()

    if (feeBps < 0 || feeBps > 10_000) {
      throw new Error('Performance fee must be between 0 and 10000 basis points')
    }

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.stakingManagerAddress,
        abi: StakingManager_v1,
        functionName: 'setPerformanceFeeBps',
        args: [BigInt(feeBps)],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  // ===========================================================================
  // TestnetStrategy Methods
  // ===========================================================================

  /**
   * @description Inject yield into a TestnetStrategy (testnet only)
   * @param strategyAddress Address of the TestnetStrategy
   * @param amount Amount of collateral tokens to inject as yield
   * @param lifecycle Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async injectYield({
    strategyAddress,
    amount,
    lifecycle,
  }: TStakingInjectYieldParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(amount)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: strategyAddress,
        abi: TestnetStrategy_v1,
        functionName: 'injectYield',
        args: [amount],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Inject yield transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Simulate a loss in a TestnetStrategy (testnet only)
   * @param strategyAddress Address of the TestnetStrategy
   * @param amount Amount of loss to simulate
   * @param lifecycle Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async simulateLoss({
    strategyAddress,
    amount,
    lifecycle,
  }: TStakingSimulateLossParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(amount)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: strategyAddress,
        abi: TestnetStrategy_v1,
        functionName: 'simulateLoss',
        args: [amount],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Simulate loss transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Get total reserve from a TestnetStrategy
   * @param strategyAddress Address of the TestnetStrategy
   * @returns Total reserve amount
   */
  public async getTotalReserve(strategyAddress: Address): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: strategyAddress,
      abi: TestnetStrategy_v1,
      functionName: 'getTotalReserve',
      args: [],
    })) as bigint
  }

  /**
   * @description Approve collateral tokens for a TestnetStrategy (needed for injectYield)
   * @param strategyAddress Address of the TestnetStrategy
   * @param amount Amount to approve
   * @param lifecycle Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async approveCollateralForStrategy({
    strategyAddress,
    amount,
    lifecycle,
  }: TStakingApproveCollateralForStrategyParams): Promise<TStakingMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(amount)

    // Read the collateral token address from the strategy
    const collateralToken = (await this.publicClient.readContract({
      address: strategyAddress,
      abi: TestnetStrategy_v1,
      functionName: 'asset',
      args: [],
    })) as Address

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: collateralToken,
        abi: ERC20Issuance_v1,
        functionName: 'approve',
        args: [strategyAddress, amount],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Approve collateral transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  // ===========================================================================
  // Private Helpers
  // ===========================================================================

  private assertPositiveAmount(amount: bigint): void {
    if (amount <= ZERO_AMOUNT) {
      throw new Error('Invalid amount. Amount must be greater than 0.')
    }
  }

  private requireWalletClient(): PopWalletClient {
    if (!this.walletClient) {
      throw new Error('Wallet not connected. Please connect your wallet to continue.')
    }
    return this.walletClient
  }

  private getWalletAddress(walletClient: PopWalletClient): Address {
    const account = walletClient.account
    if (!account?.address) {
      throw new Error('Wallet not connected. Please connect your wallet to continue.')
    }
    return account.address as Address
  }
}
