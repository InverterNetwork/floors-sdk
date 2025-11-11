import { Schema } from 'effect'

import { UserSchema } from './user.schema'

// Base session schema
const BaseSession = Schema.Struct({
  mongo_id: Schema.String,
  status: Schema.Union(
    Schema.Literal('authenticated'),
    Schema.Literal('unauthenticated'),
    Schema.Literal('loading')
  ),
  ...UserSchema.pick('role').fields,
}).annotations({ description: 'Base session' })

// Combined session type
export const Session = Schema.Struct({
  ...BaseSession.fields,
  ...UserSchema.pick('address').fields,
}).annotations({
  description: 'Session response - Combines all session types',
})

export const AuthenticatedSession = Schema.Struct({
  ...Session.fields,
  status: Schema.Literal('authenticated'),
}).annotations({ description: 'Authenticated session response' })
