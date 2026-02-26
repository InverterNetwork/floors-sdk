'use client'

import { useMutation, type UseMutationOptions, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import { Deploy } from '../../deploy'
import type { DeployStrategyParams, DeployStrategyResult } from '../../deploy-strategy'
import { DeployStrategy } from '../../deploy-strategy'

// =============================================================================
// Types
// =============================================================================

export type { DeployStrategyParams, DeployStrategyResult }

/**
 * @description Parameters for the deploy strategy mutation
 */
export type UseDeployStrategyParams = DeployStrategyParams

// =============================================================================
// Hook
// =============================================================================

export type UseDeployStrategyOptions = {
  /** Mutation options for the deploy strategy operation */
  deployOptions?: Omit<
    UseMutationOptions<DeployStrategyResult, Error, UseDeployStrategyParams>,
    'mutationFn'
  >
}

/**
 * @description Hook for deploying TestnetStrategy contracts
 * Provides mutation for deploying new strategies
 *
 * @example
 * ```tsx
 * const { deployStrategy, isDeploying, deployedStrategy } = useDeployStrategy()
 *
 * const handleDeploy = async () => {
 *   const result = await deployStrategy.mutateAsync({
 *     floorAddress: '0x...',
 *     authorizerAddress: '0x...',
 *     feeTreasuryAddress: '0x...',
 *     trustedForwarderAddress: '0x...',
 *   })
 *   console.log('Strategy deployed:', result.strategyAddress)
 * }
 * ```
 */
export function useDeployStrategy(options?: UseDeployStrategyOptions) {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  /**
   * @description Get a configured DeployStrategy instance
   */
  const getDeployStrategyInstance = useCallback((): DeployStrategy => {
    if (!publicClient) {
      throw new Error('Public client not available')
    }
    if (!walletClient) {
      throw new Error('Please connect your wallet')
    }

    return new DeployStrategy({
      publicClient,
      walletClient,
    })
  }, [publicClient, walletClient])

  /**
   * @description Get a configured Deploy instance for fetching trusted forwarder
   */
  const getDeployInstance = useCallback((): Deploy => {
    if (!publicClient) {
      throw new Error('Public client not available')
    }
    if (!walletClient) {
      throw new Error('Please connect your wallet')
    }

    return new Deploy({
      publicClient,
      walletClient,
    })
  }, [publicClient, walletClient])

  /**
   * @description Deploy a new TestnetStrategy
   */
  const deployMutation = useMutation({
    mutationFn: async (params: UseDeployStrategyParams): Promise<DeployStrategyResult> => {
      if (!address) {
        throw new Error('Wallet not connected')
      }

      const deploy = getDeployStrategyInstance()

      return deploy.deployStrategy(params)
    },
    ...options?.deployOptions,
  })

  /**
   * @description Query for fetching the trusted forwarder address
   */
  const trustedForwarderQuery = useQuery({
    queryKey: ['trusted-forwarder'],
    queryFn: async (): Promise<Address> => {
      const deploy = getDeployInstance()
      return deploy.getTrustedForwarderAddress()
    },
    staleTime: 5 * 60_000, // 5 minutes
    gcTime: 10 * 60_000, // 10 minutes
  })

  return {
    /** Mutation for deploying a strategy */
    deployStrategy: deployMutation,
    /** Whether a strategy is being deployed */
    isDeploying: deployMutation.isPending,
    /** The deployed strategy result (if successful) */
    deployedStrategy: deployMutation.data ?? null,
    /** Error from deploy mutation */
    deployError: deployMutation.error,
    /** Trusted forwarder address query */
    trustedForwarder: trustedForwarderQuery.data ?? null,
    /** Whether trusted forwarder is loading */
    isLoadingTrustedForwarder: trustedForwarderQuery.isLoading,
    /** Error from trusted forwarder query */
    trustedForwarderError: trustedForwarderQuery.error,
    /** Reset the mutation */
    reset: () => {
      deployMutation.reset()
    },
  }
}
