# Multicall Array Assembly Report

**Generated:** 2026-02-25
**Source:** `src/launch.ts:configure()` method (lines 322-760)
**Related:** `CONFIG_BREAKDOWN_REPORT.md`

---

## Executive Summary

This report documents how the `configure()` method in `src/launch.ts` assembles its multicall array. The method builds a `SingleCall[]` array conditionally based on which modules are deployed, then executes all calls via `TransactionForwarder.executeMulticall()` or falls back to direct calls.

### Key Metrics

| Metric              | Value                                |
| ------------------- | ------------------------------------ |
| **Base Call Count** | 3-5 calls (always)                   |
| **Credit Facility** | +4 calls                             |
| **Presale**         | +2-3 calls                           |
| **StakingManager**  | +7-14 calls                          |
| **Maximum Calls**   | ~26 calls (all modules + strategies) |

### Execution Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Initialize calls: SingleCall[] = []                      │
│ 2. Add base calls (minter, openBuy, openSell, PUBLIC_ROLE)  │
│ 3. Read role state (getAdminRole, getLastAssignedRoleId)    │
│ 4. Add CreditFacility calls (if deployed)                   │
│ 5. Add Presale calls (if deployed)                          │
│ 6. Add StakingManager calls (if deployed)                   │
│ 7. Check if all targets trust forwarder                     │
│ 8a. If trusted: executeMulticall(calls)                     │
│ 8b. If not: send individual transactions                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Call Structure

### SingleCall Interface

```typescript
interface SingleCall {
  target: Address // Contract to call
  allowFailure: boolean // Whether call can fail
  callData: `0x${string}` // Encoded function data
}
```

### Call Assembly Pattern

```typescript
const calls: SingleCall[] = []

// Conditional push pattern
if (params.someCondition) {
  calls.push({
    target: params.contractAddress,
    allowFailure: false,
    callData: encodeFunctionData({
      abi: ContractABI,
      functionName: 'someFunction',
      args: [
        /* ... */
      ],
    }),
  })
}
```

---

## Detailed Call Breakdown

### Phase 1: Base Calls (Lines 330-387)

**Always executed** - These calls set up core Floor functionality.

| #   | Condition                   | Target          | Function                                        | Purpose                    |
| --- | --------------------------- | --------------- | ----------------------------------------------- | -------------------------- |
| 1   | `grantMinterRole !== false` | `issuanceToken` | `setMinter(floor, true)`                        | Grant Floor minting rights |
| 2   | `openBuy !== false`         | `floor`         | `enableBuy()`                                   | Enable buy functionality   |
| 3   | `openBuy !== false`         | `authorizer`    | `addAccessPermission(floor, buy, PUBLIC_ROLE)`  | Public buy access          |
| 4   | `openSell === true`         | `floor`         | `enableSell()`                                  | Enable sell functionality  |
| 5   | `openSell === true`         | `authorizer`    | `addAccessPermission(floor, sell, PUBLIC_ROLE)` | Public sell access         |

**Call Count:** 3-5 calls

**Selectors Used:**

```typescript
import { FLOOR_SELECTORS } from './utils/selectors'
// FLOOR_SELECTORS.buy = bytes4(keccak256("buy(uint256,uint256)"))
// FLOOR_SELECTORS.sell = bytes4(keccak256("sell(uint256,uint256,uint256)"))
```

---

### Phase 2: Credit Facility Calls (Lines 389-412)

**Conditional** - Only when `openBorrow === true && creditFacilityAddress` exists.

| #   | Target       | Function                                                   | Purpose              |
| --- | ------------ | ---------------------------------------------------------- | -------------------- |
| 1   | `authorizer` | `addAccessPermission(creditFacility, borrow, PUBLIC_ROLE)` | Public borrow access |
| 2   | `authorizer` | `addAccessPermission(creditFacility, repay, PUBLIC_ROLE)`  | Public repay access  |

**Call Count:** 0-2 calls

**Selectors Used:**

```typescript
import { CREDIT_FACILITY_SELECTORS } from './utils/selectors'
// CREDIT_FACILITY_SELECTORS.borrow
// CREDIT_FACILITY_SELECTORS.repay
```

---

### Phase 3: Role State Reading (Lines 414-433)

