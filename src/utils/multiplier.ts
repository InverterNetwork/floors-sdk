/**
 * @description Multiplier utilities for fee decay calculations
 * Based on the DecayingFeeMultiplierBase_v1 contract's quartic decay formula
 */

/** Basis points constant (10000 = 100%) */
export const BPS = BigInt(10000)

/** Maximum multiplier (100x) */
export const MAX_MULTIPLIER = BigInt(1_000_000)

/** Minimum multiplier (1x = BPS) */
export const MIN_MULTIPLIER = BPS

/**
 * @description State of the fee multiplier decay
 */
export interface MultiplierState {
  /** Decay start time (0 = not started) */
  startTime: bigint
  /** Decay duration in seconds */
  decayDuration: bigint
  /** Initial multiplier value (e.g., 100000 = 10x) */
  initialMultiplier: bigint
  /** Current multiplier from contract (optional, for caching) */
  currentMultiplier?: bigint
}

/**
 * @description Derived multiplier state with computed values
 */
export interface DerivedMultiplierState extends MultiplierState {
  /** Calculated current multiplier */
  calculatedMultiplier: bigint
  /** Whether decay has started */
  hasStarted: boolean
  /** Whether decay is currently active */
  isActive: boolean
  /** Whether decay has ended (multiplier at minimum) */
  isEnded: boolean
  /** Progress through decay (0-1) */
  decayProgress: number
  /** Time remaining until decay ends (null if not started or ended) */
  timeRemaining: bigint | null
  /** Multiplier as a human-readable number (e.g., 5.5 for 5.5x) */
  multiplierDisplay: number
}

/**
 * @description Calculate the current multiplier using the quartic decay formula
 * Formula: Mult = BPS + (InitialMult - BPS) * ((T - t) / T)^4
 *
 * @param state Multiplier state from contract
 * @param timestamp Current timestamp in seconds (defaults to now)
 * @returns Current multiplier value
 */
export function calculateMultiplier(state: MultiplierState, timestamp?: bigint): bigint {
  const now = timestamp ?? BigInt(Math.floor(Date.now() / 1000))

  // If decay duration is 0, return BPS (1x)
  if (state.decayDuration === BigInt(0)) {
    return BPS
  }

  // If not started or before start time, return initial multiplier
  if (state.startTime === BigInt(0) || now < state.startTime) {
    return state.initialMultiplier
  }

  // If after decay period, return BPS (1x)
  if (now >= state.startTime + state.decayDuration) {
    return BPS
  }

  // Calculate quartic decay
  const timeLeft = state.decayDuration + state.startTime - now
  const excessMult = state.initialMultiplier - BPS

  // Quartic: (timeLeft/duration)^4 * excessMult
  // Scale by 10000 for precision
  const ratio = (timeLeft * BigInt(10000)) / state.decayDuration
  const ratio2 = (ratio * ratio) / BigInt(10000)
  const ratio4 = (ratio2 * ratio2) / BigInt(10000)

  return BPS + (excessMult * ratio4) / BigInt(10000)
}

/**
 * @description Get decay progress as a number between 0 and 1
 * @param state Multiplier state
 * @param timestamp Current timestamp (defaults to now)
 * @returns Progress 0-1 (0 = just started, 1 = ended)
 */
export function getMultiplierProgress(state: MultiplierState, timestamp?: bigint): number {
  const now = timestamp ?? BigInt(Math.floor(Date.now() / 1000))

  if (state.decayDuration === BigInt(0) || state.startTime === BigInt(0)) {
    return 0
  }

  if (now < state.startTime) {
    return 0
  }

  if (now >= state.startTime + state.decayDuration) {
    return 1
  }

  const elapsed = now - state.startTime
  return Number((elapsed * BigInt(10000)) / state.decayDuration) / 10000
}

/**
 * @description Get time remaining until decay ends
 * @param state Multiplier state
 * @param timestamp Current timestamp (defaults to now)
 * @returns Time remaining in seconds, or null if not active
 */
