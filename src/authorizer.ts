import type { Address, Hex, TransactionReceipt } from 'viem'
import { getAddress } from 'viem'

import { AUT_Roles_v2 } from './abis'
import type { TAuthorizerRole } from './graphql/api'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'
import { SafeWrite } from './utils/safe-write'
import { DEFAULT_ADMIN_ROLE, PUBLIC_ROLE } from './utils/selectors'
import { validateAddress } from './utils/validation'

export type TAuthorizerMutationResult = TransactionReceipt

interface AuthorizerConstructorArgs {
  authorizerAddress: Address
  publicClient: PopPublicClient
  walletClient?: PopWalletClient
  roles?: TAuthorizerRole[]
}

interface AuthorizerBaseParams {
  lifecycle?: TransactionLifecycleCallbacks
}

interface CreateRoleParams extends AuthorizerBaseParams {
  roleName: string
  adminRoleId: Hex
  initialMembers?: Address[]
}

interface LabelRoleParams extends AuthorizerBaseParams {
  roleId: Hex
  newRoleName: string
}

interface TransferAdminRoleParams extends AuthorizerBaseParams {
  roleId: Hex
  newAdminRoleId: Hex
}

interface AccessPermissionParams extends AuthorizerBaseParams {
  target: Address
  selector: Hex // bytes4 selector
  roleId: Hex
}

interface CreateRoleWithPermissionsParams extends AuthorizerBaseParams {
  roleName: string
  adminRoleId: Hex
  initialMembers?: Address[]
  permissions: {
    target: Address
    selectors: Hex[]
  }[]
}

interface RoleAccountParams extends AuthorizerBaseParams {
  roleId: Hex
  account?: Address
}

interface BurnRoleAdminParams extends AuthorizerBaseParams {
  roleId: Hex
}

/**
 * @description Authorizer helper for role + permission mutations.
 *              Uses SafeWrite for simulate → write → receipt flow with
 *              full ABI error decoding at every stage.
 */
export class Authorizer {
  private readonly address: Address
  private readonly safeWrite?: SafeWrite
  private readonly walletClient?: PopWalletClient
  private readonly roles?: TAuthorizerRole[]

  constructor({ authorizerAddress, publicClient, walletClient, roles }: AuthorizerConstructorArgs) {
    this.address = getAddress(authorizerAddress)
    this.walletClient = walletClient
    this.safeWrite = walletClient ? new SafeWrite({ publicClient, walletClient }) : undefined
    this.roles = roles
  }

  public getAddress(): Address {
    return this.address
  }

  public getCachedRoles(): TAuthorizerRole[] | undefined {
    return this.roles
  }

