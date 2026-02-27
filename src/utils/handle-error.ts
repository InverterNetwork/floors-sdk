/**
 * @fileoverview Comprehensive error handling for Floor Markets protocol.
 *
 * This module provides:
 * - Decoding of contract errors using auto-generated signatures
 * - User-friendly error messages with actionable suggestions
 * - Permission-aware error context for ACL errors
 * - Recovery actions for better UX
 *
 * @example
 * ```ts
 * import { getParsedError, isUserRejection } from '@floorsfi/sdk'
 *
 * try {
 *   await buyTokens(amount)
 * } catch (error) {
 *   const parsed = getParsedError({ error })
 *
 *   if (parsed.isUserRejection) return // User cancelled
 *
 *   toast.error(parsed.prettyMessage)
 *   console.error('Details:', parsed.message)
 *
 *   // Show recovery actions
 *   parsed.recoveryActions.forEach(action => {
 *     console.log(`Suggestion: ${action.label}`)
 *   })
 * }
 * ```
 */

import type {
  Abi,
  AbiItem,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
  Hex,
  TransactionReceipt,
} from 'viem'
import { decodeErrorResult, keccak256, toHex } from 'viem'

import * as abis from '../abis'
import type { PopPublicClient, PopWalletClient } from '../types'
import {
  ERROR_METADATA,
  isKnownErrorSignature,
  type KnownErrorSignature,
} from './error-signatures.generated'
import type {
  EnhancedParsedError,
  ErrorCategory,
  ErrorContext,
  HandleErrorParams,
  RecoveryAction,
} from './error-types'
import { ERROR_UX_MAPPINGS, hasUXMapping } from './error-ux-mappings'
import { getPermissionErrorMessage } from './permission-map'

// ============================================================================
// Constants
// ============================================================================

/** Module permission error signature */
const CALLER_NOT_PERMISSIONED_SIG = '0x7ea9d542' as KnownErrorSignature

// ============================================================================
// Wallet/Network Error Patterns
// ============================================================================

type WalletErrorPattern = {
  patterns: string[]
  prettyMessage: string
  category: ErrorCategory
  isRejection: boolean
  recoveryActions: RecoveryAction[]
}

const WALLET_ERROR_PATTERNS: WalletErrorPattern[] = [
  // User rejection
  {
    patterns: [
      'user rejected',
      'user denied',
      'user cancelled',
      'rejected by user',
      'rejected the request',
      'denied transaction',
    ],
    prettyMessage: 'Transaction cancelled',
    category: 'wallet',
    isRejection: true,
    recoveryActions: [],
  },
  // Network errors
  {
    patterns: ['network request failed', 'failed to fetch', 'network error'],
    prettyMessage: 'Network connection failed',
    category: 'network',
    isRejection: false,
    recoveryActions: [{ label: 'Check connection', type: 'retry', primary: true }],
  },
  // RPC errors
  {
    patterns: ['internal json-rpc error'],
    prettyMessage: 'RPC server error',
    category: 'network',
    isRejection: false,
    recoveryActions: [{ label: 'Try again', type: 'retry', primary: true }],
  },
  // Gas errors
  {
    patterns: ['insufficient funds'],
    prettyMessage: 'Insufficient ETH for gas',
    category: 'wallet',
    isRejection: false,
    recoveryActions: [{ label: 'Add ETH', type: 'add_gas', primary: true }],
  },
  {
    patterns: ['gas required exceeds allowance'],
    prettyMessage: 'Gas limit exceeded',
    category: 'network',
    isRejection: false,
    recoveryActions: [{ label: 'Try again', type: 'retry', primary: true }],
  },
  {
    patterns: ['max fee per gas less than block base fee', 'transaction underpriced'],
    prettyMessage: 'Gas price too low',
    category: 'network',
    isRejection: false,
    recoveryActions: [{ label: 'Try again', type: 'retry', primary: true }],
  },
  {
    patterns: ['replacement transaction underpriced'],
    prettyMessage: 'Replacement gas too low',
    category: 'network',
    isRejection: false,
    recoveryActions: [{ label: 'Wait and retry', type: 'wait', primary: true }],
  },
  {
    patterns: ['nonce'],
    prettyMessage: 'Transaction nonce error',
    category: 'network',
    isRejection: false,
    recoveryActions: [{ label: 'Refresh and retry', type: 'refresh', primary: true }],
  },
  // Execution/contract revert errors - these should NOT match here
  // They need to go through the contract error parsing to extract signatures
  // Only match generic reverts as a last resort
  // Note: specific contract reverts are handled in parseError after signature extraction
  {
    patterns: ['out of gas'],
    prettyMessage: 'Out of gas',
    category: 'network',
    isRejection: false,
    recoveryActions: [{ label: 'Try again', type: 'retry', primary: true }],
  },
  // Timeout
  {
    patterns: ['timeout', 'timed out'],
    prettyMessage: 'Request timed out',
    category: 'network',
    isRejection: false,
    recoveryActions: [{ label: 'Try again', type: 'retry', primary: true }],
  },
]

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Formats an error name with its module source preserved.
 * Splits on `__` to separate source from error, then converts PascalCase to spaced words.
 *
 * @example
 * formatErrorNameWithSource('Module__CreditFacility_InvalidLoanId')
 * // → { source: 'Credit Facility', error: 'Invalid Loan Id', formatted: 'Credit Facility: Invalid Loan Id' }
 *
 * formatErrorNameWithSource('ERC20InsufficientBalance')
 * // → { source: null, error: 'ERC20 Insufficient Balance', formatted: 'ERC20 Insufficient Balance' }
 */
