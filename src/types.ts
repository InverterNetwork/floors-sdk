import type { Account, Chain, PublicClient, Transport, WalletClient } from 'viem'

export type PopWalletClient = WalletClient<Transport, Chain, Account>
export type PopPublicClient = PublicClient<Transport, Chain>
