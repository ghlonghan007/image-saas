import NextAuth from 'next-auth'

import { DrizzleAdapter } from '@auth/drizzle-adapter'
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from '@/server/db/schema'
import { db } from '@/server/db/db'
import Credentials from 'next-auth/providers/credentials'
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from '@/utils/password'
import authConfig from './auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: 'jwt' },
  ...authConfig,
})
