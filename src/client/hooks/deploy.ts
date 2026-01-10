'use client'

import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import {
  Deploy,
  type DeployTokenParams,
  type DeployTokenResult,
  type TokenConfig,
} from '../../deploy'

// =============================================================================
// Types
// =============================================================================

export type { DeployTokenParams, DeployTokenResult, TokenConfig }

/**
 * @description Parameters for the deploy token mutation
 */
export type UseDeployTokenParams = {
  /** Token configuration */
  config: TokenConfig
  /** Override the owner address (uses connected wallet by default) */
  ownerAddress?: Address
}

// =============================================================================
// Hook
// =============================================================================

export type UseDeployOptions = {
  /** Mutation options for the deploy token operation */
  deployOptions?: Omit<
    UseMutationOptions<DeployTokenResult, Error, UseDeployTokenParams>,
    'mutationFn'
  >
}

/**
 * @description Hook for deploying ERC20Issuance tokens
 * Provides mutation for deploying new tokens
 *
 * @example
 * ```tsx
 * const { deploy, isDeploying, deployedToken } = useDeploy()
 *
 * const handleDeploy = async () => {
 *   const result = await deploy.mutateAsync({
 *     config: {
 *       name: 'Floor AVAX',
 *       symbol: 'fAVAX',
 *       decimals: 18,
 *       maxSupply: BigInt(0),
 *     },
 *   })
 *   console.log('Token deployed:', result.tokenAddress)
 * }
 * ```
 */
export function useDeploy(options?: UseDeployOptions) {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  /**
   * @description Get a configured Deploy instance
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
   * @description Deploy a new ERC20Issuance token
   */
  const deployMutation = useMutation({
    mutationFn: async (params: UseDeployTokenParams): Promise<DeployTokenResult> => {
      const ownerAddress = params.ownerAddress ?? address
      if (!ownerAddress) {
        throw new Error('Wallet not connected')
      }

      const deploy = getDeployInstance()

      return deploy.deployToken({
        config: params.config,
        ownerAddress,
      })
    },
    ...options?.deployOptions,
  })

  return {
    /** Mutation for deploying a token */
    deploy: deployMutation,
    /** Whether a token is being deployed */
    isDeploying: deployMutation.isPending,
    /** The deployed token result (if successful) */
    deployedToken: deployMutation.data ?? null,
    /** Error from deploy mutation */
    deployError: deployMutation.error,
    /** Reset the mutation */
    reset: () => {
      deployMutation.reset()
    },
  }
}
