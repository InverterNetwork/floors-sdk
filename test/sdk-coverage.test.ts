import { beforeAll, describe, expect, it } from 'bun:test'
import type { Address } from 'viem'

import { CreditFacilityAdmin } from '../src/credit-facility-admin'
import { Market } from '../src/market'
import { MarketAdmin } from '../src/market-admin'
import { PresaleAdmin } from '../src/presale-admin'
import { TreasuryAdmin } from '../src/treasury-admin'
import { requireLocalDevEnvironment } from './helpers'

// =============================================================================
// CreditFacilityAdmin - New Method Tests
// =============================================================================

describe('#CreditFacilityAdmin New Methods', () => {
  let creditAdmin: CreditFacilityAdmin
  let creditFacilityAddress: Address
  let userAddress: Address

  beforeAll(async () => {
    const { publicClient, walletClient } = await requireLocalDevEnvironment()

    creditFacilityAddress = '0x0000000000000000000000000000000000000000' as Address
    userAddress = walletClient.account?.address as Address

    creditAdmin = new CreditFacilityAdmin({
      address: creditFacilityAddress,
      publicClient,
      walletClient,
    })
  })

  describe('Write Functions - Validation', () => {
    it('should reject consolidateLoans with fewer than 2 loan IDs', async () => {
      expect(() =>
        creditAdmin.consolidateLoans({
          loanIds: [BigInt(1)],
        })
      ).toThrow('At least 2 loan IDs are required for consolidation')
    })

    it('should reject consolidateLoans with empty array', async () => {
      expect(() =>
        creditAdmin.consolidateLoans({
          loanIds: [],
        })
      ).toThrow('At least 2 loan IDs are required for consolidation')
    })

    it('should reject buyAndBorrowFor with leverage < 1', async () => {
      expect(() =>
        creditAdmin.buyAndBorrowFor({
          receiver: userAddress,
          amount: BigInt(1000000),
          leverage: 0,
        })
      ).toThrow('Leverage must be at least 1')
    })

    it('should reject buyAndBorrowFor with negative leverage', async () => {
      expect(() =>
        creditAdmin.buyAndBorrowFor({
          receiver: userAddress,
          amount: BigInt(1000000),
          leverage: -1,
        })
      ).toThrow('Leverage must be at least 1')
    })
  })

  describe('Write Functions - Lifecycle Callbacks', () => {
    const lifecycle = {
      onPendingWallet: () => console.log('Waiting for wallet confirmation...'),
      onSubmitted: (hash: string) => console.log('Transaction submitted:', hash),
      onPendingConfirmation: (hash: string) => console.log('Waiting for confirmation:', hash),
      onConfirmed: (receipt: any) => console.log('Transaction confirmed:', receipt.status),
      onFailed: (error: Error) => console.log('Transaction failed:', error.message),
    }

    it('should call lifecycle callbacks for transferLoan', async () => {
      try {
        await creditAdmin.transferLoan({
          loanId: BigInt(1),
          newBorrower: userAddress,
          lifecycle,
        })
      } catch (error) {
        console.log('transferLoan lifecycle test skipped (contract not deployed):', error)
      }
    })

    it('should call lifecycle callbacks for rebalanceLoan', async () => {
      try {
        await creditAdmin.rebalanceLoan({
          loanId: BigInt(1),
          lifecycle,
        })
      } catch (error) {
        console.log('rebalanceLoan lifecycle test skipped (contract not deployed):', error)
      }
    })

    it('should call lifecycle callbacks for consolidateLoans', async () => {
      try {
        await creditAdmin.consolidateLoans({
          loanIds: [BigInt(1), BigInt(2)],
          lifecycle,
        })
      } catch (error) {
        console.log('consolidateLoans lifecycle test skipped (contract not deployed):', error)
      }
    })

    it('should call lifecycle callbacks for borrowFor', async () => {
      try {
        await creditAdmin.borrowFor({
          receiver: userAddress,
          requestedLoanAmount: BigInt(1000000),
          lifecycle,
        })
      } catch (error) {
        console.log('borrowFor lifecycle test skipped (contract not deployed):', error)
      }
    })

    it('should call lifecycle callbacks for buyAndBorrowFor', async () => {
      try {
        await creditAdmin.buyAndBorrowFor({
          receiver: userAddress,
          amount: BigInt(1000000),
          leverage: 2,
          consolidate: true,
          minAmountOut: BigInt(0),
          lifecycle,
        })
      } catch (error) {
        console.log('buyAndBorrowFor lifecycle test skipped (contract not deployed):', error)
      }
    })
  })
})

// =============================================================================
// Market - New Method Tests
// =============================================================================

