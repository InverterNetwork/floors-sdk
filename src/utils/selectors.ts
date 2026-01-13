/**
 * @description Shared function selectors and multicall utilities
 * Used by both launch.ts and presale.ts for permission management
 */

import type { Abi, AbiFunction, ExtractAbiFunctionNames } from 'abitype'
import type { Address } from 'viem'
import { toFunctionSelector } from 'viem'

import { CreditFacility_v1, Floor_v1 } from '../abis'
import Presale_v1 from '../abis/Presale_v1'

// =============================================================================
// Types
// =============================================================================

/**
 * @description A single call for TransactionForwarder multicall
 */
export type SingleCall = {
  target: Address
  allowFailure: boolean
  callData: `0x${string}`
}

// =============================================================================
// Constants
// =============================================================================

/** PUBLIC_ROLE constant: bytes32(1) - grants access to anyone */
export const PUBLIC_ROLE =
  '0x0000000000000000000000000000000000000000000000000000000000000001' as const

/** Default live buy fee: 0.5% (50 basis points) */
export const DEFAULT_LIVE_BUY_FEE_BPS = 50

/** Default live borrow fee: 6% (600 basis points) */
export const DEFAULT_LIVE_BORROW_FEE_BPS = 600

// =============================================================================
// Selector Helper
// =============================================================================

/**
 * @description Extract function selector from ABI with full type safety
 * Uses abitype for compile-time function name validation
 * @param abi The ABI to search in
 * @param functionName The function name (must exist in ABI)
 * @returns The 4-byte function selector
 */
export function getSelector<
  const TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
>(abi: TAbi, functionName: TFunctionName): `0x${string}` {
  const abiItem = abi.find(
    (item): item is AbiFunction => item.type === 'function' && item.name === functionName
  )
  if (!abiItem) {
    throw new Error(`Function ${functionName} not found in ABI`)
  }
  return toFunctionSelector(abiItem)
}

// =============================================================================
// Floor Selectors
// =============================================================================

/**
 * @description Floor/Issuance function selectors for permission granting
 * Extracted from Floor_v1 ABI for type safety
 */
export const FLOOR_SELECTORS = {
  buy: getSelector(Floor_v1, 'buy'),
  buyFor: getSelector(Floor_v1, 'buyFor'),
  sell: getSelector(Floor_v1, 'sell'),
  sellTo: getSelector(Floor_v1, 'sellTo'),
  openBuy: getSelector(Floor_v1, 'openBuy'),
  closeBuy: getSelector(Floor_v1, 'closeBuy'),
  openSell: getSelector(Floor_v1, 'openSell'),
  closeSell: getSelector(Floor_v1, 'closeSell'),
  setBuyFee: getSelector(Floor_v1, 'setBuyFee'),
  setSellFee: getSelector(Floor_v1, 'setSellFee'),
  raiseFloor: getSelector(Floor_v1, 'raiseFloor'),
  withdrawCollateralTo: getSelector(Floor_v1, 'withdrawCollateralTo'),
  depositCollateralFrom: getSelector(Floor_v1, 'depositCollateralFrom'),
} as const

// =============================================================================
// CreditFacility Selectors
// =============================================================================

/**
 * @description CreditFacility function selectors for permission granting
 * Extracted from CreditFacility_v1 ABI for type safety
 */
export const CREDIT_FACILITY_SELECTORS = {
  borrow: getSelector(CreditFacility_v1, 'borrow'),
  borrowFor: getSelector(CreditFacility_v1, 'borrowFor'),
  buyAndBorrow: getSelector(CreditFacility_v1, 'buyAndBorrow'),
  buyAndBorrowFor: getSelector(CreditFacility_v1, 'buyAndBorrowFor'),
  repay: getSelector(CreditFacility_v1, 'repay'),
  transferLoan: getSelector(CreditFacility_v1, 'transferLoan'),
  rebalanceLoan: getSelector(CreditFacility_v1, 'rebalanceLoan'),
  consolidateLoans: getSelector(CreditFacility_v1, 'consolidateLoans'),
  setLoanToValueRatio: getSelector(CreditFacility_v1, 'setLoanToValueRatio'),
  setBorrowingFeeRate: getSelector(CreditFacility_v1, 'setBorrowingFeeRate'),
  setMaxLeverage: getSelector(CreditFacility_v1, 'setMaxLeverage'),
} as const

// =============================================================================
// Presale Selectors
// =============================================================================

/**
 * @description Presale function selectors for permission granting
 * Extracted from Presale_v1 ABI for type safety
 */
export const PRESALE_SELECTORS = {
  setPresaleState: getSelector(Presale_v1, 'setPresaleState'),
  setCaps: getSelector(Presale_v1, 'setCaps'),
  setEndTimestamp: getSelector(Presale_v1, 'setEndTimestamp'),
  addToWhitelist: getSelector(Presale_v1, 'addToWhitelist'),
  removeFromWhitelist: getSelector(Presale_v1, 'removeFromWhitelist'),
} as const
