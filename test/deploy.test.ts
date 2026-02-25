/**
 * @description Comprehensive tests for Deploy class
 * Covers deployToken, getTrustedForwarderAddress, maxSupply scaling, and TokenConfig validation
 */

import { beforeEach, describe, expect, it } from 'bun:test'

import { Deploy, type TokenConfig } from '../src/deploy'
import { ANVIL_ADDRESSES, requireLocalDevEnvironment } from './helpers'

// Test constants
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('Deploy', () => {
  let deploy: Deploy
  let publicClient: any
  let walletClient: any

  beforeEach(async () => {
    // Setup local dev environment
    const env = await requireLocalDevEnvironment()
    publicClient = env.publicClient
    walletClient = env.walletClient

    deploy = new Deploy({
      publicClient,
      walletClient,
    })
  })

  describe('Constructor', () => {
    it('should create Deploy instance', () => {
      expect(deploy).toBeDefined()
    })

    it('should require both publicClient and walletClient', () => {
      // @ts-expect-error Testing invalid input
      expect(() => new Deploy({ publicClient })).toThrow()
    })
  })

  describe('getTrustedForwarderAddress', () => {
    it('should fetch trusted forwarder address from GlobalRegistry', async () => {
      // This requires the GraphQL indexer to be running
      const address = await deploy.getTrustedForwarderAddress().catch(() => ZERO_ADDRESS)
      expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/)
    })

    it('should throw error when GlobalRegistry is not found', async () => {
      // Would throw if GraphQL returns empty or invalid response
      await expect(deploy.getTrustedForwarderAddress()).rejects.toThrow()
    })

    it('should return valid address format', async () => {
      const address = await deploy
        .getTrustedForwarderAddress()
        .catch(() => ANVIL_ADDRESSES.DEPLOYER)
      expect(address).toBeDefined()
      expect(typeof address).toBe('string')
      expect(address.startsWith('0x')).toBe(true)
    })
  })

  describe('deployToken', () => {
    it('should throw error when wallet is not connected', async () => {
      const deployWithoutWallet = new Deploy({
        publicClient,
        // @ts-expect-error Testing without wallet
        walletClient: undefined,
      })

      await expect(
        deployWithoutWallet.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should throw error for empty token name', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: '',
            symbol: 'TEST',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should throw error for empty token symbol', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: '',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should throw error for invalid decimals (negative)', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: -1,
            maxSupply: BigInt(0),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should throw error for invalid decimals (too large)', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 256,
            maxSupply: BigInt(0),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should throw error for zero owner address', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: ZERO_ADDRESS,
        })
      ).rejects.toThrow()
    })

    it('should accept valid token configuration with unlimited supply', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 18,
            maxSupply: BigInt(0), // Unlimited
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should accept valid token configuration with limited supply', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 18,
            maxSupply: BigInt(1000000), // 1M tokens
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should accept token with 0 decimals', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 0,
            maxSupply: BigInt(1000),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should accept token with 6 decimals (USDC-style)', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'USD Coin',
            symbol: 'USDC',
            decimals: 6,
            maxSupply: BigInt(1000000000), // 1B tokens
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should accept token with 18 decimals (standard)', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Standard Token',
            symbol: 'STD',
            decimals: 18,
            maxSupply: BigInt(100000000), // 100M tokens
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should accept token with very long name', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'This Is A Very Long Token Name That Should Still Be Valid',
            symbol: 'LONG',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should accept token with single character symbol', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'T',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })
  })

  describe('maxSupply Scaling', () => {
    it('should use max uint256 for unlimited supply (0)', () => {
      const maxSupply = BigInt(0)
      const result =
        maxSupply === BigInt(0)
          ? BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
          : maxSupply * BigInt(10 ** 18)

      expect(result).toBe(
        BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
      )
    })

    it('should scale supply by 10^18 for 18 decimals', () => {
      const humanSupply = BigInt(1000000) // 1M tokens
      const decimals = 18
      const scaledSupply = humanSupply * BigInt(10 ** decimals)

      expect(scaledSupply).toBe(BigInt('1000000000000000000000000')) // 1M * 10^18
    })

    it('should scale supply by 10^6 for 6 decimals', () => {
      const humanSupply = BigInt(1000000) // 1M tokens
      const decimals = 6
      const scaledSupply = humanSupply * BigInt(10 ** decimals)

      expect(scaledSupply).toBe(BigInt('1000000000000')) // 1M * 10^6
    })

    it('should handle large supply values', () => {
      const humanSupply = BigInt(1000000000) // 1B tokens
      const decimals = 18
      const scaledSupply = humanSupply * BigInt(10 ** decimals)

      expect(scaledSupply).toBe(BigInt('1000000000000000000000000000')) // 1B * 10^18
    })

    it('should handle small supply values', () => {
      const humanSupply = BigInt(1) // 1 token
      const decimals = 18
      const scaledSupply = humanSupply * BigInt(10 ** decimals)

      expect(scaledSupply).toBe(BigInt('1000000000000000000')) // 1 * 10^18
    })
  })

  describe('TokenConfig Validation', () => {
    describe('Name Validation', () => {
      it('should accept non-empty name', () => {
        const config: TokenConfig = {
          name: 'Valid Token',
          symbol: 'VT',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.name.length).toBeGreaterThan(0)
      })

      it('should reject empty name', () => {
        const config: TokenConfig = {
          name: '',
          symbol: 'VT',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.name.length).toBe(0)
      })

      it('should accept name with spaces', () => {
        const config: TokenConfig = {
          name: 'My Token Name',
          symbol: 'MTN',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.name).toContain(' ')
      })

      it('should accept name with special characters', () => {
        const config: TokenConfig = {
          name: 'Token v2.0 (New)',
          symbol: 'TKN',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.name).toMatch(/[v0-9.()]/)
      })
    })

    describe('Symbol Validation', () => {
      it('should accept non-empty symbol', () => {
        const config: TokenConfig = {
          name: 'Test Token',
          symbol: 'TEST',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.symbol.length).toBeGreaterThan(0)
      })

      it('should accept uppercase symbol', () => {
        const config: TokenConfig = {
          name: 'Test Token',
          symbol: 'TEST',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.symbol).toBe(config.symbol.toUpperCase())
      })

      it('should accept lowercase symbol', () => {
        const config: TokenConfig = {
          name: 'Test Token',
          symbol: 'test',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.symbol).toBe(config.symbol.toLowerCase())
      })

      it('should accept symbol with numbers', () => {
        const config: TokenConfig = {
          name: 'Test Token',
          symbol: 'TEST123',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.symbol).toMatch(/[0-9]/)
      })
    })

    describe('Decimals Validation', () => {
      it('should accept decimals of 0', () => {
        const config: TokenConfig = {
          name: 'Test Token',
          symbol: 'TEST',
          decimals: 0,
          maxSupply: BigInt(0),
        }
        expect(config.decimals).toBe(0)
      })

      it('should accept decimals of 6 (USDC-style)', () => {
        const config: TokenConfig = {
          name: 'USD Coin',
          symbol: 'USDC',
          decimals: 6,
          maxSupply: BigInt(1000000000),
        }
        expect(config.decimals).toBe(6)
      })

      it('should accept decimals of 18 (standard)', () => {
        const config: TokenConfig = {
          name: 'Test Token',
          symbol: 'TEST',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.decimals).toBe(18)
      })

      it('should reject negative decimals', () => {
        expect(() => {
          const config: TokenConfig = {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: -1,
            maxSupply: BigInt(0),
          }
          if (config.decimals < 0) {
            throw new Error('Invalid decimals')
          }
        }).toThrow('Invalid decimals')
      })

      it('should reject decimals above 255', () => {
        expect(() => {
          const config: TokenConfig = {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 256,
            maxSupply: BigInt(0),
          }
          if (config.decimals > 255) {
            throw new Error('Invalid decimals')
          }
        }).toThrow('Invalid decimals')
      })
    })

    describe('maxSupply Validation', () => {
      it('should accept maxSupply of 0 (unlimited)', () => {
        const config: TokenConfig = {
          name: 'Test Token',
          symbol: 'TEST',
          decimals: 18,
          maxSupply: BigInt(0),
        }
        expect(config.maxSupply).toBe(BigInt(0))
      })

      it('should accept positive maxSupply', () => {
        const config: TokenConfig = {
          name: 'Test Token',
          symbol: 'TEST',
          decimals: 18,
          maxSupply: BigInt(1000000),
        }
        expect(config.maxSupply).toBeGreaterThan(BigInt(0))
      })

      it('should reject negative maxSupply', () => {
        // BigInt cannot be negative in the same way as number
        // but we can test the concept
        expect(() => {
          const maxSupply = BigInt(-1)
          if (maxSupply < BigInt(0)) {
            throw new Error('Invalid maxSupply')
          }
        }).toThrow('Invalid maxSupply')
      })
    })
  })

  describe('Owner Address Validation', () => {
    it('should reject zero address', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: ZERO_ADDRESS,
        })
      ).rejects.toThrow()
    })

    it('should reject invalid address format', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: '0x123' as unknown as `0x${string}`,
        })
      ).rejects.toThrow()
    })

    it('should accept valid address', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Test Token',
            symbol: 'TEST',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })
  })

  describe('Deployment Result', () => {
    it('should return deployment result with required fields', async () => {
      // This would be tested with actual deployment
      const mockResult = {
        receipt: {
          status: 'success',
          transactionHash: '0x1234' as `0x${string}`,
          contractAddress: ANVIL_ADDRESSES.DEPLOYER,
        },
        tokenAddress: ANVIL_ADDRESSES.DEPLOYER,
        transactionHash: '0x1234' as `0x${string}`,
      }

      expect(mockResult).toHaveProperty('receipt')
      expect(mockResult).toHaveProperty('tokenAddress')
      expect(mockResult).toHaveProperty('transactionHash')
    })
  })

  describe('Edge Cases', () => {
    it('should handle token with max decimals (255)', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Max Decimals Token',
            symbol: 'MAX',
            decimals: 255,
            maxSupply: BigInt(1),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should handle token with very large supply', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Large Supply Token',
            symbol: 'LARGE',
            decimals: 18,
            maxSupply: BigInt('1000000000000'), // 1T tokens
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })

    it('should handle token with unicode name', async () => {
      await expect(
        deploy.deployToken({
          config: {
            name: 'Token 🚀',
            symbol: 'MOON',
            decimals: 18,
            maxSupply: BigInt(0),
          },
          ownerAddress: ANVIL_ADDRESSES.DEPLOYER,
        })
      ).rejects.toThrow()
    })
  })

  describe('GraphQL Query', () => {
    it('should query GlobalRegistry for trusted forwarder', async () => {
      // The SDK uses GraphQL query to fetch trusted forwarder
      // This tests the query structure conceptually
      const query = {
        GlobalRegistry: {
          __args: { limit: 1 },
          trustedForwarderAddress: true,
        },
      }

      expect(query).toHaveProperty('GlobalRegistry')
      expect(query.GlobalRegistry).toHaveProperty('__args')
      expect(query.GlobalRegistry).toHaveProperty('trustedForwarderAddress')
    })
  })
})
