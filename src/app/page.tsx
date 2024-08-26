'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { generateId } from 'ai'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { auth } from '@/auth'

const font = {
  fontFamily: 'Poppins, sans-serif',
}

export default async function Home() {

  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id = generateId()

    router.push(`/chat/${id}`)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-orange-400 to-gray-400">
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.fontFamily
          )}
        >
          hi,你想问点什么？
        </h1>
        {/* Centered and large button */}
        <div className="flex justify-center">
          <Button
            onClick={() => {
              const id = generateId()
              router.push(`/chat/${id}`)
            }}
            className="text-white bg-black font-bold py-5 px-12 rounded-full flex items-center space-x-3 text-xl"
          >
            <span>开始聊天</span>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="fixed bottom-8 left-0 right-0 mx-auto flex flex-col items-center">
          <form onSubmit={handleSubmit} className="max-w-2xl w-full px-6">
            <div className="relative flex items-center w-full">
              {/* Your form content can go here */}
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
