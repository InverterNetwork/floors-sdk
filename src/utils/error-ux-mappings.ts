/**
 * @fileoverview UX mappings for Floor Markets contract errors.
 *
 * This file maps all known error signatures to user-friendly messages.
 * TypeScript enforces that ALL errors from error-signatures.generated.ts
 * have a mapping here. When contracts are updated and new errors are added,
 * you'll get TypeScript errors until you add UX mappings for them.
 *
 * To sync after contract updates:
 * 1. Run `bun run sync:errors`
 * 2. Search for "TODO:" to find entries that need manual review
 */

import type { KnownErrorSignature } from './error-signatures.generated'
import type { ErrorCategory, ErrorSeverity, RecoveryAction } from './error-types'

// ============================================================================
// UX Mapping Types
// ============================================================================

/**
 * UX mapping for a single error.
 */
export type ErrorUXMapping = {
  /** User-friendly message for display */
  prettyMessage: string
  /** Actionable suggestion for the user */
  suggestion: string | null
  /** Error category for analytics */
  category: ErrorCategory
  /** Severity level */
  severity: ErrorSeverity
  /** Recovery actions */
  recoveryActions: RecoveryAction[]
  /**
   * Dynamic message generator based on decoded error args.
   * Use this for errors with parameters that should be shown to users.
   */
  dynamicMessage?: (args: Record<string, unknown>) => string
  /**
   * Dynamic suggestion generator based on decoded error args.
   */
  dynamicSuggestion?: (args: Record<string, unknown>) => string
}

// ============================================================================
// Helper Functions for Common Patterns
// ============================================================================

/** Creates a simple recovery action */
const action = (label: string, type: RecoveryAction['type'], primary = false): RecoveryAction => ({
  label,
  type,
  primary,
})

/** Common recovery actions */
const ACTIONS = {
  retry: action('Try again', 'retry', true),
  refresh: action('Refresh', 'refresh'),
  contactSupport: action('Contact support', 'contact_support'),
  adjustSlippage: action('Adjust slippage', 'adjust_slippage', true),
  decreaseAmount: action('Use smaller amount', 'decrease_amount', true),
  increaseAmount: action('Use larger amount', 'increase_amount'),
  addGas: action('Add ETH for gas', 'add_gas', true),
  connectWallet: action('Connect wallet', 'connect_wallet', true),
  approveToken: action('Approve token', 'approve_token', true),
  wait: action('Wait and retry', 'wait', true),
  checkWhitelist: action('Check whitelist', 'check_whitelist'),
  reduceLeverage: action('Reduce leverage', 'reduce_leverage', true),
  addCollateral: action('Add collateral', 'add_collateral', true),
  repayDebt: action('Repay debt', 'repay_debt'),
} as const

// ============================================================================
// ERROR UX MAPPINGS
// ============================================================================

/**
 * Complete mapping of error signatures to UX messages.
 *
 * TypeScript will error if any KnownErrorSignature is missing!
 * This ensures all contract errors have user-friendly messages.
 */
