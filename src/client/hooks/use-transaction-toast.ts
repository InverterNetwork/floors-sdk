'use client'

import { useCallback, useRef, useState } from 'react'
import type { TransactionReceipt } from 'viem'

import type { TransactionLifecycleCallbacks, TransactionStage } from '../../presale'
import { type EnhancedParsedError, getParsedError } from '../../utils'

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
  /** Optional: Show suggestion as secondary toast */
  showSuggestions?: boolean
  /** Optional: Custom error handler for advanced UX */
  onParsedError?: (error: EnhancedParsedError) => void
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
  /** Last parsed error (if any) */
  lastError: EnhancedParsedError | null
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
  showSuggestions = true,
  onParsedError,
}: UseTransactionToastOptions): UseTransactionToastReturn => {
  const [stage, setStage] = useState<TransactionStage>('idle')
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null)
  const [lastError, setLastError] = useState<EnhancedParsedError | null>(null)
  const toastIdRef = useRef<string | number | null>(null)

  const {
    pendingWallet = 'Confirm in wallet...',
    submitted = 'Transaction submitted',
    pendingConfirmation = 'Waiting for confirmation...',
    confirmed = 'Transaction confirmed!',
    failed: _failedMsg = 'Transaction failed',
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
    setLastError(null)
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
        // Parse the error with enhanced UX information
        const parsed = getParsedError({ error })
        setLastError(parsed)

        setStage('failed')
        dismissCurrentToast()

        // Call custom handler if provided
        onParsedError?.(parsed)

        if (parsed.isUserRejection) {
          // User cancelled - show mild message
          toast.error(cancelled)
        } else {
          // Show user-friendly error message
          toast.error(parsed.prettyMessage)

          // Optionally show suggestion as follow-up
          if (showSuggestions && parsed.suggestion) {
            // Use setTimeout to show suggestion after error
            setTimeout(() => {
              toast.loading(parsed.suggestion!, { id: 'suggestion' })
              setTimeout(() => toast.dismiss('suggestion'), 5000)
            }, 500)
          }
        }
      },
      [dismissCurrentToast, toast, cancelled, showSuggestions, onParsedError]
    ),
  }

  const isProcessing = stage !== 'idle' && stage !== 'confirmed' && stage !== 'failed'

  return {
    stage,
    txHash,
    isProcessing,
    lifecycle,
    reset,
    lastError,
  }
}
