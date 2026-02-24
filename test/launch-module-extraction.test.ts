import { describe, expect, it } from 'bun:test'
import { type Address,encodeAbiParameters, encodeEventTopics, parseAbiParameters } from 'viem'

import { ModuleFactory_v1 } from '../src/abis'
import { extractModuleAddressesFromLogs } from '../src/client/hooks/launch'

const METADATA_PARAM = parseAbiParameters(
  '(uint256 majorVersion,uint256 minorVersion,uint256 patchVersion,string url,string title)'
)

function moduleCreatedLog({
  floor,
  module,
  title,
}: {
  floor: Address
  module: Address
  title: string
}) {
  const metadata = {
    majorVersion: 1n,
    minorVersion: 0n,
    patchVersion: 0n,
    url: 'https://github.com/InverterNetwork/floors-sc',
    title,
  }

  return {
    topics: encodeEventTopics({
      abi: ModuleFactory_v1,
      eventName: 'ModuleCreated',
      args: {
        floor_: floor,
        module_: module,
      },
    }),
    data: encodeAbiParameters(METADATA_PARAM, [metadata]),
  }
}

describe('#extractModuleAddressesFromLogs', () => {
  const floor = '0x1111111111111111111111111111111111111111' as Address
  const credit = '0x2222222222222222222222222222222222222222' as Address
  const presale = '0x3333333333333333333333333333333333333333' as Address
  const staking = '0x4444444444444444444444444444444444444444' as Address

  it('extracts requested module addresses by metadata title', () => {
    const logs = [
      moduleCreatedLog({ floor, module: credit, title: 'CreditFacility_v1' }),
      moduleCreatedLog({ floor, module: presale, title: 'Presale_v1' }),
      moduleCreatedLog({ floor, module: staking, title: 'StakingManager_v1' }),
    ]

    const extracted = extractModuleAddressesFromLogs(logs, {
      needsCreditFacility: true,
      needsPresale: true,
      needsStaking: true,
    })

    expect(extracted.creditFacilityAddress).toBe(credit)
    expect(extracted.presaleAddress).toBe(presale)
    expect(extracted.stakingManagerAddress).toBe(staking)
  })

  it('ignores unrelated module logs when specific modules are requested', () => {
    const logs = [moduleCreatedLog({ floor, module: credit, title: 'AaveStrategy_v1' })]

    const extracted = extractModuleAddressesFromLogs(logs, {
      needsStaking: true,
    })

    expect(extracted.stakingManagerAddress).toBeUndefined()
    expect(extracted.creditFacilityAddress).toBeUndefined()
    expect(extracted.presaleAddress).toBeUndefined()
  })
})
