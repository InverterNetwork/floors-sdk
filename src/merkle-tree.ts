import type { Address, Hex } from 'viem'
import { encodePacked, getAddress, keccak256 } from 'viem'

// ============================================================================
// Types
// ============================================================================

export interface MerkleTreeData {
  root: Hex
  proofs: Record<Address, Hex[]>
  addresses: Address[]
}

// ============================================================================
// Internal Helpers
// ============================================================================

function hashLeaf(address: Address): Hex {
  return keccak256(encodePacked(['address'], [getAddress(address)]))
}

function hashPair(a: Hex, b: Hex): Hex {
  // Sort pairs to match OpenZeppelin's MerkleProof implementation
  const [left, right] = a < b ? [a, b] : [b, a]
  return keccak256(encodePacked(['bytes32', 'bytes32'], [left, right]))
}

function buildLayers(leaves: Hex[]): Hex[][] {
  if (leaves.length === 0) return [[]]

  const layers: Hex[][] = [leaves]

  while (layers[layers.length - 1].length > 1) {
    const currentLayer = layers[layers.length - 1]
    const nextLayer: Hex[] = []

    for (let i = 0; i < currentLayer.length; i += 2) {
      if (i + 1 < currentLayer.length) {
        nextLayer.push(hashPair(currentLayer[i], currentLayer[i + 1]))
      } else {
        // Odd node gets promoted
        nextLayer.push(currentLayer[i])
      }
    }

    layers.push(nextLayer)
  }

  return layers
}

function getProof(layers: Hex[][], leafIndex: number): Hex[] {
  const proof: Hex[] = []
  let index = leafIndex

  for (let i = 0; i < layers.length - 1; i++) {
    const layer = layers[i]
    const isRight = index % 2 === 1
    const siblingIndex = isRight ? index - 1 : index + 1

    if (siblingIndex < layer.length) {
      proof.push(layer[siblingIndex])
    }

    index = Math.floor(index / 2)
  }

  return proof
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Generate a complete Merkle tree from a list of addresses.
 * Uses keccak256(encodePacked(address)) as the leaf hash, matching
 * the on-chain MerkleWhitelistBase_v1 contract.
 *
 * Leaves are sorted before tree construction to produce deterministic
 * roots and proofs compatible with OpenZeppelin's MerkleProof library.
 */
export function generateMerkleTree(addresses: Address[]): MerkleTreeData {
  if (addresses.length === 0) {
    throw new Error('Address list must not be empty')
  }

  // Deduplicate and checksum addresses
  const uniqueAddresses = [...new Set(addresses.map((a) => getAddress(a)))]

  // Hash leaves
  const leaves = uniqueAddresses.map((addr) => hashLeaf(addr))

  // Sort leaves for deterministic tree (matches OZ sortPairs behavior at leaf level)
  const indexedLeaves = leaves.map((leaf, i) => ({ leaf, address: uniqueAddresses[i] }))
  indexedLeaves.sort((a, b) => (a.leaf < b.leaf ? -1 : a.leaf > b.leaf ? 1 : 0))

  const sortedLeaves = indexedLeaves.map((il) => il.leaf)
  const sortedAddresses = indexedLeaves.map((il) => il.address)

  // Build tree layers
  const layers = buildLayers(sortedLeaves)

  // Root is the single element in the last layer
  const root = layers[layers.length - 1][0]

  // Generate proofs for each address
  const proofs: Record<Address, Hex[]> = {}
  for (let i = 0; i < sortedAddresses.length; i++) {
    proofs[sortedAddresses[i]] = getProof(layers, i)
  }

  return {
    root,
    proofs,
    addresses: sortedAddresses,
  }
}

/**
 * Compute the Merkle root from a list of addresses.
 * Convenience wrapper around generateMerkleTree.
 */
export function computeMerkleRoot(addresses: Address[]): Hex {
  return generateMerkleTree(addresses).root
}

/**
 * Get the Merkle proof for a specific address.
 * Returns the proof array or throws if the address is not in the tree.
 */
export function getMerkleProof(treeData: MerkleTreeData, address: Address): Hex[] {
  const checksummed = getAddress(address)
  const proof = treeData.proofs[checksummed]

  if (!proof) {
    throw new Error(`Address ${checksummed} is not in the Merkle tree`)
  }

  return proof
}

/**
 * Verify a Merkle proof for a given address against a root.
 * Mirrors the on-chain verification in MerkleWhitelistBase_v1._verifyMerkleProof.
 */
export function verifyMerkleProof(address: Address, proof: Hex[], root: Hex): boolean {
  let hash = hashLeaf(address)

  for (const proofElement of proof) {
    hash = hashPair(hash, proofElement)
  }

  return hash === root
}
