/**
 * @description FactoryAdmin class for managing deployer allowlists on FloorFactory_v1 and ModuleFactory_v1.
 * Both factories expose the same allowlist surface (introduced in testnet phase 1 fixes):
 *   - `setAllowedDeployer(deployer, allowed)` toggles per-address permission
 *   - `setOpenDeployment(open)` flips the global gate; when true, anyone can deploy
 *   - `isAllowedDeployer(deployer)` / `isOpenDeployment()` readers
 *
 * Events (prefixed per-factory): `<FactoryName>__DeployerSet`, `<FactoryName>__OpenDeploymentSet`.
 */

import type { Address, TransactionReceipt } from 'viem'

import { FloorFactory_v1, ModuleFactory_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'
import { SafeWrite } from './utils/safe-write'
import { validateAddress } from './utils/validation'

export type FactoryKind = 'floor' | 'module'

export interface TFactoryAdminParams {
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TSetAllowedDeployerParams extends TFactoryAdminParams {
  deployer: Address
  allowed: boolean
}

export interface TSetOpenDeploymentParams extends TFactoryAdminParams {
  open: boolean
}

export interface TFactoryAdminState {
  openDeployment: boolean
}

interface FactoryAdminConstructorArgs {
  address: Address
  kind: FactoryKind
  publicClient: PopPublicClient
  walletClient?: PopWalletClient
}

export class FactoryAdmin {
  private readonly address: Address
  private readonly kind: FactoryKind
  private readonly publicClient: PopPublicClient
  private readonly safeWrite?: SafeWrite

  constructor({ address, kind, publicClient, walletClient }: FactoryAdminConstructorArgs) {
    this.address = address
    this.kind = kind
    this.publicClient = publicClient
    this.safeWrite = walletClient ? new SafeWrite({ publicClient, walletClient }) : undefined
  }

  private get abi() {
    return this.kind === 'floor' ? FloorFactory_v1 : ModuleFactory_v1
  }

  private requireSafeWrite(): SafeWrite {
    if (!this.safeWrite) throw new Error('Wallet not connected')
    return this.safeWrite
  }

  public async isAllowedDeployer(deployer: Address): Promise<boolean> {
    validateAddress(deployer, 'deployer')
    return (await this.publicClient.readContract({
      address: this.address,
      abi: this.abi,
      functionName: 'isAllowedDeployer',
      args: [deployer],
    })) as boolean
  }

  public async isOpenDeployment(): Promise<boolean> {
    return (await this.publicClient.readContract({
      address: this.address,
      abi: this.abi,
      functionName: 'isOpenDeployment',
    })) as boolean
  }

  public async getState(): Promise<TFactoryAdminState> {
    const openDeployment = await this.isOpenDeployment()
    return { openDeployment }
  }

  public async setAllowedDeployer({
    deployer,
    allowed,
    lifecycle,
  }: TSetAllowedDeployerParams): Promise<TransactionReceipt> {
    validateAddress(deployer, 'deployer')
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: this.abi,
      functionName: 'setAllowedDeployer',
      args: [deployer, allowed],
      lifecycle,
    })
    return receipt
  }

  public async setOpenDeployment({
    open,
    lifecycle,
  }: TSetOpenDeploymentParams): Promise<TransactionReceipt> {
    const { receipt } = await this.requireSafeWrite().write({
      address: this.address,
      abi: this.abi,
      functionName: 'setOpenDeployment',
      args: [open],
      lifecycle,
    })
    return receipt
  }
}
