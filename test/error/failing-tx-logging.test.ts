/**
 * @description Failing transaction logging — end-to-end via handle-error.ts
 *
 * Each test simulates a realistic viem write-action revert, passes it through
 * `getParsedError`, and asserts a fully-decoded result (non-null errorName,
 * non-generic prettyMessage). Every extraction path in handle-error.ts is covered:
 *
 *   1. data field     — raw ABI-encoded revert payload (selector + args)
 *   2. viem pre-decoded — cause.data.errorName set by viem when the ABI is known
 *   3. nested cause   — selector on a deeply nested cause.signature
 *   4. message pattern — hex selector embedded in shortMessage / message text
 *   5. string reason  — require(false, "reason") stored in cause.reason
 *   6. custom ABI     — unknown error decoded via an ABI supplied at call time
 */

import { describe, expect, it } from 'bun:test'
import type { Hex } from 'viem'
import { keccak256, toHex } from 'viem'

import { getParsedError } from '../../src/utils/handle-error'

// ============================================================================
// Fixtures
// ============================================================================

/** Computes the 4-byte selector for an error signature */
function sel(name: string, types: string[] = []): Hex {
  return keccak256(toHex(`${name}(${types.join(',')})`)).slice(0, 10) as Hex
}

/**
 * Real Error subclass that mirrors viem's ContractFunctionExecutionError.
 * Fields are set to match what viem attaches to the thrown instance.
 */
class WriteRevertError extends Error {
  data?: Hex
  override cause?: unknown

  constructor(opts: { data?: Hex; cause?: unknown; shortMessage?: string } = {}) {
    super(
      [
        'The contract function "deposit" reverted.',
        '',
        opts.shortMessage ?? 'Error: execution reverted',
        '',
        'Contract Call:',
        '  address:  0xDeadBeef00000000000000000000000000000001',
        '  function: deposit(uint256 amount)',
        '  sender:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      ].join('\n')
    )
    this.name = 'ContractFunctionExecutionError'
    if (opts.data !== undefined) this.data = opts.data
    if (opts.cause !== undefined) this.cause = opts.cause
  }
}

/**
 * Mirrors viem's ContractFunctionRevertedError — used as a cause.
 * viem sets `.data` to the decoded result when the contract ABI is known
 * (simulateContract / writeContract path), or `.signature` for the raw selector.
 */
class ViemRevertedError extends Error {
  data?: { errorName: string; args?: readonly unknown[] }
  signature?: Hex
  reason?: string

