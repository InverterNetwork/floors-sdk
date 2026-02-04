import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import type { Address } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import {
  Staking,
  type TStakingApproveParams,
  type TStakingHarvestYieldParams,
  type TStakingMutationResult,
  type TStakingRebalanceParams,
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
  }
}
