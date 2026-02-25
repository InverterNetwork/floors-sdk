# Launch Module Configuration Breakdown Report

**Generated:** 2026-02-25
**Test Branch:** dev
**Test Location:** `test/launch/config-breakdown.test.ts`

---

## Executive Summary

This report presents findings from comprehensive configuration breakdown tests that systematically tested all 8 possible module combinations (2³ = Credit Facility × Presale × Staking) to identify which configurations break the floor creation and configuration flow.

### Critical Findings

| Issue                                 | Severity    | Affected Configs | Status                                      |
| ------------------------------------- | ----------- | ---------------- | ------------------------------------------- |
| **Presale Module Deployment Failure** | 🔴 CRITICAL | 5 configs        | All Presale configs fail at `createFloor`   |
| **Staking Configure Flow Failure**    | 🟡 HIGH     | 2 configs        | Staking configs fail at `configure`         |
| **Credit Facility Always Deployed**   | 🟢 LOW      | All configs      | `createTestLaunchConfig` always includes CF |

### Pass/Fail Summary

| Result              | Count | Percentage |
| ------------------- | ----- | ---------- |
| ✅ Fully Passing    | 2     | 22%        |
| ⚠️ Partial Failure  | 2     | 22%        |
| ❌ Complete Failure | 5     | 56%        |

---

## Test Methodology

### Configuration Matrix

Tests covered all combinations of three optional modules:

```
┌─────────────────────────┬──────────┬───────────┬────────────┐
│ Config Name             │ Credit   │ Presale   │ Staking    │
│                         │ Facility │           │            │
├─────────────────────────┼──────────┼───────────┼────────────┤
│ 000_base_only           │    ✗     │     ✗     │     ✗      │
│ 001_cf_only             │    ✓     │     ✗     │     ✗      │
│ 010_presale_only        │    ✗     │     ✓     │     ✗      │
│ 100_staking_only        │    ✗     │     ✗     │     ✓      │
│ 011_cf_presale          │    ✓     │     ✓     │     ✗      │
│ 101_cf_staking          │    ✓     │     ✗     │     ✓      │
│ 110_presale_staking     │    ✗     │     ✓     │     ✓      │
│ 111_all_modules         │    ✓     │     ✓     │     ✓      │
│ 111_all_with_strategies │    ✓     │     ✓     │     ✓      │
└─────────────────────────┴──────────┴───────────┴────────────┘
```

### Test Flow

Each configuration was tested through two phases:

1. **Create Phase** - `launch.create(config)` - Deploys floor and all modules
2. **Configure Phase** - `launch.configure(params)` - Sets up roles and permissions

---

## Detailed Results

### Full Results Table

| #   | Config Name           | Create | Configure | Floor | Authorizer | CF  | Presale | Staking | Error                |
| --- | --------------------- | ------ | --------- | ----- | ---------- | --- | ------- | ------- | -------------------- |
| 0   | `base_only`           | ✓      | ✓         | ✓     | ✓          | ✓\* | N/A     | N/A     | -                    |
| 1   | `cf_only`             | ✓      | ✓         | ✓     | ✓          | ✓   | N/A     | N/A     | -                    |
| 2   | `presale_only`        | ✗      | -         | ✗     | ✗          | ✗   | ✗       | N/A     | createFloor reverted |
| 3   | `staking_only`        | ✓      | ✗         | ✓     | ✓          | ✓\* | N/A     | ✓       | configure reverted   |
| 4   | `cf_presale`          | ✗      | -         | ✗     | ✗          | ✗   | ✗       | N/A     | createFloor reverted |
| 5   | `cf_staking`          | ✓      | ✗         | ✓     | ✓          | ✓   | N/A     | ✓       | configure reverted   |
| 6   | `presale_staking`     | ✗      | -         | ✗     | ✗          | ✗   | ✗       | N/A     | createFloor reverted |
| 7   | `all_modules`         | ✗      | -         | ✗     | ✗          | ✗   | ✗       | N/A     | createFloor reverted |
| 8   | `all_with_strategies` | ✗      | -         | ✗     | ✗          | ✗   | ✗       | N/A     | createFloor reverted |

\* Note: Credit Facility is deployed even in "base_only" and "staking_only" configs because `createTestLaunchConfig()` always includes a default CF config.

---

## Failure Analysis

### 🔴 CRITICAL: Presale Module Deployment Failure

#### Affected Configurations

- `presale_only`
- `cf_presale`
- `presale_staking`
- `all_modules`
- `all_with_strategies`

#### Symptoms

All configurations including the Presale module fail during the `createFloor` transaction with:

```
createFloor transaction reverted. Hash: 0x...
```

The transaction reverts before any modules are deployed, indicating the Presale module initialization is failing.

#### Evidence from Integration Tests

The existing integration tests show the same issue:

```
--- E2E Create with Presale ---
Floor with presale created: 0x17f5e73A76418713a7a73468b54fA8A60Ea76eFB
Authorizer: 0x018f7D332CcDB6A60C4cB976c069830ae84e0ec9, Presale: undefined
```

The test "passes" but `Presale: undefined` indicates the module was never deployed.

