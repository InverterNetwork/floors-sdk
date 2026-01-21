import type { Abi, AbiItem } from 'viem'
import { decodeErrorResult } from 'viem'

import * as abis from '../abis'

/**
 * Standard ERC20 ABI errors for common token operations
 * @internal
 */
const ERC20_ABI = [
  {
    type: 'error',
    name: 'ERC20InsufficientAllowance',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'allowance', type: 'uint256', internalType: 'uint256' },
      { name: 'needed', type: 'uint256', internalType: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InsufficientBalance',
    inputs: [
      { name: 'sender', type: 'address', internalType: 'address' },
      { name: 'balance', type: 'uint256', internalType: 'uint256' },
      { name: 'needed', type: 'uint256', internalType: 'uint256' },
    ],
  },
] as const

/**
 * Error signature to human-readable name mapping for common ERC20 errors
 * @internal
 */
const KNOWN_ERROR_SIGNATURES: Record<`0x${string}`, string> = {
  '0xfb8f41b2': 'ERC20InsufficientAllowance',
  '0xe450d38c': 'ERC20InsufficientBalance',
}

/**
 * Parsed error result containing both detailed and pretty error messages
 */
export type ParsedError = {
  /** Detailed error message with contract call info (for logging/debugging) */
  message: string
  /** Short, user-friendly message suitable for toasts */
  prettyMessage: string
  /** The parsed error name if available */
  errorName: string | null
  /** Whether this was a user rejection */
  isUserRejection: boolean
}

/**
 * Parses an error name into a human-readable pretty message.
 * Handles various naming conventions:
 * - PascalCase: "InsufficientBalance" -> "Insufficient balance"
 * - Double underscore prefixes: "Module__Floor__InvalidFloorSegment" -> "Invalid floor segment"
 * - camelCase: "insufficientFunds" -> "Insufficient funds"
 *
 * @internal
 */
function parseErrorNameToPrettyMessage(errorName: string): string {
  // Handle double underscore prefixes (e.g., "Module__Floor__InvalidFloorSegment")
  // Take only the last part after the final "__"
  const parts = errorName.split('__')
  const relevantPart = parts[parts.length - 1]

  // Handle library prefixes like "DiscreteCurveMathLib__NoSegmentsConfigured"
  // Already handled by the split above

  // Convert PascalCase/camelCase to words
  // Insert space before uppercase letters, handling consecutive caps
  const withSpaces = relevantPart
    // Handle acronyms followed by words (e.g., "ERC20Insufficient" -> "ERC20 Insufficient")
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    // Handle lowercase followed by uppercase (e.g., "insufficientBalance" -> "insufficient Balance")
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Handle numbers followed by letters
    .replace(/(\d)([A-Za-z])/g, '$1 $2')
    // Handle letters followed by numbers
    .replace(/([A-Za-z])(\d)/g, '$1 $2')

  // Capitalize first letter, lowercase the rest of each word except acronyms
  const words = withSpaces.split(' ')
  const formatted = words
    .map((word, index) => {
      // Keep short acronyms uppercase (2-4 chars all caps)
      if (word.length <= 4 && word === word.toUpperCase() && /^[A-Z]+$/.test(word)) {
        return word
      }
      // First word: capitalize first letter
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
      // Other words: lowercase
      return word.toLowerCase()
    })
    .join(' ')

  return formatted
}

/**
 * Parses a viem error message to extract a pretty message
 * @internal
 */
