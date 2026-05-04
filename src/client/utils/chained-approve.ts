import type { MutableRefObject } from 'react'
import { toast } from 'sonner'
import type { TransactionReceipt } from 'viem'
import { maxUint256 } from 'viem'

interface ChainedApproveOptions {
  /** The approve mutation — must support mutateAsync with `{ amount, lifecycle }`. */
  mutation: {
    mutateAsync: (params: {
      amount: bigint
      lifecycle?: {
        onSubmitted?: (hash: `0x${string}`) => void
        onPendingConfirmation?: () => void
        onConfirmed?: () => void
      }
    }) => Promise<TransactionReceipt>
  }
  /** Token symbol shown in the toast title (e.g. "USDC"). */
  tokenSymbol: string
  /** Purpose phrase shown in the toast description (e.g. "for trading", "for credit facility"). */
  purpose: string
  /** Shared ref to the loading-toast ID — reused by the execute step that follows. */
  loadingToastRef: MutableRefObject<string | number | null>
  /** Total steps in the multi-step flow (default: 2 → "Step 1/2: …"). */
  totalSteps?: number
}

/**
 * Chains an ERC-20 max-approval as "Step 1/N" of a multi-step transaction flow.
 *
 * - Shows "Step 1/N" toast sequencing
 * - Calls `mutation.mutateAsync` with lifecycle callbacks
 * - Validates receipt status, throws on revert
 * - Returns the receipt on success
 *
 * Callers should catch errors (user rejection, revert) and handle them.
 */
export async function chainedApprove({
  mutation,
  tokenSymbol,
  purpose,
  loadingToastRef,
  totalSteps = 2,
}: ChainedApproveOptions): Promise<TransactionReceipt> {
  const stepLabel = `Step 1/${totalSteps}`

  loadingToastRef.current = toast.loading(`${stepLabel}: Confirm approval in wallet...`, {
    description: `Approving ${tokenSymbol} ${purpose}`,
  })

  const receipt = await mutation.mutateAsync({
    amount: maxUint256,
    lifecycle: {
      onSubmitted: (hash: `0x${string}`) => {
        toast.loading(`${stepLabel}: Approval submitted, waiting for confirmation...`, {
          id: loadingToastRef.current as string,
          description: `TX: ${hash.slice(0, 10)}...${hash.slice(-8)}`,
        })
      },
      onPendingConfirmation: () => {
        toast.loading(`${stepLabel}: Confirming approval on chain...`, {
          id: loadingToastRef.current as string,
        })
      },
      onConfirmed: () => {
        if (loadingToastRef.current !== null) {
          toast.dismiss(loadingToastRef.current)
          loadingToastRef.current = null
        }
      },
    },
  })

  if (receipt.status !== 'success') {
    if (loadingToastRef.current !== null) {
      toast.dismiss(loadingToastRef.current)
      loadingToastRef.current = null
    }
    throw new Error('Approval transaction reverted on chain.')
  }

  if (loadingToastRef.current !== null) {
    toast.dismiss(loadingToastRef.current)
    loadingToastRef.current = null
  }

  return receipt
}
