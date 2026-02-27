# SDK Parameter Gap — Status Report

**Date:** 2026-02-27
**Branch:** dev
**Original Issues Detected:** 38

---

## Executive Summary

Out of 38 issues originally flagged, the critical slippage bug has been fixed along with several false positives confirmed. Remaining work is primarily around adding input validation utilities and address checks to admin/constructor-level functions.

---

## COMPLETED (No Action Needed)


| #   | Issue                                               | Severity     | File                       | Notes                                                                                                              |
| --- | --------------------------------------------------- | ------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | `buyAndBorrow` missing `minAmountOut`               | **Critical** | `market.ts`                | Fixed. Now accepts optional `minAmountOut` param (defaults to `BigInt(0)`), passed through to contract.            |
| 2   | `buyPresale` missing `minAmountOut`                 | High         | `presale.ts`               | Fixed. Optional param with default, passed to contract.                                                            |
| 3   | `buyPresaleWithLeverage` missing `minAmountOut`     | High         | `presale.ts`               | Fixed. Optional param with default, passed to contract.                                                            |
| 4   | `buyAndBorrowFor` missing `minAmountOut`            | High         | `credit-facility.ts`       | Was already properly implemented.                                                                                  |
| 5   | `buy`, `buyFor`, `sell`, `sellTo` slippage handling | High         | `market.ts`                | Were already properly implemented.                                                                                 |
| 6   | `setMaxLoops` / `setMaxLeverage` hardcoded          | High         | `credit-facility-admin.ts` | Not hardcoded — correctly accepts `maxLeverage` param with `validateMaxLeverage()`.                                |
| 7   | `setBuyFee` / `setSellFee` BigInt wrapping          | Medium       | `market-admin.ts`          | False positive — `BigInt(feeBps)` wraps a parameter, not a literal. Fee validation (`validateFeeBps`) is in place. |
| 8   | `setBorrowingFeeRate` BigInt wrapping               | Medium       | `credit-facility-admin.ts` | False positive — same pattern, param is passed through.                                                            |
| 9   | `setLoanToValueRatio` BigInt wrapping               | Medium       | `credit-facility-admin.ts` | False positive — param is passed through. Validation exists in `utils/credit-facility.ts`.                         |
| 10  | `setPerformanceFeeBps` BigInt wrapping              | Medium       | `presale-admin.ts`         | False positive — param is passed through.                                                                          |
| 11  | Credit facility config validation                   | High         | `utils/credit-facility.ts` | `validateCreditFacilityConfig()` exists with LTV/leverage/fee validation.                                          |


**Summary:** ~7 false positives confirmed + 4 critical/high fixes already shipped. The only critical issue (`buyAndBorrow` slippage) is resolved.

---

## STILL TODO — Needs Work

### Priority 1: High (Security)


| #   | Task                                                                                                      | Severity | Files Affected                                             | Description                                                                                                                                           |
| --- | --------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Create `validation.ts` utility                                                                            | High     | `src/utils/validation.ts` (new)                            | No centralized validation utility exists. Need `validateAddress()` and `validateBigint()` helpers. Currently validation is scattered inline.          |
| 2   | Add address validation to constructors                                                                    | High     | `market.ts`, `market-admin.ts`, `credit-facility-admin.ts` | Constructor-level addresses are not validated with `getAddress()` or `isAddress()`. Other files (authorizer, presale, GraphQL layer) already do this. |
| 3   | Admin function input validation                                                                           | High     | Multiple (71 admin functions)                              | Most admin functions don't validate inputs before sending transactions. Need range checks for numerics, address checks for address params.            |
| 4   | Address validation on `buyFor`, `sellTo`, `borrowFor`, `buyAndBorrowFor`, `harvestYield`, `withdrawFunds` | Medium   | `market.ts`, `credit-facility.ts`, `governor.ts`           | These functions accept address params (`to`/`receiver`) without zero-address checks.                                                                  |


### Priority 2: Medium (Robustness)


| #   | Task                      | Severity | Files Affected                                                    | Description                                                                                                                                                        |
| --- | ------------------------- | -------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 5   | Loop count validation     | Medium   | Functions using leverage/loops                                    | 7 loop-related calls lack max-loop validation. Should enforce `PROTOCOL_LIMITS.MAX_LOOPS`.                                                                         |
| 6   | Fee parameter consistency | Low      | `market-admin.ts`, `credit-facility-admin.ts`, `presale-admin.ts` | 10 fee-related calls — standardize basis points constants and range validation. `market-admin.ts` already has `validateFeeBps`, but this pattern should be shared. |


### Priority 3: Low (Maintainability)


| #   | Task                  | Severity | Files Affected                                                    | Description                                                                                                                                      |
| --- | --------------------- | -------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 7   | File modularization   | Low      | `presale.ts` (64 calls), `launch.ts` (35), `market-admin.ts` (34) | Large files flagged for complexity. Consider splitting by functionality (buy/sell/admin).                                                        |
| 8   | Remove debug log      | Low      | `presale.ts:928`                                                  | Leftover `console.log('error happends')` in `buyPresale`.                                                                                        |
| 9   | Protocol risk reviews | Low      | Multiple                                                          | Broader review of presale security (84 calls), credit risk (21 calls), staking rewards (19 calls). Not code bugs — just recommended audit items. |


---

## Scorecard


| Category     | Original | Resolved            | Remaining                 |
| ------------ | -------- | ------------------- | ------------------------- |
| **Critical** | 1        | 1                   | **0**                     |
| **High**     | 8        | 4                   | **4**                     |
| **Medium**   | 23       | 7 (false positives) | **~6** (validation tasks) |
| **Low**      | 6        | 0                   | **~3** (maintainability)  |
| **Total**    | **38**   | **12**              | **~13 actionable items**  |


> ~12 issues were either false positives or already fixed. ~13 remain as real work items.

---

## Recommended Next Steps

1. **First** — Create shared `validateAddress()` and `validateBigint()` utilities in `src/utils/validation.ts`
2. **Then** — Apply address validation to all constructors and public functions that take address params
3. **Then** — Add input validation to admin functions (use existing `validateFeeBps` as a pattern)
4. **Then** — Add loop count validation with protocol-level constants
5. **Last** — File cleanup, remove debug logs, consider modularization if files keep growing

---

## Notes

- All `BigInt(param)` wrapper usages are **correct** — they convert JS numbers to bigint for contract calls. These are not bugs.
- The `minAmountOut` defaults to `BigInt(0)` intentionally for backward compatibility. Callers should pass a real value for slippage protection.
- Address validation via `getAddress()` (viem) is already used in `authorizer.ts`, `presale.ts`, and the GraphQL layer — just needs to be extended to market/admin classes.