function parseViemErrorToPretty(error: unknown): { message: string; isRejection: boolean } | null {
  if (!error || typeof error !== 'object') return null

  const errorMessage = 'message' in error && typeof error.message === 'string' ? error.message : ''
  const errorName = 'name' in error && typeof error.name === 'string' ? error.name : ''
  const lowerMessage = errorMessage.toLowerCase()
  const lowerName = errorName.toLowerCase()

  // User rejection patterns
  const rejectionPatterns = [
    'user rejected',
    'user denied',
    'user cancelled',
    'rejected by user',
    'rejected the request',
    'denied transaction',
  ]

  for (const pattern of rejectionPatterns) {
    if (lowerMessage.includes(pattern) || lowerName.includes(pattern)) {
      return { message: 'Transaction cancelled', isRejection: true }
    }
  }

  // Network/connection patterns
  if (
    lowerMessage.includes('network request failed') ||
    lowerMessage.includes('failed to fetch') ||
    lowerMessage.includes('network error')
  ) {
    return { message: 'Network connection failed', isRejection: false }
  }

  if (lowerMessage.includes('internal json-rpc error')) {
    return { message: 'RPC server error', isRejection: false }
  }

  // Gas/fee patterns
  if (lowerMessage.includes('insufficient funds')) {
    return { message: 'Insufficient funds for gas', isRejection: false }
  }

  if (lowerMessage.includes('gas required exceeds allowance')) {
    return { message: 'Gas limit exceeded', isRejection: false }
  }

  if (
    lowerMessage.includes('max fee per gas less than block base fee') ||
    lowerMessage.includes('transaction underpriced')
  ) {
    return { message: 'Gas price too low', isRejection: false }
  }

  if (lowerMessage.includes('replacement transaction underpriced')) {
    return { message: 'Replacement gas too low', isRejection: false }
  }

  if (lowerMessage.includes('nonce')) {
    return { message: 'Transaction nonce error', isRejection: false }
  }

  // Execution patterns
  if (lowerMessage.includes('execution reverted')) {
    return { message: 'Transaction reverted', isRejection: false }
  }

  if (lowerMessage.includes('out of gas')) {
    return { message: 'Out of gas', isRejection: false }
  }

  // Timeout patterns
  if (lowerMessage.includes('timeout') || lowerMessage.includes('timed out')) {
    return { message: 'Request timed out', isRejection: false }
  }

  return null
}

/**
 * Extracts contract call details from an error message into a formatted string
 * @internal
 */
function extractContractCallBlockAsString(errorMessage: string, errorName: string | null): string {
  const block: {
    address: string | null
    functionName: string | null
    functionSignature: string | null
    args: string[]
    sender: string | null
    signature: string | null
    docs: string | null
    version: string | null
  } = {
    address: null,
    functionName: null,
    functionSignature: null,
    args: [],
    sender: null,
    signature: null,
    docs: null,
    version: null,
  }

  // Extract the contract address
  const addressMatch = errorMessage.match(/address:\s+([0-9a-fA-Fx]+)/)
  block.address = addressMatch ? addressMatch[1] : null

  // Extract the function name
  const functionMatch = errorMessage.match(/function:\s+([a-zA-Z0-9_]+)\((.*)\)/)
  block.functionName = functionMatch ? functionMatch[1] : null
  block.functionSignature = functionMatch ? functionMatch[2] : null

  // Extract the arguments
  const argsMatch = errorMessage.match(/args:\s+\((.*)\)/)
  block.args = argsMatch ? argsMatch[1].split(', ') : []

  // Extract the sender address
  const senderMatch = errorMessage.match(/sender:\s+([0-9a-fA-Fx]+)/)
  block.sender = senderMatch ? senderMatch[1] : null

  // Extract the error signature (if available)
  const signatureMatch = errorMessage.match(/0x[a-fA-F0-9]{8}/)
  block.signature = signatureMatch ? signatureMatch[0] : null

  // Extract the docs link
  const docsMatch = errorMessage.match(/Docs:\s+(https?:\/\/[^\s]+)/)
  block.docs = docsMatch ? docsMatch[1] : null

  // Extract the version
  const versionMatch = errorMessage.match(/Version:\s+([^\s]+)/)
  block.version = versionMatch ? versionMatch[1] : null

  // Format as a single string
  return `
    Contract Call Block:
    Error Name: ${errorName || 'Unknown'}
    Address: ${block.address || 'N/A'}
    Function: ${block.functionName || 'N/A'}
    Function Signature: ${block.functionSignature || 'N/A'}
    Arguments: ${block.args.length > 0 ? block.args.join(', ') : 'N/A'}
    Sender: ${block.sender || 'N/A'}
    Error Signature: ${block.signature || 'N/A'}
    Docs: ${block.docs || 'N/A'}
    Version: ${block.version || 'N/A'}
  `.trim()
}

/**
 * Gets all ABIs from the SDK including common ERC20 errors
 * @internal
 */
function getAllAbis(): Abi[] {
  const allAbis: Abi[] = [ERC20_ABI as unknown as Abi]

  // Dynamically collect all ABIs from the abis module
  for (const value of Object.values(abis)) {
    if (Array.isArray(value)) {
      allAbis.push(value as Abi)
    }
  }

  return allAbis
}

/**
 * Extracts all error definitions from an array of ABIs
 * @internal
 */
function extractErrors(abiList: Abi[]): AbiItem[] {
  return abiList.flatMap((abi) => abi.filter((item) => item.type === 'error'))
}

