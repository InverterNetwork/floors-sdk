import { calculateFloorSupplyForTargetMarketCapUsd } from './segments'

/** USD floor liquidity target for the create-market flow (matches default template with USDC). */
export const TARGET_FLOOR_LIQUIDITY_USD = 400_000

/**
 * Issuance supply on the floor segment so that, at 1 reserve token per issuance token (WAD 1e18),
 * total USD raised on the floor ≈ {@link TARGET_FLOOR_LIQUIDITY_USD}.
 */
export function floorSupplyForTargetUsd(reserveUsdPrice: number, issuanceDecimals: number): bigint {
  return calculateFloorSupplyForTargetMarketCapUsd({
    targetFloorMarketCapUsd: TARGET_FLOOR_LIQUIDITY_USD,
    /** USD per issuance token when curve price is 1 reserve unit (= oracle USD per reserve token). */
    floorPriceUsdPerIssuanceToken: reserveUsdPrice,
    issuanceDecimals,
  })
}
