/**
 * @description Segment utilities for bonding curve configuration
 * PackedSegment format: bytes32 containing [initialPrice | priceIncrease | supplyPerStep | numberOfSteps]
 *
 * Bit layout (from LSB to MSB):
 * - initialPrice:    72 bits  (offset 0)   - Start price for this segment
 * - priceIncrease:   72 bits  (offset 72)  - Price step increase (0 = flat floor)
 * - supplyPerStep:   96 bits  (offset 144) - Token amount per step
 * - numberOfSteps:   16 bits  (offset 240) - Steps in segment (1–65,535)
 */

/**
 * @description Packed segment type (bytes32 hex string)
 */
export type PackedSegment = `0x${string}`

/**
 * @description Decoded segment from bytes32 PackedSegment
 */
export interface DecodedSegment {
  /** Starting price (72 bits, 18 decimals) */
  initialPrice: bigint
  /** Price increase per step (72 bits, 18 decimals, 0 = flat floor) */
  priceIncreasePerStep: bigint
  /** Token supply per step (96 bits, token decimals) */
  supplyPerStep: bigint
  /** Number of steps in segment (16 bits, 1-65535) */
  numberOfSteps: number

  // Computed fields
  /** Total supply for this segment */
  totalSupply: bigint
  /** Final price at end of segment */
  finalPrice: bigint
  /** Whether this is a floor segment (flat price, 1 step) */
  isFloorSegment: boolean
}

// Bit masks for decoding
const MASK_72 = (BigInt(1) << BigInt(72)) - BigInt(1)
const MASK_96 = (BigInt(1) << BigInt(96)) - BigInt(1)
const MASK_16 = (BigInt(1) << BigInt(16)) - BigInt(1)

/**
 * @description Decode a bytes32 PackedSegment into its component parts
 * @param packed The packed segment as a hex string (bytes32)
 * @returns Decoded segment with computed fields
 */
export function decodePackedSegment(packed: PackedSegment): DecodedSegment {
  const value = BigInt(packed)

  // Extract fields using bit masks and shifts
  const initialPrice = value & MASK_72
  const priceIncreasePerStep = (value >> BigInt(72)) & MASK_72
  const supplyPerStep = (value >> BigInt(144)) & MASK_96
  const numberOfSteps = Number((value >> BigInt(240)) & MASK_16)

  // Compute derived fields
  const totalSupply = supplyPerStep * BigInt(numberOfSteps)
  const finalPrice =
    numberOfSteps > 0
      ? initialPrice + priceIncreasePerStep * BigInt(numberOfSteps - 1)
      : initialPrice
  const isFloorSegment = priceIncreasePerStep === BigInt(0) && numberOfSteps === 1

  return {
    initialPrice,
    priceIncreasePerStep,
    supplyPerStep,
    numberOfSteps,
    totalSupply,
    finalPrice,
    isFloorSegment,
  }
}

/**
 * @description Decode multiple packed segments
 * @param packedSegments Array of packed segments
 * @returns Array of decoded segments
 */
export function decodePackedSegments(packedSegments: PackedSegment[]): DecodedSegment[] {
  return packedSegments.map(decodePackedSegment)
}

/**
 * @description Encode a decoded segment back to bytes32 format
 * @param segment Decoded segment to encode
 * @returns Packed segment as hex string
 */
export function encodeToPackedSegment(segment: DecodedSegment): PackedSegment {
  let value = BigInt(0)
  value |= segment.initialPrice & MASK_72
  value |= (segment.priceIncreasePerStep & MASK_72) << BigInt(72)
  value |= (segment.supplyPerStep & MASK_96) << BigInt(144)
  value |= (BigInt(segment.numberOfSteps) & MASK_16) << BigInt(240)
  return `0x${value.toString(16).padStart(64, '0')}` as PackedSegment
}

/**
 * @description Segment configuration for bonding curve
 */
export type SegmentConfig = {
  /** Starting price in 18 decimal format (e.g., 1e18 = 1 token) */
  initialPrice: bigint
  /** Price increase per step in 18 decimal format (0 for flat floor segment) */
  priceIncrease: bigint
  /** Token supply per step in 18 decimal format */
  supplyPerStep: bigint
  /** Number of steps in this segment */
  numberOfSteps: number
}

/**
 * @description Default floor segment configuration (100k supply @ 1.0 price, flat)
 */
export const DEFAULT_FLOOR_SEGMENT: SegmentConfig = {
  initialPrice: BigInt(1e18), // 1.0
  priceIncrease: BigInt(0),
  supplyPerStep: BigInt(100_000e18), // 100k tokens
  numberOfSteps: 1,
}

/**
 * @description Default S-curve premium segments from 1Settings.md
 */
