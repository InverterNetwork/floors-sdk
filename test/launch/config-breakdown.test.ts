/**
 * @description Comprehensive configuration breakdown tests
 * Tests all possible configuration combinations to identify what breaks the flow
 */

import { afterAll, beforeAll, describe, it } from 'bun:test'
import { type Address, decodeEventLog } from 'viem'

import { ModuleFactory_v1 } from '../../src/abis'
import { type ConfigureParams, Launch } from '../../src/launch'
import type { PopPublicClient, PopWalletClient } from '../../src/types'
import {
  ANVIL_ADDRESSES,
  createLocalPublicClient,
  createLocalWalletClient,
  createTestLaunchConfig,
  createTestPresaleConfig,
  deployTestTokens,
  isTestEnvironmentAvailable,
  loadTestEnvironment,
} from './helpers/index'

// =============================================================================
// Test Result Types
// =============================================================================

interface ConfigTestResult {
  configName: string
  createSuccess: boolean
  createError?: string
  floorAddress?: Address
  modules: {
    authorizer?: Address
    creditFacility?: Address
    presale?: Address
    stakingManager?: Address
  }
  configureSuccess?: boolean
  configureError?: string
}

// =============================================================================
// Helper Functions
// =============================================================================

function parseModuleAddressesFromReceipt(
  receipt: Awaited<ReturnType<PopPublicClient['waitForTransactionReceipt']>>
): {
  authorizer: Address | undefined
  creditFacility: Address | undefined
  presale: Address | undefined
  stakingManager: Address | undefined
  floor: Address | undefined
} {
  const result = {
    authorizer: undefined as Address | undefined,
    creditFacility: undefined as Address | undefined,
    presale: undefined as Address | undefined,
    stakingManager: undefined as Address | undefined,
    floor: undefined as Address | undefined,
  }

  const moduleFactoryAddress = '0x79c230218626a33118b5bae08f28a5d342dccd36'

  for (const log of receipt.logs) {
    if (log.address.toLowerCase() !== moduleFactoryAddress) continue

    try {
      const decoded = decodeEventLog({
        abi: ModuleFactory_v1,
        data: log.data,
        topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
      })

      if (decoded.eventName === 'ModuleCreated' && decoded.args) {
        const args = decoded.args as any
        const moduleType = args.metadata_?.title?.toLowerCase() || ''
        const moduleAddress = args.module_ as Address

        console.log(`    Found module: ${moduleType} at ${moduleAddress}`)

        if (moduleType.includes('authorizer') || moduleType.includes('roles')) {
          result.authorizer = moduleAddress
        } else if (moduleType.includes('creditfacility')) {
          result.creditFacility = moduleAddress
        } else if (moduleType.includes('presale')) {
          result.presale = moduleAddress
        } else if (moduleType.includes('staking')) {
          result.stakingManager = moduleAddress
        } else if (moduleType.includes('floor')) {
          result.floor = moduleAddress
        }
      }
    } catch (e) {
      // Skip logs that don't match ModuleFactory ABI
    }
  }

  return result
}

// =============================================================================
// Configuration Matrix - All 2^3 = 8 combinations of optional modules
// =============================================================================

interface TestConfig {
  name: string
  includeCreditFacility: boolean
  includePresale: boolean
  includeStaking: boolean
  includeStrategies: boolean
  notes: string
}

