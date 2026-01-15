/**
 * @description TreasuryAdmin class for admin configuration of SplitterTreasury contracts
 * Provides methods for managing fee recipients, floor fee percentage, and floor fee treasury
 */

import type { Address, TransactionReceipt } from 'viem'

import { SplitterTreasury_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'

// =============================================================================
// Types
// =============================================================================

export interface TTreasuryAdminParams {
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TTreasuryRecipient {
  /** Recipient address */
  address: Address
  /** Share amount (relative to total shares) */
  shares: bigint
}

export interface TSetRecipientsParams extends TTreasuryAdminParams {
  /** Array of recipients with their shares */
  recipients: TTreasuryRecipient[]
}

export interface TSetFloorFeePercentageParams extends TTreasuryAdminParams {
  /** Floor fee percentage in basis points (e.g., 6800 = 68%) */
  percentageBps: number
}

export interface TSetFloorFeeTreasuryParams extends TTreasuryAdminParams {
  /** Address to receive floor fees */
  treasuryAddress: Address
}

export interface TTreasuryAdminState {
  /** Current floor fee percentage in basis points */
  floorFeePercentage: number
  /** Address receiving floor fees */
  floorFeeTreasury: Address
  /** Current recipients (would need indexer data for full list) */
  recipientCount: number
}

interface TreasuryAdminConstructorArgs {
  /** SplitterTreasury contract address */
  address: Address
  /** Public client for reading */
  publicClient: PopPublicClient
  /** Wallet client for writing (optional, required for mutations) */
  walletClient?: PopWalletClient
}

// =============================================================================
// TreasuryAdmin Class
// =============================================================================

/**
 * @description Admin utility class for configuring SplitterTreasury contracts
 * Provides methods for:
 * - Setting fee recipients and their shares
 * - Setting floor fee percentage
 * - Setting floor fee treasury address
 *
 * @example
 * ```typescript
 * const treasuryAdmin = new TreasuryAdmin({
 *   address: '0x...',
 *   publicClient,
 *   walletClient,
 * })
 *
 * // Update recipients
 * await treasuryAdmin.setRecipients({
 *   recipients: [
 *     { address: '0x...', shares: BigInt(7000) },
 *     { address: '0x...', shares: BigInt(3000) },
 *   ]
 * })
 *
 * // Update floor fee percentage
 * await treasuryAdmin.setFloorFeePercentage({ percentageBps: 6800 })
 * ```
 */
export class TreasuryAdmin {
  private readonly address: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ address, publicClient, walletClient }: TreasuryAdminConstructorArgs) {
    this.address = address
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  // ===========================================================================
  // Read Methods
  // ===========================================================================

  /**
   * @description Get the current treasury configuration state
   */
  public async getTreasuryState(): Promise<TTreasuryAdminState> {
    const [floorFeePercentage, floorFeeTreasury] = await Promise.all([
      this.publicClient.readContract({
        address: this.address,
        abi: SplitterTreasury_v1,
        functionName: 'getFloorFeePercentage',
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: this.address,
        abi: SplitterTreasury_v1,
        functionName: 'getFloorFeeTreasury',
      }) as Promise<Address>,
    ])

    return {
      floorFeePercentage: Number(floorFeePercentage),
      floorFeeTreasury,
      recipientCount: 0, // Would need indexer data
    }
  }

  /**
   * @description Get the current floor fee percentage
   */
  public async getFloorFeePercentage(): Promise<number> {
    const percentage = (await this.publicClient.readContract({
      address: this.address,
      abi: SplitterTreasury_v1,
      functionName: 'getFloorFeePercentage',
    })) as bigint
    return Number(percentage)
  }

  /**
   * @description Get the floor fee treasury address
   */
  public async getFloorFeeTreasury(): Promise<Address> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: SplitterTreasury_v1,
      functionName: 'getFloorFeeTreasury',
    })) as Address
  }

  // ===========================================================================
  // Write Methods
  // ===========================================================================

  /**
   * @description Set the fee recipients and their shares
   * @param params Recipients array with addresses and shares
   * @note Total shares must equal 10000 (100%)
   */
  public async setRecipients({
    recipients,
    lifecycle,
  }: TSetRecipientsParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    if (recipients.length === 0) {
      throw new Error('At least one recipient is required')
    }

    // Validate total shares equals 10000
    const totalShares = recipients.reduce((sum, r) => sum + r.shares, BigInt(0))
    if (totalShares !== BigInt(10000)) {
      throw new Error(`Total shares must equal 10000 (got ${totalShares})`)
    }

    const addresses = recipients.map((r) => r.address)
    const shares = recipients.map((r) => r.shares)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: SplitterTreasury_v1,
        functionName: 'setRecipients',
        args: [addresses, shares],
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
   * @description Set the floor fee percentage
   * @param params Percentage in basis points (0-10000)
   */
  public async setFloorFeePercentage({
    percentageBps,
    lifecycle,
  }: TSetFloorFeePercentageParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.validatePercentage(percentageBps)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: SplitterTreasury_v1,
        functionName: 'setFloorFeePercentage',
        args: [BigInt(percentageBps)],
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
   * @description Set the floor fee treasury address
   * @param params Treasury address to receive floor fees
   */
  public async setFloorFeeTreasury({
    treasuryAddress,
    lifecycle,
  }: TSetFloorFeeTreasuryParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    if (!treasuryAddress || treasuryAddress === '0x0000000000000000000000000000000000000000') {
      throw new Error('Invalid treasury address')
    }

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: SplitterTreasury_v1,
        functionName: 'setFloorFeeTreasury',
        args: [treasuryAddress],
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
  // Private Helpers
  // ===========================================================================

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

  private validatePercentage(percentageBps: number): void {
    if (percentageBps < 0 || percentageBps > 10_000) {
      throw new Error('Percentage must be between 0 and 10000 basis points (0-100%)')
    }
    if (!Number.isInteger(percentageBps)) {
      throw new Error('Percentage must be a whole number (integer basis points)')
    }
  }
}
