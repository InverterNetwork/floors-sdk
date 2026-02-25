/**
 * @description Test helpers index
 * Re-exports all test utilities for easy importing
 */

// Environment Loader
export type { TestAccounts, TestEnvironment } from './env-loader'
export { isTestEnvironmentAvailable, loadTestEnvironment } from './env-loader'

// Configuration
export {
  ANVIL_ADDRESSES,
  ANVIL_PRIVATE_KEYS,
  DEVNET_CONTRACTS,
  DEVNET_RPC_URL,
  devnetChain,
  GRAPHQL_URL,
  LOCAL_GRAPHQL_URL,
  LOCAL_RPC_URL,
  localAnvilChain,
} from './config'

// Fixtures
export type { SegmentConfig } from './fixtures'
export {
  createTestCreditFacilityConfig,
  createTestFloorConfig,
  createTestLaunchConfig,
  createTestPresaleConfig,
  createTestSegments,
  createTestTreasuryConfig,
  DEFAULT_CREDIT_FACILITY_CONFIG,
} from './fixtures'

// Clients
export type { AnvilAccount, ClientOptions, ClientPair } from './clients'
export {
  checkDevnetAvailability,
  checkLocalAvailability,
  checkLocalIndexerAvailability,
  createDevnetClients,
  createDevnetPublicClient,
  createDevnetWalletClient,
  createLocalClients,
  createLocalPublicClient,
  createLocalWalletClient,
  createTestPublicClient,
  createTestWalletClient,
  requireLocalDevEnvironment,
} from './clients'

// Deploy utilities
export type { TokenConfig } from './deploy'
export {
  DEFAULT_COLLATERAL_TOKEN_CONFIG,
  DEFAULT_ISSUANCE_TOKEN_CONFIG,
  deployERC20Issuance,
  deployTestTokens,
} from './deploy'

// Contract deployment script utilities
export type { DeploymentOptions } from './deploy-contracts'
export {
  CONTRACTS_DIR,
  DEPLOY_SCRIPT,
  ENV_FILE,
  getCollateralTokenFromEnv,
  getFloorFactoryFromEnv,
  getFloorFactoryFromIndexer,
  runDeploymentScript,
} from './deploy-contracts'
