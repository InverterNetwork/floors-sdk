# Launch Module - Faults & Issues Report

**Generated:** 2026-02-25
**Branch:** test/dev1
**Commit:** 80e09b2

---

## Executive Summary

| Issue Type                     | Count | Severity          |
| ------------------------------ | ----- | ----------------- |
| **Missing Module Deployments** | 2     | 🔴 High           |
| **Type Safety Issues**         | 6     | 🟡 Medium (Fixed) |
| **Breaking Scenarios Caught**  | 6     | ✅ Expected       |
| **Test Skipped**               | 24    | 🟡 Review Needed  |

---

## Critical Finding: Missing Module Deployments

### Issue: Presale and Staking Modules Not Deploying

**Severity:** 🔴 HIGH

During integration tests against the local blockchain, the Presale and Staking modules consistently return `undefined` addresses when floors are created with these modules configured.

#### Evidence from Test Runs

| Test Scenario        | Expected Module        | Actual Result    |
| -------------------- | ---------------------- | ---------------- |
| Create with Presale  | Presale address        | `undefined`      |
| Create with Staking  | StakingManager address | `undefined`      |
| All Modules Combined | Presale + Staking      | Both `undefined` |

#### Sample Test Output

```
--- E2E Create with Presale ---
Floor with presale created: 0x78f6301bB6a639Fe3A690088124c43A1558229aB
Authorizer: 0xaBcF640Fda46d2c31A6a6F6D83c10EEaD3864dF1, Presale: undefined

--- E2E Create with Staking ---
Floor with staking created: 0x315ED6369e23b466948584a286492c41e16dbed8
Authorizer: 0x281F063f1E15cee26f74d4B419742D481d56904F, Staking: undefined

--- E2E Create with All Modules ---
Modules: Authorizer=0x8A034A40256Dc6433e18fC4C3ea96EFe13bB6227,
         CF=0x0C4da7AA7D1c3f9623995101361c268e3747806B,
         Presale=undefined,
         Staking=undefined
```

#### Root Cause Analysis

The module detection function `parseModuleAddressesFromReceipt()` correctly parses `ModuleCreated` events from the ModuleFactory (`0x79c230218626a33118b5bae08f28a5d342dccd36`). The issue is that these modules are simply not being deployed.

**Module Detection Logic:**

```typescript
if (moduleType.includes('presale')) {
  result.presale = moduleAddress
} else if (moduleType.includes('staking')) {
  result.stakingManager = moduleAddress
}
```

The logic works for Authorizer and CreditFacility but never matches for Presale/Staking because no events are emitted.

#### Impact

