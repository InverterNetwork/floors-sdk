import type { Address, Hex, TransactionReceipt } from 'viem'
import { getAddress } from 'viem'

import { AUT_Roles_v2 } from './abis'
import type { TAuthorizerRole } from './graphql/api'
import type { PopPublicClient, PopWalletClient } from './types'

export type TAuthorizerMutationResult = TransactionReceipt

interface AuthorizerConstructorArgs {
  authorizerAddress: Address
  publicClient: PopPublicClient
  walletClient?: PopWalletClient
  roles?: TAuthorizerRole[]
}

interface CreateRoleParams {
  roleName: string
  adminRoleId: Hex
  initialMembers?: Address[]
}

interface LabelRoleParams {
  roleId: Hex
  newRoleName: string
}

interface TransferAdminRoleParams {
  roleId: Hex
  newAdminRoleId: Hex
}

interface AccessPermissionParams {
  target: Address
  selector: Hex // bytes4 selector
  roleId: Hex
}

interface CreateRoleWithPermissionsParams {
  roleName: string
  adminRoleId: Hex
  initialMembers?: Address[]
  permissions: {
    target: Address
    selectors: Hex[]
  }[]
}

interface RoleAccountParams {
  roleId: Hex
  account?: Address
}

/**
 * @description Authorizer helper for role + permission mutations.
 *              Uses viem clients; no React/wagmi dependency.
 */
export class Authorizer {
  private readonly address: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient
  private readonly roles?: TAuthorizerRole[]

  constructor({ authorizerAddress, publicClient, walletClient, roles }: AuthorizerConstructorArgs) {
    this.address = getAddress(authorizerAddress)
    this.publicClient = publicClient
    this.walletClient = walletClient
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
  }: CreateRoleParams): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'createRole',
      args: [roleName, adminRoleId, initialMembers],
      account: this.getWalletAddress(walletClient),
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
  }

  public async labelRole({
    roleId,
    newRoleName,
  }: LabelRoleParams): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'labelRole',
      args: [roleId, newRoleName],
      account: this.getWalletAddress(walletClient),
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
  }

  public async transferAdminRole({
    roleId,
    newAdminRoleId,
  }: TransferAdminRoleParams): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'transferAdminRole',
      args: [roleId, newAdminRoleId],
      account: this.getWalletAddress(walletClient),
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
  }

  public async burnRoleAdmin(roleId: Hex): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'burnRoleAdmin',
      args: [roleId],
      account: this.getWalletAddress(walletClient),
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
  }

  public async addAccessPermission({
    target,
    selector,
    roleId,
  }: AccessPermissionParams): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'addAccessPermission',
      args: [getAddress(target), selector, roleId],
      account: this.getWalletAddress(walletClient),
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
  }

  public async removeAccessPermission({
    target,
    selector,
    roleId,
  }: AccessPermissionParams): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'removeAccessPermission',
      args: [getAddress(target), selector, roleId],
      account: this.getWalletAddress(walletClient),
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
  }

  public async createRoleAndAddAccessPermissions({
    roleName,
    adminRoleId,
    initialMembers = [],
    permissions,
  }: CreateRoleWithPermissionsParams): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const targets = permissions.map((p) => getAddress(p.target))
    const selectors = permissions.map((p) => p.selectors)

    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'createRoleAndAddAccessPermissions',
      args: [roleName, adminRoleId, initialMembers, targets, selectors],
      account: this.getWalletAddress(walletClient),
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
  }

  public async grantRole({
    roleId,
    account,
  }: RoleAccountParams): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const targetAccount = getAddress(account ?? this.getWalletAddress(walletClient))

    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'grantRole',
      args: [roleId, targetAccount],
      account: this.getWalletAddress(walletClient),
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
  }

  public async revokeRole({
    roleId,
    account,
  }: RoleAccountParams): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const targetAccount = getAddress(account ?? this.getWalletAddress(walletClient))

    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'revokeRole',
      args: [roleId, targetAccount],
      account: this.getWalletAddress(walletClient),
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
  }

  public async renounceRole({
    roleId,
    account,
  }: RoleAccountParams): Promise<TAuthorizerMutationResult> {
    const walletClient = this.requireWalletClient()
    const targetAccount = getAddress(account ?? this.getWalletAddress(walletClient))

    const hash = await walletClient.writeContract({
      address: this.address,
      abi: AUT_Roles_v2,
      functionName: 'renounceRole',
      args: [roleId, targetAccount],
      account: targetAccount,
    })

    return this.publicClient.waitForTransactionReceipt({ hash })
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
}
