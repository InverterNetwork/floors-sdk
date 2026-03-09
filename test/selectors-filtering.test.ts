/**
 * @description Tests for selector filtering utilities
 *
 * Validates the getSelectorsByModuleType function and related utilities
 * for filtering function selectors by module type.
 */

import { describe, expect, it } from 'bun:test'

import {
  getSelectorsByModule,
  getSelectorsByModuleType,
  MODULE_DISPLAY_NAMES,
  SELECTOR_BY_HASH,
  type SelectorModuleType,
} from '../src/utils/selectors'

// =============================================================================
// Test Suite
// =============================================================================

describe('getSelectorsByModuleType', () => {
  describe('Floor Module Selectors', () => {
    it('should return all floor selectors', () => {
      const floorSelectors = getSelectorsByModuleType('floor')

      expect(floorSelectors.length).toBeGreaterThan(0)
      expect(floorSelectors.every((s) => s.module === 'floor')).toBe(true)

      // Check for key floor functions
      const functionNames = floorSelectors.map((s) => s.name)
      expect(functionNames).toContain('buy')
      expect(functionNames).toContain('sell')
      expect(functionNames).toContain('enableBuy')
      expect(functionNames).toContain('enableSell')
    })

    it('should have correct display name for floor module', () => {
      expect(MODULE_DISPLAY_NAMES.floor).toBe('Floor (Issuance)')
    })
  })

  describe('CreditFacility Module Selectors', () => {
    it('should return all credit facility selectors', () => {
      const cfSelectors = getSelectorsByModuleType('creditFacility')

      expect(cfSelectors.length).toBeGreaterThan(0)
      expect(cfSelectors.every((s) => s.module === 'creditFacility')).toBe(true)

      // Check for key credit facility functions
      const functionNames = cfSelectors.map((s) => s.name)
      expect(functionNames).toContain('borrow')
      expect(functionNames).toContain('repay')
      expect(functionNames).toContain('buyAndBorrow')
    })

    it('should have correct display name for credit facility module', () => {
      expect(MODULE_DISPLAY_NAMES.creditFacility).toBe('Credit Facility')
    })
  })

  describe('Presale Module Selectors', () => {
    it('should return all presale selectors', () => {
      const presaleSelectors = getSelectorsByModuleType('presale')

      expect(presaleSelectors.length).toBeGreaterThan(0)
      expect(presaleSelectors.every((s) => s.module === 'presale')).toBe(true)

      // Check for key presale functions
      const functionNames = presaleSelectors.map((s) => s.name)
      expect(functionNames).toContain('setPresaleState')
      expect(functionNames).toContain('setCaps')
      expect(functionNames).toContain('setEndTimestamp')
    })

    it('should have correct display name for presale module', () => {
      expect(MODULE_DISPLAY_NAMES.presale).toBe('Presale')
    })
  })

  describe('Staking Module Selectors', () => {
    it('should return all staking selectors', () => {
      const stakingSelectors = getSelectorsByModuleType('staking')

      expect(stakingSelectors.length).toBeGreaterThan(0)
      expect(stakingSelectors.every((s) => s.module === 'staking')).toBe(true)

      // Check for key staking functions
      const functionNames = stakingSelectors.map((s) => s.name)
      expect(functionNames).toContain('stake')
      expect(functionNames).toContain('harvestYield')
      expect(functionNames).toContain('withdrawFunds')
      expect(functionNames).toContain('rebalance')
    })

    it('should have correct display name for staking module', () => {
      expect(MODULE_DISPLAY_NAMES.staking).toBe('Staking Manager')
    })
  })

  describe('Strategy Base Module Selectors', () => {
    it('should return all strategy base selectors', () => {
      const strategySelectors = getSelectorsByModuleType('strategyBase')

      expect(strategySelectors.length).toBeGreaterThan(0)
      expect(strategySelectors.every((s) => s.module === 'strategyBase')).toBe(true)

      // Check for key strategy functions
      const functionNames = strategySelectors.map((s) => s.name)
      expect(functionNames).toContain('deposit')
      expect(functionNames).toContain('withdraw')
    })

    it('should have correct display name for strategy base module', () => {
      expect(MODULE_DISPLAY_NAMES.strategyBase).toBe('Strategy Base')
    })
  })

  describe('Treasury Module Selectors', () => {
    it('should return all treasury selectors', () => {
      const treasurySelectors = getSelectorsByModuleType('treasury')

      expect(treasurySelectors.length).toBeGreaterThan(0)
      expect(treasurySelectors.every((s) => s.module === 'treasury')).toBe(true)

      // Check for key treasury functions
      const functionNames = treasurySelectors.map((s) => s.name)
      expect(functionNames).toContain('setFloorFeePercentage')
      expect(functionNames).toContain('setFloorFeeTreasury')
      expect(functionNames).toContain('setRecipients')
    })

    it('should have correct display name for treasury module', () => {
      expect(MODULE_DISPLAY_NAMES.treasury).toBe('Fee Treasury')
    })
  })
})

