'use client'

import { LoginButton } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { ArrowRight } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { auth } from '@/auth'
import { generateId } from 'ai'

import Textarea from 'react-textarea-autosize'
import { useRef, useState } from 'react'
const font = {
  fontFamily: 'Poppins, sans-serif',
}

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [input, setInput] = useState('')
  


  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // const session = await auth()
    const id =generateId()
    console.log(id)
    router.push(`/chat/${id}`)
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-orange-400 to-gray-400">
      <div className="space-x-6">
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.fontFamily
          )}
        >
          hi,你想问点什么？
        </h1>
        <div className="fixed bottom-8 left-0 right-0 mx-auto flex flex-col items-center">
<<<<<<< HEAD
      <form onSubmit={handleSubmit} className="max-w-2xl w-full px-6">
        <div className="relative flex items-center w-full">
          <Textarea
            name="input"
            rows={1}
            maxRows={5}
            placeholder="Ask a question..."
            value={input}
            className="resize-none w-full min-h-12 rounded-lg bg-gray-100 border border-gray-300 pl-4 pr-10 pt-3 pb-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            disabled={input.length === 0}
          >
            <ArrowRight size={20} />
          </Button>
=======
          <form onSubmit={handleSubmit} className="max-w-2xl w-full px-6">
            <div className="relative flex items-center w-full">
              <Textarea
                ref={inputRef}
                name="input"
                rows={1}
                maxRows={5}
                placeholder="Ask a question..."
                value={input}
                className="resize-none w-full min-h-12 rounded-lg bg-gray-100 border border-gray-300 pl-4 pr-10 pt-3 pb-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                disabled={input.length === 0}
              >
                <ArrowRight size={20} />
              </Button>
            </div>
          </form>
>>>>>>> 57ad6b1 (用户问答自己的数据库)
        </div>
      </div>
    </main>
  )
}
