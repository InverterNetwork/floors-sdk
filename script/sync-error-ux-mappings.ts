#!/usr/bin/env bun
/**
 * Syncs error-ux-mappings.ts with error-signatures.generated.ts.
 *
 * - Migrates entries whose error name matches but signature changed
 * - Adds skeleton entries for new errors
 * - Removes entries for signatures no longer in ERROR_METADATA
 * - Organizes by domain section
 *
 * Run: bun run sync:errors
 */

import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'

// ============================================================================
// Setup paths
// ============================================================================

const scriptDir = dirname(new URL(import.meta.url).pathname)
const sdkRoot = join(scriptDir, '..')
const generatedPath = join(sdkRoot, 'src', 'utils', 'error-signatures.generated.ts')
const uxMappingsPath = join(sdkRoot, 'src', 'utils', 'error-ux-mappings.ts')

// ============================================================================
// Import generated metadata
// ============================================================================

const { ERROR_METADATA } = (await import(generatedPath)) as {
  ERROR_METADATA: Record<
    string,
    { name: string; inputs: Array<{ name: string; type: string }>; source: string }
  >
}

// ============================================================================
// Parse existing UX mappings from source text
// ============================================================================

type ParsedEntry = {
  signature: string
  errorName: string
  body: string // raw object body text between the outer braces
}

function parseExistingMappings(source: string): ParsedEntry[] {
  const entries: ParsedEntry[] = []

  // Match each entry: 'signature': { ... },  with comment // ErrorName
  const entryRegex = /[ \t]*'(0x[0-9a-f]{8})':\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\},?\s*\n/g

  let match: RegExpExecArray | null
  while ((match = entryRegex.exec(source)) !== null) {
    const signature = match[1]!
    const body = match[2]!

    // Extract error name from the comment on the line before or the // comment inside
    const nameMatch = body.match(/\/\/\s*([A-Z]\w+)/)
    const errorName = nameMatch ? nameMatch[1]! : ''

    entries.push({ signature, errorName, body: body.trim() })
  }

  return entries
}

// ============================================================================
// Category detection from error name
// ============================================================================

const CATEGORY_RULES: [RegExp, string][] = [
  [/^Module__CreditFacility_/, 'credit'],
  [/^Module__Floor__/, 'curve'],
  [/^Module__IssuanceBase__/, 'trading'],
  [/^Module__RedeemingIssuanceBase__/, 'trading'],
  [/^Module__SplitterTreasury__/, 'treasury'],
  [/^Module__Authorizer__/, 'authorizer'],
  [/^Module__CallerNotPermissioned$/, 'permission'],
  [/^Module__StakingManager__/, 'system'],
  [/^Module__StrategyBase__/, 'system'],
  [/^Module__TestnetStrategy__/, 'system'],
  [/^Module__DecayingFeeMultiplierBase__/, 'presale'],
  [/^Module__MerkleWhitelistBase__/, 'presale'],
  [/^Module__BC_Discrete_/, 'curve'],
  [/^Module__VirtualCollateralSupply/, 'system'],
  [/^DiscreteCurveMathLib__/, 'curve'],
  [/^Presale__/, 'presale'],
  [/^ERC20/, 'token'],
  [/^IERC20/, 'token'],
  [/^ERC2771/, 'network'],
  [/^ERC4626/, 'token'],
  [/^FloorFactory__/, 'factory'],
  [/^ModuleFactory__/, 'factory'],
  [/^InverterBeacon__/, 'system'],
  [/^InverterReverter__/, 'system'],
  [/^Ownable/, 'permission'],
  [/^AccessControl/, 'permission'],
  [/^SafeERC20/, 'token'],
  [/^Module__Invalid/, 'validation'],
]

function detectCategory(name: string): string {
  for (const [pattern, category] of CATEGORY_RULES) {
    if (pattern.test(name)) return category
  }
  return 'unknown'
}

// ============================================================================
// Section assignment
// ============================================================================

type Section = { title: string; match: (name: string) => boolean }

