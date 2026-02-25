/**
 * @description Configuration scenarios for launch stress tests
 * Based on create-market/page.tsx form structure
 */

import type { Address } from 'viem'

// =============================================================================
// Constants
// =============================================================================

export const MOCK_ADDRESSES = {
  floorFactory: '0x1111111111111111111111111111111111111111' as Address,
  authorizer: '0x2222222222222222222222222222222222222222' as Address,
  floor: '0x3333333333333333333333333333333333333333' as Address,
  issuanceToken: '0x4444444444444444444444444444444444444444' as Address,
  reserveToken: '0x4444444444444444444444444444444444444445' as Address,
  creditFacility: '0x5555555555555555555555555555555555555555' as Address,
  presale: '0x5656565656565656565656565656565656565656' as Address,
  stakingManager: '0x5757575757575757575757575757575757575757' as Address,
  strategy: '0x5858585858585858585858585858585858585858' as Address,
  transactionForwarder: '0x6666666666666666666666666666666666666666' as Address,
  treasury: '0x6767676767676767676767676767676767676767' as Address,
  admin: '0x7777777777777777777777777777777777777777' as Address,
  zero: '0x0000000000000000000000000000000000000000' as Address,
}

// =============================================================================
// Base Configurations
// =============================================================================

export const BASE_CONFIGURE_PARAMS = {
  floorAddress: MOCK_ADDRESSES.floor,
  authorizerAddress: MOCK_ADDRESSES.authorizer,
  issuanceTokenAddress: MOCK_ADDRESSES.issuanceToken,
  transactionForwarderAddress: MOCK_ADDRESSES.transactionForwarder,
  grantMinterRole: true,
  openBuy: true,
  openSell: false,
  openBorrow: false,
} as const

// =============================================================================
// Configuration Scenarios
// =============================================================================

export interface ConfigureScenario {
  name: string
  category: string
  description: string
  params: {
    floorAddress: Address
    authorizerAddress: Address
    issuanceTokenAddress: Address
    transactionForwarderAddress: Address
    creditFacilityAddress?: Address
    presaleAddress?: Address
    stakingManagerAddress?: Address
    strategyAddresses?: Address[]
    grantMinterRole?: boolean
    openBuy?: boolean
    openSell?: boolean
    openBorrow?: boolean
    openStaking?: boolean
    enableStakingAdmin?: boolean
  }
  expectSuccess: boolean
  expectedCallCount?: number
  notes?: string
}

