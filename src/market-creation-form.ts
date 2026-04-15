/**
 * Market creation UI helpers (web app + CLI): segment WAD constant and step props.
 * Schemas and decoded types live in {@link ./schemas/launch.schema}.
 */

import type { Address } from 'viem'

import type {
  ConfigurationFormData,
  CreditFacilityFormData,
  MarketCreationFormData,
  PresaleExtendedFormData,
  StakingExtendedFormData,
} from './schemas/launch.schema'

export const SEGMENT_PRICE_WAD_DECIMALS = 18 as const

export type IssuanceTokenMode = 'existing' | 'create'

export type NewTokenConfig = MarketCreationFormData['issuanceToken']['newToken']

export type IssuanceTokenConfig = MarketCreationFormData['issuanceToken']

export type PresaleFormConfig = PresaleExtendedFormData

export type CreditFacilityFormConfig = CreditFacilityFormData

export type StakingFormConfig = StakingExtendedFormData

export type MarketConfigurationOptions = ConfigurationFormData

export type StepProps = {
  formData: MarketCreationFormData
  updateFormData: (
    updates:
      | Partial<MarketCreationFormData>
      | ((prev: MarketCreationFormData) => Partial<MarketCreationFormData>)
  ) => void
}

/** Params for creating a market from {@link MarketCreationFormData} (app + CLI). */
export type CreateMarketParams = {
  formData: MarketCreationFormData
  floorFactoryAddress: Address
  creatorAddress: Address
}
