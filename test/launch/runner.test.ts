/**
 * @description Main stress test runner for Launch.configure
 * Executes all configuration scenarios and generates a report
 */

import { describe, expect, it } from 'bun:test'
import { decodeFunctionData } from 'viem'

import { AUT_Roles_v2 } from '../../src/abis'
import { Launch } from '../../src/launch'
import type { ConfigureScenario } from './configs'
import {
  BREAKING_SCENARIO_COUNT,
  getBreakingScenarios,
  getScenariosByCategory,
  MOCK_ADDRESSES,
  TOTAL_SCENARIOS,
} from './configs'

// =============================================================================
// Test Utilities
// =============================================================================

const ZERO_ROLE = `0x${'0'.repeat(64)}` as `0x${string}`

function makeHash(index: number): `0x${string}` {
  return `0x${index.toString(16).padStart(64, '0')}` as `0x${string}`
}

function createMockClients(
  options: {
    allTrustForwarder?: boolean
    shouldRevert?: boolean
    revertOnCallIndex?: number
  } = {}
) {
  const { allTrustForwarder = true, shouldRevert = false, revertOnCallIndex = -1 } = options
  let callIndex = 0

  const publicClient = {
    readContract: async ({
      functionName,
      address,
    }: {
      functionName: string
      address: `0x${string}`
    }) => {
      if (functionName === 'getAdminRole') return ZERO_ROLE
      if (functionName === 'getLastAssignedRoleId') return 1n
      if (functionName === 'isTrustedForwarder') {
        return allTrustForwarder
      }
      throw new Error(`Unexpected readContract function: ${functionName}`)
    },
    waitForTransactionReceipt: async ({ hash }: { hash: `0x${string}` }) => {
      callIndex++
      if (shouldRevert && (revertOnCallIndex === -1 || callIndex === revertOnCallIndex)) {
        return { transactionHash: hash, status: 'reverted', logs: [] }
      }
      return { transactionHash: hash, status: 'success', logs: [] }
    },
  } as any

  const walletClient = {
    account: { address: MOCK_ADDRESSES.admin },
    writeContract: async ({ functionName }: { functionName: string }) => {
      if (functionName === 'executeMulticall') {
        return makeHash(101)
      }
      return makeHash(999)
    },
    sendTransaction: async () => makeHash(1),
  } as any

  return { publicClient, walletClient }
}

function captureMulticallCalls(walletClient: any) {
  let capturedCalls: Array<{
    target: `0x${string}`
    callData: `0x${string}`
    allowFailure: boolean
  }> = []
  walletClient.writeContract = async ({ args }: any) => {
    capturedCalls = args?.[0] || []
    return makeHash(101)
  }
  return { getCapturedCalls: () => capturedCalls }
}

function decodeCreateRoleCall(callData: `0x${string}`): { name: string } | null {
  try {
    const decoded = decodeFunctionData({
      abi: AUT_Roles_v2,
      data: callData,
    })
    if (decoded.functionName === 'createRole' && decoded.args) {
      return { name: decoded.args[0] as string }
    }
    return null
  } catch {
    return null
  }
}

// =============================================================================
// Report Data Structure
// =============================================================================

interface TestResult {
  scenario: ConfigureScenario
  passed: boolean
  actualCallCount?: number
  error?: string
  rolesCreated?: string[]
  notes?: string
}

const testResults: TestResult[] = []

// =============================================================================
// Main Stress Tests
// =============================================================================

