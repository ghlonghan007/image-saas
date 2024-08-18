import NextAuth from 'next-auth'

import { DrizzleAdapter } from '@auth/drizzle-adapter'
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from '@/server/db/schema'
import { db } from '@/server/db/db'

import authConfig from '@/auth.config'

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
  callbacks: {
    async jwt({ token }) {
      token.customField = 'custom value'
      return token
    },
    async session({ session, token}) {
      if (token.sub&&session.user) session.user.id = token.sub
      if (token.role&&session.user.role) session.user.role = token.sub
      
      return session
    },}
})
