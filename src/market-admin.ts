/**
 * @description MarketAdmin class for admin configuration of Floor Markets
 * Provides methods for opening/closing trading, setting fees, and floor elevation
 */

import type { Address, Log, TransactionReceipt } from 'viem'
import { decodeEventLog, parseAbiItem } from 'viem'

import { Floor_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'
import { assertPositiveAmount, validateNonNegativeBigint } from './utils/validation'

// =============================================================================
// Types
// =============================================================================

export interface TMarketAdminParams {
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TRaiseFloorParams extends TMarketAdminParams {
  /** Amount of collateral to transfer from caller for floor elevation */
  collateralAmount: bigint
}

export interface TApproveCollateralParams extends TMarketAdminParams {
  /** Amount of collateral tokens to approve */
  amount: bigint
}

export interface TFloorIncreasedEvent {
  oldFloorPrice: bigint
  newFloorPrice: bigint
  collateralConsumed: bigint
  supplyIncrease: bigint
  blockNumber: bigint
  transactionHash: `0x${string}`
}

export interface TRaiseFloorPreview {
  oldFloorPrice: bigint
  newFloorPrice: bigint
  collateralConsumed: bigint
  supplyIncrease: bigint
}

export interface TRaiseFloorContext {
  /** Admin's collateral token balance */
  adminBalance: bigint
  /** Current allowance for the market contract */
  allowance: bigint
  /** Last FloorIncreased event (if any) */
  lastFloorRaise: TFloorIncreasedEvent | null
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
  /** Collateral (reserve) token address */
  collateralTokenAddress: Address
  /** Collateral (reserve) token decimals */
  collateralTokenDecimals: number
  /** Reserve token balance held by market contract (backs the bonding curve) */
  reserveBalance: bigint
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
  private cachedCollateralTokenAddress: Address | null = null

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
    const erc20BalanceOfAbi = [
      {
        type: 'function',
        name: 'balanceOf',
        inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
      },
    ] as const

    // First batch: read market state + collateral token address
    const [
      isBuyOpen,
      isSellOpen,
      buyFeeBps,
      sellFeeBps,
      floorPrice,
      currentPrice,
      virtualSupply,
      collateralTokenAddress,
    ] = await Promise.all([
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
      this.publicClient.readContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'getCollateralToken',
      }) as Promise<Address>,
    ])

    // Second batch: reserve balance + decimals from collateral token
    const [reserveBalance, collateralTokenDecimals] = await Promise.all([
      this.publicClient.readContract({
        address: collateralTokenAddress,
        abi: erc20BalanceOfAbi,
        functionName: 'balanceOf',
        args: [this.address],
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: collateralTokenAddress,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }) as Promise<number>,
    ])

    return {
      isBuyOpen,
      isSellOpen,
      buyFeeBps: Number(buyFeeBps),
      sellFeeBps: Number(sellFeeBps),
      floorPrice,
      currentPrice,
      virtualCollateralSupply: virtualSupply,
      collateralTokenAddress,
      collateralTokenDecimals,
      reserveBalance,
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
  // Read Methods - Raise Floor Context
  // ===========================================================================

  /**
   * @description Get the collateral token address (cached after first call)
   */
  public async getCollateralTokenAddress(): Promise<Address> {
    if (this.cachedCollateralTokenAddress) {
      return this.cachedCollateralTokenAddress
    }

    const address = (await this.publicClient.readContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'getCollateralToken',
    })) as Address

    this.cachedCollateralTokenAddress = address
    return address
  }

  /**
   * @description Get the admin's collateral token balance
   */
  public async getAdminCollateralBalance(ownerAddress: Address): Promise<bigint> {
    const collateralToken = await this.getCollateralTokenAddress()

    return (await this.publicClient.readContract({
      address: collateralToken,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [ownerAddress],
    })) as bigint
  }

  /**
   * @description Get the current allowance of the collateral token for the market contract
   */
  public async getCollateralAllowance(ownerAddress: Address): Promise<bigint> {
    const collateralToken = await this.getCollateralTokenAddress()

    return (await this.publicClient.readContract({
      address: collateralToken,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: [ownerAddress, this.address],
    })) as bigint
  }

  /**
   * @description Get all context needed for the raise floor UI in a single call
   */
  public async getRaiseFloorContext(ownerAddress: Address): Promise<TRaiseFloorContext> {
    const collateralToken = await this.getCollateralTokenAddress()

    const [adminBalance, allowance] = await Promise.all([
      this.publicClient.readContract({
        address: collateralToken,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [ownerAddress],
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: collateralToken,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [ownerAddress, this.address],
      }) as Promise<bigint>,
    ])

    const lastFloorRaise = await this.getLastFloorIncreasedEvent()

    return { adminBalance, allowance, lastFloorRaise }
  }

  /**
   * @description Simulate raiseFloor to preview the result without sending a tx
   */
  public async simulateRaiseFloor(
    collateralAmount: bigint,
    accountAddress: Address
  ): Promise<TRaiseFloorPreview> {
    const { result, request } = await this.publicClient.simulateContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'raiseFloor',
      args: [collateralAmount],
      account: accountAddress,
    })

    // raiseFloor returns void, so we need to get the event from the simulation
    // viem's simulateContract doesn't give us events, so we use a different approach:
    // Read current floor price, then calculate what the new state would be
    // by using the contract's view functions after simulation
    // Since simulateContract doesn't return events, we read current state
    // and let the UI show the delta after the real tx via receipt logs
    void result
    void request

    // Fallback: read current floor price for comparison
    const currentFloorPrice = (await this.publicClient.readContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'getFloorPrice',
    })) as bigint

    return {
      oldFloorPrice: currentFloorPrice,
      // These will be accurate after the real tx; simulation confirms it won't revert
      newFloorPrice: BigInt(0),
      collateralConsumed: collateralAmount,
      supplyIncrease: BigInt(0),
    }
  }

  /**
   * @description Get the most recent FloorIncreased event
   */
  public async getLastFloorIncreasedEvent(): Promise<TFloorIncreasedEvent | null> {
    try {
      const logs = await this.publicClient.getLogs({
        address: this.address,
        event: parseAbiItem(
          'event FloorIncreased(uint256 oldFloorPrice_, uint256 newFloorPrice_, uint256 collateralConsumed_, uint256 supplyIncrease_)'
        ),
        fromBlock: 'earliest',
        toBlock: 'latest',
      })

      if (logs.length === 0) return null

      const lastLog = logs[logs.length - 1]!
      const blockNumber = lastLog.blockNumber
      const transactionHash = lastLog.transactionHash
      if (blockNumber == null || transactionHash == null) return null

      const args = lastLog.args as {
        oldFloorPrice_: bigint
        newFloorPrice_: bigint
        collateralConsumed_: bigint
        supplyIncrease_: bigint
      }

      return {
        oldFloorPrice: args.oldFloorPrice_,
        newFloorPrice: args.newFloorPrice_,
        collateralConsumed: args.collateralConsumed_,
        supplyIncrease: args.supplyIncrease_,
        blockNumber,
        transactionHash,
      }
    } catch {
      return null
    }
  }

  /**
   * @description Parse FloorIncreased event from a transaction receipt
   */
  public static parseFloorIncreasedFromReceipt(logs: Log[]): TFloorIncreasedEvent | null {
    for (const log of logs) {
      try {
        const decoded = decodeEventLog({
          abi: Floor_v1,
          data: log.data,
          topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
        })
        if (decoded.eventName === 'FloorIncreased') {
          const args = decoded.args as {
            oldFloorPrice_: bigint
            newFloorPrice_: bigint
            collateralConsumed_: bigint
            supplyIncrease_: bigint
          }
          return {
            oldFloorPrice: args.oldFloorPrice_,
            newFloorPrice: args.newFloorPrice_,
            collateralConsumed: args.collateralConsumed_,
            supplyIncrease: args.supplyIncrease_,
            blockNumber: log.blockNumber ?? BigInt(0),
            transactionHash: log.transactionHash ?? '0x',
          }
        }
      } catch {
        // Not our event, skip
      }
    }
    return null
  }

  // ===========================================================================
  // Write Methods - Collateral Approval
  // ===========================================================================

  /**
   * @description Approve collateral tokens for the market contract to pull during raiseFloor
   */
  public async approveCollateral({
    amount,
    lifecycle,
  }: TApproveCollateralParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    validateNonNegativeBigint(amount, 'amount')
    const collateralToken = await this.getCollateralTokenAddress()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: collateralToken,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [this.address, amount],
        account: this.getWalletAddress(walletClient),
      })

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Approval transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
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
        functionName: 'enableBuy',
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
        functionName: 'disableBuy',
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
        functionName: 'enableSell',
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
        functionName: 'disableSell',
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
   * @description Raise the floor price by injecting collateral from the caller's wallet
   * @param params Collateral amount (required, must be > 0) and lifecycle callbacks
   * @returns Transaction receipt containing FloorIncreased event
   * @note Caller must first approve sufficient collateral via approveCollateral()
   */
  public async raiseFloor(params: TRaiseFloorParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    const { collateralAmount, lifecycle } = params

    if (collateralAmount <= BigInt(0)) {
      throw new Error('Collateral amount must be greater than 0')
    }

    const account = this.getWalletAddress(walletClient)

    try {
      lifecycle?.onPendingWallet?.()

      // Simulate first to surface revert reasons (wallets often swallow them)
      await this.publicClient.simulateContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'raiseFloor',
        args: [collateralAmount],
        account,
      })

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Floor_v1,
        functionName: 'raiseFloor',
        args: [collateralAmount],
        account,
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
    if (!segments?.length) {
      throw new Error('segments must be a non-empty array')
    }
    validateNonNegativeBigint(suppliedCollateral, 'suppliedCollateral')

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
    validateNonNegativeBigint(virtualSupply, 'virtualSupply')

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
    assertPositiveAmount(amount, 'amount')

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
    assertPositiveAmount(amount, 'amount')

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

// =============================================================================
// Minimal ERC20 ABI for allowance/approve/balanceOf
// =============================================================================

const ERC20_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
] as const