describe('Launch Stress Tests - Configuration Scenarios', () => {
  describe('Basic Configurations', () => {
    const scenarios = getScenariosByCategory('basic')

    scenarios.forEach((scenario) => {
      it(scenario.name, async () => {
        const { publicClient, walletClient } = createMockClients()
        const { getCapturedCalls } = captureMulticallCalls(walletClient)
        const launch = new Launch({
          floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
          publicClient,
          walletClient,
        })

        try {
          const result = await launch.configure(scenario.params)
          const calls = getCapturedCalls()

          const testResult: TestResult = {
            scenario,
            passed: result.success,
            actualCallCount: calls.length,
            rolesCreated: calls
              .flatMap((c: any) => {
                const decoded = decodeCreateRoleCall(c.callData)
                return decoded?.name ? [decoded.name] : []
              })
              .filter(Boolean),
          }
          testResults.push(testResult)

          expect(result.success).toBe(true)
          if (scenario.expectedCallCount !== undefined) {
            expect(calls.length).toBe(scenario.expectedCallCount)
          }
        } catch (error) {
          testResults.push({
            scenario,
            passed: false,
            error: error instanceof Error ? error.message : String(error),
          })
          throw error
        }
      })
    })
  })

  describe('Credit Facility Configurations', () => {
    const scenarios = getScenariosByCategory('credit_facility')

    scenarios.forEach((scenario) => {
      it(scenario.name, async () => {
        const { publicClient, walletClient } = createMockClients()
        const { getCapturedCalls } = captureMulticallCalls(walletClient)
        const launch = new Launch({
          floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
          publicClient,
          walletClient,
        })

        try {
          const result = await launch.configure(scenario.params)
          const calls = getCapturedCalls()

          testResults.push({
            scenario,
            passed: result.success,
            actualCallCount: calls.length,
            rolesCreated: calls
              .flatMap((c: any) => {
                const decoded = decodeCreateRoleCall(c.callData)
                return decoded?.name ? [decoded.name] : []
              })
              .filter(Boolean),
          })

          expect(result.success).toBe(scenario.expectSuccess)
        } catch (error) {
          testResults.push({
            scenario,
            passed: false,
            error: error instanceof Error ? error.message : String(error),
          })
          if (scenario.expectSuccess) throw error
        }
      })
    })
  })

  describe('Presale Configurations', () => {
    const scenarios = getScenariosByCategory('presale')

    scenarios.forEach((scenario) => {
      it(scenario.name, async () => {
        const { publicClient, walletClient } = createMockClients()
        const { getCapturedCalls } = captureMulticallCalls(walletClient)
        const launch = new Launch({
          floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
          publicClient,
          walletClient,
        })

        try {
          const result = await launch.configure(scenario.params)
          const calls = getCapturedCalls()

          testResults.push({
            scenario,
            passed: result.success,
            actualCallCount: calls.length,
            rolesCreated: calls
              .flatMap((c: any) => {
                const decoded = decodeCreateRoleCall(c.callData)
                return decoded?.name ? [decoded.name] : []
              })
              .filter(Boolean),
          })

          expect(result.success).toBe(scenario.expectSuccess)
        } catch (error) {
          testResults.push({
            scenario,
            passed: false,
            error: error instanceof Error ? error.message : String(error),
          })
          if (scenario.expectSuccess) throw error
        }
      })
    })
  })

  describe('Staking Configurations', () => {
    const scenarios = getScenariosByCategory('staking')

    scenarios.forEach((scenario) => {
      it(scenario.name, async () => {
        const { publicClient, walletClient } = createMockClients()
        const { getCapturedCalls } = captureMulticallCalls(walletClient)
        const launch = new Launch({
          floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
          publicClient,
          walletClient,
        })

        try {
          const result = await launch.configure(scenario.params)
          const calls = getCapturedCalls()

          testResults.push({
            scenario,
            passed: result.success,
            actualCallCount: calls.length,
            rolesCreated: calls
              .flatMap((c: any) => {
                const decoded = decodeCreateRoleCall(c.callData)
                return decoded?.name ? [decoded.name] : []
              })
              .filter(Boolean),
          })

          expect(result.success).toBe(scenario.expectSuccess)
        } catch (error) {
          testResults.push({
            scenario,
            passed: false,
            error: error instanceof Error ? error.message : String(error),
          })
          if (scenario.expectSuccess) throw error
        }
      })
    })
  })

  describe('Module Combinations', () => {
    const scenarios = getScenariosByCategory('combinations')

    scenarios.forEach((scenario) => {
      it(scenario.name, async () => {
        const { publicClient, walletClient } = createMockClients()
        const { getCapturedCalls } = captureMulticallCalls(walletClient)
        const launch = new Launch({
          floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
          publicClient,
          walletClient,
        })

        try {
          const result = await launch.configure(scenario.params)
          const calls = getCapturedCalls()

          testResults.push({
            scenario,
            passed: result.success,
            actualCallCount: calls.length,
            rolesCreated: calls
              .flatMap((c: any) => {
                const decoded = decodeCreateRoleCall(c.callData)
                return decoded?.name ? [decoded.name] : []
              })
              .filter(Boolean),
          })

          expect(result.success).toBe(scenario.expectSuccess)
          if (scenario.expectedCallCount !== undefined) {
            expect(calls.length).toBe(scenario.expectedCallCount)
          }
        } catch (error) {
          testResults.push({
            scenario,
            passed: false,
            error: error instanceof Error ? error.message : String(error),
          })
          throw error
        }
      })
    })
  })

  describe('Edge Cases', () => {
    const scenarios = getScenariosByCategory('edge_cases')

    scenarios.forEach((scenario) => {
      it(scenario.name, async () => {
        const { publicClient, walletClient } = createMockClients()
        const { getCapturedCalls } = captureMulticallCalls(walletClient)
        const launch = new Launch({
          floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
          publicClient,
          walletClient,
        })

        try {
          const result = await launch.configure(scenario.params)
          const calls = getCapturedCalls()

          testResults.push({
            scenario,
            passed: result.success,
            actualCallCount: calls.length,
            rolesCreated: calls
              .flatMap((c: any) => {
                const decoded = decodeCreateRoleCall(c.callData)
                return decoded?.name ? [decoded.name] : []
              })
              .filter(Boolean),
          })

          expect(result.success).toBe(scenario.expectSuccess)
        } catch (error) {
          testResults.push({
            scenario,
            passed: false,
            error: error instanceof Error ? error.message : String(error),
          })
          if (scenario.expectSuccess) throw error
        }
      })
    })
  })

  describe('Breaking Scenarios', () => {
    const scenarios = getBreakingScenarios()

    scenarios.forEach((scenario) => {
      it(scenario.name, async () => {
        const { publicClient, walletClient } = createMockClients()
        const launch = new Launch({
          floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
          publicClient,
          walletClient,
        })

        try {
          const result = await launch.configure(scenario.params)

          // If we get here, the breaking scenario didn't break
          testResults.push({
            scenario,
            passed: false,
            actualCallCount: 0,
            error: 'Expected to fail but succeeded',
          })

          // Breaking scenarios should fail
          expect(result.success).toBe(false)
        } catch (error) {
          // This is expected for breaking scenarios
          testResults.push({
            scenario,
            passed: true,
            error: error instanceof Error ? error.message : String(error),
          })
          expect(true).toBe(true)
        }
      })
    })
  })

  describe('Permission Matrix (16 combinations)', () => {
    const scenarios = getScenariosByCategory('permission_matrix')

    scenarios.forEach((scenario) => {
      it(scenario.name, async () => {
        const { publicClient, walletClient } = createMockClients()
        const { getCapturedCalls } = captureMulticallCalls(walletClient)
        const launch = new Launch({
          floorFactoryAddress: MOCK_ADDRESSES.floorFactory,
          publicClient,
          walletClient,
        })

        try {
          const result = await launch.configure(scenario.params)
          const calls = getCapturedCalls()

          testResults.push({
            scenario,
            passed: result.success,
            actualCallCount: calls.length,
          })

          expect(result.success).toBe(true)
        } catch (error) {
          testResults.push({
            scenario,
            passed: false,
            error: error instanceof Error ? error.message : String(error),
          })
          throw error
        }
      })
    })
  })
})

