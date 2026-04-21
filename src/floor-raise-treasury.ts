/**
 * @description Client for FloorRaiseTreasury_v1 — the treasury that accumulates collateral
 * and triggers Floor.raiseFloor() once the configured threshold is reached. The raise happens
 * automatically inside the treasury's internal `_tryRaiseFloor`, wrapped in try/catch so a
 * failure does not block distributions.
 *
 * Surface:
 *   - `getThreshold()` / `setThreshold(uint256)` — admin-gated threshold
 *   - `getFunds(token)` — inherited ITreasury_v1 accumulation balance
 *   - event `ThresholdUpdated(old, new)` — configuration changes
 *   - event `FloorRaiseAttempted(amount, success)` — each raise attempt, surfaces failures
 */

import type { Address, TransactionReceipt } from 'viem'

import { FloorRaiseTreasury_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'
import { SafeWrite } from './utils/safe-write'
import { validateAddress } from './utils/validation'

export interface TFloorRaiseTreasuryParams {
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TSetThresholdParams extends TFloorRaiseTreasuryParams {
  /** New threshold in collateral-token native decimals. Must be non-zero (contract reverts otherwise). */
  threshold: bigint
}

export interface TFloorRaiseTreasuryState {
  threshold: bigint
  accumulated: bigint
  floor: Address
  feeTreasury: Address
}

interface FloorRaiseTreasuryConstructorArgs {
  address: Address
  /** Collateral token address (used to query accumulated `getFunds(token)`) */
  collateralToken: Address
  publicClient: PopPublicClient
  walletClient?: PopWalletClient
}

export class FloorRaiseTreasury {
  private readonly address: Address
  private readonly collateralToken: Address
  private readonly publicClient: PopPublicClient
  private readonly safeWrite?: SafeWrite

  constructor({
    address,
    collateralToken,
    publicClient,
    walletClient,
  }: FloorRaiseTreasuryConstructorArgs) {
    this.address = address
    this.collateralToken = collateralToken
    this.publicClient = publicClient
    this.safeWrite = walletClient ? new SafeWrite({ publicClient, walletClient }) : undefined
  }

  private requireSafeWrite(): SafeWrite {
    if (!this.safeWrite) throw new Error('Wallet not connected')
    return this.safeWrite
  }

  public async getThreshold(): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: FloorRaiseTreasury_v1,
      functionName: 'getThreshold',
    })) as bigint
  }

  public async getAccumulated(): Promise<bigint> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: FloorRaiseTreasury_v1,
      functionName: 'getFunds',
      args: [this.collateralToken],
    })) as bigint
  }

  public async getState(): Promise<TFloorRaiseTreasuryState> {
    const [threshold, accumulated, floor, feeTreasury] = await Promise.all([
      this.getThreshold(),
      this.getAccumulated(),
      this.publicClient.readContract({
        address: this.address,
        abi: FloorRaiseTreasury_v1,
        functionName: 'floor',
      }) as Promise<Address>,
      this.publicClient.readContract({
        address: this.address,
        abi: FloorRaiseTreasury_v1,
        functionName: 'feeTreasury',
      }) as Promise<Address>,
    ])
    return { threshold, accumulated, floor, feeTreasury }
  }

  public async setThreshold({
    threshold,
    lifecycle,
  }: TSetThresholdParams): Promise<TransactionReceipt> {
    if (threshold <= BigInt(0)) {
      throw new Error('Threshold must be non-zero (contract reverts on zero)')
    }
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: FloorRaiseTreasury_v1,
      functionName: 'setThreshold',
      args: [threshold],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Fetch accumulated funds from the treasury.
   * Inherited from ITreasury_v1; admin-gated.
   */
  public async fetchFunds(
    token: Address,
    amount: bigint,
    lifecycle?: TransactionLifecycleCallbacks
  ): Promise<TransactionReceipt> {
    validateAddress(token, 'token')
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: FloorRaiseTreasury_v1,
      functionName: 'fetchFunds',
      args: [token, amount],
      lifecycle,
    })
    return receipt
  }
}
