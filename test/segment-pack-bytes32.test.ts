import { describe, expect, it } from 'bun:test'
import { parseUnits } from 'viem'

import {
  decodePackedSegment,
  decodePackedSegments,
  packSegmentsToBytes32,
  packSegmentToBytes32,
  scaleSegmentPricesWadToReserve,
} from '../src'
import type { SegmentConfig } from '../src/schemas/launch.schema'

const sampleFloor: SegmentConfig = {
  initialPrice: parseUnits('1', 6), // 1 USDC at 6-decimal native
  priceIncrease: BigInt(0),
  supplyPerStep: parseUnits('400000', 18),
  numberOfSteps: 1,
}

const samplePremium: SegmentConfig = {
  initialPrice: parseUnits('1', 6),
  priceIncrease: BigInt(3000), // 0.003 USDC at 6-decimal
  supplyPerStep: parseUnits('1000', 18),
  numberOfSteps: 100,
}

describe('packSegmentToBytes32 / decodePackedSegment round-trip', () => {
  it('round-trips a single segment losslessly', () => {
    const packed = packSegmentToBytes32(sampleFloor)
    const decoded = decodePackedSegment(packed)
    expect(decoded.initialPrice).toBe(sampleFloor.initialPrice)
    expect(decoded.priceIncreasePerStep).toBe(sampleFloor.priceIncrease)
    expect(decoded.supplyPerStep).toBe(sampleFloor.supplyPerStep)
    expect(decoded.numberOfSteps).toBe(sampleFloor.numberOfSteps)
  })

  it('produces 0x-prefixed bytes32 (66-char hex string)', () => {
    const packed = packSegmentToBytes32(sampleFloor)
    expect(packed.startsWith('0x')).toBe(true)
    expect(packed.length).toBe(66)
  })

  it('round-trips an array via packSegmentsToBytes32 + decodePackedSegments', () => {
    const segments = [sampleFloor, samplePremium]
    const packed = packSegmentsToBytes32(segments)
    const decoded = decodePackedSegments(packed)
    expect(decoded).toHaveLength(2)
    expect(decoded[0].initialPrice).toBe(sampleFloor.initialPrice)
    expect(decoded[1].priceIncreasePerStep).toBe(samplePremium.priceIncrease)
    expect(decoded[1].numberOfSteps).toBe(samplePremium.numberOfSteps)
  })

  it('rejects supplyPerStep > 2^96', () => {
    const oversized: SegmentConfig = { ...sampleFloor, supplyPerStep: BigInt(1) << BigInt(97) }
    expect(() => packSegmentToBytes32(oversized)).toThrow()
  })

  it('rejects numberOfSteps > 65535', () => {
    const oversized: SegmentConfig = { ...sampleFloor, numberOfSteps: 70_000 }
    expect(() => packSegmentToBytes32(oversized)).toThrow()
  })

  it('rejects supplyPerStep <= 0', () => {
    const zero: SegmentConfig = { ...sampleFloor, supplyPerStep: BigInt(0) }
    expect(() => packSegmentToBytes32(zero)).toThrow()
  })
})

describe('scaleSegmentPricesWadToReserve', () => {
  it('scales 18-decimal WAD prices to 6-decimal reserve', () => {
    const wadFloor: SegmentConfig = {
      initialPrice: parseUnits('1', 18),
      priceIncrease: parseUnits('0.003', 18),
      supplyPerStep: parseUnits('1000', 18),
      numberOfSteps: 100,
    }
    const scaled = scaleSegmentPricesWadToReserve(wadFloor, 6)
    expect(scaled.initialPrice).toBe(parseUnits('1', 6))
    expect(scaled.priceIncrease).toBe(BigInt(3000)) // 0.003 USDC = 3000 micro-USDC
  })

  it('passes 18-decimal reserves through unchanged', () => {
    const wadSeg = {
      initialPrice: parseUnits('2.5', 18),
      priceIncrease: parseUnits('0.01', 18),
    }
    const scaled = scaleSegmentPricesWadToReserve(wadSeg, 18)
    expect(scaled.initialPrice).toBe(wadSeg.initialPrice)
    expect(scaled.priceIncrease).toBe(wadSeg.priceIncrease)
  })
})
