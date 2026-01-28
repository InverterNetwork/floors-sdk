/**
 * @description Contract deployment utilities for testing
 * Runs the deploy-devnet.sh script and extracts deployed addresses
 */

import { execSync, spawn } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { Address } from 'viem'

// =============================================================================
// Path Configuration
// =============================================================================

const CONTRACTS_DIR = resolve(__dirname, '../../../../contracts')
const DEPLOY_SCRIPT = resolve(CONTRACTS_DIR, 'script/deploy-devnet.sh')
const ENV_FILE = resolve(CONTRACTS_DIR, '.env')
const LOCAL_RPC_URL = 'http://localhost:8545'

// =============================================================================
// Environment File Helpers
// =============================================================================

/**
 * Reads the FLOOR_FACTORY address from contracts/.env
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
// Anvil Management
// =============================================================================

let anvilProcess: ReturnType<typeof spawn> | null = null

/**
 * Starts a local Anvil instance
 */
export function startAnvil(): void {
  if (anvilProcess) {
    console.log('  Anvil already running')
    return
  }

  console.log('  Starting Anvil...')
  anvilProcess = spawn('anvil', ['--host', '0.0.0.0', '--port', '8545'], {
    stdio: 'ignore',
    detached: true,
  })

  // Wait for Anvil to be ready
  const maxAttempts = 20
  for (let i = 0; i < maxAttempts; i++) {
    try {
      execSync(
        `curl -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' ${LOCAL_RPC_URL}`,
        { stdio: 'ignore' }
      )
      console.log('  Anvil started successfully')
      return
    } catch {
      execSync('sleep 0.5')
    }
  }

  throw new Error('Failed to start Anvil')
}

/**
 * Stops the local Anvil instance
 */
export function stopAnvil(): void {
  if (anvilProcess) {
    console.log('  Stopping Anvil...')
    anvilProcess.kill()
    anvilProcess = null
  }
}

// =============================================================================
// Deployment Script Execution
// =============================================================================

export interface DeploymentOptions {
  /** Run against local Anvil (default: true) */
  local?: boolean
  /**
   * Skip infrastructure deployment if FLOOR_FACTORY exists.
   * Note: When running locally, this should typically be false since local Anvil starts fresh.
   * Default: false for local, auto-detect for remote
   */
  skipInfra?: boolean
  /**
   * Deploy only infrastructure (FloorFactory), skip workflow deployment.
   * Useful for SDK testing where tokens are deployed separately.
   * Default: true for local, false for remote
   */
  infraOnly?: boolean
  /** Timeout in milliseconds (default: 300000 for local, 120000 for remote) */
  timeout?: number
}

/**
 * Runs the deploy-devnet.sh script to deploy contracts
 *
 * @param options - Deployment options
 * @returns The FLOOR_FACTORY address from the deployment
 * @throws If deployment fails or FLOOR_FACTORY is not found after deployment
 */
export function runDeploymentScript(options?: DeploymentOptions): Address {
  const { local = true } = options ?? {}
  const timeout = options?.timeout ?? (local ? 300_000 : 120_000)

  console.log('\n=== Running deploy-devnet.sh ===')

  // Determine if we should skip infrastructure deployment
  // For local Anvil, default to full deployment since it starts fresh
  // For remote, auto-detect based on existing FLOOR_FACTORY
  const shouldSkipInfra = options?.skipInfra ?? (!local && getFloorFactoryFromEnv() !== null)

  // For local deployment, default to infrastructure-only (SDK deploys tokens separately)
  const shouldInfraOnly = options?.infraOnly ?? local

  // For local deployment, start Anvil first
  if (local && !shouldSkipInfra) {
    console.log('  Setting up local Anvil environment...')
    startAnvil()
  }

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

export { CONTRACTS_DIR, DEPLOY_SCRIPT, ENV_FILE, LOCAL_RPC_URL }
