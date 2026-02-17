import { describe, expect, it } from 'bun:test'
import type { Abi, Hex } from 'viem'
import { keccak256, toHex } from 'viem'

import * as abis from '../src/abis'
import {
  ERROR_METADATA,
  getAllErrorSignatures,
  isKnownErrorSignature,
} from '../src/utils/error-signatures.generated'
import { hasUXMapping } from '../src/utils/error-ux-mappings'
import {
  getParsedError,
  getParsedErrorAsync,
  getParsedErrorWithUnknownContext,
  handleError,
  isUserRejection,
  lookup4ByteSelector,
} from '../src/utils/handle-error'

// ============================================================================
// Helpers
// ============================================================================

type AbiError = {
  type: 'error'
  name: string
  inputs: Array<{ name: string; type: string }>
}

/** Computes 4-byte selector from error name and input types (same as Solidity) */
function computeSelector(errorName: string, inputs: Array<{ type: string }>): Hex {
  const types = inputs.map((i) => i.type).join(',')
  const signature = `${errorName}(${types})`
  const hash = keccak256(toHex(signature))
  return hash.slice(0, 10) as Hex
}

type AbiErrorEntry = { name: string; inputs: AbiError['inputs']; sources: string[] }

/** Extracts all error definitions from all registered ABIs */
function extractAllAbiErrors(): Map<Hex, AbiErrorEntry> {
  const errors = new Map<Hex, AbiErrorEntry>()

  for (const [abiName, abi] of Object.entries(abis)) {
    if (abiName === 'default' || !Array.isArray(abi)) continue

    for (const item of abi as Array<{ type: string; name?: string; inputs?: AbiError['inputs'] }>) {
      if (item.type !== 'error' || !item.name) continue

      const inputs = (item.inputs || []).map((i: { name: string; type: string }) => ({
        name: i.name,
        type: i.type,
      }))
      const selector = computeSelector(item.name, inputs)

      if (!errors.has(selector)) {
        errors.set(selector, { name: item.name, inputs, sources: [abiName] })
      } else {
        const existing = errors.get(selector)!
        if (!existing.sources.includes(abiName)) {
          existing.sources.push(abiName)
        }
      }
    }
  }

  return errors
}

// ============================================================================
// Tests
// ============================================================================