  public async createRole({
    roleName,
    adminRoleId,
    initialMembers = [],
    lifecycle,
  }: CreateRoleParams): Promise<TAuthorizerMutationResult> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'createRole',
      args: [roleName, adminRoleId, initialMembers],
      lifecycle,
    })
    return receipt
  }

  public async labelRole({
    roleId,
    newRoleName,
    lifecycle,
  }: LabelRoleParams): Promise<TAuthorizerMutationResult> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'labelRole',
      args: [roleId, newRoleName],
      lifecycle,
    })
    return receipt
  }

  public async transferAdminRole({
    roleId,
    newAdminRoleId,
    lifecycle,
  }: TransferAdminRoleParams): Promise<TAuthorizerMutationResult> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'transferAdminRole',
      args: [roleId, newAdminRoleId],
      lifecycle,
    })
    return receipt
  }

  public async burnRoleAdmin({
    roleId,
    lifecycle,
  }: BurnRoleAdminParams): Promise<TAuthorizerMutationResult> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'burnRoleAdmin',
      args: [roleId],
      lifecycle,
    })
    return receipt
  }

  public async addAccessPermission({
    target,
    selector,
    roleId,
    lifecycle,
  }: AccessPermissionParams): Promise<TAuthorizerMutationResult> {
    const validatedTarget = validateAddress(target, 'target')
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'addAccessPermission',
      args: [validatedTarget, selector, roleId],
      lifecycle,
    })
    return receipt
  }

  public async removeAccessPermission({
    target,
    selector,
    roleId,
    lifecycle,
  }: AccessPermissionParams): Promise<TAuthorizerMutationResult> {
    const validatedTarget = validateAddress(target, 'target')
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'removeAccessPermission',
      args: [validatedTarget, selector, roleId],
      lifecycle,
    })
    return receipt
  }

  public async createRoleAndAddAccessPermissions({
    roleName,
    adminRoleId,
    initialMembers = [],
    permissions,
    lifecycle,
  }: CreateRoleWithPermissionsParams): Promise<TAuthorizerMutationResult> {
    const validatedInitialMembers = initialMembers.map((a) => validateAddress(a, 'initialMembers'))
    const targets = permissions.map((p) => validateAddress(p.target, 'permissions.target'))
    const selectors = permissions.map((p) => p.selectors)

    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'createRoleAndAddAccessPermissions',
      args: [roleName, adminRoleId, validatedInitialMembers, targets, selectors],
      lifecycle,
    })
    return receipt
  }

  public async grantRole({
    roleId,
    account,
    lifecycle,
  }: RoleAccountParams): Promise<TAuthorizerMutationResult> {
    const targetAccount = this.resolveAccount(account)
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'grantRole',
      args: [roleId, targetAccount],
      lifecycle,
    })
    return receipt
  }

  public async revokeRole({
    roleId,
    account,
    lifecycle,
  }: RoleAccountParams): Promise<TAuthorizerMutationResult> {
    const targetAccount = this.resolveAccount(account)
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'revokeRole',
      args: [roleId, targetAccount],
      lifecycle,
    })
    return receipt
  }

  /**
   * @description Check if a caller has permission to call a specific function on a target.
   * Pure function using cached roles data (no RPC call).
   * Replicates the on-chain AUT_Roles_v2.hasPermission logic.
   */
  public hasPermission(caller: Address, target: Address, selector: Hex): boolean {
    const roles = this.roles
    if (!roles) return false

    const normalizedCaller = caller.toLowerCase()
    const normalizedTarget = target.toLowerCase()
    const normalizedSelector = selector.toLowerCase()

    // 1. Is caller a DEFAULT_ADMIN_ROLE member?
    const adminRole = roles.find((r) => r.roleId === DEFAULT_ADMIN_ROLE)
    if (adminRole?.members.some((m) => m.address.toLowerCase() === normalizedCaller)) {
      return true
    }

    // 2. For each role that has a permission matching target+selector:
    for (const role of roles) {
      const hasMatchingPermission = role.permissions.some(
        (p) =>
          p.target.toLowerCase() === normalizedTarget &&
          p.selector.toLowerCase() === normalizedSelector
      )

      if (!hasMatchingPermission) continue

      // Is it PUBLIC_ROLE?
      if (role.roleId === PUBLIC_ROLE) return true

      // Does caller have this role?
      if (role.members.some((m) => m.address.toLowerCase() === normalizedCaller)) {
        return true
      }
    }

    // 3. No permission found
    return false
  }

  public async renounceRole({
    roleId,
    account,
    lifecycle,
  }: RoleAccountParams): Promise<TAuthorizerMutationResult> {
    const targetAccount = this.resolveAccount(account)
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'renounceRole',
      args: [roleId, targetAccount],
      lifecycle,
    })
    return receipt
  }

  private requireSafeWrite(): SafeWrite {
    if (!this.safeWrite) {
      throw new Error('Wallet not connected. Please connect your wallet to continue.')
    }
    return this.safeWrite
  }

  private resolveAccount(account?: Address): Address {
    if (account) return validateAddress(account, 'account')
    const walletAddress = this.walletClient?.account?.address
    if (!walletAddress) {
      throw new Error('Wallet not connected. Please connect your wallet to continue.')
    }
    return walletAddress as Address
  }
}
