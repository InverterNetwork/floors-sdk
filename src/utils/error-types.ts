/**
 * @fileoverview Type definitions for the Floor Markets error handling system.
 * @description Provides comprehensive type safety for error categorization,
 * recovery actions, and UX-friendly error messaging.
 */

// ============================================================================
// Error Categories
// ============================================================================

/**
 * Categories of errors in the Floor Markets protocol.
 * Used for analytics, logging, and determining recovery strategies.
 */
export type ErrorCategory =
  | 'trading' // Buy/sell operations
  | 'credit' // Borrow/repay/loop operations
  | 'presale' // Presale participation and claims
  | 'permission' // ACL/role-based access errors
  | 'curve' // Bonding curve configuration errors
  | 'token' // ERC20 token errors (balance, allowance)
  | 'treasury' // Treasury and fee distribution errors
  | 'authorizer' // Role management errors
  | 'factory' // Market/module creation errors
  | 'wallet' // Wallet connection/signing errors
  | 'network' // RPC/network connectivity errors
  | 'validation' // Client-side validation errors
  | 'system' // Internal system errors (initialization, etc.)
  | 'unknown' // Unclassified errors

/**
 * Severity levels for error handling and UI display.
 */
export type ErrorSeverity =
  | 'info' // Informational, user action completed but with notes
  | 'warning' // Something went wrong but is recoverable
  | 'error' // Action failed, needs user intervention
  | 'critical' // System-level failure, contact support

// ============================================================================
// Recovery Actions
// ============================================================================

/**
 * Types of recovery actions the user can take.
 */
export type RecoveryActionType =
  | 'approve_token' // Approve token spending
  | 'increase_amount' // Increase input amount
  | 'decrease_amount' // Decrease input amount
  | 'adjust_slippage' // Modify slippage tolerance
  | 'connect_wallet' // Connect wallet
  | 'switch_network' // Switch to correct network
  | 'add_gas' // Add ETH for gas
  | 'retry' // Simply retry the operation
  | 'wait' // Wait for a condition (presale start, etc.)
  | 'contact_support' // Contact support team
  | 'check_whitelist' // Check whitelist status
  | 'reduce_leverage' // Lower leverage multiplier
  | 'add_collateral' // Add more collateral
  | 'repay_debt' // Repay outstanding debt
  | 'refresh' // Refresh data
  | 'none' // No action available

/**
 * A recovery action that can be presented to the user.
 */
export type RecoveryAction = {
  /** Human-readable label for the action button */
  label: string
  /** Type of action for programmatic handling */
  type: RecoveryActionType
  /** Optional parameters for the action */
  params?: Record<string, unknown>
  /** Whether this is the primary recommended action */
  primary?: boolean
}

// ============================================================================
// Error Context
// ============================================================================

/**
 * Additional context about the error for enriched messaging.
 */
export type ErrorContext = {
  /** The operation that was attempted */
  operation?: string
  /** Token symbol involved */
  tokenSymbol?: string
  /** Formatted amount involved */
  amount?: string
  /** Maximum allowed value */
  maxAllowed?: string
  /** Minimum required value */
  minRequired?: string
  /** Timestamp when error occurred */
  timestamp?: number
  /** Contract address involved */
  contractAddress?: string
  /** Function name that was called */
  functionName?: string
  /** Transaction hash if available */
  transactionHash?: string
  /** Chain ID */
  chainId?: number
  /** User's wallet address */
  userAddress?: string
  /** Loan ID if applicable */
  loanId?: string
  /** Position ID if applicable */
  positionId?: string
}

// ============================================================================
// Error Registry Entry
// ============================================================================

/**
 * An entry in the error registry mapping contract errors to UX messages.
 */