/**
 * Parameters for the handleError function
 */
export type HandleErrorParams = {
  /** The error to handle */
  error: unknown
  /** Optional additional ABI to include for error decoding */
  abi?: Abi
}

/**
 * Parses an error into a structured result with both detailed and pretty messages.
 *
 * @internal
 */
function parseError(params: HandleErrorParams): ParsedError {
  const { error, abi } = params

  // Check for viem-specific errors first (user rejection, network, etc.)
  const viemParsed = parseViemErrorToPretty(error)
  if (viemParsed) {
    return {
      message: viemParsed.message,
      prettyMessage: viemParsed.message,
      errorName: null,
      isUserRejection: viemParsed.isRejection,
    }
  }

  // If error doesn't have message, return generic
  if (
    !error ||
    typeof error !== 'object' ||
    !('message' in error) ||
    typeof error.message !== 'string'
  ) {
    const msg = error instanceof Error ? error.message : String(error)
    return {
      message: msg,
      prettyMessage: 'An error occurred',
      errorName: null,
      isUserRejection: false,
    }
  }

  const errorMessage = error.message

  // Check if this is a signature decoding error
  if (!errorMessage.includes('Unable to decode signature')) {
    // Try to extract useful info even without signature
    const viemFallback = parseViemErrorToPretty(error)
    if (viemFallback) {
      return {
        message: viemFallback.message,
        prettyMessage: viemFallback.message,
        errorName: null,
        isUserRejection: viemFallback.isRejection,
      }
    }
    return {
      message: errorMessage,
      prettyMessage: 'Transaction failed',
      errorName: null,
      isUserRejection: false,
    }
  }

  // Extract error signature from cause
  const signature =
    'cause' in error && error.cause && typeof error.cause === 'object' && 'signature' in error.cause
      ? (error.cause.signature as `0x${string}`)
      : null

  if (!signature) {
    return {
      message: errorMessage,
      prettyMessage: 'Transaction failed',
      errorName: null,
      isUserRejection: false,
    }
  }

  // Check known error signatures first
  if (signature in KNOWN_ERROR_SIGNATURES) {
    const knownErrorName = KNOWN_ERROR_SIGNATURES[signature]
    return {
      message: extractContractCallBlockAsString(errorMessage, knownErrorName),
      prettyMessage: parseErrorNameToPrettyMessage(knownErrorName),
      errorName: knownErrorName,
      isUserRejection: false,
    }
  }

  // Collect all ABIs for decoding
  const allAbis = getAllAbis()
  if (abi) {
    allAbis.push(abi)
  }

  const errors = extractErrors(allAbis)

  let errorName: string | null = null

  try {
    const value = decodeErrorResult({
      abi: errors,
      data: signature,
    })

    if (value.errorName) {
      errorName = value.errorName
    }
  } catch {
    // Decoding failed, continue without error name
  }

  if (!errorName) {
    return {
      message: errorMessage,
      prettyMessage: 'Contract error',
      errorName: null,
      isUserRejection: false,
    }
  }

  return {
    message: extractContractCallBlockAsString(errorMessage, errorName),
    prettyMessage: parseErrorNameToPrettyMessage(errorName),
    errorName,
    isUserRejection: false,
  }
}

/**
 * Handles and transforms blockchain errors into user-friendly error objects.
 *
 * This utility provides comprehensive error handling for:
 * - Contract revert errors (decoded from ABIs in packages/sdk/src/abis/)
 * - Common viem/wallet errors (user rejection, network issues, gas errors)
 * - ERC20-specific errors (insufficient balance, allowance)
 *
 * @description
 * The function attempts to decode contract errors using all registered ABIs,
 * parse common viem error patterns, and return a user-friendly error message.
 * It automatically includes all ABIs from the SDK for error decoding.
 *
 * @param params - The error handling parameters
 * @param params.error - The error to handle (from viem, wagmi, or contract calls)
 * @param params.abi - Optional additional ABI for custom contract error decoding
 *
 * @returns An Error object with a detailed message
 *
 * @example
 * // Basic usage in a server function
 * import { handleError } from '@/utils/handle-error'
 *
 * async function buyTokens(amount: bigint) {
 *   try {
 *     const tx = await walletClient.writeContract({
 *       address: floorAddress,
 *       abi: Floor_v1,
 *       functionName: 'buy',
 *       args: [amount, 0n],
 *     })
 *     return { success: true, hash: tx }
 *   } catch (error) {
 *     throw handleError({ error })
 *   }
 * }
 *
 * @example
 * // With additional custom ABI
 * import { handleError } from '@/utils/handle-error'
 * import { CustomContractAbi } from './custom-abi'
 *
 * async function customOperation() {
 *   try {
 *     await doSomething()
 *   } catch (error) {
 *     throw handleError({
 *       error,
 *       abi: CustomContractAbi,
 *     })
 *   }
 * }
 */