describe('getSelectorsByModule', () => {
  it('should return all modules with their selectors', () => {
    const allSelectors = getSelectorsByModule()

    expect(allSelectors.floor).toBeDefined()
    expect(allSelectors.creditFacility).toBeDefined()
    expect(allSelectors.presale).toBeDefined()
    expect(allSelectors.staking).toBeDefined()
    expect(allSelectors.strategyBase).toBeDefined()
    expect(allSelectors.treasury).toBeDefined()
  })

  it('should have consistent counts across module types', () => {
    const allSelectors = getSelectorsByModule()

    // Verify each module type matches getSelectorsByModuleType
    expect(allSelectors.floor).toEqual(getSelectorsByModuleType('floor'))
    expect(allSelectors.creditFacility).toEqual(getSelectorsByModuleType('creditFacility'))
    expect(allSelectors.presale).toEqual(getSelectorsByModuleType('presale'))
    expect(allSelectors.staking).toEqual(getSelectorsByModuleType('staking'))
    expect(allSelectors.strategyBase).toEqual(getSelectorsByModuleType('strategyBase'))
    expect(allSelectors.treasury).toEqual(getSelectorsByModuleType('treasury'))
  })
})

describe('SELECTOR_BY_HASH', () => {
  it('should have entries for all registered selectors', () => {
    const allSelectors = getSelectorsByModule()
    const allModuleTypes = Object.keys(allSelectors) as SelectorModuleType[]

    for (const moduleType of allModuleTypes) {
      for (const selector of allSelectors[moduleType]) {
        const found = SELECTOR_BY_HASH.get(selector.selector.toLowerCase())
        expect(found).toBeDefined()
        expect(found?.name).toBe(selector.name)
        expect(found?.module).toBe(moduleType)
      }
    }
  })

  it('should return undefined for unknown selectors', () => {
    const unknown = SELECTOR_BY_HASH.get('0x00000000')
    expect(unknown).toBeUndefined()
  })
})

describe('Selector Uniqueness', () => {
  it('should have unique selectors across all modules', () => {
    const allSelectors = getSelectorsByModule()
    const allModuleTypes = Object.keys(allSelectors) as SelectorModuleType[]

    const selectorSet = new Set<string>()
    const duplicates: string[] = []

    for (const moduleType of allModuleTypes) {
      for (const selector of allSelectors[moduleType]) {
        const key = selector.selector.toLowerCase()
        if (selectorSet.has(key)) {
          duplicates.push(`${selector.name} (${selector.selector})`)
        } else {
          selectorSet.add(key)
        }
      }
    }

    expect(duplicates).toHaveLength(0)
    if (duplicates.length > 0) {
      console.error('Duplicate selectors found:', duplicates)
    }
  })
})

describe('Selector Structure', () => {
  it('should have valid selector format', () => {
    const allSelectors = getSelectorsByModule()
    const allModuleTypes = Object.keys(allSelectors) as SelectorModuleType[]

    for (const moduleType of allModuleTypes) {
      for (const selector of allSelectors[moduleType]) {
        // Selector should be a valid hex string starting with 0x
        expect(selector.selector).toMatch(/^0x[0-9a-f]+$/i)

        // Selector should be 4 bytes (10 characters including 0x)
        expect(selector.selector.length).toBe(10)

        // Should have name and description
        expect(selector.name).toBeTruthy()
        expect(selector.description).toBeTruthy()
        expect(selector.module).toBe(moduleType)
      }
    }
  })
})
