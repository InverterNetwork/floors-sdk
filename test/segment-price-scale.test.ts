import { describe, expect, it } from 'bun:test'
import { parseUnits } from 'viem'

import { scaleSegmentPricesWadToReserve } from '../src/utils/segments'

describe('scaleSegmentPricesWadToReserve', () => {
  it('leaves prices unchanged when reserve uses 18 decimals', () => {
    const wad = parseUnits('1', 18)
    const inc = parseUnits('0.01', 18)
    const out = scaleSegmentPricesWadToReserve({ initialPrice: wad, priceIncrease: inc }, 18)
    expect(out.initialPrice).toBe(wad)
    expect(out.priceIncrease).toBe(inc)
  })

  it('scales WAD prices down for 6-decimal reserve (e.g. USDC)', () => {
    const wad = parseUnits('1', 18)
    const inc = parseUnits('0.01', 18)
    const out = scaleSegmentPricesWadToReserve({ initialPrice: wad, priceIncrease: inc }, 6)
    expect(out.initialPrice).toBe(parseUnits('1', 6))
    expect(out.priceIncrease).toBe(parseUnits('0.01', 6))
  })
})
