import type { Address, GetContractEventsReturnType, TransactionReceipt } from 'viem'

import { Governor_v1, InverterBeacon_v1 } from './abis'
import type { TransactionLifecycleCallbacks } from './presale'
import type { PopPublicClient, PopWalletClient } from './types'

// =============================================================================
// Types
// =============================================================================

export type GovernorRole = 'community' | 'team' | null

export interface TGovernorParams {
  lifecycle?: TransactionLifecycleCallbacks
}

export interface TBeaconAddressParams extends TGovernorParams {
  beacon: Address
}

export interface TUpgradeBeaconParams extends TGovernorParams {
  beacon: Address
  newImplementation: Address
  newMinorVersion: bigint
  newPatchVersion: bigint
}

export interface TRegisterMetadataParams extends TGovernorParams {
  metadata: {
    majorVersion: bigint
    minorVersion: bigint
    patchVersion: bigint
    url: string
    title: string
  }
  beacon: Address
}

export interface TAcceptOwnershipParams extends TGovernorParams {
  address: Address
}

export interface TSetTimelockPeriodParams extends TGovernorParams {
  period: bigint
}

export interface TSetModuleFactoryParams extends TGovernorParams {
  address: Address
}

export interface TGovernorState {
  moduleFactory: Address
  timelockPeriod: bigint
  linkedBeacons: Address[]
}

export interface TBeaconDetails {
  address: Address
  version: { major: bigint; minor: bigint; patch: bigint }
  emergencyModeActive: boolean
  implementation: Address
  owner: Address
}

export interface TBeaconTimelock {
  timelockActive: boolean
  timelockUntil: bigint
  intendedImplementation: Address
  intendedMinorVersion: bigint
  intendedPatchVersion: bigint
}

export type TGovernorEvent = GetContractEventsReturnType<typeof Governor_v1>[number]

interface GovernorConstructorArgs {
  governorAddress: Address
  publicClient: PopPublicClient
  walletClient?: PopWalletClient
}

// =============================================================================
// Governor Class
// =============================================================================

export class Governor {
  private readonly governorAddress: Address
  private readonly publicClient: PopPublicClient
  private readonly walletClient?: PopWalletClient

  constructor({ governorAddress, publicClient, walletClient }: GovernorConstructorArgs) {
    this.governorAddress = governorAddress
    this.publicClient = publicClient
    this.walletClient = walletClient
  }

  // ===========================================================================
  // Read Methods
  // ===========================================================================

  public async getGovernorState(): Promise<TGovernorState> {
    const [moduleFactory, timelockPeriod, linkedBeacons] = await Promise.all([
      this.publicClient.readContract({
        address: this.governorAddress,
        abi: Governor_v1,
        functionName: 'getModuleFactory',
      }) as Promise<Address>,
      this.publicClient.readContract({
        address: this.governorAddress,
        abi: Governor_v1,
        functionName: 'timelockPeriod',
      }) as Promise<bigint>,
      this.publicClient.readContract({
        address: this.governorAddress,
        abi: Governor_v1,
        functionName: 'getLinkedBeacons',
      }) as Promise<Address[]>,
    ])

    return { moduleFactory, timelockPeriod, linkedBeacons }
  }

  public async getBeaconDetails(beaconAddress: Address): Promise<TBeaconDetails> {
    const [version, emergencyModeActive, implementation, owner] = await Promise.all([
      this.publicClient.readContract({
        address: beaconAddress,
        abi: InverterBeacon_v1,
        functionName: 'version',
      }) as Promise<[bigint, bigint, bigint]>,
      this.publicClient.readContract({
        address: beaconAddress,
        abi: InverterBeacon_v1,
        functionName: 'emergencyModeActive',
      }) as Promise<boolean>,
      this.publicClient.readContract({
        address: beaconAddress,
        abi: InverterBeacon_v1,
        functionName: 'implementation',
      }) as Promise<Address>,
      this.publicClient.readContract({
        address: beaconAddress,
        abi: InverterBeacon_v1,
        functionName: 'owner',
      }) as Promise<Address>,
    ])

    return {
      address: beaconAddress,
      version: { major: version[0], minor: version[1], patch: version[2] },
      emergencyModeActive,
      implementation,
      owner,
    }
  }

  public async getBeaconTimelock(beaconAddress: Address): Promise<TBeaconTimelock> {
    const result = (await this.publicClient.readContract({
      address: this.governorAddress,
      abi: Governor_v1,
      functionName: 'getBeaconTimelock',
      args: [beaconAddress],
    })) as {
      timelockActive: boolean
      timelockUntil: bigint
      intendedImplementation: Address
      intendedMinorVersion: bigint
      intendedPatchVersion: bigint
    }

    return result
  }

