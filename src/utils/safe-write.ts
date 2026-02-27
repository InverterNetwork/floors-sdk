import type { Abi, ContractFunctionArgs, ContractFunctionName, Hex, TransactionReceipt } from 'viem'

import type { PopPublicClient, PopWalletClient } from '../types'
import type { EnhancedParsedError } from './error-types'
import { getParsedError } from './handle-error'

// ============================================================================
// Types
// ============================================================================

export type SafeWriteCallParams<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
> = {
  /** Target contract address */
  address: `0x${string}`
  /** Contract ABI — drives both the call and error decoding at every stage */
  abi: TAbi
  /** Write function name, restricted to nonpayable / payable via the ABI */
  functionName: TFunctionName
  /** Arguments typed against the ABI function signature */
  args?: ContractFunctionArgs<TAbi, 'nonpayable' | 'payable', TFunctionName>
  /** ETH value for payable functions */
  value?: bigint
  /**
   * Called when `simulateContract` reverts.
   * Receives a fully parsed error for logging / toast display.
   * The original error is re-thrown after this callback fires.
   */
  onSimError?: (parsed: EnhancedParsedError) => void
  /**
   * Called when simulation passed but `writeContract` reverts.
   * Rare in practice (nonce race, gas spike between sim and broadcast).
   * The original error is re-thrown after this callback fires.
   */
  onWriteError?: (parsed: EnhancedParsedError) => void
  /** Optional UI-level lifecycle callbacks fired at each transaction stage */
  lifecycle?: {
    onPendingWallet?: () => void
    onSubmitted?: (hash: Hex) => void
    onPendingConfirmation?: (hash: Hex) => void
    onConfirmed?: (receipt: TransactionReceipt) => void
    onFailed?: (error: Error) => void
  }
}

export type SafeWriteResult = {
  /** Transaction hash from writeContract */
  hash: Hex
  /** On-chain receipt with status, logs, gas used, block number, etc. */
  receipt: TransactionReceipt
  /** Return value from simulateContract (cast to a concrete type as needed) */
  simResult: unknown
}

// ============================================================================
// SafeWrite class
// ============================================================================

/**
 * Class for contract write actions: simulate → write → receipt.
 *
 * Construct once with the repeating `publicClient` and `walletClient`, then
 * call `write(...)` for each transaction without repeating the clients.
 *
 * Every stage uses the same ABI for full error decoding, so custom contract
 * errors are always surfaced with a human-readable `prettyMessage`.
 *
 * Execution chain:
 *   1. `simulateContract` — catches reverts before spending gas. On failure,
 *      calls `onSimError(parsed)` then re-throws the original error.
 *   2. `writeContract(sim.request)` — broadcasts the exact calldata from
 *      simulation. On failure (nonce race / gas spike), calls `onWriteError(parsed)`
 *      then re-throws.
 *   3. `waitForTransactionReceipt` — waits for 1 confirmation and returns the
 *      full on-chain receipt alongside the hash and sim return value.
 *
 * @example
 * ```ts
 * import { SafeWrite } from '@floorsfi/sdk'
 *
 * const sw = new SafeWrite({ publicClient, walletClient })
 *
 * const { hash, receipt } = await sw.write({
 *   address: marketAddress,
 *   abi: marketAbi,
 *   functionName: 'buy',           // autocompleted from marketAbi
 *   args: [depositAmount, minOut],  // typed against the ABI
 *   onSimError:   (e) => toast.error(e.prettyMessage),
 *   onWriteError: (e) => toast.error(e.prettyMessage),
 * })
 *
 * console.log('confirmed in block', receipt.blockNumber)
 * ```
 */
export class SafeWrite {
  private readonly publicClient: PopPublicClient
  private readonly walletClient: PopWalletClient

  constructor(params: { publicClient: PopPublicClient; walletClient: PopWalletClient }) {
    this.publicClient = params.publicClient
    this.walletClient = params.walletClient
  }

  async write<
    const TAbi extends Abi,
    TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
  >(params: SafeWriteCallParams<TAbi, TFunctionName>): Promise<SafeWriteResult> {
    const { address, abi, functionName, args, value, onSimError, onWriteError, lifecycle } = params

    // ── 1. simulate ───────────────────────────────────────────────────────────
    let simResult: unknown
    let request: unknown

    lifecycle?.onPendingWallet?.()

    try {
      const sim = await this.publicClient.simulateContract({
        address,
        abi: abi as Abi,
        functionName: functionName as string,
        args: args as readonly unknown[],
        ...(value !== undefined && { value }),
        account: this.walletClient.account,
      } as any)
      simResult = sim.result
      request = sim.request
    } catch (simError) {
      const parsed = getParsedError({ error: simError, abi })
      onSimError?.(parsed)
      lifecycle?.onFailed?.(simError instanceof Error ? simError : new Error(String(simError)))
      throw simError
    }

    // ── 2. write ──────────────────────────────────────────────────────────────
    let hash: Hex

    try {
      hash = await this.walletClient.writeContract(request as any)
    } catch (writeError) {
      const parsed = getParsedError({ error: writeError, abi })
      onWriteError?.(parsed)
      lifecycle?.onFailed?.(
        writeError instanceof Error ? writeError : new Error(String(writeError))
      )
      throw writeError
    }

    lifecycle?.onSubmitted?.(hash)

    // ── 3. wait for receipt (1 confirmation) ──────────────────────────────────
    lifecycle?.onPendingConfirmation?.(hash)
    const receipt = await this.publicClient.waitForTransactionReceipt({ hash, confirmations: 1 })

    if (receipt.status === 'success') {
      lifecycle?.onConfirmed?.(receipt)
    } else {
      const revertError = new Error('Transaction reverted')
      lifecycle?.onFailed?.(revertError)
      throw revertError
    }

    return { hash, receipt, simResult }
  }
}
