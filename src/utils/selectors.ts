/**
 * @description Shared function selectors and multicall utilities
 * Used by both launch.ts and presale.ts for permission management
 */

import type { Abi, AbiFunction, ExtractAbiFunctionNames } from 'abitype'
import type { Address } from 'viem'
import { toFunctionSelector } from 'viem'

import { CreditFacility_v1, Floor_v1, SplitterTreasury_v1 } from '../abis'
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

/** DEFAULT_ADMIN_ROLE constant: bytes32(0) - full admin access */
export const DEFAULT_ADMIN_ROLE =
  '0x0000000000000000000000000000000000000000000000000000000000000000' as const

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
  enableBuy: getSelector(Floor_v1, 'enableBuy'),
  disableBuy: getSelector(Floor_v1, 'disableBuy'),
  enableSell: getSelector(Floor_v1, 'enableSell'),
  disableSell: getSelector(Floor_v1, 'disableSell'),
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
  setMaxLoops: getSelector(CreditFacility_v1, 'setMaxLoops'),
} as const

// =============================================================================
// Staking Selectors
// =============================================================================

/**
 * @description StakingManager function selectors for permission granting
 */
export const STAKING_SELECTORS = {
  stake: toFunctionSelector('stake(address,uint256)'),
  harvestYield: toFunctionSelector('harvestYield(address,address)'),
  withdrawFunds: toFunctionSelector('withdrawFunds(address,uint256,address)'),
  rebalance: toFunctionSelector('rebalance(address)'),
  addStrategy: toFunctionSelector('addStrategy(address)'),
  removeStrategy: toFunctionSelector('removeStrategy(address)'),
  setPerformanceFeeBps: toFunctionSelector('setPerformanceFeeBps(uint256)'),
} as const

/**
 * @description Strategy base selectors for staking-manager strategy permissions
 */
export const STRATEGY_BASE_SELECTORS = {
  deposit: toFunctionSelector('deposit(uint256,address)'),
  withdraw: toFunctionSelector('withdraw(uint256,address,address)'),
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
  setMerkleRoot: getSelector(Presale_v1, 'setMerkleRoot'),
  addToWhitelistWithProof: getSelector(Presale_v1, 'addToWhitelistWithProof'),
} as const

// =============================================================================
// Treasury Selectors
// =============================================================================

/**
 * @description SplitterTreasury function selectors for permission granting
 * Extracted from SplitterTreasury_v1 ABI for type safety
 */
export const TREASURY_SELECTORS = {
  setFloorFeePercentage: getSelector(SplitterTreasury_v1, 'setFloorFeePercentage'),
  setFloorFeeTreasury: getSelector(SplitterTreasury_v1, 'setFloorFeeTreasury'),
  setRecipients: getSelector(SplitterTreasury_v1, 'setRecipients'),
  getFunds: getSelector(SplitterTreasury_v1, 'getFunds'),
} as const

// =============================================================================
// Selector Registry (for UI dropdowns and lookups)
// =============================================================================

/**
 * @description Module types for categorizing selectors
 */
export type SelectorModuleType =
  | 'floor'
  | 'creditFacility'
  | 'presale'
  | 'staking'
  | 'strategyBase'
  | 'treasury'

/**
 * @description A registered function selector with metadata
 */
export interface RegisteredSelector {
  name: string
  selector: `0x${string}`
  module: SelectorModuleType
  description: string
}

/**
 * @description Registry of all known function selectors with human-readable names
 * Used for UI dropdowns and permission displays
 */