export type ErrorRegistryEntry = {
  /** The Solidity error name */
  errorName: string
  /** User-friendly message for display (e.g., in toast) */
  prettyMessage: string
  /** Actionable suggestion for the user */
  suggestion: string | null
  /** Error category for analytics and handling */
  category: ErrorCategory
  /** Severity level */
  severity: ErrorSeverity
  /** Available recovery actions */
  recoveryActions: RecoveryAction[]
  /**
   * Dynamic message generator based on error args.
   * If provided, overrides prettyMessage with dynamic content.
   */
  dynamicMessage?: (args: Record<string, unknown>) => string
  /**
   * Dynamic suggestion generator based on error args.
   * If provided, overrides suggestion with dynamic content.
   */
  dynamicSuggestion?: (args: Record<string, unknown>) => string
  /** Source contract information for tracking */
  source?: {
    contract: string
    version: string
  }
}

// ============================================================================
// Parsed Error Result
// ============================================================================

/**
 * The result of parsing an error with full UX context.
 */
export type EnhancedParsedError = {
  // -------------------------
  // Core Error Information
  // -------------------------

  /** Detailed error message (for logging/debugging) */
  message: string

  /** Short, user-friendly message for UI display */
  prettyMessage: string

  /** The Solidity error name if decoded */
  errorName: string | null

  /** Whether this error was caused by user rejecting the transaction */
  isUserRejection: boolean

  // -------------------------
  // Enhanced UX Fields
  // -------------------------

  /** Error category */
  category: ErrorCategory

  /** Error severity */
  severity: ErrorSeverity

  /** Actionable suggestion for the user */
  suggestion: string | null

  /** Available recovery actions */
  recoveryActions: RecoveryAction[]

  // -------------------------
  // Context (Optional)
  // -------------------------

  /** Additional context about the error */
  context?: ErrorContext

  // -------------------------
  // Debug Information
  // -------------------------

  /** The original error object */
  originalError: unknown

  /** Error signature (4-byte selector) if available */
  signature?: `0x${string}`

  /** Decoded error arguments if available */
  decodedArgs?: Record<string, unknown>

  /** Formatted error name with source (e.g., "Credit Facility: Invalid Loan Id") */
  formattedErrorName?: string
}

// ============================================================================
// Permission Context
// ============================================================================

/**
 * Context about a permission-denied error.
 */
export type PermissionContext = {
  /** The function that was called */
  functionName: string
  /** 4-byte function selector */
  functionSelector: `0x${string}`
  /** Target contract address */
  targetContract: `0x${string}`
  /** Required role ID if known */
  requiredRole: string | null
  /** Human-readable role description */
  roleDescription: string | null
}

/**
 * Maps function selectors to permission requirements.
 */
export type PermissionMapEntry = {
  /** Human-readable function name */
  functionName: string
  /** Description of what this function does */
  description: string
  /** The role required to call this function */
  requiredRole: string
  /** User-friendly description of the role */
  roleDescription: string
  /** The contract this function belongs to */
  contract: string
}

// ============================================================================
// Error Handler Parameters
// ============================================================================

/**
 * Parameters for the enhanced error handler.
 */
export type HandleErrorParams = {
  /** The error to handle */
  error: unknown
  /** Optional additional ABI for error decoding */
  abi?: readonly unknown[]
  /** Optional context to enrich error messages */
  context?: Partial<ErrorContext>
}

// ============================================================================
// Validation Error
// ============================================================================

/**
 * A client-side validation error.
 */
export type ValidationError = {
  /** Field that failed validation */
  field: string
  /** Validation error message */
  message: string
  /** Suggestion to fix the validation error */
  suggestion?: string
}

/**
 * Creates a validation error with consistent structure.
 */
export function createValidationError(
  field: string,
  message: string,
  suggestion?: string
): ValidationError {
  return { field, message, suggestion }
}

// ============================================================================
// Error Utilities Types
// ============================================================================

/**
 * Result of checking if an error is a specific type.
 */
export type ErrorTypeCheck = {
  isMatch: boolean
  errorName?: string
  args?: Record<string, unknown>
}

/**
 * Options for error parsing.
 */
export type ParseErrorOptions = {
  /** Include debug information in the result */
  includeDebugInfo?: boolean
  /** Custom error registry to use */
  customRegistry?: Record<`0x${string}`, ErrorRegistryEntry>
  /** Fallback category for unknown errors */
  fallbackCategory?: ErrorCategory
}
