'use server'

import { RegisterSchema } from '@/schemas'
import * as z from 'zod'

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values)


  if (!validatedFields.success) {
    return { error: '请检查你的账号密码' }
  }
  return { success: '邮箱已发送' }
}
