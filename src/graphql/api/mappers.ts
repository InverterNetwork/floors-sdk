import { orderBy, sumBy } from 'lodash'

import type {
  TCreditPositionData,
  TFloorAssetData,
  TGraphQLAccount,
  TGraphQLLoan,
  TGraphQLMarket,
  TGraphQLPresale,
  TGraphQLTrade,
  TPresale,
  TTradeData,
  TUserAssetPosition,
} from './fields'
import { buildSegments, formatCurrency, formatTokenAmount, safePercentage, toNumber } from './utils'

export function mapMarketToFloorAssetData(market: TGraphQLMarket): TFloorAssetData {
  const floorPrice = toNumber(market.floorPriceFormatted || market.floorPriceRaw)
  const marketPrice = toNumber(market.currentPriceFormatted || market.currentPriceRaw)
  const totalSupply = toNumber(market.totalSupplyFormatted || market.totalSupplyRaw)
  const marketSupply = toNumber(market.marketSupplyFormatted || market.marketSupplyRaw)
  const floorSupply = toNumber(market.floorSupplyFormatted || market.floorSupplyRaw)
  const trades = market.trades ?? []
  const floorElevations = market.floorElevations ?? []

  const totalVolume = sumBy(trades, (trade) =>
    toNumber(trade.reserveAmountFormatted || trade.reserveAmountRaw)
  )
  const totalFees = sumBy(trades, (trade) => toNumber(trade.feeFormatted || trade.feeRaw))

  const sortedElevations = orderBy(
    floorElevations,
    [(event) => toNumber(event.timestamp)],
    ['desc']
  )

  const latestElevation = sortedElevations[0]
  const secondElevation = sortedElevations[1]

  const estimatedFloorIncrease =
    latestElevation && secondElevation
      ? toNumber(latestElevation.newFloorPriceFormatted || latestElevation.newFloorPriceRaw) -
        toNumber(secondElevation.newFloorPriceFormatted || secondElevation.newFloorPriceRaw)
      : latestElevation
        ? toNumber(latestElevation.newFloorPriceFormatted || latestElevation.newFloorPriceRaw) -
          floorPrice
        : 0

  const elevationHistory = sortedElevations.map((event, index) => {
    const previousFloor = toNumber(event.oldFloorPriceFormatted || event.oldFloorPriceRaw)
    const nextFloor = toNumber(event.newFloorPriceFormatted || event.newFloorPriceRaw)
    const feesDeployed = toNumber(event.deployedAmountFormatted || event.deployedAmountRaw)
    return {
      timestamp: new Date(toNumber(event.timestamp) * 1000),
      previousFloorPrice: previousFloor,
      newFloorPrice: nextFloor,
      feesDeployed,
      liquidityAdded: feesDeployed * 1.3,
      priceIncrease: nextFloor - previousFloor,
      segmentsAffected: [index],
      transactionHash: event.transactionHash,
    }
  })

  const pricing = {
    currentFloorPrice: floorPrice,
    currentMarketPrice: marketPrice,
    staticBuyPrice: marketPrice * 1.05,
    staticSellPrice: marketPrice * 0.99,
    virtualCollateralSupply: floorSupply * 1.2,
    priceImpactBuy: 0.015,
    priceImpactSell: 0.01,
    guaranteedFloorProtection: floorPrice,
  }

  const totalFeesDeployed = sumBy(elevationHistory, (event) => event.feesDeployed)
  const floorElevation = {
    totalFeesAccumulated: totalFees,
    deployableFeesAmount: totalFees * 0.4,
    totalFeesDeployed,
    lastElevationAt: latestElevation
      ? new Date(toNumber(latestElevation.timestamp) * 1000)
      : new Date(),
    elevationHistory,
    nextElevationThreshold: totalFees + 5000,
    estimatedFloorIncrease: Math.max(0, estimatedFloorIncrease),
  }

  const supply = {
    marketSupply,
    floorSupply,
    totalIssuanceSupply: totalSupply,
    nonRedeemableFloorSupply: Math.max(0, floorSupply - marketSupply),
    marketToFloorRatio: safePercentage(marketSupply / Math.max(floorSupply, 1)),
    protectedSupplyPercentage: safePercentage(floorSupply / Math.max(totalSupply, 1)) * 100,
  }

  const fees = {
    buyFeeRate: toNumber(market.buyFeeBps) / 10000,
    sellFeeRate: toNumber(market.sellFeeBps) / 10000,
    totalFeesCollected: totalFees,
    feesAvailableForDeployment: totalFees * 0.6,
    feeCollectionRate24h: totalFees / 24,
    protocolFeePercentage: 0.1,
  }

  const maxLtv = toNumber(market.maxLTV)
  const maxCreditRatio = maxLtv > 1 ? Math.min(1, maxLtv / 1e18) : Math.min(1, maxLtv)

  const credit = {
    totalCreditIssued: totalVolume * 0.8,
    creditUtilization: safePercentage(marketSupply / Math.max(totalSupply, 1)) * 0.9,
    maxCreditRatio,
    liquidationFree: true,
    avgCreditRatio: safePercentage((maxCreditRatio + marketSupply / Math.max(totalSupply, 1)) / 2),
    creditGrowthRate: 0.2,
  }

  const metrics = {
    volume24h: totalVolume,
    volumeTotal: totalVolume * 30,
    transactionCount: trades.length,
    holders: Math.max(100, trades.length * 4),
    creditPositions: floorElevations.length,
    totalValueLocked: totalSupply * marketPrice,
    marketCap: marketSupply * marketPrice,
  }

  const riskLevel: 'low' | 'medium' | 'high' =
    estimatedFloorIncrease > 2 ? 'low' : estimatedFloorIncrease > 1 ? 'medium' : 'high'

  const statusInfo = {
    isActive: market.status === 'ACTIVE',
    tradingEnabled: Boolean(market.isBuyOpen && market.isSellOpen),
    creditEnabled: true,
    isAppreciating: estimatedFloorIncrease > 0,
    riskLevel,
  }

  const name = market.id ? `Floor Market ${market.id.slice(0, 6)}` : 'Floor Market'
  const symbol = market.id ? `FM${market.id.slice(2, 6).toUpperCase()}` : 'FMKT'

  const displayFloorPrice = formatCurrency(floorPrice)
  const displayMarketPrice = formatCurrency(marketPrice)

  const segments = buildSegments(marketSupply, floorPrice, Math.max(totalSupply, 1))

  return {
    ...market,
    name,
    symbol,
    description: `Floor price asset backed by market ${market.id}`,
    projectLinks: {},
    pricing,
    supply,
    floorElevation,
    fees,
    credit,
    statusInfo,
    metrics,
    timestamps: {
      createdAt: new Date(toNumber(market.createdAt || Date.now())),
      updatedAt: new Date(toNumber(market.lastUpdatedAt || Date.now())),
    },
    segments,
    contractAddress: market.id,
    displayFloorPrice,
    displayMarketPrice,
    staticBuyPrice: formatCurrency(pricing.staticBuyPrice),
    staticSellPrice: formatCurrency(pricing.staticSellPrice),
    floorElevationRate: `${floorElevation.estimatedFloorIncrease.toFixed(1)}%`,
    isFloorElevating: floorElevations.length > 0,
    creditUtilizationPercent: `${(credit.creditUtilization * 100).toFixed(1)}%`,
    nextFloorTarget: formatCurrency(
      floorPrice + Math.max(1, floorElevation.estimatedFloorIncrease)
    ),
  }
}