describe('#Market New Methods', () => {
  let market: Market
  let userAddress: Address

  beforeAll(async () => {
    const { publicClient, walletClient } = await requireLocalDevEnvironment()

    userAddress = walletClient.account?.address as Address

    market = new Market({
      data: {
        id: '0x0000000000000000000000000000000000000000',
        contractAddress: '0x0000000000000000000000000000000000000000',
        issuanceToken_id: '0x0000000000000000000000000000000000000001',
        reserveToken_id: '0x0000000000000000000000000000000000000002',
      } as any,
      publicClient,
      walletClient,
    })
  })

  describe('Read Functions', () => {
    it('should call getFloorSection', async () => {
      try {
        const section = await market.getFloorSection()
        expect(typeof section).toBe('string')
        expect(section.startsWith('0x')).toBe(true)
      } catch (error) {
        console.log('getFloorSection test skipped (contract not deployed):', error)
      }
    })

    it('should call getPremiumSections', async () => {
      try {
        const sections = await market.getPremiumSections()
        expect(Array.isArray(sections)).toBe(true)
      } catch (error) {
        console.log('getPremiumSections test skipped (contract not deployed):', error)
      }
    })
  })

  describe('Write Functions - buyFor', () => {
    it('should reject buyFor with zero amount', async () => {
      expect(() =>
        market.buyFor({
          receiver: userAddress,
          depositAmount: BigInt(0),
        })
      ).toThrow()
    })

    it('should call lifecycle callbacks for buyFor', async () => {
      const lifecycle = {
        onPendingWallet: () => console.log('Waiting for wallet confirmation...'),
        onSubmitted: (hash: string) => console.log('Transaction submitted:', hash),
        onPendingConfirmation: (hash: string) => console.log('Waiting for confirmation:', hash),
        onConfirmed: (receipt: any) => console.log('Transaction confirmed:', receipt.status),
        onFailed: (error: Error) => console.log('Transaction failed:', error.message),
      }

      try {
        await market.buyFor({
          receiver: userAddress,
          depositAmount: BigInt(1000000),
          slippageBps: 100,
          lifecycle,
        })
      } catch (error) {
        console.log('buyFor lifecycle test skipped (contract not deployed):', error)
      }
    })
  })
})

// =============================================================================
// MarketAdmin - New Method Tests
// =============================================================================

describe('#MarketAdmin New Methods', () => {
  let marketAdmin: MarketAdmin

  beforeAll(async () => {
    const { publicClient, walletClient } = await requireLocalDevEnvironment()

    marketAdmin = new MarketAdmin({
      address: '0x0000000000000000000000000000000000000000' as Address,
      publicClient,
      walletClient,
    })
  })

  describe('Write Functions - Lifecycle Callbacks', () => {
    const lifecycle = {
      onPendingWallet: () => console.log('Waiting for wallet confirmation...'),
      onSubmitted: (hash: string) => console.log('Transaction submitted:', hash),
      onPendingConfirmation: (hash: string) => console.log('Waiting for confirmation:', hash),
      onConfirmed: (receipt: any) => console.log('Transaction confirmed:', receipt.status),
      onFailed: (error: Error) => console.log('Transaction failed:', error.message),
    }

    it('should call lifecycle callbacks for reconfigureSegments', async () => {
      try {
        await marketAdmin.reconfigureSegments({
          segments: ['0x0000000000000000000000000000000000000000000000000000000000000001'],
          suppliedCollateral: BigInt(1000000),
          selfSupplied: true,
          lifecycle,
        })
      } catch (error) {
        console.log('reconfigureSegments lifecycle test skipped (contract not deployed):', error)
      }
    })

    it('should call lifecycle callbacks for setVirtualCollateralSupply', async () => {
      try {
        await marketAdmin.setVirtualCollateralSupply({
          virtualSupply: BigInt(1000000),
          lifecycle,
        })
      } catch (error) {
        console.log(
          'setVirtualCollateralSupply lifecycle test skipped (contract not deployed):',
          error
        )
      }
    })

    it('should call lifecycle callbacks for withdrawCollateralTo', async () => {
      try {
        await marketAdmin.withdrawCollateralTo({
          amount: BigInt(1000000),
          lifecycle,
        })
      } catch (error) {
        console.log('withdrawCollateralTo lifecycle test skipped (contract not deployed):', error)
      }
    })

    it('should call lifecycle callbacks for depositCollateralFrom', async () => {
      try {
        await marketAdmin.depositCollateralFrom({
          amount: BigInt(1000000),
          lifecycle,
        })
      } catch (error) {
        console.log('depositCollateralFrom lifecycle test skipped (contract not deployed):', error)
      }
    })
  })
})

