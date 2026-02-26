# Technical Implementation Guide for SDK Parameter Gaps

## Executive Summary

This document provides detailed technical specifications for fixing all 38 parameter gaps detected by the automated system. The primary focus is on the critical issue in `buyAndBorrow` and the 8 high-severity validation gaps.

## Critical Fix: buyAndBorrow Parameter Gap

### Current Problem (market.ts:570)

```typescript
// PROBLEMATIC CODE: minAmountOut_ is hardcoded to BigInt(0)
args: [amount, loops, consolidate, BigInt(0)],  // minAmountOut_ hardcoded!
```

### Root Cause

- Contract expects 4 parameters: `(amount, loops, consolidate, minAmountOut_)`
- SDK only passes 3 parameters, with minAmountOut hardcoded to zero
- This eliminates slippage protection for users

### Solution

1. Update the interface to accept the missing parameter
2. Add proper validation
3. Pass through to contract call

## Regarding BigInt() Wrapper Usage (False Positive Clarification)

### User Feedback Addressed

The user noted that `BigInt()` callers in methods should not be classified as hardcoded FALSE POSITIVE.

### Clarification

This is CORRECT. When examining market-admin.ts, the usage of `BigInt(feeBps)` where `feeBps` is a function parameter is NOT a hardcoded value. This is proper conversion of a JavaScript number to a bigint for contract calls. The BigInt() wrapper around a parameter is appropriate and should not be flagged as a hardcoded literal.

For example:

```typescript
// This is CORRECT - feeBps is a parameter, not a hardcoded value
args: [BigInt(feeBps)],  // Proper parameter usage
```

Only actual hardcoded values like `BigInt(0)`, `BigInt(100)`, etc., should be flagged as hardcoded literals.

### Implementation Steps

#### Step 1: Update Interface

```typescript
// File: src/types/market.ts (or wherever TMarketBuyAndBorrowParams is defined)
export interface TMarketBuyAndBorrowParams {
  amount: bigint
  loops: bigint
  consolidate: boolean
  minAmountOut?: bigint // NEW: Make configurable with default
}
```

#### Step 2: Update Function Implementation

```typescript
// File: src/market.ts (around line 570)
async buyAndBorrow(params: TMarketBuyAndBorrowParams): Promise<void> {
  const { amount, loops, consolidate, minAmountOut = BigInt(0) } = params

  // ADD VALIDATION
  if (minAmountOut < BigInt(0)) {
    throw new Error('minAmountOut cannot be negative')
  }

  await this.writeContract({
    abi: ICreditFacility_v1,
    address: this.address,
    functionName: 'buyAndBorrow',
    args: [amount, loops, consolidate, minAmountOut],  // PASS THE PARAMETER
  })
}
```

## High Priority: Admin Function Validation

### Pattern to Implement

For all 71 admin functions, implement validation pattern:

```typescript
// Template for all admin functions
async setSomeParam(params: TSetSomeParamParams): Promise<void> {
  const { someValue } = params

  // Basic validation
  if (someValue === undefined || someValue === null) {
    throw new Error('Parameter cannot be null/undefined')
  }

  // Type-specific validation
  if (typeof someValue === 'bigint') {
    if (someValue < BigInt(0)) {
      throw new Error('Value cannot be negative')
    }
    if (someValue > MAX_REASONABLE_VALUE) {
      throw new Error('Value exceeds reasonable limits')
    }
  }

  if (typeof someValue === 'string') {
    if (!isAddress(someValue)) {
      throw new Error('Invalid address format')
    }
    if (someValue === '0x0000000000000000000000000000000000000000') {
      throw new Error('Cannot use zero address')
    }
  }

  await this.writeContract({
    abi: SomeContract_v1,
    address: this.address,
    functionName: 'setSomeParam',
    args: [someValue],
  })
}
```

## High Priority: Address Validation

### Create Validation Utility

```typescript
// File: src/utils/validation.ts
export function validateAddress(address: string, paramName: string): void {
  if (!address || typeof address !== 'string') {
    throw new Error(`${paramName} must be a valid string address`)
  }

  if (address === '0x0000000000000000000000000000000000000000') {
    throw new Error(`${paramName} cannot be zero address`)
  }

  // Basic address format validation (could be enhanced with viem's isAddress)
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`${paramName} has invalid address format`)
  }
}

export function validateBigint(value: bigint, paramName: string, min?: bigint, max?: bigint): void {
  if (typeof value !== 'bigint') {
    throw new Error(`${paramName} must be a bigint`)
  }

  if (min !== undefined && value < min) {
    throw new Error(`${paramName} must be >= ${min.toString()}`)
  }

  if (max !== undefined && value > max) {
    throw new Error(`${paramName} must be <= ${max.toString()}`)
  }
}
```

### Apply to Affected Functions

#### buyFor Function

```typescript
// File: src/market.ts (or wherever buyFor is defined)
async buyFor(params: TBuyForParams): Promise<void> {
  const { receiver, amount, minAmountOut } = params

  validateAddress(receiver, 'receiver')
  validateBigint(amount, 'amount', BigInt(0))
  validateBigint(minAmountOut, 'minAmountOut', BigInt(0))

  await this.writeContract({
    abi: IFloor_v1,
    address: this.address,
    functionName: 'buyFor',
    args: [receiver, amount, minAmountOut],
  })
}
```

