import type { MutableRefObject } from 'react'
import { toast } from 'sonner'

/** Tx hashes render with a wider window (10/8) than addresses (6/4). */
export function formatTxHash(hash: `0x${string}`): string {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`
}

/** Dismiss the toast referenced by `ref` (if any) and clear the ref. */
export function dismissLoadingToast(ref: MutableRefObject<string | number | null>): void {
  if (ref.current !== null) {
    toast.dismiss(ref.current)
    ref.current = null
  }
}

interface TxLifecycleParams {
  toastRef: MutableRefObject<string | number | null>
  /** "Confirm stake in wallet…", "Confirm harvest in wallet…", etc. */
  confirmMessage: string
  /** Subtitle shown under the loading toast. */
  confirmDescription: string
  /** "Step 2/2: " when an approval preceded this tx. */
  stepPrefix?: string
}

/**
 * Build the wallet → submitted → confirming toast lifecycle shared by every
 * write-side mutation in the SDK (stake / harvest / withdraw / rebalance /
 * trade / repay / loop). Pair with `chainedApprove` when an allowance step
 * precedes the action.
 */
export function buildTxLifecycle({
  toastRef,
  confirmMessage,
  confirmDescription,
  stepPrefix = '',
}: TxLifecycleParams) {
  return {
    onPendingWallet: () => {
      const msg = `${stepPrefix}${confirmMessage}`
      if (toastRef.current) {
        toast.loading(msg, {
          id: toastRef.current as string,
          description: confirmDescription,
        })
      } else {
        toastRef.current = toast.loading(msg, { description: confirmDescription })
      }
    },
    onSubmitted: (hash: `0x${string}`) => {
      toast.loading(`${stepPrefix}Transaction submitted, waiting for confirmation…`, {
        id: toastRef.current as string,
        description: `TX: ${formatTxHash(hash)}`,
      })
    },
    onPendingConfirmation: () => {
      toast.loading(`${stepPrefix}Confirming on chain…`, {
        id: toastRef.current as string,
        description: 'Almost there!',
      })
    },
  }
}
