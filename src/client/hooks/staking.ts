import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import type { Address } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import { fetchAvailableStrategies, fetchHarvestEvents } from '../../graphql/api/fetchers'
import type { TGraphQLStrategy } from '../../graphql/api/fields/staking'
import {
  Staking,
  type TStakingAddStrategyParams,
  type TStakingApproveCollateralForStrategyParams,
  type TStakingApproveParams,
  type TStakingHarvestYieldParams,
  type TStakingInjectYieldParams,
  type TStakingMutationResult,
  type TStakingRebalanceParams,
  type TStakingRemoveStrategyParams,
  type TStakingSetPerformanceFeeParams,
  type TStakingSimulateLossParams,
  type TStakingStakeParams,
  type TStakingWithdrawParams,
} from '../../staking'
import { useFloors } from '../floors-context'

type UseStakingMutationsReturnType = {
  stake: UseMutationResult<TStakingMutationResult, Error, TStakingStakeParams>
  harvestYield: UseMutationResult<TStakingMutationResult, Error, TStakingHarvestYieldParams>
  withdrawFunds: UseMutationResult<TStakingMutationResult, Error, TStakingWithdrawParams>
  rebalance: UseMutationResult<TStakingMutationResult, Error, TStakingRebalanceParams>
  approveIssuanceToken: UseMutationResult<TStakingMutationResult, Error, TStakingApproveParams>
  getPosition: UseMutationResult<
    { lockedIssuanceTokens: bigint; deployedCollateral: bigint; lastFloorPrice: bigint },
    Error,
    { userAddress: Address; strategyAddress: Address }
  >
  getPositionValue: UseMutationResult<
    bigint,
    Error,
    { userAddress: Address; strategyAddress: Address }
  >
  getAvailableYield: UseMutationResult<
    bigint,
    Error,
    { userAddress: Address; strategyAddress: Address }
  >
  getPerformanceFeeBps: UseMutationResult<number, Error, void>
  isStrategyApproved: UseMutationResult<boolean, Error, Address>
  getIssuanceTokenAllowance: UseMutationResult<bigint, Error, Address | undefined>
  // Admin mutations
  addStrategy: UseMutationResult<TStakingMutationResult, Error, TStakingAddStrategyParams>
  removeStrategy: UseMutationResult<TStakingMutationResult, Error, TStakingRemoveStrategyParams>
  setPerformanceFeeBps: UseMutationResult<
    TStakingMutationResult,
    Error,
    TStakingSetPerformanceFeeParams
  >
  // TestnetStrategy mutations
  injectYield: UseMutationResult<TStakingMutationResult, Error, TStakingInjectYieldParams>
  simulateLoss: UseMutationResult<TStakingMutationResult, Error, TStakingSimulateLossParams>
  getTotalReserve: UseMutationResult<bigint, Error, Address>
  approveCollateralForStrategy: UseMutationResult<
    TStakingMutationResult,
    Error,
    TStakingApproveCollateralForStrategyParams
  >
}

interface UseStakingMutationsOptions {
  stakingManagerAddress?: Address
  issuanceTokenAddress?: Address
}

/**
 * @description Provides staking mutations backed by the pure Staking class.
 */
