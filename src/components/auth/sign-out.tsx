'use client'
import { Button } from '@/components/ui/button'

import { signOut } from 'next-auth/react'

interface SignOutProps {
  text: string
  className?: string
}

export function SignOut({ text, className }: SignOutProps) {
  return (
    <button onClick={() => signOut()} className={className} >
      {text}
    </button>
  )
}
