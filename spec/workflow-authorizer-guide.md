# Floor Workflow Authorization Guide

This document describes the authorization setup for each contract in the Floor workflow during the **Presale Phase** and the steps required to transition to the **Live Phase**.

## Table of Contents

1. [Introduction](#introduction)
2. [Authorizer (AUT_Roles_v2)](#1-authorizer-aut_roles_v2)
3. [Floor (Bonding Curve)](#2-floor-bonding-curve)
4. [Presale Module](#3-presale-module)
5. [Credit Facility](#4-credit-facility)
6. [Splitter Treasury](#5-splitter-treasury)
7. [Summary: Phase Transition Checklist](#summary-phase-transition-checklist)

---

## Introduction

### Overview of the Floor Workflow

The Floor workflow is a collection of contracts deployed together via `FloorFactory_v1` that work as a unified system:

| Contract             | Role                                     | Required |
| -------------------- | ---------------------------------------- | -------- |
| **Floor**            | Primary Issuance Market (bonding curve)  | Yes      |
| **Authorizer**       | Role-based access control                | Yes      |
| **SplitterTreasury** | Fee collection and distribution          | Yes      |
| **Presale**          | Presale buying with leverage and vesting | Optional |
| **CreditFacility**   | Borrowing and leveraged positions        | Optional |

### How Authorization Works

The `AUT_Roles_v2` contract provides role-based access control for all modules in the workflow:

1. **Roles**: Named groups of addresses (e.g., "Presale", "CreditFacility")
2. **Permissions**: Mappings from `(target, selector)` to allowed role IDs
3. **`permissioned` modifier**: Functions use this to check caller authorization
4. **`PUBLIC_ROLE`**: Special role (`bytes32(1)`) that grants access to anyone

**Permission Check Flow:**

```
caller calls module.someFunction()
    └─> permissioned modifier
        └─> authorizer.hasPermission(caller, module, selector)
            ├─> Is caller DEFAULT_ADMIN_ROLE? → Allow
            ├─> Is PUBLIC_ROLE in permissions? → Allow
            └─> Does caller have any permitted role? → Allow/Deny
```

**Note:** The `DEFAULT_ADMIN_ROLE` always has access to all permissioned functions, so admin access is not listed in the permission tables below.

### Presale vs Live Phase

| Aspect                            | Presale Phase                                | Live Phase           |
| --------------------------------- | -------------------------------------------- | -------------------- |
| **Floor.buy()**                   | Restricted to Presale & CreditFacility roles | PUBLIC_ROLE          |
| **Floor.sell()**                  | Disabled (not opened)                        | PUBLIC_ROLE          |
| **CreditFacility.borrow()**       | Disabled                                     | PUBLIC_ROLE          |
| **CreditFacility.buyAndBorrow()** | Presale role only                            | PUBLIC_ROLE          |
| **Presale.buyPresale()**          | PUBLIC_ROLE                                  | N/A (presale closed) |
| **Buy Fee**                       | 0%                                           | 0.5%                 |
| **Borrow Fee**                    | 0%                                           | 6%                   |

---

## 1. Authorizer (AUT_Roles_v2)

### Overview

The Authorizer is the central access control contract for the entire workflow. It manages roles, role membership, and function-level permissions for all modules.

### Key Concepts

| Concept              | Value         | Description                                                    |
| -------------------- | ------------- | -------------------------------------------------------------- |
| `DEFAULT_ADMIN_ROLE` | `bytes32(0)`  | Has access to all functions; can manage all roles              |
| `PUBLIC_ROLE`        | `bytes32(1)`  | Grants access to anyone when added to a function's permissions |
| `BURN_ADMIN_ROLE`    | `0xfff...fff` | Immutable; used to permanently lock a role's admin             |

### All Permissioned Functions

| Function                                           | Description                                      |
| -------------------------------------------------- | ------------------------------------------------ |
| `createRole(string, bytes32, address[])`           | Create a new role with admin and initial members |
| `labelRole(bytes32, string)`                       | Update a role's display name                     |
| `addAccessPermission(address, bytes4, bytes32)`    | Grant a role access to a function                |
| `removeAccessPermission(address, bytes4, bytes32)` | Revoke a role's access to a function             |
| `createRoleAndAddAccessPermissions(...)`           | Create role and grant permissions in one call    |

**Note:** `transferAdminRole` and `burnRoleAdmin` use `onlyRole(getRoleAdmin(roleId_))` instead of `permissioned`.

### Presale Setup

**Initialization:**

```solidity
// Authorizer is initialized with the deployer as DEFAULT_ADMIN_ROLE
configData_ = abi.encode(deployer);
```

**No additional setup required** - the Authorizer is ready to use after initialization.

### Live Phase Transition

No changes needed to the Authorizer itself. All permission changes are made by calling the Authorizer's functions to update other modules' permissions.

---

## 2. Floor (Bonding Curve)

### Overview

The Floor contract is the primary issuance market implementing a discrete bonding curve. It handles buying and selling of issuance tokens (fTokens) against collateral tokens.

### All Permissioned Functions

#### From `IIssuanceBase_v2`

| Function                            | Description                             |
| ----------------------------------- | --------------------------------------- |
| `buy(uint256, uint256)`             | Buy issuance tokens for caller          |
| `buyFor(address, uint256, uint256)` | Buy issuance tokens for another address |
| `openBuy()`                         | Enable buying functionality             |
| `closeBuy()`                        | Disable buying functionality            |
| `setBuyFee(uint256)`                | Set buy fee in basis points             |

#### From `IRedeemingIssuanceBase_v2`

| Function                            | Description                             |
| ----------------------------------- | --------------------------------------- |
| `sell(uint256, uint256)`            | Sell issuance tokens for caller         |
| `sellTo(address, uint256, uint256)` | Sell issuance tokens to another address |
| `openSell()`                        | Enable selling functionality            |
| `closeSell()`                       | Disable selling functionality           |
| `setSellFee(uint256)`               | Set sell fee in basis points            |

#### From `IBC_Discrete_Redeeming_VirtualSupply_v1`

| Function                                              | Description                         |
| ----------------------------------------------------- | ----------------------------------- |
| `withdrawCollateralTo(uint256)`                       | Withdraw collateral (for lending)   |
| `depositCollateralFrom(uint256)`                      | Deposit collateral (loan repayment) |
| `reconfigureSegments(PackedSegment[], uint256, bool)` | Reconfigure bonding curve segments  |
| `setVirtualCollateralSupply(uint256)`                 | Set virtual collateral supply       |

#### From `IFloor_v1`

| Function              | Description                            |
| --------------------- | -------------------------------------- |
| `raiseFloor(uint256)` | Inject collateral to raise floor price |

### Presale Setup

#### Roles Created

| Role Name        | Granted To                    | Purpose                                            |
| ---------------- | ----------------------------- | -------------------------------------------------- |
| "Presale"        | Presale module address        | Allow presale to buy tokens                        |
| "CreditFacility" | CreditFacility module address | Allow credit facility to buy and manage collateral |

#### Permissions Granted

```solidity
// Create Presale role and grant buy permission
bytes32 presaleRole = authorizer.createRole(
    "Presale",
    authorizer.getAdminRole(),
    _toArray(presale_)
);
authorizer.addAccessPermission(
    floor_,
    IIssuanceBase_v2.buy.selector,
    presaleRole
);

// Create CreditFacility role and grant permissions
bytes32 creditFacilityRole = authorizer.createRole(
    "CreditFacility",
    authorizer.getAdminRole(),
    _toArray(creditFacility_)
);
authorizer.addAccessPermission(
    floor_,
    IIssuanceBase_v2.buy.selector,
    creditFacilityRole
);
authorizer.addAccessPermission(
    floor_,
    IBC_Discrete_Redeeming_VirtualSupply_v1.withdrawCollateralTo.selector,
    creditFacilityRole
);
authorizer.addAccessPermission(
    floor_,
    IBC_Discrete_Redeeming_VirtualSupply_v1.depositCollateralFrom.selector,
    creditFacilityRole
);
```

#### Initial State Configuration

```solidity
// Enable buying (restricted to role holders)
IFloor_v1(floor_).openBuy();

// Selling is NOT opened during presale
// Users cannot sell tokens until live phase

// Fee configuration for presale
// buyFee = 0 (set to 0.5% when live)
// sellFee = 80 bps (0.8%)
```

#### Presale Permissions Summary

| Function                | Presale Role | CreditFacility Role | PUBLIC_ROLE     |
| ----------------------- | ------------ | ------------------- | --------------- |
| `buy`                   | ✅           | ✅                  | ❌              |
| `buyFor`                | ❌           | ❌                  | ❌              |
| `sell`                  | ❌           | ❌                  | ❌ (not opened) |
| `sellTo`                | ❌           | ❌                  | ❌ (not opened) |
| `withdrawCollateralTo`  | ❌           | ✅                  | ❌              |
| `depositCollateralFrom` | ❌           | ✅                  | ❌              |

### Live Phase Transition

#### Fee Updates

```solidity
// Set live buy fee (0.5%)
IFloor_v1(floor_).setBuyFee(50);
```

#### Permission Changes

```solidity
bytes32 publicRole = authorizer.PUBLIC_ROLE();

// Enable public buying
authorizer.addAccessPermission(
    floor_,
    IIssuanceBase_v2.buy.selector,
    publicRole
);
authorizer.addAccessPermission(
    floor_,
    IIssuanceBase_v2.buyFor.selector,
    publicRole
);

// Enable public selling
authorizer.addAccessPermission(
    floor_,
    IRedeemingIssuanceBase_v2.sell.selector,
    publicRole
);
authorizer.addAccessPermission(
    floor_,
    IRedeemingIssuanceBase_v2.sellTo.selector,
    publicRole
);
```

#### State Changes

```solidity
// Enable selling functionality
IFloor_v1(floor_).openSell();
```

---

## 3. Presale Module

### Overview

The Presale module orchestrates presale buying with optional leverage loops, commission fees, and vesting. It integrates with the Floor for token issuance and the CreditFacility for leveraged positions.

### All Permissioned Functions

#### User Functions

| Function                                   | Description                                 |
| ------------------------------------------ | ------------------------------------------- |
| `buyPresale(uint256)`                      | Buy tokens without leverage                 |
| `buyPresaleWithLeverage(uint256, uint256)` | Buy tokens with leverage loops              |
| `claimAll(uint256)`                        | Claim all unlocked tranches from a position |

#### Admin Functions

| Function                                                      | Description                                         |
| ------------------------------------------------------------- | --------------------------------------------------- |
| `setPresaleState(PresaleState)`                               | Set presale state (NotOpen/Whitelist/Public/Closed) |
| `setCaps(uint256, uint256)`                                   | Set global and per-address deposit caps             |
| `setEndTimestamp(uint64)`                                     | Set presale end timestamp                           |
| `setBaseCommissionBpsAndPriceBreakpoints(uint16[], uint[][])` | Set commission fees and unlock prices               |
| `setCreditFacility(address)`                                  | Set credit facility address                         |
| `addToWhitelist(address[])`                                   | Add addresses to whitelist                          |
| `removeFromWhitelist(address[])`                              | Remove addresses from whitelist                     |

### Presale Setup

#### Roles Created

The Presale module itself is granted a role on other contracts (Floor, CreditFacility), but does not create roles for itself.

#### Permissions Granted

```solidity
bytes32 publicRole = authorizer.PUBLIC_ROLE();

// User functions - PUBLIC_ROLE (anyone can participate)
authorizer.addAccessPermission(
    presale_,
    IPresale_v1.buyPresale.selector,
    publicRole
);
authorizer.addAccessPermission(
    presale_,
    IPresale_v1.buyPresaleWithLeverage.selector,
    publicRole
);
authorizer.addAccessPermission(
    presale_,
    IPresale_v1.claimAll.selector,
    publicRole
);
```

#### Initial State Configuration

```solidity
// Set presale state to Public (or Whitelist for whitelist phase)
IPresale_v1(presale_).setPresaleState(IPresale_v1.PresaleState.Public);
```

#### Presale Permissions Summary

| Function                 | PUBLIC_ROLE |
| ------------------------ | ----------- |
| `buyPresale`             | ✅          |
| `buyPresaleWithLeverage` | ✅          |
| `claimAll`               | ✅          |

### Live Phase Transition

#### State Changes

```solidity
// Close the presale
IPresale_v1(presale_).setPresaleState(IPresale_v1.PresaleState.Closed);
```

#### Permission Changes

No permission changes needed. Once presale is closed:

- `buyPresale` and `buyPresaleWithLeverage` will revert due to state check
- `claimAll` remains accessible for users to claim their vested tokens

---

## 4. Credit Facility

### Overview

The Credit Facility allows users to borrow collateral tokens against locked issuance tokens. It supports leveraged positions through the `buyAndBorrow` function, which is used by the Presale module during presale.

### All Permissioned Functions

#### Entry Point Functions

| Function                                           | Description                           |
| -------------------------------------------------- | ------------------------------------- |
| `borrow(uint256)`                                  | Borrow against locked issuance tokens |
| `borrowFor(address, uint256)`                      | Borrow on behalf of another user      |
| `buyAndBorrow(uint256, uint256, bool)`             | Buy and create leveraged position     |
| `buyAndBorrowFor(address, uint256, uint256, bool)` | Buy and borrow for another user       |

#### Loan Management Functions

| Function                         | Description                         |
| -------------------------------- | ----------------------------------- |
| `repay(uint256, uint256)`        | Repay a loan (partial or full)      |
| `transferLoan(uint256, address)` | Transfer loan to another borrower   |
| `rebalanceLoan(uint256)`         | Rebalance loan after floor increase |
| `consolidateLoans(uint256[])`    | Merge multiple loans into one       |

#### Admin Functions

| Function                       | Description                       |
| ------------------------------ | --------------------------------- |
| `setLoanToValueRatio(uint256)` | Set LTV ratio in basis points     |
| `setMaxLeverage(uint256)`      | Set maximum leverage multiplier   |
| `setBorrowingFeeRate(uint256)` | Set borrowing fee in basis points |

### Presale Setup

#### Roles Created

The CreditFacility is granted a role on the Floor contract (see Floor section).

#### Permissions Granted

```solidity
bytes32 publicRole = authorizer.PUBLIC_ROLE();

// Entry point functions - NOT public during presale
// buyAndBorrow is accessible via Presale role only (granted to Presale module)

// Loan management functions - PUBLIC_ROLE (users manage their loans)
authorizer.addAccessPermission(
    creditFacility_,
    ICreditFacility_v1.repay.selector,
    publicRole
);
authorizer.addAccessPermission(
    creditFacility_,
    ICreditFacility_v1.transferLoan.selector,
    publicRole
);
authorizer.addAccessPermission(
    creditFacility_,
    ICreditFacility_v1.rebalanceLoan.selector,
    publicRole
);
authorizer.addAccessPermission(
    creditFacility_,
    ICreditFacility_v1.consolidateLoans.selector,
    publicRole
);
```

#### Presale Role on CreditFacility

```solidity
// Grant Presale module permission to call buyAndBorrow
authorizer.addAccessPermission(
    creditFacility_,
    ICreditFacility_v1.buyAndBorrow.selector,
    presaleRole  // The role granted to Presale module
);
```

#### Presale Permissions Summary

| Function           | Presale Role | PUBLIC_ROLE |
| ------------------ | ------------ | ----------- |
| `borrow`           | ❌           | ❌          |
| `borrowFor`        | ❌           | ❌          |
| `buyAndBorrow`     | ✅           | ❌          |
| `buyAndBorrowFor`  | ❌           | ❌          |
| `repay`            | ❌           | ✅          |
| `transferLoan`     | ❌           | ✅          |
| `rebalanceLoan`    | ❌           | ✅          |
| `consolidateLoans` | ❌           | ✅          |

### Live Phase Transition

#### Fee Updates

```solidity
// Set live borrowing fee (6%)
ICreditFacility_v1(creditFacility_).setBorrowingFeeRate(600);
```

#### Permission Changes

```solidity
bytes32 publicRole = authorizer.PUBLIC_ROLE();

// Enable public borrowing
authorizer.addAccessPermission(
    creditFacility_,
    ICreditFacility_v1.borrow.selector,
    publicRole
);
authorizer.addAccessPermission(
    creditFacility_,
    ICreditFacility_v1.borrowFor.selector,
    publicRole
);

// Enable public buyAndBorrow
authorizer.addAccessPermission(
    creditFacility_,
    ICreditFacility_v1.buyAndBorrow.selector,
    publicRole
);
authorizer.addAccessPermission(
    creditFacility_,
    ICreditFacility_v1.buyAndBorrowFor.selector,
    publicRole
);
```

---

## 5. Splitter Treasury

### Overview

The Splitter Treasury collects fees from the workflow and distributes them to configured recipients based on their share percentages.

### All Permissioned Functions

| Function                              | Description                         |
| ------------------------------------- | ----------------------------------- |
| `setRecipients(address[], uint256[])` | Set fee recipients and their shares |
| `setFloorFeePercentage(uint256)`      | Set floor fee percentage            |
| `setFloorFeeTreasury(address)`        | Set floor fee treasury address      |

### Presale Setup

#### Initial Configuration

```solidity
// Recipients and shares configured during initialization
address[] memory recipients = new address[](4);
recipients[0] = floorRaiseManager;  // 68%
recipients[1] = teamTreasury;       // 20%
recipients[2] = securityPool;       // 2%
recipients[3] = stakers;            // 10%

uint[] memory shares = new uint[](4);
shares[0] = 6800;
shares[1] = 2000;
shares[2] = 200;
shares[3] = 1000;
```

#### Presale Permissions Summary

No PUBLIC_ROLE permissions are granted. All functions remain admin-only.

### Live Phase Transition

No changes needed. The treasury continues to operate the same way, collecting and distributing fees.

---

## Summary: Phase Transition Checklist

### Complete Checklist: Presale → Live

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PHASE TRANSITION CHECKLIST                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. CLOSE PRESALE                                                           │
│     └─ presale.setPresaleState(PresaleState.Closed)                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  2. UPDATE FLOOR FEES                                                       │
│     └─ floor.setBuyFee(50)                    // 0.5% buy fee               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  3. UPDATE CREDIT FACILITY FEES                                             │
│     └─ creditFacility.setBorrowingFeeRate(600)  // 6% borrow fee            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  4. ENABLE PUBLIC TRADING ON FLOOR                                          │
│     ├─ authorizer.addAccessPermission(floor, buy.selector, PUBLIC_ROLE)     │
│     ├─ authorizer.addAccessPermission(floor, buyFor.selector, PUBLIC_ROLE)  │
│     ├─ authorizer.addAccessPermission(floor, sell.selector, PUBLIC_ROLE)    │
│     ├─ authorizer.addAccessPermission(floor, sellTo.selector, PUBLIC_ROLE)  │
│     └─ floor.openSell()                                                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  5. ENABLE PUBLIC CREDIT FACILITY                                           │
│     ├─ authorizer.addAccessPermission(cf, borrow.selector, PUBLIC_ROLE)     │
│     ├─ authorizer.addAccessPermission(cf, borrowFor.selector, PUBLIC_ROLE)  │
│     ├─ authorizer.addAccessPermission(cf, buyAndBorrow.selector, PUBLIC)    │
│     └─ authorizer.addAccessPermission(cf, buyAndBorrowFor.selector, PUBLIC) │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Permission Changes Summary

| Module             | Function          | Presale                       | Live                      |
| ------------------ | ----------------- | ----------------------------- | ------------------------- |
| **Floor**          | `buy`             | Presale, CreditFacility roles | + PUBLIC_ROLE             |
| **Floor**          | `buyFor`          | No roles                      | + PUBLIC_ROLE             |
| **Floor**          | `sell`            | Disabled                      | + PUBLIC_ROLE, openSell() |
| **Floor**          | `sellTo`          | Disabled                      | + PUBLIC_ROLE             |
| **CreditFacility** | `borrow`          | No roles                      | + PUBLIC_ROLE             |
| **CreditFacility** | `borrowFor`       | No roles                      | + PUBLIC_ROLE             |
| **CreditFacility** | `buyAndBorrow`    | Presale role                  | + PUBLIC_ROLE             |
| **CreditFacility** | `buyAndBorrowFor` | No roles                      | + PUBLIC_ROLE             |

### Fee Changes Summary

| Module             | Fee        | Presale       | Live          |
| ------------------ | ---------- | ------------- | ------------- |
| **Floor**          | Buy Fee    | 0%            | 0.5% (50 bps) |
| **Floor**          | Sell Fee   | 0.8% (80 bps) | 0.8% (80 bps) |
| **CreditFacility** | Borrow Fee | 0%            | 6% (600 bps)  |
