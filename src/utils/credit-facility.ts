/**
 * @description Credit Facility validation and calculation utilities
 * Provides standalone functions for validating config and calculating borrowing power
 */

// =============================================================================
// Constants (matching smart contract)
// =============================================================================

/**
 * @description Credit facility configuration limits matching CreditFacility_v1.sol
 * These values are derived from the smart contract's validation logic
 */
export const CREDIT_FACILITY_CONSTANTS = {
  /** Maximum LTV in basis points (100% = 10000 bps) */
  MAX_LTV_BPS: 10000,
  /** Recommended max LTV for safety margin (99%) */
  RECOMMENDED_MAX_LTV_BPS: 9900,
  /** Minimum LTV in basis points */
  MIN_LTV_BPS: 1,
  /** Maximum leverage multiplier (uint8 max) */
  MAX_LEVERAGE: 255,
  /** Minimum leverage */
  MIN_LEVERAGE: 1,
  /** Maximum fee rate in basis points (100%) */
  MAX_FEE_RATE_BPS: 10000,
  /** High leverage threshold for gas warnings */
  HIGH_LEVERAGE_THRESHOLD: 50,
  /** High fee threshold for UX warnings */
  HIGH_FEE_THRESHOLD_BPS: 2000,
} as const

// =============================================================================
// Validation Types
// =============================================================================

export interface CreditFacilityValidationResult {
  /** Whether the config is valid (no errors) */
  isValid: boolean
  /** Critical errors that prevent submission */
  errors: string[]
  /** Non-blocking warnings for user awareness */
  warnings: string[]
}

export interface CreditFacilityConfigInput {
  /** Loan-to-value ratio in basis points (0-10000) */
  loanToValueRatio: number
  /** Maximum leverage for buyAndBorrow (1-255) */
  maxLeverage: number
  /** One-time borrowing fee in basis points (0-10000) */
  borrowingFeeRate: number
}

// =============================================================================
// Validation Functions
// =============================================================================

/**
 * @description Validates credit facility configuration against smart contract limits
 * @param config - The credit facility configuration to validate
 * @returns Validation result with errors and warnings
 *
 * @example
 * ```typescript
 * const result = validateCreditFacilityConfig({
 *   loanToValueRatio: 9500,
 *   maxLeverage: 25,
 *   borrowingFeeRate: 600,
 * })
 *
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validateCreditFacilityConfig(
  config: CreditFacilityConfigInput
): CreditFacilityValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  const { loanToValueRatio, maxLeverage, borrowingFeeRate } = config

  // LTV validation
  if (!Number.isInteger(loanToValueRatio)) {
    errors.push('LTV must be a whole number (integer basis points)')
  }
  if (loanToValueRatio < CREDIT_FACILITY_CONSTANTS.MIN_LTV_BPS) {
    errors.push(`LTV must be at least ${CREDIT_FACILITY_CONSTANTS.MIN_LTV_BPS} basis point (0.01%)`)
  }
  if (loanToValueRatio > CREDIT_FACILITY_CONSTANTS.MAX_LTV_BPS) {
    errors.push(`LTV cannot exceed ${CREDIT_FACILITY_CONSTANTS.MAX_LTV_BPS} basis points (100%)`)
  }
  if (
    loanToValueRatio > CREDIT_FACILITY_CONSTANTS.RECOMMENDED_MAX_LTV_BPS &&
    loanToValueRatio <= CREDIT_FACILITY_CONSTANTS.MAX_LTV_BPS
  ) {
    warnings.push('LTV above 99% reduces safety margin significantly')
  }

  // Leverage validation
  if (!Number.isInteger(maxLeverage)) {
    errors.push('Leverage must be a whole number')
  }
  if (maxLeverage < CREDIT_FACILITY_CONSTANTS.MIN_LEVERAGE) {
    errors.push(`Leverage must be at least ${CREDIT_FACILITY_CONSTANTS.MIN_LEVERAGE}`)
  }
  if (maxLeverage > CREDIT_FACILITY_CONSTANTS.MAX_LEVERAGE) {
    errors.push(`Leverage cannot exceed ${CREDIT_FACILITY_CONSTANTS.MAX_LEVERAGE}`)
  }
  if (
    maxLeverage > CREDIT_FACILITY_CONSTANTS.HIGH_LEVERAGE_THRESHOLD &&
    maxLeverage <= CREDIT_FACILITY_CONSTANTS.MAX_LEVERAGE
  ) {
    warnings.push('High leverage (>50x) significantly increases gas costs')
  }

  // Fee rate validation
  if (!Number.isInteger(borrowingFeeRate)) {
    errors.push('Fee rate must be a whole number (integer basis points)')
  }
  if (borrowingFeeRate < 0) {
    errors.push('Fee rate cannot be negative')
  }
  if (borrowingFeeRate > CREDIT_FACILITY_CONSTANTS.MAX_FEE_RATE_BPS) {
    errors.push(
      `Fee rate cannot exceed ${CREDIT_FACILITY_CONSTANTS.MAX_FEE_RATE_BPS} basis points (100%)`
    )
  }
  if (borrowingFeeRate === 0) {
    warnings.push('Zero fee may attract spam or abuse')
  }
  if (
    borrowingFeeRate > CREDIT_FACILITY_CONSTANTS.HIGH_FEE_THRESHOLD_BPS &&
    borrowingFeeRate <= CREDIT_FACILITY_CONSTANTS.MAX_FEE_RATE_BPS
  ) {
    warnings.push('High fee (>20%) may discourage borrowing')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

// =============================================================================
// Calculation Functions
// =============================================================================

/**
 * @description Calculate borrowing power based on locked tokens and floor price
 * Mirrors the contract formula: (lockedTokens * ltvRatio * floorPrice) / (1e18 * 10000)
 *
 * @param lockedTokens - Amount of tokens to lock (in wei, 18 decimals)
 * @param floorPrice - Floor price per token (in wei, 18 decimals)
 * @param ltvRatio - Loan-to-value ratio in basis points
 * @returns Maximum borrowable amount (in wei, 18 decimals)
 *
 * @example
 * ```typescript
 * import { parseUnits } from 'viem'
 *
 * const borrowingPower = calculateBorrowingPower(
 *   parseUnits('1000', 18),  // 1000 tokens
 *   parseUnits('0.01', 18),  // 0.01 ETH floor price
 *   9000n                     // 90% LTV
 * )
 * // Returns: 9 ETH worth of borrowing power
 * ```
 */
