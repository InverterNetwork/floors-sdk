import type { Address, TransactionReceipt } from 'viem'
import { encodeFunctionData, getAddress } from 'viem'

import { AUT_Roles_v2, CreditFacility_v1, Floor_v1, TransactionForwarder_v1 } from './abis'
import ERC20Issuance_v1 from './abis/ERC20Issuance_v1'
import Presale_v1 from './abis/Presale_v1'
import type { TPresale } from './graphql/api'
import type { PopPublicClient, PopWalletClient } from './types'
import { SafeWrite } from './utils/safe-write'
import {
  CREDIT_FACILITY_SELECTORS,
  DEFAULT_LIVE_BORROW_FEE_BPS,
  DEFAULT_LIVE_BUY_FEE_BPS,
  FLOOR_SELECTORS,
  PRESALE_SELECTORS,
  PUBLIC_ROLE,
  type SingleCall,
} from './utils/selectors'
import { validateLoopCount } from './utils/validation'

// Re-export presale selectors for convenience
export { PRESALE_SELECTORS }

// ============================================================================
// Transaction Lifecycle Types
// ============================================================================

export type TransactionStage =
  | 'idle'
  | 'pending_wallet' // Waiting for user to sign in wallet
  | 'submitted' // Transaction submitted to mempool (has hash)
  | 'pending_confirmation' // Waiting for block confirmation
  | 'confirmed' // Transaction confirmed
  | 'failed' // Transaction failed or reverted

export interface TransactionLifecycleCallbacks {
  /** Called when waiting for user to sign in wallet */
  onPendingWallet?: () => void
  /** Called when transaction is submitted (has hash) */
  onSubmitted?: (hash: `0x${string}`) => void
  /** Called when waiting for blockchain confirmation */
  onPendingConfirmation?: (hash: `0x${string}`) => void
  /** Called when transaction is confirmed */
  onConfirmed?: (receipt: TransactionReceipt) => void
  /** Called when transaction fails */
  onFailed?: (error: Error) => void
}