export function mapTradeToTradeData(trade: TGraphQLTrade): TTradeData {
  const tokenAmount = toNumber(trade.tokenAmountFormatted || trade.tokenAmountRaw)
  const reserveAmount = toNumber(trade.reserveAmountFormatted || trade.reserveAmountRaw)
  const fee = toNumber(trade.feeFormatted || trade.feeRaw)
  const priceBefore = tokenAmount ? reserveAmount / tokenAmount : 0
  const type = trade.tradeType === 'BUY' ? 'buy' : trade.tradeType === 'SELL' ? 'sell' : 'buy'

  return {
    ...trade,
    assetAddress: trade.market_id,
    type,
    amounts: {
      input: reserveAmount,
      output: tokenAmount,
      fee,
    },
    prices: {
      before: priceBefore,
      after: priceBefore,
      priceImpact: 0,
    },
    timestampDate: new Date(toNumber(trade.timestamp) * 1000),
    gasUsed: 0,
    blockNumber: 0,
    displayAmounts: {
      input: formatCurrency(reserveAmount),
      output: formatTokenAmount(tokenAmount, trade.market_id),
      fee: formatCurrency(fee),
    },
    status: 'confirmed',
  }
}

export function buildAccountUserPositions(
  account: TGraphQLAccount,
  assets: TFloorAssetData[]
): TUserAssetPosition[] {
  const assetMap = new Map<string, TFloorAssetData>(assets.map((asset) => [asset.id, asset]))
  const aggregates = new Map<string, { balance: number; costBasis: number }>()

  for (const trade of account.trades ?? []) {
    const asset = assetMap.get(trade.market_id)
    if (!asset) continue
    const tokenAmount = toNumber(trade.tokenAmountFormatted || trade.tokenAmountRaw)
    const reserveAmount = toNumber(trade.reserveAmountFormatted || trade.reserveAmountRaw)
    const entry = aggregates.get(trade.market_id) ?? { balance: 0, costBasis: 0 }
    if (trade.tradeType === 'BUY') {
      entry.balance += tokenAmount
      entry.costBasis += reserveAmount
    } else if (trade.tradeType === 'SELL') {
      entry.balance -= tokenAmount
      entry.costBasis = Math.max(0, entry.costBasis - reserveAmount)
    }
    aggregates.set(trade.market_id, entry)
  }

  return Array.from(aggregates.entries())
    .map(([marketId, data]) => {
      const asset = assetMap.get(marketId)
      if (!asset || data.balance <= 0) return null
      const currentValue = data.balance * asset.pricing.currentMarketPrice
      const floorValue = data.balance * asset.pricing.currentFloorPrice
      const unrealizedGains = currentValue - data.costBasis
      const floorProtection = formatCurrency(floorValue)
      const appreciation = floorValue ? ((currentValue - floorValue) / floorValue) * 100 : 0
      const displayBalance = formatTokenAmount(data.balance, asset.symbol)
      return {
        assetId: marketId,
        asset,
        balance: data.balance,
        averagePurchasePrice: data.costBasis / Math.max(data.balance, 1),
        currentValue,
        floorProtectedValue: floorValue,
        unrealizedGains,
        yieldEarned: Math.max(0, unrealizedGains * 0.05),
        displayBalance,
        displayValue: formatCurrency(currentValue),
        displayGains: formatCurrency(unrealizedGains),
        floorProtectionAmount: floorProtection,
        positionSize: currentValue > 500000 ? 'large' : currentValue > 100000 ? 'medium' : 'small',
        appreciationRate: `${appreciation.toFixed(1)}%`,
      }
    })
    .filter(Boolean) as TUserAssetPosition[]
}

