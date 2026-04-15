import { describe, expect, it } from 'bun:test'

import { mapMarketToFloorAssetData } from '../src/graphql/api/mappers'

/**
 * Minimal market fixture with only the fields mapMarketToFloorAssetData reads.
 * All numeric fields default to '0'; override as needed per test.
 */
function makeMarket(overrides: Record<string, unknown> = {}) {
  return {
    id: '0xabcdef1234567890abcdef1234567890abcdef12',
    creator_id: '0x0000000000000000000000000000000000000001',
    factory_id: '0x0000000000000000000000000000000000000002',
    reserveToken_id: '0x0000000000000000000000000000000000000003',
    issuanceToken_id: '0x0000000000000000000000000000000000000004',
    currentPriceFormatted: '1.5',
    currentPriceRaw: '1500000000000000000',
    floorPriceFormatted: '1.0',
    floorPriceRaw: '1000000000000000000',
    totalSupplyFormatted: '10000',
    totalSupplyRaw: '10000000000000000000000',
    marketSupplyFormatted: '8000',
    marketSupplyRaw: '8000000000000000000000',
    floorSupplyFormatted: '2000',
    floorSupplyRaw: '2000000000000000000000',
    floorSegmentSupplyFormatted: '0',
    floorSegmentSupplyRaw: '0',
    initialFloorPriceFormatted: '1.0',
    initialFloorPriceRaw: '1000000000000000000',
    tradingFeeBps: '100',
    buyFeeBps: '80',
    sellFeeBps: '120',
    maxLTV: '9900',
    status: 'ACTIVE',
    isBuyOpen: true,
    isSellOpen: true,
    createdAt: '1700000000',
    lastUpdatedAt: '1700000000',
    lastTradeTimestamp: '0',
    lastElevationTimestamp: '0',
    reserveToken: { name: 'WAVAX', symbol: 'WAVAX', decimals: 18 },
    issuanceToken: {
      name: 'Test Floor Token',
      symbol: 'fTST',
      decimals: 18,
      maxSupplyRaw: '1000000000000000000000000',
      maxSupplyFormatted: '1000000',
    },
    trades: [],
    floorElevations: [],
    __typename: 'Market',
    ...overrides,
  } as any
}

describe('mapMarketToFloorAssetData — floor supply capping', () => {
  it('caps floorSupply at floorSegmentCapacity when floorSupply exceeds it', () => {
    const market = makeMarket({
      floorSupplyFormatted: '500000',
      floorSegmentSupplyFormatted: '400000',
    })
    const result = mapMarketToFloorAssetData(market)
    expect(result.supply.floorSupply).toBe(400000)
  })

  it('passes through floorSupply when it is below floorSegmentCapacity', () => {
    const market = makeMarket({
      floorSupplyFormatted: '200000',
      floorSegmentSupplyFormatted: '400000',
    })
    const result = mapMarketToFloorAssetData(market)
    expect(result.supply.floorSupply).toBe(200000)
  })

  it('passes through floorSupply when floorSegmentCapacity is 0 (not populated)', () => {
    const market = makeMarket({
      floorSupplyFormatted: '500000',
      floorSegmentSupplyFormatted: '0',
    })
    const result = mapMarketToFloorAssetData(market)
    expect(result.supply.floorSupply).toBe(500000)
  })

  it('passes through floorSupply when floorSegmentCapacity fields are missing', () => {
    const market = makeMarket({
      floorSupplyFormatted: '500000',
      floorSegmentSupplyFormatted: undefined,
      floorSegmentSupplyRaw: undefined,
    })
    const result = mapMarketToFloorAssetData(market)
    expect(result.supply.floorSupply).toBe(500000)
  })

  it('uses capped floorSupply in protectedSupplyPercentage', () => {
    const market = makeMarket({
      floorSupplyFormatted: '500000',
      floorSegmentSupplyFormatted: '400000',
      totalSupplyFormatted: '1000000',
    })
    const result = mapMarketToFloorAssetData(market)
    // protectedSupplyPercentage = (400000 / 1000000) * 100 = 40
    expect(result.supply.protectedSupplyPercentage).toBeCloseTo(40, 0)
  })
})