export interface TPresaleBuyParams {
  depositAmount: bigint
  /** Minimum tokens to receive — reverts with Presale__SlippageExceeded if not met. Defaults to 0 (no protection). */
  minAmountOut?: bigint
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TPresaleBuyWithLeverageParams {
  depositAmount: bigint
  leverageIndex: number
  /** Minimum tokens to receive — reverts with Presale__SlippageExceeded if not met. Defaults to 0 (no protection). */
  minAmountOut?: bigint
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TPresaleSimulateBuyParams {
  depositAmount: bigint
  account: Address
}

export interface TPresaleSimulateBuyWithLeverageParams {
  depositAmount: bigint
  leverageIndex: number
  account: Address
}

export interface TPresaleSimulateBuyResult {
  positionId: bigint
  feePaid: bigint
  tokensMinted: bigint
}

export interface TPresaleClaimParams {
  positionId: bigint
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TPresaleApproveParams {
  amount: bigint
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

export type TPresaleMutationResult = TransactionReceipt

export interface TPresalePosition {
  owner: Address
  netAllocation: bigint
  totalMinted: bigint
  loopCount: bigint
  loanIds: bigint[]
  directTokens: bigint
}

export interface TPresalePositionState {
  claimableTokens: bigint
  lockedTokens: bigint
  claimedTokens: bigint
}

export interface TPresalePositionWithState extends TPresalePosition {
  positionId: bigint
  state: TPresalePositionState
}

// ============================================================================
// Presale State Enum (matches contract IPresale_v1.PresaleState)
// ============================================================================

/**
 * @description Presale state enum matching the contract's PresaleState
 */
export enum PresaleState {
  NotOpen = 0,
  Whitelist = 1,
  Public = 2,
  Closed = 3,
}

// ============================================================================
// Transition Types
// ============================================================================

/**
 * @description Permission status for a specific function
 */
export interface TPermissionStatus {
  /** Whether PUBLIC_ROLE has permission */
  isPublic: boolean
  /** Role IDs that have permission */
  roleIds: `0x${string}`[]
}

/**
 * @description Current transition status showing what's configured vs what's needed for live
 */
export interface TPresaleTransitionStatus {
  /** Current presale state */
  presaleState: PresaleState
  /** Whether presale is closed */
  isPresaleClosed: boolean
  /** Current Floor buy fee in basis points */
  floorBuyFee: number
  /** Whether Floor sell is open */
  floorSellOpen: boolean
  /** Current CreditFacility borrow fee in basis points (0 if no credit facility) */
  creditFacilityBorrowFee: number
  /** Permission status for key functions */
  permissions: {
    floorBuyPublic: boolean
    floorBuyForPublic: boolean
    floorSellPublic: boolean
    floorSellToPublic: boolean
    cfBorrowPublic: boolean
    cfBorrowForPublic: boolean
    cfBuyAndBorrowPublic: boolean
    cfBuyAndBorrowForPublic: boolean
  }
  /** Whether all conditions are met for live phase */
  readyForLive: boolean
  /** List of steps still required to go live */
  missingSteps: string[]
}

/**
 * @description Parameters for getting transition status
 */
export interface TGetTransitionStatusParams {
  /** Floor/Market contract address */
  floorAddress: Address
  /** Authorizer contract address */
  authorizerAddress: Address
  /** Credit facility contract address (optional) */
  creditFacilityAddress?: Address
}

/**
 * @description Parameters for the atomic goLive transition
 */
export interface TGoLiveParams {
  /** TransactionForwarder contract address for multicall */
  transactionForwarderAddress: Address
  /** Floor/Market contract address */
  floorAddress: Address
  /** Authorizer contract address */
  authorizerAddress: Address
  /** Credit facility contract address (optional, if deployed) */
  creditFacilityAddress?: Address
  /** Live buy fee in basis points (default: 50 = 0.5%) */
  liveBuyFeeBps?: number
  /** Live borrow fee in basis points (default: 600 = 6%) */
  liveBorrowFeeBps?: number
  /** Optional lifecycle callbacks for multi-stage feedback */
  lifecycle?: TransactionLifecycleCallbacks
}

/**
 * @description Parameters for setting live fees
 */
export interface TSetLiveFeesParams {
  /** TransactionForwarder contract address for multicall */
  transactionForwarderAddress: Address
  /** Floor/Market contract address */
  floorAddress: Address
  /** Credit facility contract address (optional) */
  creditFacilityAddress?: Address
  /** Buy fee in basis points (default: 50 = 0.5%) */
  buyFeeBps?: number
  /** Borrow fee in basis points (default: 600 = 6%) */
  borrowFeeBps?: number
  /** Optional lifecycle callbacks */
  lifecycle?: TransactionLifecycleCallbacks
}

/**
 * @description Parameters for enabling public trading
 */
export interface TEnablePublicTradingParams {
  /** TransactionForwarder contract address for multicall */
  transactionForwarderAddress: Address
  /** Floor/Market contract address */
  floorAddress: Address
  /** Authorizer contract address */
  authorizerAddress: Address
  /** Optional lifecycle callbacks */
  lifecycle?: TransactionLifecycleCallbacks
}

/**
 * @description Parameters for enabling public borrowing
 */
export interface TEnablePublicBorrowingParams {
  /** TransactionForwarder contract address for multicall */
  transactionForwarderAddress: Address
  /** Credit facility contract address */
  creditFacilityAddress: Address
  /** Authorizer contract address */
  authorizerAddress: Address
  /** Optional lifecycle callbacks */
  lifecycle?: TransactionLifecycleCallbacks
}

/**
 * @description Admin parameters for setting presale state
 */
export interface TSetPresaleStateParams {
  /** New presale state */
  state: PresaleState
  /** Optional lifecycle callbacks */
  lifecycle?: TransactionLifecycleCallbacks
}

/**
 * @description Admin parameters for setting caps
 */
export interface TSetCapsParams {
  /** Global issuance cap (0 to disable) */
  globalCap: bigint
  /** Per-address issuance cap (0 to disable) */
  perAddressCap: bigint
  /** Optional lifecycle callbacks */
  lifecycle?: TransactionLifecycleCallbacks
}

/**
 * @description Admin parameters for setting end timestamp
 */
export interface TSetEndTimestampParams {
  /** End timestamp in seconds */
  endTimestamp: bigint
  /** Optional lifecycle callbacks */
  lifecycle?: TransactionLifecycleCallbacks
}

/**
 * @description Admin parameters for setting Merkle root
 */
export interface TSetMerkleRootParams {
  /** The Merkle root hash (bytes32) */
  merkleRoot: `0x${string}`
  /** Optional lifecycle callbacks */
  lifecycle?: TransactionLifecycleCallbacks
}

/**
 * @description User parameters for self-registering with Merkle proof
 */
export interface TAddToWhitelistWithProofParams {
  /** The Merkle proof (array of bytes32 hashes) */
  proof: `0x${string}`[]
  /** Optional lifecycle callbacks */
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TSetCreditFacilityParams {
  creditFacility: Address
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TSetInitialMultiplierParams {
  /** Multiplier value (uint32) */
  multiplier: number
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TSetDecayDurationParams {
  /** Duration in seconds (uint64) */
  duration: bigint
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TSetStartTimeParams {
  /** Start time as Unix timestamp (uint64) */
  startTime: bigint
  lifecycle?: TransactionLifecycleCallbacks
}

// ============================================================================
// Internal Types
// ============================================================================

interface PresaleConstructorArgs {
  data: TPresale
  publicClient: PopPublicClient
  walletClient?: PopWalletClient
  /** Floor/Market contract address (for transition operations) */
  floorAddress?: Address
  /** Authorizer contract address (for transition operations) */
  authorizerAddress?: Address
  /** Credit facility contract address (for transition operations) */
  creditFacilityAddress?: Address
}

const ZERO_AMOUNT = BigInt(0)

/**
 * @description Pure utility class for interacting with Presale contracts via viem.
 *              This class contains no React or wagmi dependencies so it can be
 *              reused across server and client runtimes.
 *
 *              Supports both user operations (buy, claim) and admin operations
 *              (state management, transition to live phase).
 */
export class Presale {
  private readonly address: Address
  private readonly purchaseTokenAddress: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient
  private readonly safeWrite?: SafeWrite
  private readonly floorAddress?: Address
  private readonly authorizerAddress?: Address
  private readonly creditFacilityAddress?: Address

  constructor({
    data,
    publicClient,
    walletClient,
    floorAddress,
    authorizerAddress,
    creditFacilityAddress,
  }: PresaleConstructorArgs) {
    this.address = Presale.resolvePresaleAddress(data)
    this.purchaseTokenAddress = Presale.resolvePurchaseTokenAddress(data)
    this.publicClient = publicClient
    this.walletClient = walletClient
    this.safeWrite = walletClient ? new SafeWrite({ publicClient, walletClient }) : undefined
    this.floorAddress = floorAddress
    this.authorizerAddress = authorizerAddress
    this.creditFacilityAddress = creditFacilityAddress
  }

  public getAddress(): Address {
    return this.address
  }

  public getPurchaseTokenAddress(): Address {
    return this.purchaseTokenAddress
  }

  public getFloorAddress(): Address | undefined {
    return this.floorAddress
  }

  public getAuthorizerAddress(): Address | undefined {
    return this.authorizerAddress
  }

  public getCreditFacilityAddress(): Address | undefined {
    return this.creditFacilityAddress
  }

  // =========================================================================
  // READ METHODS (View Functions)
  // =========================================================================

  /**
   * @description Get current presale state
   * @returns PresaleState enum (0=NotOpen, 1=Whitelist, 2=Public, 3=Closed)
   */
  public async getPresaleState(): Promise<number> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getPresaleState',
    })) as number
  }

  /**
   * @description Check if user is registered via Merkle proof whitelist
   * @param userAddress User address to check
   * @returns Boolean indicating whitelist status
   */
  public async isMerkleWhitelisted(userAddress: Address): Promise<boolean> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'isMerkleWhitelisted',
      args: [userAddress],
    })) as boolean
  }

