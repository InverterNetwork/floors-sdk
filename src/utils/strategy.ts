/**
 * Truncates an address to the format 0x1234...5678
 */
function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export type FormatStrategyLabelInput = {
  id: string
  name?: string | null
  symbol?: string | null
  collateralTokenSymbol?: string | null
}

export type FormatStrategyLabelResult = {
  label: string
  collateralSymbol: string | undefined
  truncatedAddress: string
}

/**
 * Formats a human-readable label for a strategy, with collateral info and truncated address.
 */
export function formatStrategyLabel(input: FormatStrategyLabelInput): FormatStrategyLabelResult {
  const truncated = truncateAddress(input.id)
  const collateralSymbol = input.collateralTokenSymbol ?? undefined

  const label = input.name ?? input.symbol ?? `Strategy ${truncated}`

  return {
    label,
    collateralSymbol,
    truncatedAddress: truncated,
  }
}