#### Config Analysis

The Presale config being passed:

```typescript
{
  creditFacilityAddress: '0x0000000000000000000000000000000000000001', // address(1) placeholder
  baseCommissionBps: [100n, 200n, 450n],
  endTimestamp: <future_timestamp>,
  globalIssuanceCap: 100000e18,
  perAddressIssuanceCap: 0,
  priceBreakpoints: [[1e18], [1e18, 1e18]],
  initialMultiplier: 10000n,
  decayDuration: 0n,
}
```

#### Potential Root Causes

1. **Credit Facility Address Validation**
   - The Presale contract uses `address(1)` as a placeholder when no CF is deployed
   - The `_setCreditFacility()` function has a `validAddress()` modifier
   - While `address(1)` passes the `address(0)` check, there may be additional validation

2. **Price Breakpoints Validation**
   - `priceBreakpoints.length` must equal `baseCommissionBps.length - 1`
   - Current config: 3 commission levels → 2 breakpoint arrays ✓

3. **Timestamp Validation**
   - `endTimestamp` must be in the future
   - Current config: `Date.now() + 86400` (24 hours) ✓

4. **ModuleFactory Registration**
   - The Presale module may not be properly registered in the ModuleFactory
   - This would cause deployment to fail silently

#### Recommended Debugging Steps

```bash
# 1. Check ModuleFactory for Presale module registration
cast call $MODULE_FACTORY "getModule(bytes32)" <presale_identifier>

# 2. Decode transaction revert reason
cast logs --tx <failed_tx_hash>

# 3. Test Presale init directly with forge
forge test --match-test testPresaleInit
```

---

### 🟡 HIGH: Staking Configure Flow Failure

#### Affected Configurations

- `staking_only`
- `cf_staking`

#### Symptoms

Floor creation succeeds and StakingManager module is deployed, but `configure()` fails:

```
Floor created: 0x7f1cf504AB83a49672566f11BB00DF8bAED9c343
StakingManager: 0xA20EB58F51Ed5555173C2d9D917d82c71cC8B7eF

Configuring floor...
ERROR: configure transaction reverted. Hash: 0x884dc030...
```

#### Config Analysis

The configure params being passed:

```typescript
{
  floorAddress: <floor>,
  authorizerAddress: <authorizer>,
  issuanceTokenAddress: <token>,
  transactionForwarderAddress: <forwarder>,
  stakingManagerAddress: <staking_manager>,
  openStaking: true,
  enableStakingAdmin: true,
  grantMinterRole: true,
  openBuy: true,
}
```

#### Potential Root Causes

1. **Missing Strategy Addresses**
   - StakingManager requires at least one strategy to be registered
   - Empty strategy array may cause validation failure

2. **Permission Granting Failure**
   - The configure flow grants PUBLIC_ROLE permissions for stake/harvest/withdraw/rebalance
   - One of these permission grants may be reverting

3. **Floor Collateral Permissions**
   - StakingManager needs `withdrawCollateralTo` and `depositCollateralFrom` permissions on Floor
   - These permission calls may be failing

4. **Trust Forwarder Issue**
   - If contracts don't trust the forwarder, calls fall back to direct transactions
   - Direct call path may have a bug for staking-specific calls

#### Recommended Debugging Steps

```bash
# 1. Add strategy addresses to config
strategyAddresses: ['0x5858585858585858585858585858585858585858']

# 2. Test configure with minimal staking params
# (only openStaking, no enableStakingAdmin)

# 3. Check which specific call in configure() is reverting
# by adding logging between each call
```

---

### 🟢 LOW: Credit Facility Always Deployed

#### Issue

The `createTestLaunchConfig()` helper function always includes a Credit Facility configuration:

```typescript
export const createTestLaunchConfig = (...): LaunchConfig => ({
  // ...
  creditFacility: options?.creditFacility
    ? createTestCreditFacilityConfig(options.creditFacility)
    : DEFAULT_CREDIT_FACILITY_CONFIG,  // ← Always included!
})
```

#### Impact

- Cannot test truly "base_only" configurations
- Test results may be misleading (e.g., "staking_only" actually has CF)
- May mask issues that only occur without Credit Facility

#### Recommended Fix

```typescript
// Option 1: Add explicit include flag
export const createTestLaunchConfig = (
  issuanceToken: Address,
  reserveToken: Address,
  options?: {
    includeCreditFacility?: boolean,  // New option
    creditFacility?: Partial<CreditFacilityConfig>,
    // ...
  }
): LaunchConfig => ({
  // ...
  creditFacility: options?.includeCreditFacility !== false
    ? createTestCreditFacilityConfig(options?.creditFacility)
    : undefined,
})

// Option 2: Use undefined as default
creditFacility: options?.creditFacility ?? undefined,
```

---

## Module Deployment Status

### Modules Successfully Deployed

| Module                    | Deployment Status | Configure Status |
| ------------------------- | ----------------- | ---------------- |
| Floor_v1                  | ✓ Working         | N/A              |
| AUT_Roles_v2 (Authorizer) | ✓ Working         | N/A              |
| SplitterTreasury_v1       | ✓ Working         | N/A              |
| CreditFacility_v1         | ✓ Working         | ✓ Working        |