export const useStakingMutations = (
  options?: UseStakingMutationsOptions
): UseStakingMutationsReturnType => {
  const queryClient = useQueryClient()
  const floorsContext = useFloors()
  const resolvedMarket = floorsContext.market.data ?? null
  const {
    refetch: {
      market: refetchMarket,
      issuanceBalance: refetchIssuanceBalance,
      reserveBalance: refetchReserveBalance,
      userPosition: refetchUserPosition,
    },
  } = floorsContext
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const walletAddress = walletClient?.account?.address as Address | undefined

  // Resolve staking manager address from options or market data
  const stakingManagerAddress = useMemo(() => {
    if (options?.stakingManagerAddress) return options.stakingManagerAddress
    // Get from market data (via ModuleRegistry in GraphQL)
    return (resolvedMarket as any)?.stakingManagerAddress as Address | undefined
  }, [options?.stakingManagerAddress, resolvedMarket])

  // Resolve issuance token address from options or market data
  const issuanceTokenAddress = useMemo(() => {
    if (options?.issuanceTokenAddress) return options.issuanceTokenAddress
    return resolvedMarket?.issuanceToken_id as Address | undefined
  }, [options?.issuanceTokenAddress, resolvedMarket])

  const stakingClient = useMemo(() => {
    if (!stakingManagerAddress || !issuanceTokenAddress || !publicClient) return null
    return new Staking({
      stakingManagerAddress,
      issuanceTokenAddress,
      publicClient,
      walletClient: walletClient ?? undefined,
    })
  }, [stakingManagerAddress, issuanceTokenAddress, publicClient, walletClient])

  const ensureStaking = useCallback(() => {
    if (!stakingClient)
      throw new Error(
        'Staking client unavailable. Ensure stakingManagerAddress and issuanceTokenAddress are provided.'
      )

    return stakingClient
  }, [stakingClient])

  const ensureWalletAddress = useCallback(
    (override?: Address) => {
      const targetAddress = override ?? walletAddress
      if (!targetAddress)
        throw new Error('Wallet not connected. Please connect your wallet to continue.')

      return targetAddress
    },
    [walletAddress]
  )

  const refetchAfterMutation = useCallback(async () => {
    await Promise.allSettled([
      refetchMarket(),
      refetchIssuanceBalance(),
      refetchReserveBalance(),
      refetchUserPosition(),
      queryClient.invalidateQueries({ queryKey: ['stake-positions'] }),
    ])
  }, [
    queryClient,
    refetchIssuanceBalance,
    refetchMarket,
    refetchReserveBalance,
    refetchUserPosition,
  ])

  const stake = useMutation({
    mutationFn: (params: TStakingStakeParams) => ensureStaking().stake(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const harvestYield = useMutation({
    mutationFn: (params: TStakingHarvestYieldParams) => ensureStaking().harvestYield(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const withdrawFunds = useMutation({
    mutationFn: (params: TStakingWithdrawParams) => ensureStaking().withdrawFunds(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const rebalance = useMutation({
    mutationFn: (params: TStakingRebalanceParams) => ensureStaking().rebalance(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const approveIssuanceToken = useMutation({
    mutationFn: (params: TStakingApproveParams) => ensureStaking().approveIssuanceToken(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const getPosition = useMutation({
    mutationFn: async ({
      userAddress,
      strategyAddress,
    }: {
      userAddress: Address
      strategyAddress: Address
    }) => ensureStaking().getPosition(userAddress, strategyAddress),
  })

  const getPositionValue = useMutation({
    mutationFn: async ({
      userAddress,
      strategyAddress,
    }: {
      userAddress: Address
      strategyAddress: Address
    }) => ensureStaking().getPositionValue(userAddress, strategyAddress),
  })

  const getAvailableYield = useMutation({
    mutationFn: async ({
      userAddress,
      strategyAddress,
    }: {
      userAddress: Address
      strategyAddress: Address
    }) => ensureStaking().getAvailableYield(userAddress, strategyAddress),
  })

  const getPerformanceFeeBps = useMutation({
    mutationFn: async () => ensureStaking().getPerformanceFeeBps(),
  })

  const isStrategyApproved = useMutation({
    mutationFn: async (strategyAddress: Address) =>
      ensureStaking().isStrategyApproved(strategyAddress),
  })

  const getIssuanceTokenAllowance = useMutation({
    mutationFn: async (owner?: Address) =>
      ensureStaking().getIssuanceTokenAllowance(ensureWalletAddress(owner)),
  })

  // Admin mutations
  const addStrategy = useMutation({
    mutationFn: (params: TStakingAddStrategyParams) => ensureStaking().addStrategy(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const removeStrategy = useMutation({
    mutationFn: (params: TStakingRemoveStrategyParams) => ensureStaking().removeStrategy(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const setPerformanceFeeBps = useMutation({
    mutationFn: (params: TStakingSetPerformanceFeeParams) =>
      ensureStaking().setPerformanceFeeBps(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  // TestnetStrategy mutations
  const injectYield = useMutation({
    mutationFn: (params: TStakingInjectYieldParams) => ensureStaking().injectYield(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const simulateLoss = useMutation({
    mutationFn: (params: TStakingSimulateLossParams) => ensureStaking().simulateLoss(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const getTotalReserve = useMutation({
    mutationFn: async (strategyAddress: Address) =>
      ensureStaking().getTotalReserve(strategyAddress),
  })

  const approveCollateralForStrategy = useMutation({
    mutationFn: (params: TStakingApproveCollateralForStrategyParams) =>
      ensureStaking().approveCollateralForStrategy(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  return {
    stake,
    harvestYield,
    withdrawFunds,
    rebalance,
    approveIssuanceToken,
    getPosition,
    getPositionValue,
    getAvailableYield,
    getPerformanceFeeBps,
    isStrategyApproved,
    getIssuanceTokenAllowance,
    // Admin
    addStrategy,
    removeStrategy,
    setPerformanceFeeBps,
    // TestnetStrategy
    injectYield,
    simulateLoss,
    getTotalReserve,
    approveCollateralForStrategy,
  }
}

// =============================================================================
// Available Strategies Query Hook
// =============================================================================

/**
 * @description Hook to fetch available staking strategies from the indexer
 * @param activeOnly - Filter to only active strategies (default: true)
 * @param limit - Maximum number of strategies to fetch (default: 100)
 * @returns Query result with available strategies
 */
export const useAvailableStrategies = (activeOnly: boolean = true, limit: number = 100) => {
  return useQuery<TGraphQLStrategy[]>({
    queryKey: ['available-strategies', activeOnly, limit],
    queryFn: () => fetchAvailableStrategies(activeOnly, limit),
    staleTime: 60_000, // 1 minute
    gcTime: 5 * 60_000, // 5 minutes
  })
}

// =============================================================================
// Staking APY Query Hook
// =============================================================================

/**
 * @description Hook to fetch and compute staking APY from strategy HARVEST events
 * @param stakingManagerId - The staking manager ID to fetch APY for
 * @param lookbackDays - Number of days to look back for harvest events (default: 30)
 * @returns Query result with computed APY percentage (e.g., 0.05 = 5%)
 *
 * Calculation:
 *   For each HARVEST event: yieldRate = yieldAmount / collateralAmount
 *   Average yield rate across all harvests
 *   Annualize: APY = avgYieldRate × (365 / lookbackDays)
 *
 * This is strategy-agnostic - works for TestnetStrategy_v1 (injected yield),
 * AaveStrategy (lending yield), or any future strategy type.
 */
export const useStakingAPY = (stakingManagerId: string, lookbackDays: number = 30) => {
  return useQuery<number>({
    queryKey: ['staking-apy', stakingManagerId, lookbackDays],
    queryFn: async () => {
      if (!stakingManagerId) return 0

      // Fetch HARVEST events over the lookback period
      const harvests = await fetchHarvestEvents(stakingManagerId, lookbackDays)

      // Filter to harvests with valid yield and collateral amounts
      const validHarvests = harvests.filter((h) => {
        const yieldAmount = Number(h.yieldAmountFormatted || h.yieldAmountRaw || 0)
        const collateralAmount = Number(h.collateralAmountFormatted || h.collateralAmountRaw || 0)
        return yieldAmount > 0 && collateralAmount > 0
      })

      if (validHarvests.length === 0) return 0

      // Calculate yield rate for each harvest (yield / staked collateral)
      // This gives us the return rate for that harvest event
      const yieldRates = validHarvests.map((h) => {
        const yieldAmount = Number(h.yieldAmountFormatted || h.yieldAmountRaw || 0)
        const collateralAmount = Number(h.collateralAmountFormatted || h.collateralAmountRaw || 0)
        return yieldAmount / collateralAmount
      })

      // Average the yield rates
      const avgYieldRate = yieldRates.reduce((sum, rate) => sum + rate, 0) / yieldRates.length

      // Annualize: if we observed this average rate over lookbackDays, what's the APY?
      // Note: This assumes the yield rate is representative of the period
      const annualizedAPY = avgYieldRate * (365 / lookbackDays)

      return annualizedAPY
    },
    staleTime: 60_000, // 1 minute - APY doesn't need real-time updates
    gcTime: 5 * 60_000, // 5 minutes
    enabled: !!stakingManagerId,
  })
}
