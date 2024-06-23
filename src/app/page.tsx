'use client'

import { SignIn } from '@/components/auth/sign-in'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    redirect("/dashboard")

  }
  return (
    <div>
      <SignIn></SignIn>
    </div>
  )
}


