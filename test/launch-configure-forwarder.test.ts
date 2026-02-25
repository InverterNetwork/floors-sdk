import { describe, expect, it } from 'bun:test'
import type { Address, Hex } from 'viem'

import { Launch } from '../src/launch'

const ZERO_ROLE = `0x${'0'.repeat(64)}` as Hex

function makeHash(index: number): `0x${string}` {
  return `0x${index.toString(16).padStart(64, '0')}` as `0x${string}`
}

describe('#Launch.configure forwarder behavior', () => {
  const floorFactoryAddress = '0x1111111111111111111111111111111111111111' as Address
  const authorizerAddress = '0x2222222222222222222222222222222222222222' as Address
  const floorAddress = '0x3333333333333333333333333333333333333333' as Address
  const issuanceTokenAddress = '0x4444444444444444444444444444444444444444' as Address
  const creditFacilityAddress = '0x5555555555555555555555555555555555555555' as Address
  const transactionForwarderAddress = '0x6666666666666666666666666666666666666666' as Address
  const account = '0x7777777777777777777777777777777777777777' as Address

  it('falls back to direct calls when a target does not trust the forwarder', async () => {
    const sentTargets: Address[] = []
    let writeContractCalls = 0

    const publicClient = {
      readContract: async ({
        functionName,
        address,
      }: {
        functionName: string
        address: Address
      }) => {
        if (functionName === 'getAdminRole') return ZERO_ROLE
        if (functionName === 'getLastAssignedRoleId') return 1n
        if (functionName === 'isTrustedForwarder') {
          return address !== issuanceTokenAddress
        }
        throw new Error(`Unexpected readContract function: ${functionName}`)
      },
      waitForTransactionReceipt: async ({ hash }: { hash: `0x${string}` }) => ({
        transactionHash: hash,
        status: 'success',
      }),
    } as any

    const walletClient = {
      account: { address: account },
      writeContract: async () => {
        writeContractCalls++
        return makeHash(999)
      },
      sendTransaction: async ({ to }: { to: Address }) => {
        sentTargets.push(to)
        return makeHash(sentTargets.length)
      },
    } as any

    const launch = new Launch({
      floorFactoryAddress,
      publicClient,
      walletClient,
    })

    const result = await launch.configure({
      floorAddress,
      authorizerAddress,
      issuanceTokenAddress,
      transactionForwarderAddress,
      creditFacilityAddress,
      openBuy: false,
      openSell: false,
      openBorrow: false,
    })

    expect(writeContractCalls).toBe(0)
    expect(sentTargets.length).toBe(5)
    expect(result.success).toBe(true)
    expect(result.callResults.length).toBe(5)
  })

  it('uses forwarder multicall when all targets trust the forwarder', async () => {
    let writeContractCalls = 0
    let sendTransactionCalls = 0

    const publicClient = {
      readContract: async ({ functionName }: { functionName: string }) => {
        if (functionName === 'getAdminRole') return ZERO_ROLE
        if (functionName === 'getLastAssignedRoleId') return 1n
        if (functionName === 'isTrustedForwarder') return true
        throw new Error(`Unexpected readContract function: ${functionName}`)
      },
      waitForTransactionReceipt: async ({ hash }: { hash: `0x${string}` }) => ({
        transactionHash: hash,
        status: 'success',
      }),
    } as any

    const walletClient = {
      account: { address: account },
      writeContract: async () => {
        writeContractCalls++
        return makeHash(1)
      },
      sendTransaction: async () => {
        sendTransactionCalls++
        return makeHash(2)
      },
    } as any

    const launch = new Launch({
      floorFactoryAddress,
      publicClient,
      walletClient,
    })

    const result = await launch.configure({
      floorAddress,
      authorizerAddress,
      issuanceTokenAddress,
      transactionForwarderAddress,
      openBuy: false,
      openSell: false,
      openBorrow: false,
      grantMinterRole: true,
    })

    expect(writeContractCalls).toBe(1)
    expect(sendTransactionCalls).toBe(0)
    expect(result.success).toBe(true)
  })
})
