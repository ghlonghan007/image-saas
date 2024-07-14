import GitHubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import GitLabProvider from 'next-auth/providers/gitlab'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export default {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GitLabProvider({
      clientId: process.env.AUTH_GITLAB_ID,
      clientSecret: process.env.AUTH_GITLAB_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) return null
          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