const SECTIONS: Section[] = [
  { title: 'ACCESS CONTROL ERRORS', match: (n) => /^AccessControl/.test(n) },
  {
    title: 'MODULE PERMISSION ERRORS',
    match: (n) => /^Module__Authorizer__/.test(n) || n === 'Module__CallerNotPermissioned',
  },
  {
    title: 'TRADING ERRORS (BUY/SELL)',
    match: (n) => /^Module__IssuanceBase__/.test(n) || /^Module__RedeemingIssuanceBase__/.test(n),
  },
  { title: 'BONDING CURVE ERRORS', match: (n) => /^DiscreteCurveMathLib__/.test(n) },
  {
    title: 'FLOOR SPECIFIC ERRORS',
    match: (n) => /^Module__Floor__/.test(n) || /^Module__BC_Discrete_/.test(n),
  },
  { title: 'CREDIT FACILITY ERRORS', match: (n) => /^Module__CreditFacility_/.test(n) },
  {
    title: 'PRESALE ERRORS',
    match: (n) => /^Presale__/.test(n),
  },
  {
    title: 'MERKLE WHITELIST ERRORS',
    match: (n) => /^Module__MerkleWhitelistBase__/.test(n),
  },
  {
    title: 'DECAYING FEE MULTIPLIER ERRORS',
    match: (n) => /^Module__DecayingFeeMultiplierBase__/.test(n),
  },
  {
    title: 'ERC20 TOKEN ERRORS',
    match: (n) => /^ERC20/.test(n) || /^IERC20/.test(n),
  },
  { title: 'ERC4626 VAULT ERRORS', match: (n) => /^ERC4626/.test(n) },
  { title: 'TREASURY ERRORS', match: (n) => /^Module__SplitterTreasury__/.test(n) },
  { title: 'STAKING MANAGER ERRORS', match: (n) => /^Module__StakingManager__/.test(n) },
  {
    title: 'STRATEGY ERRORS',
    match: (n) => /^Module__StrategyBase__/.test(n) || /^Module__TestnetStrategy__/.test(n),
  },
  {
    title: 'VIRTUAL SUPPLY ERRORS',
    match: (n) => /^Module__VirtualCollateralSupply/.test(n),
  },
  { title: 'MODULE VALIDATION ERRORS', match: (n) => /^Module__Invalid/.test(n) },
  {
    title: 'FACTORY ERRORS',
    match: (n) => /^FloorFactory__/.test(n) || /^ModuleFactory__/.test(n),
  },
  {
    title: 'BEACON ERRORS',
    match: (n) => /^InverterBeacon__/.test(n) || /^InverterReverter__/.test(n),
  },
  {
    title: 'SYSTEM/INITIALIZATION ERRORS',
    match: (n) =>
      /^InvalidInitialization$/.test(n) ||
      /^NotInitializing$/.test(n) ||
      /^ReentrancyGuardReentrantCall$/.test(n),
  },
  { title: 'OWNABLE ERRORS', match: (n) => /^Ownable/.test(n) },
  {
    title: 'FORWARDER/META-TX ERRORS',
    match: (n) =>
      /^ERC2771/.test(n) ||
      /^CallFailed$/.test(n) ||
      /^FailedCall$/.test(n) ||
      /^InsufficientBalance$/.test(n) ||
      /^InvalidAccountNonce$/.test(n),
  },
  {
    title: 'CREATE2/DEPLOYMENT ERRORS',
    match: (n) =>
      /^Create2/.test(n) || /^DeterministicFactory__/.test(n) || /^FailedDeployment$/.test(n),
  },
  { title: 'SAFE ERC20 ERRORS', match: (n) => /^SafeERC20/.test(n) },
]

function getSection(name: string): string {
  for (const s of SECTIONS) {
    if (s.match(name)) return s.title
  }
  return 'UNCATEGORIZED ERRORS'
}

// ============================================================================
// Pretty message from PascalCase error name
// ============================================================================

