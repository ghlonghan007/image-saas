'use server'

import { RegisterSchema } from '@/schemas'
import { get } from 'http'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/server/db/db'

import { users } from '@/server/db/schema'
import { getUserByEmail } from '@/data/user'
export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: '请检查你的账号密码' }
  }
  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  const existsEmail = await getUserByEmail(email)

  if (existsEmail) {
    return { error: '邮箱已被人注册了!' }
  }
  
  await db
    .insert(users)
    .values({ email: email, password: hashedPassword, name: name })
  return { success: '用户已创建' }
}
