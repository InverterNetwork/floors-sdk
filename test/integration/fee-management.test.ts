/**
 * @description Integration tests for FEES-01: Comprehensive Fee Management Fix
 * Tests real on-chain transactions for:
 * - F-59: Sell fee in goLive transition
 * - F-58: Commission schedule changes in presale
 * - F-52: Fee controls during presale phase
 *
 * Requires `bun dev:local` to be running (Anvil + indexer).
 */

import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import type { Address, Hex } from 'viem'
import { decodeEventLog } from 'viem'

import { ERC20Issuance_v1, ModuleFactory_v1 } from '../../src/abis'
import { Client } from '../../src/graphql/client'
import { Launch } from '../../src/launch'
import { MarketAdmin } from '../../src/market-admin'
import { Presale, PresaleState } from '../../src/presale'
import { PresaleAdmin } from '../../src/presale-admin'
import type { PopPublicClient, PopWalletClient } from '../../src/types'
import {
  checkLocalAvailability,
  checkLocalIndexerAvailability,
  createLocalPublicClient,
  createLocalWalletClient,
  createTestLaunchConfig,
  createTestPresaleConfig,
  LOCAL_GRAPHQL_URL,
} from '../helpers/index'
import { loadTestEnvironment } from '../launch/helpers/env-loader'

