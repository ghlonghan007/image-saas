import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from '@/server/db/schema'
import {db} from '@/server/db/db'

export const {
  handlers: { GET, POST },
} = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
})
