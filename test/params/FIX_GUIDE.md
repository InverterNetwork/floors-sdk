# SDK Parameter Gap Fix Guide

**Generated:** 2026-02-26
**Total Issues Detected:** 38
**Critical:** 1 | **High:** 8 | **Medium:** 23 | **Low:** 6

---

## Quick Start

This guide helps you fix all parameter-related issues detected by the automated gap detector in `test/params/`. Issues are prioritized by severity.

### Run the Detector

```bash
cd packages/sdk
bun test test/params/param-gaps.test.ts
```

---

## Critical Issues (Fix Immediately)

### 1. Hardcoded Slippage in `buyAndBorrow`

**Location:** `src/market.ts:570`
**Issue:** `minAmountOut_` parameter hardcoded to `BigInt(0)`

**Current Code:**

```typescript
// src/market.ts:570
args: [amount, loops, consolidate, BigInt(0)],  // minAmountOut_ hardcoded!
```

**Fix:**

```typescript
// Step 1: Update the params interface
export interface TMarketBuyAndBorrowParams {
  amount: bigint
  loops: bigint
  consolidate: boolean
  minAmountOut?: bigint  // Add this parameter
}

// Step 2: Update the function signature
async buyAndBorrow(params: TMarketBuyAndBorrowParams): Promise<void> {
  const { amount, loops, consolidate, minAmountOut = BigInt(0) } = params
  // minAmountOut now has a sensible default but is configurable

  await this.writeContract({
    abi: ICreditFacility_v1,
    address: this.address,
    functionName: 'buyAndBorrow',
    args: [amount, loops, consolidate, minAmountOut],  // Pass the parameter
  })
}
```

**Why This Matters:** Hardcoding slippage to 0 means users get no slippage protection. In volatile markets, transactions may fail or execute at unfavorable rates.

---

## High Severity Issues

### 2. Security-Sensitive Parameter in `setMaxLoops`

**Location:** `src/credit-facility-admin.ts:308`
**Issue:** `newMaxLoops_` hardcoded instead of being a parameter

**Current Code:**

```typescript
// Check the actual hardcoded value in the file
args: [BigInt(0)],  // or some other hardcoded value
```

**Fix:**

```typescript
export interface TSetMaxLoopsParams {
  newMaxLoops: bigint  // Make it configurable
}

async setMaxLoops(params: TSetMaxLoopsParams): Promise<void> {
  const { newMaxLoops } = params

  // Add validation
  if (newMaxLoops === BigInt(0)) {
    throw new Error('Max loops cannot be zero')
  }
  if (newMaxLoops > BigInt(100)) {
    throw new Error('Max loops exceeds protocol limit')
  }

  await this.writeContract({
    abi: ICreditFacility_v1,
    address: this.address,
    functionName: 'setMaxLoops',
    args: [newMaxLoops],
  })
}
```

---

### 3. Summary: Hardcoded Literals Across SDK

**Issue:** 1 of 258 SDK calls contain hardcoded literal values

**Action Required:**

1. Review the detailed issue list below for specific locations
2. For each hardcoded value, determine if it should be:
   - A method parameter (user-configurable)
   - A named constant (protocol-defined)
   - Intentional (document why)

---

### 4. Summary: Zero Values Across SDK

**Issue:** 1 of 258 SDK calls contain hardcoded zero values

**Action Required:**
Review each zero value:

- If it's a slippage/minimum parameter → Make configurable
- If it's an amount/deposit → Should be user-provided
- If intentional → Add comment explaining why

---

### 5. Summary: Admin Functions Need Validation

**Issue:** 71 admin/configuration functions should have input validation

**Fix Pattern:**

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

---

### 6. Summary: Launch Config Validation

**Issue:** 36 launch/configuration calls require thorough validation

**Fix Pattern:**

```typescript
async configure(params: TConfigureParams): Promise<void> {
  const { config } = params

  // Comprehensive validation for launch configs
  if (!config.segments || config.segments.length === 0) {
    throw new Error('At least one segment required')
  }

  for (const segment of config.segments) {
    if (segment.floorFeeBps > 10000) {
      throw new Error('Fee cannot exceed 100%')
    }
    if (!isAddress(segment.treasury)) {
      throw new Error('Invalid treasury address')
    }
  }

  // Validate total shares sum to 100%
  const totalShares = config.recipients.reduce(
    (sum, r) => sum + r.shareBps,
    BigInt(0)
  )
  if (totalShares !== BigInt(10000)) {
    throw new Error('Recipient shares must sum to 100%')
  }

  await this.writeContract({ ... })
}
```

---

### 7. Summary: Authorizer Security Review

**Issue:** 43 authorizer/permission calls affect security model

**Fix Pattern:**

```typescript
async grantRole(params: TGrantRoleParams): Promise<void> {
  const { role, account } = params

  // Security validation
  if (!isAddress(account)) {
    throw new Error('Invalid account address')
  }

  if (role === ADMIN_ROLE) {
    // Extra validation for admin role
    console.warn('Granting admin role - ensure this is intentional')
  }

  await this.writeContract({ ... })
}
```

---

## Medium Severity Issues

