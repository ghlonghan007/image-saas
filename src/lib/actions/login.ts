'use server'

import { LoginSchema } from '@/schemas'
import * as z from 'zod'

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)


  if (!validatedFields.success) {
    return { error: '请检查你的账号密码' }
  }
  return { success: '登入成功' }
}
