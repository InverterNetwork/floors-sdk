import { describe, expect, it } from 'bun:test'
import { toFunctionSelector } from 'viem'

import { STAKING_SELECTORS, STRATEGY_BASE_SELECTORS } from '../src/utils/selectors'

describe('#selectors', () => {
  it('exposes correct staking manager selectors', () => {
    expect(STAKING_SELECTORS.stake).toBe(toFunctionSelector('stake(address,uint256)'))
    expect(STAKING_SELECTORS.harvestYield).toBe(toFunctionSelector('harvestYield(address,address)'))
    expect(STAKING_SELECTORS.withdrawFunds).toBe(
      toFunctionSelector('withdrawFunds(address,uint256,address)')
    )
    expect(STAKING_SELECTORS.rebalance).toBe(toFunctionSelector('rebalance(address)'))
    expect(STAKING_SELECTORS.addStrategy).toBe(toFunctionSelector('addStrategy(address)'))
    expect(STAKING_SELECTORS.removeStrategy).toBe(toFunctionSelector('removeStrategy(address)'))
    expect(STAKING_SELECTORS.setPerformanceFeeBps).toBe(
      toFunctionSelector('setPerformanceFeeBps(uint256)')
    )
  })

  it('exposes correct strategy base selectors', () => {
    expect(STRATEGY_BASE_SELECTORS.deposit).toBe(toFunctionSelector('deposit(uint256,address)'))
    expect(STRATEGY_BASE_SELECTORS.withdraw).toBe(
      toFunctionSelector('withdraw(uint256,address,address)')
    )
  })
})
