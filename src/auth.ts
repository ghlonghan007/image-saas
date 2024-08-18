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
  // callbacks: {
  //   async jwt({ token }) {
 

  //     if (!token.sub) return token
  //     const existingUser = await getUserByid(token.sub)
  //     if (!existingUser) return token
  //     token.role = existingUser.role
      
  //     return token
  //   },
  //   async session({ session, token}) {
      
  //     if (token.sub&&session.user) session.user.id = token.sub
  //     if (token.role&&session.user) session.user.role = token.role 
  //     console.log('session', session);
  //     console.log('jwt', token);
  //     return session
  //   },}
})
