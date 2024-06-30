'use client'

import { LoginButton } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


const font = {
  fontFamily: 'Poppins, sans-serif',
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-orange-400 to-gray-400">
      <div className="space-x-6">
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.fontFamily
          )}
        >
          Auth
        </h1>
      </div>
      <LoginButton>
        <Button variant="secondary" size={'lg'}> Sign in</Button>
      </LoginButton>
    </main>
  )
}