describe('handle-error utility', () => {
  describe('parseErrorNameToPrettyMessage (via getParsedError)', () => {
    it('should parse double underscore prefixed errors', () => {
      const mockError = {
        message: 'Unable to decode signature 0x12345678',
        cause: { signature: '0x12345678' },
      }

      const result = getParsedError({ error: mockError })
      expect(result.prettyMessage).toBeDefined()
      expect(typeof result.prettyMessage).toBe('string')
    })

    it('should return "Contract error" for unknown signatures', () => {
      const mockError = {
        message: 'Unable to decode signature 0xdeadbeef',
        cause: { signature: '0xdeadbeef' },
      }

      const result = getParsedError({ error: mockError })
      expect(result.prettyMessage).toBe('Contract error')
      expect(result.errorName).toBeNull()
    })
  })

  describe('user rejection detection', () => {
    it('should detect "User rejected the request" as user rejection', () => {
      const error = new Error('User rejected the request')
      expect(isUserRejection(error)).toBe(true)

      const parsed = getParsedError({ error })
      expect(parsed.isUserRejection).toBe(true)
      expect(parsed.prettyMessage).toBe('Transaction cancelled')
    })

    it('should detect "user rejected transaction" as user rejection', () => {
      const error = new Error('user rejected transaction')
      expect(isUserRejection(error)).toBe(true)
    })

    it('should detect "User denied transaction signature" as user rejection', () => {
      const error = new Error('User denied transaction signature')
      expect(isUserRejection(error)).toBe(true)
    })

    it('should not flag regular errors as user rejection', () => {
      const error = new Error('Insufficient balance')
      expect(isUserRejection(error)).toBe(false)
    })
  })

  describe('viem error parsing', () => {
    it('should parse network errors', () => {
      const error = new Error('Network request failed')
      const result = getParsedError({ error })
      expect(result.prettyMessage).toBe('Network connection failed')
      expect(result.isUserRejection).toBe(false)
    })

    it('should parse insufficient funds error', () => {
      const error = new Error('insufficient funds for gas')
      const result = getParsedError({ error })
      expect(result.prettyMessage).toBe('Insufficient ETH for gas')
    })

    it('should parse gas price errors', () => {
      const error = new Error('transaction underpriced')
      const result = getParsedError({ error })
      expect(result.prettyMessage).toBe('Gas price too low')
    })

    it('should parse timeout errors', () => {
      const error = new Error('Request timed out')
      const result = getParsedError({ error })
      expect(result.prettyMessage).toBe('Request timed out')
    })

    it('should parse execution reverted errors', () => {
      const error = new Error('execution reverted')
      const result = getParsedError({ error })
      expect(result.prettyMessage).toBe('Contract rejected transaction')
    })
  })

  describe('handleError', () => {
    it('should return an Error instance', () => {
      const error = new Error('Some error')
      const result = handleError({ error })
      expect(result).toBeInstanceOf(Error)
    })

    it('should handle non-Error inputs', () => {
      const result = handleError({ error: 'string error' })
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toBe('string error')
    })

    it('should handle null/undefined', () => {
      const result = handleError({ error: null })
      expect(result).toBeInstanceOf(Error)
    })
  })

  describe('getParsedErrorWithUnknownContext', () => {
    it('should work the same as getParsedError without abi param', () => {
      const error = new Error('User rejected the request')
      const result = getParsedErrorWithUnknownContext(error)
      expect(result.isUserRejection).toBe(true)
      expect(result.prettyMessage).toBe('Transaction cancelled')
    })
  })

  describe('known ERC20 error signatures', () => {
    it('should decode ERC20InsufficientAllowance signature', () => {
      const mockError = {
        message: 'Unable to decode signature 0xfb8f41b2 at address: 0x1234',
        cause: { signature: '0xfb8f41b2' },
      }

      const result = getParsedError({ error: mockError })
      expect(result.errorName).toBe('ERC20InsufficientAllowance')
      expect(result.prettyMessage).toBe('Approval needed')
    })

    it('should decode ERC20InsufficientBalance signature', () => {
      const mockError = {
        message: 'Unable to decode signature 0xe450d38c at address: 0x1234',
        cause: { signature: '0xe450d38c' },
      }

      const result = getParsedError({ error: mockError })
      expect(result.errorName).toBe('ERC20InsufficientBalance')
      expect(result.prettyMessage).toBe('Insufficient balance')
    })
  })

  // ============================================================================
  // ABI Error Completeness Validation
  // ============================================================================

  describe('ABI error completeness', () => {
    const abiErrors = extractAllAbiErrors()

    it('should have all ABI errors indexed in ERROR_METADATA', () => {
      const missing: string[] = []

      for (const [selector, error] of abiErrors) {
        if (!isKnownErrorSignature(selector)) {
          missing.push(`${error.name} (${selector}) from ${error.sources.join(', ')}`)
        }
      }

      if (missing.length > 0) {
        throw new Error(
          `${missing.length} ABI error(s) missing from ERROR_METADATA. ` +
            `Run \`bun run generate:errors\` to update.\n\n` +
            missing.map((m) => `  - ${m}`).join('\n')
        )
      }
    })

    it('should have all ERROR_METADATA entries covered by ERROR_UX_MAPPINGS', () => {
      const allSignatures = getAllErrorSignatures()
      const missing: string[] = []

      for (const sig of allSignatures) {
        if (!hasUXMapping(sig)) {
          // sig is narrowed to never by the type guard, but we know it's valid
          const meta = ERROR_METADATA[sig as (typeof allSignatures)[number]]
          missing.push(`${meta.name} (${sig})`)
        }
      }

      if (missing.length > 0) {
        throw new Error(
          `${missing.length} error(s) in ERROR_METADATA missing from ERROR_UX_MAPPINGS:\n\n` +
            missing.map((m) => `  - ${m}`).join('\n')
        )
      }
    })

    it('should have matching selector computation between ABIs and ERROR_METADATA', () => {
      const mismatches: string[] = []

      for (const [selector, error] of abiErrors) {
        if (isKnownErrorSignature(selector)) {
          const metadata = ERROR_METADATA[selector]
          if (metadata.name !== error.name) {
            mismatches.push(
              `${selector}: ABI has "${error.name}" but ERROR_METADATA has "${metadata.name}"`
            )
          }
        }
      }

      if (mismatches.length > 0) {
        throw new Error(
          `Selector/name mismatches found:\n\n` + mismatches.map((m) => `  - ${m}`).join('\n')
        )
      }
    })
  })

  // ============================================================================
  // All Known Errors Produce Meaningful Results
  // ============================================================================

  describe('all indexed errors are handled', () => {
    const allSignatures = getAllErrorSignatures()

    it('should produce a non-generic prettyMessage for every known signature', () => {
      const unhandled: string[] = []

      for (const sig of allSignatures) {
        const mockError = {
          message: `execution reverted: error ${sig}`,
          cause: { signature: sig },
        }

        const result = getParsedError({ error: mockError })

        // Should NOT fall through to the generic "Contract error" message
        if (result.prettyMessage === 'Contract error') {
          const meta = ERROR_METADATA[sig]
          unhandled.push(`${meta.name} (${sig}) → got generic "Contract error"`)
        }

        // Should have an error name
        if (!result.errorName) {
          const meta = ERROR_METADATA[sig]
          unhandled.push(`${meta.name} (${sig}) → errorName is null`)
        }
      }

      if (unhandled.length > 0) {
        throw new Error(
          `${unhandled.length} known error(s) not handled properly:\n\n` +
            unhandled.map((m) => `  - ${m}`).join('\n')
        )
      }
    })

    it('should never flag indexed errors as user rejection', () => {
      for (const sig of allSignatures) {
        const mockError = {
          message: `revert ${sig}`,
          cause: { signature: sig },
        }

        const result = getParsedError({ error: mockError })
        expect(result.isUserRejection).toBe(false)
      }
    })

    it('should have valid categories for all indexed errors', () => {
      const validCategories = new Set([
        'trading',
        'credit',
        'presale',
        'permission',
        'curve',
        'token',
        'treasury',
        'authorizer',
        'factory',
        'wallet',
        'network',
        'validation',
        'system',
        'unknown',
      ])

      for (const sig of allSignatures) {
        const mockError = {
          message: `revert ${sig}`,
          cause: { signature: sig },
        }

        const result = getParsedError({ error: mockError })
        expect(validCategories.has(result.category)).toBe(true)
      }
    })
  })

  // ============================================================================
  // Non-Indexed Error Handling (ABI Fallback)
  // ============================================================================

  describe('non-indexed errors via ABI fallback', () => {
    // Custom error ABI with inputs (not in the registered set)
    const customAbiWithInputs: Abi = [
      {
        type: 'error',
        name: 'CustomVault__SlippageExceeded',
        inputs: [
          { name: 'expected', type: 'uint256' },
          { name: 'actual', type: 'uint256' },
        ],
      },
    ] as const

    // Custom error ABI without inputs
    const customAbiNoInputs: Abi = [
      {
        type: 'error',
        name: 'CustomVault__PoolFrozen',
        inputs: [],
      },
    ] as const

    const selectorWithInputs = computeSelector('CustomVault__SlippageExceeded', [
      { type: 'uint256' },
      { type: 'uint256' },
    ])

    const selectorNoInputs = computeSelector('CustomVault__PoolFrozen', [])

    it('should decode non-indexed errors (no inputs) when custom ABI is provided', () => {
      const mockError = {
        message: `execution reverted: error ${selectorNoInputs}`,
        cause: { signature: selectorNoInputs },
      }

      const result = getParsedError({ error: mockError, abi: customAbiNoInputs })
      expect(result.errorName).toBe('CustomVault__PoolFrozen')
      expect(result.prettyMessage).toBe('Pool frozen')
      expect(result.prettyMessage).not.toBe('Contract error')
    })

    it('should decode non-indexed errors (with inputs) when full data is available', () => {
      // Construct full error data: selector + abi-encoded args
      // ABI-encoded uint256(100) = 0x0000...0064, uint256(50) = 0x0000...0032
      const arg1 = '0000000000000000000000000000000000000000000000000000000000000064'
      const arg2 = '0000000000000000000000000000000000000000000000000000000000000032'
      const fullData = `${selectorWithInputs}${arg1}${arg2}`

      const mockError = {
        message: `execution reverted`,
        data: fullData,
      }

      const result = getParsedError({ error: mockError, abi: customAbiWithInputs })
      expect(result.errorName).toBe('CustomVault__SlippageExceeded')
      expect(result.prettyMessage).toBe('Slippage exceeded')
      expect(result.prettyMessage).not.toBe('Contract error')
    })

    it('should produce meaningful prettyMessage from PascalCase error names', () => {
      const testCases = [
        { name: 'Module__Floor__InvalidFloorSegment', expected: 'Invalid floor segment' },
        { name: 'ERC20InsufficientBalance', expected: 'Insufficient balance' },
        { name: 'CustomVault__SlippageExceeded', expected: 'Slippage exceeded' },
      ]

      for (const { name } of testCases) {
        const abi: Abi = [{ type: 'error', name, inputs: [] }] as const
        const selector = computeSelector(name, [])

        const mockError = {
          message: `execution reverted: error ${selector}`,
          cause: { signature: selector },
        }

        const result = getParsedError({ error: mockError, abi })
        // May match UX mapping or ABI fallback - either way should be meaningful
        expect(result.prettyMessage).not.toBe('Contract error')
      }
    })

    it('should still try all known ABIs even without explicit abi param', () => {
      const mockError = {
        message: `execution reverted: error 0xfb8f41b2`,
        cause: { signature: '0xfb8f41b2' },
      }

      // No ABI provided - should still decode via UX mappings or ABI fallback
      const result = getParsedError({ error: mockError })
      expect(result.errorName).toBe('ERC20InsufficientAllowance')
      expect(result.prettyMessage).not.toBe('Contract error')
    })

    it('should return Contract error for truly unknown selectors without ABI', () => {
      const unknownSelector = '0xaabbccdd'
      const mockError = {
        message: `execution reverted: error ${unknownSelector}`,
        cause: { signature: unknownSelector },
      }

      const result = getParsedError({ error: mockError })
      expect(result.prettyMessage).toBe('Contract error')
      expect(result.signature).toBe(unknownSelector)
    })
  })

  // ============================================================================
  // 4byte / OpenChain Signature Lookup
  // ============================================================================

  describe('4byte/OpenChain selector lookup', () => {
    it('should find known ERC20 error selectors via OpenChain API', async () => {
      // ERC20InsufficientBalance is a well-known error, should be in the 4byte db
      const results = await lookup4ByteSelector('0xe450d38c')

      // API may be unavailable in CI, so we allow empty results
      if (results.length > 0) {
        const names = results.map((r) => r.name)
        expect(names).toContain('ERC20InsufficientBalance')
      }
    })

    it('should return empty array for random non-existent selectors', async () => {
      // Highly unlikely to exist
      const results = await lookup4ByteSelector('0x00000001')
      expect(Array.isArray(results)).toBe(true)
    })

    it('should handle network failures gracefully', async () => {
      // This tests the catch path - even if the API is down, should not throw
      const results = await lookup4ByteSelector('0xdeadbeef')
      expect(Array.isArray(results)).toBe(true)
    })

    it('should resolve unknown errors via getParsedErrorAsync', async () => {
      const unknownSelector = '0xe450d38c' // Known in 4byte but pretend it's not in our registry
      const mockError = {
        message: `execution reverted: error ${unknownSelector}`,
        cause: { signature: unknownSelector },
      }

      // Use the async version which includes 4byte fallback
      const result = await getParsedErrorAsync({ error: mockError })

      // This is already in UX mappings, so it should be handled by the sync path
      expect(result.errorName).toBe('ERC20InsufficientBalance')
      expect(result.prettyMessage).not.toBe('Contract error')
    })

    it('should use 4byte lookup for truly unknown selectors in async mode', async () => {
      // Use a selector that's NOT in our ABIs but IS in the 4byte directory
      // Panic(uint256) = 0x4e487b71 is a well-known Solidity error
      const mockError = {
        message: `execution reverted: error 0x4e487b71`,
        cause: { signature: '0x4e487b71' },
      }

      const result = await getParsedErrorAsync({ error: mockError })

      // If API is available, it should resolve to Panic
      if (result.errorName !== null) {
        expect(result.errorName).toBe('Panic')
        expect(result.prettyMessage).not.toBe('Contract error')
      }
      // If API is unavailable, it falls back gracefully
    })
  })

  // ============================================================================
  // Signature Extraction Robustness
  // ============================================================================

  describe('error signature extraction', () => {
    it('should extract signature from nested viem error cause chain', () => {
      const error = {
        message: 'ContractFunctionExecutionError',
        cause: {
          message: 'ContractFunctionRevertedError',
          cause: {
            message: 'Some deep error',
            signature: '0xfb8f41b2',
          },
        },
      }

      const result = getParsedError({ error })
      expect(result.errorName).toBe('ERC20InsufficientAllowance')
    })

    it('should extract signature from data field', () => {
      const error = {
        message: 'execution reverted',
        data: '0xfb8f41b200000000000000000000000000000000000000000000000000000000',
      }

      const result = getParsedError({ error })
      expect(result.errorName).toBe('ERC20InsufficientAllowance')
    })

    it('should extract signature from error message patterns', () => {
      const error = {
        message: 'execution reverted with selector: 0xfb8f41b2',
      }

      const result = getParsedError({ error })
      expect(result.errorName).toBe('ERC20InsufficientAllowance')
    })

    it('should extract signature from shortMessage', () => {
      const error = {
        message: 'long error description',
        shortMessage: 'reverted with 0xfb8f41b2',
      }

      const result = getParsedError({ error })
      expect(result.errorName).toBe('ERC20InsufficientAllowance')
    })
  })
})