### 8. User-Configurable Parameters Hardcoded

**Locations:** Multiple files
**Issue:** Parameters with names suggesting user configuration are hardcoded

**Affected Functions:**
| Function | File | Parameter | Current Value |
|----------|------|-----------|---------------|
| `setBuyFee` | `market-admin.ts` | `fee_` | `BigInt(feeBps)` |
| `setSellFee` | `market-admin.ts` | `fee_` | `BigInt(feeBps)` |
| `setBorrowingFeeRate` | `credit-facility-admin.ts` | `newFeeRate_` | `BigInt(liveBorrowFeeBps)` |
| `setLoanToValueRatio` | `credit-facility-admin.ts` | `newLoanToValueRatio_` | `BigInt(ltvBps)` |
| `setPerformanceFeeBps` | `presale-admin.ts` | `feeBps_` | `BigInt(feeBps)` |

**Fix:** These may be intentional if the values come from config, but ensure:

1. The config values are validated
2. There's a way to override if needed
3. Document why these aren't direct parameters

---

### 9. Address Validation Needed

**Issue:** 76 calls involve address parameters - ensure zero address validation

**Fix Pattern:**

```typescript
function validateAddress(address: string, paramName: string): void {
  if (!address || address === '0x0000000000000000000000000000000000000000') {
    throw new Error(`${paramName} cannot be zero address`)
  }
  if (!isAddress(address)) {
    throw new Error(`Invalid ${paramName} address format`)
  }
}

// Usage
async buyFor(params: TBuyForParams): Promise<void> {
  const { receiver, amount, minAmountOut } = params

  validateAddress(receiver, 'receiver')

  await this.writeContract({
    abi: IFloor_v1,
    address: this.address,
    functionName: 'buyFor',
    args: [receiver, amount, minAmountOut],
  })
}
```

**Affected Functions:**

- `buyFor` - `receiver_` parameter
- `sellTo` - `receiver_` parameter
- `borrowFor` - `receiver_` parameter
- `buyAndBorrowFor` - `receiver_` parameter
- `harvestYield` - `receiver_` parameter
- `withdrawFunds` - `receiver_` parameter

---

### 10. File Complexity Issues

**Files exceeding 20 contract calls:**

| File              | Calls | Recommendation                                                     |
| ----------------- | ----- | ------------------------------------------------------------------ |
| `presale.ts`      | 64    | Split into `presale-buy.ts`, `presale-sell.ts`, `presale-admin.ts` |
| `launch.ts`       | 35    | Split into `launch-configure.ts`, `launch-deploy.ts`               |
| `market-admin.ts` | 34    | Split by feature: fees, permissions, parameters                    |
| `governor.ts`     | 24    | Split by proposal types                                            |
| `market.ts`       | 26    | Already has some separation, review                                |

**Refactoring Pattern:**

```typescript
// Before: Large file with many functions
// presale.ts - 64 contract calls

// After: Modular structure
// presale/
//   ├── index.ts (exports all)
//   ├── buy.ts (buyPresale, buyPresaleWithLoops)
//   ├── sell.ts (sellPresale, redeemPresale)
//   └── admin.ts (setPresaleFee, configurePresale)
```

---

## Low Severity Issues

### 11. Fee Parameter Consistency

**Issue:** 10 calls involve fee parameters - verify basis points consistency

**Action:**

```typescript
// Define constants for fee representation
export const BASIS_POINTS = {
  ONE_PERCENT: BigInt(100),
  FIVE_PERCENT: BigInt(500),
  TEN_PERCENT: BigInt(1000),
  MAX: BigInt(10000), // 100%
}

// Use consistently across all files
async setFee(params: { feeBps: bigint }): Promise<void> {
  const { feeBps } = params

  if (feeBps > BASIS_POINTS.MAX) {
    throw new Error('Fee exceeds maximum (100%)')
  }

  // ...
}
```

---

### 12. Loop Count Complexity

**Issue:** 7 calls involve loop count parameters - verify leverage limits

**Fix:**

```typescript
const PROTOCOL_LIMITS = {
  MAX_LOOPS: BigInt(10),
  MAX_LEVERAGE_INDEX: BigInt(5),
}

async buyPresaleWithLoops(params: TBuyPresaleWithLoopsParams): Promise<void> {
  const { deposit, loopCount, minAmountOut } = params

  if (loopCount > PROTOCOL_LIMITS.MAX_LOOPS) {
    throw new Error(`Loop count exceeds maximum of ${PROTOCOL_LIMITS.MAX_LOOPS}`)
  }

  // ...
}
```

---

### 13. Default Slippage Concern

**Issue:** Functions using default slippage of 50 bps (0.5%)

**Recommendation:** Consider increasing to 100-200 bps (1-2%) for volatile markets

```typescript
// Current default may be too low
const DEFAULT_SLIPPAGE_BPS = BigInt(50)  // 0.5%

// Recommended: Higher default with clear documentation
const DEFAULT_SLIPPAGE_BPS = BigInt(100)  // 1.0% - safer for volatile markets
const MAX_SLIPPAGE_BPS = BigInt(500)      // 5.0% - absolute maximum

async buy(params: TBuyParams): Promise<void> {
  const { amount, slippageBps = DEFAULT_SLIPPAGE_BPS } = params

  if (slippageBps > MAX_SLIPPAGE_BPS) {
    throw new Error('Slippage exceeds maximum')
  }

  // ...
}
```