export function getTimeUntilDecayEnd(state: MultiplierState, timestamp?: bigint): bigint | null {
  const now = timestamp ?? BigInt(Math.floor(Date.now() / 1000))

  if (state.decayDuration === BigInt(0) || state.startTime === BigInt(0)) {
    return null
  }

  const endTime = state.startTime + state.decayDuration

  if (now >= endTime) {
    return BigInt(0)
  }

  if (now < state.startTime) {
    return state.decayDuration
  }

  return endTime - now
}

/**
 * @description Check if decay is currently active
 * @param state Multiplier state
 * @param timestamp Current timestamp (defaults to now)
 */
export function isDecayActive(state: MultiplierState, timestamp?: bigint): boolean {
  const now = timestamp ?? BigInt(Math.floor(Date.now() / 1000))

  if (state.decayDuration === BigInt(0) || state.startTime === BigInt(0)) {
    return false
  }

  return now >= state.startTime && now < state.startTime + state.decayDuration
}

/**
 * @description Check if decay has ended
 * @param state Multiplier state
 * @param timestamp Current timestamp (defaults to now)
 */
export function isDecayEnded(state: MultiplierState, timestamp?: bigint): boolean {
  const now = timestamp ?? BigInt(Math.floor(Date.now() / 1000))

  if (state.decayDuration === BigInt(0)) {
    return true // No decay configured means it's effectively "ended" at 1x
  }

  if (state.startTime === BigInt(0)) {
    return false // Not started yet
  }

  return now >= state.startTime + state.decayDuration
}

/**
 * @description Check if decay has started
 * @param state Multiplier state
 * @param timestamp Current timestamp (defaults to now)
 */
export function hasDecayStarted(state: MultiplierState, timestamp?: bigint): boolean {
  const now = timestamp ?? BigInt(Math.floor(Date.now() / 1000))

  if (state.startTime === BigInt(0)) {
    return false
  }

  return now >= state.startTime
}

/**
 * @description Convert multiplier bigint to display number (e.g., 55000 -> 5.5)
 * @param multiplier Multiplier value in BPS format
 * @returns Human-readable multiplier (e.g., 5.5 for 5.5x)
 */
export function multiplierToDisplay(multiplier: bigint): number {
  return Number(multiplier) / Number(BPS)
}

/**
 * @description Get derived multiplier state with all computed values
 * @param state Multiplier state from contract
 * @param timestamp Current timestamp (defaults to now)
 * @returns Derived state with computed values
 */
export function getDerivedMultiplierState(
  state: MultiplierState,
  timestamp?: bigint
): DerivedMultiplierState {
  const calculatedMultiplier = calculateMultiplier(state, timestamp)

  return {
    ...state,
    calculatedMultiplier,
    hasStarted: hasDecayStarted(state, timestamp),
    isActive: isDecayActive(state, timestamp),
    isEnded: isDecayEnded(state, timestamp),
    decayProgress: getMultiplierProgress(state, timestamp),
    timeRemaining: getTimeUntilDecayEnd(state, timestamp),
    multiplierDisplay: multiplierToDisplay(calculatedMultiplier),
  }
}

/**
 * @description Calculate the effective fee with multiplier applied
 * @param baseBps Base fee in basis points
 * @param multiplier Current multiplier
 * @returns Adjusted fee in basis points
 */
export function calculateAdjustedFee(baseBps: bigint, multiplier: bigint): bigint {
  return (baseBps * multiplier) / BPS
}

/**
 * @description Calculate fee amount from deposit
 * @param deposit Deposit amount
 * @param baseBps Base fee in basis points
 * @param multiplier Current multiplier
 * @returns Fee amount
 */
export function calculateFeeAmount(deposit: bigint, baseBps: bigint, multiplier: bigint): bigint {
  const adjustedBps = calculateAdjustedFee(baseBps, multiplier)
  return (deposit * adjustedBps) / BigInt(10000)
}

/**
 * @description Calculate the buy amount after fee deduction
 * @param deposit Deposit amount
 * @param baseBps Base fee in basis points
 * @param multiplier Current multiplier
 * @returns Amount available for purchase after fee
 */
export function calculateBuyAmount(deposit: bigint, baseBps: bigint, multiplier: bigint): bigint {
  const fee = calculateFeeAmount(deposit, baseBps, multiplier)
  return deposit - fee
}
