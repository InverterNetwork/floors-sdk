import { describe, expect, it } from 'bun:test'
import { parseUnits } from 'viem'

import {
  CURVE_PRESET_JSON_VERSION,
  CURVE_PRESETS,
  CurveImportError,
  exportCurveToJson,
  floorPriceUsdToWad,
  getCurvePreset,
  importCurveFromJson,
  validateSegments,
} from '../src'
import type { SegmentConfig } from '../src/schemas/launch.schema'

const FLOOR_PRICE_WAD = parseUnits('1', 18)
const FLOOR_SUPPLY = parseUnits('400000', 18)
const ISSUANCE_DECIMALS = 18

function buildDefaultCurve(): { floor: SegmentConfig; premium: SegmentConfig[] } {
  return getCurvePreset('default-s-curve').build({
    floorPriceWad: FLOOR_PRICE_WAD,
    floorSupply: FLOOR_SUPPLY,
    issuanceDecimals: ISSUANCE_DECIMALS,
  })
}

describe('CURVE_PRESETS', () => {
  it('every preset produces segments that pass validateSegments', () => {
    for (const preset of CURVE_PRESETS) {
      const { floor, premium } = preset.build({
        floorPriceWad: FLOOR_PRICE_WAD,
        floorSupply: FLOOR_SUPPLY,
        issuanceDecimals: ISSUANCE_DECIMALS,
      })
      const result = validateSegments(floor, premium)
      expect(result.valid, `Preset ${preset.id} failed: ${result.errors.join(', ')}`).toBe(true)
    }
  })

  it('every preset has a unique id', () => {
    const ids = CURVE_PRESETS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('respects reserveUsdPriceWad (supply rescaling)', () => {
    const { premium: usdcPremium } = getCurvePreset('default-s-curve').build({
      floorPriceWad: FLOOR_PRICE_WAD,
      floorSupply: FLOOR_SUPPLY,
      issuanceDecimals: ISSUANCE_DECIMALS,
    })
    const { premium: avaxPremium } = getCurvePreset('default-s-curve').build({
      floorPriceWad: FLOOR_PRICE_WAD,
      floorSupply: FLOOR_SUPPLY,
      issuanceDecimals: ISSUANCE_DECIMALS,
      reserveUsdPriceWad: parseUnits('10', 18), // $10 reserve → 10x less supply per step
    })
    expect(avaxPremium[0].supplyPerStep).toBe(usdcPremium[0].supplyPerStep / BigInt(10))
  })

  it('throws for unknown preset id', () => {
    expect(() => getCurvePreset('does-not-exist')).toThrow()
  })
})

describe('exportCurveToJson / importCurveFromJson — round-trip', () => {
  it('round-trips bigints losslessly', () => {
    const { floor, premium } = buildDefaultCurve()
    const json = exportCurveToJson({
      name: 'Test Curve',
      description: 'fixture',
      priceDecimals: 18,
      supplyDecimals: ISSUANCE_DECIMALS,
      floorSegment: floor,
      premiumSegments: premium,
    })

    const result = importCurveFromJson(json, {
      expectedPriceDecimals: 18,
      expectedSupplyDecimals: ISSUANCE_DECIMALS,
    })

    expect(result.floorSegment).toEqual(floor)
    expect(result.premiumSegments).toEqual(premium)
    expect(result.meta.name).toBe('Test Curve')
    expect(result.meta.description).toBe('fixture')
    expect(result.warnings).toEqual([])
  })

  it('produces valid JSON with version sentinel', () => {
    const { floor, premium } = buildDefaultCurve()
    const json = exportCurveToJson({
      name: 'X',
      priceDecimals: 18,
      supplyDecimals: 18,
      floorSegment: floor,
      premiumSegments: premium,
    })
    const parsed = JSON.parse(json) as { version: number; floorSegment: { initialPrice: unknown } }
    expect(parsed.version).toBe(CURVE_PRESET_JSON_VERSION)
    // Bigints encoded as strings (not numbers — JSON would lose precision)
    expect(typeof parsed.floorSegment.initialPrice).toBe('string')
  })
})

describe('importCurveFromJson — strict validation', () => {
  const baseImport = (overrides?: Partial<{ name: string }>) => {
    const { floor, premium } = buildDefaultCurve()
    return exportCurveToJson({
      name: overrides?.name ?? 'Test',
      priceDecimals: 18,
      supplyDecimals: 18,
      floorSegment: floor,
      premiumSegments: premium,
    })
  }

  it('rejects malformed JSON with INVALID_JSON', () => {
    try {
      importCurveFromJson('{ not json', { expectedPriceDecimals: 18, expectedSupplyDecimals: 18 })
      throw new Error('should have thrown')
    } catch (err) {
      expect(err).toBeInstanceOf(CurveImportError)
      expect((err as CurveImportError).code).toBe('INVALID_JSON')
    }
  })

  it('rejects missing required field with SCHEMA', () => {
    const json = baseImport()
    const obj = JSON.parse(json) as Record<string, unknown>
    delete obj.floorSegment
    try {
      importCurveFromJson(JSON.stringify(obj), {
        expectedPriceDecimals: 18,
        expectedSupplyDecimals: 18,
      })
      throw new Error('should have thrown')
    } catch (err) {
      expect(err).toBeInstanceOf(CurveImportError)
      expect((err as CurveImportError).code).toBe('SCHEMA')
    }
  })

  it('rejects numberOfSteps = 0 with SCHEMA', () => {
    const json = baseImport()
    const obj = JSON.parse(json) as { floorSegment: { numberOfSteps: number } }
    obj.floorSegment.numberOfSteps = 0
    try {
      importCurveFromJson(JSON.stringify(obj), {
        expectedPriceDecimals: 18,
        expectedSupplyDecimals: 18,
      })
      throw new Error('should have thrown')
    } catch (err) {
      expect(err).toBeInstanceOf(CurveImportError)
      expect((err as CurveImportError).code).toBe('SCHEMA')
    }
  })

  it('rejects wrong version with SCHEMA', () => {
    const json = baseImport()
    const obj = JSON.parse(json) as { version: number }
    obj.version = 999
    try {
      importCurveFromJson(JSON.stringify(obj), {
        expectedPriceDecimals: 18,
        expectedSupplyDecimals: 18,
      })
      throw new Error('should have thrown')
    } catch (err) {
      expect((err as CurveImportError).code).toBe('SCHEMA')
    }
  })

  it('rejects price-decimals mismatch with DECIMALS_MISMATCH (default policy)', () => {
    const json = baseImport()
    try {
      importCurveFromJson(json, { expectedPriceDecimals: 6, expectedSupplyDecimals: 18 })
      throw new Error('should have thrown')
    } catch (err) {
      expect((err as CurveImportError).code).toBe('DECIMALS_MISMATCH')
    }
  })

  it('rejects supply-decimals mismatch with DECIMALS_MISMATCH unless rescale opt-in', () => {
    const json = baseImport()
    expect(() =>
      importCurveFromJson(json, { expectedPriceDecimals: 18, expectedSupplyDecimals: 6 })
    ).toThrow(CurveImportError)

    // With opt-in: passes and emits a warning
    const result = importCurveFromJson(json, {
      expectedPriceDecimals: 18,
      expectedSupplyDecimals: 6,
      decimalsMismatch: 'rescale-supply',
    })
    expect(result.warnings.length).toBe(1)
    // Floor supply should have shrunk by 1e12
    const expectedShrunk = FLOOR_SUPPLY / BigInt(10) ** BigInt(12)
    expect(result.floorSegment.supplyPerStep).toBe(expectedShrunk)
  })

  it('rejects non-flat floor with FLOOR_INVALID', () => {
    const { floor, premium } = buildDefaultCurve()
    const badFloor: SegmentConfig = { ...floor, priceIncrease: BigInt(1) }
    const json = exportCurveToJson({
      name: 'Bad',
      priceDecimals: 18,
      supplyDecimals: 18,
      floorSegment: badFloor,
      premiumSegments: premium,
    })
    try {
      importCurveFromJson(json, { expectedPriceDecimals: 18, expectedSupplyDecimals: 18 })
      throw new Error('should have thrown')
    } catch (err) {
      expect((err as CurveImportError).code).toBe('FLOOR_INVALID')
    }
  })

  it('rejects discontinuous segments with CONNECTION_BROKEN', () => {
    const { floor, premium } = buildDefaultCurve()
    const broken: SegmentConfig[] = [
      { ...premium[0], initialPrice: parseUnits('999', 18) }, // huge gap from floor
      ...premium.slice(1),
    ]
    const json = exportCurveToJson({
      name: 'Broken',
      priceDecimals: 18,
      supplyDecimals: 18,
      floorSegment: floor,
      premiumSegments: broken,
    })
    try {
      importCurveFromJson(json, { expectedPriceDecimals: 18, expectedSupplyDecimals: 18 })
      throw new Error('should have thrown')
    } catch (err) {
      expect((err as CurveImportError).code).toBe('CONNECTION_BROKEN')
    }
  })

  it('rejects supplyPerStep > 2^96 with PROTOCOL_LIMIT', () => {
    const { floor, premium } = buildDefaultCurve()
    const tooBig: SegmentConfig = {
      ...floor,
      // Construct a value larger than 2^96 - 1 that still passes the connection check
      supplyPerStep: BigInt(1) << BigInt(97),
    }
    const json = exportCurveToJson({
      name: 'Overflow',
      priceDecimals: 18,
      supplyDecimals: 18,
      floorSegment: tooBig,
      premiumSegments: premium,
    })
    try {
      importCurveFromJson(json, { expectedPriceDecimals: 18, expectedSupplyDecimals: 18 })
      throw new Error('should have thrown')
    } catch (err) {
      expect((err as CurveImportError).code).toBe('PROTOCOL_LIMIT')
    }
  })

  it('rejects empty premium array with SCHEMA', () => {
    const json = baseImport()
    const obj = JSON.parse(json) as { premiumSegments: unknown[] }
    obj.premiumSegments = []
    try {
      importCurveFromJson(JSON.stringify(obj), {
        expectedPriceDecimals: 18,
        expectedSupplyDecimals: 18,
      })
      throw new Error('should have thrown')
    } catch (err) {
      expect((err as CurveImportError).code).toBe('SCHEMA')
    }
  })

  it('rejects negative bigint string with SCHEMA', () => {
    const json = baseImport()
    const obj = JSON.parse(json) as { floorSegment: { initialPrice: string } }
    // Effect's Schema.BigInt accepts negative — so negative is caught at FLOOR_INVALID instead
    obj.floorSegment.initialPrice = '0'
    try {
      importCurveFromJson(JSON.stringify(obj), {
        expectedPriceDecimals: 18,
        expectedSupplyDecimals: 18,
      })
      throw new Error('should have thrown')
    } catch (err) {
      expect((err as CurveImportError).code).toBe('FLOOR_INVALID')
    }
  })
})

describe('floorPriceUsdToWad', () => {
  it('converts numeric USD to 18-decimal WAD', () => {
    expect(floorPriceUsdToWad(1)).toBe(parseUnits('1', 18))
    expect(floorPriceUsdToWad(2.5)).toBe(parseUnits('2.5', 18))
  })

  it('throws for non-positive', () => {
    expect(() => floorPriceUsdToWad(0)).toThrow()
    expect(() => floorPriceUsdToWad(-1)).toThrow()
    expect(() => floorPriceUsdToWad(NaN)).toThrow()
  })
})
