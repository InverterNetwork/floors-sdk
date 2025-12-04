import type { Address, TransactionReceipt } from 'viem'

import { CreditFacility_v1, ERC20Issuance_v1, Floor_v1 } from './abis'
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

export interface TMarketBorrowParams {
  borrowAmount: bigint
}

export interface TMarketBuyAndBorrowParams {
  amount: bigint
  leverage: number
  consolidate?: boolean
}

export interface TMarketRepayParams {
  repayAmount: bigint
  loanId: bigint
}

export type TMarketMutationResult = TransactionReceipt

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
  private readonly creditFacilityAddress?: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ data, publicClient, walletClient }: MarketConstructorArgs) {
    this.address = Market.resolveMarketAddress(data)
    this.issuanceTokenAddress = Market.resolveIssuanceTokenAddress(data)
    this.reserveTokenAddress = Market.resolveReserveTokenAddress(data)
    this.creditFacilityAddress = Market.resolveCreditFacilityAddress(data)
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

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
  }

  public async sell({
    depositAmount,
    slippageBps = 50,
  }: TMarketSellParams): Promise<TMarketMutationResult> {
    const walletClient = this.requireWalletClient()
    this.assertPositiveAmount(depositAmount)
    const normalizedSlippage = this.normalizeSlippage(slippageBps)

    const accountAddress = this.getWalletAddress(walletClient)

    // Use multicall to fetch balance and allowance in a single request
    const [balance, allowance] = await this.publicClient.multicall({
      contracts: [
        {
          address: this.issuanceTokenAddress,
          abi: ERC20Issuance_v1,
          functionName: 'balanceOf',
          args: [accountAddress],
        },
        {
          address: this.issuanceTokenAddress,
          abi: ERC20Issuance_v1,
          functionName: 'allowance',
          args: [accountAddress, this.address],
        },
      ],
      allowFailure: false,
    })

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

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
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

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
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

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
  }

  /**
   * @description Approve fTokens for the Credit Facility to use as collateral
   */
  public async approveFTokenForCreditFacility({
    amount,
  }: TMarketApproveParams): Promise<TMarketMutationResult> {
    const walletClient = this.requireWalletClient()
    const creditFacility = this.requireCreditFacility()
    this.assertPositiveAmount(amount)

    const hash = await walletClient.writeContract({
      address: this.issuanceTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'approve',
      args: [creditFacility, amount],
      account: this.getWalletAddress(walletClient),
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
  }

  /**
   * @description Borrow reserve tokens using fTokens as collateral
   * @param borrowAmount Amount of reserve tokens to borrow
   * @returns Transaction hash
   * @note User must first approve fTokens to the Credit Facility using approveFTokenForCreditFacility()
   */
  public async borrow({ borrowAmount }: TMarketBorrowParams): Promise<TMarketMutationResult> {
    const walletClient = this.requireWalletClient()
    const creditFacility = this.requireCreditFacility()
    this.assertPositiveAmount(borrowAmount)

    const hash = await walletClient.writeContract({
      address: creditFacility,
      abi: CreditFacility_v1,
      functionName: 'borrow',
      args: [borrowAmount],
      account: this.getWalletAddress(walletClient),
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
  }

  /**
   * @description Create a leveraged position by buying fTokens and borrowing in loops
   * @param amount Initial amount of reserve tokens to invest
   * @param leverage Leverage multiplier (e.g., 2 = 2x leverage)
   * @param consolidate Whether to consolidate with existing loans (default: false)
   * @returns Transaction hash
   * @note This creates a leveraged loop position, not a simple buy+borrow
   */
  public async buyAndBorrow({
    amount,
    leverage,
    consolidate = false,
  }: TMarketBuyAndBorrowParams): Promise<TMarketMutationResult> {
    const walletClient = this.requireWalletClient()
    const creditFacility = this.requireCreditFacility()
    this.assertPositiveAmount(amount)

    if (leverage < 1) {
      throw new Error('Leverage must be at least 1x')
    }

    // Convert leverage to basis points (e.g., 2x = 20000)
    const leverageBps = BigInt(Math.floor(leverage * 10000))

    const hash = await walletClient.writeContract({
      address: creditFacility,
      abi: CreditFacility_v1,
      functionName: 'buyAndBorrow',
      args: [amount, leverageBps, consolidate],
      account: this.getWalletAddress(walletClient),
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
  }

  /**
   * @description Repay an outstanding loan
   * @param repayAmount Amount of reserve tokens to repay
   * @param loanId ID of the loan to repay (use 0 for oldest loan)
   * @returns Transaction hash
   */
  public async repay({ repayAmount, loanId }: TMarketRepayParams): Promise<TMarketMutationResult> {
    const walletClient = this.requireWalletClient()
    const creditFacility = this.requireCreditFacility()
    this.assertPositiveAmount(repayAmount)

    const hash = await walletClient.writeContract({
      address: creditFacility,
      abi: CreditFacility_v1,
      functionName: 'repay',
      args: [loanId, repayAmount],
      account: this.getWalletAddress(walletClient),
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    return receipt
  }

  /**
   * @description Get the current Loan-to-Value ratio limit (e.g., 80% = 8000 basis points)
   * @returns LTV ratio in basis points
   */
  public async getLoanToValueRatio(): Promise<number> {
    const creditFacility = this.requireCreditFacility()

    const ltv = (await this.publicClient.readContract({
      address: creditFacility,
      abi: CreditFacility_v1,
      functionName: 'getLoanToValueRatio',
      args: [],
    })) as bigint

    return Number(ltv)
  }

  /**
   * @description Get the current borrowing fee rate (e.g., 8% = 800 basis points)
   * @returns Fee rate in basis points
   */
  public async getBorrowingFeeRate(): Promise<number> {
    const creditFacility = this.requireCreditFacility()

    const feeRate = (await this.publicClient.readContract({
      address: creditFacility,
      abi: CreditFacility_v1,
      functionName: 'getBorrowingFeeRate',
      args: [],
    })) as bigint

    return Number(feeRate)
  }

  /**
   * @description Get fToken allowance for the Credit Facility
   * @param ownerAddress Address of the token owner
   * @returns Allowance amount
   */
  public async getFTokenAllowanceForCreditFacility(ownerAddress: Address): Promise<bigint> {
    const creditFacility = this.requireCreditFacility()

    if (!ownerAddress) {
      throw new Error('Owner address is required to fetch allowance.')
    }

    return (await this.publicClient.readContract({
      address: this.issuanceTokenAddress,
      abi: ERC20Issuance_v1,
      functionName: 'allowance',
      args: [ownerAddress, creditFacility],
    })) as bigint
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

  private requireCreditFacility(): Address {
    if (!this.creditFacilityAddress) {
      throw new Error(
        'Credit Facility not available for this market. This market may not support borrowing.'
      )
    }
    return this.creditFacilityAddress
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

  private static resolveCreditFacilityAddress(data: TFloorAssetData): Address | undefined {
    // Credit facility address is fetched from ModuleRegistry via GraphQL
    const creditFacilityAddress = (data as any).creditFacility
    if (!creditFacilityAddress || creditFacilityAddress === '' || creditFacilityAddress === null) {
      return undefined
    }
    return creditFacilityAddress as Address
  }
}
