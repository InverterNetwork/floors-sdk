import type { GraphQLQueryArgs, GraphQLQueryResult } from '../..'
import type { ExtendableQueryArgs } from '../utils'
import { cloneQuery, mergeFieldArgs } from '../utils'

// GraphQL Query Args for Authorizer Roles
export const authorizerRolesQuery = {
  Role: {
    __args: {
      order_by: [{ createdAt: 'desc' }],
      limit: 100,
    },
    id: true,
    roleId: true,
    name: true,
    adminRole: true,
    adminRoleName: true,
    isAdminBurned: true,
    authorizer_id: true,
    createdAt: true,
    lastUpdatedAt: true,
    db_write_timestamp: true,
    members: {
      __args: {
        order_by: [{ grantedAt: 'desc' }],
        limit: 100,
      },
      id: true,
      member: true,
      grantedBy: true,
      grantedAt: true,
      role_id: true,
      transactionHash: true,
      db_write_timestamp: true,
      __typename: true,
    },
    permissions: {
      __args: {
        order_by: [{ addedAt: 'desc' }],
        limit: 100,
      },
      id: true,
      role_id: true,
      target: true,
      selector: true,
      selectorName: true,
      addedAt: true,
      transactionHash: true,
      db_write_timestamp: true,
      __typename: true,
    },
    __typename: true,
  },
} satisfies GraphQLQueryArgs

export type AuthorizerRolesQueryType = typeof authorizerRolesQuery
export type AuthorizerRolesQueryResultType = GraphQLQueryResult<typeof authorizerRolesQuery>

// Type alias for GraphQL Role from result
export type TGraphQLRole = NonNullable<AuthorizerRolesQueryResultType['Role']>[0]
export type TGraphQLRoleMember = TGraphQLRole['members'][number]
export type TGraphQLRolePermission = TGraphQLRole['permissions'][number]

// UI-specific computed types (not available in GraphQL schema)
export interface TAuthorizerRoleMember {
  id: string
  address: string
  grantedBy: string
  grantedAt: Date
  transactionHash: string
}

export interface TAuthorizerRolePermission {
  id: string
  target: string
  selector: string
  selectorName: string
  addedAt: Date
  transactionHash: string
}

export interface TAuthorizerRole {
  id: string
  roleId: string
  name: string | null
  adminRole: string | null
  adminRoleName: string | null
  isAdminBurned: boolean
  authorizerId: string
  createdAt: Date
  lastUpdatedAt: Date
  members: TAuthorizerRoleMember[]
  permissions: TAuthorizerRolePermission[]
  isUserMember: boolean
}

/**
 * @description Builds an authorizer role query with optional arguments
 */
export const buildAuthorizerRolesQuery = (
  args?: ExtendableQueryArgs<AuthorizerRolesQueryType['Role']['__args']>
) => {
  const selection = cloneQuery(authorizerRolesQuery)
  return mergeFieldArgs(selection, 'Role', args)
}
