import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDACT_PATH,
  publicRoutes,
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  console.log('isLoggedIn:', isLoggedIn)
  console.log('ROUTER:', req.nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDACT_PATH, nextUrl))
    }
    return
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }
  return
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}