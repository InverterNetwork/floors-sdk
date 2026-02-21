import { beforeAll, describe, expect, it } from 'bun:test'
import type { Address, Chain, Hex, PublicClient, Transport } from 'viem'

import { Authorizer } from '../src/authorizer'
import type { TAuthorizerRole } from '../src/graphql/api'
import { fetchAuthorizerRolesById } from '../src/graphql/api'
import { Client } from '../src/graphql/client'
import { DEFAULT_ADMIN_ROLE, PUBLIC_ROLE } from '../src/utils/selectors'
import { ANVIL_ADDRESSES, LOCAL_GRAPHQL_URL, requireLocalDevEnvironment } from './helpers'

// =============================================================================
// Unit Tests — Authorizer.hasPermission (no RPC needed)
// =============================================================================

describe('#Authorizer.hasPermission (unit)', () => {
  const ADMIN = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' as Address
  const USER = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC' as Address
  const RANDOM = '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65' as Address
  const TARGET = '0x1111111111111111111111111111111111111111' as Address
  const SELECTOR = '0xdeadbeef' as Hex

  const CUSTOM_ROLE_ID = '0x0000000000000000000000000000000000000000000000000000000000000002'

  function makeAuthorizer(roles: TAuthorizerRole[]): Authorizer {
    // publicClient is not used by hasPermission — supply a minimal stub
    return new Authorizer({
      authorizerAddress: '0x0000000000000000000000000000000000000000' as Address,
      publicClient: {} as any,
      roles,
    })
  }

  function makeRole(overrides: Partial<TAuthorizerRole> & { roleId: string }): TAuthorizerRole {
    return {
      id: `auth-${overrides.roleId}`,
      roleId: overrides.roleId,
      name: overrides.name ?? null,
      adminRole: null,
      adminRoleName: null,
      isAdminBurned: false,
      authorizerId: '0x0000000000000000000000000000000000000000',
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
      members: overrides.members ?? [],
      permissions: overrides.permissions ?? [],
      isUserMember: false,
    }
  }

  // -------------------------------------------------------------------------
  // 1. DEFAULT_ADMIN_ROLE grants access to everything
  // -------------------------------------------------------------------------

  it('should return true when caller is DEFAULT_ADMIN_ROLE member', () => {
    const roles = [
      makeRole({
        roleId: DEFAULT_ADMIN_ROLE,
        members: [
          {
            id: 'm1',
            address: ADMIN,
            grantedBy: ADMIN,
            grantedAt: new Date(),
            transactionHash: '0x',
          },
        ],
      }),
    ]

    const authorizer = makeAuthorizer(roles)
    expect(authorizer.hasPermission(ADMIN, TARGET, SELECTOR)).toBe(true)
  })

  it('should return true for admin even without matching target+selector permission', () => {
    const roles = [
      makeRole({
        roleId: DEFAULT_ADMIN_ROLE,
        members: [
          {
            id: 'm1',
            address: ADMIN,
            grantedBy: ADMIN,
            grantedAt: new Date(),
            transactionHash: '0x',
          },
        ],
      }),
    ]

    const authorizer = makeAuthorizer(roles)
    const randomTarget = '0x9999999999999999999999999999999999999999' as Address
    const randomSelector = '0x12345678' as Hex
    expect(authorizer.hasPermission(ADMIN, randomTarget, randomSelector)).toBe(true)
  })

  // -------------------------------------------------------------------------
  // 2. PUBLIC_ROLE with matching permission grants access to anyone
  // -------------------------------------------------------------------------

  it('should return true when PUBLIC_ROLE has matching target+selector', () => {
    const roles = [
      makeRole({
        roleId: PUBLIC_ROLE,
        permissions: [
          {
            id: 'p1',
            target: TARGET,
            selector: SELECTOR,
            selectorName: 'test',
            addedAt: new Date(),
            transactionHash: '0x',
          },
        ],
      }),
    ]

    const authorizer = makeAuthorizer(roles)
    // Any random address should have access
    expect(authorizer.hasPermission(RANDOM, TARGET, SELECTOR)).toBe(true)
  })

  // -------------------------------------------------------------------------
  // 3. Custom role with matching permission + member
  // -------------------------------------------------------------------------

  it('should return true when caller has a custom role with matching permission', () => {
    const roles = [
      makeRole({
        roleId: CUSTOM_ROLE_ID,
        members: [
          {
            id: 'm1',
            address: USER,
            grantedBy: ADMIN,
            grantedAt: new Date(),
            transactionHash: '0x',
          },
        ],
        permissions: [
          {
            id: 'p1',
            target: TARGET,
            selector: SELECTOR,
            selectorName: 'test',
            addedAt: new Date(),
            transactionHash: '0x',
          },
        ],
      }),
    ]

    const authorizer = makeAuthorizer(roles)
    expect(authorizer.hasPermission(USER, TARGET, SELECTOR)).toBe(true)
  })

  // -------------------------------------------------------------------------
  // 4. Negative cases
  // -------------------------------------------------------------------------

  it('should return false when caller has no roles and is not admin', () => {
    const roles = [
      makeRole({ roleId: DEFAULT_ADMIN_ROLE }),
      makeRole({
        roleId: CUSTOM_ROLE_ID,
        permissions: [
          {
            id: 'p1',
            target: TARGET,
            selector: SELECTOR,
            selectorName: 'test',
            addedAt: new Date(),
            transactionHash: '0x',
          },
        ],
      }),
    ]

    const authorizer = makeAuthorizer(roles)
    expect(authorizer.hasPermission(RANDOM, TARGET, SELECTOR)).toBe(false)
  })

  it('should return false when caller has a role but no matching permission', () => {
    const otherSelector = '0xaabbccdd' as Hex
    const roles = [
      makeRole({
        roleId: CUSTOM_ROLE_ID,
        members: [
          {
            id: 'm1',
            address: USER,
            grantedBy: ADMIN,
            grantedAt: new Date(),
            transactionHash: '0x',
          },
        ],
        permissions: [
          {
            id: 'p1',
            target: TARGET,
            selector: otherSelector,
            selectorName: 'other',
            addedAt: new Date(),
            transactionHash: '0x',
          },
        ],
      }),
    ]

    const authorizer = makeAuthorizer(roles)
    expect(authorizer.hasPermission(USER, TARGET, SELECTOR)).toBe(false)
  })

  it('should return false when roles array is undefined', () => {
    const authorizer = new Authorizer({
      authorizerAddress: '0x0000000000000000000000000000000000000000' as Address,
      publicClient: {} as any,
    })
    expect(authorizer.hasPermission(ADMIN, TARGET, SELECTOR)).toBe(false)
  })

  it('should return false when roles array is empty', () => {
    const authorizer = makeAuthorizer([])
    expect(authorizer.hasPermission(ADMIN, TARGET, SELECTOR)).toBe(false)
  })

  // -------------------------------------------------------------------------
  // 5. Case-insensitive address comparison
  // -------------------------------------------------------------------------

  it('should be case-insensitive for address comparison', () => {
    const lowerCaseAdmin = ADMIN.toLowerCase() as Address
    const roles = [
      makeRole({
        roleId: DEFAULT_ADMIN_ROLE,
        members: [
          {
            id: 'm1',
            address: ADMIN, // checksummed
            grantedBy: ADMIN,
            grantedAt: new Date(),
            transactionHash: '0x',
          },
        ],
      }),
    ]

    const authorizer = makeAuthorizer(roles)
    expect(authorizer.hasPermission(lowerCaseAdmin, TARGET, SELECTOR)).toBe(true)
  })

  it('should be case-insensitive for target+selector comparison', () => {
    const upperTarget = TARGET.toUpperCase() as Address
    const upperSelector = SELECTOR.toUpperCase() as Hex
    const roles = [
      makeRole({
        roleId: PUBLIC_ROLE,
        permissions: [
          {
            id: 'p1',
            target: TARGET.toLowerCase(),
            selector: SELECTOR.toLowerCase(),
            selectorName: 'test',
            addedAt: new Date(),
            transactionHash: '0x',
          },
        ],
      }),
    ]

    const authorizer = makeAuthorizer(roles)
    expect(authorizer.hasPermission(RANDOM, upperTarget, upperSelector)).toBe(true)
  })
})

