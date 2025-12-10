import type { Address, TransactionReceipt } from 'viem'
import { getAddress } from 'viem'

import ERC20Issuance_v1 from './abis/ERC20Issuance_v1'
import Presale_v1 from './abis/Presale_v1'
import type { TPresale } from './graphql/api'
import type { PopPublicClient, PopWalletClient } from './types'

export interface TPresaleBuyParams {
  depositAmount: bigint
}

export interface TPresaleBuyWithLeverageParams {
  depositAmount: bigint
  leverageIndex: number
}

export interface TPresaleClaimParams {
  positionId: bigint
}

export interface TPresaleApproveParams {
  amount: bigint
}

export type TPresaleMutationResult = TransactionReceipt

export interface TPresalePosition {
  owner: Address
  totalDeposit: bigint
  totalMinted: bigint
  leverage: bigint
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

interface PresaleConstructorArgs {
  data: TPresale
  publicClient: PopPublicClient
  walletClient?: PopWalletClient
}

const ZERO_AMOUNT = BigInt(0)

/**
 * @description Pure utility class for interacting with Presale contracts via viem.
 *              This class contains no React or wagmi dependencies so it can be
 *              reused across server and client runtimes.
 */
export class Presale {
  private readonly address: Address
  private readonly purchaseTokenAddress: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ data, publicClient, walletClient }: PresaleConstructorArgs) {
    this.address = Presale.resolvePresaleAddress(data)
    this.purchaseTokenAddress = Presale.resolvePurchaseTokenAddress(data)
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  public getAddress(): Address {
    return this.address
  }

  public getPurchaseTokenAddress(): Address {
    return this.purchaseTokenAddress
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
   * @description Check if user is whitelisted
   * @param userAddress User address to check
   * @returns Boolean indicating whitelist status
   */
  public async isWhitelisted(userAddress: Address): Promise<boolean> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'isWhitelisted',
      args: [userAddress],
    })) as boolean
  }

  /**
   * @description Get user's total issuance (tokens minted)
   * @param userAddress User address
   * @returns Total issuance amount
   */
  public async getIssuanceBy(userAddress: Address): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getIssuanceBy',
      args: [userAddress],
    })) as bigint
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
    return (await this.publicClient.readContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'getGlobalIssuance',
    })) as bigint
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
   * @param params Deposit amount
   * @returns Transaction hash and position details
   */
  public async buyPresale({ depositAmount }: TPresaleBuyParams): Promise<TransactionReceipt> {
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

    const hash = await walletClient.writeContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'buyPresale',
      args: [depositAmount],
      account: accountAddress,
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
  }

  /**
   * @description Buy presale with leverage
   * @param params Deposit amount and leverage index
   * @returns Transaction hash and position details
   */
  public async buyPresaleWithLeverage({
    depositAmount,
    leverageIndex,
  }: TPresaleBuyWithLeverageParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(depositAmount)

    if (leverageIndex <= 0) {
      throw new Error('Leverage index must be greater than 0')
    }

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

    const hash = await walletClient.writeContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'buyPresaleWithLeverage',
      args: [depositAmount, BigInt(leverageIndex)],
      account: accountAddress,
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })
    return receipt
  }

  /**
   * @description Claim all unlocked tokens from a position
   * @param params Position ID
   * @returns Transaction hash
   */
  public async claimAll({ positionId }: TPresaleClaimParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    const hash = await walletClient.writeContract({
      address: this.address,
      abi: Presale_v1,
      functionName: 'claimAll',
      args: [positionId],
      account: this.getWalletAddress(walletClient),
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
  }

  /**
   * @description Approve purchase token for presale contract
   * @param params Approval amount
   * @returns Transaction hash
   */
  public async approvePurchaseToken({
    amount,
  }: TPresaleApproveParams): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(amount)

    const hash = await walletClient.writeContract({
      address: this.purchaseTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'approve',
      args: [this.address, amount],
      account: this.getWalletAddress(walletClient),
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

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