export const CONFIGURE_SCENARIOS: ConfigureScenario[] = [
  // ===========================================================================
  // Category 1: Basic Configurations (no optional modules)
  // ===========================================================================
  {
    name: 'basic_minimal',
    category: 'basic',
    description: 'Minimal configuration - only grant minter role',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      openBuy: false,
      openSell: false,
    },
    expectSuccess: true,
    expectedCallCount: 1,
    notes: 'Single setMinter call',
  },
  {
    name: 'basic_buy_enabled',
    category: 'basic',
    description: 'Basic market with buying enabled',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      openBuy: true,
      openSell: false,
    },
    expectSuccess: true,
    expectedCallCount: 3,
    notes: 'setMinter + enableBuy + addAccessPermission(buy)',
  },
  {
    name: 'basic_buy_sell_enabled',
    category: 'basic',
    description: 'Basic market with buying and selling enabled',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      openBuy: true,
      openSell: true,
    },
    expectSuccess: true,
    expectedCallCount: 5,
    notes: 'setMinter + enableBuy + permission(buy) + enableSell + permission(sell)',
  },
  {
    name: 'basic_no_minter_role',
    category: 'basic',
    description: 'Market without minter role granted (will fail on buy)',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      grantMinterRole: false,
      openBuy: true,
    },
    expectSuccess: true,
    expectedCallCount: 2,
    notes: 'enableBuy + permission(buy) only - market cannot actually buy without minter',
  },
  {
    name: 'basic_all_disabled',
    category: 'basic',
    description: 'All permissions disabled',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      grantMinterRole: false,
      openBuy: false,
      openSell: false,
    },
    expectSuccess: true,
    expectedCallCount: 0,
    notes: 'Empty configuration - no calls made',
  },

  // ===========================================================================
  // Category 2: Credit Facility Configurations
  // ===========================================================================
  {
    name: 'cf_standard',
    category: 'credit_facility',
    description: 'Standard credit facility with role and permissions',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      openBorrow: false,
    },
    expectSuccess: true,
    expectedCallCount: 7,
    notes: 'CreditFacility role + buy/withdraw/deposit permissions',
  },
  {
    name: 'cf_with_public_borrow',
    category: 'credit_facility',
    description: 'Credit facility with public borrowing enabled',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      openBorrow: true,
    },
    expectSuccess: true,
    expectedCallCount: 8,
    notes: 'Adds PUBLIC_ROLE borrow/repay permissions',
  },
  {
    name: 'cf_no_address',
    category: 'credit_facility',
    description: 'Credit facility config without address (should skip CF setup)',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      openBorrow: true, // Should be ignored without address
    },
    expectSuccess: true,
    expectedCallCount: 3,
    notes: 'openBorrow ignored when creditFacilityAddress not provided',
  },

  // ===========================================================================
  // Category 3: Presale Configurations
  // ===========================================================================
  {
    name: 'presale_standalone',
    category: 'presale',
    description: 'Presale without credit facility',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      presaleAddress: MOCK_ADDRESSES.presale,
    },
    expectSuccess: true,
    expectedCallCount: 5,
    notes: 'Presale role + buy permission',
  },
  {
    name: 'presale_with_credit_facility',
    category: 'presale',
    description: 'Presale with credit facility (full integration)',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      presaleAddress: MOCK_ADDRESSES.presale,
    },
    expectSuccess: true,
    expectedCallCount: 9,
    notes: 'Includes setCreditFacility call and buyAndBorrow permission',
  },
  {
    name: 'presale_with_borrow',
    category: 'presale',
    description: 'Presale with credit facility and public borrowing',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      presaleAddress: MOCK_ADDRESSES.presale,
      openBorrow: true,
    },
    expectSuccess: true,
    expectedCallCount: 10,
    notes: 'Full presale + credit facility + public borrow',
  },

  // ===========================================================================
  // Category 4: Staking Configurations
  // ===========================================================================
  {
    name: 'staking_basic',
    category: 'staking',
    description: 'Basic staking with PUBLIC_ROLE permissions',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      openStaking: true,
      enableStakingAdmin: false,
    },
    expectSuccess: true,
    expectedCallCount: 8,
    notes: 'StakingManager role + stake/harvest/withdraw/rebalance permissions',
  },
  {
    name: 'staking_with_admin',
    category: 'staking',
    description: 'Staking with admin permissions',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 11,
    notes: 'Adds addStrategy/removeStrategy/setPerformanceFee permissions',
  },
  {
    name: 'staking_with_strategies',
    category: 'staking',
    description: 'Staking with registered strategies',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      strategyAddresses: [MOCK_ADDRESSES.strategy],
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 15,
    notes: 'Creates StakingManager_Strategy role + deposit/withdraw permissions',
  },
  {
    name: 'staking_multiple_strategies',
    category: 'staking',
    description: 'Staking with multiple strategies',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      strategyAddresses: [
        MOCK_ADDRESSES.strategy,
        '0x5858585858585858585858585858585858585859' as Address,
        '0x585858585858585858585858585858585858585a' as Address,
      ],
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 21,
    notes: 'Strategy role + 3 strategies x 2 permissions each',
  },
  {
    name: 'staking_closed',
    category: 'staking',
    description: 'Staking without PUBLIC_ROLE (admin-only)',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      openStaking: false,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 8,
    notes: 'No stake/harvest/withdraw/rebalance PUBLIC_ROLE permissions',
  },

  // ===========================================================================
  // Category 5: Full Module Combinations (2^3 = 8 combinations)
  // ===========================================================================
  {
    name: 'combo_none',
    category: 'combinations',
    description: 'No optional modules',
    params: {
      ...BASE_CONFIGURE_PARAMS,
    },
    expectSuccess: true,
    expectedCallCount: 3,
    notes: 'Basic market only',
  },
  {
    name: 'combo_cf_only',
    category: 'combinations',
    description: 'Credit facility only',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
    },
    expectSuccess: true,
    expectedCallCount: 7,
    notes: 'CF role + permissions',
  },
  {
    name: 'combo_presale_only',
    category: 'combinations',
    description: 'Presale only',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      presaleAddress: MOCK_ADDRESSES.presale,
    },
    expectSuccess: true,
    expectedCallCount: 5,
    notes: 'Presale role + permissions',
  },
  {
    name: 'combo_staking_only',
    category: 'combinations',
    description: 'Staking only',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 13,
    notes: 'StakingManager role + all permissions + Floor collateral permissions',
  },
  {
    name: 'combo_cf_presale',
    category: 'combinations',
    description: 'Credit facility + presale',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      presaleAddress: MOCK_ADDRESSES.presale,
    },
    expectSuccess: true,
    expectedCallCount: 11,
    notes: 'CF + Presale roles and permissions + setCreditFacility',
  },
  {
    name: 'combo_cf_staking',
    category: 'combinations',
    description: 'Credit facility + staking',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 17,
    notes: 'CF + StakingManager roles and permissions',
  },
  {
    name: 'combo_presale_staking',
    category: 'combinations',
    description: 'Presale + staking',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      presaleAddress: MOCK_ADDRESSES.presale,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 15,
    notes: 'Presale + StakingManager roles and permissions',
  },
  {
    name: 'combo_all_modules',
    category: 'combinations',
    description: 'All modules enabled (CF + Presale + Staking)',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      presaleAddress: MOCK_ADDRESSES.presale,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      openBorrow: true,
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 23,
    notes: 'Full configuration - all roles and permissions',
  },
  {
    name: 'combo_all_with_strategies',
    category: 'combinations',
    description: 'All modules with multiple strategies',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      presaleAddress: MOCK_ADDRESSES.presale,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      strategyAddresses: [
        MOCK_ADDRESSES.strategy,
        '0x5858585858585858585858585858585858585859' as Address,
      ],
      openBorrow: true,
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 28,
    notes: 'Maximum complexity configuration',
  },

  // ===========================================================================
  // Category 6: Edge Cases (Potential Breaking Scenarios)
  // ===========================================================================
  {
    name: 'edge_cf_no_borrow_but_cf_address',
    category: 'edge_cases',
    description: 'Credit facility address provided but openBorrow=false',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.creditFacility,
      openBorrow: false,
    },
    expectSuccess: true,
    expectedCallCount: 7,
    notes: 'CF role created but no PUBLIC_ROLE borrow permissions',
  },
  {
    name: 'edge_presale_no_cf',
    category: 'edge_cases',
    description: 'Presale enabled but no credit facility (leveraged presale needs CF)',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      presaleAddress: MOCK_ADDRESSES.presale,
    },
    expectSuccess: true,
    expectedCallCount: 5,
    notes: 'Presale works without CF for non-leveraged purchases',
  },
  {
    name: 'edge_staking_no_strategy',
    category: 'edge_cases',
    description: 'Staking enabled without strategy addresses',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: true,
    expectedCallCount: 11,
    notes: 'StakingManager deployed but needs strategy added later',
  },
  {
    name: 'edge_openBorrow_without_cf',
    category: 'edge_cases',
    description: 'openBorrow=true but no credit facility address',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      openBorrow: true,
    },
    expectSuccess: true,
    expectedCallCount: 3,
    notes: 'openBorrow silently ignored without CF address',
  },
  {
    name: 'edge_all_false_flags',
    category: 'edge_cases',
    description: 'All optional flags set to false',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      grantMinterRole: false,
      openBuy: false,
      openSell: false,
      openBorrow: false,
      openStaking: false,
      enableStakingAdmin: false,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
    },
    expectSuccess: true,
    expectedCallCount: 3,
    notes: 'Only StakingManager role created, no permissions',
  },

  // ===========================================================================
  // Category 7: Breaking Scenarios (Should Fail or Have Issues)
  // ===========================================================================
  {
    name: 'break_invalid_cf_address',
    category: 'breaking',
    description: 'Invalid credit facility address (not a contract)',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      creditFacilityAddress: MOCK_ADDRESSES.zero,
    },
    expectSuccess: false,
    notes: 'BREAKING: Zero address will fail on-chain',
  },
  {
    name: 'break_invalid_presale_address',
    category: 'breaking',
    description: 'Invalid presale address (not a contract)',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      presaleAddress: MOCK_ADDRESSES.zero,
    },
    expectSuccess: false,
    notes: 'BREAKING: Zero address will fail on-chain',
  },
  {
    name: 'break_invalid_staking_address',
    category: 'breaking',
    description: 'Invalid staking manager address (not a contract)',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      stakingManagerAddress: MOCK_ADDRESSES.zero,
    },
    expectSuccess: false,
    notes: 'BREAKING: Zero address will fail on-chain',
  },
  {
    name: 'break_invalid_strategy_address',
    category: 'breaking',
    description: 'Invalid strategy address in list',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      stakingManagerAddress: MOCK_ADDRESSES.stakingManager,
      strategyAddresses: [MOCK_ADDRESSES.zero],
      openStaking: true,
      enableStakingAdmin: true,
    },
    expectSuccess: false,
    notes: 'BREAKING: Zero address strategy will fail',
  },
  {
    name: 'break_missing_authorizer',
    category: 'breaking',
    description: 'Missing authorizer address',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      authorizerAddress: MOCK_ADDRESSES.zero,
    },
    expectSuccess: false,
    notes: 'BREAKING: Cannot create roles without authorizer',
  },
  {
    name: 'break_missing_issuance_token',
    category: 'breaking',
    description: 'Missing issuance token address',
    params: {
      ...BASE_CONFIGURE_PARAMS,
      issuanceTokenAddress: MOCK_ADDRESSES.zero,
    },
    expectSuccess: false,
    notes: 'BREAKING: Cannot grant minter role without token',
  },
]