export function mapPresaleToPresaleData(presale: TGraphQLPresale): TPresale {
  const now = Date.now()
  const startTime = toNumber(presale.startTime) * 1000
  const endTime = toNumber(presale.endTime) * 1000
  const totalRaised = toNumber(presale.totalRaisedFormatted || presale.totalRaisedRaw)
  const globalDepositCap = toNumber(
    presale.globalDepositCapFormatted || presale.globalDepositCapRaw
  )
  console.log('globalDepositCapFormatted', presale.globalDepositCapFormatted)
  console.log('totalRaised', presale.totalRaisedRaw)
  // Calculate progress
  const progressPercent = globalDepositCap > 0 ? (totalRaised / globalDepositCap) * 100 : 0
  console.log('progressPercent', progressPercent)
  // Calculate time remaining
  const timeRemaining = Math.max(0, endTime - now)

  // Determine state
  const isUpcoming = now < startTime
  const isActive = now >= startTime && now < endTime && presale.currentState === 1
  const isEnded = now >= endTime || presale.currentState !== 1

  // Format time remaining
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
  let timeRemainingFormatted = ''
  if (days > 0) {
    timeRemainingFormatted = `${days}d ${hours}h`
  } else if (hours > 0) {
    timeRemainingFormatted = `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    timeRemainingFormatted = `${minutes}m`
  } else {
    timeRemainingFormatted = 'Ended'
  }

  // Calculate commission (using first commissionBps if array)
  const commissionBps = Array.isArray(presale.commissionBps)
    ? toNumber(presale.commissionBps[0])
    : toNumber(presale.commissionBps)
  const commissionRate = commissionBps / 10000
  const commissionAmount = totalRaised * commissionRate
  const commissionAmountFormatted = formatCurrency(commissionAmount)

  // Calculate remaining capacity
  const remainingCapacity = Math.max(0, globalDepositCap - totalRaised)
  const remainingCapacityFormatted = formatCurrency(remainingCapacity)

  // Calculate current price (use first price breakpoint if available)
  const priceBreakpoints = presale.priceBreakpointsFlat
    ? presale.priceBreakpointsFlat.map((p) => toNumber(p))
    : []
  const currentPrice = priceBreakpoints.length > 0 ? priceBreakpoints[0] : 0
  const currentPriceFormatted = formatCurrency(currentPrice)

  return {
    ...presale,
    progressPercent: Math.min(100, Math.max(0, progressPercent)),
    timeRemaining,
    isActive,
    isEnded,
    isUpcoming,
    timeRemainingFormatted,
    commissionAmount,
    commissionAmountFormatted,
    remainingCapacity,
    remainingCapacityFormatted,
    currentPrice,
    currentPriceFormatted,
  }
}

export function buildCreditPositions(
  loans: TGraphQLLoan[],
  assets: TFloorAssetData[]
): TCreditPositionData[] {
  const assetMap = new Map<string, TFloorAssetData>(assets.map((asset) => [asset.id, asset]))
  return loans
    .map((loan) => {
      const asset = assetMap.get(loan.market_id)
      if (!asset) return null
      const collateralAmount = toNumber(loan.lockedCollateralFormatted || loan.lockedCollateralRaw)
      const borrowAmount = toNumber(loan.borrowAmountFormatted || loan.borrowAmountRaw)
      const collateralValue = collateralAmount * asset.pricing.currentFloorPrice
      const borrowedValue = borrowAmount
      const creditRatio = collateralValue ? borrowedValue / collateralValue : 0
      return {
        ...loan,
        positionId: loan.id,
        asset,
        collateral: {
          amount: collateralAmount,
          value: collateralValue,
          displayAmount: formatTokenAmount(collateralAmount, asset.symbol),
          displayValue: formatCurrency(collateralValue),
        },
        borrowed: {
          amount: borrowAmount,
          value: borrowedValue,
          displayAmount: formatTokenAmount(borrowAmount, asset.symbol),
          displayValue: formatCurrency(borrowedValue),
        },
        creditRatio,
        liquidationFree: true,
        floorPriceProtection: asset.pricing.currentFloorPrice,
        healthFactor: 1 + (1 - creditRatio),
        timeCreated: new Date(toNumber(loan.openedAt) * 1000),
        lastUpdated: loan.lastUpdatedAt
          ? new Date(toNumber(loan.lastUpdatedAt) * 1000)
          : new Date(),
        creditUtilizationPercent: `${(creditRatio * 100).toFixed(1)}%`,
        safetyMargin: Math.max(0, 1 - creditRatio),
        estimatedLiquidationPrice: 'Never',
        loanStatus: creditRatio > 0.8 ? 'protected' : creditRatio > 0.6 ? 'safe' : 'healthy',
      }
    })
    .filter(Boolean) as TCreditPositionData[]
}
