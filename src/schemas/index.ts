

import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('请数据正确的邮箱'),
  password: z.string().min(1,"请输入正确的密码"),
});