  constructor(
    opts:
      | { decoded: { errorName: string; args?: readonly unknown[] } }
      | { signature: Hex }
      | { reason: string }
  ) {
    super('The contract reverted.')
    this.name = 'ContractFunctionRevertedError'

    if ('decoded' in opts) {
      this.data = opts.decoded
    } else if ('signature' in opts) {
      this.signature = opts.signature
    } else {
      this.reason = opts.reason
    }
  }
}

// ── well-known selectors ──────────────────────────────────────────────────────
const SEL_ALLOWANCE = '0xfb8f41b2' as Hex // ERC20InsufficientAllowance(address,uint256,uint256)
const SEL_BALANCE = '0xe450d38c' as Hex // ERC20InsufficientBalance(address,uint256,uint256)

// ── full ABI-encoded payloads ─────────────────────────────────────────────────
const ADDR = '000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266'
const ZERO = '0000000000000000000000000000000000000000000000000000000000000000'
const AMT = '0000000000000000000000000000000000000000000000056bc75e2d63100000' // 100e18

const DATA_ALLOWANCE = `${SEL_ALLOWANCE}${ADDR}${ZERO}${AMT}` as Hex // spender, allowance=0, needed
const DATA_BALANCE = `${SEL_BALANCE}${ADDR}${ZERO}${AMT}` as Hex // account, balance=0, needed

// ── assertion helper ──────────────────────────────────────────────────────────
function assertDecoded(parsed: ReturnType<typeof getParsedError>, label: string) {
  expect(parsed.errorName, `${label} › errorName must not be null`).not.toBeNull()
  expect(parsed.prettyMessage, `${label} › must not fall back to "Contract error"`).not.toBe(
    'Contract error'
  )
  expect(parsed.prettyMessage, `${label} › must not fall back to "Something went wrong"`).not.toBe(
    'Something went wrong'
  )
  expect(parsed.isUserRejection, `${label} › must not be flagged as user rejection`).toBe(false)
}

// ============================================================================
// 1. data field — raw ABI-encoded payload on the error
// ============================================================================

describe('path: data field (raw ABI-encoded payload)', () => {
  it('decodes ERC20InsufficientAllowance — selector + args in data', () => {
    const err = new WriteRevertError({ data: DATA_ALLOWANCE })
    const parsed = getParsedError({ error: err })

    assertDecoded(parsed, 'ERC20InsufficientAllowance')
    expect(parsed.errorName).toBe('ERC20InsufficientAllowance')
    expect(parsed.signature).toBe(SEL_ALLOWANCE)
    expect(parsed.decodedArgs).toBeDefined()

    console.log('[data-field] decoded:', {
      errorName: parsed.errorName,
      prettyMessage: parsed.prettyMessage,
      decodedArgs: parsed.decodedArgs,
    })
  })

  it('decodes ERC20InsufficientBalance — selector + args in data', () => {
    const err = new WriteRevertError({ data: DATA_BALANCE })
    const parsed = getParsedError({ error: err })

    assertDecoded(parsed, 'ERC20InsufficientBalance')
    expect(parsed.errorName).toBe('ERC20InsufficientBalance')
    expect(parsed.decodedArgs).toBeDefined()

    console.log('[data-field] decoded:', {
      errorName: parsed.errorName,
      prettyMessage: parsed.prettyMessage,
      decodedArgs: parsed.decodedArgs,
    })
  })

  it('decodes a custom no-input error — bare selector + custom ABI', () => {
    const name = 'Market__BuyClosed'
    const abi = [{ type: 'error', name, inputs: [] }] as const
    const err = new WriteRevertError({ data: sel(name) })
    const parsed = getParsedError({ error: err, abi })

    assertDecoded(parsed, name)
    expect(parsed.errorName).toBe(name)
    expect(parsed.formattedErrorName).toBeDefined()

    console.log('[data-field] custom (no inputs):', {
      errorName: parsed.errorName,
      formattedErrorName: parsed.formattedErrorName,
      prettyMessage: parsed.prettyMessage,
    })
  })

  it('decodes a custom error with inputs — full data + custom ABI', () => {
    const name = 'Vault__SlippageExceeded'
    const abi = [
      {
        type: 'error',
        name,
        inputs: [
          { name: 'expected', type: 'uint256' },
          { name: 'actual', type: 'uint256' },
        ],
      },
    ] as const
    const s = sel(name, ['uint256', 'uint256'])
    const a1 = '0000000000000000000000000000000000000000000000000000000000000064' // 100
    const a2 = '0000000000000000000000000000000000000000000000000000000000000032' //  50
    const err = new WriteRevertError({ data: `${s}${a1}${a2}` as Hex })
    const parsed = getParsedError({ error: err, abi })

    assertDecoded(parsed, name)
    expect(parsed.errorName).toBe(name)
  })
})

// ============================================================================
// 2. viem pre-decoded — cause.data.errorName set by viem
// ============================================================================

describe('path: viem pre-decoded (cause.data.errorName)', () => {
  it('uses viem-decoded errorName and resolves UX mapping for known errors', () => {
    const err = new WriteRevertError({
      cause: new ViemRevertedError({
        decoded: {
          errorName: 'ERC20InsufficientAllowance',
          args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', BigInt(0), BigInt(100e18)] as const,
        },
      }),
    })

    const parsed = getParsedError({ error: err })

    assertDecoded(parsed, 'viem pre-decoded known')
    expect(parsed.errorName).toBe('ERC20InsufficientAllowance')
    expect(parsed.prettyMessage).not.toBe('Contract error')

    console.log('[viem-predecoded] known UX mapping:', {
      errorName: parsed.errorName,
      prettyMessage: parsed.prettyMessage,
      category: parsed.category,
      suggestion: parsed.suggestion,
    })
  })

  it('uses viem-decoded errorName for custom errors not in UX registry', () => {
    const name = 'CreditFacility__LoanNotFound'
    const err = new WriteRevertError({
      cause: new ViemRevertedError({ decoded: { errorName: name } }),
    })

    const parsed = getParsedError({ error: err })

    assertDecoded(parsed, 'viem pre-decoded custom')
    expect(parsed.errorName).toBe(name)
    expect(parsed.formattedErrorName).toBeDefined()

    console.log('[viem-predecoded] custom error:', {
      errorName: parsed.errorName,
      formattedErrorName: parsed.formattedErrorName,
      prettyMessage: parsed.prettyMessage,
    })
  })

  it('uses viem-decoded errorName from a doubly-nested cause chain', () => {
    // ContractFunctionExecutionError → CallExecutionError → ContractFunctionRevertedError
    const err = new WriteRevertError({
      cause: {
        name: 'CallExecutionError',
        cause: new ViemRevertedError({ decoded: { errorName: 'ERC20InsufficientBalance' } }),
      },
    })

    const parsed = getParsedError({ error: err })

    assertDecoded(parsed, 'doubly nested viem pre-decoded')
    expect(parsed.errorName).toBe('ERC20InsufficientBalance')
  })
})

// ============================================================================
// 3. nested cause — selector on cause.signature
// ============================================================================

describe('path: nested cause.signature', () => {
  it('decodes ERC20InsufficientBalance from a nested RevertedCauseError.signature', () => {
    const err = new WriteRevertError({
      cause: {
        name: 'CallExecutionError',
        cause: new ViemRevertedError({ signature: SEL_BALANCE }),
      },
    })

    const parsed = getParsedError({ error: err })

    assertDecoded(parsed, 'nested signature')
    expect(parsed.errorName).toBe('ERC20InsufficientBalance')
    expect(parsed.signature).toBe(SEL_BALANCE)

    console.log('[nested-cause] decoded:', {
      errorName: parsed.errorName,
      prettyMessage: parsed.prettyMessage,
    })
  })

  it('decodes a custom error whose selector is in a nested cause.data hex string', () => {
    const name = 'Market__SellClosed'
    const abi = [{ type: 'error', name, inputs: [] }] as const
    const err = new WriteRevertError({
      cause: {
        name: 'RawContractError',
        data: sel(name),
      },
    })

    const parsed = getParsedError({ error: err, abi })

    assertDecoded(parsed, 'nested cause.data hex')
    expect(parsed.errorName).toBe(name)
  })
})

// ============================================================================
// 4. message pattern — selector embedded in shortMessage / message text
// ============================================================================

describe('path: selector in message text', () => {
  it('decodes from a selector in shortMessage ("reverted with 0x...")', () => {
    const err = new WriteRevertError({
      shortMessage: `reverted with ${SEL_ALLOWANCE}`,
    })

    const parsed = getParsedError({ error: err })

    assertDecoded(parsed, 'shortMessage selector')
    expect(parsed.errorName).toBe('ERC20InsufficientAllowance')

    console.log('[message-pattern] decoded:', {
      errorName: parsed.errorName,
      prettyMessage: parsed.prettyMessage,
    })
  })

  it('decodes from a "selector: 0x..." pattern in the outer message', () => {
    const err = new WriteRevertError({
      shortMessage: `execution reverted with selector: ${SEL_BALANCE}`,
    })

    const parsed = getParsedError({ error: err })

    assertDecoded(parsed, 'message body selector')
    expect(parsed.errorName).toBe('ERC20InsufficientBalance')
  })
})

// ============================================================================
// 5. string reason — require(false, "reason") via cause.reason
// ============================================================================

describe('path: string revert reason (cause.reason)', () => {
  it('uses the reason string as prettyMessage when no selector is present', () => {
    const err = new WriteRevertError({
      cause: new ViemRevertedError({ reason: 'Market is paused' }),
    })

    const parsed = getParsedError({ error: err })

    expect(parsed.prettyMessage).toBe('Market is paused')
    expect(parsed.isUserRejection).toBe(false)
    expect(parsed.recoveryActions.length).toBeGreaterThan(0)

    console.log('[string-reason] decoded:', {
      prettyMessage: parsed.prettyMessage,
      suggestion: parsed.suggestion,
    })
  })

  it('handles a nested reason in a multi-level cause chain', () => {
    const err = new WriteRevertError({
      cause: {
        name: 'CallExecutionError',
        cause: new ViemRevertedError({ reason: 'Presale not started' }),
      },
    })

    const parsed = getParsedError({ error: err })

    expect(parsed.prettyMessage).toBe('Presale not started')
    expect(parsed.isUserRejection).toBe(false)
  })
})

// ============================================================================
// 6. namespaced / formatted error names
// ============================================================================

describe('path: namespaced error names (Module__X__Y)', () => {
  it('formats Module__X__Y with source context via the viem pre-decoded path', () => {
    const name = 'Module__CreditFacility__InvalidLoanId'
    const err = new WriteRevertError({
      cause: new ViemRevertedError({ decoded: { errorName: name } }),
    })

    const parsed = getParsedError({ error: err })

    assertDecoded(parsed, name)
    expect(parsed.errorName).toBe(name)
    expect(parsed.formattedErrorName).toContain('Credit Facility')

    console.log('[namespaced] formatted:', {
      errorName: parsed.errorName,
      formattedErrorName: parsed.formattedErrorName,
      prettyMessage: parsed.prettyMessage,
    })
  })

  it('formats Module__X__Y via the data field + custom ABI path', () => {
    const name = 'Module__Floor__InvalidSegmentCount'
    const abi = [{ type: 'error', name, inputs: [] }] as const
    const err = new WriteRevertError({ data: sel(name) })
    const parsed = getParsedError({ error: err, abi })

    assertDecoded(parsed, name)
    expect(parsed.formattedErrorName).toContain('Floor')

    console.log('[namespaced] formatted via data+ABI:', {
      errorName: parsed.errorName,
      formattedErrorName: parsed.formattedErrorName,
    })
  })
})

// ============================================================================
// Cross-cutting: user rejection is never confused with a contract revert
// ============================================================================

describe('user rejection vs contract revert', () => {
  it('marks wallet rejections and fully decodes contract reverts side by side', () => {
    const rejection = new Error('User rejected the request')
    const revert = new WriteRevertError({
      cause: new ViemRevertedError({
        decoded: { errorName: 'ERC20InsufficientAllowance' },
      }),
    })

    const rParsed = getParsedError({ error: rejection })
    const cParsed = getParsedError({ error: revert })

    expect(rParsed.isUserRejection).toBe(true)
    expect(rParsed.prettyMessage).toBe('Transaction cancelled')

    assertDecoded(cParsed, 'contract revert side of rejection test')
    expect(cParsed.isUserRejection).toBe(false)
    expect(cParsed.errorName).toBe('ERC20InsufficientAllowance')

    console.log('[rejection-vs-revert]', {
      rejection: { isUserRejection: rParsed.isUserRejection, prettyMessage: rParsed.prettyMessage },
      revert: { isUserRejection: cParsed.isUserRejection, errorName: cParsed.errorName },
    })
  })
})
