# SDK Parameter Gap Resolution Tasks

## Overview

This document outlines tasks to resolve all parameter gaps detected by the automated gap detection system. The detector found 38 total issues across multiple categories:

- **Critical:** 1 issue (hardcoded slippage in buyAndBorrow)
- **High:** 8 issues (security-sensitive parameters, validation gaps)
- **Medium:** 23 issues (address validation, user-configurable params, file complexity)
- **Low:** 6 issues (file complexity, fee consistency)

## Task Priority Order

### Phase 1: Critical & High Priority (Fix Immediately)

#### Task 1: Fix Critical Slippage Issue in buyAndBorrow

- **Issue:** `ZERO_VALUE_buyAndBorrow_pos3` - minAmountOut\_ hardcoded to BigInt(0)
- **Location:** `src/market.ts:570`
- **Impact:** Critical - users get no slippage protection
- **Steps:**
  1. Update `TMarketBuyAndBorrowParams` interface to include `minAmountOut?: bigint`
  2. Modify `buyAndBorrow` function to accept and use the parameter
  3. Set default value to `BigInt(0)` but allow override
  4. Add proper validation for the parameter

#### Task 2: Add Security Validation to Admin Functions

- **Issue:** `SUMMARY_ADMIN_VALIDATION` - 71 functions need input validation
- **Impact:** High - protocol security risk
- **Steps:**
  1. Create validation utility functions
  2. Add validation to all admin functions
  3. Implement range checks for numeric values
  4. Add address validation for address parameters

#### Task 3: Fix setMaxLoops Security Issue

- **Issue:** `SECURITY_SENSITIVE_setMaxLoops_pos0` - newMaxLoops\_ hardcoded
- **Location:** `src/credit-facility-admin.ts:308`
- **Impact:** High - affects protocol leverage limits
- **Steps:**
  1. Update interface to accept configurable max loops parameter
  2. Add validation (e.g., max 100 loops)
  3. Implement proper parameter passing

#### Task 4: Implement Address Validation

- **Issue:** `SUMMARY_ADDRESS_VALIDATION` - 76 calls need zero address validation
- **Impact:** High - prevents sending to zero address
- **Steps:**
  1. Create address validation utility function
  2. Apply to all functions with receiver/to/from parameters
  3. Validate against zero address (0x0000...)

### Phase 2: Medium Priority (Fix Within Sprint)

#### Task 5: Address Individual User-Configurable Parameters

- **Issues:** Multiple USER_CONFIGURABLE issues (setBuyFee, setSellFee, etc.)
- **Impact:** Medium - reduces flexibility
- **Steps:**
  1. Review each hardcoded parameter
  2. Determine if it should be user-configurable
  3. Update interfaces and functions accordingly
  4. Add appropriate defaults

#### Task 6: File Modularization

- **Issue:** `FILE_COMPLEX_presale.ts` and others (5 files >20 calls)
- **Impact:** Medium - maintainability
- **Steps:**
  1. Split presale.ts into buy.ts, sell.ts, admin.ts
  2. Split launch.ts by functionality
  3. Organize market-admin.ts by feature

#### Task 7: Add Loop Count Validation

- **Issue:** `SUMMARY_LOOP_COMPLEXITY` - 7 loop-related calls
- **Impact:** Medium - prevents excessive leverage
- **Steps:**
  1. Add max loop constants
  2. Validate loop counts in all functions
  3. Prevent potential exploits

#### Task 8: Address Validation for Specific Functions

- **Issues:** Individual ADDRESS_VALIDATION issues
- **Functions:** buyFor, sellTo, borrowFor, buyAndBorrowFor, harvestYield, withdrawFunds
- **Impact:** Medium - security improvement
- **Steps:**
  1. Add validation to each specific function
  2. Check for zero address before contract calls

### Phase 3: Low Priority & Enhancement

#### Task 9: Fee Parameter Consistency