  /**
   * @description Get the current Merkle root for whitelist verification
   * @returns The current merkle root (bytes32(0) means disabled)
   */
  public async getMerkleRoot(): Promise<`0x${string}`> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getMerkleRoot',
    })) as `0x${string}`
  }

  /**
   * @description Get user's total issuance (tokens minted)
   * @param userAddress User address
   * @returns Total issuance amount
   */
  public async getIssuanceBy(userAddress: Address): Promise<bigint> {
    return await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getIssuanceBy',
      args: [userAddress],
    })
  }

  /**
   * @description Get all position IDs owned by user
   * @param ownerAddress User address
   * @returns Array of position IDs
   */
  public async getPositionsByOwner(ownerAddress: Address): Promise<bigint[]> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getPositionsByOwner',
      args: [ownerAddress],
    })) as bigint[]
  }

  /**
   * @description Get position details
   * @param positionId Position ID
   * @returns Position struct with owner, deposits, tokens, leverage, etc.
   */
  public async getPosition(positionId: bigint): Promise<TPresalePosition> {
    const result = (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getPosition',
      args: [positionId],
    })) as TPresalePosition

    return result
  }

  /**
   * @description Get position state (claimable/locked/claimed tokens)
   * @param positionId Position ID
   * @returns Position state with claimable, locked, and claimed amounts
   */
  public async getPositionState(positionId: bigint): Promise<TPresalePositionState> {
    const result = (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getPositionState',
      args: [positionId],
    })) as [bigint, bigint, bigint]

    return {
      claimableTokens: result[0],
      lockedTokens: result[1],
      claimedTokens: result[2],
    }
  }

  /**
   * @description Get commission rates by leverage index
   * @returns Array of commission rates in basis points
   */
  public async getBaseCommissionBps(): Promise<bigint[]> {
    const result = (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getBaseCommissionBps',
    })) as readonly number[]

    // Convert number[] to bigint[] for consistency
    return result.map((bps) => BigInt(bps))
  }

  /**
   * @description Get price breakpoints for tranche unlocks
   * @returns 2D array of price breakpoints (by leverage level)
   */
  public async getPriceBreakpoints(): Promise<bigint[][]> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getPriceBreakpoints',
    })) as bigint[][]
  }

  /**
   * @description Get global issuance cap (tokens minted cap)
   * @returns Global issuance cap (0 if disabled)
   */
  public async getGlobalIssuanceCap(): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getGlobalIssuanceCap',
    })) as bigint
  }

  /**
   * @description Get per-address issuance cap (tokens minted cap per address)
   * @returns Per-address issuance cap (0 if disabled)
   */
  public async getPerAddressIssuanceCap(): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getPerAddressIssuanceCap',
    })) as bigint
  }

  /**
   * @description Get total global issuance (tokens minted)
   * @returns Total amount of tokens minted across all users
   */
  public async getGlobalIssuance(): Promise<bigint> {
    return await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getGlobalIssuance',
    })
  }

  // =========================================================================
  // MULTIPLIER READ METHODS (Fee Decay)
  // =========================================================================

  /**
   * @description Get current fee multiplier (decays over time)
   * @returns Current multiplier value (10000 = 1x, 100000 = 10x)
   */
  public async getMultiplier(): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getMultiplier',
    })) as bigint
  }

  /**
   * @description Get initial multiplier (before decay starts)
   * @returns Initial multiplier value
   */
  public async getInitialMultiplier(): Promise<bigint> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getInitialMultiplier',
    })
    // uint32 returned - convert to bigint
    return BigInt(result)
  }

  /**
   * @description Get decay duration in seconds
   * @returns Decay duration
   */
  public async getDecayDuration(): Promise<bigint> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getDecayDuration',
    })
    // uint64 returned - convert to bigint
    return BigInt(result)
  }

  /**
   * @description Get decay start time (Unix timestamp)
   * @returns Start time (0 if not started)
   */
  public async getStartTime(): Promise<bigint> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getStartTime',
    })
    // uint64 returned - convert to bigint
    return BigInt(result)
  }

  /**
   * @description Get presale end timestamp
   * @returns End timestamp (0 if not set)
   */
  public async getEndTimestamp(): Promise<bigint> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getEndTimestamp',
    })
    // uint64 returned - convert to bigint
    return BigInt(result)
  }

  /**
   * @description Check if fee decay is currently active
   * @returns True if decay has started and not ended
   */
  public async isDecayActive(): Promise<boolean> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'isActive',
    })) as boolean
  }

  /**
   * @description Check if fee decay has ended
   * @returns True if decay has completed
   */
  public async isDecayEnded(): Promise<boolean> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'isEnded',
    })) as boolean
  }

  /**
   * @description Get user's total tokens breakdown (total, claimed, locked)
   * @param user User address
   * @returns Object with totalTokens, claimedTokens, lockedTokens
   */
  public async getUserTotalTokens(
    user: Address
  ): Promise<{ totalTokens: bigint; claimedTokens: bigint; lockedTokens: bigint }> {
    const result = (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getUserTotalTokens',
      args: [user],
    })) as [bigint, bigint, bigint]

    return {
      totalTokens: result[0],
      claimedTokens: result[1],
      lockedTokens: result[2],
    }
  }

  /**
   * @description Get complete multiplier state in a single batched call
   * @returns MultiplierState object with all decay parameters
   */
  public async getMultiplierState(): Promise<{
    startTime: bigint
    decayDuration: bigint
    initialMultiplier: bigint
    currentMultiplier: bigint
    isActive: boolean
    isEnded: boolean
  }> {
    try {
      // Try multicall first
      const contracts = [
        {
          address: this.address,
          abi: Presale_v1,
          functionName: 'getStartTime' as const,
        },
        {
          address: this.address,
          abi: Presale_v1,
          functionName: 'getDecayDuration' as const,
        },
        {
          address: this.address,
          abi: Presale_v1,
          functionName: 'getInitialMultiplier' as const,
        },
        {
          address: this.address,
          abi: Presale_v1,
          functionName: 'getMultiplier' as const,
        },
        {
          address: this.address,
          abi: Presale_v1,
          functionName: 'isActive' as const,
        },
        {
          address: this.address,
          abi: Presale_v1,
          functionName: 'isEnded' as const,
        },
      ]

      const results = await this.publicClient.multicall({ contracts })

      return {
        startTime: BigInt((results[0].result as number) ?? 0),
        decayDuration: BigInt((results[1].result as number) ?? 0),
        initialMultiplier: BigInt((results[2].result as number) ?? 10000),
        currentMultiplier: (results[3].result as bigint) ?? BigInt(10000),
        isActive: (results[4].result as boolean) ?? false,
        isEnded: (results[5].result as boolean) ?? true,
      }
    } catch {
      // Fallback to individual calls
      const [startTime, decayDuration, initialMultiplier, currentMultiplier, isActive, isEnded] =
        await Promise.all([
          this.getStartTime(),
          this.getDecayDuration(),
          this.getInitialMultiplier(),
          this.getMultiplier(),
          this.isDecayActive(),
          this.isDecayEnded(),
        ])

      return {
        startTime,
        decayDuration,
        initialMultiplier,
        currentMultiplier,
        isActive,
        isEnded,
      }
    }
  }

  /**
   * @description Get purchase token allowance for presale contract
   * @param ownerAddress Token owner address
   * @returns Approved amount
   */
  public async getPurchaseTokenAllowance(ownerAddress: Address): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.purchaseTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'allowance',
      args: [ownerAddress, this.address],
    })) as bigint
  }

  /**
   * @description Get user's purchase token balance
   * @param userAddress User address
   * @returns Token balance
   */
  public async getPurchaseTokenBalance(userAddress: Address): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.purchaseTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'balanceOf',
      args: [userAddress],
    })) as bigint
  }

  /**
   * @description Get all positions with their states for a user
   * @param ownerAddress User address
   * @returns Array of positions with their claimable/locked/claimed state
   * @note Uses multicall to batch all contract reads into a single RPC call
   */
  public async getPositionsWithState(ownerAddress: Address): Promise<TPresalePositionWithState[]> {
    const positionIds = await this.getPositionsByOwner(ownerAddress)

    if (positionIds.length === 0) return []

    // Try multicall first, fallback to individual calls if multicall3 not available (e.g., Anvil)
    try {
      // Build multicall contracts array - 2 calls per position (getPosition + getPositionState)
      const contracts = positionIds.flatMap((positionId) => [
        {
          address: this.address,
          abi: Presale_v1,
          functionName: 'getPosition' as const,
          args: [positionId] as const,
        },
        {
          address: this.address,
          abi: Presale_v1,
          functionName: 'getPositionState' as const,
          args: [positionId] as const,
        },
      ])

      const results = await this.publicClient.multicall({ contracts })

      // Parse results - every 2 results = 1 position (getPosition, getPositionState)
      const positions: TPresalePositionWithState[] = []
      for (let i = 0; i < positionIds.length; i++) {
        const positionResult = results[i * 2]
        const stateResult = results[i * 2 + 1]

        if (positionResult.status === 'success' && stateResult.status === 'success') {
          const position = positionResult.result as TPresalePosition
          const stateArray = stateResult.result as [bigint, bigint, bigint]

          positions.push({
            positionId: positionIds[i],
            ...position,
            state: {
              claimableTokens: stateArray[0],
              lockedTokens: stateArray[1],
              claimedTokens: stateArray[2],
            },
          })
        }
      }

      return positions
    } catch (error) {
      // Fallback to individual calls if multicall fails (e.g., Anvil without multicall3)
      if (
        error instanceof Error &&
        (error.message.includes('multicall') || error.message.includes('multicall3'))
      ) {
        const positions: TPresalePositionWithState[] = []

        for (const positionId of positionIds) {
          try {
            const [position, stateArray] = await Promise.all([
              this.publicClient.readContract({
                address: this.address,
                abi: Presale_v1,
                functionName: 'getPosition',
                args: [positionId],
              }) as Promise<TPresalePosition>,
              this.publicClient.readContract({
                address: this.address,
                abi: Presale_v1,
                functionName: 'getPositionState',
                args: [positionId],
              }) as Promise<[bigint, bigint, bigint]>,
            ])

            positions.push({
              positionId,
              ...position,
              state: {
                claimableTokens: stateArray[0],
                lockedTokens: stateArray[1],
                claimedTokens: stateArray[2],
              },
            })
          } catch (positionError) {
            // Skip failed positions but continue with others
            console.warn(`Failed to fetch position ${positionId}:`, positionError)
          }
        }

        return positions
      }

      // Re-throw if it's not a multicall error
      throw error
    }
  }

  // =========================================================================
  // WRITE METHODS (Transactions)
  // =========================================================================

  /**
   * @description Buy presale without leverage
   * @param params Deposit amount and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async buyPresale({
    depositAmount,
    minAmountOut = BigInt(0),
    lifecycle,
  }: TPresaleBuyParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(depositAmount)

    const accountAddress = this.getWalletAddress(walletClient)

    // Check balance
    const balance = await this.getPurchaseTokenBalance(accountAddress)
    if (balance < depositAmount) {
      throw new Error(
        `Insufficient balance. You have ${balance.toString()} but tried to deposit ${depositAmount.toString()}`
      )
    }

    // Check allowance
    const allowance = await this.getPurchaseTokenAllowance(accountAddress)
    if (allowance < depositAmount) {
      throw new Error(
        `Insufficient allowance. Please approve the Presale contract to spend your tokens first.\n\nRequired: ${depositAmount.toString()}\nCurrent: ${allowance.toString()}`
      )
    }
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'buyPresale',
      args: [depositAmount, minAmountOut],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Buy presale with leverage
   * @param params Deposit amount, leverage index, and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async buyPresaleWithLeverage({
    depositAmount,
    leverageIndex,
    minAmountOut = BigInt(0),
    lifecycle,
  }: TPresaleBuyWithLeverageParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(depositAmount)

    validateLoopCount(leverageIndex)

    const accountAddress = this.getWalletAddress(walletClient)

    // Check balance
    const balance = await this.getPurchaseTokenBalance(accountAddress)
    if (balance < depositAmount) {
      throw new Error(
        `Insufficient balance. You have ${balance.toString()} but tried to deposit ${depositAmount.toString()}`
      )
    }

    // Check allowance
    const allowance = await this.getPurchaseTokenAllowance(accountAddress)
    if (allowance < depositAmount) {
      throw new Error(
        `Insufficient allowance. Please approve the Presale contract to spend your tokens first.\n\nRequired: ${depositAmount.toString()}\nCurrent: ${allowance.toString()}`
      )
    }

    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'buyPresaleWithLoops',
      args: [depositAmount, BigInt(leverageIndex), minAmountOut],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Simulate a presale buy to get the exact tokens minted from the bonding curve.
   * Uses simulateContract (dry-run) with minAmountOut=0 so it never reverts on slippage.
   */
  public async simulateBuyPresale({
    depositAmount,
    account,
  }: TPresaleSimulateBuyParams): Promise<TPresaleSimulateBuyResult> {
    this.assertPositiveAmount(depositAmount)

    const sim = await this.publicClient.simulateContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'buyPresale',
      args: [depositAmount, BigInt(0)],
      account,
    })
    const [positionId, feePaid, tokensMinted] = sim.result as [bigint, bigint, bigint]
    return { positionId, feePaid, tokensMinted }
  }

  /**
   * @description Simulate a leveraged presale buy to get the exact tokens minted from the bonding curve.
   * Uses simulateContract (dry-run) with minAmountOut=0 so it never reverts on slippage.
   */
  public async simulateBuyPresaleWithLeverage({
    depositAmount,
    leverageIndex,
    account,
  }: TPresaleSimulateBuyWithLeverageParams): Promise<TPresaleSimulateBuyResult> {
    this.assertPositiveAmount(depositAmount)
    validateLoopCount(leverageIndex)

    const sim = await this.publicClient.simulateContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'buyPresaleWithLoops',
      args: [depositAmount, BigInt(leverageIndex), BigInt(0)],
      account,
    })
    const [positionId, feePaid, tokensMinted] = sim.result as [bigint, bigint, bigint]
    return { positionId, feePaid, tokensMinted }
  }

  /**
   * @description Claim all unlocked tokens from a position
   * @param params Position ID and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async claimAll({
    positionId,
    lifecycle,
  }: TPresaleClaimParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'claimAll',
      args: [positionId],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Approve purchase token for presale contract
   * @param params Approval amount and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async approvePurchaseToken({
    amount,
    lifecycle,
  }: TPresaleApproveParams): Promise<TransactionReceipt> {
    this.assertPositiveAmount(amount)

    const { receipt } = await this.requireSafeWrite().write({
      address: this.purchaseTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'approve',
      args: [this.address, amount],
      lifecycle,
    })
    return receipt
  }

  // =========================================================================
  // ADMIN WRITE METHODS (Permissioned Functions)
  // =========================================================================

  /**
   * @description Set the presale state (Admin only)
   * @param params State and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async setPresaleState({
    state,
    lifecycle,
  }: TSetPresaleStateParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'setPresaleState',
      args: [state],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Set global and per-address issuance caps (Admin only)
   * @param params Caps and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async setCaps({
    globalCap,
    perAddressCap,
    lifecycle,
  }: TSetCapsParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'setCaps',
      args: [globalCap, perAddressCap],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Set presale end timestamp (Admin only)
   * @param params Timestamp and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async setEndTimestamp({
    endTimestamp,
    lifecycle,
  }: TSetEndTimestampParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'setEndTimestamp',
      args: [endTimestamp],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Set the Merkle root for whitelist verification (Admin only)
   * @param params Merkle root and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async setMerkleRoot({
    merkleRoot,
    lifecycle,
  }: TSetMerkleRootParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'setMerkleRoot',
      args: [merkleRoot],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Self-register to whitelist using a Merkle proof (User)
   * User must call this before buying in Whitelist phase.
   * @param params Merkle proof and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async addToWhitelistWithProof({
    proof,
    lifecycle,
  }: TAddToWhitelistWithProofParams): Promise<TransactionReceipt> {
    if (proof.length === 0) {
      throw new Error('Merkle proof is required')
    }

    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'addToWhitelistWithProof',
      args: [proof],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Set the credit facility address (Admin only)
   */
  public async setCreditFacility({
    creditFacility,
    lifecycle,
  }: TSetCreditFacilityParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'setCreditFacility',
      args: [creditFacility],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Set the initial fee multiplier (Admin only)
   */
  public async setInitialMultiplier({
    multiplier,
    lifecycle,
  }: TSetInitialMultiplierParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'setInitialMultiplier',
      args: [multiplier],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Set the decay duration (Admin only)
   */
  public async setDecayDuration({
    duration,
    lifecycle,
  }: TSetDecayDurationParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'setDecayDuration',
      args: [duration],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Set the decay start time (Admin only)
   */
  public async setStartTime({
    startTime,
    lifecycle,
  }: TSetStartTimeParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: Presale_v1,
      functionName: 'setStartTime',
      args: [startTime],
      lifecycle,
    })
    return receipt
  }

  // =========================================================================
  // TRANSITION STATUS METHODS
  // =========================================================================

  /**
   * @description Get the current transition status showing what's configured vs what's needed for live
   * @param params Floor, authorizer, and optionally credit facility addresses
   * @returns Detailed status of presale transition readiness
   */
  public async getTransitionStatus(
    params?: TGetTransitionStatusParams
  ): Promise<TPresaleTransitionStatus> {
    const floorAddress = params?.floorAddress ?? this.floorAddress
    const authorizerAddress = params?.authorizerAddress ?? this.authorizerAddress
    const creditFacilityAddress = params?.creditFacilityAddress ?? this.creditFacilityAddress

    if (!floorAddress) {
      throw new Error(
        'Floor address is required for transition status. Provide it in params or constructor.'
      )
    }
    if (!authorizerAddress) {
      throw new Error(
        'Authorizer address is required for transition status. Provide it in params or constructor.'
      )
    }

    // Fetch current presale state
    const presaleStateRaw = await this.getPresaleState()
    const presaleState = presaleStateRaw as PresaleState
    const isPresaleClosed = presaleState === PresaleState.Closed

    // Fetch Floor state
    const [floorBuyFee, floorSellOpen] = await Promise.all([
      this.publicClient.readContract({
        address: floorAddress,
        abi: Floor_v1,
        functionName: 'getBuyFee',
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: floorAddress,
        abi: Floor_v1,
        functionName: 'isSellOpen',
      }) as Promise<boolean>,
    ])

    // Fetch CreditFacility borrow fee if available
    let creditFacilityBorrowFee = 0
    if (creditFacilityAddress) {
      try {
        const borrowFee = (await this.publicClient.readContract({
          address: creditFacilityAddress,
          abi: CreditFacility_v1,
          functionName: 'getBorrowingFeeRate',
        })) as bigint
        creditFacilityBorrowFee = Number(borrowFee)
      } catch {
        // CreditFacility may not exist or function may not be available
        creditFacilityBorrowFee = 0
      }
    }

    // Check permissions using authorizer
    const permissions = await this.checkLivePermissions(
      authorizerAddress,
      floorAddress,
      creditFacilityAddress
    )

    // Determine missing steps
    const missingSteps: string[] = []

    if (!isPresaleClosed) {
      missingSteps.push('Close presale (setPresaleState to Closed)')
    }

    if (Number(floorBuyFee) === 0) {
      missingSteps.push('Set Floor buy fee (setBuyFee)')
    }

    if (!floorSellOpen) {
      missingSteps.push('Open Floor sell (enableSell)')
    }

    if (!permissions.floorBuyPublic) {
      missingSteps.push('Grant PUBLIC_ROLE permission for Floor.buy')
    }
    if (!permissions.floorBuyForPublic) {
      missingSteps.push('Grant PUBLIC_ROLE permission for Floor.buyFor')
    }
    if (!permissions.floorSellPublic) {
      missingSteps.push('Grant PUBLIC_ROLE permission for Floor.sell')
    }
    if (!permissions.floorSellToPublic) {
      missingSteps.push('Grant PUBLIC_ROLE permission for Floor.sellTo')
    }

    if (creditFacilityAddress) {
      if (creditFacilityBorrowFee === 0) {
        missingSteps.push('Set CreditFacility borrow fee (setBorrowingFeeRate)')
      }
      if (!permissions.cfBorrowPublic) {
        missingSteps.push('Grant PUBLIC_ROLE permission for CreditFacility.borrow')
      }
      if (!permissions.cfBorrowForPublic) {
        missingSteps.push('Grant PUBLIC_ROLE permission for CreditFacility.borrowFor')
      }
      if (!permissions.cfBuyAndBorrowPublic) {
        missingSteps.push('Grant PUBLIC_ROLE permission for CreditFacility.buyAndBorrow')
      }
      if (!permissions.cfBuyAndBorrowForPublic) {
        missingSteps.push('Grant PUBLIC_ROLE permission for CreditFacility.buyAndBorrowFor')
      }
    }

    const readyForLive = missingSteps.length === 0

    return {
      presaleState,
      isPresaleClosed,
      floorBuyFee: Number(floorBuyFee),
      floorSellOpen,
      creditFacilityBorrowFee,
      permissions,
      readyForLive,
      missingSteps,
    }
  }

  /**
   * @description Validate that the presale is ready for live phase transition
   * @param params Floor, authorizer, and optionally credit facility addresses
   * @throws Error if not ready for live, listing all missing steps
   * @returns The transition status if ready
   */
  public async validateReadyForLive(
    params?: TGetTransitionStatusParams
  ): Promise<TPresaleTransitionStatus> {
    const status = await this.getTransitionStatus(params)

    if (!status.readyForLive) {
      throw new Error(
        `Presale is not ready for live phase. Missing steps:\n${status.missingSteps.map((s) => `  - ${s}`).join('\n')}`
      )
    }

    return status
  }

  /**
   * @description Check if a function has PUBLIC_ROLE permission
   * @param authorizerAddress Authorizer contract address
   * @param target Target contract address
   * @param selector Function selector (bytes4)
   * @returns Whether PUBLIC_ROLE has permission for this function
   */
  private async hasPublicPermission(
    authorizerAddress: Address,
    target: Address,
    selector: `0x${string}`
  ): Promise<boolean> {
    try {
      const isPublic = (await this.publicClient.readContract({
        address: authorizerAddress,
        abi: AUT_Roles_v2,
        functionName: 'isRolePermissioned',
        args: [target, selector, PUBLIC_ROLE],
      })) as boolean
      return isPublic
    } catch {
      return false
    }
  }

  /**
   * @description Check all live phase permissions
   */
  private async checkLivePermissions(
    authorizerAddress: Address,
    floorAddress: Address,
    creditFacilityAddress?: Address
  ): Promise<TPresaleTransitionStatus['permissions']> {
    // Check Floor permissions
    const [floorBuyPublic, floorBuyForPublic, floorSellPublic, floorSellToPublic] =
      await Promise.all([
        this.hasPublicPermission(authorizerAddress, floorAddress, FLOOR_SELECTORS.buy),
        this.hasPublicPermission(authorizerAddress, floorAddress, FLOOR_SELECTORS.buyFor),
        this.hasPublicPermission(authorizerAddress, floorAddress, FLOOR_SELECTORS.sell),
        this.hasPublicPermission(authorizerAddress, floorAddress, FLOOR_SELECTORS.sellTo),
      ])

    // Check CreditFacility permissions if available
    let cfBorrowPublic = false
    let cfBorrowForPublic = false
    let cfBuyAndBorrowPublic = false
    let cfBuyAndBorrowForPublic = false

    if (creditFacilityAddress) {
      const cfPermissions = await Promise.all([
        this.hasPublicPermission(
          authorizerAddress,
          creditFacilityAddress,
          CREDIT_FACILITY_SELECTORS.borrow
        ),
        this.hasPublicPermission(
          authorizerAddress,
          creditFacilityAddress,
          CREDIT_FACILITY_SELECTORS.borrowFor
        ),
        this.hasPublicPermission(
          authorizerAddress,
          creditFacilityAddress,
          CREDIT_FACILITY_SELECTORS.buyAndBorrow
        ),
        this.hasPublicPermission(
          authorizerAddress,
          creditFacilityAddress,
          CREDIT_FACILITY_SELECTORS.buyAndBorrowFor
        ),
      ])

      cfBorrowPublic = cfPermissions[0]
      cfBorrowForPublic = cfPermissions[1]
      cfBuyAndBorrowPublic = cfPermissions[2]
      cfBuyAndBorrowForPublic = cfPermissions[3]
    }

    return {
      floorBuyPublic,
      floorBuyForPublic,
      floorSellPublic,
      floorSellToPublic,
      cfBorrowPublic,
      cfBorrowForPublic,
      cfBuyAndBorrowPublic,
      cfBuyAndBorrowForPublic,
    }
  }

  // =========================================================================
  // TRANSITION METHODS (Presale → Live Phase)
  // =========================================================================

  /**
   * @description Atomically transition from presale to live phase
   * Executes all required steps in a single multicall transaction:
   * 1. Close presale (setPresaleState to Closed)
   * 2. Set Floor buy fee (default: 0.5%)
   * 3. Set CreditFacility borrow fee (default: 6%) - if credit facility exists
   * 4. Grant PUBLIC_ROLE permissions for Floor (buy, buyFor, sell, sellTo)
   * 5. Open Floor sell
   * 6. Grant PUBLIC_ROLE permissions for CreditFacility (borrow, borrowFor, buyAndBorrow, buyAndBorrowFor) - if credit facility exists
   *
   * @param params Transition parameters including contract addresses and optional fee overrides
   * @returns Transaction receipt after confirmation
   */
  public async goLive(params: TGoLiveParams): Promise<TransactionReceipt> {
    const { lifecycle } = params

    const liveBuyFeeBps = params.liveBuyFeeBps ?? DEFAULT_LIVE_BUY_FEE_BPS
    const liveBorrowFeeBps = params.liveBorrowFeeBps ?? DEFAULT_LIVE_BORROW_FEE_BPS

    const calls: SingleCall[] = []

    // 1. Close presale
    calls.push({
      target: this.address,
      allowFailure: false,
      callData: encodeFunctionData({
        abi: Presale_v1,
        functionName: 'setPresaleState',
        args: [PresaleState.Closed],
      }),
    })

    // 2. Set Floor buy fee
    calls.push({
      target: params.floorAddress,
      allowFailure: false,
      callData: encodeFunctionData({
        abi: Floor_v1,
        functionName: 'setBuyFee',
        args: [BigInt(liveBuyFeeBps)],
      }),
    })

    // 3. Set CreditFacility borrow fee (if credit facility exists)
    if (params.creditFacilityAddress) {
      calls.push({
        target: params.creditFacilityAddress,
        allowFailure: false,
        callData: encodeFunctionData({
          abi: CreditFacility_v1,
          functionName: 'setBorrowingFeeRate',
          args: [BigInt(liveBorrowFeeBps)],
        }),
      })
    }

    // 4. Grant PUBLIC_ROLE permissions for Floor
    const floorPermissions: `0x${string}`[] = [
      FLOOR_SELECTORS.buy,
      FLOOR_SELECTORS.buyFor,
      FLOOR_SELECTORS.sell,
      FLOOR_SELECTORS.sellTo,
    ]

    for (const selector of floorPermissions) {
      calls.push({
        target: params.authorizerAddress,
        allowFailure: false,
        callData: encodeFunctionData({
          abi: AUT_Roles_v2,
          functionName: 'addAccessPermission',
          args: [params.floorAddress, selector, PUBLIC_ROLE],
        }),
      })
    }

    // 5. Open Floor sell
    calls.push({
      target: params.floorAddress,
      allowFailure: false,
      callData: encodeFunctionData({
        abi: Floor_v1,
        functionName: 'enableSell',
      }),
    })

    // 6. Grant PUBLIC_ROLE permissions for CreditFacility (if exists)
    if (params.creditFacilityAddress) {
      const cfPermissions: `0x${string}`[] = [
        CREDIT_FACILITY_SELECTORS.borrow,
        CREDIT_FACILITY_SELECTORS.borrowFor,
        CREDIT_FACILITY_SELECTORS.buyAndBorrow,
        CREDIT_FACILITY_SELECTORS.buyAndBorrowFor,
      ]

      for (const selector of cfPermissions) {
        calls.push({
          target: params.authorizerAddress,
          allowFailure: false,
          callData: encodeFunctionData({
            abi: AUT_Roles_v2,
            functionName: 'addAccessPermission',
            args: [params.creditFacilityAddress, selector, PUBLIC_ROLE],
          }),
        })
      }
    }

    const { receipt } = await this.requireSafeWrite().write({
      address: params.transactionForwarderAddress,
      abi: TransactionForwarder_v1,
      functionName: 'executeMulticall',
      args: [calls],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Close the presale (set state to Closed)
   * Convenience method that wraps setPresaleState with PresaleState.Closed
   * @param lifecycle Optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async closePresale(
    lifecycle?: TransactionLifecycleCallbacks
  ): Promise<TransactionReceipt> {
    return this.setPresaleState({ state: PresaleState.Closed, lifecycle })
  }

  /**
   * @description Set live phase fees for Floor and optionally CreditFacility
   * @param params Fee parameters and contract addresses
   * @returns Transaction receipt after confirmation
   */
  public async setLiveFees(params: TSetLiveFeesParams): Promise<TransactionReceipt> {
    const { lifecycle } = params

    const buyFeeBps = params.buyFeeBps ?? DEFAULT_LIVE_BUY_FEE_BPS
    const borrowFeeBps = params.borrowFeeBps ?? DEFAULT_LIVE_BORROW_FEE_BPS

    const calls: SingleCall[] = []

    // Set Floor buy fee
    calls.push({
      target: params.floorAddress,
      allowFailure: false,
      callData: encodeFunctionData({
        abi: Floor_v1,
        functionName: 'setBuyFee',
        args: [BigInt(buyFeeBps)],
      }),
    })

    // Set CreditFacility borrow fee (if credit facility exists)
    if (params.creditFacilityAddress) {
      calls.push({
        target: params.creditFacilityAddress,
        allowFailure: false,
        callData: encodeFunctionData({
          abi: CreditFacility_v1,
          functionName: 'setBorrowingFeeRate',
          args: [BigInt(borrowFeeBps)],
        }),
      })
    }

    const { receipt } = await this.requireSafeWrite().write({
      address: params.transactionForwarderAddress,
      abi: TransactionForwarder_v1,
      functionName: 'executeMulticall',
      args: [calls],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Enable public trading on Floor
   * Grants PUBLIC_ROLE permissions for buy, buyFor, sell, sellTo and opens sell
   * @param params Contract addresses and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async enablePublicTrading(
    params: TEnablePublicTradingParams
  ): Promise<TransactionReceipt> {
    const { lifecycle } = params

    const calls: SingleCall[] = []

    // Grant PUBLIC_ROLE permissions for Floor trading functions
    const floorPermissions: `0x${string}`[] = [
      FLOOR_SELECTORS.buy,
      FLOOR_SELECTORS.buyFor,
      FLOOR_SELECTORS.sell,
      FLOOR_SELECTORS.sellTo,
    ]

    for (const selector of floorPermissions) {
      calls.push({
        target: params.authorizerAddress,
        allowFailure: false,
        callData: encodeFunctionData({
          abi: AUT_Roles_v2,
          functionName: 'addAccessPermission',
          args: [params.floorAddress, selector, PUBLIC_ROLE],
        }),
      })
    }

    // Open sell
    calls.push({
      target: params.floorAddress,
      allowFailure: false,
      callData: encodeFunctionData({
        abi: Floor_v1,
        functionName: 'enableSell',
      }),
    })

    const { receipt } = await this.requireSafeWrite().write({
      address: params.transactionForwarderAddress,
      abi: TransactionForwarder_v1,
      functionName: 'executeMulticall',
      args: [calls],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Enable public borrowing on CreditFacility
   * Grants PUBLIC_ROLE permissions for borrow, borrowFor, buyAndBorrow, buyAndBorrowFor
   * @param params Contract addresses and optional lifecycle callbacks
   * @returns Transaction receipt after confirmation
   */
  public async enablePublicBorrowing(
    params: TEnablePublicBorrowingParams
  ): Promise<TransactionReceipt> {
    const { lifecycle } = params

    const calls: SingleCall[] = []

    // Grant PUBLIC_ROLE permissions for CreditFacility borrowing functions
    const cfPermissions: `0x${string}`[] = [
      CREDIT_FACILITY_SELECTORS.borrow,
      CREDIT_FACILITY_SELECTORS.borrowFor,
      CREDIT_FACILITY_SELECTORS.buyAndBorrow,
      CREDIT_FACILITY_SELECTORS.buyAndBorrowFor,
    ]

    for (const selector of cfPermissions) {
      calls.push({
        target: params.authorizerAddress,
        allowFailure: false,
        callData: encodeFunctionData({
          abi: AUT_Roles_v2,
          functionName: 'addAccessPermission',
          args: [params.creditFacilityAddress, selector, PUBLIC_ROLE],
        }),
      })
    }

    const { receipt } = await this.requireSafeWrite().write({
      address: params.transactionForwarderAddress,
      abi: TransactionForwarder_v1,
      functionName: 'executeMulticall',
      args: [calls],
      lifecycle,
    })
    return receipt
  }

  // =========================================================================
  // PRIVATE HELPER METHODS
  // =========================================================================

  private static resolvePresaleAddress(data: TPresale): Address {
    if (!data?.id) {
      throw new Error('Presale ID is required')
    }
    return getAddress(data.id) as Address
  }

  private static resolvePurchaseTokenAddress(data: TPresale): Address {
    if (!data?.purchaseToken_id) {
      throw new Error('Purchase token address is required')
    }
    return getAddress(data.purchaseToken_id) as Address
  }

  private assertPositiveAmount(amount: bigint): void {
    if (amount <= ZERO_AMOUNT) {
      throw new Error('Amount must be greater than zero')
    }
  }

  private requireSafeWrite(): SafeWrite {
    if (!this.safeWrite) {
      throw new Error('Wallet not connected. Please connect your wallet to continue.')
    }
    return this.safeWrite
  }

  private requireWalletClient(): PopWalletClient {
    if (!this.walletClient) {
      throw new Error('Wallet not connected. Please connect your wallet to continue.')
    }
    return this.walletClient
  }

  private getWalletAddress(walletClient: PopWalletClient): Address {
    const address = walletClient.account?.address
    if (!address) {
      throw new Error('Wallet account address not available')
    }
    return address as Address
  }
}