export const SELECTOR_REGISTRY: RegisteredSelector[] = [
  // Floor/Issuance functions
  { name: 'buy', selector: FLOOR_SELECTORS.buy, module: 'floor', description: 'Buy tokens' },
  {
    name: 'buyFor',
    selector: FLOOR_SELECTORS.buyFor,
    module: 'floor',
    description: 'Buy tokens for another address',
  },
  { name: 'sell', selector: FLOOR_SELECTORS.sell, module: 'floor', description: 'Sell tokens' },
  {
    name: 'sellTo',
    selector: FLOOR_SELECTORS.sellTo,
    module: 'floor',
    description: 'Sell tokens to another address',
  },
  {
    name: 'enableBuy',
    selector: FLOOR_SELECTORS.enableBuy,
    module: 'floor',
    description: 'Enable buying',
  },
  {
    name: 'disableBuy',
    selector: FLOOR_SELECTORS.disableBuy,
    module: 'floor',
    description: 'Disable buying',
  },
  {
    name: 'enableSell',
    selector: FLOOR_SELECTORS.enableSell,
    module: 'floor',
    description: 'Enable selling',
  },
  {
    name: 'disableSell',
    selector: FLOOR_SELECTORS.disableSell,
    module: 'floor',
    description: 'Disable selling',
  },
  {
    name: 'setBuyFee',
    selector: FLOOR_SELECTORS.setBuyFee,
    module: 'floor',
    description: 'Set buy fee percentage',
  },
  {
    name: 'setSellFee',
    selector: FLOOR_SELECTORS.setSellFee,
    module: 'floor',
    description: 'Set sell fee percentage',
  },
  {
    name: 'raiseFloor',
    selector: FLOOR_SELECTORS.raiseFloor,
    module: 'floor',
    description: 'Elevate floor price',
  },
  {
    name: 'withdrawCollateralTo',
    selector: FLOOR_SELECTORS.withdrawCollateralTo,
    module: 'floor',
    description: 'Withdraw collateral to address',
  },
  {
    name: 'depositCollateralFrom',
    selector: FLOOR_SELECTORS.depositCollateralFrom,
    module: 'floor',
    description: 'Deposit collateral from address',
  },

  // Credit Facility functions
  {
    name: 'borrow',
    selector: CREDIT_FACILITY_SELECTORS.borrow,
    module: 'creditFacility',
    description: 'Borrow funds',
  },
  {
    name: 'borrowFor',
    selector: CREDIT_FACILITY_SELECTORS.borrowFor,
    module: 'creditFacility',
    description: 'Borrow for another address',
  },
  {
    name: 'buyAndBorrow',
    selector: CREDIT_FACILITY_SELECTORS.buyAndBorrow,
    module: 'creditFacility',
    description: 'Buy and borrow in one transaction',
  },
  {
    name: 'buyAndBorrowFor',
    selector: CREDIT_FACILITY_SELECTORS.buyAndBorrowFor,
    module: 'creditFacility',
    description: 'Buy and borrow for another address',
  },
  {
    name: 'repay',
    selector: CREDIT_FACILITY_SELECTORS.repay,
    module: 'creditFacility',
    description: 'Repay loan',
  },
  {
    name: 'transferLoan',
    selector: CREDIT_FACILITY_SELECTORS.transferLoan,
    module: 'creditFacility',
    description: 'Transfer loan to another address',
  },
  {
    name: 'rebalanceLoan',
    selector: CREDIT_FACILITY_SELECTORS.rebalanceLoan,
    module: 'creditFacility',
    description: 'Rebalance loan collateral',
  },
  {
    name: 'consolidateLoans',
    selector: CREDIT_FACILITY_SELECTORS.consolidateLoans,
    module: 'creditFacility',
    description: 'Consolidate multiple loans',
  },
  {
    name: 'setLoanToValueRatio',
    selector: CREDIT_FACILITY_SELECTORS.setLoanToValueRatio,
    module: 'creditFacility',
    description: 'Set LTV ratio',
  },
  {
    name: 'setBorrowingFeeRate',
    selector: CREDIT_FACILITY_SELECTORS.setBorrowingFeeRate,
    module: 'creditFacility',
    description: 'Set borrowing fee rate',
  },
  {
    name: 'setMaxLoops',
    selector: CREDIT_FACILITY_SELECTORS.setMaxLoops,
    module: 'creditFacility',
    description: 'Set maximum loops',
  },

  // Presale functions
  {
    name: 'setPresaleState',
    selector: PRESALE_SELECTORS.setPresaleState,
    module: 'presale',
    description: 'Set presale state',
  },
  {
    name: 'setCaps',
    selector: PRESALE_SELECTORS.setCaps,
    module: 'presale',
    description: 'Set deposit caps',
  },
  {
    name: 'setEndTimestamp',
    selector: PRESALE_SELECTORS.setEndTimestamp,
    module: 'presale',
    description: 'Set presale end time',
  },
  {
    name: 'setMerkleRoot',
    selector: PRESALE_SELECTORS.setMerkleRoot,
    module: 'presale',
    description: 'Set Merkle root for whitelist verification',
  },
  {
    name: 'addToWhitelistWithProof',
    selector: PRESALE_SELECTORS.addToWhitelistWithProof,
    module: 'presale',
    description: 'Self-register to whitelist with Merkle proof',
  },

  // Staking Manager functions
  {
    name: 'stake',
    selector: STAKING_SELECTORS.stake,
    module: 'staking',
    description: 'Stake tokens',
  },
  {
    name: 'harvestYield',
    selector: STAKING_SELECTORS.harvestYield,
    module: 'staking',
    description: 'Harvest staking yield',
  },
  {
    name: 'withdrawFunds',
    selector: STAKING_SELECTORS.withdrawFunds,
    module: 'staking',
    description: 'Withdraw staked funds',
  },
  {
    name: 'rebalance',
    selector: STAKING_SELECTORS.rebalance,
    module: 'staking',
    description: 'Rebalance staking allocations',
  },
  {
    name: 'addStrategy',
    selector: STAKING_SELECTORS.addStrategy,
    module: 'staking',
    description: 'Add a staking strategy',
  },
  {
    name: 'removeStrategy',
    selector: STAKING_SELECTORS.removeStrategy,
    module: 'staking',
    description: 'Remove a staking strategy',
  },
  {
    name: 'setPerformanceFeeBps',
    selector: STAKING_SELECTORS.setPerformanceFeeBps,
    module: 'staking',
    description: 'Set performance fee in basis points',
  },

  // Strategy Base functions
  {
    name: 'deposit',
    selector: STRATEGY_BASE_SELECTORS.deposit,
    module: 'strategyBase',
    description: 'Deposit into strategy',
  },
  {
    name: 'withdraw',
    selector: STRATEGY_BASE_SELECTORS.withdraw,
    module: 'strategyBase',
    description: 'Withdraw from strategy',
  },

  // Treasury functions
  {
    name: 'setFloorFeePercentage',
    selector: TREASURY_SELECTORS.setFloorFeePercentage,
    module: 'treasury',
    description: 'Set floor fee percentage',
  },
  {
    name: 'setFloorFeeTreasury',
    selector: TREASURY_SELECTORS.setFloorFeeTreasury,
    module: 'treasury',
    description: 'Set floor fee treasury address',
  },
  {
    name: 'setRecipients',
    selector: TREASURY_SELECTORS.setRecipients,
    module: 'treasury',
    description: 'Set treasury recipients and shares',
  },
  {
    name: 'getFunds',
    selector: TREASURY_SELECTORS.getFunds,
    module: 'treasury',
    description: 'Distribute funds to recipients',
  },
] as const

