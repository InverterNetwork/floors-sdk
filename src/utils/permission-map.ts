/**
 * @fileoverview Maps function selectors to permission requirements.
 *
 * When a user gets Module__CallerNotPermissioned, we can use this map
 * to provide context about which function they tried to call and
 * what permissions are needed.
 *
 * Function selectors are computed as: keccak256(functionSignature)[0:4]
 */

import type { PermissionMapEntry } from './error-types'

// ============================================================================
// Permission Categories
// ============================================================================

/**
 * Common role descriptions for the Floor Markets protocol.
 */
export const ROLE_DESCRIPTIONS = {
  PUBLIC: 'Public access - available to all users',
  ADMIN: 'Admin role required',
  FEE_ADMIN: 'Fee administrator role required',
  MINTER: 'Minter role required',
  WHITELIST: 'Whitelist access required',
  BORROWER: 'Borrower role required',
  TRADER: 'Trader role required',
} as const

// ============================================================================
// Permission Map
// ============================================================================

/**
 * Maps function selectors to their permission requirements.
 *
 * This helps provide better UX for Module__CallerNotPermissioned errors
 * by explaining what function was called and what permission is needed.
 */
export const PERMISSION_MAP: Record<`0x${string}`, PermissionMapEntry> = {
  // ==========================================================================
  // FLOOR_V1 FUNCTIONS
  // ==========================================================================

  // buy(uint256,uint256)
  '0xd96a094a': {
    functionName: 'buy',
    description: 'Buy tokens from the bonding curve',
    requiredRole: 'PUBLIC_ROLE or BUYER_ROLE',
    roleDescription: 'Public trading may not be enabled yet',
    contract: 'Floor_v1',
  },

  // buyFor(address,uint256,uint256)
  '0xb9c977eb': {
    functionName: 'buyFor',
    description: 'Buy tokens for another address',
    requiredRole: 'PUBLIC_ROLE or BUYER_ROLE',
    roleDescription: 'Public trading may not be enabled yet',
    contract: 'Floor_v1',
  },

  // sell(uint256,uint256)
  '0xd79875eb': {
    functionName: 'sell',
    description: 'Sell tokens to the bonding curve',
    requiredRole: 'PUBLIC_ROLE or SELLER_ROLE',
    roleDescription: 'Public trading may not be enabled yet',
    contract: 'Floor_v1',
  },

  // sellTo(address,uint256,uint256)
  '0x068ab14e': {
    functionName: 'sellTo',
    description: 'Sell tokens and send proceeds to another address',
    requiredRole: 'PUBLIC_ROLE or SELLER_ROLE',
    roleDescription: 'Public trading may not be enabled yet',
    contract: 'Floor_v1',
  },

  // enableBuy()
  '0xc6b0bdc5': {
    functionName: 'enableBuy',
    description: 'Enable buying on the market',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can enable buying',
    contract: 'Floor_v1',
  },

  // disableBuy()
  '0xa42dbf1d': {
    functionName: 'disableBuy',
    description: 'Disable buying on the market',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can disable buying',
    contract: 'Floor_v1',
  },

  // enableSell()
  '0x8a0e7f33': {
    functionName: 'enableSell',
    description: 'Enable selling on the market',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can enable selling',
    contract: 'Floor_v1',
  },

  // disableSell()
  '0x5bf35a98': {
    functionName: 'disableSell',
    description: 'Disable selling on the market',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can disable selling',
    contract: 'Floor_v1',
  },

  // setBuyFee(uint256)
  '0x2d26c3ae': {
    functionName: 'setBuyFee',
    description: 'Set the buy fee percentage',
    requiredRole: 'FEE_ADMIN_ROLE',
    roleDescription: 'Only fee administrators can change fees',
    contract: 'Floor_v1',
  },

  // setSellFee(uint256)
  '0x9be0d23d': {
    functionName: 'setSellFee',
    description: 'Set the sell fee percentage',
    requiredRole: 'FEE_ADMIN_ROLE',
    roleDescription: 'Only fee administrators can change fees',
    contract: 'Floor_v1',
  },

  // raiseFloor(uint256)
  '0x7a7c58a2': {
    functionName: 'raiseFloor',
    description: 'Elevate the floor price',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can raise the floor',
    contract: 'Floor_v1',
  },

  // reconfigureSegments(bytes32[],uint256,bool)
  '0x6e8b5efd': {
    functionName: 'reconfigureSegments',
    description: 'Reconfigure bonding curve segments',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can reconfigure the curve',
    contract: 'Floor_v1',
  },

  // ==========================================================================
  // CREDIT_FACILITY_V1 FUNCTIONS
  // ==========================================================================

  // borrow(uint256)
  '0xc5ebeaec': {
    functionName: 'borrow',
    description: 'Borrow against collateral',
    requiredRole: 'PUBLIC_ROLE or BORROWER_ROLE',
    roleDescription: 'Public borrowing may not be enabled yet',
    contract: 'CreditFacility_v1',
  },

  // borrowFor(address,uint256)
  '0x4b8a3529': {
    functionName: 'borrowFor',
    description: 'Borrow for another address',
    requiredRole: 'PUBLIC_ROLE or BORROWER_ROLE',
    roleDescription: 'Public borrowing may not be enabled yet',
    contract: 'CreditFacility_v1',
  },

  // repay(uint256,uint256)
  '0x22867d78': {
    functionName: 'repay',
    description: 'Repay a loan',
    requiredRole: 'PUBLIC_ROLE or BORROWER_ROLE',
    roleDescription: 'Public borrowing may not be enabled yet',
    contract: 'CreditFacility_v1',
  },

  // buyAndBorrow(uint256,uint256,bool)
  '0x3f584ecd': {
    functionName: 'buyAndBorrow',
    description: 'Create a leveraged position',
    requiredRole: 'PUBLIC_ROLE or BORROWER_ROLE',
    roleDescription: 'Public borrowing may not be enabled yet',
    contract: 'CreditFacility_v1',
  },

  // consolidateLoans(uint256[])
  '0x6a0a72ac': {
    functionName: 'consolidateLoans',
    description: 'Consolidate multiple loans',
    requiredRole: 'BORROWER_ROLE',
    roleDescription: 'You must be the loan owner',
    contract: 'CreditFacility_v1',
  },

  // rebalanceLoan(uint256)
  '0x2a0a38fd': {
    functionName: 'rebalanceLoan',
    description: 'Rebalance a loan after floor increase',
    requiredRole: 'BORROWER_ROLE',
    roleDescription: 'You must be the loan owner',
    contract: 'CreditFacility_v1',
  },

  // transferLoan(uint256,address)
  '0xc0bc6796': {
    functionName: 'transferLoan',
    description: 'Transfer loan ownership',
    requiredRole: 'BORROWER_ROLE',
    roleDescription: 'You must be the loan owner',
    contract: 'CreditFacility_v1',
  },

  // setBorrowingFeeRate(uint256)
  '0x4c4fa8e9': {
    functionName: 'setBorrowingFeeRate',
    description: 'Set the borrowing fee rate',
    requiredRole: 'FEE_ADMIN_ROLE',
    roleDescription: 'Only fee administrators can change fees',
    contract: 'CreditFacility_v1',
  },

  // setLoanToValueRatio(uint256)
  '0x9f8a13d7': {
    functionName: 'setLoanToValueRatio',
    description: 'Set the LTV ratio',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can change LTV',
    contract: 'CreditFacility_v1',
  },

  // setMaxLoops(uint256)
  '0x7e837aa1': {
    functionName: 'setMaxLoops',
    description: 'Set maximum loops',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can change max loops',
    contract: 'CreditFacility_v1',
  },

  // ==========================================================================
  // PRESALE_V1 FUNCTIONS
  // ==========================================================================

  // buyPresale(uint256)
  '0x8a6ba19f': {
    functionName: 'buyPresale',
    description: 'Participate in presale',
    requiredRole: 'WHITELIST_ROLE (if whitelist phase) or PUBLIC_ROLE',
    roleDescription: 'You may need to be whitelisted',
    contract: 'Presale_v1',
  },

  // buyPresaleWithLoops(uint256,uint256)
  '0x9f0d04e7': {
    functionName: 'buyPresaleWithLoops',
    description: 'Participate in presale with loops',
    requiredRole: 'WHITELIST_ROLE (if whitelist phase) or PUBLIC_ROLE',
    roleDescription: 'You may need to be whitelisted',
    contract: 'Presale_v1',
  },

  // claimAll(uint256)
  '0x7c1bb0e1': {
    functionName: 'claimAll',
    description: 'Claim presale tokens',
    requiredRole: 'Position owner',
    roleDescription: 'You must own the position',
    contract: 'Presale_v1',
  },

  // setPresaleState(uint8)
  '0x5a0ecdff': {
    functionName: 'setPresaleState',
    description: 'Change presale state',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can change presale state',
    contract: 'Presale_v1',
  },

  // setCaps(uint256,uint256)
  '0x5cb28c41': {
    functionName: 'setCaps',
    description: 'Set presale caps',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can set caps',
    contract: 'Presale_v1',
  },

  // setEndTimestamp(uint64)
  '0x5fb2b3d3': {
    functionName: 'setEndTimestamp',
    description: 'Set presale end time',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can set end time',
    contract: 'Presale_v1',
  },

  // setMerkleRoot(bytes32)
  '0x7cb64759': {
    functionName: 'setMerkleRoot',
    description: 'Set Merkle root for whitelist verification',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can set the Merkle root',
    contract: 'Presale_v1',
  },

  // ==========================================================================
  // AUTHORIZER FUNCTIONS
  // ==========================================================================

  // grantRole(bytes32,address)
  '0x2f2ff15d': {
    functionName: 'grantRole',
    description: 'Grant role to an address',
    requiredRole: 'Role admin',
    roleDescription: 'You must be admin of the role',
    contract: 'AUT_Roles_v2',
  },

  // revokeRole(bytes32,address)
  '0xd547741f': {
    functionName: 'revokeRole',
    description: 'Revoke role from an address',
    requiredRole: 'Role admin',
    roleDescription: 'You must be admin of the role',
    contract: 'AUT_Roles_v2',
  },

  // renounceRole(bytes32,address)
  '0x36568abe': {
    functionName: 'renounceRole',
    description: 'Renounce your own role',
    requiredRole: 'Self only',
    roleDescription: 'You can only renounce your own roles',
    contract: 'AUT_Roles_v2',
  },

  // createRole(string,bytes32,address[])
  '0x7a44e4e0': {
    functionName: 'createRole',
    description: 'Create a new role',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can create roles',
    contract: 'AUT_Roles_v2',
  },

  // addAccessPermission(address,bytes4,bytes32)
  '0x86a22eff': {
    functionName: 'addAccessPermission',
    description: 'Grant function access to a role',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can manage permissions',
    contract: 'AUT_Roles_v2',
  },

  // removeAccessPermission(address,bytes4,bytes32)
  '0x79755bce': {
    functionName: 'removeAccessPermission',
    description: 'Revoke function access from a role',
    requiredRole: 'ADMIN_ROLE',
    roleDescription: 'Only administrators can manage permissions',
    contract: 'AUT_Roles_v2',
  },
} as const