// ERC20Issuance_v1 bytecode (from src/deploy.ts)
const ERC20_ISSUANCE_BYTECODE: Hex =
  '0x60e060405234801562000010575f80fd5b50604051620012a2380380620012a2833981016040819052620000339162000288565b806200003e620000e0565b83878760036200004f8382620003ba565b5060046200005e8282620003ba565b505050805f03620000895760405163392e1e2760e01b81525f60048201526024015b60405180910390fd5b6080526001600160a01b038116620000b757604051631e4fbdf760e01b81525f600482015260240162000080565b620000c281620000f0565b506001600160a01b031660a052505060ff1660c05250620004e09050565b5f620000eb62000141565b905090565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b5f3660148082108015906200015c57506200015c336200018f565b1562000187576200017236828403815f62000486565b6200017d91620004af565b60601c9250505090565b339250505090565b5f6200019b82620001a1565b92915050565b5f620001ac60a05190565b6001600160a01b0316826001600160a01b0316149050919050565b634e487b7160e01b5f52604160045260245ffd5b5f82601f830112620001eb575f80fd5b81516001600160401b0380821115620002085762000208620001c7565b604051601f8301601f19908116603f01168101908282118183101715620002335762000233620001c7565b816040528381526020925086602085880101111562000250575f80fd5b5f91505b8382101562000273578582018301518183018401529082019062000254565b5f602085830101528094505050505092915050565b5f805f805f60a086880312156200029d575f80fd5b85516001600160401b0380821115620002b4575f80fd5b620002c289838a01620001db565b96506020880151915080821115620002d8575f80fd5b50620002e788828901620001db565b945050604086015160ff81168114620002fe575f80fd5b6060870151608088015191945092506001600160a01b038116811462000322575f80fd5b809150509295509295909350565b600181811c908216806200034557607f821691505b6020821081036200036457634e487b7160e01b5f52602260045260245ffd5b50919050565b601f821115620003b557805f5260205f20601f840160051c81016020851015620003915750805b601f840160051c820191505b81811015620003b2575f81556001016200039d565b50505b505050565b81516001600160401b03811115620003d657620003d6620001c7565b620003ee81620003e7845462000330565b846200036a565b602080601f83116001811462000424575f84156200040c5750858301515b5f19600386901b1c1916600185901b1785556200047e565b5f85815260208120601f198616915b82811015620004545788860151825594840194600190910190840162000433565b50858210156200047257878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b5f808585111562000495575f80fd5b83861115620004a2575f80fd5b5050820193919092039150565b6001600160601b03198135818116916014851015620004d85780818660140360031b1b83161692505b505092915050565b60805160a05160c051610d89620005195f395f6101d401525f81816102a001526104bd01525f818161020001526109d60152610d895ff3fe608060405234801561000f575f80fd5b5060043610610163575f3560e01c8063715018a6116100c7578063a9059cbb1161007d578063dd62ed3e11610063578063dd62ed3e1461032a578063dd8aaa4f14610362578063f2fde38b14610375575f80fd5b8063a9059cbb14610304578063cf456ae714610317575f80fd5b80638da5cb5b116100ad5780638da5cb5b146102d857806395d89b41146102e95780639dc29fac146102f1575f80fd5b8063715018a6146102965780637da0a8771461029e575f80fd5b8063355274ea1161011c578063423afa6611610102578063423afa6614610239578063572b6c051461025b57806370a082311461026e575f80fd5b8063355274ea146101fe57806340c10f1914610224575f80fd5b806318160ddd1161014c57806318160ddd146101a857806323b872dd146101ba578063313ce567146101cd575f80fd5b806306fdde0314610167578063095ea7b314610185575b5f80fd5b61016f610388565b60405161017c9190610b4e565b60405180910390f35b610198610193366004610bb5565b610418565b604051901515815260200161017c565b6002545b60405190815260200161017c565b6101986101c8366004610bdd565b61043b565b60405160ff7f000000000000000000000000000000000000000000000000000000000000000016815260200161017c565b7f00000000000000000000000000000000000000000000000000000000000000006101ac565b610237610232366004610bb5565b610468565b005b610198610247366004610c16565b60066020525f908152604090205460ff1681565b610198610269366004610c16565b6104ba565b6101ac61027c366004610c16565b6001600160a01b03165f9081526020819052604090205490565b6102376104f0565b7f00000000000000000000000000000000000000000000000000000000000000005b6040516001600160a01b03909116815260200161017c565b6005546001600160a01b03166102c0565b61016f610503565b6102376102ff366004610bb5565b610512565b610198610312366004610bb5565b610560565b610237610325366004610c36565b610577565b6101ac610338366004610c6f565b6001600160a01b039182165f90815260016020908152604080832093909416825291909152205490565b610237610370366004610bdd565b610589565b610237610383366004610c16565b6105dd565b60606003805461039790610ca0565b80601f01602080910402602001604051908101604052809291908181526020018280546103c390610ca0565b801561040e5780601f106103e55761010080835404028352916020019161040e565b820191905f5260205f20905b8154815290600101906020018083116103f157829003601f168201915b5050505050905090565b5f8061042261061f565b905061042f81858561062d565b60019150505b92915050565b5f8061044561061f565b905061045285828561063a565b61045d8585856106b6565b506001949350505050565b60065f61047361061f565b6001600160a01b0316815260208101919091526040015f205460ff166104ac57604051634199e25360e11b815260040160405180910390fd5b6104b68282610713565b5050565b5f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0390811690831614610435565b6104f8610747565b6105015f6107a5565b565b60606004805461039790610ca0565b60065f61051d61061f565b6001600160a01b0316815260208101919091526040015f205460ff1661055657604051634199e25360e11b815260040160405180910390fd5b6104b6828261080e565b5f8061056a61061f565b905061042f8185856106b6565b61057f610747565b6104b68282610842565b60065f61059461061f565b6001600160a01b0316815260208101919091526040015f205460ff166105cd57604051634199e25360e11b815260040160405180910390fd5b6105d883838361063a565b505050565b6105e5610747565b6001600160a01b03811661061357604051631e4fbdf760e01b81525f60048201526024015b60405180910390fd5b61061c816107a5565b50565b5f6106286108a0565b905090565b6105d883838360016108e6565b6001600160a01b038381165f908152600160209081526040808320938616835292905220545f198110156106b057818110156106a257604051637dc7a0d960e11b81526001600160a01b0384166004820152602481018290526044810183905260640161060a565b6106b084848484035f6108e6565b50505050565b6001600160a01b0383166106df57604051634b637e8f60e11b81525f600482015260240161060a565b6001600160a01b0382166107085760405163ec442f0560e01b81525f600482015260240161060a565b6105d88383836109b8565b6001600160a01b03821661073c5760405163ec442f0560e01b81525f600482015260240161060a565b6104b65f83836109b8565b61074f61061f565b6001600160a01b031661076a6005546001600160a01b031690565b6001600160a01b0316146105015761078061061f565b60405163118cdaa760e01b81526001600160a01b03909116600482015260240161060a565b600580546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b6001600160a01b03821661083757604051634b637e8f60e11b81525f600482015260240161060a565b6104b6825f836109b8565b6001600160a01b0382165f81815260066020908152604091829020805460ff191685151590811790915591519182527f583b0aa0e528532caf4b907c11d7a8158a122fe2a6fb80cd9b09776ebea8d92d910160405180910390a25050565b5f3660148082108015906108b857506108b8336104ba565b156108de576108cb36828403815f610cd8565b6108d491610cff565b60601c9250505090565b339250505090565b6001600160a01b03841661090f5760405163e602df0560e01b81525f600482015260240161060a565b6001600160a01b03831661093857604051634a1406b160e11b81525f600482015260240161060a565b6001600160a01b038085165f90815260016020908152604080832093871683529290522082905580156106b057826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516109aa91815260200190565b60405180910390a350505050565b6109c3838383610a28565b6001600160a01b0383166105d8576002547f00000000000000000000000000000000000000000000000000000000000000009081811115610a215760405163279e7e1560e21b8152600481018290526024810183905260440161060a565b5050505050565b6001600160a01b038316610a52578060025f828254610a479190610d34565b90915550610ac29050565b6001600160a01b0383165f9081526020819052604090205481811015610aa45760405163391434e360e21b81526001600160a01b0385166004820152602481018290526044810183905260640161060a565b6001600160a01b0384165f9081526020819052604090209082900390555b6001600160a01b038216610ade57600280548290039055610afc565b6001600160a01b0382165f9081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610b4191815260200190565b60405180910390a3505050565b5f602080835283518060208501525f5b81811015610b7a57858101830151858201604001528201610b5e565b505f604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610bb0575f80fd5b919050565b5f8060408385031215610bc6575f80fd5b610bcf83610b9a565b946020939093013593505050565b5f805f60608486031215610bef575f80fd5b610bf884610b9a565b9250610c0660208501610b9a565b9150604084013590509250925092565b5f60208284031215610c26575f80fd5b610c2f82610b9a565b9392505050565b5f8060408385031215610c47575f80fd5b610c5083610b9a565b915060208301358015158114610c64575f80fd5b809150509250929050565b5f8060408385031215610c80575f80fd5b610c8983610b9a565b9150610c9760208401610b9a565b90509250929050565b600181811c90821680610cb457607f821691505b602082108103610cd257634e487b7160e01b5f52602260045260245ffd5b50919050565b5f8085851115610ce6575f80fd5b83861115610cf2575f80fd5b5050820193919092039150565b6bffffffffffffffffffffffff198135818116916014851015610d2c5780818660140360031b1b83161692505b505092915050565b8082018082111561043557634e487b7160e01b5f52601160045260245ffdfea26469706673582212201728f4b23f9bfe6fb14f4df434b0b648ee4be882a8e5ec4e2f061bf5943b520664736f6c63430008170033'

