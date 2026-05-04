import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import type { TransactionReceipt } from 'viem'
import { maxUint256 } from 'viem'

const toastCalls: Array<{ kind: string; args: unknown[] }> = []
const fakeToast = {
  loading: mock((...args: unknown[]) => {
    toastCalls.push({ kind: 'loading', args })
    return 'toast-id'
  }),
  dismiss: mock((...args: unknown[]) => {
    toastCalls.push({ kind: 'dismiss', args })
  }),
}

mock.module('sonner', () => ({ toast: fakeToast }))

// Imported after the module mock so the helper picks up `fakeToast`.
const { chainedApprove } = await import('../../src/client/utils/chained-approve')

afterEach(() => {
  toastCalls.length = 0
  fakeToast.loading.mockClear()
  fakeToast.dismiss.mockClear()
})

beforeEach(() => {
  toastCalls.length = 0
})

function fakeReceipt(status: 'success' | 'reverted'): TransactionReceipt {
  return { status } as TransactionReceipt
}

describe('chainedApprove', () => {
  it('approves with maxUint256, dismisses the loading toast, and returns the receipt', async () => {
    const ref = { current: null as string | number | null }
    const receipt = fakeReceipt('success')
    const mutateAsync = mock(async (params: { amount: bigint }) => {
      expect(params.amount).toBe(maxUint256)
      return receipt
    })

    const result = await chainedApprove({
      mutation: { mutateAsync } as Parameters<typeof chainedApprove>[0]['mutation'],
      tokenSymbol: 'USDC',
      purpose: 'for trading',
      loadingToastRef: ref,
    })

    expect(result).toBe(receipt)
    expect(mutateAsync).toHaveBeenCalledTimes(1)
    expect(ref.current).toBeNull()
    // Final state should leave no live toast
    expect(toastCalls.some((c) => c.kind === 'dismiss')).toBe(true)
  })

  it('throws and dismisses when the approval reverts on-chain', async () => {
    const ref = { current: null as string | number | null }
    const mutateAsync = mock(async () => fakeReceipt('reverted'))

    await expect(
      chainedApprove({
        mutation: { mutateAsync } as Parameters<typeof chainedApprove>[0]['mutation'],
        tokenSymbol: 'USDC',
        purpose: 'for trading',
        loadingToastRef: ref,
      })
    ).rejects.toThrow('Approval transaction reverted on chain.')
    expect(ref.current).toBeNull()
  })

  it('propagates wallet rejection errors from mutateAsync', async () => {
    const ref = { current: null as string | number | null }
    const mutateAsync = mock(async () => {
      throw new Error('User rejected the request')
    })

    await expect(
      chainedApprove({
        mutation: { mutateAsync } as Parameters<typeof chainedApprove>[0]['mutation'],
        tokenSymbol: 'USDC',
        purpose: 'for trading',
        loadingToastRef: ref,
      })
    ).rejects.toThrow('User rejected the request')
  })

  it('respects a custom totalSteps in the toast title', async () => {
    const ref = { current: null as string | number | null }
    const mutateAsync = mock(async () => fakeReceipt('success'))

    await chainedApprove({
      mutation: { mutateAsync } as Parameters<typeof chainedApprove>[0]['mutation'],
      tokenSymbol: 'WAVAX',
      purpose: 'for credit facility',
      loadingToastRef: ref,
      totalSteps: 3,
    })

    const firstLoading = toastCalls.find((c) => c.kind === 'loading')
    expect(firstLoading).toBeDefined()
    expect(String(firstLoading!.args[0])).toContain('Step 1/3')
  })
})
