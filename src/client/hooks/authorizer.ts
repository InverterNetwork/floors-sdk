import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import type { Address, Hex } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import { Authorizer, type TAuthorizerMutationResult } from '../../authorizer'
import { fetchAuthorizerRolesById, type TAuthorizerRole } from '../../graphql/api'
import { authorizerRolesQueryKey } from '../query-keys'

// Re-export param types for consumers
export interface CreateRoleParams {
  roleName: string
  adminRoleId: Hex
  initialMembers?: Address[]
}

export interface LabelRoleParams {
  roleId: Hex
  newRoleName: string
}

export interface TransferAdminRoleParams {
  roleId: Hex
  newAdminRoleId: Hex
}

export interface AccessPermissionParams {
  target: Address
  selector: Hex
  roleId: Hex
}

export interface CreateRoleWithPermissionsParams {
  roleName: string
  adminRoleId: Hex
  initialMembers?: Address[]
  permissions: {
    target: Address
    selectors: Hex[]
  }[]
}

export interface RoleAccountParams {
  roleId: Hex
  account?: Address
}

export type UseAuthorizerRolesQueryOptions<TData = TAuthorizerRole[]> = Omit<
  UseQueryOptions<TAuthorizerRole[], Error, TData, ReturnType<typeof authorizerRolesQueryKey>>,
  'queryKey' | 'queryFn'
>

type UseAuthorizerMutationsReturnType = {
  createRole: UseMutationResult<TAuthorizerMutationResult, Error, CreateRoleParams>
  labelRole: UseMutationResult<TAuthorizerMutationResult, Error, LabelRoleParams>
  transferAdminRole: UseMutationResult<TAuthorizerMutationResult, Error, TransferAdminRoleParams>
  burnRoleAdmin: UseMutationResult<TAuthorizerMutationResult, Error, Hex>
  addAccessPermission: UseMutationResult<TAuthorizerMutationResult, Error, AccessPermissionParams>
  removeAccessPermission: UseMutationResult<
    TAuthorizerMutationResult,
    Error,
    AccessPermissionParams
  >
  createRoleAndAddAccessPermissions: UseMutationResult<
    TAuthorizerMutationResult,
    Error,
    CreateRoleWithPermissionsParams
  >
  grantRole: UseMutationResult<TAuthorizerMutationResult, Error, RoleAccountParams>
  revokeRole: UseMutationResult<TAuthorizerMutationResult, Error, RoleAccountParams>
  renounceRole: UseMutationResult<TAuthorizerMutationResult, Error, RoleAccountParams>
}

/**
 * @description Fetches and caches authorizer roles by authorizer ID.
 * @param authorizerId - The target authorizer contract address.
 * @param userAddress - Optional user address to compute membership flag.
 */
export const useAuthorizerRolesQuery = <TData = TAuthorizerRole[]>(
  authorizerId: string | null | undefined,
  userAddress?: string | null,
  options?: UseAuthorizerRolesQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(authorizerId)
  const staleTime = options?.staleTime ?? 30_000

  return useQuery({
    queryKey: authorizerRolesQueryKey(authorizerId, userAddress),
    queryFn: () => fetchAuthorizerRolesById(authorizerId!, userAddress ?? undefined),
    ...options,
    enabled,
    staleTime,
  })
}

/**
 * @description Provides role/permission mutations backed by the Authorizer class.
 * @param authorizerId - The authorizer contract address to interact with.
 */
export const useAuthorizerMutations = (
  authorizerId: string | null | undefined
): UseAuthorizerMutationsReturnType => {
  const queryClient = useQueryClient()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const walletAddress = walletClient?.account?.address as Address | undefined

  const authorizerClient = useMemo(() => {
    if (!authorizerId || !publicClient) return null
    return new Authorizer({
      authorizerAddress: authorizerId as Address,
      publicClient,
      walletClient: walletClient ?? undefined,
    })
  }, [authorizerId, publicClient, walletClient])

  const ensureAuthorizer = useCallback(() => {
    if (!authorizerClient) {
      throw new Error('Authorizer client unavailable. Provide a valid authorizer address.')
    }
    return authorizerClient
  }, [authorizerClient])

  const invalidateRolesQueries = useCallback(async () => {
    if (authorizerId) {
      await queryClient.invalidateQueries({
        queryKey: authorizerRolesQueryKey(authorizerId, walletAddress),
      })
    }
  }, [queryClient, authorizerId, walletAddress])

  const createRole = useMutation({
    mutationFn: (params: CreateRoleParams) => ensureAuthorizer().createRole(params),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  const labelRole = useMutation({
    mutationFn: (params: LabelRoleParams) => ensureAuthorizer().labelRole(params),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  const transferAdminRole = useMutation({
    mutationFn: (params: TransferAdminRoleParams) => ensureAuthorizer().transferAdminRole(params),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  const burnRoleAdmin = useMutation({
    mutationFn: (roleId: Hex) => ensureAuthorizer().burnRoleAdmin(roleId),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  const addAccessPermission = useMutation({
    mutationFn: (params: AccessPermissionParams) => ensureAuthorizer().addAccessPermission(params),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  const removeAccessPermission = useMutation({
    mutationFn: (params: AccessPermissionParams) =>
      ensureAuthorizer().removeAccessPermission(params),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  const createRoleAndAddAccessPermissions = useMutation({
    mutationFn: (params: CreateRoleWithPermissionsParams) =>
      ensureAuthorizer().createRoleAndAddAccessPermissions(params),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  const grantRole = useMutation({
    mutationFn: (params: RoleAccountParams) => ensureAuthorizer().grantRole(params),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  const revokeRole = useMutation({
    mutationFn: (params: RoleAccountParams) => ensureAuthorizer().revokeRole(params),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  const renounceRole = useMutation({
    mutationFn: (params: RoleAccountParams) => ensureAuthorizer().renounceRole(params),
    onSuccess: async () => {
      await invalidateRolesQueries()
    },
  })

  return {
    createRole,
    labelRole,
    transferAdminRole,
    burnRoleAdmin,
    addAccessPermission,
    removeAccessPermission,
    createRoleAndAddAccessPermissions,
    grantRole,
    revokeRole,
    renounceRole,
  }
}
