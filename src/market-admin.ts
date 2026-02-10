/**
 * @description MarketAdmin class for admin configuration of Floor Markets
 * Provides methods for opening/closing trading, setting fees, and floor elevation
 */

import type { Address, TransactionReceipt } from 'viem'

import { Floor_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'

// =============================================================================
// Types
// =============================================================================

export interface TMarketAdminParams {
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TRaiseFloorParams extends TMarketAdminParams {
  /** Amount of collateral to use for floor elevation (0 = use accumulated fees) */
  collateralAmount?: bigint
}

export interface TSetFeeParams extends TMarketAdminParams {
  /** Fee in basis points (0-10000) */
  feeBps: number
}

export interface TReconfigureSegmentsParams extends TMarketAdminParams {
  /** Array of segment identifiers (bytes32[]) */
  segments: `0x${string}`[]
  /** Supplied collateral amount */
  suppliedCollateral: bigint
  /** Whether the collateral is self-supplied */
  selfSupplied: boolean
}

export interface TSetVirtualCollateralSupplyParams extends TMarketAdminParams {
  /** Virtual collateral supply amount */
  virtualSupply: bigint
}

export interface TWithdrawCollateralParams extends TMarketAdminParams {
  /** Amount to withdraw */
  amount: bigint
}

export interface TDepositCollateralParams extends TMarketAdminParams {
  /** Amount to deposit */
  amount: bigint
}

export interface TMarketAdminState {
  /** Whether buying is enabled */
  isBuyOpen: boolean
  /** Whether selling is enabled */
  isSellOpen: boolean
  /** Current buy fee in basis points */
  buyFeeBps: number
  /** Current sell fee in basis points */
  sellFeeBps: number
  /** Current floor price in reserve tokens (raw) */
  floorPrice: bigint
  /** Current market price in reserve tokens (raw) */
  currentPrice: bigint
  /** Virtual collateral supply */
  virtualCollateralSupply: bigint
}

interface MarketAdminConstructorArgs {
  /** Floor/Market contract address */
  address: Address
  /** Public client for reading */
  publicClient: PopPublicClient
  /** Wallet client for writing (optional, required for mutations) */
  walletClient?: PopWalletClient
}

// =============================================================================
// MarketAdmin Class
// =============================================================================

/**
 * @description Admin utility class for configuring Floor Markets
 * Provides methods for:
 * - Opening/closing buy and sell
 * - Setting buy and sell fees
 * - Raising the floor price
 * - Reading market configuration state
 *
 * @example
 * ```typescript
 * const marketAdmin = new MarketAdmin({
 *   address: '0x...',
 *   publicClient,
 *   walletClient,
 * })
 *
 * // Check current state
 * const state = await marketAdmin.getMarketState()
 *
 * // Enable selling
 * await marketAdmin.openSell()
 *
 * // Update buy fee
 * await marketAdmin.setBuyFee({ feeBps: 100 }) // 1%
 * ```
 */
export class MarketAdmin {
  private readonly address: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ address, publicClient, walletClient }: MarketAdminConstructorArgs) {
    this.address = address
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  // ===========================================================================
  // Read Methods
  // ===========================================================================

  /**
   * @description Get the current market configuration state
   * @returns Market state including trading status, fees, and prices
   */
  public async getMarketState(): Promise<TMarketAdminState> {
    const [isBuyOpen, isSellOpen, buyFeeBps, sellFeeBps, floorPrice, currentPrice, virtualSupply] =
      await Promise.all([
        this.publicClient.readContract({
          address: this.address,
          abi: Floor_v1,
          functionName: 'isBuyOpen',
        }) as Promise<boolean>,
        this.publicClient.readContract({
          address: this.address,
          abi: Floor_v1,
          functionName: 'isSellOpen',
        }) as Promise<boolean>,
        this.publicClient.readContract({
          address: this.address,
          abi: Floor_v1,
          functionName: 'getBuyFee',
        }) as Promise<bigint>,
        this.publicClient.readContract({
          address: this.address,
          abi: Floor_v1,
          functionName: 'getSellFee',
        }) as Promise<bigint>,
        this.publicClient.readContract({
          address: this.address,
          abi: Floor_v1,
          functionName: 'getFloorPrice',
        }) as Promise<bigint>,
        this.publicClient.readContract({
          address: this.address,
          abi: Floor_v1,
          functionName: 'getStaticPriceForBuying',
        }) as Promise<bigint>,
        this.publicClient.readContract({
          address: this.address,
          abi: Floor_v1,
          functionName: 'getVirtualCollateralSupply',
        }) as Promise<bigint>,
      ])

    return {
      isBuyOpen,
      isSellOpen,
      buyFeeBps: Number(buyFeeBps),
      sellFeeBps: Number(sellFeeBps),
      floorPrice,
      currentPrice,
      virtualCollateralSupply: virtualSupply,
    }
  }

  /**
   * @description Check if buying is currently enabled
   */
  public async isBuyOpen(): Promise<boolean> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'isBuyOpen',
    })) as boolean
  }

  /**
   * @description Check if selling is currently enabled
   */
  public async isSellOpen(): Promise<boolean> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'isSellOpen',
    })) as boolean
  }

  /**
   * @description Get the current buy fee in basis points
   */
  public async getBuyFee(): Promise<number> {
    const fee = (await this.publicClient.readContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'getBuyFee',
    })) as bigint
    return Number(fee)
  }

  /**
   * @description Get the current sell fee in basis points
   */
  public async getSellFee(): Promise<number> {
    const fee = (await this.publicClient.readContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'getSellFee',
    })) as bigint
    return Number(fee)
  }

  // ===========================================================================
  // Write Methods - Trading Status
  // ===========================================================================

  /**
   * @description Enable buying on the market
   * @param params Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async openBuy(params?: TMarketAdminParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      params?.lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'openBuy',
        account: this.getWalletAddress(walletClient),
      })

      params?.lifecycle?.onSubmitted?.(hash)
      params?.lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        params?.lifecycle?.onConfirmed?.(receipt)
      } else {
        params?.lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      params?.lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Disable buying on the market
   * @param params Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async closeBuy(params?: TMarketAdminParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      params?.lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'closeBuy',
        account: this.getWalletAddress(walletClient),
      })

      params?.lifecycle?.onSubmitted?.(hash)
      params?.lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        params?.lifecycle?.onConfirmed?.(receipt)
      } else {
        params?.lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      params?.lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Enable selling on the market
   * @param params Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async openSell(params?: TMarketAdminParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      params?.lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'openSell',
        account: this.getWalletAddress(walletClient),
      })

      params?.lifecycle?.onSubmitted?.(hash)
      params?.lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        params?.lifecycle?.onConfirmed?.(receipt)
      } else {
        params?.lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      params?.lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  /**
   * @description Disable selling on the market
   * @param params Optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async closeSell(params?: TMarketAdminParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      params?.lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'closeSell',
        account: this.getWalletAddress(walletClient),
      })

      params?.lifecycle?.onSubmitted?.(hash)
      params?.lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        params?.lifecycle?.onConfirmed?.(receipt)
      } else {
        params?.lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      params?.lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  // ===========================================================================
  // Write Methods - Fee Configuration
  // ===========================================================================

  /**
   * @description Set the buy fee
   * @param params Fee in basis points (0-10000) and optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async setBuyFee({ feeBps, lifecycle }: TSetFeeParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.validateFeeBps(feeBps)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'setBuyFee',
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
   * @description Set the sell fee
   * @param params Fee in basis points (0-10000) and optional lifecycle callbacks
   * @returns Transaction receipt
   */
  public async setSellFee({ feeBps, lifecycle }: TSetFeeParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.validateFeeBps(feeBps)

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'setSellFee',
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
  // Write Methods - Floor Elevation
  // ===========================================================================

  /**
   * @description Manually trigger floor price elevation
   * Uses accumulated fees to raise the floor price
   * @param params Optional collateral amount and lifecycle callbacks
   * @returns Transaction receipt
   */
  public async raiseFloor(params?: TRaiseFloorParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    const collateralAmount = params?.collateralAmount ?? BigInt(0)

    try {
      params?.lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'raiseFloor',
        args: [collateralAmount],
        account: this.getWalletAddress(walletClient),
      })

      params?.lifecycle?.onSubmitted?.(hash)
      params?.lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        params?.lifecycle?.onConfirmed?.(receipt)
      } else {
        params?.lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      params?.lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }

  // ===========================================================================
  // Write Methods - Segment & Collateral Management
  // ===========================================================================

  /**
   * @description Reconfigure bonding curve segments
   */
  public async reconfigureSegments({
    segments,
    suppliedCollateral,
    selfSupplied,
    lifecycle,
  }: TReconfigureSegmentsParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'reconfigureSegments',
        args: [segments, suppliedCollateral, selfSupplied],
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
   * @description Set the virtual collateral supply
   */
  public async setVirtualCollateralSupply({
    virtualSupply,
    lifecycle,
  }: TSetVirtualCollateralSupplyParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'setVirtualCollateralSupply',
        args: [virtualSupply],
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
   * @description Withdraw collateral from the market
   */
  public async withdrawCollateralTo({
    amount,
    lifecycle,
  }: TWithdrawCollateralParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'withdrawCollateralTo',
        args: [amount],
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
   * @description Deposit collateral into the market
   */
  public async depositCollateralFrom({
    amount,
    lifecycle,
  }: TDepositCollateralParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'depositCollateralFrom',
        args: [amount],
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

  private validateFeeBps(feeBps: number): void {
    if (feeBps < 0 || feeBps > 10_000) {
      throw new Error('Fee must be between 0 and 10000 basis points (0-100%)')
    }
    if (!Number.isInteger(feeBps)) {
      throw new Error('Fee must be a whole number (integer basis points)')
    }
  }
}