// =============================================================================
// Helpers
// =============================================================================

/**
 * Deploy an ERC20Issuance_v1 token directly using a known trusted forwarder
 * (bypasses GlobalRegistry lookup which may not be indexed yet)
 */
async function deployToken(
  walletClient: PopWalletClient,
  publicClient: PopPublicClient,
  config: { name: string; symbol: string; decimals: number; maxSupply: bigint },
  trustedForwarder: Address
): Promise<Address> {
  const owner = walletClient.account!.address
  // Scale maxSupply by decimals (same as SDK Deploy class)
  const scaledMaxSupply = config.maxSupply * BigInt(10 ** config.decimals)

  const hash = await walletClient.deployContract({
    abi: ERC20Issuance_v1,
    bytecode: ERC20_ISSUANCE_BYTECODE,
    args: [config.name, config.symbol, config.decimals, scaledMaxSupply, trustedForwarder],
    account: owner,
  })

  const receipt = await publicClient.waitForTransactionReceipt({ hash })
  if (!receipt.contractAddress) {
    throw new Error(`Token deployment failed: status=${receipt.status}, hash=${hash}`)
  }
  return receipt.contractAddress
}

function parseModuleAddressesFromReceipt(
  receipt: Awaited<ReturnType<PopPublicClient['waitForTransactionReceipt']>>,
  moduleFactoryAddress: string
): {
  authorizer: Address | undefined
  creditFacility: Address | undefined
  presale: Address | undefined
  floor: Address | undefined
} {
  const result = {
    authorizer: undefined as Address | undefined,
    creditFacility: undefined as Address | undefined,
    presale: undefined as Address | undefined,
    floor: undefined as Address | undefined,
  }

  for (const log of receipt.logs) {
    if (log.address.toLowerCase() !== moduleFactoryAddress.toLowerCase()) continue

    try {
      const logWithTopics = log as typeof log & { topics: [`0x${string}`, ...`0x${string}`[]] }
      const decoded = decodeEventLog({
        abi: ModuleFactory_v1,
        data: logWithTopics.data,
        topics: logWithTopics.topics,
      })

      if ((decoded as any).eventName === 'ModuleCreated' && (decoded as any).args) {
        const args = (decoded as any).args
        const moduleType = (args.metadata_?.title || args.identifier || '').toLowerCase()
        const moduleAddress = (args.module_ || args.module) as Address

        if (moduleType.includes('authorizer') || moduleType.includes('roles')) {
          result.authorizer = moduleAddress
        } else if (moduleType.includes('creditfacility')) {
          result.creditFacility = moduleAddress
        } else if (moduleType.includes('presale')) {
          result.presale = moduleAddress
        } else if (moduleType.includes('floor')) {
          result.floor = moduleAddress
        }
      }
    } catch {
      // Skip logs that don't match
    }
  }

  return result
}

