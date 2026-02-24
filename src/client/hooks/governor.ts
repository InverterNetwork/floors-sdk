'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address, TransactionReceipt } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import {
  Governor,
  type GovernorRole,
  type TAcceptOwnershipParams,
  type TBeaconAddressParams,
  type TBeaconDetails,
  type TBeaconTimelock,
  type TGovernorEvent,
  type TGovernorParams,
  type TGovernorState,
  type TRegisterMetadataParams,
  type TSetModuleFactoryParams,
  type TSetTimelockPeriodParams,
  type TUpgradeBeaconParams,
} from '../../governor'

// =============================================================================
// Types
// =============================================================================

export type { GovernorRole, TBeaconDetails, TBeaconTimelock, TGovernorEvent, TGovernorState }

// =============================================================================
// useGovernor Hook
// =============================================================================

export function useGovernor(governorAddress?: Address) {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const { address: walletAddress } = useAccount()
  const queryClient = useQueryClient()

  const getReadOnlyInstance = useCallback((): Governor | null => {
    if (!publicClient || !governorAddress) return null
    return new Governor({ governorAddress, publicClient })
  }, [publicClient, governorAddress])

  const getWriteInstance = useCallback((): Governor => {
    if (!publicClient) throw new Error('Public client not available')
    if (!walletClient) throw new Error('Please connect your wallet')
    if (!governorAddress) throw new Error('Governor address not available')
    return new Governor({ governorAddress, publicClient, walletClient })
  }, [publicClient, walletClient, governorAddress])

  // ===========================================================================
  // Queries
  // ===========================================================================

  const governorStateQuery = useQuery({
    queryKey: ['governor', 'state', governorAddress],
    queryFn: async (): Promise<TGovernorState> => {
      const instance = getReadOnlyInstance()
      if (!instance) throw new Error('Governor not available')
      return instance.getGovernorState()
    },
    enabled: !!publicClient && !!governorAddress,
    staleTime: 60_000,
  })

  const walletRoleQuery = useQuery({
    queryKey: ['governor', 'walletRole', governorAddress, walletAddress],
    queryFn: async (): Promise<GovernorRole> => {
      const instance = getReadOnlyInstance()
      if (!instance || !walletAddress) return null
      return instance.getConnectedWalletRole(walletAddress)
    },
    enabled: !!publicClient && !!governorAddress && !!walletAddress,
    staleTime: 60_000,
  })

  const beaconDetailsQuery = useQuery({
    queryKey: [
      'governor',
      'beaconDetails',
      governorAddress,
      governorStateQuery.data?.linkedBeacons,
    ],
    queryFn: async (): Promise<(TBeaconDetails & { timelock: TBeaconTimelock })[]> => {
      const instance = getReadOnlyInstance()
      if (!instance || !governorStateQuery.data?.linkedBeacons) return []

      const results = await Promise.all(
        governorStateQuery.data.linkedBeacons.map(async (beacon) => {
          const [details, timelock] = await Promise.all([
            instance.getBeaconDetails(beacon),
            instance.getBeaconTimelock(beacon),
          ])
          return { ...details, timelock }
        })
      )
      return results
    },
    enabled:
      !!publicClient && !!governorAddress && !!governorStateQuery.data?.linkedBeacons?.length,
    staleTime: 60_000,
  })

  // ===========================================================================
  // Mutations
  // ===========================================================================

  const setModuleFactory = useMutation({
    mutationFn: (params: TSetModuleFactoryParams): Promise<TransactionReceipt> => {
      return getWriteInstance().setModuleFactory(params)
    },
    onSuccess: () => refetch(),
  })

  const setTimelockPeriod = useMutation({
    mutationFn: (params: TSetTimelockPeriodParams): Promise<TransactionReceipt> => {
      return getWriteInstance().setTimelockPeriod(params)
    },
    onSuccess: () => refetch(),
  })

  const registerMetadataInModuleFactory = useMutation({
    mutationFn: (params: TRegisterMetadataParams): Promise<TransactionReceipt> => {
      return getWriteInstance().registerMetadataInModuleFactory(params)
    },
    onSuccess: () => refetch(),
  })

  const registerNonModuleBeacon = useMutation({
    mutationFn: (params: TBeaconAddressParams): Promise<TransactionReceipt> => {
      return getWriteInstance().registerNonModuleBeacon(params)
    },
    onSuccess: () => refetch(),
  })

  const upgradeBeaconWithTimelock = useMutation({
    mutationFn: (params: TUpgradeBeaconParams): Promise<TransactionReceipt> => {
      return getWriteInstance().upgradeBeaconWithTimelock(params)
    },
    onSuccess: () => refetch(),
  })

  const triggerUpgradeBeaconWithTimelock = useMutation({
    mutationFn: (params: TBeaconAddressParams): Promise<TransactionReceipt> => {
      return getWriteInstance().triggerUpgradeBeaconWithTimelock(params)
    },
    onSuccess: () => refetch(),
  })

  const cancelUpgrade = useMutation({
    mutationFn: (params: TBeaconAddressParams): Promise<TransactionReceipt> => {
      return getWriteInstance().cancelUpgrade(params)
    },
    onSuccess: () => refetch(),
  })

  const initiateBeaconShutdown = useMutation({
    mutationFn: (params: TBeaconAddressParams): Promise<TransactionReceipt> => {
      return getWriteInstance().initiateBeaconShutdown(params)
    },
    onSuccess: () => refetch(),
  })

  const initiateBeaconShutdownForAllLinkedBeacons = useMutation({
    mutationFn: (params?: TGovernorParams): Promise<TransactionReceipt> => {
      return getWriteInstance().initiateBeaconShutdownForAllLinkedBeacons(params)
    },
    onSuccess: () => refetch(),
  })

  const forceUpgradeBeaconAndRestartImplementation = useMutation({
    mutationFn: (params: TUpgradeBeaconParams): Promise<TransactionReceipt> => {
      return getWriteInstance().forceUpgradeBeaconAndRestartImplementation(params)
    },
    onSuccess: () => refetch(),
  })

  const restartBeaconImplementation = useMutation({
    mutationFn: (params: TBeaconAddressParams): Promise<TransactionReceipt> => {
      return getWriteInstance().restartBeaconImplementation(params)
    },
    onSuccess: () => refetch(),
  })

  const acceptOwnership = useMutation({
    mutationFn: (params: TAcceptOwnershipParams): Promise<TransactionReceipt> => {
      return getWriteInstance().acceptOwnership(params)
    },
    onSuccess: () => refetch(),
  })

  // ===========================================================================
  // Helpers
  // ===========================================================================

  const refetch = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['governor'] })
  }, [queryClient])

  const walletRole = walletRoleQuery.data ?? null
  const isCommunity = walletRole === 'community'
  const isTeam = walletRole === 'team'
  const hasRole = isCommunity || isTeam

  const isLoading =
    setModuleFactory.isPending ||
    setTimelockPeriod.isPending ||
    registerMetadataInModuleFactory.isPending ||
    registerNonModuleBeacon.isPending ||
    upgradeBeaconWithTimelock.isPending ||
    triggerUpgradeBeaconWithTimelock.isPending ||
    cancelUpgrade.isPending ||
    initiateBeaconShutdown.isPending ||
    initiateBeaconShutdownForAllLinkedBeacons.isPending ||
    forceUpgradeBeaconAndRestartImplementation.isPending ||
    restartBeaconImplementation.isPending ||
    acceptOwnership.isPending

  return {
    // State
    governorState: governorStateQuery.data ?? null,
    isLoadingState: governorStateQuery.isLoading,
    stateError: governorStateQuery.error,

    // Beacons
    beaconDetails: beaconDetailsQuery.data ?? [],
    isLoadingBeacons: beaconDetailsQuery.isLoading,

    // Role
    walletRole,
    isCommunity,
    isTeam,
    hasRole,
    isLoadingRole: walletRoleQuery.isLoading,

    // Mutations — Configuration (Community only)
    setModuleFactory,
    setTimelockPeriod,

    // Mutations — Beacon Registration (Community or Team)
    registerMetadataInModuleFactory,
    registerNonModuleBeacon,

    // Mutations — Beacon Upgrades (Community or Team)
    upgradeBeaconWithTimelock,
    triggerUpgradeBeaconWithTimelock,
    cancelUpgrade,

    // Mutations — Emergency (Community or Team, force = Community only)
    initiateBeaconShutdown,
    initiateBeaconShutdownForAllLinkedBeacons,
    forceUpgradeBeaconAndRestartImplementation,
    restartBeaconImplementation,

    // Mutations — Ownership (Community or Team)
    acceptOwnership,

    // Combined state
    isLoading,
    refetch,
  }
}

// =============================================================================
// useGovernorEvents Hook
// =============================================================================

export function useGovernorEvents(
  governorAddress?: Address,
  options?: { fromBlock?: bigint; toBlock?: bigint }
) {
  const publicClient = usePublicClient()

  return useQuery({
    queryKey: ['governor', 'events', governorAddress, options?.fromBlock, options?.toBlock],
    queryFn: async (): Promise<TGovernorEvent[]> => {
      if (!publicClient || !governorAddress) return []
      const governor = new Governor({ governorAddress, publicClient })
      return governor.getEventHistory(options?.fromBlock, options?.toBlock)
    },
    enabled: !!publicClient && !!governorAddress,
    staleTime: 30_000,
  })
}