/**
 * @description Map from selector hash to registered selector info
 */
export const SELECTOR_BY_HASH = new Map<string, RegisteredSelector>(
  SELECTOR_REGISTRY.map((s) => [s.selector.toLowerCase(), s])
)

/**
 * @description Get human-readable function name from selector hash
 * @param selector - The 4-byte function selector (e.g., "0xd6febde8")
 * @returns Human-readable function name or the selector if unknown
 */
export function getSelectorName(selector: string): string {
  const info = SELECTOR_BY_HASH.get(selector.toLowerCase())
  return info?.name ?? selector
}

/**
 * @description Get full selector info from hash
 * @param selector - The 4-byte function selector
 * @returns RegisteredSelector or undefined if unknown
 */
export function getSelectorInfo(selector: string): RegisteredSelector | undefined {
  return SELECTOR_BY_HASH.get(selector.toLowerCase())
}

/**
 * @description Get selectors grouped by module type
 */
export function getSelectorsByModule(): Record<SelectorModuleType, RegisteredSelector[]> {
  return {
    floor: SELECTOR_REGISTRY.filter((s) => s.module === 'floor'),
    creditFacility: SELECTOR_REGISTRY.filter((s) => s.module === 'creditFacility'),
    presale: SELECTOR_REGISTRY.filter((s) => s.module === 'presale'),
    staking: SELECTOR_REGISTRY.filter((s) => s.module === 'staking'),
    strategyBase: SELECTOR_REGISTRY.filter((s) => s.module === 'strategyBase'),
    treasury: SELECTOR_REGISTRY.filter((s) => s.module === 'treasury'),
  }
}

/**
 * @description Module type display names for UI
 */
export const MODULE_DISPLAY_NAMES: Record<SelectorModuleType, string> = {
  floor: 'Floor (Issuance)',
  creditFacility: 'Credit Facility',
  presale: 'Presale',
  staking: 'Staking Manager',
  strategyBase: 'Strategy Base',
  treasury: 'Fee Treasury',
}

/**
 * @description Get selectors filtered by a specific module type
 * @param moduleType - The module type to filter by
 * @returns Array of selectors for that module
 */
export function getSelectorsByModuleType(moduleType: SelectorModuleType): RegisteredSelector[] {
  return SELECTOR_REGISTRY.filter((s) => s.module === moduleType)
}