export function formatErrorNameWithSource(errorName: string): {
  source: string | null
  error: string
  formatted: string
} {
  const pascalToWords = (s: string): string =>
    s
      // Split underscores into spaces first (handles CreditFacility_InvalidLoanId)
      .replace(/_/g, ' ')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/(\d)([A-Za-z])/g, '$1 $2')
      .replace(/([A-Za-z])(\d)/g, '$1 $2')
      .split(/\s+/)
      .map((word) => {
        if (word.length <= 4 && word === word.toUpperCase() && /^[A-Z]+$/.test(word)) return word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')

  const parts = errorName.split('__')

  if (parts.length >= 2) {
    // Has module prefix(es) — last part is the error name, everything before is source
    const errorPart = parts[parts.length - 1]
    const sourceParts = parts.slice(1, -1) // skip "Module" prefix if present
    const sourceStr = sourceParts.length > 0 ? sourceParts.map(pascalToWords).join(' > ') : null
    const errorStr = pascalToWords(errorPart)

    return {
      source: sourceStr,
      error: errorStr,
      formatted: sourceStr ? `${sourceStr}: ${errorStr}` : errorStr,
    }
  }

  // No module prefix — just format the error name
  const errorStr = pascalToWords(errorName)
  return { source: null, error: errorStr, formatted: errorStr }
}

/**
 * Parses error name to human-readable format.
 * Handles conventions like "Module__Floor__InvalidFloorSegment" -> "Invalid floor segment"
 */
function parseErrorNameToPrettyMessage(errorName: string): string {
  // Handle double underscore prefixes - take last part
  const parts = errorName.split('__')
  const relevantPart = parts[parts.length - 1]

  // Convert PascalCase/camelCase to words
  const withSpaces = relevantPart
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/(\d)([A-Za-z])/g, '$1 $2')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')

  // Format words
  const words = withSpaces.split(' ')
  return words
    .map((word, index) => {
      if (word.length <= 4 && word === word.toUpperCase() && /^[A-Z]+$/.test(word)) {
        return word
      }
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
      return word.toLowerCase()
    })
    .join(' ')
}

/**
 * Checks for wallet/network error patterns.
 */
function matchWalletErrorPattern(
  error: unknown
): { pattern: WalletErrorPattern; message: string } | null {
  if (!error || typeof error !== 'object') return null

  const errorMessage = 'message' in error && typeof error.message === 'string' ? error.message : ''
  const errorName = 'name' in error && typeof error.name === 'string' ? error.name : ''
  const lowerMessage = errorMessage.toLowerCase()
  const lowerName = errorName.toLowerCase()

  for (const pattern of WALLET_ERROR_PATTERNS) {
    for (const p of pattern.patterns) {
      if (lowerMessage.includes(p) || lowerName.includes(p)) {
        return { pattern, message: errorMessage }
      }
    }
  }

  return null
}

/**
 * Recursively extracts error signature from viem's deeply nested error structure.
 * Viem errors can have multiple levels of cause wrapping.
 */
