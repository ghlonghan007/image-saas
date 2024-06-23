'use client'

<<<<<<< HEAD
import { SignIn } from '@/components/auth/sign-in'

import { SignOut } from '@/components/auth/sign-out'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session)
  if (!session) {
    return (
      <div>
    <SignIn></SignIn>

    </div>
  )
  }
  return (
    <div className="h-screen flex  justify-center flex-col items-center">
      <form className="w-full max-w-md flex flex-col gap-4">
        <h1 className="text-center text-2xl font-bold">Create App</h1>
        <Input name="name" placeholder="App Name"></Input>
        <Textarea name="description" placeholder="Description"></Textarea>
        <Button type="submit">Submit</Button>

      </form>
      {session?.user?.name && (
      <div className="mt-4 flex items-center space-x-4">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Avatar>
            {session.user.image ? (
              <AvatarImage src={session.user.image} />
            ) : (
              <AvatarFallback>{session.user.name[0].toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
      </div>
    )}
    <div className="mt-2"><SignOut></SignOut></div>
    </div>
    
  )
}
=======
export default function Page() {
    return <p>Dashboard Page</p>;
  }


// ai chatbot
>>>>>>> ce94ed60f3fe88dfa8d03b484c6bc37dffed376a