export const ERROR_UX_MAPPINGS: Record<KnownErrorSignature, ErrorUXMapping> = {
  // ==========================================================================
  // ACCESS CONTROL ERRORS
  // ==========================================================================

  '0x6697b232': {
    // AccessControlBadConfirmation
    prettyMessage: 'Role confirmation failed',
    suggestion: 'Make sure you are confirming with the correct account',
    category: 'permission',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xe2517d3f': {
    // AccessControlUnauthorizedAccount
    prettyMessage: 'Not authorized for this action',
    suggestion: 'You need a specific role to perform this action',
    category: 'permission',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
    dynamicMessage: (args) => `Account ${String(args.account).slice(0, 10)}... is not authorized`,
  },

  // ==========================================================================
  // MODULE PERMISSION ERRORS
  // ==========================================================================

  '0x7e5cf732': {
    // Module__Authorizer__CannotModifyAdminRoleAccess
    prettyMessage: 'Cannot modify admin role',
    suggestion: 'Admin role permissions are locked and cannot be changed',
    category: 'authorizer',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x247434a8': {
    // Module__Authorizer__CannotRenounceLastAdmin
    prettyMessage: 'Cannot remove last admin',
    suggestion: 'At least one admin must remain. Assign another admin first.',
    category: 'authorizer',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x5b784de5': {
    // Module__Authorizer__InvalidInitialAdmin
    prettyMessage: 'Invalid admin address',
    suggestion: 'Admin address cannot be zero',
    category: 'authorizer',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x7a625bbe': {
    // Module__Authorizer__InvalidInputLength
    prettyMessage: 'Invalid input arrays',
    suggestion: 'Input arrays must have matching lengths',
    category: 'authorizer',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xe1242708': {
    // Module__Authorizer__RoleIdNotExisting
    prettyMessage: 'Role does not exist',
    suggestion: 'The specified role has not been created yet',
    category: 'authorizer',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x7ea9d542': {
    // Module__CallerNotPermissioned
    prettyMessage: 'Not authorized for this action',
    suggestion: 'This function requires special permissions. Public access may not be enabled yet.',
    category: 'permission',
    severity: 'error',
    recoveryActions: [ACTIONS.checkWhitelist, ACTIONS.contactSupport],
  },

  // ==========================================================================
  // TRADING ERRORS (BUY/SELL)
  // ==========================================================================

  '0x85a2648b': {
    // Module__IssuanceBase__BuyingFunctionaltiesClosed
    prettyMessage: 'Buying is currently disabled',
    suggestion: 'Trading may not be open yet. Check if the presale has ended.',
    category: 'trading',
    severity: 'warning',
    recoveryActions: [ACTIONS.wait, ACTIONS.refresh],
  },

  '0x21af7e45': {
    // Module__IssuanceBase__InsufficientOutputAmount
    prettyMessage: 'Price moved too much',
    suggestion: 'The price changed during your transaction. Try increasing slippage.',
    category: 'trading',
    severity: 'warning',
    recoveryActions: [ACTIONS.adjustSlippage, ACTIONS.decreaseAmount],
  },

  '0x99bb7d2d': {
    // Module__IssuanceBase__InvalidDepositAmount
    prettyMessage: 'Invalid amount',
    suggestion: 'Enter a valid amount greater than zero',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.increaseAmount],
  },

  '0x5489340e': {
    // Module__IssuanceBase__InvalidFeePercentage
    prettyMessage: 'Invalid fee configuration',
    suggestion: 'Fee percentage is out of valid range',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x94ba0164': {
    // Module__IssuanceBase__InvalidMinAmountOut
    prettyMessage: 'Invalid minimum amount',
    suggestion: 'Minimum output amount cannot be zero',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x0a1cfefe': {
    // Module__IssuanceBase__InvalidRecipient
    prettyMessage: 'Invalid recipient address',
    suggestion: 'Recipient address cannot be zero',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x484caa15': {
    // Module__IssuanceBase__TradeAmountTooLow
    prettyMessage: 'Amount too small',
    suggestion: 'Increase your trade amount to meet the minimum',
    category: 'trading',
    severity: 'warning',
    recoveryActions: [ACTIONS.increaseAmount],
  },

  '0x9d4878c9': {
    // Module__RedeemingIssuanceBase__InsufficientCollateralForProjectFee
    prettyMessage: 'Insufficient collateral for fees',
    suggestion: 'The protocol needs more collateral to cover fees',
    category: 'trading',
    severity: 'error',
    recoveryActions: [ACTIONS.decreaseAmount, ACTIONS.contactSupport],
  },

  '0x9a71ec39': {
    // Module__RedeemingIssuanceBase__SellingFunctionaltiesClosed
    prettyMessage: 'Selling is currently disabled',
    suggestion: 'Selling may not be enabled for this market yet',
    category: 'trading',
    severity: 'warning',
    recoveryActions: [ACTIONS.wait, ACTIONS.refresh],
  },

  // ==========================================================================
  // BONDING CURVE ERRORS
  // ==========================================================================

  '0xe04b1819': {
    // DiscreteCurveMathLib__InitialPriceTooLarge
    prettyMessage: 'Initial price too high',
    suggestion: 'Curve configuration has invalid initial price',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xc9052a7a': {
    // DiscreteCurveMathLib__InsufficientIssuanceToSell
    prettyMessage: 'Insufficient liquidity for sale',
    suggestion: 'Try selling a smaller amount',
    category: 'trading',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
    dynamicMessage: (args) =>
      `Not enough liquidity. Requested: ${args.requested_}, Available: ${args.available_}`,
  },

  '0x8765fe9e': {
    // DiscreteCurveMathLib__InvalidFlatSegment
    prettyMessage: 'Invalid curve segment',
    suggestion: 'Curve configuration is invalid',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x78878655': {
    // DiscreteCurveMathLib__InvalidNumberOfSteps
    prettyMessage: 'Invalid curve steps',
    suggestion: 'Curve must have at least one step',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xe80a3381': {
    // DiscreteCurveMathLib__InvalidPointSegment
    prettyMessage: 'Invalid curve point',
    suggestion: 'Curve configuration has invalid point segment',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x17cfecb6': {
    // DiscreteCurveMathLib__InvalidPriceProgression
    prettyMessage: 'Invalid price progression',
    suggestion: 'Curve prices must be in ascending order',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x1e674ad4': {
    // DiscreteCurveMathLib__NoSegmentsConfigured
    prettyMessage: 'Market not configured',
    suggestion: 'This market has no pricing curve configured',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xbca02987': {
    // DiscreteCurveMathLib__PriceIncreaseTooLarge
    prettyMessage: 'Price increase too large',
    suggestion: 'Curve segment price increase exceeds maximum',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xe4369ad8': {
    // DiscreteCurveMathLib__SegmentIsFree
    prettyMessage: 'Invalid segment price',
    suggestion: 'Curve segment cannot have zero price',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x53888fca': {
    // DiscreteCurveMathLib__SingleStepMustBeFlat
    prettyMessage: 'Invalid single-step segment',
    suggestion: 'Single-step segments must be flat',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xa1f6025c': {
    // DiscreteCurveMathLib__SupplyExceedsCurveCapacity
    prettyMessage: 'Amount exceeds capacity',
    suggestion: 'The requested amount exceeds the curve capacity',
    category: 'trading',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
    dynamicMessage: (args) =>
      `Amount ${args.providedSupply_} exceeds max capacity ${args.maxCapacity_}`,
  },

  '0x1f52d7ae': {
    // DiscreteCurveMathLib__SupplyPerStepTooLarge
    prettyMessage: 'Supply per step too large',
    suggestion: 'Curve segment supply exceeds maximum',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x37f615e7': {
    // DiscreteCurveMathLib__TooManySegments
    prettyMessage: 'Too many curve segments',
    suggestion: 'Curve has exceeded maximum segment count',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x73937fff': {
    // DiscreteCurveMathLib__ZeroCollateralInput
    prettyMessage: 'Invalid amount',
    suggestion: 'Amount must be greater than zero',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.increaseAmount],
  },

  '0x406480c1': {
    // DiscreteCurveMathLib__ZeroIssuanceInput
    prettyMessage: 'Invalid amount',
    suggestion: 'Amount must be greater than zero',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.increaseAmount],
  },

  '0x3c5094de': {
    // DiscreteCurveMathLib__ZeroSupplyPerStep
    prettyMessage: 'Invalid curve configuration',
    suggestion: 'Supply per step cannot be zero',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  // ==========================================================================
  // FLOOR SPECIFIC ERRORS
  // ==========================================================================

  '0x07982e52': {
    // Module__BC_Discrete_Redeeming_VirtualSupply__InsufficientCollateralBalance
    prettyMessage: 'Insufficient collateral balance',
    suggestion: 'The contract does not have enough collateral to complete this operation.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.decreaseAmount, ACTIONS.contactSupport],
    dynamicMessage: (args) =>
      `Collateral balance ${args.actualBalance_} is less than required ${args.requiredBalance_}`,
  },

  '0x1bb5195f': {
    // Module__BC_Discrete_Redeeming_VirtualSupply__InvarianceCheckFailed
    prettyMessage: 'Invariance check failed',
    suggestion: 'Internal consistency check failed. Please try again.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.retry, ACTIONS.contactSupport],
  },

  '0x6c8712d9': {
    // Module__Floor__CollateralTooSmall
    prettyMessage: 'Collateral too small',
    suggestion: 'Increase the collateral amount to meet the minimum requirement.',
    category: 'trading',
    severity: 'warning',
    recoveryActions: [ACTIONS.increaseAmount],
    dynamicMessage: (args) => `Provided ${args.provided_}, minimum required is ${args.minimum_}`,
  },

  '0x54fe6890': {
    // Module__Floor__InsufficientPremiumSteps
    prettyMessage: 'Insufficient premium steps',
    suggestion: 'Floor configuration needs more premium steps',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xd08bdb84': {
    // Module__Floor__InsufficientSegments
    prettyMessage: 'Insufficient segments',
    suggestion: 'Floor configuration needs more segments',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x62bcaf22': {
    // Module__Floor__InvalidFloorSegment
    prettyMessage: 'Invalid floor segment',
    suggestion: 'Floor segment configuration is invalid',
    category: 'curve',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x23c42ef0': {
    // Module__Floor__NoFloorIncrease
    prettyMessage: 'No floor increase',
    suggestion: 'Floor elevation requires collateral that would raise the floor',
    category: 'curve',
    severity: 'warning',
    recoveryActions: [ACTIONS.increaseAmount],
  },

  // ==========================================================================
  // CREDIT FACILITY ERRORS
  // ==========================================================================

  '0xf31ff149': {
    // Module__CreditFacility_BorrowAmountTooSmall
    prettyMessage: 'Borrow amount too small',
    suggestion: 'Increase your borrow amount to meet the minimum',
    category: 'credit',
    severity: 'warning',
    recoveryActions: [ACTIONS.increaseAmount],
    dynamicMessage: (args) => `Requested ${args.requested_}, minimum is ${args.minimumRequired_}`,
  },

  '0xe0a00cb8': {
    // Module__CreditFacility_FeeTooHigh
    prettyMessage: 'Fee too high',
    suggestion: 'The fee exceeds the maximum allowed.',
    category: 'credit',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
    dynamicMessage: (args) => `Fee ${args.provided_} exceeds maximum ${args.maximum_}`,
  },

  '0x0d0fa8e8': {
    // Module__CreditFacility_InsufficientCollateralForLoops
    prettyMessage: 'Insufficient collateral for loops',
    suggestion: 'Reduce the number of loops or add more collateral.',
    category: 'credit',
    severity: 'warning',
    recoveryActions: [ACTIONS.addCollateral, ACTIONS.decreaseAmount],
  },

  '0xb8d4508f': {
    // Module__CreditFacility_InsufficientIssuanceTokensReceived
    prettyMessage: 'Insufficient tokens received',
    suggestion: 'Price may have moved. Try again with adjusted slippage.',
    category: 'credit',
    severity: 'error',
    recoveryActions: [ACTIONS.adjustSlippage, ACTIONS.retry],
  },

  '0xe5b90295': {
    // Module__CreditFacility_InsufficientLoansToConsolidate
    prettyMessage: 'Not enough loans to consolidate',
    suggestion: 'You need at least 2 loans to consolidate',
    category: 'credit',
    severity: 'warning',
    recoveryActions: [ACTIONS.retry],
  },

  '0x5a123629': {
    // Module__CreditFacility_InvalidBorrowAmount
    prettyMessage: 'Invalid borrow amount',
    suggestion: 'Enter a valid borrow amount greater than zero',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.increaseAmount],
  },

  '0xae6544c7': {
    // Module__CreditFacility_InvalidFeeCalculatorAddress
    prettyMessage: 'Invalid fee calculator',
    suggestion: 'System configuration error',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xa4716b72': {
    // Module__CreditFacility_InvalidFeeRate
    prettyMessage: 'Invalid fee rate',
    suggestion: 'Fee rate is out of valid range',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xecbc7909': {
    // Module__CreditFacility_InvalidLoanId
    prettyMessage: 'Loan not found',
    suggestion: 'This loan may have been repaid already',
    category: 'credit',
    severity: 'error',
    recoveryActions: [ACTIONS.refresh],
  },

  '0xe8e3a91b': {
    // Module__CreditFacility_InvalidLoansForConsolidation
    prettyMessage: 'Cannot consolidate these loans',
    suggestion: 'The selected loans cannot be consolidated',
    category: 'credit',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xd644eb85': {
    // Module__CreditFacility_InvalidLoopCount
    prettyMessage: 'Invalid loop count',
    suggestion: 'The number of loops must be within the allowed range.',
    category: 'credit',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x3f3c72cc': {
    // Module__CreditFacility_InvalidReceiver
    prettyMessage: 'Invalid receiver address',
    suggestion: 'Receiver address cannot be zero',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x85591c03': {
    // Module__CreditFacility_InvalidTokenReceiver
    prettyMessage: 'Invalid token receiver',
    suggestion: 'Token receiver address is invalid',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xb1e5d973': {
    // Module__CreditFacility_InvalidTransferRecipient
    prettyMessage: 'Invalid transfer recipient',
    suggestion: 'Cannot transfer loan to this address',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xf9beff8d': {
    // Module__CreditFacility_LoanNotFoundInUserLoans
    prettyMessage: 'Loan not found',
    suggestion: 'This loan does not exist in your active loans.',
    category: 'credit',
    severity: 'error',
    recoveryActions: [ACTIONS.refresh],
  },

  '0x24b7757c': {
    // Module__CreditFacility_LoanToValueRatioTooHigh
    prettyMessage: 'Borrow amount exceeds limit',
    suggestion: 'Reduce borrow amount or add more collateral',
    category: 'credit',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount, ACTIONS.addCollateral],
    dynamicMessage: (args) => `LTV ratio ${args.attempted_} exceeds maximum ${args.maximum_}`,
  },

  '0xff17a9c5': {
    // Module__CreditFacility_NoCollateralAvailable
    prettyMessage: 'No collateral available',
    suggestion: 'Buy fTokens first to use as collateral',
    category: 'credit',
    severity: 'warning',
    recoveryActions: [ACTIONS.addCollateral],
  },

  '0x308e1d3b': {
    // Module__CreditFacility_NoIssuanceTokensReceived
    prettyMessage: 'No tokens received',
    suggestion: 'Transaction failed to receive tokens. Try again.',
    category: 'credit',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x0db6a82c': {
    // Module__CreditFacility_NoLoansToConsolidate
    prettyMessage: 'No loans to consolidate',
    suggestion: 'You need active loans to consolidate',
    category: 'credit',
    severity: 'warning',
    recoveryActions: [ACTIONS.refresh],
  },

  '0xf3d0ae0e': {
    // Module__CreditFacility_NoSegmentsConfigured
    prettyMessage: 'Credit facility not configured',
    suggestion: 'The credit facility is not yet set up',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xea969350': {
    // Module__CreditFacility_NothingToRebalance
    prettyMessage: 'Nothing to rebalance',
    suggestion: 'This loan is already optimally balanced',
    category: 'credit',
    severity: 'info',
    recoveryActions: [],
  },

  '0xa454b13c': {
    // Module__CreditFacility_SlippageExceeded
    prettyMessage: 'Slippage exceeded',
    suggestion: 'Price moved during the transaction. Try increasing slippage tolerance.',
    category: 'credit',
    severity: 'warning',
    recoveryActions: [ACTIONS.adjustSlippage, ACTIONS.retry],
    dynamicMessage: (args) => `Received ${args.received_}, minimum required was ${args.minimum_}`,
  },

  // ==========================================================================
  // PRESALE ERRORS
  // ==========================================================================

  '0x842b8bd1': {
    // Presale__AfterEndTimestamp
    prettyMessage: 'Presale has ended',
    suggestion: 'The presale period is over',
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.refresh],
  },

  '0x147f6a01': {
    // Presale__CannotModifyAfterStart
    prettyMessage: 'Cannot modify after start',
    suggestion: 'Presale parameters cannot be changed after it has started.',
    category: 'presale',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xfcb808d9': {
    // Presale__FeeExceedsDeposit
    prettyMessage: 'Fee exceeds deposit',
    suggestion: 'The fee amount is larger than the deposit. Try a larger amount.',
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.increaseAmount],
    dynamicMessage: (args) => `Fee ${args.fee_} exceeds deposit ${args.deposit_}`,
  },

  '0xafbfe5b0': {
    // Presale__GlobalCapExceeded
    prettyMessage: 'Presale cap reached',
    suggestion: 'The total presale allocation has been sold',
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
    dynamicMessage: (args) =>
      `Attempted to mint ${args.attemptedMint_} but cap is ${args.cap_} (current: ${args.currentIssuance_})`,
  },

  '0xd6ec36a7': {
    // Presale__InvalidBps
    prettyMessage: 'Invalid percentage',
    suggestion: 'Percentage value is out of range',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x5cd7b824': {
    // Presale__InvalidEndTimestamp
    prettyMessage: 'Invalid end time',
    suggestion: 'End timestamp must be in the future',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xbb2a7b92': {
    // Presale__InvalidLoopCount
    prettyMessage: 'Invalid loop count',
    suggestion: 'The number of loops is out of the allowed range.',
    category: 'presale',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xfab2a8f9': {
    // Presale__InvalidPosition
    prettyMessage: 'Position not found',
    suggestion: 'This position does not exist',
    category: 'presale',
    severity: 'error',
    recoveryActions: [ACTIONS.refresh],
  },

  '0xbd5fc4da': {
    // Presale__InvalidTranche
    prettyMessage: 'Invalid tranche',
    suggestion: 'This tranche does not exist for the position',
    category: 'presale',
    severity: 'error',
    recoveryActions: [ACTIONS.refresh],
  },

  '0x55600ec7': {
    // Presale__InvalidTransition
    prettyMessage: 'Invalid state transition',
    suggestion: 'This presale state change is not allowed.',
    category: 'presale',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x189bb1f2': {
    // Presale__NotEnded
    prettyMessage: 'Presale has not ended yet',
    suggestion: 'Wait for the presale period to end before claiming',
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.wait],
  },

  '0x8c66b6e0': {
    // Presale__NotOpen
    prettyMessage: 'Presale is not open',
    suggestion: "The presale hasn't started accepting deposits yet",
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.wait],
  },

  '0x654a5dde': {
    // Presale__NotStarted
    prettyMessage: 'Presale has not started',
    suggestion: 'Check back when the presale begins',
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.wait],
  },

  '0x63a69154': {
    // Presale__NotWhitelisted
    prettyMessage: 'Not on whitelist',
    suggestion: 'Contact the project team for whitelist access',
    category: 'presale',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x24bf5106': {
    // Presale__PerAddressCapExceeded
    prettyMessage: 'Personal cap reached',
    suggestion: "You've reached your maximum allocation",
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
    dynamicMessage: (args) =>
      `Attempted to mint ${args.attemptedMint_} but your cap is ${args.cap_} (current: ${args.currentIssuance_})`,
  },

  '0x65d6e237': {
    // Presale__SlippageExceeded
    prettyMessage: 'Price moved too much',
    suggestion: 'The price changed during your transaction. Try increasing slippage.',
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.adjustSlippage, ACTIONS.retry],
    dynamicMessage: (args) =>
      `Received ${args.received_}, minimum required was ${args.minRequired_}`,
  },

  '0x62df6dff': {
    // Presale__TrancheNotClaimable
    prettyMessage: 'Tranche not claimable yet',
    suggestion: 'This tranche is still locked',
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.wait],
  },

  '0x20a49fd4': {
    // Presale__Unsorted
    prettyMessage: 'Input data not sorted',
    suggestion: 'The input data must be in sorted order.',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  // ==========================================================================
  // MERKLE WHITELIST ERRORS
  // ==========================================================================

  '0xd48f547a': {
    // Module__MerkleWhitelistBase__AlreadyWhitelisted
    prettyMessage: 'Already whitelisted',
    suggestion: 'This address is already on the whitelist.',
    category: 'presale',
    severity: 'info',
    recoveryActions: [],
  },

  '0x2c3dd9fb': {
    // Module__MerkleWhitelistBase__MerkleRootNotSettable
    prettyMessage: 'Whitelist not configurable',
    suggestion: 'The whitelist configuration is locked and cannot be changed.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xbd034118': {
    // Module__MerkleWhitelistBase__NotWhitelisted
    prettyMessage: 'Not on whitelist',
    suggestion: 'Your address is not on the whitelist. Contact the project team.',
    category: 'presale',
    severity: 'warning',
    recoveryActions: [ACTIONS.checkWhitelist, ACTIONS.contactSupport],
  },

  // ==========================================================================
  // DECAYING FEE MULTIPLIER ERRORS
  // ==========================================================================

  '0x7f16213e': {
    // Module__DecayingFeeMultiplierBase__AlreadyStarted
    prettyMessage: 'Fee decay already started',
    suggestion: 'The fee decay period has already begun and cannot be restarted.',
    category: 'system',
    severity: 'warning',
    recoveryActions: [ACTIONS.refresh],
  },

  '0x35a92e14': {
    // Module__DecayingFeeMultiplierBase__InvalidDecayDuration
    prettyMessage: 'Invalid decay duration',
    suggestion: 'The decay duration is out of the allowed range.',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x54f744ae': {
    // Module__DecayingFeeMultiplierBase__InvalidInitialMultiplier
    prettyMessage: 'Invalid initial multiplier',
    suggestion: 'The initial fee multiplier is out of the allowed range.',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x9adec4d0': {
    // Module__DecayingFeeMultiplierBase__NotStarted
    prettyMessage: 'Fee decay not started',
    suggestion: 'The fee decay period has not begun yet.',
    category: 'system',
    severity: 'warning',
    recoveryActions: [ACTIONS.wait],
  },

  // ==========================================================================
  // ERC20 TOKEN ERRORS
  // ==========================================================================

  '0x9e79f854': {
    // ERC20ExceededCap
    prettyMessage: 'Token cap exceeded',
    suggestion: 'Cannot mint more tokens than the maximum supply',
    category: 'token',
    severity: 'error',
    recoveryActions: [ACTIONS.decreaseAmount],
  },

  '0xfb8f41b2': {
    // ERC20InsufficientAllowance
    prettyMessage: 'Approval needed',
    suggestion: 'Approve the contract to spend your tokens first',
    category: 'token',
    severity: 'warning',
    recoveryActions: [ACTIONS.approveToken],
    dynamicMessage: (args) => `Need approval for ${args.needed}. Current: ${args.allowance}`,
  },

  '0xe450d38c': {
    // ERC20InsufficientBalance
    prettyMessage: 'Insufficient balance',
    suggestion: 'You need more tokens to complete this transaction',
    category: 'token',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
    dynamicMessage: (args) => `Balance: ${args.balance}, Needed: ${args.needed}`,
  },

  '0xe602df05': {
    // ERC20InvalidApprover
    prettyMessage: 'Invalid approver',
    suggestion: 'Approval address is invalid',
    category: 'token',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x392e1e27': {
    // ERC20InvalidCap
    prettyMessage: 'Invalid token cap',
    suggestion: 'Token cap configuration is invalid',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xec442f05': {
    // ERC20InvalidReceiver
    prettyMessage: 'Invalid receiver',
    suggestion: 'Cannot send tokens to this address',
    category: 'token',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x96c6fd1e': {
    // ERC20InvalidSender
    prettyMessage: 'Invalid sender',
    suggestion: 'Cannot send from this address',
    category: 'token',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x94280d62': {
    // ERC20InvalidSpender
    prettyMessage: 'Invalid spender',
    suggestion: 'Cannot approve this address',
    category: 'token',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x8333c4a6': {
    // IERC20Issuance__CallerIsNotMinter
    prettyMessage: 'Not authorized to mint',
    suggestion: 'Only the minter can mint new tokens',
    category: 'permission',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  // ==========================================================================
  // ERC4626 VAULT ERRORS
  // ==========================================================================

  '0x79012fb2': {
    // ERC4626ExceededMaxDeposit
    prettyMessage: 'Deposit exceeds maximum',
    suggestion: 'Reduce your deposit amount to stay within the vault limit.',
    category: 'token',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
  },

  '0x284ff667': {
    // ERC4626ExceededMaxMint
    prettyMessage: 'Mint exceeds maximum',
    suggestion: 'Reduce the shares amount to stay within the vault limit.',
    category: 'token',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
  },

  '0xb94abeec': {
    // ERC4626ExceededMaxRedeem
    prettyMessage: 'Redeem exceeds maximum',
    suggestion: 'Reduce the shares amount to stay within the redeemable limit.',
    category: 'token',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
  },

  '0xfe9cceec': {
    // ERC4626ExceededMaxWithdraw
    prettyMessage: 'Withdrawal exceeds maximum',
    suggestion: 'Reduce the withdrawal amount to stay within the limit.',
    category: 'token',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
  },

  // ==========================================================================
  // TREASURY ERRORS
  // ==========================================================================

  '0x5bdd6941': {
    // Module__SplitterTreasury__EmptyRecipients
    prettyMessage: 'No recipients configured',
    suggestion: 'At least one recipient must be specified.',
    category: 'treasury',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x00f94c58': {
    // Module__SplitterTreasury__FloorFeeTreasuryIsZeroAddress
    prettyMessage: 'Invalid treasury address',
    suggestion: 'Fee treasury address cannot be zero',
    category: 'treasury',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x14ecb929': {
    // Module__SplitterTreasury__InvalidArrayLength
    prettyMessage: 'Invalid configuration',
    suggestion: 'Recipient and share arrays must match',
    category: 'treasury',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xe1ddeaf8': {
    // Module__SplitterTreasury__InvalidFeePercentage
    prettyMessage: 'Invalid fee percentage',
    suggestion: 'Total shares must equal 100%',
    category: 'treasury',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x7ba48bfd': {
    // Module__SplitterTreasury__RecipientAlreadyExists
    prettyMessage: 'Recipient already exists',
    suggestion: 'This address is already a recipient',
    category: 'treasury',
    severity: 'warning',
    recoveryActions: [ACTIONS.retry],
  },

  '0x2c893c25': {
    // Module__SplitterTreasury__RecipientIsZeroAddress
    prettyMessage: 'Invalid recipient',
    suggestion: 'Recipient address cannot be zero',
    category: 'treasury',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xf4b9de6c': {
    // Module__SplitterTreasury__SharesAreZero
    prettyMessage: 'Invalid share amount',
    suggestion: 'Share amount must be greater than zero',
    category: 'treasury',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  // ==========================================================================
  // STAKING MANAGER ERRORS
  // ==========================================================================

  '0x37fa37f8': {
    // Module__StakingManager__IncompleteWithdrawal
    prettyMessage: 'Withdrawal incomplete',
    suggestion: 'The withdrawal could not be fully completed. Try again.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.retry, ACTIONS.contactSupport],
  },

  '0x64b7c9de': {
    // Module__StakingManager__InsufficientPosition
    prettyMessage: 'Insufficient position',
    suggestion: 'Your staked position is not large enough for this operation.',
    category: 'system',
    severity: 'warning',
    recoveryActions: [ACTIONS.decreaseAmount],
  },

  '0xfff8effb': {
    // Module__StakingManager__InvalidFeePercentage
    prettyMessage: 'Invalid fee percentage',
    suggestion: 'Fee percentage is out of the allowed range.',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x63706032': {
    // Module__StakingManager__InvalidStrategyInterface
    prettyMessage: 'Invalid strategy interface',
    suggestion: 'The strategy contract does not implement the required interface.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x284cab5c': {
    // Module__StakingManager__NoPosition
    prettyMessage: 'No position found',
    suggestion: 'You do not have a staked position.',
    category: 'system',
    severity: 'warning',
    recoveryActions: [ACTIONS.refresh],
  },

  '0x080b0033': {
    // Module__StakingManager__NothingToRebalance
    prettyMessage: 'Nothing to rebalance',
    suggestion: 'The position is already optimally balanced.',
    category: 'system',
    severity: 'info',
    recoveryActions: [],
  },

  '0x2f89c79d': {
    // Module__StakingManager__NoYieldToHarvest
    prettyMessage: 'No yield to harvest',
    suggestion: 'There is no yield available to harvest at this time.',
    category: 'system',
    severity: 'info',
    recoveryActions: [ACTIONS.wait],
  },

  '0xd40edeb7': {
    // Module__StakingManager__StrategyAlreadyApproved
    prettyMessage: 'Strategy already approved',
    suggestion: 'This strategy is already in the approved list.',
    category: 'system',
    severity: 'warning',
    recoveryActions: [ACTIONS.refresh],
  },

  '0x2e022d12': {
    // Module__StakingManager__StrategyAssetMismatch
    prettyMessage: 'Strategy asset mismatch',
    suggestion: 'The strategy asset does not match the expected asset.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x79ab1802': {
    // Module__StakingManager__StrategyHasValue
    prettyMessage: 'Cannot remove strategy with value',
    suggestion: 'Withdraw all funds from the strategy before removing it.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x212c3718': {
    // Module__StakingManager__StrategyNotApproved
    prettyMessage: 'Strategy not approved',
    suggestion: 'This strategy has not been approved for use.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x9a8b7fa3': {
    // Module__StakingManager__StrategySharesTransferable
    prettyMessage: 'Strategy shares are transferable',
    suggestion: 'This strategy does not support non-transferable shares.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  // ==========================================================================
  // STRATEGY ERRORS
  // ==========================================================================

  '0xa8a77814': {
    // Module__StrategyBase__NotImplemented
    prettyMessage: 'Not implemented',
    suggestion: 'This function is not available for this strategy.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x11edc645': {
    // Module__StrategyBase__TransfersDisabled
    prettyMessage: 'Transfers disabled',
    suggestion: 'Token transfers are disabled for this strategy.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x6293d2d5': {
    // Module__TestnetStrategy__InsufficientReserve
    prettyMessage: 'Insufficient reserve',
    suggestion: 'The strategy does not have enough reserves for this operation.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.decreaseAmount],
  },

  // ==========================================================================
  // VIRTUAL SUPPLY ERRORS
  // ==========================================================================

  '0xae34fee4': {
    // Module__VirtualCollateralSupplyBase__AddResultsInOverflow
    prettyMessage: 'Supply overflow',
    suggestion: 'Operation would exceed maximum supply',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.decreaseAmount],
  },

  '0xba7b44d6': {
    // Module__VirtualCollateralSupplyBase__SubtractResultsInUnderflow
    prettyMessage: 'Supply underflow',
    suggestion: 'Cannot subtract more than available supply',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.decreaseAmount],
  },

  '0x5f60529f': {
    // Module__VirtualCollateralSupplyBase__VirtualSupplyCannotBeZero
    prettyMessage: 'Invalid supply',
    suggestion: 'Virtual supply cannot be zero',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  // ==========================================================================
  // MODULE VALIDATION ERRORS
  // ==========================================================================

  '0x51cfef5f': {
    // Module__InvalidAddress
    prettyMessage: 'Invalid address',
    suggestion: 'Address cannot be zero',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xde504dfe': {
    // Module__InvalidAmount
    prettyMessage: 'Invalid amount',
    suggestion: 'Amount must be greater than zero',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.increaseAmount],
  },

  '0xea7ec715': {
    // Module__InvalidArrayLength
    prettyMessage: 'Invalid input',
    suggestion: 'Input arrays have invalid lengths',
    category: 'validation',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  // ==========================================================================
  // FACTORY ERRORS
  // ==========================================================================

  '0xa4e0eec9': {
    // FloorFactory__InvalidAddress
    prettyMessage: 'Invalid factory address',
    suggestion: 'Factory configuration is invalid',
    category: 'factory',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x2e23a773': {
    // FloorFactory__InvalidId
    prettyMessage: 'Invalid floor ID',
    suggestion: 'The specified floor ID does not exist',
    category: 'factory',
    severity: 'error',
    recoveryActions: [ACTIONS.refresh],
  },

  '0xb8ac5f88': {
    // ModuleFactory__InvalidInitialRegistrationData
    prettyMessage: 'Invalid registration data',
    suggestion: 'Module registration data is invalid',
    category: 'factory',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xf9596d32': {
    // ModuleFactory__InvalidInverterBeacon
    prettyMessage: 'Invalid beacon',
    suggestion: 'Module beacon address is invalid',
    category: 'factory',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xadc1baa1': {
    // ModuleFactory__InvalidMetadata
    prettyMessage: 'Invalid module metadata',
    suggestion: 'Module configuration is invalid',
    category: 'factory',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x9bc9dc56': {
    // ModuleFactory__MetadataAlreadyRegistered
    prettyMessage: 'Module already registered',
    suggestion: 'This module metadata is already registered',
    category: 'factory',
    severity: 'warning',
    recoveryActions: [ACTIONS.retry],
  },

  '0x79b3d744': {
    // ModuleFactory__ModuleIsSunset
    prettyMessage: 'Module deprecated',
    suggestion: 'This module version is no longer supported',
    category: 'factory',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xbc885f3d': {
    // ModuleFactory__UnregisteredMetadata
    prettyMessage: 'Module not registered',
    suggestion: 'This module is not registered in the factory',
    category: 'factory',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  // ==========================================================================
  // BEACON ERRORS
  // ==========================================================================

  '0xa972f3d2': {
    // InverterBeacon__InvalidImplementation
    prettyMessage: 'Invalid implementation',
    suggestion: 'Beacon implementation is invalid',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x7c519051': {
    // InverterBeacon__InvalidImplementationMinorOrPatchVersion
    prettyMessage: 'Invalid version',
    suggestion: 'Implementation version is incompatible',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xbe27c5b7': {
    // InverterReverter__ContractPaused
    prettyMessage: 'Contract paused',
    suggestion: 'The protocol is currently paused for maintenance',
    category: 'system',
    severity: 'warning',
    recoveryActions: [ACTIONS.wait, ACTIONS.contactSupport],
  },

  // ==========================================================================
  // SYSTEM/INITIALIZATION ERRORS
  // ==========================================================================

  '0xf92ee8a9': {
    // InvalidInitialization
    prettyMessage: 'Initialization error',
    suggestion: 'Contract initialization failed',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xd7e6bcf8': {
    // NotInitializing
    prettyMessage: 'Not initializing',
    suggestion: 'Contract is not in initialization phase',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x3ee5aeb5': {
    // ReentrancyGuardReentrantCall
    prettyMessage: 'Transaction blocked',
    suggestion: 'This operation cannot be called recursively. Try again.',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  // ==========================================================================
  // OWNABLE ERRORS
  // ==========================================================================

  '0x1e4fbdf7': {
    // OwnableInvalidOwner
    prettyMessage: 'Invalid owner',
    suggestion: 'Owner address is invalid',
    category: 'permission',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0x118cdaa7': {
    // OwnableUnauthorizedAccount
    prettyMessage: 'Not the owner',
    suggestion: 'Only the contract owner can perform this action',
    category: 'permission',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  // ==========================================================================
  // FORWARDER/META-TX ERRORS
  // ==========================================================================

  '0x0f2a11ba': {
    // CallFailed
    prettyMessage: 'Call failed',
    suggestion: 'The forwarded call failed to execute',
    category: 'network',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x94eef58a': {
    // ERC2771ForwarderExpiredRequest
    prettyMessage: 'Request expired',
    suggestion: 'The transaction request has expired. Please try again.',
    category: 'network',
    severity: 'warning',
    recoveryActions: [ACTIONS.retry],
  },

  '0xc845a056': {
    // ERC2771ForwarderInvalidSigner
    prettyMessage: 'Invalid signature',
    suggestion: 'Transaction signature is invalid',
    category: 'wallet',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0x70647f79': {
    // ERC2771ForwarderMismatchedValue
    prettyMessage: 'Value mismatch',
    suggestion: 'Transaction value does not match request',
    category: 'network',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xd2650cd1': {
    // ERC2771UntrustfulTarget
    prettyMessage: 'Untrusted target',
    suggestion: 'The target contract does not trust this forwarder',
    category: 'network',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xd6bda275': {
    // FailedCall
    prettyMessage: 'Call failed',
    suggestion: 'The transaction failed to execute',
    category: 'network',
    severity: 'error',
    recoveryActions: [ACTIONS.retry],
  },

  '0xcf479181': {
    // InsufficientBalance
    prettyMessage: 'Insufficient balance',
    suggestion: 'Not enough funds for this operation',
    category: 'token',
    severity: 'warning',
    recoveryActions: [ACTIONS.addGas, ACTIONS.decreaseAmount],
  },

  '0x752d88c0': {
    // InvalidAccountNonce
    prettyMessage: 'Invalid nonce',
    suggestion: 'Transaction nonce is incorrect. Try refreshing.',
    category: 'network',
    severity: 'error',
    recoveryActions: [ACTIONS.refresh, ACTIONS.retry],
  },

  // ==========================================================================
  // CREATE2/DEPLOYMENT ERRORS
  // ==========================================================================

  '0x4ca249dc': {
    // Create2EmptyBytecode
    prettyMessage: 'Deployment failed',
    suggestion: 'Contract bytecode is empty',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xc86af699': {
    // DeterministicFactory__NotAllowed
    prettyMessage: 'Not allowed',
    suggestion: 'This deployment is not permitted',
    category: 'permission',
    severity: 'error',
    recoveryActions: [ACTIONS.contactSupport],
  },

  '0xb06ebf3d': {
    // FailedDeployment
    prettyMessage: 'Deployment failed',
    suggestion: 'Contract deployment failed',
    category: 'system',
    severity: 'error',
    recoveryActions: [ACTIONS.retry, ACTIONS.contactSupport],
  },

  // ==========================================================================
  // SAFE ERC20 ERRORS
  // ==========================================================================

  '0x5274afe7': {
    // SafeERC20FailedOperation
    prettyMessage: 'Token transfer failed',
    suggestion: 'The token transfer operation failed. Check your balance and approval.',
    category: 'token',
    severity: 'error',
    recoveryActions: [ACTIONS.approveToken, ACTIONS.retry],
  },
} as const satisfies Record<KnownErrorSignature, ErrorUXMapping>

// ============================================================================
// Utilities
// ============================================================================

/**
 * Get UX mapping for an error signature.
 */
export function getErrorUXMapping(signature: KnownErrorSignature): ErrorUXMapping {
  return ERROR_UX_MAPPINGS[signature]
}

/**
 * Check if a signature has a UX mapping.
 */
export function hasUXMapping(signature: string): signature is KnownErrorSignature {
  return signature in ERROR_UX_MAPPINGS
}
