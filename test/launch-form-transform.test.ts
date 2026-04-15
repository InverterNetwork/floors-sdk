import { describe, expect, it } from 'bun:test'
import { parseUnits } from 'viem'

import {
  normalizeIssuanceAmountFromWadOrNative,
  normalizeReservePriceFromWadOrNative,
  transformLaunchFormDataToLaunchConfig,
} from '../src/utils/segments'

const zeroAddr = '0x0000000000000000000000000000000000000001' as const

describe('normalizeReservePriceFromWadOrNative', () => {
  it('scales WAD (>= 1e18) down for 6-decimal reserve', () => {
    expect(normalizeReservePriceFromWadOrNative(parseUnits('1', 18), 6)).toBe(parseUnits('1', 6))
    expect(normalizeReservePriceFromWadOrNative(parseUnits('50', 18), 6)).toBe(parseUnits('50', 6))
  })

  it('leaves native 6-decimal units unchanged', () => {
    expect(normalizeReservePriceFromWadOrNative(parseUnits('50', 6), 6)).toBe(parseUnits('50', 6))
  })

  it('leaves 18-decimal reserve prices unchanged regardless of magnitude', () => {
    const p = parseUnits('1', 18)
    expect(normalizeReservePriceFromWadOrNative(p, 18)).toBe(p)
  })
})

describe('normalizeIssuanceAmountFromWadOrNative', () => {
  it('rescales WAD-like multiples for issuance < 18 decimals', () => {
    const wrong = 400_000n * 10n ** 18n
    const want = 400_000n * 10n ** 6n
    expect(normalizeIssuanceAmountFromWadOrNative(wrong, 6)).toBe(want)
  })

  it('leaves correct native issuance amounts', () => {
    const ok = 400_000n * 10n ** 6n
    expect(normalizeIssuanceAmountFromWadOrNative(ok, 6)).toBe(ok)
  })
})

describe('transformLaunchFormDataToLaunchConfig', () => {
  it('scales 18-decimal WAD segment and presale prices to reserve native (incl. sub-1e18 WAD per step)', () => {
    const base = {
      issuanceToken: {
        mode: 'existing' as const,
        existingAddress: zeroAddr,
        newToken: { name: '', symbol: '', decimals: 18, maxSupply: 0n },
      },
      reserveTokenAddress: zeroAddr,
      reserveTokenDecimals: 6,
      issuanceTokenDecimals: 18,
      floorSegment: {
        initialPrice: parseUnits('1', 18),
        priceIncrease: 0n,
        supplyPerStep: 1000n * 10n ** 18n,
        numberOfSteps: 1,
      },
      premiumSegments: [
        {
          // Same convention as create-market UI: WAD for prices (not reserve-native).
          initialPrice: parseUnits('2', 18),
          priceIncrease: parseUnits('0.1', 18),
          supplyPerStep: 500n * 10n ** 18n,
          numberOfSteps: 2,
        },
      ],
      buyFeeBps: 100,
      sellFeeBps: 100,
      recipients: [{ address: zeroAddr, shares: 10000n }],
      floorFeePercentage: 0,
      creditFacility: {
        enabled: false,
        loanToValueRatio: 9900,
        maxLeverage: 1,
        borrowingFeeRate: 0,
      },
      staking: { enabled: false, performanceFeeBps: 0 },
      presale: {
        enabled: true,
        creditFacilityAddress: '',
        maxLeverage: 1,
        baseCommissionBps: [350n, 800n],
        endTimestamp: 0n,
        globalIssuanceCap: 0n,
        perAddressIssuanceCap: 0n,
        priceBreakpoints: [[parseUnits('1', 18)]],
        initialMultiplier: 10000n,
        decayDuration: 0n,
      },
      configuration: {
        grantMinterRole: true,
        openBuy: true,
        openSell: false,
      },
    }

    const creator = '0x0000000000000000000000000000000000000002' as const
    const cfg = transformLaunchFormDataToLaunchConfig(base, creator)

    expect(cfg.floor.segments[0].initialPrice).toBe(parseUnits('1', 6))
    expect(cfg.floor.segments[1].initialPrice).toBe(parseUnits('2', 6))
    expect(cfg.floor.segments[1].priceIncrease).toBe(parseUnits('0.1', 6))
    expect(cfg.presale?.priceBreakpoints[0][0]).toBe(parseUnits('1', 6))
  })
})
