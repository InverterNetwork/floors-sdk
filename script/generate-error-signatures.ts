#!/usr/bin/env bun
/**
 * @fileoverview Generates TypeScript types from ABI error definitions.
 *
 * This script:
 * 1. Scans all ABIs in src/abis/
 * 2. Extracts error definitions
 * 3. Computes 4-byte error selectors
 * 4. Generates a TypeScript file with:
 *    - A union type of all error signatures (for type safety)
 *    - A const object mapping signatures to error metadata
 *
 * Run: bun run script/generate-error-signatures.ts
 *
 * When contracts are updated and new errors are added, running this script
 * will update the generated types. If error-ux-mappings.ts doesn't cover
 * the new errors, TypeScript will show errors.
 */

import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { type Hex, keccak256, toHex } from 'viem'

// ============================================================================
// Types
// ============================================================================

type AbiError = {
  type: 'error'
  name: string
  inputs: Array<{
    name: string
    type: string
    internalType?: string
  }>
}

type AbiItem = {
  type: string
  name?: string
  inputs?: Array<{ name: string; type: string; internalType?: string }>
}

type ExtractedError = {
  signature: Hex
  name: string
  inputs: Array<{ name: string; type: string }>
  source: string
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Computes the 4-byte error selector from the error signature.
 * Same algorithm as Solidity: keccak256(signature)[0:4]
 */
function computeErrorSelector(errorName: string, inputs: Array<{ type: string }>): Hex {
  const types = inputs.map((i) => i.type).join(',')
  const signature = `${errorName}(${types})`
  const hash = keccak256(toHex(signature))
  return hash.slice(0, 10) as Hex // 0x + 8 hex chars = 4 bytes
}

/**
 * Checks if an ABI item is an error definition.
 */
function isAbiError(item: AbiItem): item is AbiError {
  return item.type === 'error' && typeof item.name === 'string'
}

/**
 * Extracts errors from an ABI.
 */
function extractErrorsFromAbi(abi: AbiItem[], sourceName: string): ExtractedError[] {
  const errors: ExtractedError[] = []

  for (const item of abi) {
    if (isAbiError(item)) {
      const inputs = (item.inputs || []).map((input) => ({
        name: input.name,
        type: input.type,
      }))

      const signature = computeErrorSelector(item.name, inputs)

      errors.push({
        signature,
        name: item.name,
        inputs,
        source: sourceName,
      })
    }
  }

  return errors
}

// ============================================================================
// Main Generation Logic
// ============================================================================

async function main() {
  const scriptDir = dirname(new URL(import.meta.url).pathname)
  const sdkRoot = join(scriptDir, '..')
  const abisDir = join(sdkRoot, 'src', 'abis')
  const outputPath = join(sdkRoot, 'src', 'utils', 'error-signatures.generated.ts')

  console.log('🔍 Scanning ABIs for error definitions...\n')

  // Import all ABIs dynamically
  const abisIndex = await import(join(abisDir, 'index.ts'))

  // Collect all errors
  const allErrors = new Map<Hex, ExtractedError>()

  for (const [abiName, abi] of Object.entries(abisIndex)) {
    if (abiName === 'default' || !Array.isArray(abi)) continue

    const errors = extractErrorsFromAbi(abi as AbiItem[], abiName)
    for (const error of errors) {
      // Handle duplicates (same error in multiple ABIs)
      if (!allErrors.has(error.signature)) {
        allErrors.set(error.signature, error)
      } else {
        // Update source to show all contracts that have this error
        const existing = allErrors.get(error.signature)!
        if (!existing.source.includes(abiName)) {
          existing.source = `${existing.source}, ${abiName}`
        }
      }
    }

    console.log(`  ✓ ${abiName}: ${errors.length} errors`)
  }

  console.log(`\n📊 Total unique errors: ${allErrors.size}\n`)

  // Sort errors by name for consistent output
  const sortedErrors = Array.from(allErrors.values()).sort((a, b) => a.name.localeCompare(b.name))

  // Generate TypeScript file
  const generatedCode = generateTypeScript(sortedErrors)

  writeFileSync(outputPath, generatedCode, 'utf-8')
  console.log(`✅ Generated: ${outputPath}\n`)

  // Check for errors that need UX mappings
  const uxMappingsPath = join(sdkRoot, 'src', 'utils', 'error-ux-mappings.ts')
  try {
    const uxMappingsContent = readFileSync(uxMappingsPath, 'utf-8')
    const missingMappings: ExtractedError[] = []

    for (const error of sortedErrors) {
      // Simple check - just see if the signature exists in the file
      if (!uxMappingsContent.includes(error.signature)) {
        missingMappings.push(error)
      }
    }

    if (missingMappings.length > 0) {
      console.log('⚠️  MISSING UX MAPPINGS:')
      console.log('   The following errors need UX mappings in error-ux-mappings.ts:\n')
      for (const error of missingMappings) {
        console.log(`   - ${error.name} (${error.signature})`)
        console.log(`     Source: ${error.source}`)
        console.log(
          `     Inputs: ${error.inputs.map((i) => `${i.name}: ${i.type}`).join(', ') || 'none'}`
        )
        console.log('')
      }
      console.log('   Run `bun run type-check` to see TypeScript errors.\n')
    } else {
      console.log('✅ All errors have UX mappings!\n')
    }
  } catch {
    console.log('ℹ️  error-ux-mappings.ts not found yet. Create it to add UX messages.\n')
  }
}

/**
 * Generates the TypeScript file content.
 */
function generateTypeScript(errors: ExtractedError[]): string {
  const signatureUnion = errors.map((e) => `  | '${e.signature}'`).join('\n')

  const errorMetadataEntries = errors
    .map((e) => {
      const inputsStr =
        e.inputs.length > 0
          ? `[${e.inputs.map((i) => `{ name: '${i.name}', type: '${i.type}' }`).join(', ')}]`
          : '[]'

      return `  '${e.signature}': {
    name: '${e.name}',
    inputs: ${inputsStr},
    source: '${e.source}',
  }`
    })
    .join(',\n')

  return `/**
 * @fileoverview AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 *
 * This file is generated by: bun run generate:errors
 * Source: script/generate-error-signatures.ts
 *
 * Generated: ${new Date().toISOString()}
 * Total errors: ${errors.length}
 *
 * When contracts are updated, re-run the generator to update this file.
 * TypeScript will then show errors if error-ux-mappings.ts is missing entries.
 */

// ============================================================================
// Error Signature Union Type
// ============================================================================

/**
 * Union type of all known error signatures from Floor Markets contracts.
 * This ensures type safety when mapping errors to UX messages.
 */
export type KnownErrorSignature =
${signatureUnion}

// ============================================================================
// Error Metadata
// ============================================================================

/**
 * Metadata for each error extracted from ABIs.
 */
export type ErrorMetadata = {
  /** The Solidity error name */
  name: string
  /** Error input parameters */
  inputs: Array<{ name: string; type: string }>
  /** Source contract(s) that define this error */
  source: string
}

/**
 * Mapping of error signatures to their metadata.
 * Used for error decoding and display.
 */
export const ERROR_METADATA: Record<KnownErrorSignature, ErrorMetadata> = {
${errorMetadataEntries},
} as const

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Type guard to check if a signature is a known error.
 */
export function isKnownErrorSignature(signature: string): signature is KnownErrorSignature {
  return signature in ERROR_METADATA
}

/**
 * Get error metadata by signature.
 */
export function getErrorMetadata(signature: KnownErrorSignature): ErrorMetadata {
  return ERROR_METADATA[signature]
}

/**
 * Get all known error signatures.
 */
export function getAllErrorSignatures(): KnownErrorSignature[] {
  return Object.keys(ERROR_METADATA) as KnownErrorSignature[]
}

/**
 * Find error signature by name (case-insensitive partial match).
 */
export function findErrorByName(name: string): KnownErrorSignature | null {
  const lowerName = name.toLowerCase()
  for (const [sig, meta] of Object.entries(ERROR_METADATA)) {
    if (meta.name.toLowerCase().includes(lowerName)) {
      return sig as KnownErrorSignature
    }
  }
  return null
}
`
}

// Run
main().catch((err) => {
  console.error('❌ Error generating error signatures:', err)
  process.exit(1)
})