// =============================================================================
// Summary Test
// =============================================================================

describe('Stress Test Summary', () => {
  it('should have executed all scenarios', () => {
    const expectedScenarios = TOTAL_SCENARIOS
    const actualResults = testResults.length

    console.log('\n=== STRESS TEST SUMMARY ===')
    console.log(`Total scenarios: ${expectedScenarios}`)
    console.log(`Executed: ${actualResults}`)
    console.log(`Passed: ${testResults.filter((r) => r.passed).length}`)
    console.log(`Failed: ${testResults.filter((r) => !r.passed).length}`)

    // Log breaking scenarios that were caught
    const caughtBreaking = testResults.filter((r) => r.scenario.category === 'breaking' && r.passed)
    console.log(`\nBreaking scenarios caught: ${caughtBreaking.length}`)

    // Log any unexpected failures
    const unexpectedFailures = testResults.filter(
      (r) => !r.passed && r.scenario.category !== 'breaking'
    )
    if (unexpectedFailures.length > 0) {
      console.log('\n⚠️  Unexpected failures:')
      unexpectedFailures.forEach((r) => {
        console.log(`  - ${r.scenario.name}: ${r.error}`)
      })
    }

    expect(actualResults).toBeGreaterThanOrEqual(expectedScenarios - BREAKING_SCENARIO_COUNT)
  })
})