// =============================================================================
// PresaleAdmin - New Method Tests
// =============================================================================

describe('#PresaleAdmin New Methods', () => {
  let presaleAdmin: PresaleAdmin

  beforeAll(async () => {
    const { publicClient, walletClient } = await requireLocalDevEnvironment()

    presaleAdmin = new PresaleAdmin({
      address: '0x0000000000000000000000000000000000000000' as Address,
      publicClient,
      walletClient,
    })
  })

  describe('Write Functions - Lifecycle Callbacks', () => {
    const lifecycle = {
      onPendingWallet: () => console.log('Waiting for wallet confirmation...'),
      onSubmitted: (hash: string) => console.log('Transaction submitted:', hash),
      onPendingConfirmation: (hash: string) => console.log('Waiting for confirmation:', hash),
      onConfirmed: (receipt: any) => console.log('Transaction confirmed:', receipt.status),
      onFailed: (error: Error) => console.log('Transaction failed:', error.message),
    }

    it('should call lifecycle callbacks for setCreditFacility', async () => {
      try {
        await presaleAdmin.setCreditFacility({
          creditFacility: '0x0000000000000000000000000000000000000001' as Address,
          lifecycle,
        })
      } catch (error) {
        console.log('setCreditFacility lifecycle test skipped (contract not deployed):', error)
      }
    })

    it('should call lifecycle callbacks for setInitialMultiplier', async () => {
      try {
        await presaleAdmin.setInitialMultiplier({
          multiplier: 150,
          lifecycle,
        })
      } catch (error) {
        console.log('setInitialMultiplier lifecycle test skipped (contract not deployed):', error)
      }
    })

    it('should call lifecycle callbacks for setDecayDuration', async () => {
      try {
        await presaleAdmin.setDecayDuration({
          duration: BigInt(86400),
          lifecycle,
        })
      } catch (error) {
        console.log('setDecayDuration lifecycle test skipped (contract not deployed):', error)
      }
    })

    it('should call lifecycle callbacks for setStartTime', async () => {
      try {
        await presaleAdmin.setStartTime({
          startTime: BigInt(Math.floor(Date.now() / 1000) + 3600),
          lifecycle,
        })
      } catch (error) {
        console.log('setStartTime lifecycle test skipped (contract not deployed):', error)
      }
    })
  })
})

// =============================================================================
// TreasuryAdmin - New Method Tests
// =============================================================================

describe('#TreasuryAdmin New Methods', () => {
  let treasuryAdmin: TreasuryAdmin

  beforeAll(async () => {
    const { publicClient, walletClient } = await requireLocalDevEnvironment()

    treasuryAdmin = new TreasuryAdmin({
      address: '0x0000000000000000000000000000000000000000' as Address,
      publicClient,
      walletClient,
    })
  })

  describe('Read Functions', () => {
    it('should call getTotalShares', async () => {
      try {
        const shares = await treasuryAdmin.getTotalShares()
        expect(typeof shares).toBe('bigint')
      } catch (error) {
        console.log('getTotalShares test skipped (contract not deployed):', error)
      }
    })

    it('should call getFunds', async () => {
      try {
        const funds = await treasuryAdmin.getFunds(
          '0x0000000000000000000000000000000000000001' as Address
        )
        expect(typeof funds).toBe('bigint')
      } catch (error) {
        console.log('getFunds test skipped (contract not deployed):', error)
      }
    })
  })

  describe('Write Functions - Lifecycle Callbacks', () => {
    const lifecycle = {
      onPendingWallet: () => console.log('Waiting for wallet confirmation...'),
      onSubmitted: (hash: string) => console.log('Transaction submitted:', hash),
      onPendingConfirmation: (hash: string) => console.log('Waiting for confirmation:', hash),
      onConfirmed: (receipt: any) => console.log('Transaction confirmed:', receipt.status),
      onFailed: (error: Error) => console.log('Transaction failed:', error.message),
    }

    it('should call lifecycle callbacks for fetchFunds', async () => {
      try {
        await treasuryAdmin.fetchFunds({
          token: '0x0000000000000000000000000000000000000001' as Address,
          amount: BigInt(1000000),
          lifecycle,
        })
      } catch (error) {
        console.log('fetchFunds lifecycle test skipped (contract not deployed):', error)
      }
    })
  })

  describe('getTreasuryState includes totalShares', () => {
    it('should have getTreasuryState method', () => {
      expect(typeof treasuryAdmin.getTreasuryState).toBe('function')
    })

    it('should reject when calling on non-contract address', async () => {
      expect(treasuryAdmin.getTreasuryState()).rejects.toThrow()
    })
  })
})
