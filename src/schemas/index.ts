import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('请数据正确的邮箱'),
  password: z.string().min(1, '请输入正确的密码'),
})

export const RegisterSchema = z.object({
  email: z.string().email('请数据正确的邮箱'),
  password: z.string().min(6, '最少输入6位字符'),
  name: z.string().min(6, '最少输入6位字符'),
})