### Modules With Issues

| Module            | Deployment Status | Configure Status | Issue             |
| ----------------- | ----------------- | ---------------- | ----------------- |
| Presale_v1        | ✗ **BROKEN**      | N/A              | Init reverts      |
| StakingManager_v1 | ✓ Deployed        | ✗ **BROKEN**     | Configure reverts |

---

## Files Requiring Changes

### High Priority

| File                                               | Issue                  | Recommended Change                                                           |
| -------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| `contracts/src/core/modules/Presale_v1.sol`        | Init reverts           | Add detailed error messages to `_setCreditFacility()` and `__Presale_init()` |
| `contracts/src/core/modules/StakingManager_v1.sol` | Configure fails        | Review init and permission requirements                                      |
| `src/launch.ts`                                    | Staking configure flow | Add error handling to identify specific failing call                         |

### Medium Priority

| File                              | Issue              | Recommended Change                                               |
| --------------------------------- | ------------------ | ---------------------------------------------------------------- |
| `test/launch/helpers/fixtures.ts` | CF always included | Add `includeCreditFacility` option to `createTestLaunchConfig()` |
| `test/launch/integration.test.ts` | Missing assertions | Add `expect(modules.presale).toBeDefined()` for presale configs  |

### Low Priority

| File                                   | Issue             | Recommended Change                           |
| -------------------------------------- | ----------------- | -------------------------------------------- |
| `test/launch/config-breakdown.test.ts` | TypeScript errors | Fix type assignments for readonly properties |

---

## Reproduction Steps

### Reproduce Presale Failure

```typescript
import { Launch } from '../../src/launch'
import { createTestLaunchConfig, createTestPresaleConfig } from './helpers/index'

const config = createTestLaunchConfig(issuanceToken, collateralToken, {
  presale: createTestPresaleConfig(
    '0x0000000000000000000000000000000000000001' // placeholder
  ),
})

const result = await launch.create(config) // ← REVERTS
```

### Reproduce Staking Configure Failure

```typescript
import { Launch } from '../../src/launch'
import { createTestLaunchConfig } from './helpers/index'

// Create succeeds
const config = createTestLaunchConfig(issuanceToken, collateralToken, {
  staking: { performanceFeeBps: 2000 },
})
const createResult = await launch.create(config) // ✓ Works

// Configure fails
const configureResult = await launch.configure({
  floorAddress: createResult.floorAddress,
  authorizerAddress: modules.authorizer,
  issuanceTokenAddress: issuanceToken,
  transactionForwarderAddress: forwarder,
  stakingManagerAddress: modules.stakingManager,
  openStaking: true,
  enableStakingAdmin: true,
}) // ← REVERTS
```

---

## Appendix: Raw Test Output

```
=== CONFIGURATION BREAKDOWN SUMMARY ===
┌───┬─────────────────────────┬────────┬───────────┬────────────┬─────┬─────────┬─────────┬────────┐
│   │ Config                  │ Create │ Configure │ Authorizer │ CF  │ Presale │ Staking │ Error  │
├───┼─────────────────────────┼────────┼───────────┼────────────┼─────┼─────────┼─────────┼────────┤
│ 0 │ 000_base_only           │ ✓      │ ✓         │ ✓          │ ✓   │ N/A     │ N/A     │ -      │
│ 1 │ 001_cf_only             │ ✓      │ ✓         │ ✓          │ ✓   │ N/A     │ N/A     │ -      │
│ 2 │ 010_presale_only        │ ✗      │ -         │ ✗          │ N/A │ N/A     │ N/A     │ reverted│
│ 3 │ 100_staking_only        │ ✓      │ ✗         │ ✓          │ ✓   │ N/A     │ ✓       │ reverted│
│ 4 │ 011_cf_presale          │ ✗      │ -         │ ✗          │ N/A │ N/A     │ N/A     │ reverted│
│ 5 │ 101_cf_staking          │ ✓      │ ✗         │ ✓          │ ✓   │ N/A     │ ✓       │ reverted│
│ 6 │ 110_presale_staking     │ ✗      │ -         │ ✗          │ N/A │ N/A     │ N/A     │ reverted│
│ 7 │ 111_all_modules         │ ✗      │ -         │ ✗          │ N/A │ N/A     │ N/A     │ reverted│
│ 8 │ 111_all_with_strategies │ ✗      │ -         │ ✗          │ N/A │ N/A     │ N/A     │ reverted│
└───┴─────────────────────────┴────────┴───────────┴────────────┴─────┴─────────┴─────────┴────────┘

⚠️  CREATE FAILURES (configs that break):
  - 010_presale_only: createFloor transaction reverted
  - 011_cf_presale: createFloor transaction reverted
  - 110_presale_staking: createFloor transaction reverted
  - 111_all_modules: createFloor transaction reverted
  - 111_all_with_strategies: createFloor transaction reverted
```

---

## Contact

**Report prepared by:** Automated Test Runner
**Review requested for:** Dev Team Lead, Smart Contract Team
**Priority:** CRITICAL - Blocks Presale and Staking feature deployment
