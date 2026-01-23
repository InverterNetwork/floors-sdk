'use client'

import { useMutation, type UseMutationOptions, useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import type { Address, Hex, TransactionReceipt } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import { generateMerkleTree, type MerkleTreeData } from '../../merkle-tree'
import { Presale } from '../../presale'
import {
  fetchMerkleProof as fetchMerkleProofFromIPFS,
  type PinataConfig,
  type PinataUploadResult,
  uploadMerkleTree as uploadMerkleTreeToIPFS,
} from '../../server/pinata'
import { useFloors } from '../floors-context'

// ============================================================================
// Types
// ============================================================================

export type UseUploadMerkleTreeParams = {
  addresses: Address[]
}

export type UseUploadMerkleTreeResult = PinataUploadResult & {
  treeData: MerkleTreeData
}

export type UseUploadMerkleTreeOptions = Omit<
  UseMutationOptions<UseUploadMerkleTreeResult, Error, UseUploadMerkleTreeParams>,
  'mutationFn'
>

export type UseFetchMerkleProofParams = {
  cid: string | null | undefined
  address: Address | undefined
  pinataConfig: PinataConfig
  enabled?: boolean
}

export type UseAddToWhitelistWithProofOptions = Omit<
  UseMutationOptions<TransactionReceipt, Error, Hex[]>,
  'mutationFn'
>

// ============================================================================
// Hooks
// ============================================================================

/**
 * @description Generates a Merkle tree from a list of addresses and uploads it to Pinata IPFS.
 * Returns the CID, root hash, and full tree data for on-chain usage.
 *
 * @example
 * ```tsx
 * const upload = useUploadMerkleTree({ pinataConfig: { jwt: '...' } })
 *
 * const result = await upload.mutateAsync({
 *   addresses: ['0x...', '0x...'],
 * })
 * console.log(result.cid, result.root, result.treeData)
 * ```
 */
export const useUploadMerkleTree = (
  pinataConfig: PinataConfig,
  options?: UseUploadMerkleTreeOptions
) => {
  return useMutation({
    mutationFn: async (params: UseUploadMerkleTreeParams): Promise<UseUploadMerkleTreeResult> => {
      if (params.addresses.length === 0) {
        throw new Error('Address list must not be empty')
      }

      const treeData = generateMerkleTree(params.addresses)
      const uploadResult = await uploadMerkleTreeToIPFS(pinataConfig, treeData)

      return {
        ...uploadResult,
        treeData,
      }
    },
    ...options,
  })
}

/**
 * @description Fetches a Merkle proof for a given address from IPFS by CID.
 * Useful for checking if a connected wallet has a valid proof before calling addToWhitelistWithProof.
 *
 * @example
 * ```tsx
 * const { data: proof, isLoading } = useFetchMerkleProof({
 *   cid: 'Qm...',
 *   address: connectedAddress,
 *   pinataConfig: { jwt: '...' },
 * })
 * ```
 */
export const useFetchMerkleProof = ({
  cid,
  address,
  pinataConfig,
  enabled = true,
}: UseFetchMerkleProofParams) => {
  return useQuery({
    queryKey: ['merkleProof', cid, address],
    queryFn: async (): Promise<Hex[]> => {
      if (!cid || !address) {
        throw new Error('CID and address are required')
      }
      return fetchMerkleProofFromIPFS(pinataConfig, cid, address)
    },
    enabled: enabled && !!cid && !!address,
    staleTime: Infinity,
  })
}

/**
 * @description Calls addToWhitelistWithProof on the presale contract.
 * The user provides a Merkle proof (fetched from IPFS) and the hook
 * submits the on-chain transaction to whitelist themselves.
 *
 * @example
 * ```tsx
 * const addToWhitelist = useAddToWhitelistWithProof()
 *
 * // After fetching proof from IPFS
 * await addToWhitelist.mutateAsync(proof)
 * ```
 */
export const useAddToWhitelistWithProof = (options?: UseAddToWhitelistWithProofOptions) => {
  const floorsContext = useFloors()
  const resolvedPresale = floorsContext.presale.data ?? null
  const {
    refetch: { presale: refetchPresale },
  } = floorsContext
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const presaleClient = useMemo(() => {
    if (!resolvedPresale || !publicClient) return null
    return new Presale({
      data: resolvedPresale,
      publicClient,
      walletClient: walletClient ?? undefined,
    })
  }, [resolvedPresale, publicClient, walletClient])

  const ensurePresale = useCallback(() => {
    if (!presaleClient) {
      throw new Error(
        'Presale client unavailable. Wait for FloorsProvider presale query to resolve.'
      )
    }
    return presaleClient
  }, [presaleClient])

  const refetchAfterMutation = useCallback(async () => {
    await Promise.allSettled([refetchPresale()])
  }, [refetchPresale])

  return useMutation({
    mutationFn: async (proof: Hex[]): Promise<TransactionReceipt> => {
      const client = ensurePresale()
      return client.addToWhitelistWithProof({ proof })
    },
    onSuccess: async () => {
      await refetchAfterMutation()
    },
    ...options,
  })
}
