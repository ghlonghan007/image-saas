import { Social } from '@/components/auth/social';
'use server'

import { LoginSchema } from '@/schemas'
import { signIn, signOut } from '@/auth'
import * as z from 'zod'
import { DEFAULT_LOGIN_REDACT_PATH } from '@/routes'
import { AuthError } from 'next-auth'

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: '请检查你的账号密码' }
  }
  const { email, password } = validatedFields.data
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDACT_PATH,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        // case 'CredentialsSignin':
        case 'CallbackRouteError':
          return { error: '无效凭证' }
        default:
          return { error: '回调错误' }
      }
    }
    throw error
  }
  return { success: '登入成功' }
}

export async function logout() {
  await signOut()
}

export async function  socialLogin(provider: string) {

  try {
    await signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDACT_PATH,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        // case 'CredentialsSignin':
        case 'CallbackRouteError':
          return { error: '无效凭证' }
        default:
          return { error: '回调错误' }
      }
    }
    throw error
  }
  return { success: '登入成功' }
}