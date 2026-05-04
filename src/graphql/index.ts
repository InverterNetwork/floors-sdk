// Pure barrel: every symbol's source is a sibling file (or sub-dir with its
// own index.ts). Runtime `query` / `subscription` live in `./query.ts` so the
// barrel doesn't introduce cycles via fields/index → graphql/index → api/...

export * from './api'
export * from './client'
export * from './constants'
export type { QueryResult, SubscriptionResult } from './gen'
export * from './gen/schema'
export * from './query'
export * from './subscription-manager'
