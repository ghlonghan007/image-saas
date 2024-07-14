'use client'
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


interface LoginButtonProps {
  children: React.ReactNode
  model?: 'modal'|'redirect'
  asChild?: boolean
}


export const LoginButton = ({ children, model, asChild }:LoginButtonProps) => {
  const router = useRouter()  
  const onclick = () => {
    console.log('clicked')
    if (model ==='modal') {
      router.push('/auth/login')
    } else {
      signIn('credentials', { callbackUrl: '/' })
    }
  }

  if (asChild) {
    return (
      <span onClick={onclick}>{children}</span>
    )
  }
  return (
    <span onClick={onclick}>{children}</span>
  )
}