import { Schema } from 'effect'

// ----------------------------------------------------------------------------
// ROLE

export const UserRoleSchema = Schema.Literal('USER', 'ADMIN', 'SUPER').annotations({
  title: 'UserRole',
  description: 'User role enumeration defining access levels in the system',
})

export type UserRole = typeof UserRoleSchema.Type

// ----------------------------------------------------------------------------
// API

export const ApiSecretSchema = Schema.Struct({
  title: Schema.String,
  secret: Schema.String,
  createdAt: Schema.Date,
  updatedAt: Schema.Date,
}).annotations({
  title: 'ApiSecret',
  description: 'API secret configuration for user authentication',
  examples: [
    {
      title: 'Production API Key',
      secret: 'sk_live_abc123...',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ],
})

export type ApiSecret = typeof ApiSecretSchema.Type

// ----------------------------------------------------------------------------
// USER

export const UserSchema = Schema.Struct({
  role: UserRoleSchema.annotations({
    description: "User's role in the system (USER, ADMIN, or SUPER)",
  }),

  // EVM
  address: Schema.String.annotations({
    description: 'Ethereum/EVM wallet address',
  }),

  // Infra
  api_secrets: Schema.Array(ApiSecretSchema).annotations({
    description: 'Array of API secrets for authentication',
  }),
  web_hook_url: Schema.optional(Schema.String).annotations({
    description: 'Webhook URL for notifications and callbacks',
  }),
  createdAt: Schema.Date.annotations({
    description: 'Timestamp when user was created',
  }),
  updatedAt: Schema.Date.annotations({
    description: 'Timestamp when user was last updated',
  }),
}).annotations({
  title: 'User',
  description: 'User model used in the database',
})

export type User = typeof UserSchema.Type
