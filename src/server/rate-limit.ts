/**
 * In-memory rate limiter — zero dependencies.
 *
 * Tracks requests per key (e.g. IP or wallet address) with a sliding window.
 * Entries auto-expire so the Map doesn't grow unbounded.
 *
 * Note: In-memory state resets on serverless cold starts. For a multi-instance
 * deployment, swap this for Redis/Upstash. For a single-instance deployment
 * this is sufficient to stop casual abuse.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

/** Periodically prune expired entries (every 60s) */
let lastPrune = Date.now()
function prune() {
  const now = Date.now()
  if (now - lastPrune < 60_000) return
  lastPrune = now
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterMs: number
}

/**
 * Check and consume a rate limit token.
 *
 * @param key       Unique identifier (IP, address, etc.)
 * @param limit     Max requests per window
 * @param windowMs  Window duration in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  prune()

  const now = Date.now()
  const entry = store.get(key)

  // No existing entry or window expired — start fresh
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, retryAfterMs: 0 }
  }

  // Within window — check count
  if (entry.count < limit) {
    entry.count++
    return { allowed: true, remaining: limit - entry.count, retryAfterMs: 0 }
  }

  return {
    allowed: false,
    remaining: 0,
    retryAfterMs: entry.resetAt - now,
  }
}