export function calculateBorrowingPower(
  lockedTokens: bigint,
  floorPrice: bigint,
  ltvRatio: bigint
): bigint {
  const BPS_DENOMINATOR = BigInt(10000)
  const DECIMALS = BigInt(10) ** BigInt(18)

  return (lockedTokens * ltvRatio * floorPrice) / (DECIMALS * BPS_DENOMINATOR)
}

/**
 * @description Calculate required tokens for a desired loan amount
 * Inverse of borrowing power calculation
 *
 * @param loanAmount - Desired loan amount (in wei, 18 decimals)
 * @param floorPrice - Floor price per token (in wei, 18 decimals)
 * @param ltvRatio - Loan-to-value ratio in basis points
 * @returns Required tokens to lock (in wei, 18 decimals)
 *
 * @example
 * ```typescript
 * import { parseUnits } from 'viem'
 *
 * const requiredTokens = calculateRequiredTokens(
 *   parseUnits('9', 18),     // Want to borrow 9 ETH
 *   parseUnits('0.01', 18),  // 0.01 ETH floor price
 *   9000n                     // 90% LTV
 * )
 * // Returns: 1000 tokens required
 * ```
 */
export function calculateRequiredTokens(
  loanAmount: bigint,
  floorPrice: bigint,
  ltvRatio: bigint
): bigint {
  const BPS_DENOMINATOR = BigInt(10000)
  const DECIMALS = BigInt(10) ** BigInt(18)

  if (floorPrice === BigInt(0) || ltvRatio === BigInt(0)) {
    return BigInt(0)
  }

  return (loanAmount * DECIMALS * BPS_DENOMINATOR) / (ltvRatio * floorPrice)
}

/**
 * @description Calculate borrowing fee amount
 *
 * @param loanAmount - Principal loan amount (in wei)
 * @param feeRate - Fee rate in basis points
 * @returns Fee amount (in wei)
 */
export function calculateBorrowingFee(loanAmount: bigint, feeRate: bigint): bigint {
  const BPS_DENOMINATOR = BigInt(10000)
  return (loanAmount * feeRate) / BPS_DENOMINATOR
}

/**
 * @description Calculate net loan amount after fees
 *
 * @param grossLoan - Gross loan amount before fees (in wei)
 * @param feeRate - Fee rate in basis points
 * @returns Object with net amount and fee
 */
export function calculateNetLoan(
  grossLoan: bigint,
  feeRate: bigint
): { netAmount: bigint; fee: bigint } {
  const fee = calculateBorrowingFee(grossLoan, feeRate)
  return {
    netAmount: grossLoan - fee,
    fee,
  }
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * @description Convert basis points to percentage
 * @param bps - Value in basis points
 * @returns Percentage value (e.g., 9000 -> 90)
 */
export function bpsToPercent(bps: number): number {
  return bps / 100
}

/**
 * @description Convert percentage to basis points
 * @param percent - Percentage value
 * @returns Basis points (e.g., 90 -> 9000)
 */
export function percentToBps(percent: number): number {
  return percent * 100
}

/**
 * @description Get semantic mode based on credit facility configuration
 * @param config - Credit facility configuration
 * @returns Mode string for UI display
 */
export function getCreditFacilityMode(config: CreditFacilityConfigInput): {
  mode: 'conservative' | 'balanced' | 'aggressive'
  label: string
  description: string
} {
  const { loanToValueRatio, maxLeverage } = config

  // Conservative: Low LTV, low leverage, reasonable fee
  if (loanToValueRatio <= 7500 && maxLeverage <= 10) {
    return {
      mode: 'conservative',
      label: 'Conservative',
      description: 'Lower risk with reduced borrowing capacity',
    }
  }

  // Aggressive: High LTV, high leverage, low fee
  if (loanToValueRatio >= 9500 || maxLeverage >= 50) {
    return {
      mode: 'aggressive',
      label: 'Aggressive',
      description: 'Maximum borrowing capacity with higher risk',
    }
  }

  // Balanced: Everything in between
  return {
    mode: 'balanced',
    label: 'Balanced',
    description: 'Moderate risk with good borrowing capacity',
  }
}