- Developers cannot test presale functionality locally
- Staking module integration cannot be validated
- E2E tests give false confidence (tests "pass" but modules aren't actually deployed)

#### Recommended Actions

1. **Check ModuleFactory Deployment Script** - Verify Presale and Staking modules are included in the module factory's deployment configuration

2. **Review Module Type Names** - Confirm the actual module type strings being emitted match what the parser expects (e.g., `"Presale_v1"`, `"Staking_v1"`)

3. **Add Deployment Verification Test** - Create a test that explicitly verifies all expected modules are deployed before running integration tests

---

## Fixed Issues: TypeScript Type Errors

**Severity:** 🟡 MEDIUM (Resolved)

### Issue: Transaction Hash Type Mismatch

**Location:** `test/launch/integration.test.ts`

**Problem:** `result.transactionHash` returns `string` but viem's `waitForTransactionReceipt` requires `` `0x${string}` ``

**Errors Fixed:** 5 occurrences

| Line | Error                                                        | Fix Applied          |
| ---- | ------------------------------------------------------------ | -------------------- |
| 323  | `Type 'string' is not assignable to type '\`0x\${string}\`'` | Added type assertion |
| 418  | `Type 'string' is not assignable to type '\`0x\${string}\`'` | Added type assertion |
| 472  | `Type 'string' is not assignable to type '\`0x\${string}\`'` | Added type assertion |
| 524  | `Type 'string' is not assignable to type '\`0x\${string}\`'` | Added type assertion |
| 588  | `Type 'string' is not assignable to type '\`0x\${string}\`'` | Added type assertion |

### Issue: Unused Function

**Location:** `test/launch/integration.test.ts:97`

**Problem:** `fetchMarketModuleAddresses` function declared but never called

**Fix:** Removed the deprecated function entirely

---

## Breaking Scenarios Caught (Expected Failures)

**Severity:** ✅ EXPECTED - These are intentional

The stress test suite includes 6 breaking scenarios designed to verify that invalid configurations properly throw errors.

| #   | Scenario Category           | Expected Behavior | Status    |
| --- | --------------------------- | ----------------- | --------- |
| 1   | Invalid module address      | Throw error       | ✅ Caught |
| 2   | Missing required params     | Throw error       | ✅ Caught |
| 3   | Invalid permission combo    | Throw error       | ✅ Caught |
| 4   | Malformed address           | Throw error       | ✅ Caught |
| 5   | Invalid module config       | Throw error       | ✅ Caught |
| 6   | Transaction revert handling | Throw error       | ✅ Caught |

These are **not bugs** - they confirm the validation logic is working correctly.

---

## Skipped Tests Analysis

**Severity:** 🟡 REVIEW NEEDED

24 tests were skipped during the test run. This could indicate:

1. Tests conditional on environment availability
2. Tests marked `.skip()` during development
3. Tests that require additional setup

### Skipped Test Breakdown

| File                  | Skipped Count | Likely Reason                                       |
| --------------------- | ------------- | --------------------------------------------------- |
| `integration.test.ts` | ~18           | Environment checks (`isTestEnvironmentAvailable()`) |
| `edge-cases.test.ts`  | ~6            | Conditional test execution                          |

**Recommendation:** Review skipped tests to ensure they are intentionally conditional and not accidentally disabled.

---

## Potential Hidden Issues

### 1. Module Type String Matching is Fragile

**Location:** `test/launch/integration.test.ts:65-81`

**Risk:** Medium

The module detection relies on substring matching:

```typescript
const moduleType = args.metadata_?.title?.toLowerCase() || ''

if (moduleType.includes('authorizer') || moduleType.includes('roles')) {
  result.authorizer = moduleAddress
}
```

**Problem:** If module naming conventions change (e.g., `"AuthModule_v1"` instead of `"AUT_Roles_v2"`), detection will silently fail.

**Recommendation:** Use event signatures or numeric module type IDs for robust detection.

---

### 2. No Validation for Module Deployment Completeness

**Risk:** Medium

Tests pass even when modules aren't deployed. The test suite should fail fast if expected modules are missing.

**Current Behavior:**

```typescript
expect(modules.presale).toBeDefined() // Not asserted
```

**Recommendation:** Add explicit assertions for module addresses when modules are configured:

```typescript
if (config.presale) {
  expect(modules.presale).toBeDefined()
}
```

---

### 3. Transaction Receipt Parsing May Miss Edge Cases

**Risk:** Low

The `parseModuleAddressesFromReceipt` function silently skips logs that don't match expected patterns:

```typescript
try {
  const decoded = decodeEventLog({...})
  // ... process
} catch {
  // Skip logs that don't match ModuleFactory ABI
}
```

**Problem:** Real failures could be silently ignored.

**Recommendation:** Add logging for skipped logs during test runs to detect unexpected patterns.

---

## Summary of Actions Required

| Priority  | Issue                                      | Owner    | Estimated Effort |
| --------- | ------------------------------------------ | -------- | ---------------- |
| 🔴 HIGH   | Deploy Presale module in local environment | Dev Team | 1-2 hours        |
| 🔴 HIGH   | Deploy Staking module in local environment | Dev Team | 1-2 hours        |
| 🟡 MEDIUM | Add module deployment verification test    | QA/Dev   | 1 hour           |
| 🟡 MEDIUM | Review and document skipped tests          | QA       | 30 min           |
| 🟡 MEDIUM | Improve module type detection robustness   | Dev Team | 2-3 hours        |
| 🟢 LOW    | Add logging for skipped event logs         | Dev Team | 30 min           |

---

## Files Requiring Changes

| File                               | Required Change                         |
| ---------------------------------- | --------------------------------------- |
| `contracts/deploy/` (location TBD) | Add Presale + Staking module deployment |
| `test/launch/integration.test.ts`  | Add module presence assertions          |
| `test/launch/configs.ts`           | Document breaking scenarios             |
| `src/launch/` (TBD)                | Improve module type detection           |

---

## Appendix: Full Test Output

```
bun test test/launch/

test/launch/unit.test.ts:
=== Launch Test Suite Complete ===

test/launch/runner.test.ts:
=== STRESS TEST SUMMARY ===
Total scenarios: 52
Executed: 58
Passed: 52
Failed: 6

test/launch/integration.test.ts:
Checking test environment availability...
Loaded addresses from GraphQL indexer

=== Integration Test Environment ===
RPC URL: http://127.0.0.1:8545
GraphQL URL: http://localhost:8080/v1/graphql
FloorFactory: 0x53299141d0cb1d75da156b7cd5e8ea076d02f41f
TransactionForwarder: 0xf5656952eb383f01305ae1d973a32416122c0c2f
Collateral Token: 0x67832b9Fc47eb3CdBF7275b95a29740EC58193D2

[All 6 E2E scenarios executed successfully]

79 pass
24 skip
0 fail
115 expect() calls
Ran 103 tests across 4 files. [14.73s]
```

---

**Report prepared by:** Automated Test Runner
**Review requested for:** Dev Team Lead, QA Team
