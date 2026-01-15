/**
 * @description CreditFacilityAdmin class for admin configuration of Credit Facility contracts
 * Provides methods for updating LTV, borrowing fees, and max leverage
 */

import type { Address, TransactionReceipt } from 'viem'

import { CreditFacility_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'

// =============================================================================
// Types
// =============================================================================

export interface TCreditFacilityAdminParams {
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TSetLTVParams extends TCreditFacilityAdminParams {
  /** Loan-to-value ratio in basis points (e.g., 9000 = 90%) */
  ltvBps: number
}

export interface TSetBorrowingFeeParams extends TCreditFacilityAdminParams {
  /** Borrowing fee rate in basis points (e.g., 600 = 6%) */
  feeBps: number
}

export interface TSetMaxLeverageParams extends TCreditFacilityAdminParams {
  /** Maximum leverage multiplier (e.g., 25 = 25x) */
  maxLeverage: number
}

export interface TCreditFacilityAdminState {
  /** Current LTV ratio in basis points */
  ltvBps: number
  /** Current borrowing fee rate in basis points */
  borrowingFeeBps: number
  /** Current maximum leverage multiplier */
  maxLeverage: number
  /** Total number of loans */
  totalLoans: bigint
  /** Total debt outstanding */
  totalDebt: bigint
  /** Total collateral locked */
  totalCollateral: bigint
}

interface CreditFacilityAdminConstructorArgs {
  /** Credit Facility contract address */
  address: Address
  /** Public client for reading */
  publicClient: PopPublicClient
  /** Wallet client for writing (optional, required for mutations) */
  walletClient?: PopWalletClient
}

// =============================================================================
// CreditFacilityAdmin Class
// =============================================================================

/**
 * @description Admin utility class for configuring Credit Facility contracts
 * Provides methods for:
 * - Setting loan-to-value ratio
 * - Setting borrowing fee rate
 * - Setting maximum leverage
 *
 * @example
 * ```typescript
 * const creditAdmin = new CreditFacilityAdmin({
 *   address: '0x...',
 *   publicClient,
 *   walletClient,
 * })
 *
 * // Update LTV to 95%
 * await creditAdmin.setLoanToValueRatio({ ltvBps: 9500 })
 *
 * // Set borrowing fee to 5%
 * await creditAdmin.setBorrowingFeeRate({ feeBps: 500 })
 * ```
 */
export class CreditFacilityAdmin {
  private readonly address: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ address, publicClient, walletClient }: CreditFacilityAdminConstructorArgs) {
    this.address = address
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  // ===========================================================================
  // Read Methods
  // ===========================================================================

  /**
   * @description Get the current credit facility configuration state
   */
  public async getCreditFacilityState(): Promise<TCreditFacilityAdminState> {
    const [ltvBps, borrowingFeeBps, maxLeverage] = await Promise.all([
      this.publicClient.readContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'getLoanToValueRatio',
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'getBorrowingFeeRate',
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'getMaxLeverage',
      }) as Promise<bigint>,
    ])

    return {
      ltvBps: Number(ltvBps),
      borrowingFeeBps: Number(borrowingFeeBps),
      maxLeverage: Number(maxLeverage),
      // These would require additional reads or indexer data
      totalLoans: BigInt(0),
      totalDebt: BigInt(0),
      totalCollateral: BigInt(0),
    }
  }

  /**
   * @description Get the current loan-to-value ratio
   */
  public async getLoanToValueRatio(): Promise<number> {
    const ltv = (await this.publicClient.readContract({
      address: this.address,
      abi: CreditFacility_v1,
      functionName: 'getLoanToValueRatio',
    })) as bigint
    return Number(ltv)
  }

  /**
   * @description Get the current borrowing fee rate
   */
  public async getBorrowingFeeRate(): Promise<number> {
    const fee = (await this.publicClient.readContract({
      address: this.address,
      abi: CreditFacility_v1,
      functionName: 'getBorrowingFeeRate',
    })) as bigint
    return Number(fee)
  }

  /**
   * @description Get the maximum leverage multiplier
   */
  public async getMaxLeverage(): Promise<number> {
    const leverage = (await this.publicClient.readContract({
      address: this.address,
      abi: CreditFacility_v1,
      functionName: 'getMaxLeverage',
    })) as bigint
    return Number(leverage)
  }

  // ===========================================================================
  // Write Methods
  // ===========================================================================

  /**
   * @description Set the loan-to-value ratio
   * @param params LTV in basis points (1-9900) and optional lifecycle callbacks
   */
  public async setLoanToValueRatio({
    ltvBps,
    lifecycle,
  }: TSetLTVParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.validateLTV(ltvBps)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'setLoanToValueRatio',
        args: [BigInt(ltvBps)],
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
   * @description Set the borrowing fee rate
   * @param params Fee in basis points (0-10000) and optional lifecycle callbacks
   */
  public async setBorrowingFeeRate({
    feeBps,
    lifecycle,
  }: TSetBorrowingFeeParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.validateFeeBps(feeBps)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'setBorrowingFeeRate',
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

  /**
   * @description Set the maximum leverage multiplier
   * @param params Max leverage (1-255) and optional lifecycle callbacks
   */
  public async setMaxLeverage({
    maxLeverage,
    lifecycle,
  }: TSetMaxLeverageParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.validateMaxLeverage(maxLeverage)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'setMaxLeverage',
        args: [BigInt(maxLeverage)],
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

  private validateLTV(ltvBps: number): void {
    if (ltvBps < 1 || ltvBps > 9900) {
      throw new Error('LTV must be between 1 and 9900 basis points (0.01-99%)')
    }
    if (!Number.isInteger(ltvBps)) {
      throw new Error('LTV must be a whole number (integer basis points)')
    }
  }

  private validateFeeBps(feeBps: number): void {
    if (feeBps < 0 || feeBps > 10_000) {
      throw new Error('Fee must be between 0 and 10000 basis points (0-100%)')
    }
    if (!Number.isInteger(feeBps)) {
      throw new Error('Fee must be a whole number (integer basis points)')
    }
  }

  private validateMaxLeverage(leverage: number): void {
    if (leverage < 1 || leverage > 255) {
      throw new Error('Max leverage must be between 1 and 255')
    }
    if (!Number.isInteger(leverage)) {
      throw new Error('Max leverage must be a whole number')
    }
  }
}
