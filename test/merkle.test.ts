import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import type { Address, Chain, PublicClient, Transport } from 'viem'
import { decodeEventLog } from 'viem'

import AUT_Roles_v2 from '../src/abis/AUT_Roles_v2'
import ModuleFactory_v1 from '../src/abis/ModuleFactory_v1'
import Presale_v1 from '../src/abis/Presale_v1'
import { Launch } from '../src/launch'
import { generateMerkleTree, getMerkleProof, verifyMerkleProof } from '../src/merkle-tree'
import { PresaleAdmin } from '../src/presale-admin'
import type { PopWalletClient } from '../src/types'
import { PRESALE_SELECTORS } from '../src/utils/selectors'
import {
  ANVIL_ADDRESSES,
  checkLocalAvailability,
  createLocalClients,
  createLocalWalletClient,
  createTestLaunchConfig,
  createTestPresaleConfig,
  deployTestTokens,
  runDeploymentScript,
} from './helpers/index'

// =============================================================================
// Pure Merkle Tree Tests (no chain required)
// =============================================================================

describe('#MerkleTree', () => {
  const TEST_ADDRESSES: Address[] = [
    ANVIL_ADDRESSES.ADMIN,
    ANVIL_ADDRESSES.MANAGER,
    ANVIL_ADDRESSES.USER_1,
    ANVIL_ADDRESSES.USER_2,
    ANVIL_ADDRESSES.USER_3,
  ]

  // ---------------------------------------------------------------------------
  // Tree Generation
  // ---------------------------------------------------------------------------

  describe('generateMerkleTree', () => {
    it('should generate a tree with a valid root', () => {
      const tree = generateMerkleTree(TEST_ADDRESSES)
      expect(tree.root).toMatch(/^0x[0-9a-f]{64}$/i)
      expect(tree.addresses.length).toBe(5)
    })

    it('should generate proofs for all addresses', () => {
      const tree = generateMerkleTree(TEST_ADDRESSES)
      for (const addr of TEST_ADDRESSES) {
        const proof = tree.proofs[addr]
        expect(proof).toBeDefined()
        expect(Array.isArray(proof)).toBe(true)
        expect(proof.length).toBeGreaterThan(0)
      }
    })

    it('should produce a deterministic root regardless of input order', () => {
      const tree1 = generateMerkleTree(TEST_ADDRESSES)
      const reversed = [...TEST_ADDRESSES].reverse()
      const tree2 = generateMerkleTree(reversed)
      expect(tree1.root).toBe(tree2.root)
    })

    it('should deduplicate addresses', () => {
      const duplicated = [...TEST_ADDRESSES, TEST_ADDRESSES[0], TEST_ADDRESSES[1]]
      const tree = generateMerkleTree(duplicated)
      expect(tree.addresses.length).toBe(5)
    })

    it('should handle a single address', () => {
      const tree = generateMerkleTree([ANVIL_ADDRESSES.ADMIN])
      expect(tree.root).toMatch(/^0x[0-9a-f]{64}$/i)
      expect(tree.addresses.length).toBe(1)
      expect(tree.proofs[ANVIL_ADDRESSES.ADMIN]).toBeDefined()
    })

    it('should handle two addresses', () => {
      const tree = generateMerkleTree([ANVIL_ADDRESSES.ADMIN, ANVIL_ADDRESSES.MANAGER])
      expect(tree.root).toMatch(/^0x[0-9a-f]{64}$/i)
      expect(tree.addresses.length).toBe(2)
    })

    it('should throw on empty address list', () => {
      expect(() => generateMerkleTree([])).toThrow('Address list must not be empty')
    })

    it('should normalize non-checksummed addresses', () => {
      const lowercase = TEST_ADDRESSES.map((a) => a.toLowerCase() as Address)
      const tree = generateMerkleTree(lowercase)
      expect(tree.root).toBe(generateMerkleTree(TEST_ADDRESSES).root)
    })
  })

  // ---------------------------------------------------------------------------
  // Proof Extraction
  // ---------------------------------------------------------------------------

  describe('getMerkleProof', () => {
    it('should return a proof for a whitelisted address', () => {
      const tree = generateMerkleTree(TEST_ADDRESSES)
      const proof = getMerkleProof(tree, ANVIL_ADDRESSES.USER_1)
      expect(Array.isArray(proof)).toBe(true)
      expect(proof.length).toBeGreaterThan(0)
    })

    it('should throw for an address not in the tree', () => {
      const tree = generateMerkleTree([ANVIL_ADDRESSES.ADMIN])
      expect(() => getMerkleProof(tree, ANVIL_ADDRESSES.USER_3)).toThrow(
        'is not in the Merkle tree'
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Proof Verification
  // ---------------------------------------------------------------------------

  describe('verifyMerkleProof', () => {
    it('should verify a valid proof', () => {
      const tree = generateMerkleTree(TEST_ADDRESSES)
      for (const addr of TEST_ADDRESSES) {
        const proof = getMerkleProof(tree, addr)
        expect(verifyMerkleProof(addr, proof, tree.root)).toBe(true)
      }
    })

    it('should reject a proof for the wrong address', () => {
      const tree = generateMerkleTree(TEST_ADDRESSES)
      const proofForAdmin = getMerkleProof(tree, ANVIL_ADDRESSES.ADMIN)
      // Use admin's proof with a different address
      expect(verifyMerkleProof(ANVIL_ADDRESSES.USER_3, proofForAdmin, tree.root)).toBe(false)
    })

    it('should reject a proof against the wrong root', () => {
      const tree = generateMerkleTree(TEST_ADDRESSES)
      const proof = getMerkleProof(tree, ANVIL_ADDRESSES.ADMIN)
      const fakeRoot =
        '0x0000000000000000000000000000000000000000000000000000000000000001' as `0x${string}`
      expect(verifyMerkleProof(ANVIL_ADDRESSES.ADMIN, proof, fakeRoot)).toBe(false)
    })

    it('should verify a single-address tree (empty proof)', () => {
      const tree = generateMerkleTree([ANVIL_ADDRESSES.ADMIN])
      const proof = getMerkleProof(tree, ANVIL_ADDRESSES.ADMIN)
      // Single address: proof is empty, root === leaf hash
      expect(proof.length).toBe(0)
      expect(verifyMerkleProof(ANVIL_ADDRESSES.ADMIN, proof, tree.root)).toBe(true)
    })
  })
})

// =============================================================================
// E2E Merkle + Presale Tests (devnet required)
// =============================================================================

describe('#MerklePresaleE2E', () => {
  let publicClient: PublicClient<Transport, Chain>
  let adminWalletClient: PopWalletClient
  let userWalletClient: PopWalletClient
  let launch: Launch
  let isDevnetAvailable = false
  let isMerkleSupported = false

  // Deployed addresses (populated during test)
  let presaleAddress: Address
  let authorizerAddress: Address

  const WHITELIST_ADDRESSES: Address[] = [
    ANVIL_ADDRESSES.USER_1,
    ANVIL_ADDRESSES.USER_2,
    ANVIL_ADDRESSES.USER_3,
  ]

  // ---------------------------------------------------------------------------
  // Setup
  // ---------------------------------------------------------------------------

  beforeAll(async () => {
    // Deploy infrastructure to local Anvil
    const floorFactoryAddress = runDeploymentScript({ local: true })

    // Create clients connected to local Anvil
    const clients = createLocalClients('DEPLOYER')
    publicClient = clients.publicClient
    adminWalletClient = clients.walletClient
    userWalletClient = createLocalWalletClient('USER_1')

    launch = new Launch({
      floorFactoryAddress,
      publicClient,
      walletClient: adminWalletClient,
    })

    const blockNumber = await checkLocalAvailability(publicClient)
    isDevnetAvailable = blockNumber !== null
    if (isDevnetAvailable) {
      console.log(`Local Anvil available at block ${blockNumber}`)
    } else {
      console.warn('Local Anvil not available, E2E tests will be skipped')
    }
  }, 300_000)

  afterAll(() => {
    console.log('\n=== Merkle E2E Test Suite Complete ===')
  })

  // ---------------------------------------------------------------------------
  // Deploy Market with Presale and Configure Permissions
  // ---------------------------------------------------------------------------

  it('should deploy a market with presale and configure merkle permissions', async () => {
    if (!isDevnetAvailable) {
      console.log('Devnet not available, skipping')
      return
    }

    console.log('\n--- Deploying market with presale ---')

    // Deploy fresh tokens
    const { issuanceToken, collateralToken } = await deployTestTokens(
      adminWalletClient,
      publicClient,
      {
        issuance: {
          name: `Merkle Test Token ${Date.now()}`,
          symbol: `MTT${Date.now() % 10000}`,
        },
        collateral: {
          name: 'Test USDC',
          symbol: 'TUSDC',
        },
      }
    )
    console.log(`  Issuance token: ${issuanceToken}`)
    console.log(`  Collateral token: ${collateralToken}`)

    // Create launch config WITH presale
    const config = {
      ...createTestLaunchConfig(issuanceToken, collateralToken),
      presale: createTestPresaleConfig(ANVIL_ADDRESSES.ADMIN),
    }

    // Create the floor market
    const result = await launch.create(config)
    expect(result.floorAddress).toMatch(/^0x[0-9a-fA-F]{40}$/)
    console.log(`  Floor address: ${result.floorAddress}`)
    console.log(`  Market ID: ${result.marketId}`)

    // Parse ModuleCreated events from the receipt to find module addresses
    const receipt = await publicClient.getTransactionReceipt({
      hash: result.transactionHash as `0x${string}`,
    })

    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: ModuleFactory_v1,
          data: log.data,
          topics: log.topics,
        })
        if (decoded.eventName === 'ModuleCreated') {
          const args = decoded.args as { module_: Address; metadata_: { title: string } }
          if (args.metadata_?.title === 'Presale_v1') {
            presaleAddress = args.module_
            console.log(`  Presale address: ${presaleAddress}`)
          } else if (args.metadata_?.title === 'AUT_Roles_v2') {
            authorizerAddress = args.module_
            console.log(`  Authorizer address: ${authorizerAddress}`)
          }
        }
      } catch {
        continue
      }
    }

    expect(presaleAddress).toBeDefined()
    expect(authorizerAddress).toBeDefined()

    // Probe whether the deployed Presale_v1 supports merkle functions
    // (devnet may have an older implementation without merkle support)
    try {
      await publicClient.readContract({
        address: presaleAddress,
        abi: Presale_v1,
        functionName: 'getMerkleRoot',
      })
      isMerkleSupported = true
      console.log('  Merkle functions: supported')
    } catch {
      isMerkleSupported = false
      console.warn('  Merkle functions: NOT supported (devnet has older Presale_v1)')
      return
    }

    // Grant PUBLIC_ROLE access for presale merkle functions
    // This mirrors the presaleSetup.s.sol deployment script
    const publicRole = (await publicClient.readContract({
      address: authorizerAddress,
      abi: AUT_Roles_v2,
      functionName: 'PUBLIC_ROLE',
    })) as `0x${string}`
    console.log(`  PUBLIC_ROLE: ${publicRole}`)

    // Grant permissions sequentially to avoid nonce conflicts
    const selectors = [
      PRESALE_SELECTORS.setPresaleState,
      PRESALE_SELECTORS.setMerkleRoot,
      PRESALE_SELECTORS.addToWhitelistWithProof,
    ]
    for (const selector of selectors) {
      const hash = await adminWalletClient.writeContract({
        address: authorizerAddress,
        abi: AUT_Roles_v2,
        functionName: 'addAccessPermission',
        args: [presaleAddress, selector as `0x${string}`, publicRole],
        account: adminWalletClient.account!,
      })
      const permReceipt = await publicClient.waitForTransactionReceipt({ hash })
      expect(permReceipt.status).toBe('success')
    }
    console.log('  Presale merkle permissions configured (public)')
  }, 60_000)

  // ---------------------------------------------------------------------------
  // Set Merkle Root on Presale
  // ---------------------------------------------------------------------------

  it('should set the merkle root on the presale contract', async () => {
    if (!isDevnetAvailable || !presaleAddress || !isMerkleSupported) {
      console.log('Skipping: devnet unavailable, presale not deployed, or merkle unsupported')
      return
    }

    console.log('\n--- Setting merkle root ---')

    const tree = generateMerkleTree(WHITELIST_ADDRESSES)
    console.log(`  Merkle root: ${tree.root}`)
    console.log(`  Whitelisted addresses: ${tree.addresses.length}`)

    const presaleAdmin = new PresaleAdmin({
      address: presaleAddress,
      publicClient,
      walletClient: adminWalletClient,
    })

    // Set merkle root (must be in NotOpen state)
    const receipt = await presaleAdmin.setMerkleRoot({ merkleRoot: tree.root })
    expect(receipt.status).toBe('success')
    console.log(`  setMerkleRoot tx: ${receipt.transactionHash}`)

    // Verify the root was set on-chain
    const onChainRoot = await presaleAdmin.getMerkleRoot()
    expect(onChainRoot).toBe(tree.root)
    console.log(`  On-chain root matches: ${onChainRoot === tree.root}`)
  }, 30_000)

  // ---------------------------------------------------------------------------
  // User Self-Registration with Proof
  // ---------------------------------------------------------------------------

  it('should allow a whitelisted user to self-register with proof', async () => {
    if (!isDevnetAvailable || !presaleAddress || !isMerkleSupported) {
      console.log('Skipping: devnet unavailable, presale not deployed, or merkle unsupported')
      return
    }

    console.log('\n--- User self-registration ---')

    // Transition to Whitelist phase so addToWhitelistWithProof works
    const presaleAdmin = new PresaleAdmin({
      address: presaleAddress,
      publicClient,
      walletClient: adminWalletClient,
    })
    const stateReceipt = await presaleAdmin.setWhitelistPhase()
    expect(stateReceipt.status).toBe('success')
    console.log('  Presale set to Whitelist phase')

    // Regenerate tree and get proof for USER_1
    const tree = generateMerkleTree(WHITELIST_ADDRESSES)
    const userAddress = ANVIL_ADDRESSES.USER_1
    const proof = getMerkleProof(tree, userAddress)
    console.log(`  Proof for ${userAddress}: ${proof.length} elements`)

    // Verify proof client-side first
    expect(verifyMerkleProof(userAddress, proof, tree.root)).toBe(true)

    // Check user is not yet whitelisted on-chain
    const wasBefore = await publicClient.readContract({
      address: presaleAddress,
      abi: Presale_v1,
      functionName: 'isMerkleWhitelisted',
      args: [userAddress],
    })
    expect(wasBefore).toBe(false)
    console.log(`  Was whitelisted before: ${wasBefore}`)

    // User self-registers via direct writeContract call
    const hash = await userWalletClient.writeContract({
      address: presaleAddress,
      abi: Presale_v1,
      functionName: 'addToWhitelistWithProof',
      args: [proof],
      account: userWalletClient.account!,
    })
    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    expect(receipt.status).toBe('success')
    console.log(`  addToWhitelistWithProof tx: ${receipt.transactionHash}`)

    // Verify the user is now whitelisted on-chain
    const isWhitelisted = await publicClient.readContract({
      address: presaleAddress,
      abi: Presale_v1,
      functionName: 'isMerkleWhitelisted',
      args: [userAddress],
    })
    expect(isWhitelisted).toBe(true)
    console.log(`  Is whitelisted after: ${isWhitelisted}`)
  }, 30_000)

  // ---------------------------------------------------------------------------
  // Non-whitelisted user should fail
  // ---------------------------------------------------------------------------

  it('should reject a non-whitelisted address with an invalid proof', async () => {
    if (!isDevnetAvailable || !presaleAddress || !isMerkleSupported) {
      console.log('Skipping: devnet unavailable, presale not deployed, or merkle unsupported')
      return
    }

    console.log('\n--- Non-whitelisted user rejection ---')

    // ADMIN is NOT in the whitelist (only USER_1, USER_2, USER_3)
    const tree = generateMerkleTree(WHITELIST_ADDRESSES)

    // Verify client-side that ADMIN is not in the tree
    expect(() => getMerkleProof(tree, ANVIL_ADDRESSES.ADMIN)).toThrow('is not in the Merkle tree')

    // Also verify that using someone else's proof fails verification
    const user1Proof = getMerkleProof(tree, ANVIL_ADDRESSES.USER_1)
    expect(verifyMerkleProof(ANVIL_ADDRESSES.ADMIN, user1Proof, tree.root)).toBe(false)

    console.log('  Non-whitelisted address correctly rejected')
  })
})
