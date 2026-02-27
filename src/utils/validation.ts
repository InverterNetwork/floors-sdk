/**
 * @description Shared validation utilities for SDK parameter checking.
 * Centralizes validation logic that was previously duplicated across classes.
 */

import type { Address } from 'viem'
import { getAddress, isAddress } from 'viem'

// =============================================================================
// Constants
// =============================================================================

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const MAX_BPS = 10_000
export const MAX_LEVERAGE = 255
export const MAX_SLIPPAGE_BPS = 5_000
export const RECOMMENDED_MAX_LTV_BPS = 9_900

/**
 * @description Protocol-level limits for safety enforcement.
 * MAX_LOOPS caps the loop count for user-facing operations (buyAndBorrow, presale leverage).
 * Admin functions (setMaxLeverage) still allow up to MAX_LEVERAGE (255).
 */
export const PROTOCOL_LIMITS = {
  MAX_LOOPS: 25,
} as const

// =============================================================================
// Address Validation
// =============================================================================

/**
 * @description Validates and checksums an address. Rejects zero address and invalid formats.
 * @param address - The address to validate
 * @param paramName - Name of the parameter (for error messages)
 * @returns The checksummed address
 * @throws If address is invalid or zero address
 */
export function validateAddress(address: string, paramName: string): Address {
  if (!address || !isAddress(address)) {
    throw new Error(`${paramName} is not a valid address`)
  }
  const checksummed = getAddress(address)
  if (checksummed === ZERO_ADDRESS) {
    throw new Error(`${paramName} cannot be the zero address`)
  }
  return checksummed as Address
}

/**
 * @description Validates an address without rejecting zero address.
 * Useful when zero address is a valid input (e.g., revoking a role).
 * @param address - The address to validate
 * @param paramName - Name of the parameter (for error messages)
 * @returns The checksummed address
 * @throws If address format is invalid
 */
export function validateAddressFormat(address: string, paramName: string): Address {
  if (!address || !isAddress(address)) {
    throw new Error(`${paramName} is not a valid address`)
  }
  return getAddress(address) as Address
}

// =============================================================================
// Numeric Validation
// =============================================================================

/**
 * @description Asserts that a bigint amount is greater than zero.
 * @param amount - The amount to check
 * @param paramName - Name of the parameter (for error messages)
 * @throws If amount is zero or negative
 */
export function assertPositiveAmount(amount: bigint, paramName = 'Amount'): void {
  if (amount <= BigInt(0)) {
    throw new Error(`${paramName} must be greater than zero`)
  }
}

/**
 * @description Validates a value in basis points with configurable range.
 * @param value - The basis points value
 * @param paramName - Name of the parameter (for error messages)
 * @param min - Minimum allowed value (default: 0)
 * @param max - Maximum allowed value (default: 10000)
 * @throws If value is out of range or not an integer
 */
export function validateBps(
  value: number,
  paramName: string,
  min = 0,
  max: number = MAX_BPS
): void {
  if (!Number.isInteger(value)) {
    throw new Error(`${paramName} must be a whole number (integer basis points)`)
  }
  if (value < min || value > max) {
    throw new Error(`${paramName} must be between ${min} and ${max} basis points`)
  }
}

/**
 * @description Validates a fee value in basis points (0–10000).
 * @param feeBps - Fee in basis points
 * @throws If fee is out of range or not an integer
 */
export function validateFeeBps(feeBps: number): void {
  validateBps(feeBps, 'Fee')
}

/**
 * @description Validates LTV in basis points (1–9900), matching CreditFacility_v1 contract limits.
 * @param ltvBps - Loan-to-value ratio in basis points
 * @throws If LTV is out of range or not an integer
 */
export function validateLTV(ltvBps: number): void {
  validateBps(ltvBps, 'LTV', 1, RECOMMENDED_MAX_LTV_BPS)
}

/**
 * @description Validates slippage in basis points (0–5000).
 * Caps at 50% to prevent unreasonable slippage tolerance.
 * @param slippageBps - Slippage tolerance in basis points
 * @throws If slippage is out of range or not an integer
 */
export function validateSlippageBps(slippageBps: number): void {
  validateBps(slippageBps, 'Slippage', 0, MAX_SLIPPAGE_BPS)
}

/**
 * @description Validates a max leverage value (1–255, matching uint8 contract constraint).
 * Used for admin functions that configure the contract's max loops.
 * @param leverage - The leverage value
 * @throws If leverage is out of range or not an integer
 */
export function validateMaxLeverage(leverage: number): void {
  if (!Number.isInteger(leverage)) {
    throw new Error('Max leverage must be a whole number')
  }
  if (leverage < 1 || leverage > MAX_LEVERAGE) {
    throw new Error('Max leverage must be between 1 and 255')
  }
}

/**
 * @description Validates a loop count for user-facing operations against PROTOCOL_LIMITS.MAX_LOOPS.
 * Use this for buyAndBorrow, buyPresaleWithLeverage, and similar user-facing functions.
 * @param loops - The loop/leverage count
 * @throws If loops exceed PROTOCOL_LIMITS.MAX_LOOPS or are invalid
 */
export function validateLoopCount(loops: number): void {
  if (!Number.isInteger(loops)) {
    throw new Error('Loop count must be a whole number')
  }
  if (loops < 1 || loops > PROTOCOL_LIMITS.MAX_LOOPS) {
    throw new Error(`Loop count must be between 1 and ${PROTOCOL_LIMITS.MAX_LOOPS}`)
  }
}
