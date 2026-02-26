/**
 * @description SDK Call Extractor
 * Parses TypeScript SDK files to extract writeContract calls and their arguments
 */

import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

export interface SDKCall {
  fileName: string
  functionName: string // SDK method name
  contractFunction: string // Contract function being called
  args: string[] // Raw argument strings
  argsWithTypes: ArgWithType[] // Parsed arguments with types
  line: number // Line number in file
  rawCall: string // Full writeContract call
}

export interface ArgWithType {
  value: string
  isHardcodedZero: boolean
  isVariable: boolean
  variableName?: string
}

// SDK source directories
const SDK_SOURCE_DIRS = ['/Users/anon/Desktop/inverter/floormarkets/packages/sdk/src']

/**
 * @description Extract all writeContract calls from SDK source files
 */
export function extractSDKCalls(): SDKCall[] {
  const calls: SDKCall[] = []

  for (const dir of SDK_SOURCE_DIRS) {
    try {
      const files = readdirSync(dir)
      for (const file of files) {
        if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
          const filePath = join(dir, file)
          const content = readFileSync(filePath, 'utf-8')
          const fileCalls = parseWriteContractCalls(content, file)
          calls.push(...fileCalls)
        }
      }
    } catch (error) {
      console.warn(`Could not read directory ${dir}:`, error)
    }
  }

  return calls
}

/**
 * @description Parse writeContract calls from TypeScript content
 */
function parseWriteContractCalls(content: string, fileName: string): SDKCall[] {
  const calls: SDKCall[] = []
  const lines = content.split('\n')

  // Find all writeContract calls
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Look for functionName pattern in writeContract calls
    const functionNameMatch = line.match(/functionName:\s*['"](\w+)['"]/)
    if (!functionNameMatch) {
      continue
    }

    const contractFunction = functionNameMatch[1]

    // Find the args array - may be on same line or subsequent lines
    let argsStartIndex = i
    let argsLine = line
    let braceCount = 0
    let foundArgs = false

    // Look for args: [ pattern
    while (argsStartIndex < lines.length && !foundArgs) {
      const argsMatch = argsLine.match(/args:\s*\[/)
      if (argsMatch) {
        foundArgs = true
        braceCount = (argsLine.match(/\[/g) || []).length - (argsLine.match(/\]/g) || []).length
      } else {
        argsStartIndex++
        if (argsStartIndex < lines.length) {
          argsLine = lines[argsStartIndex]
        } else {
          break
        }
      }
    }

    if (!foundArgs) {
      continue
    }

    // Collect all lines until we close the args array
    let fullArgsLine = argsLine
    while (braceCount > 0 && argsStartIndex < lines.length - 1) {
      argsStartIndex++
      const nextLine = lines[argsStartIndex].trim()
      fullArgsLine += ' ' + nextLine
      braceCount += (nextLine.match(/\[/g) || []).length
      braceCount -= (nextLine.match(/\]/g) || []).length
    }

    // Extract args array content
    const argsMatch = fullArgsLine.match(/args:\s*\[([^\]]*(?:\[[^\]]*\][^\]]*)*)\]/)
    if (!argsMatch) {
      continue
    }

    const argsContent = argsMatch[1]
    const args = parseArgsArray(argsContent)

    // Find the SDK method name by looking backwards for "public async" or "public"
    // Search up to 200 lines back to find the method declaration
    let sdkFunctionName = 'unknown'
    for (let j = i; j >= Math.max(0, i - 200); j--) {
      // Match: public async methodName( or public methodName( or public async methodName({
      const methodMatch = lines[j].match(/public\s+(?:async\s+)?(\w+)\s*[\({]/)
      if (methodMatch) {
        sdkFunctionName = methodMatch[1]
        break
      }
    }

    // Parse args with type detection
    const argsWithTypes = args.map(parseArgWithType)

    calls.push({
      fileName,
      functionName: sdkFunctionName,
      contractFunction,
      args,
      argsWithTypes,
      line: i + 1, // 1-indexed
      rawCall: fullArgsLine,
    })
  }

  return calls
}

/**
 * @description Parse arguments array content into individual arguments
 */
function parseArgsArray(argsContent: string): string[] {
  const args: string[] = []
  let currentArg = ''
  let bracketDepth = 0
  let parenDepth = 0

  for (const char of argsContent) {
    if (char === '[' || char === '(') {
      bracketDepth += char === '[' ? 1 : 0
      parenDepth += char === '(' ? 1 : 0
      currentArg += char
    } else if (char === ']' || char === ')') {
      bracketDepth -= char === ']' ? 1 : 0
      parenDepth -= char === ')' ? 1 : 0
      currentArg += char
    } else if (char === ',' && bracketDepth === 0 && parenDepth === 0) {
      args.push(currentArg.trim())
      currentArg = ''
    } else {
      currentArg += char
    }
  }

  if (currentArg.trim()) {
    args.push(currentArg.trim())
  }

  return args
}

/**
 * @description Parse individual argument to determine if it's hardcoded zero or a variable
 */
function parseArgWithType(argValue: string): ArgWithType {
  const trimmed = argValue.trim()

  // Check for hardcoded zero values
  const isHardcodedZero =
    trimmed === 'BigInt(0)' || trimmed === '0' || trimmed === '0n' || trimmed === 'BigInt(0n)'

  // Check if it's a variable (not a function call or literal)
  const isVariable =
    !trimmed.includes('(') &&
    !trimmed.includes(')') &&
    !trimmed.startsWith('BigInt') &&
    !/^\d+$/.test(trimmed) &&
    !trimmed.startsWith("'") &&
    !trimmed.startsWith('"')

  // Extract variable name if it's a simple identifier
  const variableName = isVariable ? trimmed : undefined

  return {
    value: trimmed,
    isHardcodedZero,
    isVariable,
    variableName,
  }
}

/**
 * @description Find calls where slippage params are hardcoded to zero
 */
export function findHardcodedSlippageCalls(calls: SDKCall[]): Array<{
  call: SDKCall
  paramIndex: number
  paramName?: string
}> {
  const hardcodedCalls: Array<{
    call: SDKCall
    paramIndex: number
    paramName?: string
  }> = []

  // Common slippage parameter positions by function name
  const slippageParamPositions: Record<string, number[]> = {
    // IFloor_v1 / IBC_Discrete_Redeeming_VirtualSupply_v1
    buy: [1], // buy(uint amount_, uint minAmountOut_)
    buyFor: [2], // buyFor(address receiver_, uint amount_, uint minAmountOut_)
    sell: [1], // sell(uint amount_, uint minAmountOut_)
    sellTo: [2], // sellTo(address receiver_, uint amount_, uint minAmountOut_)

    // ICreditFacility_v1
    buyAndBorrow: [3], // buyAndBorrow(uint amount_, uint loops_, bool consolidate_, uint minAmountOut_)
    buyAndBorrowFor: [4], // buyAndBorrowFor(address, uint, uint, bool, uint minAmountOut_)

    // IPresale_v1
    buyPresale: [1], // buyPresale(uint deposit_, uint minAmountOut_)
    buyPresaleWithLoops: [2], // buyPresaleWithLoops(uint deposit_, uint loopCount_, uint minAmountOut_)
  }

  for (const call of calls) {
    const expectedPositions = slippageParamPositions[call.contractFunction]
    if (!expectedPositions) {
      continue
    }

    for (const pos of expectedPositions) {
      if (call.argsWithTypes[pos]?.isHardcodedZero) {
        hardcodedCalls.push({
          call,
          paramIndex: pos,
        })
      }
    }
  }

  return hardcodedCalls
}
