'use client'

import { useCallback, useRef, useState } from 'react'
import type { TransactionReceipt } from 'viem'

import type { TransactionLifecycleCallbacks, TransactionStage } from '../../presale'

export interface UseTransactionToastOptions {
  /** Messages for each stage */
  messages?: {
    pendingWallet?: string
    submitted?: string
    pendingConfirmation?: string
    confirmed?: string
    failed?: string
    cancelled?: string
  }
  /** Toast functions from your toast library */
  toast: {
    loading: (message: string, options?: { id?: string }) => string | number
    success: (message: string, options?: { id?: string }) => void
    error: (message: string, options?: { id?: string }) => void
    dismiss: (id: string | number) => void
  }
  /** Optional chain ID for explorer links */
  chainId?: number
}

export interface UseTransactionToastReturn {
  /** Current transaction stage */
  stage: TransactionStage
  /** Current transaction hash (if available) */
  txHash: `0x${string}` | null
  /** Whether a transaction is in progress */
  isProcessing: boolean
  /** Lifecycle callbacks to pass to SDK methods */
  lifecycle: TransactionLifecycleCallbacks
  /** Reset the state */
  reset: () => void
}

/**
 * @description Hook to manage multi-stage transaction toasts
 * @example
 * ```tsx
 * const { lifecycle, isProcessing } = useTransactionToast({
 *   messages: {
 *     pendingWallet: 'Confirm in wallet...',
 *     pendingConfirmation: 'Waiting for confirmation...',
 *     confirmed: 'Purchase successful!',
 *   },
 *   toast,
 * })
 *
 * await buyPresale({ depositAmount, lifecycle })
 * ```
 */
export const useTransactionToast = ({
  messages = {},
  toast,
}: UseTransactionToastOptions): UseTransactionToastReturn => {
  const [stage, setStage] = useState<TransactionStage>('idle')
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null)
  const toastIdRef = useRef<string | number | null>(null)

  const {
    pendingWallet = 'Confirm in wallet...',
    submitted = 'Transaction submitted',
    pendingConfirmation = 'Waiting for confirmation...',
    confirmed = 'Transaction confirmed!',
    failed = 'Transaction failed',
    cancelled = 'Transaction cancelled',
  } = messages

  const dismissCurrentToast = useCallback(() => {
    if (toastIdRef.current !== null) {
      toast.dismiss(toastIdRef.current)
      toastIdRef.current = null
    }
  }, [toast])

  const reset = useCallback(() => {
    dismissCurrentToast()
    setStage('idle')
    setTxHash(null)
  }, [dismissCurrentToast])

  const lifecycle: TransactionLifecycleCallbacks = {
    onPendingWallet: useCallback(() => {
      dismissCurrentToast()
      setStage('pending_wallet')
      toastIdRef.current = toast.loading(pendingWallet)
    }, [dismissCurrentToast, toast, pendingWallet]),

    onSubmitted: useCallback(
      (hash: `0x${string}`) => {
        setStage('submitted')
        setTxHash(hash)
        // Update the loading toast
        if (toastIdRef.current !== null) {
          toast.loading(submitted, { id: toastIdRef.current as string })
        }
      },
      [toast, submitted]
    ),

    onPendingConfirmation: useCallback(
      (hash: `0x${string}`) => {
        setStage('pending_confirmation')
        setTxHash(hash)
        // Update the loading toast
        if (toastIdRef.current !== null) {
          toast.loading(pendingConfirmation, { id: toastIdRef.current as string })
        }
      },
      [toast, pendingConfirmation]
    ),

    onConfirmed: useCallback(
      (_receipt: TransactionReceipt) => {
        setStage('confirmed')
        dismissCurrentToast()
        toast.success(confirmed)
      },
      [dismissCurrentToast, toast, confirmed]
    ),

    onFailed: useCallback(
      (error: Error) => {
        const isUserRejection =
          error.message.includes('User rejected') || error.message.includes('User denied')

        setStage('failed')
        dismissCurrentToast()

        if (isUserRejection) {
          toast.error(cancelled)
        } else {
          toast.error(`${failed}: ${error.message}`)
        }
      },
      [dismissCurrentToast, toast, failed, cancelled]
    ),
  }

  const isProcessing = stage !== 'idle' && stage !== 'confirmed' && stage !== 'failed'

  return {
    stage,
    txHash,
    isProcessing,
    lifecycle,
    reset,
  }
}
