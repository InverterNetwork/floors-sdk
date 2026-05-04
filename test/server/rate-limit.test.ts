import { describe, expect, it } from 'bun:test'

import { rateLimit } from '../../src/server/rate-limit'

describe('rateLimit', () => {
  it('allows requests up to the limit, then blocks with retryAfterMs > 0', () => {
    const key = `test-${Math.random()}`
    const limit = 3
    const windowMs = 60_000

    const r1 = rateLimit(key, limit, windowMs)
    expect(r1.allowed).toBe(true)
    expect(r1.remaining).toBe(2)
    expect(r1.retryAfterMs).toBe(0)

    const r2 = rateLimit(key, limit, windowMs)
    expect(r2.allowed).toBe(true)
    expect(r2.remaining).toBe(1)

    const r3 = rateLimit(key, limit, windowMs)
    expect(r3.allowed).toBe(true)
    expect(r3.remaining).toBe(0)

    const blocked = rateLimit(key, limit, windowMs)
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)
    expect(blocked.retryAfterMs).toBeGreaterThan(0)
  })

  it('returns a fresh window once the previous one expires', async () => {
    const key = `test-${Math.random()}`
    rateLimit(key, 1, 5) // consume the only token
    expect(rateLimit(key, 1, 5).allowed).toBe(false)

    await new Promise((r) => setTimeout(r, 10))

    expect(rateLimit(key, 1, 5).allowed).toBe(true)
  })

  it('keeps separate counters per key', () => {
    const a = `a-${Math.random()}`
    const b = `b-${Math.random()}`
    rateLimit(a, 1, 60_000)
    expect(rateLimit(a, 1, 60_000).allowed).toBe(false)
    expect(rateLimit(b, 1, 60_000).allowed).toBe(true)
  })
})