// ============================================================================
// Utilities
// ============================================================================

/**
 * Get permission info for a function selector.
 */
export function getPermissionInfo(selector: `0x${string}`): PermissionMapEntry | null {
  return PERMISSION_MAP[selector] ?? null
}

/**
 * Get a human-readable permission error message for a function.
 */
export function getPermissionErrorMessage(selector: `0x${string}`): {
  prettyMessage: string
  suggestion: string
} {
  const info = PERMISSION_MAP[selector]

  if (!info) {
    return {
      prettyMessage: 'Not authorized for this action',
      suggestion: 'You may need special permissions',
    }
  }

  return {
    prettyMessage: `Not authorized to ${info.description.toLowerCase()}`,
    suggestion: info.roleDescription,
  }
}

/**
 * Check if a function is an admin-only function.
 */
export function isAdminFunction(selector: `0x${string}`): boolean {
  const info = PERMISSION_MAP[selector]
  if (!info) return false

  return (
    info.requiredRole.includes('ADMIN') ||
    info.requiredRole.includes('admin') ||
    info.requiredRole === 'Role admin'
  )
}

/**
 * Check if a function should be publicly accessible.
 */
export function shouldBePublic(selector: `0x${string}`): boolean {
  const info = PERMISSION_MAP[selector]
  if (!info) return false

  return info.requiredRole.includes('PUBLIC')
}