- **Issue:** `SUMMARY_FEE_CONSISTENCY` - 10 fee-related calls
- **Impact:** Low - consistency improvement
- **Steps:**
  1. Standardize basis points constants
  2. Ensure consistent fee representation
  3. Add validation for fee ranges

#### Task 10: Protocol Risk Reviews

- **Issues:** SUMMARY_PRESALE_SECURITY, SUMMARY_CREDIT_RISK, SUMMARY_MARKET_SLIPPAGE
- **Impact:** Various - risk mitigation
- **Steps:**
  1. Review presale functions for security
  2. Assess credit facility borrowing risk
  3. Review market slippage calculations

## Individual Function Fixes

### Critical Fix: buyAndBorrow (market.ts:570)

```typescript
// Current (problematic):
args: [amount, loops, consolidate, BigInt(0)],  // minAmountOut_ hardcoded!

// Fixed:
export interface TMarketBuyAndBorrowParams {
  amount: bigint
  loops: bigint
  consolidate: boolean
  minAmountOut?: bigint  // Add this parameter
}

async buyAndBorrow(params: TMarketBuyAndBorrowParams): Promise<void> {
  const { amount, loops, consolidate, minAmountOut = BigInt(0) } = params

  await this.writeContract({
    abi: ICreditFacility_v1,
    address: this.address,
    functionName: 'buyAndBorrow',
    args: [amount, loops, consolidate, minAmountOut],  // Pass the parameter
  })
}
```

### High Priority: Admin Function Validation Template

```typescript
async setSomeParam(params: TSetSomeParamParams): Promise<void> {
  const { someValue } = params

  // Add validation for all admin functions
  if (someValue === undefined || someValue === null) {
    throw new Error('Parameter cannot be null/undefined')
  }

  // Type-specific validation
  if (typeof someValue === 'bigint' && someValue < BigInt(0)) {
    throw new Error('Value cannot be negative')
  }

  if (typeof someValue === 'string' && !isAddress(someValue)) {
    throw new Error('Invalid address format')
  }

  await this.writeContract({ ... })
}
```

### Medium Priority: Address Validation Helper

```typescript
function validateAddress(address: string, paramName: string): void {
  if (!address || address === '0x0000000000000000000000000000000000000000') {
    throw new Error(`${paramName} cannot be zero address`)
  }
  if (!isAddress(address)) {
    throw new Error(`Invalid ${paramName} address format`)
  }
}
```

## Validation Criteria

### Before Marking Tasks Complete:

1. Run `bun test test/params/param-gaps.test.ts` - all tests should pass
2. Verify no critical or high severity issues remain
3. Ensure no regressions in existing functionality
4. Confirm all fixes follow SDK patterns and conventions

### Success Metrics:

- Total issues reduced from 38 to 0-5 low-priority items
- No critical or high severity issues
- Improved parameter flexibility
- Enhanced security validation
- Better code organization

## Additional Considerations

### Constants Definition:

```typescript
export const BASIS_POINTS = {
  ONE_PERCENT: BigInt(100),
  FIVE_PERCENT: BigInt(500),
  TEN_PERCENT: BigInt(1000),
  MAX: BigInt(10000), // 100%
}

export const PROTOCOL_LIMITS = {
  MAX_LOOPS: BigInt(10),
  MAX_LEVERAGE_INDEX: BigInt(5),
  DEFAULT_SLIPPAGE_BPS: BigInt(100), // 1.0% - safer for volatile markets
  MAX_SLIPPAGE_BPS: BigInt(500), // 5.0% - absolute maximum
}
```

### Testing After Each Fix:

1. Run specific test for the fixed function
2. Run full parameter gap detection test
3. Run full SDK test suite to ensure no regressions
4. Verify contract interaction still works correctly

## Estimated Timeline

- **Phase 1:** 2-3 days (critical security issues)
- **Phase 2:** 3-5 days (medium priority improvements)
- **Phase 3:** 2-3 days (low priority enhancements)

Total estimated: 1 week to resolve all critical and high priority issues.
