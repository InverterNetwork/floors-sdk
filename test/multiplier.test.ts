/**
 * @description Unit tests for the phase-aware decay multiplier (PR #126 / C3).
 *
 * The on-chain Presale_v1 only applies the decay multiplier during the Public
 * phase. The SDK's `getDerivedMultiplierState` accepts an optional
 * `currentState` so UI fee previews don't show inflated bps during Whitelist
 * (where the contract returns the base bps unchanged). Without this clamp the
 * preview and the actual buy tx diverge.
 */

import { describe, expect, it } from 'bun:test'

import {
  BPS,
  calculateMultiplier,
  getDerivedMultiplierState,
  type MultiplierState,
} from '../src/utils/multiplier'

const PRESALE_NOT_OPEN = 0
const PRESALE_WHITELIST = 1
const PRESALE_PUBLIC = 2
const PRESALE_CLOSED = 3

/**
 * 10x initial multiplier, 1-day decay, started at t=1000.
 * At t=1500 (halfway), decay output is well above BPS.
 */
const ACTIVE_DECAY_STATE: MultiplierState = {
  startTime: BigInt(1000),
  decayDuration: BigInt(1000),
  initialMultiplier: BigInt(100_000), // 10x
}

const MIDPOINT_TIMESTAMP = BigInt(1500)

describe('getDerivedMultiplierState — phase gate (C3)', () => {
  it('applies decay when currentState is omitted (back-compat default)', () => {
    const expected = calculateMultiplier(ACTIVE_DECAY_STATE, MIDPOINT_TIMESTAMP)
    expect(expected).toBeGreaterThan(BPS)

    const derived = getDerivedMultiplierState(ACTIVE_DECAY_STATE, MIDPOINT_TIMESTAMP)
    expect(derived.calculatedMultiplier).toBe(expected)
    expect(derived.isActive).toBe(true)
    expect(derived.multiplierDisplay).toBeGreaterThan(1)
  })

  it('applies decay during the Public phase', () => {
    const expected = calculateMultiplier(ACTIVE_DECAY_STATE, MIDPOINT_TIMESTAMP)

    const derived = getDerivedMultiplierState(
      ACTIVE_DECAY_STATE,
      MIDPOINT_TIMESTAMP,
      PRESALE_PUBLIC
    )
    expect(derived.calculatedMultiplier).toBe(expected)
    expect(derived.isActive).toBe(true)
  })

  it('clamps to 1x BPS during the Whitelist phase even when decay would otherwise be active', () => {
    const derived = getDerivedMultiplierState(
      ACTIVE_DECAY_STATE,
      MIDPOINT_TIMESTAMP,
      PRESALE_WHITELIST
    )

    expect(derived.calculatedMultiplier).toBe(BPS)
    expect(derived.isActive).toBe(false)
    expect(derived.multiplierDisplay).toBe(1)
  })

  it('clamps to 1x BPS during the NotOpen phase', () => {
    const derived = getDerivedMultiplierState(
      ACTIVE_DECAY_STATE,
      MIDPOINT_TIMESTAMP,
      PRESALE_NOT_OPEN
    )

    expect(derived.calculatedMultiplier).toBe(BPS)
    expect(derived.isActive).toBe(false)
  })

  it('clamps to 1x BPS during the Closed phase', () => {
    const derived = getDerivedMultiplierState(
      ACTIVE_DECAY_STATE,
      MIDPOINT_TIMESTAMP,
      PRESALE_CLOSED
    )

    expect(derived.calculatedMultiplier).toBe(BPS)
    expect(derived.isActive).toBe(false)
  })

  it('preserves hasStarted/decayProgress/timeRemaining regardless of phase gate', () => {
    // The phase gate only affects the *applied* multiplier. Diagnostic fields
    // (hasStarted, decayProgress, timeRemaining) still reflect the underlying
    // decay timeline so the UI can render countdown copy outside Public.
    const whitelist = getDerivedMultiplierState(
      ACTIVE_DECAY_STATE,
      MIDPOINT_TIMESTAMP,
      PRESALE_WHITELIST
    )

    expect(whitelist.hasStarted).toBe(true)
    expect(whitelist.decayProgress).toBeGreaterThan(0)
    expect(whitelist.decayProgress).toBeLessThan(1)
    expect(whitelist.timeRemaining).toBeGreaterThan(BigInt(0))
  })
})