function extractErrorSignature(error: unknown, depth = 0): Hex | null {
  // Prevent infinite recursion
  if (depth > 10 || !error || typeof error !== 'object') return null

  const err = error as Record<string, unknown>

  // Check for signature directly on this object
  if ('signature' in err && typeof err.signature === 'string' && err.signature.startsWith('0x')) {
    return err.signature as Hex
  }

  // Check for data field (full revert data, first 4 bytes are selector)
  if (
    'data' in err &&
    typeof err.data === 'string' &&
    err.data.startsWith('0x') &&
    err.data.length >= 10
  ) {
    return err.data.slice(0, 10) as Hex
  }

  // Check walk property (viem sometimes uses this)
  if ('walk' in err && typeof err.walk === 'function') {
    try {
      const walked = (err.walk as (fn: (e: unknown) => boolean) => unknown)((e): boolean => {
        return !!(e && typeof e === 'object' && ('data' in e || 'signature' in e))
      })
      if (walked) {
        const result = extractErrorSignature(walked, depth + 1)
        if (result) return result
      }
    } catch {
      // Walk failed, continue with other methods
    }
  }

  // Recursively check cause chain
  if ('cause' in err && err.cause) {
    const result = extractErrorSignature(err.cause, depth + 1)
    if (result) return result
  }

  // Check metaMessages for error signature (viem includes this)
  if ('metaMessages' in err && Array.isArray(err.metaMessages)) {
    for (const msg of err.metaMessages) {
      if (typeof msg === 'string') {
        // Look for "data: 0x..." pattern
        const dataMatch = msg.match(/data:\s*(0x[a-fA-F0-9]+)/i)
        if (dataMatch && dataMatch[1].length >= 10) {
          return dataMatch[1].slice(0, 10) as Hex
        }
      }
    }
  }

  // Check shortMessage for error name
  if ('shortMessage' in err && typeof err.shortMessage === 'string') {
    // Look for revert reason with selector
    const match = err.shortMessage.match(/reverted with.*?(0x[a-fA-F0-9]{8})/i)
    if (match) return match[1] as Hex
  }

  // Try to extract from message as last resort
  if ('message' in err && typeof err.message === 'string') {
    // Look for "error: ErrorName(0x...)" or just "0x..." patterns
    const patterns = [
      /reverted with the following reason:\s*(\w+)\s*\(?(0x[a-fA-F0-9]{8})/i,
      /error:\s*(\w+).*?(0x[a-fA-F0-9]{8})/i,
      /selector:\s*(0x[a-fA-F0-9]{8})/i,
      /data:\s*(0x[a-fA-F0-9]{8,})/i,
    ]

    for (const pattern of patterns) {
      const match = err.message.match(pattern)
      if (match) {
        // Return the hex value (might be in group 1 or 2)
        const hex = match[2]?.startsWith('0x') ? match[2] : match[1]
        if (hex?.startsWith('0x') && hex.length >= 10) {
          return hex.slice(0, 10) as Hex
        }
      }
    }

    // Generic 4-byte selector pattern (be careful not to match addresses)
    const genericMatch = err.message.match(/(?<![a-fA-F0-9])(0x[a-fA-F0-9]{8})(?![a-fA-F0-9])/g)
    if (genericMatch && genericMatch.length > 0) {
      // Prefer selectors that appear later in the message (more likely to be error selector)
      return genericMatch[genericMatch.length - 1] as Hex
    }
  }

  return null
}

/**
 * Extracts contract call details from error message.
 */
function extractContractCallDetails(errorMessage: string, errorName: string | null): string {
  const details: Record<string, string | null> = {
    errorName: errorName || 'Unknown',
    address: null,
    function: null,
    args: null,
    sender: null,
    signature: null,
  }

  // Extract address
  const addressMatch = errorMessage.match(/address:\s+([0-9a-fA-Fx]+)/)
  if (addressMatch) details.address = addressMatch[1]

  // Extract function
  const functionMatch = errorMessage.match(/function:\s+([a-zA-Z0-9_]+)\((.*?)\)/)
  if (functionMatch) {
    details.function = functionMatch[1]
    if (functionMatch[2]) details.args = functionMatch[2]
  }

  // Extract sender
  const senderMatch = errorMessage.match(/sender:\s+([0-9a-fA-Fx]+)/)
  if (senderMatch) details.sender = senderMatch[1]

  // Extract signature
  const signatureMatch = errorMessage.match(/0x[a-fA-F0-9]{8}/)
  if (signatureMatch) details.signature = signatureMatch[0]

  // Format output
  const lines = [
    `Error: ${details.errorName}`,
    details.address && `Contract: ${details.address}`,
    details.function && `Function: ${details.function}`,
    details.args && `Args: ${details.args}`,
    details.sender && `Sender: ${details.sender}`,
    details.signature && `Signature: ${details.signature}`,
  ].filter(Boolean)

  return lines.join('\n')
}

/**
 * Gets all ABIs for error decoding.
 */
function getAllAbis(): Abi[] {
  const allAbis: Abi[] = []

  for (const value of Object.values(abis)) {
    if (Array.isArray(value)) {
      allAbis.push(value as Abi)
    }
  }

  return allAbis
}

/**
 * Extracts error definitions from ABIs.
 */
function extractErrors(abiList: Abi[]): AbiItem[] {
  return abiList.flatMap((abi) => abi.filter((item) => item.type === 'error'))
}

/**
 * Manually matches a 4-byte selector against ABI error definitions by computing
 * keccak256 of each error signature. This is the same approach as cast 4byte-decode
 * but using local ABIs instead of an external database.
 */
function matchSelectorToAbiErrorName(errors: AbiItem[], selector: Hex): string | null {
  for (const item of errors) {
    if (item.type !== 'error' || !('name' in item) || typeof item.name !== 'string') continue

    const inputs = 'inputs' in item && Array.isArray(item.inputs) ? item.inputs : []
    const types = inputs.map((i: { type: string }) => i.type).join(',')
    const sig = `${item.name}(${types})`
    const hash = keccak256(toHex(sig))
    const computed = hash.slice(0, 10) as Hex

    if (computed === selector) {
      return item.name
    }
  }

  return null
}

/**
 * Decodes error arguments from signature and data.
 */
function decodeErrorArgs(
  signature: Hex,
  _errorName: string,
  fullData?: Hex
): Record<string, unknown> | null {
  if (!fullData || fullData.length <= 10) return null

  try {
    const allAbis = getAllAbis()
    const errors = extractErrors(allAbis)

    const decoded = decodeErrorResult({
      abi: errors,
      data: fullData,
    })

    if (decoded.args && Array.isArray(decoded.args)) {
      const metadata = isKnownErrorSignature(signature) ? ERROR_METADATA[signature] : null
      const argNames = metadata?.inputs?.map((i) => i.name) || []

      const args: Record<string, unknown> = {}
      decoded.args.forEach((arg, i) => {
        const name = argNames[i] || `arg${i}`
        args[name] = arg
      })

      return args
    }
  } catch {
    // Decoding failed
  }

  return null
}

// ============================================================================
// Viem Pre-Decoded Error Extraction
// ============================================================================

/**
 * Checks if viem has already ABI-decoded the revert in its cause chain.
 *
 * When `writeContract` / `simulateContract` is called with a contract ABI,
 * viem decodes the revert automatically and stores the result on
 * `ContractFunctionRevertedError.data` as `{ errorName, args }`.
 * This avoids re-decoding what viem has already done.
 */
function extractViemDecodedCause(
  error: unknown,
  depth = 0
): { errorName: string; args?: readonly unknown[] } | null {
  if (depth > 10 || !error || typeof error !== 'object') return null

  const err = error as Record<string, unknown>

  if (
    'data' in err &&
    err.data !== null &&
    typeof err.data === 'object' &&
    !Array.isArray(err.data)
  ) {
    const data = err.data as Record<string, unknown>
    if ('errorName' in data && typeof data.errorName === 'string') {
      return {
        errorName: data.errorName,
        args: 'args' in data ? (data.args as readonly unknown[]) : undefined,
      }
    }
  }

  if ('cause' in err && err.cause) {
    return extractViemDecodedCause(err.cause, depth + 1)
  }

  return null
}

/**
 * Extracts a human-readable revert reason from viem's cause chain.
 *
 * Handles `require(false, "reason string")` reverts, which viem stores
 * as `cause.reason` on `ContractFunctionRevertedError`.
 */
function extractViemRevertReason(error: unknown, depth = 0): string | null {
  if (depth > 10 || !error || typeof error !== 'object') return null

  const err = error as Record<string, unknown>

  if ('reason' in err && typeof err.reason === 'string' && err.reason.length > 0) {
    return err.reason
  }

  if ('cause' in err && err.cause) {
    return extractViemRevertReason(err.cause, depth + 1)
  }

  return null
}

/**
 * Finds the 4-byte selector for an error by its name across known ABIs.
 * Reverse lookup of matchSelectorToAbiErrorName.
 */
function matchSelectorFromName(errors: AbiItem[], errorName: string): Hex | null {
  for (const item of errors) {
    if (item.type !== 'error' || !('name' in item) || item.name !== errorName) continue

    const inputs = 'inputs' in item && Array.isArray(item.inputs) ? item.inputs : []
    const types = inputs.map((i: { type: string }) => i.type).join(',')
    const sig = `${item.name}(${types})`
    return keccak256(toHex(sig)).slice(0, 10) as Hex
  }
  return null
}

// ============================================================================
// Main Parsing Functions
// ============================================================================

/**
 * Parses any error into an enhanced error object with UX information.
 */
function parseError(params: HandleErrorParams): EnhancedParsedError {
  const { error, abi, context } = params

  // Default result for unknown errors
  const defaultResult: EnhancedParsedError = {
    message: 'An unknown error occurred',
    prettyMessage: 'Something went wrong',
    errorName: null,
    isUserRejection: false,
    category: 'unknown',
    severity: 'error',
    suggestion: 'Please try again',
    recoveryActions: [{ label: 'Try again', type: 'retry', primary: true }],
    originalError: error,
    context,
  }

  // Handle non-error values
  if (!error) {
    return defaultResult
  }

  // Check for wallet/network patterns first
  const walletMatch = matchWalletErrorPattern(error)
  if (walletMatch) {
    return {
      message: walletMatch.message,
      prettyMessage: walletMatch.pattern.prettyMessage,
      errorName: null,
      isUserRejection: walletMatch.pattern.isRejection,
      category: walletMatch.pattern.category,
      severity: walletMatch.pattern.isRejection ? 'info' : 'error',
      suggestion: walletMatch.pattern.isRejection ? null : 'Check your connection and try again',
      recoveryActions: walletMatch.pattern.recoveryActions,
      originalError: error,
      context,
    }
  }

  // Get error message
  const errorMessage =
    error && typeof error === 'object' && 'message' in error && typeof error.message === 'string'
      ? error.message
      : String(error)

  // Check if viem already decoded the error via its ABI (simulateContract / writeContract path).
  // This fires when the contract ABI is known to viem at call time.
  const viemDecoded = extractViemDecodedCause(error)
  if (viemDecoded) {
    const { errorName } = viemDecoded
    const abiList = abi ? [...getAllAbis(), abi as Abi] : getAllAbis()
    const abiErrors = extractErrors(abiList)
    const viemSig = matchSelectorFromName(abiErrors, errorName)

    if (viemSig && hasUXMapping(viemSig)) {
      const uxMapping = ERROR_UX_MAPPINGS[viemSig as KnownErrorSignature]
      return {
        message: extractContractCallDetails(errorMessage, errorName),
        prettyMessage: uxMapping.prettyMessage,
        errorName,
        isUserRejection: false,
        category: uxMapping.category,
        severity: uxMapping.severity,
        suggestion: uxMapping.suggestion,
        recoveryActions: uxMapping.recoveryActions,
        originalError: error,
        signature: viemSig,
        context,
        formattedErrorName: formatErrorNameWithSource(errorName).formatted,
      }
    }

    return {
      message: extractContractCallDetails(errorMessage, errorName),
      prettyMessage: parseErrorNameToPrettyMessage(errorName),
      errorName,
      isUserRejection: false,
      category: 'unknown',
      severity: 'error',
      suggestion: 'This error is not yet documented. Please report it.',
      recoveryActions: [{ label: 'Report issue', type: 'contact_support' }],
      originalError: error,
      signature: viemSig ?? undefined,
      context,
      formattedErrorName: formatErrorNameWithSource(errorName).formatted,
    }
  }

  // Extract error signature
  const signature = extractErrorSignature(error)

  if (!signature) {
    // Check for string revert reason: require(false, "reason") stores the
    // reason string in viem's cause.reason field.
    const revertReason = extractViemRevertReason(error)
    if (revertReason) {
      return {
        ...defaultResult,
        message: errorMessage,
        prettyMessage: revertReason,
        suggestion: 'The contract rejected this transaction.',
        category: 'system',
        recoveryActions: [{ label: 'Try again', type: 'retry', primary: true }],
      }
    }

    // No signature found - try to provide better context based on error type
    const lowerMessage = errorMessage.toLowerCase()

    // Check for contract revert patterns
    if (lowerMessage.includes('reverted') || lowerMessage.includes('revert')) {
      // Try to extract function name from error
      const functionMatch = errorMessage.match(/function[:\s]+["']?(\w+)/i)
      const functionName = functionMatch?.[1]

      // Check for permission-related reverts
      if (
        lowerMessage.includes('permission') ||
        lowerMessage.includes('unauthorized') ||
        lowerMessage.includes('access')
      ) {
        return {
          ...defaultResult,
          message: errorMessage,
          prettyMessage: 'Not authorized for this action',
          suggestion: 'You may need special permissions to perform this action',
          category: 'permission',
          recoveryActions: [
            { label: 'Check permissions', type: 'check_whitelist', primary: true },
            { label: 'Contact support', type: 'contact_support' },
          ],
        }
      }

      // Check for insufficient balance/allowance
      if (
        lowerMessage.includes('insufficient') ||
        lowerMessage.includes('balance') ||
        lowerMessage.includes('allowance')
      ) {
        return {
          ...defaultResult,
          message: errorMessage,
          prettyMessage: 'Insufficient funds or allowance',
          suggestion: 'Check your balance and token approvals',
          category: 'token',
          recoveryActions: [
            { label: 'Check balance', type: 'refresh', primary: true },
            { label: 'Approve token', type: 'approve_token' },
          ],
        }
      }

      // Generic contract revert with function context
      if (functionName) {
        return {
          ...defaultResult,
          message: errorMessage,
          prettyMessage: `Transaction to ${functionName} was rejected`,
          suggestion: 'The contract rejected this transaction. Check your inputs and permissions.',
          category: 'system',
          recoveryActions: [
            { label: 'Try again', type: 'retry', primary: true },
            { label: 'Contact support', type: 'contact_support' },
          ],
        }
      }

      // Generic contract revert
      return {
        ...defaultResult,
        message: errorMessage,
        prettyMessage: 'Contract rejected transaction',
        suggestion:
          'The smart contract rejected this transaction. This may be due to permissions, insufficient funds, or invalid parameters.',
        category: 'system',
        recoveryActions: [
          { label: 'Try again', type: 'retry', primary: true },
          { label: 'Contact support', type: 'contact_support' },
        ],
      }
    }

    // No signature and not a clear revert - return generic
    return {
      ...defaultResult,
      message: errorMessage,
      prettyMessage: 'Transaction failed',
      suggestion: 'Please try again or contact support if the issue persists',
    }
  }

  // Check if we have UX mapping for this signature
  if (hasUXMapping(signature)) {
    const uxMapping = ERROR_UX_MAPPINGS[signature as KnownErrorSignature]
    const metadata = ERROR_METADATA[signature as KnownErrorSignature]

    // Try to decode error args for dynamic messages
    const fullData = extractFullErrorData(error)
    const decodedArgs = decodeErrorArgs(signature, metadata.name, fullData)

    // Generate message (use dynamic if available)
    let prettyMessage = uxMapping.prettyMessage
    let suggestion = uxMapping.suggestion

    if (decodedArgs) {
      if (uxMapping.dynamicMessage) {
        try {
          prettyMessage = uxMapping.dynamicMessage(decodedArgs)
        } catch {
          // Use static message
        }
      }
      if (uxMapping.dynamicSuggestion) {
        try {
          suggestion = uxMapping.dynamicSuggestion(decodedArgs)
        } catch {
          // Use static suggestion
        }
      }
    }

    // Special handling for permission errors
    if (signature === CALLER_NOT_PERMISSIONED_SIG && context?.functionName) {
      const permissionMsg = getPermissionErrorMessage(`0x${context.functionName}` as `0x${string}`)
      prettyMessage = permissionMsg.prettyMessage
      suggestion = permissionMsg.suggestion
    }

    return {
      message: extractContractCallDetails(errorMessage, metadata.name),
      prettyMessage,
      errorName: metadata.name,
      isUserRejection: false,
      category: uxMapping.category,
      severity: uxMapping.severity,
      suggestion,
      recoveryActions: uxMapping.recoveryActions,
      originalError: error,
      signature,
      decodedArgs: decodedArgs ?? undefined,
      context,
      formattedErrorName: formatErrorNameWithSource(metadata.name).formatted,
    }
  }

  // Signature not in registry - try to decode with all known ABIs (+ provided ABI if any)
  {
    const abiList = abi ? [...getAllAbis(), abi as Abi] : getAllAbis()
    const errors = extractErrors(abiList)
    const fullData = extractFullErrorData(error)

    // Try with full error data first (selector + encoded args)
    if (fullData && fullData.length > 10) {
      try {
        const decoded = decodeErrorResult({
          abi: errors,
          data: fullData,
        })

        if (decoded.errorName) {
          return {
            message: extractContractCallDetails(errorMessage, decoded.errorName),
            prettyMessage: parseErrorNameToPrettyMessage(decoded.errorName),
            errorName: decoded.errorName,
            isUserRejection: false,
            category: 'unknown',
            severity: 'error',
            suggestion: 'This error is not yet documented. Please report it.',
            recoveryActions: [{ label: 'Report issue', type: 'contact_support' }],
            originalError: error,
            signature,
            context,
            formattedErrorName: formatErrorNameWithSource(decoded.errorName).formatted,
          }
        }
      } catch {
        // Full data decoding failed, try selector-only below
      }
    }

    // Try with just the 4-byte selector (works for errors with no inputs)
    try {
      const decoded = decodeErrorResult({
        abi: errors,
        data: signature,
      })

      if (decoded.errorName) {
        return {
          message: extractContractCallDetails(errorMessage, decoded.errorName),
          prettyMessage: parseErrorNameToPrettyMessage(decoded.errorName),
          errorName: decoded.errorName,
          isUserRejection: false,
          category: 'unknown',
          severity: 'error',
          suggestion: 'This error is not yet documented. Please report it.',
          recoveryActions: [{ label: 'Report issue', type: 'contact_support' }],
          originalError: error,
          signature,
          context,
          formattedErrorName: formatErrorNameWithSource(decoded.errorName).formatted,
        }
      }
    } catch {
      // Selector-only decoding failed (happens for errors with inputs)
    }

    // Last resort: manually match the selector against ABI error definitions.
    // This handles cases where decodeErrorResult fails (e.g., errors with inputs
    // but only a selector is available), similar to how cast 4byte-decode works.
    const matchedName = matchSelectorToAbiErrorName(errors, signature)
    if (matchedName) {
      return {
        message: extractContractCallDetails(errorMessage, matchedName),
        prettyMessage: parseErrorNameToPrettyMessage(matchedName),
        errorName: matchedName,
        isUserRejection: false,
        category: 'unknown',
        severity: 'error',
        suggestion: 'This error is not yet documented. Please report it.',
        recoveryActions: [{ label: 'Report issue', type: 'contact_support' }],
        originalError: error,
        signature,
        context,
        formattedErrorName: formatErrorNameWithSource(matchedName).formatted,
      }
    }
  }

  // Unknown error with signature
  return {
    ...defaultResult,
    message: extractContractCallDetails(errorMessage, null),
    prettyMessage: 'Contract error',
    suggestion: `Unknown error (${signature}). Please report this.`,
    signature,
  }
}

/**
 * Recursively extracts full error data (signature + args) from nested viem errors.
 */
function extractFullErrorData(error: unknown, depth = 0): Hex | undefined {
  // Prevent infinite recursion
  if (depth > 10 || !error || typeof error !== 'object') return undefined

  const err = error as Record<string, unknown>

  // Check data directly on this object
  if ('data' in err && typeof err.data === 'string' && err.data.startsWith('0x')) {
    return err.data as Hex
  }

  // Check walk property
  if ('walk' in err && typeof err.walk === 'function') {
    try {
      const walked = (err.walk as (fn: (e: unknown) => boolean) => unknown)((e): boolean => {
        return !!(e && typeof e === 'object' && 'data' in e)
      })
      if (walked && typeof walked === 'object' && 'data' in walked) {
        const data = (walked as Record<string, unknown>).data
        if (typeof data === 'string' && data.startsWith('0x')) {
          return data as Hex
        }
      }
    } catch {
      // Walk failed
    }
  }

  // Recursively check cause
  if ('cause' in err && err.cause) {
    const result = extractFullErrorData(err.cause, depth + 1)
    if (result) return result
  }

  return undefined
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Legacy ParsedError type for backward compatibility.
 */
export type ParsedError = {
  message: string
  prettyMessage: string
  errorName: string | null
  isUserRejection: boolean
}

/**
 * Handles an error and returns an Error object with detailed message.
 * Use this in catch blocks when you want to re-throw.
 *
 * @example
 * ```ts
 * try {
 *   await buyTokens(amount)
 * } catch (error) {
 *   throw handleError({ error })
 * }
 * ```
 */
export function handleError(params: HandleErrorParams): Error {
  const parsed = parseError(params)
  return new Error(parsed.message)
}

/**
 * Parses an error and returns detailed UX information.
 * Use this when you need both UI messages and recovery actions.
 *
 * @example
 * ```ts
 * const parsed = getParsedError({ error })
 *
 * if (!parsed.isUserRejection) {
 *   toast.error(parsed.prettyMessage)
 *   console.log('Suggestion:', parsed.suggestion)
 * }
 * ```
 */
export function getParsedError(params: HandleErrorParams): EnhancedParsedError {
  return parseError(params)
}

/**
 * Legacy function that returns simplified ParsedError.
 * @deprecated Use getParsedError for full functionality
 */
export function getParsedErrorLegacy(params: HandleErrorParams): ParsedError {
  const enhanced = parseError(params)
  return {
    message: enhanced.message,
    prettyMessage: enhanced.prettyMessage,
    errorName: enhanced.errorName,
    isUserRejection: enhanced.isUserRejection,
  }
}

/**
 * Handles errors without knowing the specific ABI context.
 * Searches all registered ABIs for matching errors.
 */
export function handleErrorWithUnknownContext(error: unknown): Error {
  return handleError({ error })
}

/**
 * Parses an error without knowing the specific ABI context.
 */
export function getParsedErrorWithUnknownContext(error: unknown): EnhancedParsedError {
  return parseError({ error })
}

/**
 * Type guard to check if an error was caused by user rejection.
 *
 * @example
 * ```ts
 * try {
 *   await buyTokens(amount)
 * } catch (error) {
 *   if (isUserRejection(error)) {
 *     return // Don't show error toast
 *   }
 *   toast.error('Transaction failed')
 * }
 * ```
 */
export function isUserRejection(error: unknown): boolean {
  const walletMatch = matchWalletErrorPattern(error)
  return walletMatch?.pattern.isRejection ?? false
}

/**
 * Gets recovery actions for an error.
 * Useful when you want to show actionable buttons.
 *
 * @example
 * ```ts
 * const actions = getRecoveryActions(error)
 * actions.forEach(action => {
 *   if (action.type === 'approve_token') {
 *     // Show approve button
 *   }
 * })
 * ```
 */
export function getRecoveryActions(error: unknown): RecoveryAction[] {
  const parsed = parseError({ error })
  return parsed.recoveryActions
}

/**
 * Gets the error category for analytics/logging.
 */
export function getErrorCategory(error: unknown): ErrorCategory {
  const parsed = parseError({ error })
  return parsed.category
}

/**
 * Checks if an error is a specific known error by name.
 *
 * @example
 * ```ts
 * if (isErrorType(error, 'ERC20InsufficientBalance')) {
 *   // Handle insufficient balance
 * }
 * ```
 */
export function isErrorType(error: unknown, errorName: string): boolean {
  const parsed = parseError({ error })
  return parsed.errorName === errorName
}

/**
 * Checks if an error is a permission error.
 */
export function isPermissionError(error: unknown): boolean {
  const parsed = parseError({ error })
  return parsed.category === 'permission'
}

// ============================================================================
// 4byte / OpenChain Signature Lookup
// ============================================================================

/**
 * Result from the OpenChain/4byte signature lookup.
 */
export type FourByteLookupResult = {
  /** The error name (e.g., "ERC20InsufficientBalance") */
  name: string
  /** The full text signature (e.g., "ERC20InsufficientBalance(address,uint256,uint256)") */
  textSignature: string
}

/**
 * Looks up an unknown 4-byte error selector via the OpenChain Signatures API.
 * This is the same database that `cast 4byte-decode` uses under the hood.
 *
 * @description Queries https://api.openchain.xyz/signature-database/v1/lookup
 * for error selectors not found in the local ABI registry.
 *
 * @param selector - The 4-byte hex selector (e.g., "0xfb8f41b2")
 * @returns Array of matching error signatures, or empty array if none found
 *
 * @example
 * ```ts
 * const results = await lookup4ByteSelector('0xfb8f41b2')
 * // [{ name: 'ERC20InsufficientAllowance', textSignature: 'ERC20InsufficientAllowance(address,uint256,uint256)' }]
 * ```
 */
export async function lookup4ByteSelector(selector: Hex): Promise<FourByteLookupResult[]> {
  try {
    const url = `https://api.openchain.xyz/signature-database/v1/lookup?filter=true&event=false&function=false&error=true&hash=${selector}`
    const response = await fetch(url)

    if (!response.ok) return []

    const data = (await response.json()) as {
      ok: boolean
      result: {
        error: Record<string, Array<{ name: string; filtered: boolean }> | null>
      }
    }

    if (!data.ok) return []

    const entries = data.result.error[selector]
    if (!entries || entries.length === 0) return []

    return entries.map((entry) => {
      const textSignature = entry.name
      // Extract just the error name (before the parenthesis)
      const name = textSignature.split('(')[0]
      return { name, textSignature }
    })
  } catch {
    return []
  }
}

/**
 * Enhanced error parsing that includes async 4byte lookup for unknown selectors.
 * Falls back to the synchronous parser for known errors.
 *
 * @description Like getParsedError, but additionally queries the OpenChain
 * signature database for selectors not found in the local registry.
 * This mimics what `cast 4byte-decode` does.
 *
 * @example
 * ```ts
 * const parsed = await getParsedErrorAsync({ error })
 * // Even for unknown contract errors, parsed.errorName may be populated
 * // if the selector was found in the 4byte directory
 * ```
 */
export async function getParsedErrorAsync(params: HandleErrorParams): Promise<EnhancedParsedError> {
  const result = parseError(params)

  // If we got a generic "Contract error" with a signature, try 4byte lookup
  if (result.prettyMessage === 'Contract error' && result.signature) {
    const lookupResults = await lookup4ByteSelector(result.signature)

    if (lookupResults.length > 0) {
      const best = lookupResults[0]
      return {
        ...result,
        errorName: best.name,
        prettyMessage: parseErrorNameToPrettyMessage(best.name),
        suggestion: `Error: ${best.textSignature}. This error is not in the local registry.`,
        formattedErrorName: formatErrorNameWithSource(best.name).formatted,
      }
    }
  }

  return result
}

// ============================================================================
// safeWrite — simulate → write → receipt, with structured error handling
// ============================================================================

export type SafeWriteParams<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
> = {
  /** Public client — used for simulation and waiting for the receipt */
  publicClient: PopPublicClient
  /** Wallet client — used to sign and broadcast the transaction */
  walletClient: PopWalletClient
  /** Target contract address */
  address: Address
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

/**
 * Single utility for contract write actions: simulate → write → receipt.
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
 * import { safeWrite } from '@floorsfi/sdk'
 *
 * const { hash, receipt, simResult } = await safeWrite({
 *   publicClient,
 *   walletClient,
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
export async function safeWrite<
  const TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
>(params: SafeWriteParams<TAbi, TFunctionName>): Promise<SafeWriteResult> {
  const {
    publicClient,
    walletClient,
    address,
    abi,
    functionName,
    args,
    value,
    onSimError,
    onWriteError,
    lifecycle,
  } = params

  // ── 1. simulate ─────────────────────────────────────────────────────────────
  let simResult: unknown
  let request: unknown

  lifecycle?.onPendingWallet?.()

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sim = await publicClient.simulateContract({
      address,
      abi: abi as Abi,
      functionName: functionName as string,
      args: args as readonly unknown[],
      ...(value !== undefined && { value }),
      account: walletClient.account,
    } as any)
    simResult = sim.result
    request = sim.request
  } catch (simError) {
    const parsed = getParsedError({ error: simError, abi })
    onSimError?.(parsed)
    lifecycle?.onFailed?.(simError instanceof Error ? simError : new Error(String(simError)))
    throw simError
  }

  // ── 2. write ─────────────────────────────────────────────────────────────────
  let hash: Hex

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hash = await walletClient.writeContract(request as any)
  } catch (writeError) {
    const parsed = getParsedError({ error: writeError, abi })
    onWriteError?.(parsed)
    lifecycle?.onFailed?.(writeError instanceof Error ? writeError : new Error(String(writeError)))
    throw writeError
  }

  lifecycle?.onSubmitted?.(hash)

  // ── 3. wait for receipt (1 confirmation) ─────────────────────────────────────
  lifecycle?.onPendingConfirmation?.(hash)
  const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 1 })

  if (receipt.status === 'success') {
    lifecycle?.onConfirmed?.(receipt)
  } else {
    const revertError = new Error('Transaction reverted')
    lifecycle?.onFailed?.(revertError)
    throw revertError
  }

  return { hash, receipt, simResult }
}

// ============================================================================
// Re-exports
// ============================================================================

export type { EnhancedParsedError, ErrorCategory, ErrorContext, HandleErrorParams, RecoveryAction }
export type { KnownErrorSignature } from './error-signatures.generated'
export { ERROR_METADATA, isKnownErrorSignature } from './error-signatures.generated'
export { ERROR_UX_MAPPINGS, hasUXMapping } from './error-ux-mappings'
export { getPermissionErrorMessage, getPermissionInfo, PERMISSION_MAP } from './permission-map'
