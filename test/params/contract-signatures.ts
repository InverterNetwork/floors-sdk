/**
 * @description Contract Function Signature Extractor
 * Parses Solidity interface files to extract function signatures
 */

import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

export interface FunctionSignature {
  name: string
  params: FunctionParameter[]
  signature: string // Full function signature string
  isView: boolean // true if function is view/pure (read-only)
}

export interface FunctionParameter {
  name: string
  type: string
}

// Directories to search for contract interfaces
const CONTRACT_INTERFACES_DIRS = [
  '/Users/anon/Desktop/inverter/floormarkets/contracts/src/core/modules/interfaces',
  '/Users/anon/Desktop/inverter/floormarkets/contracts/src/core/issuance/interfaces',
]

/**
 * @description Extract all function signatures from Solidity interface files
 */
export function extractContractSignatures(): Map<string, FunctionSignature[]> {
  const signatures = new Map<string, FunctionSignature[]>()

  for (const dir of CONTRACT_INTERFACES_DIRS) {
    try {
      const files = readdirSync(dir)
      for (const file of files) {
        if (file.endsWith('.sol')) {
          const filePath = join(dir, file)
          const content = readFileSync(filePath, 'utf-8')
          const interfaceName = extractInterfaceName(content, file)
          const functions = parseFunctions(content)
          if (functions.length > 0) {
            signatures.set(interfaceName, functions)
          }
        }
      }
    } catch (error) {
      // Directory may not exist, skip
      console.warn(`Could not read directory ${dir}:`, error)
    }
  }

  return signatures
}

/**
 * @description Extract interface name from Solidity content or filename
 */
function extractInterfaceName(content: string, filename: string): string {
  // Match interface declaration at start of line (after optional whitespace)
  // This avoids matching comments like "@dev This interface defines"
  const match = content.match(/^\s*interface\s+(\w+)/m)
  if (match) {
    return match[1]
  }
  // Fallback to filename without extension
  return filename.replace('.sol', '')
}

/**
 * @description Parse function signatures from Solidity interface content
 */
function parseFunctions(content: string): FunctionSignature[] {
  const functions: FunctionSignature[] = []

  // Remove single-line comments to avoid false matches
  const contentWithoutComments = content.replace(/\/\/.*$/gm, '')

  // Remove multi-line comments
  const contentClean = contentWithoutComments.replace(/\/\*[\s\S]*?\*\//g, '')

  // Match function declarations - handle multi-line signatures
  // First, normalize whitespace (collapse newlines within function declarations)
  const normalizedContent = contentClean.replace(/\n\s*/g, ' ')

  // Match: function name(...) [external] [view/pure] [returns (...)];
  const functionRegex =
    /function\s+(\w+)\s*\(([^)]*)\)\s*(?:external\s*)?(view|pure)?\s*(?:returns\s*\([^)]*\))?\s*;/g

  let match: RegExpExecArray | null
  while ((match = functionRegex.exec(normalizedContent)) !== null) {
    const name = match[1]
    const paramsString = match[2]
    const mutability = match[3] // 'view', 'pure', or undefined
    const params = parseParameters(paramsString)

    functions.push({
      name,
      params,
      signature: `${name}(${params.map((p) => p.type).join(',')})`,
      isView: mutability === 'view' || mutability === 'pure',
    })
  }

  return functions
}

/**
 * @description Parse parameter string from Solidity function
 */
function parseParameters(paramsString: string): FunctionParameter[] {
  if (!paramsString.trim()) {
    return []
  }

  const params: FunctionParameter[] = []
  const paramStrings = paramsString
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s)

  for (const paramStr of paramStrings) {
    // Match type and name: "uint amount_" or "address receiver_" or "bool consolidate_"
    const paramMatch = paramStr.match(/^(.+?)\s+(\w+)$/)
    if (paramMatch) {
      params.push({
        type: paramMatch[1].trim(),
        name: paramMatch[2].trim(),
      })
    }
  }

  return params
}

/**
 * @description Get specific function signature by interface and function name
 */
export function getFunctionSignature(
  signatures: Map<string, FunctionSignature[]>,
  interfaceName: string,
  functionName: string
): FunctionSignature | undefined {
  const interfaceFunctions = signatures.get(interfaceName)
  if (!interfaceFunctions) {
    return undefined
  }
  return interfaceFunctions.find((fn) => fn.name === functionName)
}

/**
 * @description Find functions with slippage parameters (minAmountOut, etc.)
 */
export function findSlippageFunctions(signatures: Map<string, FunctionSignature[]>): Array<{
  interface: string
  function: FunctionSignature
}> {
  const slippageFunctions: Array<{
    interface: string
    function: FunctionSignature
  }> = []

  const slippageParamNames = ['minAmountOut', 'minAmountOut_', 'slippage', 'minimum']

  for (const [interfaceName, functions] of signatures) {
    for (const fn of functions) {
      const hasSlippage = fn.params.some((param) =>
        slippageParamNames.some((name) => param.name.toLowerCase().includes(name.toLowerCase()))
      )
      if (hasSlippage) {
        slippageFunctions.push({
          interface: interfaceName,
          function: fn,
        })
      }
    }
  }

  return slippageFunctions
}
