<div align="center">

[![npm latest package][npm-latest-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![License][license-image]][license-url]
[![npm downloads][npm-downloads-image]][npm-url]
[![Follow on Twitter][twitter-image]][twitter-url]

</div>

## Floor Markets Shared SDK

Type-safe bun-powered TypeScript SDK that bundles Floor Markets ABIs, GraphQL clients, and Effect HttpApi schemas for every Floors Finance app to reuse.

## Summary

This package contains a shared TypeScript SDK used by the Floor Markets project. It bundles
contract ABIs, a generated GraphQL client, Effect HttpApi schemas, and a client-only entry point
with React hooks/providers so frontend consumers can access UI-friendly helpers without pulling
server-only code.

## Package Layout

- `src/index.ts` exports the cross-platform entry point for the SDK and wires together the GraphQL
  client, schema registry, and ABI helpers that other packages consume.
- `src/client/index.ts` re-exports the client-safe React hooks and providers (built on top of the shared
  schemas and GraphQL client) so UI packages can import them without server-only dependencies.
- `src/abis/` hosts the TypeScript bindings for every Solidity contract (factory, module, token,
  etc.) so downstream code can import them without regenerating ABIs.
- `src/graphql/` contains the generated Envio client (`client.ts`), helper constants, subscription
  manager, and the auto-generated `gen/` directory with runtime helpers plus the embedded
  GraphQL schema.
- `src/schemas/` defines the Effect HttpApi schemas (`auth.schema.ts`, `session.schema.ts`, user
  collections, etc.) and re-exports them through `src/schemas/index.ts` for easy registration
  inside `src/api.ts`.

Check out the [Changelog](./CHANGELOG.md) to see what changed in the last releases.

## Error Handling

`handle-error` parses any error thrown by a viem write action into a structured
object with a UI-ready message, category, suggestion, and recovery actions.

```ts
import { getParsedError, isUserRejection, getRecoveryActions } from '@floorsfi/sdk'

// ── basic usage ────────────────────────────────────────────────────────────────
try {
  await market.buy({ depositAmount: 100n * 10n ** 18n })
} catch (error) {
  const parsed = getParsedError({ error })

  if (parsed.isUserRejection) return // user cancelled — silent exit

  // show toast
  toast.error(parsed.prettyMessage)
  // e.g. "Need approval for 100. Current: 0"
  // e.g. "Insufficient balance"
  // e.g. "Not authorized for this action"

  // log structured detail for debugging
  console.error('[tx failed]', {
    errorName: parsed.errorName, // "ERC20InsufficientAllowance"
    signature: parsed.signature, // "0xfb8f41b2"
    category: parsed.category, // "token"
    suggestion: parsed.suggestion, // "Approve the contract to spend your tokens first"
    args: parsed.decodedArgs, // { spender, allowance, needed }
  })
}

// ── recovery actions ───────────────────────────────────────────────────────────
const actions = getRecoveryActions(error)
// [{ label: 'Approve token', type: 'approve_token', primary: true }]

actions.forEach((action) => {
  if (action.type === 'approve_token') showApproveButton()
  if (action.type === 'retry') showRetryButton()
})

// ── convenience guards ─────────────────────────────────────────────────────────
if (isUserRejection(error)) return // wallet rejection
if (isErrorType(error, 'ERC20InsufficientAllowance')) showApproveFlow()
if (isPermissionError(error)) showPermissionBanner()

// ── with a custom ABI (for errors not in the registry) ────────────────────────
const parsed = getParsedError({ error, abi: MyContract.abi })

// ── async 4-byte lookup for completely unknown selectors ───────────────────────
const parsed = await getParsedErrorAsync({ error })
// queries openchain.xyz if the selector is not in the local registry
```

### What gets decoded

| Revert type                         | Example                                   | Decoded via                        |
| ----------------------------------- | ----------------------------------------- | ---------------------------------- |
| Known ERC20 / protocol error        | `ERC20InsufficientAllowance`              | `data` field (selector + ABI args) |
| viem pre-decoded (simulateContract) | any error when ABI is passed to viem      | `cause.data.errorName`             |
| Nested cause chain                  | `ContractFunctionRevertedError.signature` | recursive cause walk               |
| Selector in error message           | `"reverted with 0xfb8f41b2"`              | regex pattern matching             |
| String revert reason                | `require(false, "Market is paused")`      | `cause.reason`                     |
| Custom / project-specific error     | `Market__BuyClosed`                       | custom `abi` param                 |

## Install

```bash
bun add @floorsfi/sdk
```

Install Bun ( bun is the default package manager for this project ( its optional ) ):

```bash
# Supported on macOS, Linux, and WSL
curl -fsSL https://bun.sh/install | bash
# Upgrade Bun every once in a while
bun upgrage
```

## Developing

Install Dependencies:

```bash
bun i
```

Watching TS Problems:

```bash
bun watch
```

Format / Lint / Type Check:

```bash
bun format
bun lint
bun type-check
```

## How to make a release

**For the Maintainer**: Add `NPM_TOKEN` to the GitHub Secrets.

1. PR with changes
2. Merge PR into main
3. Checkout main
4. `git pull`
5. `bun release: '' | alpha | beta` optionally add `-- --release-as minor | major | 0.0.1`
6. Make sure everything looks good (e.g. in CHANGELOG.md)
7. Lastly run `bun release:pub`
8. Done

## License

This package is licensed - see the [LICENSE](./LICENSE.md) file for details.

[ci-image]: https://badgen.net/github/checks/InverterNetwork/floors-sdk/main?label=ci
[ci-url]: https://github.com/InverterNetwork/floors-sdk/actions/workflows/ci.yaml
[npm-url]: https://npmjs.org/package/@floorsfi/sdk
[twitter-url]: https://twitter.com/FloorsFinance
[twitter-image]: https://img.shields.io/twitter/follow/FloorsFinance.svg?label=follow+FloorsFinance
[license-image]: https://img.shields.io/badge/License-Apache%20v2-blue
[license-url]: ./LICENSE.md
[npm-latest-image]: https://img.shields.io/npm/v/@floorsfi/sdk/latest.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/@floorsfi/sdk.svg