**Not a call** - Reads contract state to predict role IDs.

```typescript
const [adminRole, lastRoleId] = await Promise.all([
  this.publicClient.readContract({
    address: params.authorizerAddress,
    abi: AUT_Roles_v2,
    functionName: 'getAdminRole',
  }),
  this.publicClient.readContract({
    address: params.authorizerAddress,
    abi: AUT_Roles_v2,
    functionName: 'getLastAssignedRoleId',
  }),
])

let nextRoleIdNumber = Number(lastRoleId as bigint) + 1
```

**Role ID Prediction:**

- Role IDs are sequential integers stored as `bytes32`
- `PUBLIC_ROLE = 1` (constant)
- New roles: `lastRoleId + 1`, `lastRoleId + 2`, etc.

---

### Phase 4: Credit Facility Role Setup (Lines 435-487)

**Conditional** - Only when `creditFacilityAddress` exists.

| #   | Target       | Function                                                                  | Purpose                | Role ID        |
| --- | ------------ | ------------------------------------------------------------------------- | ---------------------- | -------------- |
| 1   | `authorizer` | `createRole('CreditFacility', adminRole, [creditFacility])`               | Create CF role         | `nextRoleId++` |
| 2   | `authorizer` | `addAccessPermission(floor, buy, creditFacilityRoleId)`                   | CF can buy             | -              |
| 3   | `authorizer` | `addAccessPermission(floor, withdrawCollateralTo, creditFacilityRoleId)`  | CF withdraw collateral | -              |
| 4   | `authorizer` | `addAccessPermission(floor, depositCollateralFrom, creditFacilityRoleId)` | CF deposit collateral  | -              |

**Call Count:** 0-4 calls

**Role ID Prediction:**

```typescript
creditFacilityRoleId = `0x${nextRoleIdNumber.toString(16).padStart(64, '0')}`
nextRoleIdNumber++
```

---

### Phase 5: Presale Role Setup (Lines 489-545)

**Conditional** - Only when `presaleAddress` exists.

| #   | Target       | Function                                                           | Purpose               | Role ID        |
| --- | ------------ | ------------------------------------------------------------------ | --------------------- | -------------- |
| 1   | `authorizer` | `createRole('Presale', adminRole, [presale])`                      | Create Presale role   | `nextRoleId++` |
| 2   | `authorizer` | `addAccessPermission(floor, buy, presaleRoleId)`                   | Presale can buy       | -              |
| 3   | `authorizer` | `addAccessPermission(creditFacility, buyAndBorrow, presaleRoleId)` | Presale buy+borrow    | -              |
| 4   | `presale`    | `setCreditFacility(creditFacilityAddress)`                         | Set actual CF address | -              |

**Call Count:** 2-4 calls (calls 3-4 only if `creditFacilityAddress` exists)

**Critical Dependency:**

- Call 3 requires Credit Facility to be deployed
- Call 4 replaces the `address(1)` placeholder set during `encodePresaleConfig()`

---

### Phase 6: StakingManager Role Setup (Lines 547-721)

**Conditional** - Only when `stakingManagerAddress` exists.

#### 6a: Public Staking Permissions (Lines 549-588)

**Conditional** - Only when `openStaking !== false`.

| #   | Target       | Function                                                   | Purpose          |
| --- | ------------ | ---------------------------------------------------------- | ---------------- |
| 1   | `authorizer` | `addAccessPermission(staking, stake, PUBLIC_ROLE)`         | Public stake     |
| 2   | `authorizer` | `addAccessPermission(staking, harvestYield, PUBLIC_ROLE)`  | Public harvest   |
| 3   | `authorizer` | `addAccessPermission(staking, withdrawFunds, PUBLIC_ROLE)` | Public withdraw  |
| 4   | `authorizer` | `addAccessPermission(staking, rebalance, PUBLIC_ROLE)`     | Public rebalance |

**Call Count:** 0-4 calls

#### 6b: Staking Admin Permissions (Lines 590-632)

**Conditional** - Only when `enableStakingAdmin !== false`.

