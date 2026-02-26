# Additional SDK Parameter Gap Analysis

## Executive Summary

During deeper analysis of the codebase, I identified additional parameter gaps and clarified false positives related to BigInt() usage. This report supplements the original gap analysis.

## Key Findings

### 1. Confirmed Critical Gap: buyAndBorrow minAmountOut

- **Issue**: The `buyAndBorrow` function in `market.ts` hardcodes `minAmountOut` to `BigInt(0)` instead of accepting it as a configurable parameter
- **Impact**: Users have no slippage protection, making them vulnerable to MEV and price impact
- **Contract ABI**: According to CreditFacility*v1 ABI, `buyAndBorrow` expects 4 parameters including `minAmountOut*`
- **SDK Interface**: TMarketBuyAndBorrowParams does not include `minAmountOut` parameter
- **Status**: Critical gap requiring immediate fix

### 2. False Positive: BigInt() Wrapper Usage

- **Issue**: Originally flagged as hardcoded literals, but clarified as false positive per user feedback
- **Explanation**: When BigInt() wraps function parameters (e.g., `BigInt(feeBps)` where `feeBps` is a parameter), this is proper usage and not hardcoded
- **Examples**:
  - `market-admin.ts` lines 709, 747: `args: [BigInt(feeBps)]` - CORRECT, feeBps is a parameter
  - These should NOT be flagged as hardcoded literals
- **Status**: Not a gap, but proper parameter handling

### 3. Properly Implemented Functions (No Gaps)

- **presale.ts**: `buyPresale` and `buyPresaleWithLeverage` properly handle `minAmountOut` parameter
- **market.ts**: `buy`, `buyFor`, `sell`, `sellTo` properly handle slippage/minAmountOut
- **credit-facility-admin.ts**: `buyAndBorrowFor` properly handles `minAmountOut` parameter

### 4. Verification of Other Contract Functions

- **Floor_v1 functions**: All `buy`, `buyFor`, `sell`, `sellTo` functions properly implement slippage protection in market.ts
- **Presale_v1 functions**: All functions properly implement minAmountOut where required
- **CreditFacility_v1 functions**: Most functions properly implemented, except the confirmed gap in `buyAndBorrow`

## Recommendations

### Immediate Action Required

1. **Fix buyAndBorrow interface**: Add `minAmountOut` parameter to `TMarketBuyAndBorrowParams`
2. **Update buyAndBorrow implementation**: Accept and pass through the `minAmountOut` parameter with proper default value
3. **Add validation**: Implement proper validation for the new parameter

### No Action Required (False Positives Corrected)

1. BigInt() wrappers around parameters are correct usage
2. Functions already properly handling minAmountOut/slippage parameters

## Updated Gap Summary

- **Critical Gaps**: 1 (buyAndBorrow minAmountOut)
- **High Severity**: 0
- **Medium Severity**: 0 (after correcting false positives)
- **False Positives**: 7 (BigInt() wrapper usages around parameters)

## Conclusion

The primary gap remains the `buyAndBorrow` function lacking proper slippage control. The other identified "gaps" were false positives related to BigInt() usage around parameters, which is correct implementation. The automated detector should be updated to differentiate between `BigInt(hardcoded_value)` and `BigInt(parameter)` to avoid these false positives.
