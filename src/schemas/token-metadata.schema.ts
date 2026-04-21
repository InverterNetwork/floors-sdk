import { Schema } from 'effect'

/**
 * @description ERC-7572 contract-level metadata JSON schema. `contractURI()` on ERC20Issuance_v1
 * returns a URL pointing to a JSON document in this shape. All fields except `name` are optional.
 */
export const TokenContractMetadataSchema = Schema.Struct({
  name: Schema.String,
  description: Schema.optional(Schema.String),
  image: Schema.optional(Schema.String),
  external_link: Schema.optional(Schema.String),
  social_media_urls: Schema.optional(
    Schema.Array(
      Schema.Struct({
        platform: Schema.String,
        url: Schema.String,
      })
    )
  ),
}).annotations({
  title: 'TokenContractMetadata',
  description: 'ERC-7572 contract-level metadata JSON returned by contractURI()',
})

export type TokenContractMetadata = Schema.Schema.Type<typeof TokenContractMetadataSchema>
