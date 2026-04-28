/**
 * @description Tier-2 Anvil parity test for the local trade simulator. Skipped
 *              unless `INTEGRATION_RPC_URL` and `INTEGRATION_MARKET_ADDRESS`
 *              env vars point at a deployed Floor (with optional Credit
 *              Facility) on a reachable RPC.
 *
 *              When run, this is the canonical bit-exact comparison:
 *                - `Market.previewBuy(deposit)` (RPC: on-chain
 *                  `Floor.calculatePurchaseReturn`) vs
 *                  `Market.simulateBuy(...).tokensReceived` (local).
 *                - `Market.previewSell(amount)` vs
 *                  `Market.simulateSell(...).collateralReceived`.
 *                - End-to-end `CreditFacility.buyAndBorrow(amount, loops, ...)`
 *                  vs `Market.simulateBuyAndBorrow(...)` for 1, 3, 5 loops.
 *                  This is the canonical resolution of Q7 (whether
 *                  `getFloorPrice()` is constant across loop iterations).
 *
 *              The skeleton runs the `previewBuy` / `previewSell` parity. The
 *              full `buyAndBorrow` parity (event-driven assertion against the
 *              CreditFacility loan storage) requires a wallet with collateral
 *              and credit-facility approvals; left as a follow-up so this
 *              test stays cheap to run.
 */
import { beforeAll, describe, expect, it } from 'bun:test'
import { type Address, createPublicClient, http } from 'viem'

import type { TFloorAssetData } from '../../src/graphql/api'
import { Market, type TMarketSimulationContext } from '../../src/market'

const RPC_URL = process.env.INTEGRATION_RPC_URL
const MARKET_ADDRESS = process.env.INTEGRATION_MARKET_ADDRESS as Address | undefined
const ISSUANCE_TOKEN = process.env.INTEGRATION_ISSUANCE_TOKEN as Address | undefined
const RESERVE_TOKEN = process.env.INTEGRATION_RESERVE_TOKEN as Address | undefined
const CREDIT_FACILITY = process.env.INTEGRATION_CREDIT_FACILITY as Address | undefined

const SHOULD_RUN = Boolean(RPC_URL && MARKET_ADDRESS && ISSUANCE_TOKEN && RESERVE_TOKEN)

const describeIntegration = SHOULD_RUN ? describe : describe.skip

describeIntegration('Trade simulation — Anvil parity', () => {
  let market: Market
  let ctx: TMarketSimulationContext

  beforeAll(async () => {
    const publicClient = createPublicClient({
      transport: http(RPC_URL),
    })

    const data: TFloorAssetData = {
      id: MARKET_ADDRESS!,
      contractAddress: MARKET_ADDRESS!,
      issuanceToken_id: ISSUANCE_TOKEN!,
      reserveToken_id: RESERVE_TOKEN!,
      ...(CREDIT_FACILITY ? { creditFacility: CREDIT_FACILITY } : {}),
    } as TFloorAssetData

    market = new Market({ data, publicClient: publicClient as any })
    ctx = await market.fetchSimulationContext()
  })

  it('previewBuy parity: simulator.tokensReceived == on-chain calculatePurchaseReturn', async () => {
    const deposit = BigInt(1_000)
    const onChain = await market.previewBuy(deposit)
    const local = market.simulateBuy({
      depositAmount: deposit,
      segments: ctx.segments,
      totalSupply: ctx.totalSupply,
      buyFeeBps: ctx.buyFeeBps,
    })
    expect(local.tokensReceived).toBe(onChain)
  })

  it('previewSell parity: simulator.collateralReceived == on-chain calculateSaleReturn', async () => {
    // Sell a small fraction of `totalSupply` so the math is stable across blocks.
    const sellAmount = ctx.totalSupply / BigInt(1_000)
    if (sellAmount === BigInt(0)) {
      // Curve is empty; nothing to test.
      return
    }
    const onChain = await market.previewSell(sellAmount)
    const local = market.simulateSell({
      tokensIn: sellAmount,
      segments: ctx.segments,
      totalSupply: ctx.totalSupply,
      sellFeeBps: ctx.sellFeeBps,
    })
    expect(local.collateralReceived).toBe(onChain)
  })

  it('grid parity: previewBuy across multiple deposit sizes', async () => {
    const sizes = [BigInt(1), BigInt(100), BigInt(10_000), BigInt(1_000_000)]
    for (const deposit of sizes) {
      const onChain = await market.previewBuy(deposit)
      const local = market.simulateBuy({
        depositAmount: deposit,
        segments: ctx.segments,
        totalSupply: ctx.totalSupply,
        buyFeeBps: ctx.buyFeeBps,
      })
      expect(local.tokensReceived).toBe(onChain)
    }
  })

  // TODO: end-to-end `buyAndBorrow` parity (1, 3, 5 loops). Requires a funded
  // wallet, reserve-token approval to the credit facility, and reading the
  // emitted `LoanCreated` events to assert per-iteration `loanAmount` and
  // `requiredIssuance`. This is where Q7 (constant `getFloorPrice` across
  // loops) gets verified — see DISCOVERY.md "New Open Question 7".
  it.skip('buyAndBorrow parity (1/3/5 loops) — requires funded wallet + approvals', () => {
    expect(true).toBe(true)
  })
})

if (!SHOULD_RUN) {
  // Bun test treats files with no enabled describe blocks as failures in
  // certain configs; emit a single passing placeholder when skipped.
  describe('Trade simulation — Anvil parity (skipped)', () => {
    it('skipped — set INTEGRATION_RPC_URL + INTEGRATION_MARKET_ADDRESS + INTEGRATION_ISSUANCE_TOKEN + INTEGRATION_RESERVE_TOKEN to enable', () => {
      expect(SHOULD_RUN).toBe(false)
    })
  })
}
