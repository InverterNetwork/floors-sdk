import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import type { Address } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

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
  const floorsContext = useFloors()
  const resolvedMarket = floorsContext.market.data ?? null
  const {
    refetch: { market: refetchMarket, issuanceBalance: refetchIssuanceBalance },
  } = floorsContext
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const walletAddress = walletClient?.account?.address as Address | undefined

  // Resolve staking manager address from options or market data
  const stakingManagerAddress = useMemo(() => {
    if (options?.stakingManagerAddress) return options.stakingManagerAddress
    // Get from market data (via ModuleRegistry in GraphQL)
    return (resolvedMarket as any)?.stakingManager as Address | undefined
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
    await Promise.allSettled([refetchMarket(), refetchIssuanceBalance()])
  }, [refetchIssuanceBalance, refetchMarket])

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
