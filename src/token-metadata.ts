/**
 * @description Helpers for ERC-7572 on-chain token metadata. ERC20Issuance_v1 exposes
 * `contractURI()` returning a URL to JSON conforming to {@link TokenContractMetadata}.
 * This module reads/writes that URL and fetches+parses the JSON.
 */

import { Schema } from 'effect'
import type { Address, TransactionReceipt } from 'viem'

import { ERC20Issuance_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import { type TokenContractMetadata, TokenContractMetadataSchema } from './schemas'
import type { PopPublicClient, PopWalletClient } from './types'
import { SafeWrite } from './utils/safe-write'

export interface TReadContractURIParams {
  token: Address
  publicClient: PopPublicClient
}

export interface TSetContractURIParams {
  token: Address
  uri: string
  publicClient: PopPublicClient
  walletClient: PopWalletClient
  lifecycle?: TransactionLifecycleCallbacks
}

/**
 * @description Read the raw `contractURI()` string from the token.
 * Returns empty string if the token does not support ERC-7572 (pre-upgrade tokens).
 */
export async function readContractURI({
  token,
  publicClient,
}: TReadContractURIParams): Promise<string> {
  try {
    return (await publicClient.readContract({
      address: token,
      abi: ERC20Issuance_v1,
      functionName: 'contractURI',
    })) as string
  } catch {
    return ''
  }
}

/**
 * @description Fetch the JSON at `uri` and parse it against {@link TokenContractMetadataSchema}.
 * Returns `null` if the URI is empty, fetch fails, or JSON is malformed.
 */
export async function fetchContractMetadata(uri: string): Promise<TokenContractMetadata | null> {
  if (!uri) return null
  try {
    const response = await fetch(uri)
    if (!response.ok) return null
    const json: unknown = await response.json()
    return Schema.decodeUnknownSync(TokenContractMetadataSchema)(json)
  } catch {
    return null
  }
}

/**
 * @description Read the contract URI and fetch+parse its metadata in a single call.
 */
export async function readTokenMetadata(
  params: TReadContractURIParams
): Promise<{ uri: string; metadata: TokenContractMetadata | null }> {
  const uri = await readContractURI(params)
  const metadata = await fetchContractMetadata(uri)
  return { uri, metadata }
}

/**
 * @description Set the token's `contractURI`. Admin-gated; caller must hold the metadata role.
 */
export async function setContractURI({
  token,
  uri,
  publicClient,
  walletClient,
  lifecycle,
}: TSetContractURIParams): Promise<TransactionReceipt> {
  const safeWrite = new SafeWrite({ publicClient, walletClient })
  const { receipt } = await safeWrite.write({
    address: token,
    abi: ERC20Issuance_v1,
    functionName: 'setContractURI',
    args: [uri],
    lifecycle,
  })
  return receipt
}
