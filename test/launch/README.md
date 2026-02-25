# Launch Stress Tests

This directory contains stress tests for the Launch → Configure flow, testing various configuration combinations that could break the system.

## Test Files

| File                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| `configs.ts`         | All test configuration scenarios                  |
| `runner.test.ts`     | Main test runner that executes all configs        |
| `edge-cases.test.ts` | Edge case tests (invalid inputs, boundary values) |
| `REPORT.md`          | Generated report of breaking configurations       |

## Configuration Categories

### Category 1: Module Combinations

Testing all 2^3 = 8 combinations of optional modules:

- Credit Facility (CF)
- Presale (P)
- Staking (S)

### Category 2: Permission Toggles

Testing all 2^4 = 16 combinations of permission flags:

- grantMinterRole
- openBuy
- openSell
- openBorrow

### Category 3: Staking Variants

- With/without strategies
- With/without openStaking
- With/without enableStakingAdmin

### Category 4: Edge Cases

- Zero values
- Maximum values
- Invalid addresses
- Missing required fields

## Running Tests

```bash
# Run all stress tests
bun test test/launch-stress-tests/

# Run specific test file
bun test test/launch-stress-tests/runner.test.ts

# Run with verbose output
bun test test/launch-stress-tests/ --verbose
```

## Report Generation

The `REPORT.md` file is updated automatically when tests run. It contains:

- Passing configurations
- Breaking configurations with error details
- Recommended fixes