| #   | Target       | Function                                                        | Purpose               |
| --- | ------------ | --------------------------------------------------------------- | --------------------- |
| 1   | `authorizer` | `addAccessPermission(staking, addStrategy, adminRole)`          | Admin add strategy    |
| 2   | `authorizer` | `addAccessPermission(staking, removeStrategy, adminRole)`       | Admin remove strategy |
| 3   | `authorizer` | `addAccessPermission(staking, setPerformanceFeeBps, adminRole)` | Admin set fees        |

**Call Count:** 0-3 calls

#### 6c: StakingManager Role Creation (Lines 634-669)

**Always executed** when `stakingManagerAddress` exists.

| #   | Target       | Function                                                                  | Purpose                | Role ID        |
| --- | ------------ | ------------------------------------------------------------------------- | ---------------------- | -------------- |
| 1   | `authorizer` | `createRole('StakingManager', adminRole, [stakingManager])`               | Create SM role         | `nextRoleId++` |
| 2   | `authorizer` | `addAccessPermission(floor, withdrawCollateralTo, stakingManagerRoleId)`  | SM withdraw collateral | -              |
| 3   | `authorizer` | `addAccessPermission(floor, depositCollateralFrom, stakingManagerRoleId)` | SM deposit collateral  | -              |

**Call Count:** 3 calls

#### 6d: Strategy Role Setup (Lines 671-720)

**Conditional** - Only when `strategyAddresses && strategyAddresses.length > 0`.

| #   | Target       | Function                                                                   | Purpose              | Role ID        |
| --- | ------------ | -------------------------------------------------------------------------- | -------------------- | -------------- |
| 1   | `authorizer` | `createRole('StakingManager_Strategy', adminRole, [stakingManager])`       | Create Strategy role | `nextRoleId++` |
| 2+N | `authorizer` | `addAccessPermission(strategy[N], deposit, stakingManagerStrategyRoleId)`  | Strategy deposit     | -              |
| 3+N | `authorizer` | `addAccessPermission(strategy[N], withdraw, stakingManagerStrategyRoleId)` | Strategy withdraw    | -              |

**Call Count:** 1 + (2 × strategy count) calls

**Selectors Used:**

```typescript
import { STAKING_SELECTORS, STRATEGY_BASE_SELECTORS } from './utils/selectors'
```

---

## Call Count Summary by Configuration

| Configuration         | Base | CF  | Presale | Staking | Total     |
| --------------------- | ---- | --- | ------- | ------- | --------- |
| `base_only`           | 3-5  | 0   | 0       | 0       | **3-5**   |
| `cf_only`             | 3-5  | 4   | 0       | 0       | **7-9**   |
| `presale_only`        | 3-5  | 0   | 2       | 0       | **5-7**   |
| `staking_only`        | 3-5  | 0   | 0       | 7       | **10-12** |
| `cf_presale`          | 3-5  | 4   | 4       | 0       | **11-13** |
| `cf_staking`          | 3-5  | 4   | 0       | 7       | **14-16** |
| `presale_staking`     | 3-5  | 0   | 2       | 7       | **12-14** |
| `all_modules`         | 3-5  | 4   | 4       | 7       | **18-20** |
| `all_with_strategies` | 3-5  | 4   | 4       | 14+     | **25+**   |

**Notes:**

- Base calls: 3 if `openBuy=false`, 5 if `openBuy=true` and `openSell=true`
- Staking with 1 strategy: +3 calls (1 role + 2 permissions per strategy)
- Maximum calls: ~26 with all options enabled and multiple strategies

---

## Role ID Prediction Mechanism

The `configure()` method predicts role IDs sequentially because AUT_Roles_v2 assigns them incrementally.

```typescript
// Initial state reading
const lastRoleId = await readContract('getLastAssignedRoleId') // e.g., 0n
let nextRoleIdNumber = Number(lastRoleId) + 1 // = 1

// PUBLIC_ROLE is always 1
const PUBLIC_ROLE = `0x${'0'.repeat(63)}1`

// Predict CreditFacility role (if deployed)
creditFacilityRoleId = `0x${nextRoleIdNumber.toString(16).padStart(64, '0')}` // 0x...01
nextRoleIdNumber++ // = 2

// Predict Presale role (if deployed)
presaleRoleId = `0x${nextRoleIdNumber.toString(16).padStart(64, '0')}` // 0x...02
nextRoleIdNumber++ // = 3

// Predict StakingManager role (if deployed)
stakingManagerRoleId = `0x${nextRoleIdNumber.toString(16).padStart(64, '0')}` // 0x...03
nextRoleIdNumber++ // = 4

// Predict Strategy role (if strategies deployed)
stakingManagerStrategyRoleId = `0x${nextRoleIdNumber.toString(16).padStart(64, '0')}` // 0x...04
```