const CONFIG_MATRIX: TestConfig[] = [
  // Base configuration
  {
    name: '000_base_only',
    includeCreditFacility: false,
    includePresale: false,
    includeStaking: false,
    includeStrategies: false,
    notes: 'Base modules only (Floor, Authorizer, Treasury)',
  },

  // Single module configurations
  {
    name: '001_cf_only',
    includeCreditFacility: true,
    includePresale: false,
    includeStaking: false,
    includeStrategies: false,
    notes: 'Credit Facility only',
  },
  {
    name: '010_presale_only',
    includeCreditFacility: false,
    includePresale: true,
    includeStaking: false,
    includeStrategies: false,
    notes: 'Presale only (no CF)',
  },
  {
    name: '100_staking_only',
    includeCreditFacility: false,
    includePresale: false,
    includeStaking: true,
    includeStrategies: false,
    notes: 'Staking only',
  },

  // Two module combinations
  {
    name: '011_cf_presale',
    includeCreditFacility: true,
    includePresale: true,
    includeStaking: false,
    includeStrategies: false,
    notes: 'CF + Presale',
  },
  {
    name: '101_cf_staking',
    includeCreditFacility: true,
    includePresale: false,
    includeStaking: true,
    includeStrategies: false,
    notes: 'CF + Staking',
  },
  {
    name: '110_presale_staking',
    includeCreditFacility: false,
    includePresale: true,
    includeStaking: true,
    includeStrategies: false,
    notes: 'Presale + Staking (no CF)',
  },

  // Three module combinations
  {
    name: '111_all_modules',
    includeCreditFacility: true,
    includePresale: true,
    includeStaking: true,
    includeStrategies: false,
    notes: 'All three optional modules',
  },
  {
    name: '111_all_with_strategies',
    includeCreditFacility: true,
    includePresale: true,
    includeStaking: true,
    includeStrategies: true,
    notes: 'All modules + strategies',
  },
]

// =============================================================================
// Main Tests
// =============================================================================

