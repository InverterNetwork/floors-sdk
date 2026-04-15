import { parseUnits } from 'viem'
import { describe, expect, it } from 'vitest'

import {
  calculateFloorMarketCapUsd,
  calculateFloorSupplyForTargetMarketCapUsd,
  calculateSegmentsFromMarketCapUsd,
  generateDefaultCurve,
  parseUsdPriceToWad,
  scaleSegmentSupplyForReserveUsdPrice,
  scaleSegmentSupplyForReserveUsdTransition,
} from '../src/utils/segments'

describe('reserve USD segment scaling (supply, not price)', () => {
  it('scales supply down when reserve is worth more than $1 (e.g. AVAX)', () => {
    const seg = {
      initialPrice: BigInt(1e18),
      priceIncrease: BigInt(0.003e18),
      supplyPerStep: BigInt(1000e18),
      numberOfSteps: 10,
    }
    const avaxUsd = parseUsdPriceToWad(13)
    const scaled = scaleSegmentSupplyForReserveUsdPrice(seg, avaxUsd)
    expect(scaled.initialPrice).toBe(seg.initialPrice)
    expect(scaled.priceIncrease).toBe(seg.priceIncrease)
    expect(scaled.supplyPerStep).toBe(BigInt(1000e18) / BigInt(13))
  })

  it('transition matches sequential scaling for two reserves', () => {
    const seg = {
      initialPrice: BigInt(1e18),
      priceIncrease: BigInt(0),
      supplyPerStep: BigInt(400_000e18),
      numberOfSteps: 1,
    }
    const usd1 = parseUsdPriceToWad(1)
    const usd13 = parseUsdPriceToWad(13)
    const direct = scaleSegmentSupplyForReserveUsdPrice(seg, usd13)
    const via = scaleSegmentSupplyForReserveUsdTransition(seg, usd1, usd13)
    expect(via.supplyPerStep).toBe(direct.supplyPerStep)
  })

  it('generateDefaultCurve applies reserve USD scaling to supply only', () => {
    const { floor } = generateDefaultCurve(BigInt(1e18), BigInt(400_000e18), {
      reserveUsdPriceWad: parseUsdPriceToWad(13),
    })
    expect(floor.initialPrice).toBe(BigInt(1e18))
    expect(floor.supplyPerStep).toBe(BigInt(400_000e18) / BigInt(13))
  })

  it('calculateSegmentsFromMarketCapUsd matches $400k floor at $1/token for USDC', () => {
    const { floor } = calculateSegmentsFromMarketCapUsd({
      targetFloorMarketCapUsd: 400_000,
      reserveUsdPrice: 1,
      issuanceDecimals: 18,
      floorPriceUsdPerIssuanceToken: 1,
    })
    expect(floor.supplyPerStep).toBe(parseUnits('400000', 18))
    expect(floor.initialPrice).toBe(BigInt(1e18))
  })

  it('calculateFloorSupplyForTargetMarketCapUsd returns expected issuance amount', () => {
    const s = calculateFloorSupplyForTargetMarketCapUsd({
      targetFloorMarketCapUsd: 400_000,
      floorPriceUsdPerIssuanceToken: 1,
      issuanceDecimals: 18,
    })
    expect(s).toBe(parseUnits('400000', 18))
  })

  it('calculateFloorMarketCapUsd: ~$400k with price 1.0 AVAX and supply scaled by 1/9.5', () => {
    const reserveUsd = 9.5
    const supply = parseUnits((400_000 / reserveUsd).toFixed(18), 18)
    const m = calculateFloorMarketCapUsd({
      floorSupply: supply,
      issuanceDecimals: 18,
      floorPriceWad: BigInt(1e18),
      reserveUsdPrice: reserveUsd,
    })
    expect(m).toBeCloseTo(400_000, 0)
  })
})