**Critical Assumption:** No other roles are created between reading `getLastAssignedRoleId()` and executing the multicall.

**Risk:** If another transaction creates a role concurrently, predicted IDs will be wrong.

---

## Execution Paths

### Path A: Forwarder Execution (Lines 728-750)

**Condition:** All call targets trust the forwarder.

```typescript
const canUseForwarder = await this.canUseForwarderForCalls(
  params.transactionForwarderAddress,
  calls
)

if (canUseForwarder) {
  const hash = await walletClient.writeContract({
    address: params.transactionForwarderAddress,
    abi: TransactionForwarder_v1,
    functionName: 'executeMulticall',
    args: [calls],
  })
  // ...
}
```

**Forwarder Check:**

```typescript
private async canUseForwarderForCalls(
  forwarderAddress: Address,
  calls: SingleCall[]
): Promise<boolean> {
  const uniqueTargets = [...new Set(calls.map((call) => call.target.toLowerCase()))]

  for (const targetLower of uniqueTargets) {
    const trusted = await this.publicClient.readContract({
      address: targetLower as Address,
      abi: IS_TRUSTED_FORWARDER_ABI,
      functionName: 'isTrustedForwarder',
      args: [forwarderAddress],
    })

    if (!trusted) return false
  }
  return true
}
```

### Path B: Direct Execution (Lines 753-759)

**Condition:** At least one target doesn't trust the forwarder.

```typescript
const directResult = await this.executeCallsDirectly(calls, walletClient, 'configure')
```

**Direct Execution Behavior:**

- Sends each call as a separate transaction
- Fails immediately if any call with `allowFailure: false` reverts
- Returns individual call results

---

## Potential Failure Points

### By Call Index

| Index Range | Module              | Failure Impact                                        |
| ----------- | ------------------- | ----------------------------------------------------- |
| 0           | setMinter           | **CRITICAL** - Floor can't mint tokens                |
| 1-2         | enableBuy           | **HIGH** - Trading disabled                           |
| 3-4         | enableSell          | Medium - Sell disabled (expected if `openSell=false`) |
| 5-6         | CF borrow/repay     | Low - Public borrowing disabled                       |
| 7           | CF createRole       | **HIGH** - CF role missing                            |
| 8-10        | CF permissions      | **HIGH** - CF can't operate                           |
| 11          | Presale createRole  | **HIGH** - Presale role missing                       |
| 12-14       | Presale permissions | **HIGH** - Presale can't operate                      |
| 15-18       | Staking public      | Medium - Staking disabled                             |
| 19-21       | Staking admin       | Low - Admin disabled                                  |
| 22-24       | StakingManager role | **HIGH** - SM can't access collateral                 |
| 25+         | Strategy roles      | Medium - Strategies disabled                          |

### Known Failure Scenarios

Based on `CONFIG_BREAKDOWN_REPORT.md`:

1. **Presale Init Failure**
   - Occurs in `create()` phase, not `configure()`
   - All configs with Presale fail before `configure()` is reached
   - Root cause: Presale `_setCreditFacility()` during init

2. **Staking Configure Failure**
   - Occurs in `configure()` phase
   - Floor created successfully, StakingManager deployed
   - Fails during multicall execution
   - Suspected causes:
     - Empty strategy array validation
     - Permission granting failure
     - Floor collateral permissions

---

## Debugging Recommendations

### 1. Log Call Array Before Execution

```typescript
console.log('=== MULTICALL ARRAY ===')
console.log(`Total calls: ${calls.length}`)
calls.forEach((call, i) => {
  console.log(`[${i}] target=${call.target}, allowFailure=${call.allowFailure}`)
})
```

### 2. Decode Call Data for Inspection