function parseErrorNameToPrettyMessage(name: string): string {
  // Strip prefix: Module__CreditFacility_Foo → Foo, Presale__Foo → Foo, etc.
  let stripped = name
    .replace(/^Module__\w+?[_](?=[A-Z])/, '')
    .replace(/^Module__/, '')
    .replace(/^DiscreteCurveMathLib__/, '')
    .replace(/^Presale__/, '')
    .replace(/^FloorFactory__/, '')
    .replace(/^ModuleFactory__/, '')
    .replace(/^InverterBeacon__/, '')
    .replace(/^InverterReverter__/, '')
    .replace(/^DeterministicFactory__/, '')
    .replace(/^IERC20Issuance__/, '')

  // Split PascalCase into words
  const words = stripped
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .trim()

  // Lowercase all then capitalize first word
  const lower = words.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

// ============================================================================
// Main sync logic
// ============================================================================

const uxSource = readFileSync(uxMappingsPath, 'utf-8')
const existingEntries = parseExistingMappings(uxSource)

// Build lookups
const bySignature = new Map<string, ParsedEntry>()
const byName = new Map<string, ParsedEntry>()
for (const e of existingEntries) {
  bySignature.set(e.signature, e)
  if (e.errorName) byName.set(e.errorName, e)
}

// Stats
let kept = 0
let migrated = 0
let added = 0
let removed = 0

// Build final entries: signature → { errorName, body }
type FinalEntry = { signature: string; errorName: string; body: string; isNew: boolean }
const finalEntries: FinalEntry[] = []

for (const [sig, meta] of Object.entries(ERROR_METADATA)) {
  const existing = bySignature.get(sig)
  if (existing) {
    // Signature still exists → keep as-is
    finalEntries.push({ signature: sig, errorName: meta.name, body: existing.body, isNew: false })
    kept++
    continue
  }

  // Check if error name matches (signature changed)
  const migratedEntry = byName.get(meta.name)
  if (migratedEntry && !bySignature.has(sig)) {
    // Migrate: carry over UX content, update comment
    const updatedBody = migratedEntry.body.replace(/\/\/\s*[A-Z]\w+/, `// ${meta.name}`)
    finalEntries.push({ signature: sig, errorName: meta.name, body: updatedBody, isNew: false })
    migrated++
    console.log(`  ↪ Migrated: ${meta.name} (${migratedEntry.signature} → ${sig})`)
    continue
  }

  // Completely new → generate skeleton
  const category = detectCategory(meta.name)
  const prettyMessage = parseErrorNameToPrettyMessage(meta.name)
  const hasParams = meta.inputs.length > 0

  let body = `// ${meta.name}\n`
  body += `    prettyMessage: '${prettyMessage}', // TODO: review\n`
  body += `    suggestion: null, // TODO: add suggestion\n`
  body += `    category: '${category}',\n`
  body += `    severity: 'error',\n`
  body += `    recoveryActions: [ACTIONS.retry],`

  if (hasParams) {
    const paramList = meta.inputs.map((i) => i.name).join(', ')
    body += `\n    // TODO: add dynamicMessage using args: { ${paramList} }`
  }

  finalEntries.push({ signature: sig, errorName: meta.name, body, isNew: true })
  added++
  console.log(`  + New: ${meta.name} (${sig})`)
}

// Count removed
for (const e of existingEntries) {
  if (!(e.signature in ERROR_METADATA)) {
    removed++
    console.log(`  - Removed: ${e.errorName || e.signature} (${e.signature})`)
  }
}

// ============================================================================
// Group by section and generate output
// ============================================================================

const sectionMap = new Map<string, FinalEntry[]>()
for (const entry of finalEntries) {
  const section = getSection(entry.errorName)
  if (!sectionMap.has(section)) sectionMap.set(section, [])
  sectionMap.get(section)!.push(entry)
}

// Sort sections in defined order
const sectionOrder = SECTIONS.map((s) => s.title)
const sortedSections = [...sectionMap.entries()].sort((a, b) => {
  const ai = sectionOrder.indexOf(a[0])
  const bi = sectionOrder.indexOf(b[0])
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
})

// Build the entries block
let entriesBlock = ''
for (const [sectionTitle, entries] of sortedSections) {
  entriesBlock += `  // ==========================================================================\n`
  entriesBlock += `  // ${sectionTitle}\n`
  entriesBlock += `  // ==========================================================================\n\n`

  // Sort entries by error name within section
  entries.sort((a, b) => a.errorName.localeCompare(b.errorName))

  for (const entry of entries) {
    entriesBlock += `  '${entry.signature}': {\n`
    entriesBlock += `    ${entry.body}\n`
    entriesBlock += `  },\n\n`
  }
}

// Remove trailing newlines
entriesBlock = entriesBlock.trimEnd() + '\n'

// ============================================================================
// Write the full file
// ============================================================================

const output = `/**
 * @fileoverview UX mappings for Floor Markets contract errors.
 *
 * This file maps all known error signatures to user-friendly messages.
 * TypeScript enforces that ALL errors from error-signatures.generated.ts
 * have a mapping here. When contracts are updated and new errors are added,
 * you'll get TypeScript errors until you add UX mappings for them.
 *
 * To sync after contract updates:
 * 1. Run \`bun run sync:errors\`
 * 2. Search for "TODO:" to find entries that need manual review
 */

import type { KnownErrorSignature } from './error-signatures.generated'
import type { ErrorCategory, ErrorSeverity, RecoveryAction } from './error-types'

// ============================================================================
// UX Mapping Types
// ============================================================================

/**
 * UX mapping for a single error.
 */
export type ErrorUXMapping = {
  /** User-friendly message for display */
  prettyMessage: string
  /** Actionable suggestion for the user */
  suggestion: string | null
  /** Error category for analytics */
  category: ErrorCategory
  /** Severity level */
  severity: ErrorSeverity
  /** Recovery actions */
  recoveryActions: RecoveryAction[]
  /**
   * Dynamic message generator based on decoded error args.
   * Use this for errors with parameters that should be shown to users.
   */
  dynamicMessage?: (args: Record<string, unknown>) => string
  /**
   * Dynamic suggestion generator based on decoded error args.
   */
  dynamicSuggestion?: (args: Record<string, unknown>) => string
}

// ============================================================================
// Helper Functions for Common Patterns
// ============================================================================

/** Creates a simple recovery action */
const action = (label: string, type: RecoveryAction['type'], primary = false): RecoveryAction => ({
  label,
  type,
  primary,
})

/** Common recovery actions */
const ACTIONS = {
  retry: action('Try again', 'retry', true),
  refresh: action('Refresh', 'refresh'),
  contactSupport: action('Contact support', 'contact_support'),
  adjustSlippage: action('Adjust slippage', 'adjust_slippage', true),
  decreaseAmount: action('Use smaller amount', 'decrease_amount', true),
  increaseAmount: action('Use larger amount', 'increase_amount'),
  addGas: action('Add ETH for gas', 'add_gas', true),
  connectWallet: action('Connect wallet', 'connect_wallet', true),
  approveToken: action('Approve token', 'approve_token', true),
  wait: action('Wait and retry', 'wait', true),
  checkWhitelist: action('Check whitelist', 'check_whitelist'),
  reduceLeverage: action('Reduce leverage', 'reduce_leverage', true),
  addCollateral: action('Add collateral', 'add_collateral', true),
  repayDebt: action('Repay debt', 'repay_debt'),
} as const

// ============================================================================
// ERROR UX MAPPINGS
// ============================================================================

/**
 * Complete mapping of error signatures to UX messages.
 *
 * TypeScript will error if any KnownErrorSignature is missing!
 * This ensures all contract errors have user-friendly messages.
 */
export const ERROR_UX_MAPPINGS: Record<KnownErrorSignature, ErrorUXMapping> = {
${entriesBlock}} as const satisfies Record<KnownErrorSignature, ErrorUXMapping>

// ============================================================================
// Utilities
// ============================================================================

/**
 * Get UX mapping for an error signature.
 */
export function getErrorUXMapping(signature: KnownErrorSignature): ErrorUXMapping {
  return ERROR_UX_MAPPINGS[signature]
}

/**
 * Check if a signature has a UX mapping.
 */
export function hasUXMapping(signature: string): signature is KnownErrorSignature {
  return signature in ERROR_UX_MAPPINGS
}
`

writeFileSync(uxMappingsPath, output, 'utf-8')

// ============================================================================
// Summary
// ============================================================================

console.log(`\n📊 Sync complete:`)
console.log(`   ✓ ${kept} entries kept unchanged`)
console.log(`   ↪ ${migrated} entries migrated (name match, new signature)`)
console.log(`   + ${added} new skeleton entries added`)
console.log(`   - ${removed} orphaned entries removed`)
console.log(`   Total: ${finalEntries.length} entries\n`)

if (added > 0) {
  console.log(`⚠️  Search for "TODO:" in error-ux-mappings.ts to review new entries.\n`)
}