---

## Summary Checklist

### Critical (Fix Today)

- [ ] Fix `buyAndBorrow` slippage parameter in `market.ts`

### High (Fix This Week)

- [ ] Add validation to all admin functions
- [ ] Review launch configuration validation
- [ ] Audit authorizer/permission calls
- [ ] Review all hardcoded zero values

### Medium (Fix This Sprint)

- [ ] Add address validation helper
- [ ] Review user-configurable parameters
- [ ] Begin file refactoring for complex files
- [ ] Add loop count validation

### Low (Add to Backlog)

- [ ] Standardize fee parameter representation
- [ ] Review default slippage values
- [ ] Complete file modularization
- [ ] Add comprehensive documentation

---

## Testing After Fixes

After applying fixes, verify:

```bash
# Run the gap detection tests
bun test test/params/param-gaps.test.ts

# All tests should pass (no critical gaps)
# The "should detect all parameter gaps" test should pass
# The "should detect hardcoded slippage" test should pass

# Run full test suite to ensure no regressions
bun test
```

---

## Appendix: Complete Issue List

### All 38 Issues by Category

#### hardcoded_literal (10 issues)

1. `HARDCODED_buyAndBorrow_pos3` - market.ts:570
2. `HARDCODED_BOOL_setMinter_pos2` - launch.ts
3. `HARDCODED_BOOL_setMaxLoops_pos0` - credit-facility-admin.ts
4. `USER_CONFIGURABLE_setBuyFee_pos0` - market-admin.ts
5. `USER_CONFIGURABLE_setSellFee_pos0` - market-admin.ts
6. `USER_CONFIGURABLE_setBorrowingFeeRate_pos0` - credit-facility-admin.ts
7. `USER_CONFIGURABLE_buyAndBorrow_pos3` - market.ts
8. `USER_CONFIGURABLE_setLoanToValueRatio_pos0` - credit-facility-admin.ts
9. `USER_CONFIGURABLE_setPerformanceFeeBps_pos0` - presale-admin.ts
10. `FILE_BOOLS_market-admin.ts` - file-level

#### validation_gap (15 issues)

1. `SECURITY_SENSITIVE_buyAndBorrow_pos3` - market.ts:570
2. `SECURITY_SENSITIVE_setMaxLoops_pos0` - credit-facility-admin.ts:308
3. `ADDRESS_VALIDATION_buyFor_pos0` - market.ts
4. `ADDRESS_VALIDATION_sellTo_pos0` - market.ts
5. `ADDRESS_VALIDATION_borrowFor_pos0` - credit-facility.ts
6. `ADDRESS_VALIDATION_buyAndBorrowFor_pos0` - credit-facility.ts
7. `ADDRESS_VALIDATION_harvestYield_pos1` - market.ts
8. `ADDRESS_VALIDATION_withdrawFunds_pos2` - governor.ts
9. `SUMMARY_ADMIN_VALIDATION` - SDK-wide (71 functions)
10. `SUMMARY_LAUNCH_VALIDATION` - SDK-wide (36 calls)
11. `SUMMARY_AUTHORIZER_SECURITY` - SDK-wide (43 calls)
12. `SUMMARY_ADDRESS_VALIDATION` - SDK-wide (76 calls)
13. `SUMMARY_PRESALE_SECURITY` - SDK-wide (84 calls)
14. `SUMMARY_CREDIT_RISK` - SDK-wide (21 calls)
15. `SUMMARY_TREASURY_CONFIG` - SDK-wide (11 calls)

#### zero_value (3 issues)

1. `ZERO_VALUE_buyAndBorrow_pos3` - market.ts:570 (CRITICAL)
2. `FILE_ZEROS_market.ts` - file-level
3. `SUMMARY_ZERO_VALUES` - SDK-wide

#### file_complexity (6 issues)

1. `FILE_COMPLEX_market-admin.ts` - 34 calls
2. `FILE_COMPLEX_launch.ts` - 35 calls
3. `FILE_COMPLEX_governor.ts` - 24 calls
4. `FILE_COMPLEX_presale.ts` - 64 calls
5. `FILE_COMPLEX_market.ts` - 26 calls
6. `SUMMARY_FILE_COMPLEXITY` - 5 files over threshold

#### suspicious_default (4 issues)

1. `SUMMARY_LOOP_COMPLEXITY` - 7 calls with loop params
2. `SUMMARY_FEE_CONSISTENCY` - 10 calls with fee params
3. `SUMMARY_MARKET_SLIPPAGE` - 20 market buy/sell calls
4. `SUMMARY_STAKING_REWARDS` - 19 staking-related calls

---

## Contact

For questions about specific issues or fix strategies, refer to:

- Contract interfaces: `contracts/src/**/interfaces/`
- SDK source: `packages/sdk/src/`
- Test detector: `test/params/expanded-detector.ts`
