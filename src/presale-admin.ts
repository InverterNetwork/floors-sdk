/**
 * @description PresaleAdmin class for admin configuration of Presale contracts
 * Provides methods for state management, caps, whitelist, and commission settings
 */

import type { Address, TransactionReceipt } from 'viem'

import { Presale_v1 } from './abis'
import { PresaleState, type TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'
import { validateAddress } from './utils/validation'

// Re-export PresaleState for convenience (already exported from presale.ts)
export { PresaleState }

// =============================================================================
// Types
// =============================================================================

export interface TPresaleAdminParams {
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TPresaleAdminSetStateParams extends TPresaleAdminParams {
  /** Target presale state */
  state: PresaleState
}

export interface TPresaleAdminSetCapsParams extends TPresaleAdminParams {
  /** Global issuance cap in reserve tokens (0 = unlimited) */
  globalCap: bigint
  /** Per-address issuance cap in reserve tokens (0 = unlimited) */
  perAddressCap: bigint
}

export interface TPresaleAdminSetEndTimestampParams extends TPresaleAdminParams {
  /** Unix timestamp in seconds for presale end time */
  timestamp: bigint
}

export interface TPresaleAdminSetMerkleRootParams extends TPresaleAdminParams {
  /** The Merkle root hash (bytes32) */
  merkleRoot: `0x${string}`
}

export interface TPresaleAdminSetCommissionParams extends TPresaleAdminParams {
  /** Array of commission rates in basis points per leverage level */
  baseCommissionBps: number[]
  /** 2D array of price breakpoints per leverage level */
  priceBreakpoints: bigint[][]
}

export interface TPresaleAdminSetCreditFacilityParams extends TPresaleAdminParams {
  /** Credit facility contract address */
  creditFacility: Address
}

export interface TPresaleAdminSetInitialMultiplierParams extends TPresaleAdminParams {
  /** Initial multiplier value (uint32) */
  multiplier: number
}

export interface TPresaleAdminSetDecayDurationParams extends TPresaleAdminParams {
  /** Decay duration in seconds (uint64) */
  duration: bigint
}

export interface TPresaleAdminSetStartTimeParams extends TPresaleAdminParams {
  /** Start time as Unix timestamp (uint64) */
  startTime: bigint
}

export interface TPresaleAdminState {
  /** Current presale state (0=Closed, 1=Whitelist, 2=Live) */
  currentState: PresaleState
  /** Unix timestamp for presale end time */
  endTimestamp: bigint
  /** Global issuance cap */
  globalIssuanceCap: bigint
  /** Per-address issuance cap */
  perAddressIssuanceCap: bigint
  /** Total amount raised so far */
  globalIssuance: bigint
  /** Number of whitelisted addresses */
  whitelistCount: number
  /** Current on-chain merkle root */
  merkleRoot: `0x${string}`
  /** Commission rates per leverage level */
  baseCommissionBps: number[]
  /** Price breakpoints per leverage level */
  priceBreakpoints: bigint[][]
}

interface PresaleAdminConstructorArgs {
  /** Presale contract address */
  address: Address
  /** Public client for reading */
  publicClient: PopPublicClient
  /** Wallet client for writing (optional, required for mutations) */
  walletClient?: PopWalletClient
}

// =============================================================================
// PresaleAdmin Class
// =============================================================================

/**
 * @description Admin utility class for configuring Presale contracts
 * Provides methods for:
 * - Setting presale state (Closed, Whitelist, Live)
 * - Managing issuance caps
 * - Updating end timestamp
 * - Managing whitelist
 * - Configuring commission schedule
 *
 * @example
 * ```typescript
 * const presaleAdmin = new PresaleAdmin({
 *   address: '0x...',
 *   publicClient,
 *   walletClient,
 * })
 *
 * // Transition to live phase
 * await presaleAdmin.goLive()
 *
 * // Add addresses to whitelist
 * await presaleAdmin.setMerkleRoot({ merkleRoot: '0x...' })
 * ```
 */
export class PresaleAdmin {
  private readonly address: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ address, publicClient, walletClient }: PresaleAdminConstructorArgs) {
    this.address = address
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  // ===========================================================================
  // Read Methods
  // ===========================================================================

  /**
   * @description Get the current presale admin state
   */
  public async getPresaleState(): Promise<TPresaleAdminState> {
    const [
      currentState,
      endTimestamp,
      globalIssuanceCap,
      perAddressIssuanceCap,
      globalIssuance,
      merkleRoot,
      baseCommissionBps,
      priceBreakpoints,
    ] = await Promise.all([
      this.publicClient.readContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'getPresaleState',
      }) as Promise<number>,
      this.publicClient.readContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'getEndTimestamp',
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'getGlobalIssuanceCap',
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'getPerAddressIssuanceCap',
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'getGlobalIssuance',
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'getMerkleRoot',
      }) as Promise<`0x${string}`>,
      this.publicClient.readContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'getBaseCommissionBps',
      }) as Promise<number[]>,
      this.publicClient.readContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'getPriceBreakpoints',
      }) as Promise<bigint[][]>,
    ])

    return {
      currentState: currentState as PresaleState,
      endTimestamp,
      globalIssuanceCap,
      perAddressIssuanceCap,
      globalIssuance,
      whitelistCount: 0, // Not available from contract, would need to fetch from indexer
      merkleRoot,
      baseCommissionBps,
      priceBreakpoints,
    }
  }

  /**
   * @description Check if an address is registered via Merkle proof
   */
  public async isMerkleWhitelisted(account: Address): Promise<boolean> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'isMerkleWhitelisted',
      args: [account],
    })) as boolean
  }

  /**
   * @description Get the current Merkle root
   */
  public async getMerkleRoot(): Promise<`0x${string}`> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getMerkleRoot',
    })) as `0x${string}`
  }

  /**
   * @description Get current presale state enum value
   */
  public async getCurrentState(): Promise<PresaleState> {
    const state = (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getPresaleState',
    })) as number
    return state as PresaleState
  }

  // ===========================================================================
  // Write Methods - State Management
  // ===========================================================================

  /**
   * @description Set the presale state
   * @param params Target state and optional lifecycle callbacks
   */
  public async setPresaleState({
    state,
    lifecycle,
  }: TPresaleAdminSetStateParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'setPresaleState',
        args: [state],
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
   * @description Transition presale to Public (live) state
   * Convenience method for setPresaleState(Public)
   */
  public async goLive(params?: TPresaleAdminParams): Promise<TransactionReceipt> {
    return this.setPresaleState({ state: PresaleState.Public, lifecycle: params?.lifecycle })
  }

  /**
   * @description Close the presale
   * Convenience method for setPresaleState(Closed)
   */
  public async closePresale(params?: TPresaleAdminParams): Promise<TransactionReceipt> {
    return this.setPresaleState({ state: PresaleState.Closed, lifecycle: params?.lifecycle })
  }

  /**
   * @description Set presale to whitelist phase
   * Convenience method for setPresaleState(Whitelist)
   */
  public async setWhitelistPhase(params?: TPresaleAdminParams): Promise<TransactionReceipt> {
    return this.setPresaleState({ state: PresaleState.Whitelist, lifecycle: params?.lifecycle })
  }

  /**
   * @description Set presale to not open state
   * Convenience method for setPresaleState(NotOpen)
   */
  public async setNotOpen(params?: TPresaleAdminParams): Promise<TransactionReceipt> {
    return this.setPresaleState({ state: PresaleState.NotOpen, lifecycle: params?.lifecycle })
  }

  // ===========================================================================
  // Write Methods - Cap Configuration
  // ===========================================================================

  /**
   * @description Set global and per-address issuance caps
   */
  public async setCaps({
    globalCap,
    perAddressCap,
    lifecycle,
  }: TPresaleAdminSetCapsParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'setCaps',
        args: [globalCap, perAddressCap],
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
  // Write Methods - End Timestamp
  // ===========================================================================

  /**
   * @description Set the presale end timestamp
   */
  public async setEndTimestamp({
    timestamp,
    lifecycle,
  }: TPresaleAdminSetEndTimestampParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'setEndTimestamp',
        args: [timestamp],
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
  // Write Methods - Merkle Whitelist Management
  // ===========================================================================

  /**
   * @description Set the Merkle root for whitelist verification
   * Must be called before presale starts (NotOpen state).
   */
  public async setMerkleRoot({
    merkleRoot,
    lifecycle,
  }: TPresaleAdminSetMerkleRootParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'setMerkleRoot',
        args: [merkleRoot],
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
  // Write Methods - Commission Configuration
  // ===========================================================================

  /**
   * @description Set base commission rates and price breakpoints
   */
  public async setBaseCommissionAndPriceBreakpoints({
    baseCommissionBps,
    priceBreakpoints,
    lifecycle,
  }: TPresaleAdminSetCommissionParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    // Validate commission values are within uint16 range (0-65535)
    // and also within valid basis points range (0-10000)
    for (const bps of baseCommissionBps) {
      if (bps < 0 || bps > 10_000) {
        throw new Error(`Commission must be between 0 and 10000 bps (got ${bps})`)
      }
      if (!Number.isInteger(bps)) {
        throw new Error(`Commission must be a whole number (got ${bps})`)
      }
    }

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'setBaseCommissionBpsAndPriceBreakpoints',
        args: [baseCommissionBps, priceBreakpoints],
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
  // Write Methods - Multiplier & Decay Configuration
  // ===========================================================================

  /**
   * @description Set the credit facility address
   */
  public async setCreditFacility({
    creditFacility,
    lifecycle,
  }: TPresaleAdminSetCreditFacilityParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    validateAddress(creditFacility, 'creditFacility')

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'setCreditFacility',
        args: [creditFacility],
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
   * @description Set the initial fee multiplier
   */
  public async setInitialMultiplier({
    multiplier,
    lifecycle,
  }: TPresaleAdminSetInitialMultiplierParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'setInitialMultiplier',
        args: [multiplier],
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
   * @description Set the decay duration
   */
  public async setDecayDuration({
    duration,
    lifecycle,
  }: TPresaleAdminSetDecayDurationParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'setDecayDuration',
        args: [duration],
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
   * @description Set the decay start time
   */
  public async setStartTime({
    startTime,
    lifecycle,
  }: TPresaleAdminSetStartTimeParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.address,
        abi: Presale_v1,
        functionName: 'setStartTime',
        args: [startTime],
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
}