describe('Configuration Breakdown Analysis', () => {
  let testEnv: Awaited<ReturnType<typeof loadTestEnvironment>>
  let publicClient: PopPublicClient
  let walletClient: PopWalletClient
  let launch: Launch
  let issuanceToken: Address
  let collateralToken: Address
  const results: ConfigTestResult[] = []

  beforeAll(async () => {
    const available = await isTestEnvironmentAvailable()
    if (!available) {
      console.log('Local dev environment not available, skipping tests')
      return
    }

    testEnv = await loadTestEnvironment()
    publicClient = createLocalPublicClient()
    walletClient = createLocalWalletClient('DEPLOYER')

    console.log(`\nWallet client account: ${walletClient.account?.address}`)

    launch = new Launch({
      floorFactoryAddress: testEnv.floorFactoryAddress,
      publicClient,
      walletClient,
    })

    // Deploy test tokens
    const tokens = await deployTestTokens(walletClient, publicClient)
    issuanceToken = tokens.issuanceToken
    collateralToken = tokens.collateralToken

    console.log(`\n=== Configuration Breakdown Test Environment ===`)
    console.log(`Issuance Token: ${issuanceToken}`)
    console.log(`Collateral Token: ${collateralToken}`)
  })

  afterAll(() => {
    console.log('\n=== CONFIGURATION BREAKDOWN SUMMARY ===')
    console.table(
      results.map((r) => ({
        Config: r.configName,
        Create: r.createSuccess ? '✓' : '✗',
        Configure: r.configureSuccess ? '✓' : r.configureError ? '✗' : '-',
        Authorizer: r.modules.authorizer ? '✓' : '✗',
        CF: r.modules.creditFacility ? '✓' : r.modules.creditFacility === undefined ? 'N/A' : '✗',
        Presale: r.modules.presale ? '✓' : r.modules.presale === undefined ? 'N/A' : '✗',
        Staking: r.modules.stakingManager
          ? '✓'
          : r.modules.stakingManager === undefined
            ? 'N/A'
            : '✗',
        Error: (r.createError || r.configureError || '-').substring(0, 50),
      }))
    )

    const failures = results.filter((r) => !r.createSuccess)
    if (failures.length > 0) {
      console.log('\n⚠️  CREATE FAILURES (configs that break):')
      failures.forEach((r) => {
        console.log(`  - ${r.configName}: ${r.createError}`)
      })
    } else {
      console.log('\n✓ All configurations created successfully!')
    }
  })

  CONFIG_MATRIX.forEach((config) => {
    it(`should handle config: ${config.name}`, async () => {
      console.log(`\n--- Testing: ${config.name} ---`)
      console.log(`  Notes: ${config.notes}`)

      const result: ConfigTestResult = {
        configName: config.name,
        createSuccess: false,
        modules: {},
      }

      try {
        // Use the same createTestLaunchConfig helper as the integration tests
        const baseLaunchConfig = createTestLaunchConfig(issuanceToken, collateralToken, {
          initialAdmin: ANVIL_ADDRESSES.DEPLOYER,
          creditFacility: config.includeCreditFacility
            ? {
                loanToValueRatio: 9900,
                maxLeverage: 25,
                borrowingFeeRate: 0,
              }
            : undefined,
        })

        // Build config with optional modules using spread operator (LaunchConfig is readonly)
        const launchConfig = {
          ...baseLaunchConfig,
          ...(config.includePresale
            ? {
                presale: createTestPresaleConfig(
                  config.includeCreditFacility
                    ? (collateralToken as Address) // Use collateral token as CF address when CF is included
                    : ('0x0000000000000000000000000000000000000001' as Address),
                  {
                    baseCommissionBps: [BigInt(100), BigInt(200), BigInt(450)],
                    priceBreakpoints: [[BigInt(1e18)], [BigInt(1e18), BigInt(1e18)]],
                  }
                ),
              }
            : {}),
          ...(config.includeStaking
            ? {
                staking: {
                  performanceFeeBps: 2000,
                },
              }
            : {}),
        }

        console.log(`  Creating floor...`)
        const createResult = await launch.create(launchConfig)

        result.createSuccess = true
        result.floorAddress = createResult.floorAddress
        console.log(`  Floor created: ${createResult.floorAddress}`)
        console.log(`  Market ID: ${createResult.marketId}`)

        // Parse modules from receipt
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: createResult.transactionHash as `0x${string}`,
        })

        const modules = parseModuleAddressesFromReceipt(receipt)
        result.modules = {
          authorizer: modules.authorizer,
          creditFacility: modules.creditFacility,
          presale: modules.presale,
          stakingManager: modules.stakingManager,
        }

        console.log(`  Modules deployed:`)
        console.log(`    Authorizer: ${modules.authorizer || '✗ MISSING'}`)
        console.log(`    CreditFacility: ${modules.creditFacility || '✗ MISSING'}`)
        console.log(`    Presale: ${modules.presale || '✗ MISSING'}`)
        console.log(`    StakingManager: ${modules.stakingManager || '✗ MISSING'}`)

        // Configure the floor
        const configureParams: ConfigureParams = {
          floorAddress: createResult.floorAddress,
          authorizerAddress: modules.authorizer!,
          issuanceTokenAddress: issuanceToken,
          transactionForwarderAddress: testEnv.transactionForwarderAddress,
          grantMinterRole: true,
          openBuy: true,
          openSell: false,
        }

        if (config.includeCreditFacility && modules.creditFacility) {
          configureParams.creditFacilityAddress = modules.creditFacility
          configureParams.openBorrow = false
        }

        if (config.includePresale && modules.presale) {
          configureParams.presaleAddress = modules.presale
        }

        if (config.includeStaking && modules.stakingManager) {
          configureParams.stakingManagerAddress = modules.stakingManager
          configureParams.openStaking = true
          configureParams.enableStakingAdmin = true

          if (config.includeStrategies) {
            configureParams.strategyAddresses = [
              '0x5858585858585858585858585858585858585858' as Address,
            ]
          }
        }

        console.log(`  Configuring floor...`)
        const configureResult = await launch.configure(configureParams)
        result.configureSuccess = configureResult.success
        console.log(`  Configure: ${configureResult.success ? '✓ SUCCESS' : '✗ FAILED'}`)
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)
        result.createError = errorMsg
        console.log(`  ERROR: ${errorMsg}`)
      }

      results.push(result)
    })
  })
})
