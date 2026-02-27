/**
 * @description CreditFacilityAdmin class for admin configuration of Credit Facility contracts
 * Provides methods for updating LTV, borrowing fees, and max leverage
 */

import type { Address, TransactionReceipt } from 'viem'

import { CreditFacility_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'
import { validateLoopCount, validateMaxLeverage } from './utils/validation'

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

export interface TTransferLoanParams extends TCreditFacilityAdminParams {
  /** Loan ID to transfer */
  loanId: bigint
  /** New borrower address */
  newBorrower: Address
}

export interface TRebalanceLoanParams extends TCreditFacilityAdminParams {
  /** Loan ID to rebalance */
  loanId: bigint
}

export interface TConsolidateLoansParams extends TCreditFacilityAdminParams {
  /** Array of loan IDs to consolidate (must be >= 2) */
  loanIds: bigint[]
}

export interface TBorrowForParams extends TCreditFacilityAdminParams {
  /** Receiver address for the borrowed funds */
  receiver: Address
  /** Amount to borrow */
  requestedLoanAmount: bigint
}

export interface TBuyAndBorrowForParams extends TCreditFacilityAdminParams {
  /** Receiver address */
  receiver: Address
  /** Amount of reserve tokens */
  amount: bigint
  /** Leverage multiplier (>= 1) */
  leverage: number
  /** Whether to consolidate with existing loans */
  consolidate?: boolean
  /** Minimum amount out (slippage protection) */
  minAmountOut?: bigint
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
        functionName: 'getMaxLoops',
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
      functionName: 'getMaxLoops',
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
    this.validateMaxLeverageParam(maxLeverage)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'setMaxLoops',
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

  /**
   * @description Transfer a loan to a new borrower
   */
  public async transferLoan({
    loanId,
    newBorrower,
    lifecycle,
  }: TTransferLoanParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'transferLoan',
        args: [loanId, newBorrower],
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
   * @description Rebalance a loan
   */
  public async rebalanceLoan({
    loanId,
    lifecycle,
  }: TRebalanceLoanParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'rebalanceLoan',
        args: [loanId],
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
   * @description Consolidate multiple loans into one
   * @param params Loan IDs (must be >= 2) and optional lifecycle callbacks
   */
  public async consolidateLoans({
    loanIds,
    lifecycle,
  }: TConsolidateLoansParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    if (loanIds.length < 2) {
      throw new Error('At least 2 loan IDs are required for consolidation')
    }

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'consolidateLoans',
        args: [loanIds],
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
   * @description Borrow on behalf of a receiver
   */
  public async borrowFor({
    receiver,
    requestedLoanAmount,
    lifecycle,
  }: TBorrowForParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'borrowFor',
        args: [receiver, requestedLoanAmount],
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
   * @description Buy and borrow on behalf of a receiver with leverage
   */
  public async buyAndBorrowFor({
    receiver,
    amount,
    leverage,
    consolidate = false,
    minAmountOut = BigInt(0),
    lifecycle,
  }: TBuyAndBorrowForParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    validateLoopCount(leverage)

    const loops = BigInt(leverage)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: CreditFacility_v1,
        functionName: 'buyAndBorrowFor',
        args: [receiver, amount, loops, consolidate, minAmountOut],
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

  private validateMaxLeverageParam(leverage: number): void {
    validateMaxLeverage(leverage)
  }
}