// =============================================================================
// Permission Toggle Matrix (2^4 = 16 combinations)
// =============================================================================

export function generatePermissionMatrix(): ConfigureScenario[] {
  const scenarios: ConfigureScenario[] = []
  const _flags = [
    { name: 'grantMinterRole', values: [true, false] },
    { name: 'openBuy', values: [true, false] },
    { name: 'openSell', values: [true, false] },
    { name: 'openBorrow', values: [true, false] },
  ]
  void _flags

  let index = 0
  for (const grantMinterRole of [true, false]) {
    for (const openBuy of [true, false]) {
      for (const openSell of [true, false]) {
        for (const openBorrow of [true, false]) {
          index++
          scenarios.push({
            name: `perm_matrix_${index.toString().padStart(2, '0')}`,
            category: 'permission_matrix',
            description: `grantMinterRole=${grantMinterRole}, openBuy=${openBuy}, openSell=${openSell}, openBorrow=${openBorrow}`,
            params: {
              ...BASE_CONFIGURE_PARAMS,
              grantMinterRole,
              openBuy,
              openSell,
              openBorrow: openBorrow && openBorrow, // openBorrow only matters with CF
            },
            expectSuccess: true,
            notes: `Flags: ${
              [
                grantMinterRole ? 'minter' : '',
                openBuy ? 'buy' : '',
                openSell ? 'sell' : '',
                openBorrow ? 'borrow' : '',
              ]
                .filter(Boolean)
                .join(', ') || 'none'
            }`,
          })
        }
      }
    }
  }

  return scenarios
}

// Add permission matrix scenarios
CONFIGURE_SCENARIOS.push(...generatePermissionMatrix())

// =============================================================================
// Export Helpers
// =============================================================================

export function getScenariosByCategory(category: string): ConfigureScenario[] {
  return CONFIGURE_SCENARIOS.filter((s) => s.category === category)
}

export function getBreakingScenarios(): ConfigureScenario[] {
  return CONFIGURE_SCENARIOS.filter((s) => s.category === 'breaking')
}

export function getScenariosByExpectation(expectSuccess: boolean): ConfigureScenario[] {
  return CONFIGURE_SCENARIOS.filter((s) => s.expectSuccess === expectSuccess)
}

export const TOTAL_SCENARIOS = CONFIGURE_SCENARIOS.length
export const BREAKING_SCENARIO_COUNT = getBreakingScenarios().length
