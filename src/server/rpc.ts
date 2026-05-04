/**
 * Server-side fetch with exponential-backoff retry. Retries on 5xx and network
 * errors; returns 4xx immediately so the caller can surface the client error.
 *
 * Use from Next.js API routes, scripts, and any Node-runtime SDK consumer.
 * Browser code must NOT import this — go through an API route.
 */

import type { LogLevel } from './logger'

export const RPC_DEFAULTS = {
  retries: 5,
  initialDelayMs: 1000,
} as const

export interface RpcRetryOptions {
  /** Max attempts including the first. Default 5. Set to 0 to disable retry. */
  retries?: number
  /** Backoff base in ms (each attempt waits initialDelayMs * 2^attempt). Default 1000. */
  initialDelayMs?: number
  /** Optional logger; receives `warn` on retry, `error` on final failure. */
  logger?: { [K in LogLevel]: (msg: string, ctx?: Record<string, unknown>) => void }
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export async function fetchWithRetry(
  url: string,
  init: RequestInit,
  options?: RpcRetryOptions
): Promise<Response> {
  const retries = options?.retries ?? RPC_DEFAULTS.retries
  const initialDelayMs = options?.initialDelayMs ?? RPC_DEFAULTS.initialDelayMs
  const logger = options?.logger

  // retries === 0 → single attempt, no retry loop
  const attempts = Math.max(1, retries)

  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url, init)

      // Success or client error — return immediately
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response
      }

      // 5xx — retry with backoff if attempts remain
      if (i < attempts - 1) {
        const delay = initialDelayMs * Math.pow(2, i)
        logger?.warn('fetchWithRetry: response failed, retrying', {
          status: response.status,
          delayMs: delay,
          attempt: i + 1,
          maxAttempts: attempts,
        })
        await sleep(delay)
        continue
      }

      return response
    } catch (error) {
      if (i < attempts - 1) {
        const delay = initialDelayMs * Math.pow(2, i)
        logger?.warn('fetchWithRetry: network error, retrying', {
          err: error instanceof Error ? error.message : String(error),
          delayMs: delay,
          attempt: i + 1,
          maxAttempts: attempts,
        })
        await sleep(delay)
        continue
      }
      throw error
    }
  }

  throw new Error('fetchWithRetry: max attempts exceeded')
}
