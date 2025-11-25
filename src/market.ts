import type { Address, Hash } from 'viem'

import { ERC20Issuance_v1, Floor_v1 } from './abis'
import type { TFloorAssetData } from './graphql/api'
import type { PopPublicClient, PopWalletClient } from './types'

export interface TMarketBuyParams {
  depositAmount: bigint
  slippageBps?: number
}

export interface TMarketSellParams {
  depositAmount: bigint
  slippageBps?: number
}

export interface TMarketApproveParams {
  amount: bigint
}

export interface TMarketMutationResult {
  hash: Hash
}

interface MarketConstructorArgs {
  data: TFloorAssetData
  publicClient: PopPublicClient
  walletClient?: PopWalletClient
}

const BASIS_POINTS = BigInt(10_000)
const ZERO_AMOUNT = BigInt(0)

/**
 * @description Pure utility class for interacting with Floor markets via viem.
 *              This class contains no React or wagmi dependencies so it can be
 *              reused across server and client runtimes.
 */
export class Market {
  private readonly address: Address
  private readonly issuanceTokenAddress: Address
  private readonly reserveTokenAddress: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ data, publicClient, walletClient }: MarketConstructorArgs) {
    this.address = Market.resolveMarketAddress(data)
    this.issuanceTokenAddress = Market.resolveIssuanceTokenAddress(data)
    this.reserveTokenAddress = Market.resolveReserveTokenAddress(data)
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  public getAddress(): Address {
    return this.address
  }

  public async previewBuy(depositAmount: bigint): Promise<bigint> {
    this.assertPositiveAmount(depositAmount)

    return (await this.publicClient.readContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'calculatePurchaseReturn',
      args: [depositAmount],
    })) as bigint
  }

  public async previewSell(depositAmount: bigint): Promise<bigint> {
    this.assertPositiveAmount(depositAmount)

    return (await this.publicClient.readContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'calculateSaleReturn',
      args: [depositAmount],
    })) as bigint
  }

  public async getFTokenAllowance(ownerAddress: Address): Promise<bigint> {
    if (!ownerAddress) {
      throw new Error('Owner address is required to fetch allowance.')
    }

    return (await this.publicClient.readContract({
      address: this.issuanceTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'allowance',
      args: [ownerAddress, this.address],
    })) as bigint
  }

  public async getReserveTokenAllowance(ownerAddress: Address): Promise<bigint> {
    if (!ownerAddress) {
      throw new Error('Owner address is required to fetch allowance.')
    }

    return (await this.publicClient.readContract({
      address: this.reserveTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'allowance',
      args: [ownerAddress, this.address],
    })) as bigint
  }

  public async buy({
    depositAmount,
    slippageBps = 50,
  }: TMarketBuyParams): Promise<TMarketMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(depositAmount)
    const normalizedSlippage = this.normalizeSlippage(slippageBps)

    const expectedOut = await this.previewBuy(depositAmount)
    const minAmountOut = this.applySlippage(expectedOut, normalizedSlippage)

    const hash = await walletClient.writeContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'buy',
      args: [depositAmount, minAmountOut],
      account: this.getWalletAddress(walletClient),
    })

    return { hash }
  }

  public async sell({
    depositAmount,
    slippageBps = 50,
  }: TMarketSellParams): Promise<TMarketMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(depositAmount)
    const normalizedSlippage = this.normalizeSlippage(slippageBps)

    const accountAddress = this.getWalletAddress(walletClient)

    const [balance, allowance] = await Promise.all([
      this.publicClient.readContract({
        address: this.issuanceTokenAddress,
        abi: ERC20Issuance_v1,
        functionName: 'balanceOf',
        args: [accountAddress],
      }),
      this.publicClient.readContract({
        address: this.issuanceTokenAddress,
        abi: ERC20Issuance_v1,
        functionName: 'allowance',
        args: [accountAddress, this.address],
      }),
    ])

    if ((balance as bigint) < depositAmount) {
      throw new Error(
        `Insufficient fToken balance. You have ${(balance as bigint).toString()} but tried to sell ${depositAmount.toString()}`
      )
    }

    if ((allowance as bigint) < depositAmount) {
      throw new Error(
        `Insufficient fToken allowance. Please approve the Floor contract to spend your fTokens first.\n\nRequired: ${depositAmount.toString()}\nCurrent: ${(allowance as bigint).toString()}`
      )
    }

    const expectedOut = await this.previewSell(depositAmount)
    const minAmountOut = this.applySlippage(expectedOut, normalizedSlippage)

    const hash = await walletClient.writeContract({
      address: this.address,
      abi: Floor_v1,
      functionName: 'sell',
      args: [depositAmount, minAmountOut],
      account: accountAddress,
    })

    return { hash }
  }

  public async approveFToken({ amount }: TMarketApproveParams): Promise<TMarketMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(amount)

    const hash = await walletClient.writeContract({
      address: this.issuanceTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'approve',
      args: [this.address, amount],
      account: this.getWalletAddress(walletClient),
    })

    return { hash }
  }

  public async approveReserveToken({
    amount,
  }: TMarketApproveParams): Promise<TMarketMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(amount)

    const hash = await walletClient.writeContract({
      address: this.reserveTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'approve',
      args: [this.address, amount],
      account: this.getWalletAddress(walletClient),
    })

    return { hash }
  }

  private assertPositiveAmount(amount: bigint): void {
    if (amount <= ZERO_AMOUNT) {
      throw new Error('Invalid amount. Amount must be greater than 0.')
    }
  }

  private normalizeSlippage(slippageBps: number): number {
    if (Number.isNaN(slippageBps)) return 50
    if (slippageBps < 0) return 0
    if (slippageBps > 10_000) return 10_000
    return slippageBps
  }

  private applySlippage(amount: bigint, slippageBps: number): bigint {
    const slippage = BigInt(10_000 - slippageBps)
    return (amount * slippage) / BASIS_POINTS
  }

  private requireWalletClient(): PopWalletClient {
    if (!this.walletClient) {
      throw new Error('Wallet not connected. Please connect your wallet to continue.')
    }
    return this.walletClient
  }

  private getWalletAddress(walletClient: PopWalletClient): Address {
    const account = walletClient.account
    if (!account?.address) {
      throw new Error('Wallet not connected. Please connect your wallet to continue.')
    }
    return account.address as Address
  }

  private static resolveMarketAddress(data: TFloorAssetData): Address {
    const address = data.contractAddress || data.id
    if (!address) {
      throw new Error('Invalid market data: missing contract address.')
    }
    return address as Address
  }

  private static resolveIssuanceTokenAddress(data: TFloorAssetData): Address {
    const issuanceAddress = data.issuanceToken_id || ''
    if (!issuanceAddress) {
      throw new Error('Invalid market data: missing issuance token address.')
    }
    return issuanceAddress as Address
  }

  private static resolveReserveTokenAddress(data: TFloorAssetData): Address {
    const reserveAddress = data.reserveToken_id || ''
    if (!reserveAddress) {
      throw new Error('Invalid market data: missing reserve token address.')
    }
    return reserveAddress as Address
  }
}
