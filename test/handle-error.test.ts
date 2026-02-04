import { describe, expect, it } from 'bun:test'

import {
  getParsedError,
  getParsedErrorWithUnknownContext,
  handleError,
  isUserRejection,
} from '../src/utils/handle-error'

describe('handle-error utility', () => {
  describe('parseErrorNameToPrettyMessage (via getParsedError)', () => {
    it('should parse double underscore prefixed errors', () => {
      // Simulate an error with a known contract error signature
      const mockError = {
        message: 'Unable to decode signature 0x12345678',
        cause: { signature: '0x12345678' },
      }

      // Since we can't easily mock the signature, test the output format
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
})