// =============================================================================
// Integration Tests — Authorizer with live indexer data
// =============================================================================

describe('#Authorizer.hasPermission (integration)', () => {
  let publicClient: PublicClient<Transport, Chain>
  let authorizerId: string | null = null

  beforeAll(async () => {
    const env = await requireLocalDevEnvironment()
    publicClient = env.publicClient

    Client.updateUrl(LOCAL_GRAPHQL_URL)

    // Find the first authorizer from the indexer
    const client = Client.get()
    const result = await client.query(`query { AuthorizerContract(limit: 1) { id floor } }`, {})

    const authorizers = result.data?.AuthorizerContract ?? []
    if (authorizers.length > 0) {
      authorizerId = authorizers[0].id
      console.log(`Using authorizer: ${authorizerId}`)
    } else {
      console.log('No authorizers found in indexer — skipping integration tests')
    }
  })

  it('should fetch roles from indexer and create an Authorizer', async () => {
    if (!authorizerId) return

    const roles = await fetchAuthorizerRolesById(authorizerId)
    expect(Array.isArray(roles)).toBe(true)
    expect(roles.length).toBeGreaterThan(0)

    console.log(`Fetched ${roles.length} roles for authorizer ${authorizerId}`)
    for (const role of roles) {
      console.log(
        `  Role: ${role.name ?? role.roleId} | members=${role.members.length} | permissions=${role.permissions.length}`
      )
    }
  })

  it('should return true for deployer (admin) on any target+selector', async () => {
    if (!authorizerId) return

    const roles = await fetchAuthorizerRolesById(authorizerId, ANVIL_ADDRESSES.ADMIN)

    const authorizer = new Authorizer({
      authorizerAddress: authorizerId as Address,
      publicClient,
      roles,
    })

    const result = authorizer.hasPermission(
      ANVIL_ADDRESSES.ADMIN,
      '0x1111111111111111111111111111111111111111' as Address,
      '0xdeadbeef' as Hex
    )

    expect(result).toBe(true)
  })

  it('should verify PUBLIC_ROLE permissions return true for any address', async () => {
    if (!authorizerId) return

    const roles = await fetchAuthorizerRolesById(authorizerId)

    // Find a permission attached to PUBLIC_ROLE
    const publicRole = roles.find((r) => r.roleId === PUBLIC_ROLE)
    if (!publicRole || publicRole.permissions.length === 0) {
      console.log('No PUBLIC_ROLE permissions found — skipping')
      return
    }

    const perm = publicRole.permissions[0]
    const authorizer = new Authorizer({
      authorizerAddress: authorizerId as Address,
      publicClient,
      roles,
    })

    const randomAddress = '0x000000000000000000000000000000000000dEaD' as Address
    const result = authorizer.hasPermission(
      randomAddress,
      perm.target as Address,
      perm.selector as Hex
    )

    expect(result).toBe(true)
  })

  it('should return false for a random user on restricted functions', async () => {
    if (!authorizerId) return

    const roles = await fetchAuthorizerRolesById(authorizerId)
    const authorizer = new Authorizer({
      authorizerAddress: authorizerId as Address,
      publicClient,
      roles,
    })

    // Use a non-public selector that only admin should have access to
    // setBuyFee is typically admin-only
    const result = authorizer.hasPermission(
      '0x000000000000000000000000000000000000dEaD' as Address,
      '0x1111111111111111111111111111111111111111' as Address,
      '0x00000000' as Hex // nonsense selector
    )

    expect(result).toBe(false)
  })
})

// =============================================================================
// Constant Export Tests
// =============================================================================

describe('#Access Control Constants', () => {
  it('DEFAULT_ADMIN_ROLE should be bytes32(0)', () => {
    expect(DEFAULT_ADMIN_ROLE).toBe(
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    )
    expect(DEFAULT_ADMIN_ROLE.length).toBe(66) // 0x + 64 hex chars
  })

  it('PUBLIC_ROLE should be bytes32(1)', () => {
    expect(PUBLIC_ROLE).toBe('0x0000000000000000000000000000000000000000000000000000000000000001')
    expect(PUBLIC_ROLE.length).toBe(66)
  })

  it('DEFAULT_ADMIN_ROLE and PUBLIC_ROLE should be different', () => {
    expect(DEFAULT_ADMIN_ROLE).not.toBe(PUBLIC_ROLE)
  })
})
