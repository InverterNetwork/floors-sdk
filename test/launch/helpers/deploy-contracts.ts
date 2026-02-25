/**
 * @description Contract deployment utilities for testing
 * Runs the deploy-devnet.sh script and extracts deployed addresses
 *
 * NOTE: These utilities assume the local dev environment is already running.
 * Start it with `bun dev:local` before running tests.
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { Address } from 'viem'

import { fetchGlobalRegistry } from '../../../src/graphql/api/fetchers'

// =============================================================================
// Path Configuration
// =============================================================================

const CONTRACTS_DIR = resolve(__dirname, '../../../../contracts')
const DEPLOY_SCRIPT = resolve(CONTRACTS_DIR, 'script/deploy-devnet.sh')
const ENV_FILE = resolve(CONTRACTS_DIR, '.env')

// =============================================================================
// Environment File Helpers
// =============================================================================

/**
 * Reads the FLOOR_FACTORY address from contracts/.env
 * @deprecated Use fetchGlobalRegistry() from the SDK instead
 */
export function getFloorFactoryFromEnv(): Address | null {
  try {
    const envContent = readFileSync(ENV_FILE, 'utf-8')
    const match = envContent.match(/^FLOOR_FACTORY=(0x[a-fA-F0-9]{40})/m)
    if (match) {
      return match[1] as Address
    }
  } catch {
    // File doesn't exist or can't be read
  }
  return null
}

/**
 * Fetches the FloorFactory address from the GraphQL indexer
 * @param graphqlUrl - The GraphQL endpoint URL
 * @returns The FloorFactory address or null if not found
 */
export async function getFloorFactoryFromIndexer(graphqlUrl: string): Promise<Address | null> {
  const registry = await fetchGlobalRegistry()
  return registry?.floorFactoryAddress ?? null
}

/**
 * Reads the COLLATERAL_TOKEN_ADDRESS from contracts/.env
 */
export function getCollateralTokenFromEnv(): Address | null {
  try {
    const envContent = readFileSync(ENV_FILE, 'utf-8')
    const match = envContent.match(/^COLLATERAL_TOKEN_ADDRESS=(0x[a-fA-F0-9]{40})/m)
    if (match) {
      return match[1] as Address
    }
  } catch {
    // File doesn't exist or can't be read
  }
  return null
}

// =============================================================================
// Deployment Script Execution
// =============================================================================

export interface DeploymentOptions {
  /** Run against local Anvil (default: true) */
  local?: boolean
  /**
   * Skip infrastructure deployment if FLOOR_FACTORY exists.
   * Default: auto-detect based on existing FLOOR_FACTORY
   */
  skipInfra?: boolean
  /**
   * Deploy only infrastructure (FloorFactory), skip workflow deployment.
   * Useful for SDK testing where tokens are deployed separately.
   * Default: true for local, false for remote
   */
  infraOnly?: boolean
  /** Timeout in milliseconds (default: 120000) */
  timeout?: number
}

/**
 * Runs the deploy-devnet.sh script to deploy contracts.
 *
 * NOTE: Assumes local Anvil is already running via `bun dev:local`.
 * Use `requireLocalDevEnvironment()` in beforeAll() to verify this.
 *
 * @param options - Deployment options
 * @returns The FLOOR_FACTORY address from the deployment
 * @throws If deployment fails or FLOOR_FACTORY is not found after deployment
 */
export function runDeploymentScript(options?: DeploymentOptions): Address {
  const { local = true } = options ?? {}
  const timeout = options?.timeout ?? 120_000

  console.log('\n=== Running deploy-devnet.sh ===')

  // Determine if we should skip infrastructure deployment
  const shouldSkipInfra = options?.skipInfra ?? getFloorFactoryFromEnv() !== null

  // For local deployment, default to infrastructure-only (SDK deploys tokens separately)
  const shouldInfraOnly = options?.infraOnly ?? local

  const flags: string[] = []
  if (local) {
    flags.push('--local')
  }
  if (shouldSkipInfra) {
    flags.push('--skip-infra')
    console.log('  Using existing FloorFactory (--skip-infra)')
  } else {
    console.log('  Running infrastructure deployment')
  }
  if (shouldInfraOnly && !shouldSkipInfra) {
    flags.push('--infra-only')
    console.log('  Infrastructure only (--infra-only)')
  }

  try {
    // When running locally without skip-infra, answer "n" to the prompt
    // asking whether to use existing FloorFactory
    const input = local && !shouldSkipInfra ? 'n\n' : undefined

    execSync(`${DEPLOY_SCRIPT} ${flags.join(' ')}`, {
      cwd: CONTRACTS_DIR,
      stdio: input ? ['pipe', 'inherit', 'inherit'] : 'inherit',
      input,
      timeout,
    })
    console.log('=== Deployment complete ===\n')
  } catch (error) {
    console.error('Deployment script failed:', error)
    throw error
  }

  // Get the FLOOR_FACTORY address from the .env file
  const floorFactory = getFloorFactoryFromEnv()
  if (!floorFactory) {
    throw new Error('FLOOR_FACTORY not found in contracts/.env after deployment')
  }

  console.log(`FloorFactory deployed at: ${floorFactory}`)
  return floorFactory
}

// =============================================================================
// Exported Constants
// =============================================================================

export { CONTRACTS_DIR, DEPLOY_SCRIPT, ENV_FILE }