export const DEFAULT_PREMIUM_SEGMENTS: SegmentConfig[] = [
  {
    initialPrice: BigInt(1e18), // 1.00 AVAX
    priceIncrease: BigInt(0.013e18), // 0.013 AVAX increase
    supplyPerStep: BigInt(250_000e18), // 250k per step
    numberOfSteps: 77,
  },
  {
    initialPrice: BigInt(2.014e18), // 2.014 AVAX
    priceIncrease: BigInt(0.026182e18), // 0.026182 AVAX increase
    supplyPerStep: BigInt(280_000e18), // 280k per step
    numberOfSteps: 69,
  },
  {
    initialPrice: BigInt(3.84674e18), // 3.84674 AVAX
    priceIncrease: BigInt(0.05000762e18), // 0.05000762 AVAX increase
    supplyPerStep: BigInt(400_000e18), // 400k per step
    numberOfSteps: 49,
  },
  {
    initialPrice: BigInt(6.347121e18), // 6.347121 AVAX
    priceIncrease: BigInt(0.07667056e18), // 0.07667056 AVAX increase
    supplyPerStep: BigInt(740_000e18), // 740k per step
    numberOfSteps: 27,
  },
  {
    initialPrice: BigInt(8.49389668e18), // 8.49389668 AVAX
    priceIncrease: BigInt(0.08697255e18), // 0.08697255 AVAX increase
    supplyPerStep: BigInt(1_530_000e18), // 1.53M per step
    numberOfSteps: 13,
  },
]

/**
 * @description Pack segment config into bytes32 format used by contracts
 * Format: [initialPrice (96 bits) | priceIncrease (96 bits) | supplyPerStep (64 bits compressed) | numberOfSteps (32 bits)]
 *
 * @note The actual packing is done by the contract during encoding, so we return a tuple
 *       that matches the PackedSegment struct format
 */
export function packSegment(segment: SegmentConfig): {
  initialPrice: bigint
  priceIncrease: bigint
  supplyPerStep: bigint
  numberOfSteps: bigint
} {
  if (segment.numberOfSteps < 1) {
    throw new Error('Number of steps must be at least 1')
  }
  if (segment.numberOfSteps > 0xffffffff) {
    throw new Error('Number of steps exceeds maximum (4294967295)')
  }
  if (segment.initialPrice < BigInt(0)) {
    throw new Error('Initial price cannot be negative')
  }
  if (segment.priceIncrease < BigInt(0)) {
    throw new Error('Price increase cannot be negative')
  }
  if (segment.supplyPerStep <= BigInt(0)) {
    throw new Error('Supply per step must be positive')
  }

  return {
    initialPrice: segment.initialPrice,
    priceIncrease: segment.priceIncrease,
    supplyPerStep: segment.supplyPerStep,
    numberOfSteps: BigInt(segment.numberOfSteps),
  }
}

/**
 * @description Pack multiple segments for contract encoding
 */
export function packSegments(segments: SegmentConfig[]): Array<{
  initialPrice: bigint
  priceIncrease: bigint
  supplyPerStep: bigint
  numberOfSteps: bigint
}> {
  return segments.map(packSegment)
}

/**
 * @description Calculate end price of a segment
 */
export function calculateSegmentEndPrice(segment: SegmentConfig): bigint {
  return segment.initialPrice + segment.priceIncrease * BigInt(segment.numberOfSteps - 1)
}

/**
 * @description Calculate total supply of a segment
 */
export function calculateSegmentTotalSupply(segment: SegmentConfig): bigint {
  return segment.supplyPerStep * BigInt(segment.numberOfSteps)
}

/**
 * @description Calculate total supply across all segments
 */
export function calculateTotalSupply(segments: SegmentConfig[]): bigint {
  return segments.reduce((sum, seg) => sum + calculateSegmentTotalSupply(seg), BigInt(0))
}

/**
 * @description Validate segments connect properly (end price of N = start price of N+1)
 */
export function validateSegmentConnection(
  currentSegment: SegmentConfig,
  nextSegment: SegmentConfig,
  toleranceBps = 100 // 1% tolerance for floating point errors
): { valid: boolean; error?: string } {
  const currentEndPrice = calculateSegmentEndPrice(currentSegment)
  const nextStartPrice = nextSegment.initialPrice

  // Calculate tolerance
  const tolerance = (currentEndPrice * BigInt(toleranceBps)) / BigInt(10000)

  const diff =
    currentEndPrice > nextStartPrice
      ? currentEndPrice - nextStartPrice
      : nextStartPrice - currentEndPrice

  if (diff > tolerance) {
    return {
      valid: false,
      error: `Segment connection mismatch: end price ${currentEndPrice.toString()} doesn't match next start price ${nextStartPrice.toString()}`,
    }
  }

  return { valid: true }
}

/**
 * @description Validate floor segment requirements
 */
