'use client'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { RegisterSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { register } from '@/lib/actions/register'
import { login } from '@/lib/actions/login'
import { useTransition, useState } from 'react'
import { Button } from '../ui/button'

export function RegisterForm() {
  const [isPending, setTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })
/**
 * 提交表单的回调函数
 * @param values 表单的值，类型由RegisterSchema推断
 */
const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
  // 重置错误信息
  setError('')
  // 重置成功信息
  setSuccess('')
  // 设置一个过渡效果，用于表单提交过程中的状态变化
  setTransition(() => {
    // 调用register函数，传入表单值，然后处理注册结果
    register(values).then((data) => {
      // 如果有错误信息，则更新错误状态
      setError(data.error)
      // 如果有成功信息，则更新成功状态
      setSuccess(data.success)
      if (data.success) {
        // 如果成功，重置表单
        login(values)
      }
    })
  })
}
  return (
    <CardWrapper
      headerLabel="Register"
      backButtonLabel="去登入?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="填入你的名称"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="email"
                      placeholder="Email"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="******"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button className='w-full' type="submit" disabled={isPending}>
            创建账号
          </Button>
        </form>
      </Form>
    </CardWrapper> 
  )
}
