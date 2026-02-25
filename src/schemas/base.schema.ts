import { Schema } from 'effect'

export const PaginationResponse = Schema.Struct({
  currentPage: Schema.Number,
  totalPages: Schema.Number,
  totalCount: Schema.Number,
  limit: Schema.Number,
  hasNextPage: Schema.Boolean,
  hasPrevPage: Schema.Boolean,
})

export const AddressSchema = Schema.String.pipe(
  Schema.filter((s): s is `0x${string}` => /^0x[0-9a-fA-F]{40}$/.test(s), {
    description: 'Valid Ethereum address',
  })
)
