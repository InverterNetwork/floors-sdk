import { Client } from './client'
import type { query_rootGenqlSelection, QueryResult, subscription_rootGenqlSelection } from './gen'
import { generateQueryOp } from './gen'
import { SubscriptionManager } from './subscription-manager'

export type GraphQLQueryArgs = query_rootGenqlSelection & { __name?: string }
export type GraphQLQueryResult<T extends GraphQLQueryArgs> = QueryResult<T>

export const query = async <T extends GraphQLQueryArgs>(
  fields: T
): Promise<GraphQLQueryResult<T>> => {
  const { query: queryString, variables } = generateQueryOp(fields)

  const client = Client.get()

  const result = await client.query(queryString, variables)

  // Log errors for debugging
  if (result.error) {
    console.error('[GraphQL Query Error]', {
      message: result.error.message,
      graphQLErrors: result.error.graphQLErrors,
      networkError: result.error.networkError,
    })
    throw new Error(result.error.message || 'GraphQL query failed')
  }

  if (!result.data) {
    console.warn('[GraphQL Query Warning] No data returned', { query: queryString })
  }

  return result.data
}

export type GraphQLSubscriptionArgs = subscription_rootGenqlSelection & {
  __name?: string
}
export type GraphQLSubscriptionResult<T extends GraphQLSubscriptionArgs> = SubscriptionManager<T>

export const subscription = <T extends GraphQLSubscriptionArgs>(
  fields: T
): GraphQLSubscriptionResult<T> => {
  const subscriptionManager = SubscriptionManager.getInstance(fields)

  return subscriptionManager
}

export * from './api'
export * from './constants'
export type { QueryResult, SubscriptionResult } from './gen'
export * from './gen/schema'
export { Client }
