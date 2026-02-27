/**
 * @description safeWrite harness — end-to-end tests
 *
 * Validates the simulate → write → receipt utility exported from handle-error.ts.
 * Mock clients stand in for viem PublicClient / WalletClient so every branch
 * can be exercised without a live node.
 *
 * Covered scenarios:
 *   1. Sim fails — known ABI error decoded via cause.data.errorName
 *   2. Sim fails — viem pre-decoded deep cause chain
 *   3. Sim fails — string revert reason (cause.reason)
 *   4. Sim passes, write reverts — onWriteError receives decoded error
 *   5. Both succeed — returns { hash, receipt, simResult }, no callbacks
 *   6. Receipt fields — status, blockNumber, transactionHash present
 *   7. Type safety — args typed against the ABI at compile time
 */

import { describe, expect, it } from 'bun:test'
import type { Abi, Hex, TransactionReceipt } from 'viem'

import type { EnhancedParsedError, SafeWriteResult } from '../../src/utils/handle-error'
import { safeWrite } from '../../src/utils/handle-error'

// ============================================================================
// Test ABI
// ============================================================================

const MARKET_ABI = [
  {
    type: 'function',
    name: 'buy',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'depositAmount', type: 'uint256' },
      { name: 'minOut', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'donate',
    stateMutability: 'payable',
    inputs: [{ name: 'message', type: 'string' }],
    outputs: [],
  },
  { type: 'error', name: 'Market__BuyClosed', inputs: [] },
  { type: 'error', name: 'Market__SlippageExceeded', inputs: [] },
  {
    type: 'error',
    name: 'ERC20InsufficientAllowance',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'allowance', type: 'uint256' },
      { name: 'needed', type: 'uint256' },
    ],
  },
] as const satisfies Abi

const CONTRACT_ADDRESS = '0xDeadBeef00000000000000000000000000000001' as const
const TX_HASH = '0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1' as Hex

// ============================================================================
// Mock fixtures
// ============================================================================

/** Real Error subclass — mirrors viem's ContractFunctionExecutionError */
class SimRevertError extends Error {
  override cause?: unknown

  constructor(cause: unknown) {
    super('The contract function "buy" reverted.\n\nError: execution reverted')
    this.name = 'ContractFunctionExecutionError'
    this.cause = cause
  }
}

/**
 * Mirrors viem's ContractFunctionRevertedError as a nested cause.
 * `decoded` reproduces cause.data.errorName (simulateContract + ABI path).
 * `reason` reproduces cause.reason (require(false, "msg") path).
 */
class RevertedCause extends Error {
  data?: { errorName: string; args?: readonly unknown[] }
  reason?: string

  constructor(opts: { decoded: { errorName: string } } | { reason: string }) {
    super('The contract reverted.')
    this.name = 'ContractFunctionRevertedError'
    if ('decoded' in opts) this.data = opts.decoded
    else this.reason = opts.reason
  }
}

const MOCK_RECEIPT: TransactionReceipt = {
  transactionHash: TX_HASH,
  blockHash: '0x0000000000000000000000000000000000000000000000000000000000000001' as Hex,
  blockNumber: 42n,
  transactionIndex: 0,
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  to: CONTRACT_ADDRESS,
  contractAddress: null,
  cumulativeGasUsed: 21000n,
  gasUsed: 21000n,
  effectiveGasPrice: 1000000000n,
  status: 'success',
  logsBloom: '0x' as Hex,
  logs: [],
  type: 'eip1559',
}

/** Builds a mock PublicClient that resolves or rejects simulateContract, and resolves waitForTransactionReceipt */
const makePublicClient = (
  simulateImpl: () => Promise<{ request: unknown; result: unknown }>,
  receipt: TransactionReceipt = MOCK_RECEIPT
) => ({
  simulateContract: (_params: unknown) => simulateImpl(),
  waitForTransactionReceipt: (_params: unknown) => Promise.resolve(receipt),
})