export function validateFloorSegment(segment: SegmentConfig): { valid: boolean; error?: string } {
  if (segment.numberOfSteps !== 1) {
    return { valid: false, error: 'Floor segment must have exactly 1 step' }
  }
  if (segment.priceIncrease !== BigInt(0)) {
    return { valid: false, error: 'Floor segment must have 0 price increase (flat)' }
  }
  if (segment.initialPrice <= BigInt(0)) {
    return { valid: false, error: 'Floor segment must have positive initial price' }
  }
  if (segment.supplyPerStep <= BigInt(0)) {
    return { valid: false, error: 'Floor segment must have positive supply' }
  }
  return { valid: true }
}

/**
 * @description Validate all segments
 */
export function validateSegments(
  floorSegment: SegmentConfig,
  premiumSegments: SegmentConfig[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validate floor segment
  const floorValidation = validateFloorSegment(floorSegment)
  if (!floorValidation.valid && floorValidation.error) {
    errors.push(floorValidation.error)
  }

  // Need at least 1 premium segment
  if (premiumSegments.length === 0) {
    errors.push('At least 1 premium segment is required')
  }

  // Validate each premium segment
  for (let i = 0; i < premiumSegments.length; i++) {
    const seg = premiumSegments[i]
    if (seg.initialPrice <= BigInt(0)) {
      errors.push(`Premium segment ${i + 1}: initial price must be positive`)
    }
    if (seg.supplyPerStep <= BigInt(0)) {
      errors.push(`Premium segment ${i + 1}: supply per step must be positive`)
    }
    if (seg.numberOfSteps < 1) {
      errors.push(`Premium segment ${i + 1}: must have at least 1 step`)
    }
  }

  // Validate connections between segments
  const allSegments = [floorSegment, ...premiumSegments]
  for (let i = 0; i < allSegments.length - 1; i++) {
    const connection = validateSegmentConnection(allSegments[i], allSegments[i + 1])
    if (!connection.valid && connection.error) {
      errors.push(`Connection ${i + 1} → ${i + 2}: ${connection.error}`)
    }
  }

  return { valid: errors.length === 0, errors }
}

/**
 * @description Generate default S-curve with custom floor price and supply
 */
export function generateDefaultCurve(
  floorPrice: bigint = BigInt(1e18),
  floorSupply: bigint = BigInt(100_000e18)
): { floor: SegmentConfig; premium: SegmentConfig[] } {
  const floor: SegmentConfig = {
    initialPrice: floorPrice,
    priceIncrease: BigInt(0),
    supplyPerStep: floorSupply,
    numberOfSteps: 1,
  }

  // Scale premium segments based on floor price
  const scaleFactor = (floorPrice * BigInt(1e18)) / BigInt(1e18)

  const premium: SegmentConfig[] = DEFAULT_PREMIUM_SEGMENTS.map((seg) => ({
    initialPrice: (seg.initialPrice * scaleFactor) / BigInt(1e18),
    priceIncrease: (seg.priceIncrease * scaleFactor) / BigInt(1e18),
    supplyPerStep: seg.supplyPerStep,
    numberOfSteps: seg.numberOfSteps,
  }))

  return { floor, premium }
}

/**
 * @description Generate commission schedule for presale (based on 1Settings.md formula)
 * Formula: 2% + (n-1) * 2.5% for leveraged positions
 * Non-leveraged (index 0): 1%
 */
export function generateCommissionSchedule(maxLeverage: number): bigint[] {
  if (maxLeverage < 1) {
    throw new Error('Max leverage must be at least 1')
  }
  if (maxLeverage > 255) {
    throw new Error('Max leverage cannot exceed 255')
  }

  const schedule: bigint[] = []

  // Index 0: Non-leveraged fee (1%)
  schedule.push(BigInt(100)) // 100 bps = 1%

  // Index 1 to maxLeverage: Leveraged fees
  // Formula: 2% + (n-1) * 2.5%
  for (let i = 1; i <= maxLeverage; i++) {
    // 200 + (i-1) * 250 bps
    const fee = BigInt(200) + BigInt(i - 1) * BigInt(250)
    schedule.push(fee)
  }

  return schedule
}

/**
 * @description Generate price breakpoints for presale tranches
 * Default: All unlock at floor price (1e18)
 */
export function generatePriceBreakpoints(
  maxLeverage: number,
  unlockPrice: bigint = BigInt(1e18)
): bigint[][] {
  if (maxLeverage < 1) {
    throw new Error('Max leverage must be at least 1')
  }

  const breakpoints: bigint[][] = []

  // Each leverage level i has i tranches (1x has 1, 2x has 2, etc.)
  for (let leverage = 1; leverage <= maxLeverage; leverage++) {
    const tranches: bigint[] = []
    for (let t = 0; t < leverage; t++) {
      tranches.push(unlockPrice)
    }
    breakpoints.push(tranches)
  }

  return breakpoints
}