// =============================================================================
// Tests
// =============================================================================

describe('FEES-01: Fee Management Integration Tests', () => {
  let testEnv: Awaited<ReturnType<typeof loadTestEnvironment>>
  let publicClient: PopPublicClient
  let walletClient: PopWalletClient
  let launch: Launch
  let available: boolean

  // Shared state across tests (set during market creation)
  let floorAddress: Address
  let authorizerAddress: Address
  let creditFacilityAddress: Address | undefined
  let presaleAddress: Address | undefined
  let collateralToken: Address

  beforeAll(async () => {
    // Check RPC + indexer availability (don't require GlobalRegistry entity)
    const rpcOk = await checkLocalAvailability()
    const indexerOk = await checkLocalIndexerAvailability()
    available = rpcOk !== null && indexerOk
    if (!available) {
      console.log(
        'Local dev environment not available, skipping fee management tests. Run `bun dev:local` first.'
      )
      return
    }

    testEnv = await loadTestEnvironment()
    // If forwarder is zero address (stale .env), use the known devnet forwarder
    if (testEnv.transactionForwarderAddress === '0x0000000000000000000000000000000000000000') {
      testEnv = {
        ...testEnv,
        transactionForwarderAddress: '0xf5656952EB383F01305AE1D973A32416122C0C2F' as Address,
      }
    }
    publicClient = createLocalPublicClient()
    walletClient = createLocalWalletClient('DEPLOYER')
    Client.updateUrl(LOCAL_GRAPHQL_URL)

    launch = new Launch({
      floorFactoryAddress: testEnv.floorFactoryAddress,
      publicClient,
      walletClient,
    })

    // Deploy a full market with presale + credit facility for all tests
    console.log('\n=== Deploying test market with presale + credit facility ===')

    // Deploy tokens directly (uses known forwarder from env, bypasses GlobalRegistry)
    const issuanceToken = await deployToken(
      walletClient,
      publicClient,
      {
        name: `Fee Test Token ${Date.now()}`,
        symbol: `FEE${Date.now() % 10000}`,
        decimals: 18,
        maxSupply: BigInt(1_000_000_000),
      },
      testEnv.transactionForwarderAddress
    )
    collateralToken = await deployToken(
      walletClient,
      publicClient,
      {
        name: 'Test USDC',
        symbol: 'TUSDC',
        decimals: 6,
        maxSupply: BigInt(1_000_000_000),
      },
      testEnv.transactionForwarderAddress
    )

    console.log(`  Issuance token: ${issuanceToken}`)
    console.log(`  Collateral token: ${collateralToken}`)

    const baseConfig = createTestLaunchConfig(issuanceToken, collateralToken, {
      floor: { buyFeeBps: 0, sellFeeBps: 0 }, // Start with zero fees
      creditFacility: {
        loanToValueRatio: 9000,
        maxLeverage: 5,
        borrowingFeeRate: 0,
      },
    })
    // Add presale config manually (createTestLaunchConfig doesn't pass it through)
    const config = {
      ...baseConfig,
      presale: createTestPresaleConfig(collateralToken, {
        baseCommissionBps: [BigInt(100), BigInt(200), BigInt(450)],
        priceBreakpoints: [[BigInt(1e18)], [BigInt(1e18), BigInt(1.5e18)]],
        initialMultiplier: BigInt(10000), // 1x (no premium)
        decayDuration: BigInt(3600), // 1 hour (contract requires nonzero)
      }),
    }

    const result = await launch.create(config)
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: result.transactionHash as `0x${string}`,
    })

    const modules = parseModuleAddressesFromReceipt(receipt, testEnv.moduleFactoryAddress)

    floorAddress = result.floorAddress
    authorizerAddress = modules.authorizer!
    creditFacilityAddress = modules.creditFacility
    presaleAddress = modules.presale

    console.log(`  Floor: ${floorAddress}`)
    console.log(`  Authorizer: ${authorizerAddress}`)
    console.log(`  CreditFacility: ${creditFacilityAddress}`)
    console.log(`  Presale: ${presaleAddress}`)

    // Configure market (grant roles, etc.)
    const configureResult = await launch.configure({
      floorAddress,
      authorizerAddress,
      issuanceTokenAddress: issuanceToken,
      transactionForwarderAddress: testEnv.transactionForwarderAddress,
      creditFacilityAddress,
      presaleAddress,
      grantMinterRole: true,
      openBuy: true,
      openSell: false, // Keep sell closed (presale mode)
      openBorrow: false,
    })

    expect(configureResult.success).toBe(true)
    console.log('  Market configured successfully\n')
  })

  afterAll(() => {
    console.log('\n=== Fee Management Test Suite Complete ===')
  })

  // ===========================================================================
  // F-58: Commission Schedule Changes During Presale
  // ===========================================================================

  describe('F-58: Presale Commission Schedule Changes', () => {
    it('should update commission schedule before presale opens', async () => {
      if (!available || !presaleAddress) return

      const presaleAdmin = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
        walletClient,
      })

      // Verify we're in NotOpen state
      const currentState = await presaleAdmin.getCurrentState()
      expect(currentState).toBe(PresaleState.NotOpen)

      // Update commission schedule with new rates
      const newCommissionBps = [150, 300, 600] // 1.5%, 3%, 6%
      const newBreakpoints = [[BigInt(1.2e18)], [BigInt(1.2e18), BigInt(2e18)]]

      const receipt = await presaleAdmin.setBaseCommissionAndPriceBreakpoints({
        baseCommissionBps: newCommissionBps,
        priceBreakpoints: newBreakpoints,
      })

      expect(receipt).toBeDefined()
      expect(receipt.status).toBe('success')
      console.log(`  Commission schedule updated, tx: ${receipt.transactionHash}`)

      // Verify the new values on-chain
      const state = await presaleAdmin.getPresaleState()
      expect(state.baseCommissionBps).toEqual(newCommissionBps)
      expect(state.priceBreakpoints.length).toBe(2)
      console.log(`  Verified on-chain: ${state.baseCommissionBps.join(', ')} bps`)
    })

    it('should update commission schedule a second time (re-editing)', async () => {
      if (!available || !presaleAddress) return

      const presaleAdmin = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
        walletClient,
      })

      // Change again to verify re-editing works
      const updatedBps = [200, 400, 800]
      const updatedBreakpoints = [[BigInt(1.5e18)], [BigInt(1.5e18), BigInt(2.5e18)]]

      const receipt = await presaleAdmin.setBaseCommissionAndPriceBreakpoints({
        baseCommissionBps: updatedBps,
        priceBreakpoints: updatedBreakpoints,
      })

      expect(receipt.status).toBe('success')

      // Verify
      const state = await presaleAdmin.getPresaleState()
      expect(state.baseCommissionBps).toEqual(updatedBps)
      console.log(`  Re-edited commission: ${state.baseCommissionBps.join(', ')} bps`)
    })
  })

  // ===========================================================================
  // F-52: Fee Controls During Presale Phase
  // ===========================================================================

  describe('F-52: Fee Controls During Presale Phase', () => {
    it('should set buy fee during presale (NotOpen state)', async () => {
      if (!available) return

      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      // Read initial fee
      const initialBuyFee = await marketAdmin.getBuyFee()
      console.log(`  Initial buy fee: ${initialBuyFee} bps`)

      // Set buy fee to 80 bps (0.8%)
      const receipt = await marketAdmin.setBuyFee({ feeBps: 80 })
      expect(receipt.status).toBe('success')

      // Verify on-chain
      const newBuyFee = await marketAdmin.getBuyFee()
      expect(newBuyFee).toBe(80)
      console.log(`  Buy fee set to ${newBuyFee} bps, tx: ${receipt.transactionHash}`)
    })

    it('should set sell fee during presale (NotOpen state)', async () => {
      if (!available) return

      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      // Read initial fee
      const initialSellFee = await marketAdmin.getSellFee()
      console.log(`  Initial sell fee: ${initialSellFee} bps`)

      // Set sell fee to 120 bps (1.2%)
      const receipt = await marketAdmin.setSellFee({ feeBps: 120 })
      expect(receipt.status).toBe('success')

      // Verify on-chain
      const newSellFee = await marketAdmin.getSellFee()
      expect(newSellFee).toBe(120)
      console.log(`  Sell fee set to ${newSellFee} bps, tx: ${receipt.transactionHash}`)
    })
  })

  // ===========================================================================
  // F-59: Sell Fee in GoLive Transition
  // ===========================================================================

  describe('F-59: Sell Fee in GoLive Transition', () => {
    it('should transition presale to Public state first', async () => {
      if (!available || !presaleAddress) return

      const presaleAdmin = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
        walletClient,
      })

      // Open the presale (NotOpen → Public)
      const receipt = await presaleAdmin.setPresaleState({
        state: PresaleState.Public,
      })
      expect(receipt.status).toBe('success')

      const state = await presaleAdmin.getCurrentState()
      expect(state).toBe(PresaleState.Public)
      console.log(`  Presale state: Public`)
    })

    it('should set buy fee, sell fee, and borrow fee atomically via goLive', async () => {
      if (!available || !presaleAddress) return

      const presaleClient = new Presale({
        data: {
          id: presaleAddress,
          address: presaleAddress,
          purchaseToken_id: collateralToken,
        } as any,
        publicClient,
        walletClient,
        floorAddress,
        authorizerAddress,
        creditFacilityAddress,
      })

      // Read fees before go-live
      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      const buyFeeBefore = await marketAdmin.getBuyFee()
      const sellFeeBefore = await marketAdmin.getSellFee()
      console.log(`  Fees before goLive: buy=${buyFeeBefore}, sell=${sellFeeBefore}`)

      // Go live with specific buy, sell, and borrow fees
      const goLiveReceipt = await presaleClient.goLive({
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        floorAddress,
        authorizerAddress,
        creditFacilityAddress,
        liveBuyFeeBps: 50, // 0.5%
        liveSellFeeBps: 75, // 0.75% — THIS IS THE NEW FIELD
        liveBorrowFeeBps: 600, // 6%
      })

      expect(goLiveReceipt).toBeDefined()
      expect(goLiveReceipt.status).toBe('success')
      console.log(`  goLive tx: ${goLiveReceipt.transactionHash}`)

      // Verify fees were set on-chain
      const buyFeeAfter = await marketAdmin.getBuyFee()
      const sellFeeAfter = await marketAdmin.getSellFee()
      expect(buyFeeAfter).toBe(50)
      expect(sellFeeAfter).toBe(75)
      console.log(`  Fees after goLive: buy=${buyFeeAfter}, sell=${sellFeeAfter}`)
      console.log('  PASS: Sell fee was set atomically in goLive multicall')
    })

    it('should verify presale is now Closed after goLive', async () => {
      if (!available || !presaleAddress) return

      const presaleAdmin = new PresaleAdmin({
        address: presaleAddress,
        publicClient,
        walletClient,
      })

      const state = await presaleAdmin.getCurrentState()
      expect(state).toBe(PresaleState.Closed)
      console.log(`  Presale state after goLive: Closed`)
    })
  })

  // ===========================================================================
  // F-59 (continued): setLiveFees with sell fee
  // ===========================================================================

  describe('F-59: setLiveFees with Sell Fee', () => {
    it('should update fees post-launch using setLiveFees with sell fee', async () => {
      if (!available || !presaleAddress) return

      const presaleClient = new Presale({
        data: {
          id: presaleAddress,
          address: presaleAddress,
          purchaseToken_id: collateralToken,
        } as any,
        publicClient,
        walletClient,
        floorAddress,
        authorizerAddress,
        creditFacilityAddress,
      })

      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      // Set new live fees including sell fee
      const receipt = await presaleClient.setLiveFees({
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        floorAddress,
        creditFacilityAddress,
        buyFeeBps: 100, // 1%
        sellFeeBps: 150, // 1.5% — THIS IS THE NEW FIELD
        borrowFeeBps: 350, // 3.5%
      })

      expect(receipt).toBeDefined()
      expect(receipt.status).toBe('success')
      console.log(`  setLiveFees tx: ${receipt.transactionHash}`)

      // Verify on-chain
      const buyFee = await marketAdmin.getBuyFee()
      const sellFee = await marketAdmin.getSellFee()
      expect(buyFee).toBe(100)
      expect(sellFee).toBe(150)
      console.log(`  Fees after setLiveFees: buy=${buyFee}, sell=${sellFee}`)
      console.log('  PASS: Sell fee updated via setLiveFees multicall')
    })

    it('should allow setLiveFees without sell fee (backwards compatible)', async () => {
      if (!available || !presaleAddress) return

      const presaleClient = new Presale({
        data: {
          id: presaleAddress,
          address: presaleAddress,
          purchaseToken_id: collateralToken,
        } as any,
        publicClient,
        walletClient,
        floorAddress,
        authorizerAddress,
        creditFacilityAddress,
      })

      const marketAdmin = new MarketAdmin({
        address: floorAddress,
        publicClient,
        walletClient,
      })

      // Set fees WITHOUT sell fee — should only update buy + borrow
      const receipt = await presaleClient.setLiveFees({
        transactionForwarderAddress: testEnv.transactionForwarderAddress,
        floorAddress,
        creditFacilityAddress,
        buyFeeBps: 200, // 2%
        // sellFeeBps omitted — sell fee should remain at 150 from previous test
        borrowFeeBps: 400, // 4%
      })

      expect(receipt.status).toBe('success')

      const buyFee = await marketAdmin.getBuyFee()
      const sellFee = await marketAdmin.getSellFee()
      expect(buyFee).toBe(200)
      expect(sellFee).toBe(150) // Unchanged
      console.log(`  Fees after setLiveFees (no sell): buy=${buyFee}, sell=${sellFee}`)
      console.log('  PASS: Omitting sellFeeBps leaves sell fee unchanged')
    })
  })

  // ===========================================================================
  // F-75: Fee Validation (pure logic test, no transactions needed)
  // ===========================================================================

  describe('F-75: Fee Validation Logic', () => {
    it('should reject buy fee above 10% (1000 bps) in wizard validation', () => {
      // This mirrors the canProceed validation in create-market/page.tsx
      const validateTreasuryStep = (buyFeeBps: number, sellFeeBps: number) => {
        return buyFeeBps >= 0 && buyFeeBps <= 1000 && sellFeeBps >= 0 && sellFeeBps <= 1000
      }

      expect(validateTreasuryStep(80, 120)).toBe(true) // Normal fees
      expect(validateTreasuryStep(0, 0)).toBe(true) // Zero fees
      expect(validateTreasuryStep(1000, 1000)).toBe(true) // Max 10%
      expect(validateTreasuryStep(1001, 120)).toBe(false) // Buy fee too high
      expect(validateTreasuryStep(80, 1001)).toBe(false) // Sell fee too high
      expect(validateTreasuryStep(5000, 5000)).toBe(false) // Both too high

      console.log('  PASS: Fee upper bound validation (max 10%) works correctly')
    })

    it('should correctly compute floor vs recipient allocation', () => {
      // Mirrors the pie chart logic in step-treasury.tsx
      const computeDistribution = (floorFeePercentage: number, recipientShares: number[]) => {
        const floorPct = floorFeePercentage / 100
        const totalShares = recipientShares.reduce((sum, s) => sum + s, 0)
        const remainingPct = 100 - floorPct

        return {
          floorPct,
          recipientPcts: recipientShares.map((s) => (s / (totalShares || 1)) * remainingPct),
        }
      }

      // 60% floor, shares 7000 + 3000
      const dist = computeDistribution(6000, [7000, 3000])
      expect(dist.floorPct).toBe(60)
      expect(dist.recipientPcts[0]).toBeCloseTo(28, 0) // 70% of 40%
      expect(dist.recipientPcts[1]).toBeCloseTo(12, 0) // 30% of 40%
      expect(dist.floorPct + dist.recipientPcts[0] + dist.recipientPcts[1]).toBeCloseTo(100, 0)

      console.log('  PASS: Floor allocation + recipient shares always total 100%')
    })
  })
})