/** Builds a mock WalletClient that resolves or rejects writeContract */
const makeWalletClient = (writeImpl: () => Promise<Hex>) => ({
  account: { address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' as const },
  writeContract: (_request: unknown) => writeImpl(),
})

const simOk = (simResult: unknown = 0n) =>
  makePublicClient(() => Promise.resolve({ request: { _tag: 'simRequest' }, result: simResult }))

const writeOk = () => makeWalletClient(() => Promise.resolve(TX_HASH))

// ============================================================================
// 1. Sim fails — known ABI error (cause.data.errorName path)
// ============================================================================

describe('sim fails — known ABI error', () => {
  it('calls onSimError with a fully decoded EnhancedParsedError', async () => {
    const err = new SimRevertError(
      new RevertedCause({ decoded: { errorName: 'Market__BuyClosed' } })
    )

    let captured: EnhancedParsedError | undefined

    await expect(
      safeWrite({
        publicClient: makePublicClient(() => Promise.reject(err)),
        walletClient: writeOk(),
        address: CONTRACT_ADDRESS,
        abi: MARKET_ABI,
        functionName: 'buy',
        args: [100n, 90n],
        onSimError: (p) => {
          captured = p
        },
      })
    ).rejects.toThrow()

    expect(captured!.errorName).toBe('Market__BuyClosed')
    expect(captured!.prettyMessage).not.toBe('Contract error')
    expect(captured!.prettyMessage).not.toBe('Something went wrong')
    expect(captured!.isUserRejection).toBe(false)

    console.log('[sim-fails/known-abi]', {
      errorName: captured!.errorName,
      prettyMessage: captured!.prettyMessage,
      category: captured!.category,
      suggestion: captured!.suggestion,
    })
  })

  it('re-throws the original error, not a wrapper', async () => {
    const err = new SimRevertError(
      new RevertedCause({ decoded: { errorName: 'Market__BuyClosed' } })
    )

    await expect(
      safeWrite({
        publicClient: makePublicClient(() => Promise.reject(err)),
        walletClient: writeOk(),
        address: CONTRACT_ADDRESS,
        abi: MARKET_ABI,
        functionName: 'buy',
        args: [100n, 90n],
      })
    ).rejects.toBe(err)
  })

  it('does not call onWriteError when simulation is what failed', async () => {
    const err = new SimRevertError(
      new RevertedCause({ decoded: { errorName: 'Market__BuyClosed' } })
    )
    let writeErrorCalled = false

    await expect(
      safeWrite({
        publicClient: makePublicClient(() => Promise.reject(err)),
        walletClient: writeOk(),
        address: CONTRACT_ADDRESS,
        abi: MARKET_ABI,
        functionName: 'buy',
        args: [100n, 90n],
        onWriteError: () => {
          writeErrorCalled = true
        },
      })
    ).rejects.toThrow()

    expect(writeErrorCalled).toBe(false)
  })
})

// ============================================================================
// 2. Sim fails — viem pre-decoded deep cause chain
// ============================================================================

describe('sim fails — deep cause chain (cause.data.errorName)', () => {
  it('surfaces errorName from a doubly nested ContractFunctionRevertedError', async () => {
    const err = new SimRevertError({
      name: 'CallExecutionError',
      cause: new RevertedCause({ decoded: { errorName: 'ERC20InsufficientAllowance' } }),
    })

    let captured: EnhancedParsedError | undefined

    await expect(
      safeWrite({
        publicClient: makePublicClient(() => Promise.reject(err)),
        walletClient: writeOk(),
        address: CONTRACT_ADDRESS,
        abi: MARKET_ABI,
        functionName: 'buy',
        args: [100n, 90n],
        onSimError: (p) => {
          captured = p
        },
      })
    ).rejects.toThrow()

    expect(captured!.errorName).toBe('ERC20InsufficientAllowance')
    expect(captured!.prettyMessage).not.toBe('Contract error')

    console.log('[sim-fails/deep-cause]', {
      errorName: captured!.errorName,
      prettyMessage: captured!.prettyMessage,
    })
  })
})

// ============================================================================
// 3. Sim fails — string revert reason (cause.reason)
// ============================================================================

describe('sim fails — string revert reason (cause.reason)', () => {
  it('uses the require() string as prettyMessage', async () => {
    const err = new SimRevertError(new RevertedCause({ reason: 'Presale not started yet' }))

    let captured: EnhancedParsedError | undefined

    await expect(
      safeWrite({
        publicClient: makePublicClient(() => Promise.reject(err)),
        walletClient: writeOk(),
        address: CONTRACT_ADDRESS,
        abi: MARKET_ABI,
        functionName: 'buy',
        args: [100n, 90n],
        onSimError: (p) => {
          captured = p
        },
      })
    ).rejects.toThrow()

    expect(captured!.prettyMessage).toBe('Presale not started yet')
    expect(captured!.isUserRejection).toBe(false)

    console.log('[sim-fails/reason]', { prettyMessage: captured!.prettyMessage })
  })
})

// ============================================================================
// 4. Sim passes, write reverts
// ============================================================================

describe('sim passes, write reverts', () => {
  it('calls onWriteError with decoded error, never calls onSimError', async () => {
    const err = new SimRevertError(
      new RevertedCause({ decoded: { errorName: 'Market__SlippageExceeded' } })
    )

    let simErrorCalled = false
    let captured: EnhancedParsedError | undefined

    await expect(
      safeWrite({
        publicClient: simOk(),
        walletClient: makeWalletClient(() => Promise.reject(err)),
        address: CONTRACT_ADDRESS,
        abi: MARKET_ABI,
        functionName: 'buy',
        args: [100n, 90n],
        onSimError: () => {
          simErrorCalled = true
        },
        onWriteError: (p) => {
          captured = p
        },
      })
    ).rejects.toThrow()

    expect(simErrorCalled).toBe(false)
    expect(captured!.errorName).toBe('Market__SlippageExceeded')
    expect(captured!.prettyMessage).not.toBe('Contract error')

    console.log('[write-reverts]', {
      errorName: captured!.errorName,
      prettyMessage: captured!.prettyMessage,
    })
  })

  it('re-throws the original write error', async () => {
    const err = new SimRevertError(
      new RevertedCause({ decoded: { errorName: 'Market__BuyClosed' } })
    )

    await expect(
      safeWrite({
        publicClient: simOk(),
        walletClient: makeWalletClient(() => Promise.reject(err)),
        address: CONTRACT_ADDRESS,
        abi: MARKET_ABI,
        functionName: 'buy',
        args: [100n, 90n],
      })
    ).rejects.toBe(err)
  })
})

// ============================================================================
// 5. Both succeed — hash, receipt, simResult returned
// ============================================================================

describe('both succeed', () => {
  it('returns hash, receipt, and simResult — no callbacks fired', async () => {
    const SIM_RESULT = BigInt(42)
    let simErrorCalled = false
    let writeErrorCalled = false

    const result: SafeWriteResult = await safeWrite({
      publicClient: simOk(SIM_RESULT),
      walletClient: writeOk(),
      address: CONTRACT_ADDRESS,
      abi: MARKET_ABI,
      functionName: 'buy',
      args: [100n, 90n],
      onSimError: () => {
        simErrorCalled = true
      },
      onWriteError: () => {
        writeErrorCalled = true
      },
    })

    expect(result.hash).toBe(TX_HASH)
    expect(result.simResult).toBe(SIM_RESULT)
    expect(result.receipt).toBeDefined()
    expect(simErrorCalled).toBe(false)
    expect(writeErrorCalled).toBe(false)

    console.log('[both-succeed]', {
      hash: result.hash,
      simResult: result.simResult,
      receipt: { status: result.receipt.status, blockNumber: result.receipt.blockNumber },
    })
  })

  it('works for payable functions with a value param', async () => {
    const result = await safeWrite({
      publicClient: simOk(),
      walletClient: writeOk(),
      address: CONTRACT_ADDRESS,
      abi: MARKET_ABI,
      functionName: 'donate',
      args: ['hello'],
      value: 1n * 10n ** 18n,
    })

    expect(result.hash).toBe(TX_HASH)
    expect(result.receipt).toBeDefined()
  })
})

// ============================================================================
// 6. Receipt fields
// ============================================================================

describe('receipt', () => {
  it('receipt has status, blockNumber, and transactionHash', async () => {
    const result = await safeWrite({
      publicClient: simOk(),
      walletClient: writeOk(),
      address: CONTRACT_ADDRESS,
      abi: MARKET_ABI,
      functionName: 'buy',
      args: [100n, 90n],
    })

    expect(result.receipt.status).toBe('success')
    expect(result.receipt.blockNumber).toBe(42n)
    expect(result.receipt.transactionHash).toBe(TX_HASH)
  })

  it('receipt with a custom block returns those fields correctly', async () => {
    const customReceipt: TransactionReceipt = {
      ...MOCK_RECEIPT,
      blockNumber: 9999n,
      gasUsed: 55000n,
    }

    const result = await safeWrite({
      publicClient: makePublicClient(
        () => Promise.resolve({ request: {}, result: null }),
        customReceipt
      ),
      walletClient: writeOk(),
      address: CONTRACT_ADDRESS,
      abi: MARKET_ABI,
      functionName: 'buy',
      args: [100n, 90n],
    })

    expect(result.receipt.blockNumber).toBe(9999n)
    expect(result.receipt.gasUsed).toBe(55000n)
  })
})

// ============================================================================
// 7. Type safety — args typed against the ABI at compile time
// ============================================================================

describe('type safety', () => {
  it('accepts correctly typed args for the chosen functionName', async () => {
    // Primarily a compile-time check — tsc/tsgo errors here if args mismatch the ABI
    const result = await safeWrite({
      publicClient: simOk(),
      walletClient: writeOk(),
      address: CONTRACT_ADDRESS,
      abi: MARKET_ABI,
      functionName: 'buy' as const,
      args: [500n * 10n ** 18n, 490n * 10n ** 18n] as const,
    })

    expect(result.hash).toBe(TX_HASH)
    expect(result.receipt).toBeDefined()
  })
})
