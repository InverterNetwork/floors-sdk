# Authorizer & Contract Function Glossary

Transcript-derived function list and notes for authorizer-related work.

## Floor Contract

- `setVirtualCollateralSupply`
- `reconfigureSegments`
- `withdrawCollateral`
- `depositCollateral`
- `raiseFloor` (floor elevation rights)
- `setFloorOppositePercentage`
- `setFloorOfTreasury`

## Credit Facility

- `setLoanToValueRatio` (LTV)
- `setMaxLeverage`
- `setBorrowingFeeRate`

## Presale

- `setPresaleDate`
- `setCreditFacility`
- `setCaps`
- `setBaseCommissionBps`
- `setPriceBreakpoints`
- `addToWhitelist`
- `removeFromWhitelist`

## Splitter Treasury

- `setRecipients`
- `setFloorOppositePercentage`
- `setFloorOfTreasury`

## Authorizer (Access Control)

- `createRole`
- `labelRole`
- `transferRoleAdmin`
- `burnRoleAdmin` (revoke/clear admin)
- `addAccessPermission`
- `removeAccessPermission`
- `createRoleAndAddAccessPermission`
- `grantRole`
- `revokeRole`
- `renounceRole`

## Notes

- Authorizer work is lowest priority; expose functions for admin panel usage. State visibility can come from the indexer.
- Abstract role-granting details from end users; admin UI can handle role flows separately.
