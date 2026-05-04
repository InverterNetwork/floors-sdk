import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

const basePlugins = {
  prettier: prettier,
  'simple-import-sort': simpleImportSort,
}

const baseRules = {
  'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
  'prettier/prettier': 'error',
}

// Tier-flow guard: SDK root must not pull in React (client/) or Node-only (server/) code.
// `client/` may type-only import from `server/` — runtime imports across that boundary are forbidden.
//
// Patterns only match cross-directory imports (need `../`) so intra-directory `./client` files
// inside `graphql/` (which has its own `client.ts`) are not flagged.
const tierGuardRoot = {
  files: ['src/**/*.{ts,tsx}'],
  ignores: ['src/client/**', 'src/server/**', 'src/index.ts'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../client', '../client/*', '../../client', '../../client/*'],
            message:
              'SDK root tier must not import from `client/`. Move shared code to root or invert the dependency.',
          },
          {
            group: ['../server', '../server/*', '../../server', '../../server/*'],
            message:
              'SDK root tier must not import from `server/`. Move shared code to root or invert the dependency.',
          },
        ],
      },
    ],
  },
}

const tierGuardClient = {
  files: ['src/client/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../server', '../server/*', '../../server', '../../server/*'],
            message:
              'SDK client/ may only `import type` from server/ — runtime imports would bundle Node-only code into the browser.',
            allowTypeImports: true,
          },
        ],
      },
    ],
  },
}

export default defineConfig([
  globalIgnores(['dist/**', 'node_modules/**', 'contracts/**', 'src/graphql/gen/**']),
  // JavaScript/Config files (no TypeScript parser)
  {
    files: ['**/*.{mjs,cjs,js}'],

    plugins: basePlugins,

    rules: baseRules,
  },
  // TypeScript files
  {
    files: ['**/*.{ts,tsx,jsx}'],

    plugins: {
      ...basePlugins,
      '@typescript-eslint': tseslint.plugin,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },

    rules: {
      ...baseRules,

      // TypeScript rules
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
    },
  },
  tierGuardRoot,
  tierGuardClient,
])