export function handleError(params: HandleErrorParams): Error {
  const parsed = parseError(params)
  return new Error(parsed.message)
}

/**
 * Parses an error and returns both detailed and pretty (toast-friendly) messages.
 *
 * Use this when you need both a detailed error for logging and a short message for UI.
 *
 * @param params - The error handling parameters
 * @param params.error - The error to handle (from viem, wagmi, or contract calls)
 * @param params.abi - Optional additional ABI for custom contract error decoding
 *
 * @returns A ParsedError object with message, prettyMessage, errorName, and isUserRejection
 *
 * @example
 * // Usage in a mutation handler
 * import { getParsedError } from '@/utils/handle-error'
 *
 * const { mutate } = useMutation({
 *   mutationFn: buyTokens,
 *   onError: (error) => {
 *     const parsed = getParsedError({ error })
 *
 *     // Show short message in toast
 *     if (!parsed.isUserRejection) {
 *       toast.error(parsed.prettyMessage)
 *     }
 *
 *     // Log detailed message for debugging
 *     console.error('Transaction failed:', parsed.message)
 *   },
 * })
 *
 * @example
 * // In a try-catch block
 * try {
 *   await sellTokens(amount)
 * } catch (error) {
 *   const { prettyMessage, isUserRejection } = getParsedError({ error })
 *
 *   if (isUserRejection) {
 *     // User cancelled, no need to show error
 *     return
 *   }
 *
 *   toast.error(prettyMessage) // Shows: "Insufficient balance" instead of full error
 * }
 */
export function getParsedError(params: HandleErrorParams): ParsedError {
  return parseError(params)
}

/**
 * Handles errors when the context (specific ABI) is unknown.
 *
 * This function attempts to decode contract errors by searching through
 * ALL registered ABIs in the SDK. Use this when you don't know which
 * contract produced the error.
 *
 * @description
 * Iterates through all ABIs from packages/sdk/src/abis/ to find matching
 * error definitions. This is more expensive than handleError with a specific
 * ABI but useful for catch-all error handling scenarios.
 *
 * @param error - The error to handle
 *
 * @returns An Error object with a user-friendly message
 *
 * @example
 * // Usage in a global error handler
 * import { handleErrorWithUnknownContext } from '@/utils/handle-error'
 *
 * function globalErrorHandler(error: unknown) {
 *   const handledError = handleErrorWithUnknownContext(error)
 *   console.error('Unhandled error:', handledError.message)
 *   return handledError
 * }
 *
 * @example
 * // In a React error boundary or global handler
 * const queryClient = new QueryClient({
 *   queryCache: new QueryCache({
 *     onError: (error) => {
 *       const handled = handleErrorWithUnknownContext(error)
 *       toast.error(handled.message)
 *     },
 *   }),
 * })
 */
export function handleErrorWithUnknownContext(error: unknown): Error {
  return handleError({ error })
}

/**
 * Parses an error with unknown context and returns both detailed and pretty messages.
 *
 * @param error - The error to parse
 *
 * @returns A ParsedError object with message, prettyMessage, errorName, and isUserRejection
 *
 * @example
 * // In a global error handler
 * const parsed = getParsedErrorWithUnknownContext(error)
 * if (!parsed.isUserRejection) {
 *   toast.error(parsed.prettyMessage)
 * }
 */
export function getParsedErrorWithUnknownContext(error: unknown): ParsedError {
  return parseError({ error })
}

/**
 * Type guard to check if an error is a user rejection error
 *
 * @param error - The error to check
 * @returns true if the error was caused by user rejecting the transaction
 *
 * @example
 * try {
 *   await buyTokens(amount)
 * } catch (error) {
 *   if (isUserRejection(error)) {
 *     // Don't show error toast for user cancellation
 *     return
 *   }
 *   toast.error(handleError({ error }).message)
 * }
 */
export function isUserRejection(error: unknown): boolean {
  const parsed = parseViemErrorToPretty(error)
  return parsed?.isRejection ?? false
}