```typescript
import { decodeFunctionData } from 'viem'
import { AUT_Roles_v2, Floor_v1 } from './abis'

calls.forEach((call, i) => {
  try {
    const decoded = decodeFunctionData({
      abi: AUT_Roles_v2, // Try multiple ABIs
      data: call.callData,
    })
    console.log(`[${i}] ${decoded.functionName}(${decoded.args?.join(', ')})`)
  } catch {
    // Try next ABI
  }
})
```

### 3. Test Individual Calls

```typescript
// Simulate each call with eth_call before sending
for (const call of calls) {
  try {
    await publicClient.call({
      to: call.target,
      data: call.callData,
    })
  } catch (error) {
    console.error(`Call ${i} failed: ${error.message}`)
  }
}
```

### 4. Check Forwarder Trust Status

```typescript
const targets = [...new Set(calls.map((c) => c.target))]
for (const target of targets) {
  const trusted = await publicClient.readContract({
    address: target,
    abi: IS_TRUSTED_FORWARDER_ABI,
    functionName: 'isTrustedForwarder',
    args: [forwarderAddress],
  })
  console.log(`${target}: trusted=${trusted}`)
}
```

---

## Call Ordering Dependencies

### Sequential Dependencies

1. **Role ID Prediction depends on `getLastAssignedRoleId()`**
   - Must read before pushing any `createRole` calls
   - All role creations must be in predicted order

2. **Presale `setCreditFacility` depends on CF being deployed**
   - Call only added if `creditFacilityAddress` exists
   - Uses the actual address (not placeholder)

3. **Strategy permissions depend on Strategy role creation**
   - Role created first (call 1)
   - Permissions added in loop (calls 2+)

### Independent Calls

These calls can be reordered without affecting correctness:

- `setMinter` (independent of all)
- `enableBuy` / `enableSell` (independent)
- PUBLIC_ROLE permissions (independent)
- Module-specific permissions (can be batched per module)

---

## Optimization Opportunities

### 1. Batch Permission Calls

Current: One call per permission

```typescript
calls.push(
  { target: authorizer, callData: encodeFunctionData('addAccessPermission', ...) },
  { target: authorizer, callData: encodeFunctionData('addAccessPermission', ...) },
  // ...
)
```

Alternative: Use `addAccessPermissions` (plural) if contract supports it

```typescript
// If contract has batch function
calls.push({
  target: authorizer,
  callData: encodeFunctionData('addAccessPermissions', [
    [
      { target: floor, selector: buy },
      { target: floor, selector: sell },
    ],
    roleId,
  ]),
})
```

### 2. Conditional Role Creation

If a module doesn't need a dedicated role, skip `createRole`:

```typescript
// Only create role if module needs exclusive permissions
if (params.stakingManagerAddress && params.enableStakingAdmin !== false) {
  // createRole call
}
```

### 3. Parallel Role Reading

Already implemented - `getAdminRole` and `getLastAssignedRoleId` use `Promise.all`.

---

## Appendix: SingleCall Type Definition

```typescript
// src/utils/selectors.ts
export interface SingleCall {
  /** Target contract address */
  target: Address
  /** Whether the call can fail without reverting the entire multicall */
  allowFailure: boolean
  /** Encoded function data (calldata) */
  callData: `0x${string}`
}
```

### Related Selectors

```typescript
// Floor selectors
export const FLOOR_SELECTORS = {
  buy: '0xd6febde8', // buy(uint256,uint256)
  sell: '0x...', // sell(uint256,uint256,uint256)
  withdrawCollateralTo: '0x...',
  depositCollateralFrom: '0x...',
}

// Credit Facility selectors
export const CREDIT_FACILITY_SELECTORS = {
  borrow: '0x...',
  repay: '0x...',
  buyAndBorrow: '0x...',
}

// Staking selectors
export const STAKING_SELECTORS = {
  stake: '0x...',
  harvestYield: '0x...',
  withdrawFunds: '0x...',
  rebalance: '0x...',
  addStrategy: '0x...',
  removeStrategy: '0x...',
  setPerformanceFeeBps: '0x...',
}

// Strategy selectors
export const STRATEGY_BASE_SELECTORS = {
  deposit: '0x...',
  withdraw: '0x...',
}
```

---

## Contact

**Report prepared by:** Automated Analysis
**Review requested for:** SDK Team, Smart Contract Team
**Priority:** MEDIUM - Documentation for debugging and optimization