#### sellTo Function

```typescript
// File: src/market.ts (or wherever sellTo is defined)
async sellTo(params: TSellToParams): Promise<void> {
  const { receiver, amount, minAmountOut } = params

  validateAddress(receiver, 'receiver')
  validateBigint(amount, 'amount', BigInt(0))
  validateBigint(minAmountOut, 'minAmountOut', BigInt(0))

  await this.writeContract({
    abi: IFloor_v1,
    address: this.address,
    functionName: 'sellTo',
    args: [receiver, amount, minAmountOut],
  })
}
```

## High Priority: setMaxLoops Fix

### Current Problem

```typescript
// PROBLEMATIC: newMaxLoops_ is hardcoded
args: [BigInt(0)],  // or some other hardcoded value
```

### Solution

```typescript
// File: src/types/credit-facility-admin.ts
export interface TSetMaxLoopsParams {
  newMaxLoops: bigint
}

// File: src/credit-facility-admin.ts
async setMaxLoops(params: TSetMaxLoopsParams): Promise<void> {
  const { newMaxLoops } = params

  // Security validation
  validateBigint(newMaxLoops, 'newMaxLoops', BigInt(1), BigInt(100))
  if (newMaxLoops > BigInt(10)) {
    console.warn('Setting max loops above 10 - this increases leverage risk')
  }

  await this.writeContract({
    abi: ICreditFacility_v1,
    address: this.address,
    functionName: 'setMaxLoops',
    args: [newMaxLoops],
  })
}
```

## Medium Priority: User-Configurable Parameters

### Functions to Review and Fix:

#### setBuyFee

```typescript
// Current: fee_ hardcoded to BigInt(feeBps)
// Fix: Make fee configurable
export interface TSetBuyFeeParams {
  feeBps: bigint  // Instead of using hardcoded value from outer scope
}

async setBuyFee(params: TSetBuyFeeParams): Promise<void> {
  const { feeBps } = params

  validateBigint(feeBps, 'feeBps', BigInt(0), BigInt(1000)) // Max 10% fee

  await this.writeContract({
    abi: IFloor_v1,
    address: this.address,
    functionName: 'setBuyFee',
    args: [feeBps],  // Pass the parameter instead of hardcoded value
  })
}
```

#### setSellFee

```typescript
// Similar pattern as setBuyFee
export interface TSetSellFeeParams {
  feeBps: bigint
}

async setSellFee(params: TSetSellFeeParams): Promise<void> {
  const { feeBps } = params

  validateBigint(feeBps, 'feeBps', BigInt(0), BigInt(1000)) // Max 10% fee

  await this.writeContract({
    abi: IFloor_v1,
    address: this.address,
    functionName: 'setSellFee',
    args: [feeBps],
  })
}
```

## Constants to Define

### Create constants file

```typescript
// File: src/constants.ts
export const BASIS_POINTS = {
  ONE_PERCENT: BigInt(100),
  FIVE_PERCENT: BigInt(500),
  TEN_PERCENT: BigInt(1000),
  MAX: BigInt(10000), // 100%
} as const

export const PROTOCOL_LIMITS = {
  MAX_LOOPS: BigInt(10),
  MAX_LEVERAGE_INDEX: BigInt(5),
  DEFAULT_SLIPPAGE_BPS: BigInt(100), // 1.0% - safer default
  MAX_SLIPPAGE_BPS: BigInt(500), // 5.0% - maximum allowed
  MAX_FEE_BPS: BigInt(1000), // 10% - maximum fee
} as const
```

## File Structure Improvements

### For presale.ts (64 contract calls - needs modularization)

```
src/
  presale/
    ├── index.ts (exports all)
    ├── buy.ts (buyPresale, buyPresaleWithLoops, buyPresaleWithLeverage)
    ├── sell.ts (sellPresale, redeemPresale, claimPresale)
    └── admin.ts (setPresaleFee, configurePresale, pausePresale)
```

### For market-admin.ts (34 contract calls)

```
src/
  market-admin/
    ├── index.ts (exports all)
    ├── fees.ts (setBuyFee, setSellFee, setFeeRecipients)
    ├── permissions.ts (grantRole, revokeRole, renounceRole)
    └── parameters.ts (setMinDeposit, setMaxSupply, etc.)
```

## Testing Strategy

### After Each Fix:

1. Run specific gap detection: `bun test test/params/param-gaps.test.ts`
2. Run affected functionality tests
3. Verify contract interactions still work
4. Check for regressions

### Final Validation:

```bash
# All these should pass with 0 issues
bun test test/params/param-gaps.test.ts
bun test # Full test suite
```

## Rollback Plan

- Keep git commits granular per fix
- Test each fix individually before moving to next
- If any fix breaks functionality, revert that specific commit

## Success Criteria

- All 38 detected issues resolved
- 0 critical/high severity issues remaining
- All tests passing
- No regressions in existing functionality
