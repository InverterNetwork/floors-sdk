import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import type { Address } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import {
  buildPresaleClaimSubscription,
  buildPresaleParticipationSubscription,
  fetchPresaleById,
  fetchPresales,
  fetchPresalesByMarket,
  type TPresale,
} from '../../graphql/api'
import {
  Presale,
  PresaleState,
  type TAddToWhitelistWithProofParams,
  type TEnablePublicBorrowingParams,
  type TEnablePublicTradingParams,
  type TGetTransitionStatusParams,
  type TGoLiveParams,
  type TPresaleApproveParams,
  type TPresaleBuyParams,
  type TPresaleBuyWithLeverageParams,
  type TPresaleClaimParams,
  type TPresaleMutationResult,
  type TPresalePositionWithState,
  type TPresaleTransitionStatus,
  type TSetCapsParams,
  type TSetCreditFacilityParams,
  type TSetDecayDurationParams,
  type TSetEndTimestampParams,
  type TSetInitialMultiplierParams,
  type TSetLiveFeesParams,
  type TSetMerkleRootParams,
  type TSetPresaleStateParams,
  type TSetStartTimeParams,
} from '../../presale'
import { useFloors } from '../floors-context'
import {
  presaleClaimsSubKey,
  presaleParticipationsSubKey,
  presaleQueryKey,
  presalesQueryKey,
} from '../query-keys'
import { dedupeByTxHash, useGraphQLQuery, useSubscription } from './subscriptions'

export type UsePresalesQueryOptions<TData = TPresale[]> = Omit<
  UseQueryOptions<TPresale[], Error, TData, typeof presalesQueryKey>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches and caches all presales.
 */
export const usePresalesQuery = <TData = TPresale[]>(
  options?: UsePresalesQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const staleTime = options?.staleTime ?? 60_000
  const gcTime = options?.gcTime ?? 5 * 60_000

  return useQuery({
    queryKey: presalesQueryKey,
    queryFn: fetchPresales,
    ...options,
    staleTime,
    gcTime,
  })
}

export type UsePresaleQueryOptions<TData = TPresale | null> = Omit<
  UseQueryOptions<TPresale | null, Error, TData, ReturnType<typeof presaleQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches and caches a single presale by ID.
 * @param {string | null | undefined} presaleId - The target presale identifier.
 */
export const usePresaleQuery = <TData = TPresale | null>(
  presaleId: string | null | undefined,
  options?: UsePresaleQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(presaleId)
  const staleTime = options?.staleTime ?? 30_000

  return useQuery({
    queryKey: presaleQueryKey(presaleId),
    queryFn: () => fetchPresaleById(presaleId!),
    ...options,
    enabled,
    staleTime,
  })
}

const presalesByMarketQueryKey = (marketId: string) => ['presales', 'market', marketId] as const

export type UsePresalesByMarketQueryOptions<TData = TPresale[]> = Omit<
  UseQueryOptions<TPresale[], Error, TData, ReturnType<typeof presalesByMarketQueryKey>>,
  'queryKey' | 'queryFn'
>

/**
 * @description Fetches and caches presales scoped to a market.
 * @param {string | null | undefined} marketId - The target market identifier.
 */
export const usePresalesByMarketQuery = <TData = TPresale[]>(
  marketId: string | null | undefined,
  options?: UsePresalesByMarketQueryOptions<TData>
): UseQueryResult<TData, Error> => {
  const enabled = options?.enabled ?? Boolean(marketId)
  const staleTime = options?.staleTime ?? 30_000

  return useQuery({
    queryKey: presalesByMarketQueryKey(marketId || ''),
    queryFn: () => fetchPresalesByMarket(marketId!),
    ...options,
    enabled,
    staleTime,
  })
}

export type UsePresalePositionsQueryOptions = Omit<
  UseQueryOptions<TPresalePositionWithState[], Error>,
  'queryKey' | 'queryFn'
