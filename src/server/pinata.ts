import type { Address, Hex } from 'viem'

import type { MerkleTreeData } from '../merkle-tree'

// ============================================================================
// Types
// ============================================================================

export interface PinataConfig {
  jwt: string
  gateway?: string
}

export interface MerkleTreeIPFSPayload {
  root: Hex
  addresses: Address[]
  proofs: Record<Address, Hex[]>
}

export interface PinataUploadResult {
  cid: string
  root: Hex
}

// ============================================================================
// Constants
// ============================================================================

const PINATA_API_URL = 'https://api.pinata.cloud'
const PINATA_GATEWAY_URL = 'https://gateway.pinata.cloud/ipfs'

// ============================================================================
// Public API
// ============================================================================

/**
 * Upload a merkle tree (addresses + proofs) to Pinata IPFS.
 * Returns the CID and root hash for on-chain reference.
 */
export async function uploadMerkleTree(
  config: PinataConfig,
  treeData: MerkleTreeData
): Promise<PinataUploadResult> {
  const payload: MerkleTreeIPFSPayload = {
    root: treeData.root,
    addresses: treeData.addresses,
    proofs: treeData.proofs,
  }

  const response = await fetch(`${PINATA_API_URL}/pinning/pinJSONToIPFS`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.jwt}`,
    },
    body: JSON.stringify({
      pinataContent: payload,
      pinataMetadata: {
        name: `merkle-tree-${treeData.root.slice(0, 10)}`,
      },
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Pinata upload failed (${response.status}): ${text}`)
  }

  const result = (await response.json()) as { IpfsHash: string }

  return {
    cid: result.IpfsHash,
    root: treeData.root,
  }
}

/**
 * Fetch a merkle tree JSON from IPFS by CID.
 * Uses the configured gateway or falls back to Pinata's public gateway.
 */
export async function fetchMerkleTree(
  config: PinataConfig,
  cid: string
): Promise<MerkleTreeIPFSPayload> {
  const gateway = config.gateway ?? PINATA_GATEWAY_URL

  const response = await fetch(`${gateway}/${cid}`, {
    headers: {
      Authorization: `Bearer ${config.jwt}`,
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Pinata fetch failed (${response.status}): ${text}`)
  }

  const data = (await response.json()) as MerkleTreeIPFSPayload

  return data
}

/**
 * Fetch the merkle proof for a specific address from IPFS by CID.
 * Returns the proof array or throws if the address is not in the tree.
 */
export async function fetchMerkleProof(
  config: PinataConfig,
  cid: string,
  address: Address
): Promise<Hex[]> {
  const tree = await fetchMerkleTree(config, cid)

  // Case-insensitive lookup: normalize to checksummed form
  const normalizedAddress = address.toLowerCase()
  const matchingKey = Object.keys(tree.proofs).find(
    (key) => key.toLowerCase() === normalizedAddress
  ) as Address | undefined

  if (!matchingKey) {
    throw new Error(`Address ${address} not found in merkle tree (CID: ${cid})`)
  }

  return tree.proofs[matchingKey]
}
