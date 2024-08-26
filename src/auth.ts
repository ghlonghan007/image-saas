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
import { getuid } from 'process'
import { getUserByid } from './data/user'
import { eq } from 'drizzle-orm'

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
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    linkAccount: async ({ user }) => {
      if (!user.id) return
      await db.update(users).set({ emailVerified: new Date() }).where(eq(users.id, user.id))
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserByid(token.sub)
      if (!existingUser) return token
      token.role = existingUser.role
      
      return token
    },
    async session({ session, token}) {
      
      if (token.sub&&session.user) session.user.id = token.sub
      if (token.role&&session.user) session.user.role = token.role 
      return session
    },}
})