>

export const usePresalePositionsQuery = (
  ownerAddress: Address | undefined,
  options?: UsePresalePositionsQueryOptions
): UseQueryResult<TPresalePositionWithState[], Error> => {
  const { presale } = useFloors()
  const publicClient = usePublicClient()

  const presaleClient = useMemo(() => {
    if (!presale.data || !publicClient) return null
    return new Presale({ data: presale.data, publicClient })
  }, [presale.data, publicClient])

  const enabled = options?.enabled ?? Boolean(presaleClient && ownerAddress)

  return useQuery({
    queryKey: ['presale', presale.data?.id, 'positions', ownerAddress] as const,
    queryFn: async () => {
      if (!presaleClient || !ownerAddress) return []
      return presaleClient.getPositionsWithState(ownerAddress)
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    ...options,
    enabled,
  })
}

/** Multiplier state returned from getMultiplierState */
export type TMultiplierState = {
  startTime: bigint
  decayDuration: bigint
  initialMultiplier: bigint
  currentMultiplier: bigint
  isActive: boolean
  isEnded: boolean
}

export type UsePresaleMutationsReturnType = {
  buyPresale: UseMutationResult<TPresaleMutationResult, Error, TPresaleBuyParams>
  buyPresaleWithLeverage: UseMutationResult<
    TPresaleMutationResult,
    Error,
    TPresaleBuyWithLeverageParams
  >
  claimAll: UseMutationResult<TPresaleMutationResult, Error, TPresaleClaimParams>
  approvePurchaseToken: UseMutationResult<TPresaleMutationResult, Error, TPresaleApproveParams>
  getPurchaseTokenAllowance: UseMutationResult<bigint, Error, Address | undefined>
  getPurchaseTokenBalance: UseMutationResult<bigint, Error, Address | undefined>
  getPresaleState: UseMutationResult<number, Error, void>
  isWhitelisted: UseMutationResult<boolean, Error, Address | undefined>
  getIssuanceBy: UseMutationResult<bigint, Error, Address | undefined>
  getPositionsByOwner: UseMutationResult<bigint[], Error, Address | undefined>
  getPosition: UseMutationResult<any, Error, bigint>
  getPositionState: UseMutationResult<any, Error, bigint>
  getBaseCommissionBps: UseMutationResult<bigint[], Error, void>
  getPriceBreakpoints: UseMutationResult<bigint[][], Error, void>
  // Multiplier/Fee Decay queries
  getMultiplier: UseMutationResult<bigint, Error, void>
  getInitialMultiplier: UseMutationResult<bigint, Error, void>
  getDecayDuration: UseMutationResult<bigint, Error, void>
  getStartTime: UseMutationResult<bigint, Error, void>
  getEndTimestamp: UseMutationResult<bigint, Error, void>
  isDecayActive: UseMutationResult<boolean, Error, void>
  isDecayEnded: UseMutationResult<boolean, Error, void>
  getMultiplierState: UseMutationResult<TMultiplierState, Error, void>
  getUserTotalTokens: UseMutationResult<
    { totalTokens: bigint; claimedTokens: bigint; lockedTokens: bigint },
    Error,
    Address | undefined
  >
}

/**
 * @description Provides presale buy/claim/approve mutations and read queries backed by the pure Presale class.
 */
export const usePresaleMutations = (): UsePresaleMutationsReturnType => {
  const floorsContext = useFloors()
  const resolvedPresale = floorsContext.presale.data ?? null
  const {
    refetch: { presale: refetchPresale },
  } = floorsContext
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const walletAddress = walletClient?.account?.address as Address | undefined

  const presaleClient = useMemo(() => {
    if (!resolvedPresale || !publicClient) return null
    return new Presale({
      data: resolvedPresale,
      publicClient,
      walletClient: walletClient ?? undefined,
    })
  }, [resolvedPresale, publicClient, walletClient])

  const ensurePresale = useCallback(() => {
    if (!presaleClient)
      throw new Error(
        'Presale client unavailable. Wait for FloorsProvider presale query to resolve.'
      )

    return presaleClient
  }, [presaleClient])

  const ensureWalletAddress = useCallback(
    (override?: Address) => {
      const targetAddress = override ?? walletAddress
      if (!targetAddress)
        throw new Error('Wallet not connected. Please connect your wallet to continue.')

      return targetAddress
    },
    [walletAddress]
  )

  const refetchAfterMutation = useCallback(async () => {
    await Promise.allSettled([refetchPresale()])
  }, [refetchPresale])

  // Write mutations
  const buyPresale = useMutation({
    mutationFn: (params: TPresaleBuyParams) => ensurePresale().buyPresale(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const buyPresaleWithLeverage = useMutation({
    mutationFn: (params: TPresaleBuyWithLeverageParams) =>
      ensurePresale().buyPresaleWithLeverage(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const claimAll = useMutation({
    mutationFn: (params: TPresaleClaimParams) => ensurePresale().claimAll(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const approvePurchaseToken = useMutation({
    mutationFn: (params: TPresaleApproveParams) => ensurePresale().approvePurchaseToken(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  // Read queries (using mutations for consistency with Market pattern)
  const getPurchaseTokenAllowance = useMutation({
    mutationFn: async (owner?: Address) =>
      ensurePresale().getPurchaseTokenAllowance(ensureWalletAddress(owner)),
  })

  const getPurchaseTokenBalance = useMutation({
    mutationFn: async (owner?: Address) =>
      ensurePresale().getPurchaseTokenBalance(ensureWalletAddress(owner)),
  })

  const getPresaleState = useMutation({
    mutationFn: async () => ensurePresale().getPresaleState(),
  })

  const isWhitelisted = useMutation({
    mutationFn: async (userAddress?: Address) =>
      ensurePresale().isMerkleWhitelisted(ensureWalletAddress(userAddress)),
  })

  const getIssuanceBy = useMutation({
    mutationFn: async (userAddress?: Address) =>
      ensurePresale().getIssuanceBy(ensureWalletAddress(userAddress)),
  })

  const getPositionsByOwner = useMutation({
    mutationFn: async (ownerAddress?: Address) =>
      ensurePresale().getPositionsByOwner(ensureWalletAddress(ownerAddress)),
  })

  const getPosition = useMutation({
    mutationFn: async (positionId: bigint) => ensurePresale().getPosition(positionId),
  })

  const getPositionState = useMutation({
    mutationFn: async (positionId: bigint) => ensurePresale().getPositionState(positionId),
  })

  const getBaseCommissionBps = useMutation({
    mutationFn: async () => ensurePresale().getBaseCommissionBps(),
  })

  const getPriceBreakpoints = useMutation({
    mutationFn: async () => ensurePresale().getPriceBreakpoints(),
  })

  // Multiplier/Fee Decay queries
  const getMultiplier = useMutation({
    mutationFn: async () => ensurePresale().getMultiplier(),
  })

  const getInitialMultiplier = useMutation({
    mutationFn: async () => ensurePresale().getInitialMultiplier(),
  })

  const getDecayDuration = useMutation({
    mutationFn: async () => ensurePresale().getDecayDuration(),
  })

  const getStartTime = useMutation({
    mutationFn: async () => ensurePresale().getStartTime(),
  })

  const getEndTimestamp = useMutation({
    mutationFn: async () => ensurePresale().getEndTimestamp(),
  })

  const isDecayActive = useMutation({
    mutationFn: async () => ensurePresale().isDecayActive(),
  })

  const isDecayEnded = useMutation({
    mutationFn: async () => ensurePresale().isDecayEnded(),
  })

  const getMultiplierState = useMutation({
    mutationFn: async () => ensurePresale().getMultiplierState(),
  })

  const getUserTotalTokens = useMutation({
    mutationFn: async (userAddress?: Address) =>
      ensurePresale().getUserTotalTokens(ensureWalletAddress(userAddress)),
  })

  return {
    buyPresale,
    buyPresaleWithLeverage,
    claimAll,
    approvePurchaseToken,
    getPurchaseTokenAllowance,
    getPurchaseTokenBalance,
    getPresaleState,
    isWhitelisted,
    getIssuanceBy,
    getPositionsByOwner,
    getPosition,
    getPositionState,
    getBaseCommissionBps,
    getPriceBreakpoints,
    // Multiplier/Fee Decay
    getMultiplier,
    getInitialMultiplier,
    getDecayDuration,
    getStartTime,
    getEndTimestamp,
    isDecayActive,
    isDecayEnded,
    getMultiplierState,
    getUserTotalTokens,
  }
}

// ============================================================================
// Presale Data Hooks (Unified Query + Subscription)
// ============================================================================

/**
 * @description Data type for presale participation
 */
export type TPresaleParticipationData = {
  id: string
  user_id: string
  presale_id: string
  positionId: string | null
  depositAmountRaw: string
  depositAmountFormatted: string
  mintedAmountRaw: string | null
  mintedAmountFormatted: string | null
  loopCount: string | null
  leverage: string
  timestamp: string
  transactionHash: string
}

export type UsePresaleParticipationsParams = {
  presaleId: string | null | undefined
  type?: 'query' | 'subscription'
  enabled?: boolean
  limit?: number
}

export type UsePresaleParticipationsResult = {
  key: ReturnType<typeof presaleParticipationsSubKey>
  participations: TPresaleParticipationData[]
  error: string | null
  isLoading: boolean
  type: 'query' | 'subscription'
}

/**
 * @description Unified hook for presale participations - supports both query and subscription
 * @example
 * ```tsx
 * const { participations } = usePresaleParticipations({
 *   presaleId,
 *   type: 'subscription',
 * })
 * ```
 */
export const usePresaleParticipations = ({
  presaleId,
  type = 'subscription',
  enabled = true,
  limit = 100,
}: UsePresaleParticipationsParams): UsePresaleParticipationsResult => {
  const isEnabled = enabled && Boolean(presaleId)
  const key = presaleParticipationsSubKey(presaleId)

  const fields = useMemo(
    () => (isEnabled && presaleId ? buildPresaleParticipationSubscription(presaleId, limit) : null),
    [isEnabled, presaleId, limit]
  )

  // Query mode
  const queryResult = useGraphQLQuery({
    fields: fields ?? ({} as NonNullable<typeof fields>),
    queryKey: key,
    enabled: type === 'query' && isEnabled && fields !== null,
  })

  // Subscription mode
  const subResult = useSubscription({
    fields: fields ?? ({} as NonNullable<typeof fields>),
    enabled: type === 'subscription' && isEnabled && fields !== null,
  })

  const result = type === 'query' ? queryResult : subResult

  const participations = useMemo(() => {
    const raw = result.data?.PresaleParticipation
    if (!raw) return []
    return dedupeByTxHash(raw as TPresaleParticipationData[])
  }, [result.data])

  return {
    key,
    participations,
    error: result.error,
    isLoading: result.isLoading,
    type,
  }
}

/**
 * @description Data type for presale claim
 */
export type TPresaleClaimData = {
  id: string
  presale_id: string
  positionId: string | null
  claimType: string
  amountRaw: string
  amountFormatted: string
  trancheIndex: string | null
  loanId: string | null
  timestamp: string
  transactionHash: string
}

export type UsePresaleClaimsParams = {
  presaleId: string | null | undefined
  type?: 'query' | 'subscription'
  enabled?: boolean
  limit?: number
}

export type UsePresaleClaimsResult = {
  key: ReturnType<typeof presaleClaimsSubKey>
  claims: TPresaleClaimData[]
  error: string | null
  isLoading: boolean
  type: 'query' | 'subscription'
}

/**
 * @description Unified hook for presale claims - supports both query and subscription
 * @example
 * ```tsx
 * const { claims } = usePresaleClaims({
 *   presaleId,
 *   type: 'subscription',
 * })
 * ```
 */
export const usePresaleClaims = ({
  presaleId,
  type = 'subscription',
  enabled = true,
  limit = 100,
}: UsePresaleClaimsParams): UsePresaleClaimsResult => {
  const isEnabled = enabled && Boolean(presaleId)
  const key = presaleClaimsSubKey(presaleId)

  const fields = useMemo(
    () => (isEnabled && presaleId ? buildPresaleClaimSubscription(presaleId, limit) : null),
    [isEnabled, presaleId, limit]
  )

  // Query mode
  const queryResult = useGraphQLQuery({
    fields: fields ?? ({} as NonNullable<typeof fields>),
    queryKey: key,
    enabled: type === 'query' && isEnabled && fields !== null,
  })

  // Subscription mode
  const subResult = useSubscription({
    fields: fields ?? ({} as NonNullable<typeof fields>),
    enabled: type === 'subscription' && isEnabled && fields !== null,
  })

  const result = type === 'query' ? queryResult : subResult

  const claims = useMemo(() => {
    const raw = result.data?.PresaleClaim
    if (!raw) return []
    return dedupeByTxHash(raw as TPresaleClaimData[])
  }, [result.data])

  return {
    key,
    claims,
    error: result.error,
    isLoading: result.isLoading,
    type,
  }
}

// ============================================================================
// Presale Admin Hooks
// ============================================================================

export type UsePresaleAdminReturnType = {
  /** Set presale state (NotOpen, Whitelist, Public, Closed) */
  setPresaleState: UseMutationResult<TPresaleMutationResult, Error, TSetPresaleStateParams>
  /** Set global and per-address issuance caps */
  setCaps: UseMutationResult<TPresaleMutationResult, Error, TSetCapsParams>
  /** Set presale end timestamp */
  setEndTimestamp: UseMutationResult<TPresaleMutationResult, Error, TSetEndTimestampParams>
  /** Set Merkle root for whitelist verification */
  setMerkleRoot: UseMutationResult<TPresaleMutationResult, Error, TSetMerkleRootParams>
  /** Self-register to whitelist using a Merkle proof */
  addToWhitelistWithProof: UseMutationResult<
    TPresaleMutationResult,
    Error,
    TAddToWhitelistWithProofParams
  >
  /** Set credit facility address */
  setCreditFacility: UseMutationResult<TPresaleMutationResult, Error, TSetCreditFacilityParams>
  /** Set initial fee multiplier */
  setInitialMultiplier: UseMutationResult<
    TPresaleMutationResult,
    Error,
    TSetInitialMultiplierParams
  >
  /** Set decay duration */
  setDecayDuration: UseMutationResult<TPresaleMutationResult, Error, TSetDecayDurationParams>
  /** Set decay start time */
  setStartTime: UseMutationResult<TPresaleMutationResult, Error, TSetStartTimeParams>
  /** Whether any admin operation is pending */
  isPending: boolean
}

/**
 * @description Hook for presale admin operations
 * Provides mutations for managing presale state, caps, and whitelist
 *
 * @example
 * ```tsx
 * const { setPresaleState, setCaps, setMerkleRoot, isPending } = usePresaleAdmin()
 *
 * // Close the presale
 * await setPresaleState.mutateAsync({ state: PresaleState.Closed })
 *
 * // Set caps
 * await setCaps.mutateAsync({ globalCap: 1000000n, perAddressCap: 10000n })
 * ```
 */
export const usePresaleAdmin = (): UsePresaleAdminReturnType => {
  const floorsContext = useFloors()
  const resolvedPresale = floorsContext.presale.data ?? null
  const {
    refetch: { presale: refetchPresale },
  } = floorsContext
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const presaleClient = useMemo(() => {
    if (!resolvedPresale || !publicClient) return null
    return new Presale({
      data: resolvedPresale,
      publicClient,
      walletClient: walletClient ?? undefined,
    })
  }, [resolvedPresale, publicClient, walletClient])

  const ensurePresale = useCallback(() => {
    if (!presaleClient)
      throw new Error(
        'Presale client unavailable. Wait for FloorsProvider presale query to resolve.'
      )
    return presaleClient
  }, [presaleClient])

  const refetchAfterMutation = useCallback(async () => {
    await Promise.allSettled([refetchPresale()])
  }, [refetchPresale])

  const setPresaleState = useMutation({
    mutationFn: (params: TSetPresaleStateParams) => ensurePresale().setPresaleState(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const setCaps = useMutation({
    mutationFn: (params: TSetCapsParams) => ensurePresale().setCaps(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const setEndTimestamp = useMutation({
    mutationFn: (params: TSetEndTimestampParams) => ensurePresale().setEndTimestamp(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const setMerkleRoot = useMutation({
    mutationFn: (params: TSetMerkleRootParams) => ensurePresale().setMerkleRoot(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const addToWhitelistWithProof = useMutation({
    mutationFn: (params: TAddToWhitelistWithProofParams) =>
      ensurePresale().addToWhitelistWithProof(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const setCreditFacility = useMutation({
    mutationFn: (params: TSetCreditFacilityParams) => ensurePresale().setCreditFacility(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const setInitialMultiplier = useMutation({
    mutationFn: (params: TSetInitialMultiplierParams) =>
      ensurePresale().setInitialMultiplier(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const setDecayDuration = useMutation({
    mutationFn: (params: TSetDecayDurationParams) => ensurePresale().setDecayDuration(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const setStartTime = useMutation({
    mutationFn: (params: TSetStartTimeParams) => ensurePresale().setStartTime(params),
    onSuccess: async () => {
      await refetchAfterMutation()
    },
  })

  const isPending =
    setPresaleState.isPending ||
    setCaps.isPending ||
    setEndTimestamp.isPending ||
    setMerkleRoot.isPending ||
    addToWhitelistWithProof.isPending ||
    setCreditFacility.isPending ||
    setInitialMultiplier.isPending ||
    setDecayDuration.isPending ||
    setStartTime.isPending

  return {
    setPresaleState,
    setCaps,
    setEndTimestamp,
    setMerkleRoot,
    addToWhitelistWithProof,
    setCreditFacility,
    setInitialMultiplier,
    setDecayDuration,
    setStartTime,
    isPending,
  }
}

// ============================================================================
// Presale Transition Hooks
// ============================================================================

/** Query key for transition status */
const presaleTransitionStatusKey = (presaleId: string | null | undefined) =>
  ['presale', presaleId, 'transitionStatus'] as const

export type UsePresaleTransitionParams = {
  /** Floor/Market contract address */
  floorAddress?: Address
  /** Authorizer contract address */
  authorizerAddress?: Address
  /** Credit facility contract address (optional) */
  creditFacilityAddress?: Address
  /** Transaction forwarder address (required for transition mutations) */
  transactionForwarderAddress?: Address
}

export type UsePresaleTransitionReturnType = {
  /** Current transition status query */
  status: UseQueryResult<TPresaleTransitionStatus | null, Error>
  /** Atomic goLive transition - executes all steps in one transaction */
  goLive: UseMutationResult<TPresaleMutationResult, Error, Partial<TGoLiveParams>>
  /** Close the presale (set state to Closed) */
  closePresale: UseMutationResult<TPresaleMutationResult, Error, void>
  /** Set live phase fees */
  setLiveFees: UseMutationResult<TPresaleMutationResult, Error, Partial<TSetLiveFeesParams>>
  /** Enable public trading on Floor */
  enablePublicTrading: UseMutationResult<
    TPresaleMutationResult,
    Error,
    Partial<TEnablePublicTradingParams>
  >
  /** Enable public borrowing on CreditFacility */
  enablePublicBorrowing: UseMutationResult<
    TPresaleMutationResult,
    Error,
    Partial<TEnablePublicBorrowingParams>
  >
  /** Whether any transition operation is pending */
  isTransitioning: boolean
  /** Combined error from any transition operation */
  transitionError: Error | null
  /** Refetch the transition status */
  refetchStatus: () => Promise<void>
}

/**
 * @description Hook for presale to live phase transition
 * Provides status query and mutations for transitioning from presale to live phase
 *
 * @example
 * ```tsx
 * const {
 *   status,
 *   goLive,
 *   closePresale,
 *   enablePublicTrading,
 *   isTransitioning
 * } = usePresaleTransition({
 *   floorAddress: '0x...',
 *   authorizerAddress: '0x...',
 *   transactionForwarderAddress: '0x...',
 * })
 *
 * // Check current status
 * if (status.data?.readyForLive) {
 *   console.log('Already live!')
 * } else {
 *   console.log('Missing steps:', status.data?.missingSteps)
 * }
 *
 * // Execute atomic transition
 * await goLive.mutateAsync({})
 * ```
 */
export const usePresaleTransition = (
  params?: UsePresaleTransitionParams
): UsePresaleTransitionReturnType => {
  const floorsContext = useFloors()
  const resolvedPresale = floorsContext.presale.data ?? null
  const {
    refetch: { presale: refetchPresale },
  } = floorsContext
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  // Merge params with context data
  const floorAddress = params?.floorAddress
  const authorizerAddress = params?.authorizerAddress
  const creditFacilityAddress = params?.creditFacilityAddress
  const transactionForwarderAddress = params?.transactionForwarderAddress

  const presaleClient = useMemo(() => {
    if (!resolvedPresale || !publicClient) return null
    return new Presale({
      data: resolvedPresale,
      publicClient,
      walletClient: walletClient ?? undefined,
      floorAddress,
      authorizerAddress,
      creditFacilityAddress,
    })
  }, [
    resolvedPresale,
    publicClient,
    walletClient,
    floorAddress,
    authorizerAddress,
    creditFacilityAddress,
  ])

  const ensurePresale = useCallback(() => {
    if (!presaleClient)
      throw new Error(
        'Presale client unavailable. Wait for FloorsProvider presale query to resolve.'
      )
    return presaleClient
  }, [presaleClient])

  const requireTransactionForwarder = useCallback(() => {
    if (!transactionForwarderAddress) {
      throw new Error('Transaction forwarder address is required for transition operations.')
    }
    return transactionForwarderAddress
  }, [transactionForwarderAddress])

  const requireFloorAddress = useCallback(() => {
    if (!floorAddress) {
      throw new Error('Floor address is required for transition operations.')
    }
    return floorAddress
  }, [floorAddress])

  const requireAuthorizerAddress = useCallback(() => {
    if (!authorizerAddress) {
      throw new Error('Authorizer address is required for transition operations.')
    }
    return authorizerAddress
  }, [authorizerAddress])

  const refetchAfterMutation = useCallback(async () => {
    await Promise.allSettled([refetchPresale()])
  }, [refetchPresale])

  // Transition status query
  const statusParams: TGetTransitionStatusParams | null = useMemo(() => {
    if (!floorAddress || !authorizerAddress) return null
    return {
      floorAddress,
      authorizerAddress,
      creditFacilityAddress,
    }
  }, [floorAddress, authorizerAddress, creditFacilityAddress])

  const status = useQuery({
    queryKey: presaleTransitionStatusKey(resolvedPresale?.id),
    queryFn: async () => {
      if (!presaleClient || !statusParams) return null
      return presaleClient.getTransitionStatus(statusParams)
    },
    enabled: Boolean(presaleClient && statusParams),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  })

  // Atomic goLive transition
  const goLive = useMutation({
    mutationFn: async (overrides: Partial<TGoLiveParams>) => {
      const client = ensurePresale()
      const fullParams: TGoLiveParams = {
        transactionForwarderAddress: requireTransactionForwarder(),
        floorAddress: requireFloorAddress(),
        authorizerAddress: requireAuthorizerAddress(),
        creditFacilityAddress,
        ...overrides,
      }
      return client.goLive(fullParams)
    },
    onSuccess: async () => {
      await refetchAfterMutation()
      await status.refetch()
    },
  })

  // Close presale
  const closePresale = useMutation({
    mutationFn: async () => {
      const client = ensurePresale()
      return client.closePresale()
    },
    onSuccess: async () => {
      await refetchAfterMutation()
      await status.refetch()
    },
  })

  // Set live fees
  const setLiveFees = useMutation({
    mutationFn: async (overrides: Partial<TSetLiveFeesParams>) => {
      const client = ensurePresale()
      const fullParams: TSetLiveFeesParams = {
        transactionForwarderAddress: requireTransactionForwarder(),
        floorAddress: requireFloorAddress(),
        creditFacilityAddress,
        ...overrides,
      }
      return client.setLiveFees(fullParams)
    },
    onSuccess: async () => {
      await refetchAfterMutation()
      await status.refetch()
    },
  })

  // Enable public trading
  const enablePublicTrading = useMutation({
    mutationFn: async (overrides: Partial<TEnablePublicTradingParams>) => {
      const client = ensurePresale()
      const fullParams: TEnablePublicTradingParams = {
        transactionForwarderAddress: requireTransactionForwarder(),
        floorAddress: requireFloorAddress(),
        authorizerAddress: requireAuthorizerAddress(),
        ...overrides,
      }
      return client.enablePublicTrading(fullParams)
    },
    onSuccess: async () => {
      await refetchAfterMutation()
      await status.refetch()
    },
  })

  // Enable public borrowing
  const enablePublicBorrowing = useMutation({
    mutationFn: async (overrides: Partial<TEnablePublicBorrowingParams>) => {
      const client = ensurePresale()
      // Resolve credit facility address - overrides take precedence if defined
      const resolvedCreditFacilityAddress = overrides.creditFacilityAddress ?? creditFacilityAddress
      if (!resolvedCreditFacilityAddress) {
        throw new Error('Credit facility address is required for enabling public borrowing.')
      }
      // Spread overrides first, then set resolved values to prevent undefined override
      const fullParams: TEnablePublicBorrowingParams = {
        ...overrides,
        transactionForwarderAddress: requireTransactionForwarder(),
        creditFacilityAddress: resolvedCreditFacilityAddress,
        authorizerAddress: requireAuthorizerAddress(),
      }
      return client.enablePublicBorrowing(fullParams)
    },
    onSuccess: async () => {
      await refetchAfterMutation()
      await status.refetch()
    },
  })

  const isTransitioning =
    goLive.isPending ||
    closePresale.isPending ||
    setLiveFees.isPending ||
    enablePublicTrading.isPending ||
    enablePublicBorrowing.isPending

  const transitionError =
    goLive.error ||
    closePresale.error ||
    setLiveFees.error ||
    enablePublicTrading.error ||
    enablePublicBorrowing.error ||
    null

  const refetchStatus = useCallback(async () => {
    await status.refetch()
  }, [status])

  return {
    status,
    goLive,
    closePresale,
    setLiveFees,
    enablePublicTrading,
    enablePublicBorrowing,
    isTransitioning,
    transitionError,
    refetchStatus,
  }
}

// Re-export PresaleState for convenience
export { PresaleState }
