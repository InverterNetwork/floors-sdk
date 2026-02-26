# SDK Parameter Gap Implementation Plan

## Executive Summary

The automated gap detection system identified **38 issues** across the SDK that need to be addressed. This plan outlines a systematic approach to resolve all issues, prioritizing critical security concerns first.

## Immediate Action Items (Week 1)

### Day 1: Critical Fix

**TASK: Fix buyAndBorrow hardcoded slippage (market.ts:570)**

- [ ] Update TMarketBuyAndBorrowParams interface to include minAmountOut parameter
- [ ] Modify buyAndBorrow function to accept and use the parameter
- [ ] Add validation for the minAmountOut parameter
- [ ] Test the fix with parameter gap detection
- [ ] Verify contract interaction still works properly

**Expected Result:** Critical issue resolved, 37 remaining issues

### Day 2: High Priority Security Fixes

**TASK: Implement admin function validation pattern**

- [ ] Create validation utility functions (validateAddress, validateBigint)
- [ ] Fix setMaxLoops security issue (credit-facility-admin.ts:308)
- [ ] Apply address validation to all 76 address-parameter functions
- [ ] Test with parameter gap detection

**Expected Result:** High severity issues reduced, ~30 remaining issues

### Day 3-4: Medium Priority Improvements

**TASK: Resolve user-configurable parameter issues**

- [ ] Review and fix all USER*CONFIGURABLE*\* issues
- [ ] Apply validation to fee-setting functions
- [ ] Add loop count validation for leverage functions
- [ ] Test all changes

**Expected Result:** Medium severity issues addressed, ~15 remaining issues

### Day 5-7: Optimization & Cleanup

**TASK: File modularization and low-priority fixes**

- [ ] Begin splitting large files (presale.ts, market-admin.ts)
- [ ] Address remaining low-priority issues
- [ ] Add comprehensive documentation
- [ ] Final validation testing

**Expected Result:** <10 remaining issues (all low priority)

## Technical Implementation Details

### Critical Fix: buyAndBorrow

```typescript
// BEFORE (PROBLEMATIC):
async buyAndBorrow(params: TMarketBuyAndBorrowParams): Promise<void> {
  const { amount, loops, consolidate } = params
  await this.writeContract({
    abi: ICreditFacility_v1,
    address: this.address,
    functionName: 'buyAndBorrow',
    args: [amount, loops, consolidate, BigInt(0)],  // HARD-CODED!
  })
}

// AFTER (FIXED):
export interface TMarketBuyAndBorrowParams {
  amount: bigint
  loops: bigint
  consolidate: boolean
  minAmountOut?: bigint  // NEW CONFIGURABLE PARAMETER
}

async buyAndBorrow(params: TMarketBuyAndBorrowParams): Promise<void> {
  const { amount, loops, consolidate, minAmountOut = BigInt(0) } = params

  // VALIDATION
  if (minAmountOut < BigInt(0)) {
    throw new Error('minAmountOut cannot be negative')
  }

  await this.writeContract({
    abi: ICreditFacility_v1,
    address: this.address,
    functionName: 'buyAndBorrow',
    args: [amount, loops, consolidate, minAmountOut],  // PASSED THROUGH
  })
}
```

### Validation Utility Pattern

```typescript
// utils/validation.ts
export function validateAddress(address: string, paramName: string): void {
  if (!address || address === '0x0000000000000000000000000000000000000000') {
    throw new Error(`${paramName} cannot be zero address`)
  }
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

## Success Criteria

### Phase 1 Success (Days 1-2)

- [ ] Critical issues: 1 → 0 (fix buyAndBorrow minAmountOut gap)
- [ ] High severity issues: 8 → 0-1 (after correcting false positives)
- [ ] Total issues: 38 → 15-20 (after removing BigInt() false positives)
- [ ] All basic parameter gap tests pass

### Phase 2 Success (Days 3-4)

- [ ] Medium severity issues: 23 → 2-5 (after correcting false positives)
- [ ] Total issues: 15-20 → 8-12
- [ ] Most validation gaps closed

### Phase 3 Success (Days 5-7)

- [ ] Total issues: 8-12 → <5 (all low priority)
- [ ] All parameter gap detection tests pass
- [ ] Full SDK test suite passes
- [ ] No regressions introduced

## Risk Mitigation

### Testing Strategy

- Test each fix individually before moving to next
- Run parameter gap detection after each major change
- Verify contract interactions work as expected
- Run full test suite before and after each phase

### Rollback Plan

- Make granular commits for each fix
- Tag working versions before major changes
- Keep original files backed up during refactoring

### Quality Assurance

- Pair review for critical security fixes
- Manual verification of contract interactions
- Gradual rollout/testing approach

## Resources Required

- Development time: 1 week (full-time)
- Testing environment: functional SDK test suite
- Access to contract interfaces for verification
- Git repository with ability to create branches/commits

## Next Steps

1. Start with critical buyAndBorrow fix immediately
2. Implement validation utilities
3. Address high-priority security issues
4. Progress through medium and low priority items
5. Conduct final validation and testing

## Expected Outcomes

Upon completion of this plan:

- **Enhanced Security:** All critical and high-risk validation gaps closed
- **Improved Flexibility:** User-configurable parameters are properly exposed
- **Better Maintainability:** Large files modularized and organized
- **Reduced Technical Debt:** All automated gap detection issues resolved
- **Higher Quality:** Comprehensive validation and error handling implemented