  public async getConnectedWalletRole(address: Address): Promise<GovernorRole> {
    const [communityRole, teamRole] = await Promise.all([
      this.publicClient.readContract({
        address: this.governorAddress,
        abi: Governor_v1,
        functionName: 'COMMUNITY_MULTISIG_ROLE',
      }) as Promise<`0x${string}`>,
      this.publicClient.readContract({
        address: this.governorAddress,
        abi: Governor_v1,
        functionName: 'TEAM_MULTISIG_ROLE',
      }) as Promise<`0x${string}`>,
    ])

    const [isCommunity, isTeam] = await Promise.all([
      this.publicClient.readContract({
        address: this.governorAddress,
        abi: Governor_v1,
        functionName: 'hasRole',
        args: [communityRole, address],
      }) as Promise<boolean>,
      this.publicClient.readContract({
        address: this.governorAddress,
        abi: Governor_v1,
        functionName: 'hasRole',
        args: [teamRole, address],
      }) as Promise<boolean>,
    ])

    if (isCommunity) return 'community'
    if (isTeam) return 'team'
    return null
  }

  // ===========================================================================
  // Event Methods
  // ===========================================================================

  public async getEventHistory(fromBlock?: bigint, toBlock?: bigint): Promise<TGovernorEvent[]> {
    const events = await this.publicClient.getContractEvents({
      address: this.governorAddress,
      abi: Governor_v1,
      fromBlock: fromBlock ?? BigInt(0),
      toBlock: toBlock ?? 'latest',
    })

    return [...events].reverse()
  }

  // ===========================================================================
  // Write Methods
  // ===========================================================================

  public async setModuleFactory({
    address,
    lifecycle,
  }: TSetModuleFactoryParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'setModuleFactory',
      args: [address],
      lifecycle,
    })
  }

  public async setTimelockPeriod({
    period,
    lifecycle,
  }: TSetTimelockPeriodParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'setTimelockPeriod',
      args: [period],
      lifecycle,
    })
  }

  public async registerMetadataInModuleFactory({
    metadata,
    beacon,
    lifecycle,
  }: TRegisterMetadataParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'registerMetadataInModuleFactory',
      args: [metadata, beacon],
      lifecycle,
    })
  }

  public async registerNonModuleBeacon({
    beacon,
    lifecycle,
  }: TBeaconAddressParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'registerNonModuleBeacon',
      args: [beacon],
      lifecycle,
    })
  }

  public async upgradeBeaconWithTimelock({
    beacon,
    newImplementation,
    newMinorVersion,
    newPatchVersion,
    lifecycle,
  }: TUpgradeBeaconParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'upgradeBeaconWithTimelock',
      args: [beacon, newImplementation, newMinorVersion, newPatchVersion],
      lifecycle,
    })
  }

  public async triggerUpgradeBeaconWithTimelock({
    beacon,
    lifecycle,
  }: TBeaconAddressParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'triggerUpgradeBeaconWithTimelock',
      args: [beacon],
      lifecycle,
    })
  }

  public async cancelUpgrade({
    beacon,
    lifecycle,
  }: TBeaconAddressParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'cancelUpgrade',
      args: [beacon],
      lifecycle,
    })
  }

  public async initiateBeaconShutdown({
    beacon,
    lifecycle,
  }: TBeaconAddressParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'initiateBeaconShutdown',
      args: [beacon],
      lifecycle,
    })
  }

  public async initiateBeaconShutdownForAllLinkedBeacons(
    params?: TGovernorParams
  ): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'initiateBeaconShutdownForAllLinkedBeacons',
      args: [],
      lifecycle: params?.lifecycle,
    })
  }

  public async forceUpgradeBeaconAndRestartImplementation({
    beacon,
    newImplementation,
    newMinorVersion,
    newPatchVersion,
    lifecycle,
  }: TUpgradeBeaconParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'forceUpgradeBeaconAndRestartImplementation',
      args: [beacon, newImplementation, newMinorVersion, newPatchVersion],
      lifecycle,
    })
  }

  public async restartBeaconImplementation({
    beacon,
    lifecycle,
  }: TBeaconAddressParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'restartBeaconImplementation',
      args: [beacon],
      lifecycle,
    })
  }

  public async acceptOwnership({
    address,
    lifecycle,
  }: TAcceptOwnershipParams): Promise<TransactionReceipt> {
    return this.executeTransaction({
      functionName: 'acceptOwnership',
      args: [address],
      lifecycle,
    })
  }

  // ===========================================================================
  // Private Helpers
  // ===========================================================================

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

  private async executeTransaction({
    functionName,
    args,
    lifecycle,
  }: {
    functionName: string
    args: unknown[]
    lifecycle?: TransactionLifecycleCallbacks
  }): Promise<TransactionReceipt> {
    const walletClient = this.requireWalletClient()

    try {
      lifecycle?.onPendingWallet?.()

      const hash = await walletClient.writeContract({
        address: this.governorAddress,
        abi: Governor_v1,
        functionName,
        args,
        account: this.getWalletAddress(walletClient),
      } as Parameters<typeof walletClient.writeContract>[0])

      lifecycle?.onSubmitted?.(hash)
      lifecycle?.onPendingConfirmation?.(hash)

      const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        lifecycle?.onConfirmed?.(receipt)
      } else {
        lifecycle?.onFailed?.(new Error('Transaction reverted'))
      }

      return receipt
    } catch (error) {
      lifecycle?.onFailed?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }
}
