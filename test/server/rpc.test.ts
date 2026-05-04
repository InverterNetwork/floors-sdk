import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'

import { fetchWithRetry } from '../../src/server/rpc'

const realFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = realFetch
})

function mockFetch(responses: Array<Response | Error>) {
  let i = 0
  globalThis.fetch = mock(async () => {
    const next = responses[i++]
    if (!next) throw new Error('mockFetch: out of responses')
    if (next instanceof Error) throw next
    return next
  }) as unknown as typeof fetch
}

describe('fetchWithRetry', () => {
  beforeEach(() => {
    // Tighten retries to keep tests fast
  })

  it('returns immediately on 200 without retrying', async () => {
    mockFetch([new Response('ok', { status: 200 })])
    const res = await fetchWithRetry(
      'https://example.com',
      { method: 'GET' },
      { retries: 5, initialDelayMs: 1 }
    )
    expect(res.status).toBe(200)
  })

  it('returns 4xx without retrying', async () => {
    mockFetch([new Response('bad', { status: 400 })])
    const res = await fetchWithRetry(
      'https://example.com',
      { method: 'GET' },
      { retries: 5, initialDelayMs: 1 }
    )
    expect(res.status).toBe(400)
  })

  it('retries on 5xx and returns the eventual success', async () => {
    mockFetch([
      new Response('boom', { status: 503 }),
      new Response('boom', { status: 502 }),
      new Response('ok', { status: 200 }),
    ])
    const res = await fetchWithRetry(
      'https://example.com',
      { method: 'GET' },
      { retries: 5, initialDelayMs: 1 }
    )
    expect(res.status).toBe(200)
  })

  it('returns the last 5xx response after exhausting retries', async () => {
    mockFetch([
      new Response('boom', { status: 503 }),
      new Response('boom', { status: 503 }),
      new Response('boom', { status: 503 }),
    ])
    const res = await fetchWithRetry(
      'https://example.com',
      { method: 'GET' },
      { retries: 3, initialDelayMs: 1 }
    )
    expect(res.status).toBe(503)
  })

  it('with retries: 0 makes a single attempt', async () => {
    mockFetch([new Response('ok', { status: 200 })])
    const res = await fetchWithRetry('https://example.com', { method: 'GET' }, { retries: 0 })
    expect(res.status).toBe(200)
  })

  it('rethrows the underlying network error after exhausting retries', async () => {
    mockFetch([new Error('net1'), new Error('net2')])
    await expect(
      fetchWithRetry('https://example.com', { method: 'GET' }, { retries: 2, initialDelayMs: 1 })
    ).rejects.toThrow('net2')
  })
})
