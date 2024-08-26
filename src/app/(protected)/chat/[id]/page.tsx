'use client'

import { Message, useChat } from 'ai/react'
import ToolCallCard from '@/components/ToolExecutionCard'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  })
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(/Mac/i.test(navigator.userAgent))
  }, [])

  const shortcutText = isMac ? '⌘ ↵' : 'Ctrl ⏎'
  const isLoading = (message: Message) => {
    if (!message.toolInvocations || message.toolInvocations.length === 0) return false;
    return message.toolInvocations.some((invocation) => !invocation || invocation.state === 'call' || invocation.state === 'partial-call');
  }

  const isFailed = (message: Message) => {
    if (!message.toolInvocations || message.toolInvocations.length === 0) return false;
    // 检查是否所有调用都已完成，且至少有一个失败
    const allCompleted = message.toolInvocations.every((invocation) => invocation.state === 'result');
    const anyFailed = message.toolInvocations.some((invocation) => invocation.args.error);
    return allCompleted && anyFailed;
  }


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>

              <p>
                {m.content.length > 0 ? (
                  m.content
                ) : (
                  <span className="flex items-center italic font-light">
                    <ToolCallCard
                      isLoading={isLoading(m)}
                      isFailed={isFailed(m)}
                      toolName={m?.toolInvocations?.[0]?.toolName}
                    />
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      
        
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md p-2 mb-8 rounded">
        <div className="relative w-full">
          <Textarea
            name="input"
            rows={1}
            placeholder="想问点什么..."
            value={input}
            className="resize-none w-full min-h-12 max-h-48 rounded-lg bg-gray-100 border border-gray-300 pl-4 pr-16 pt-3 pb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button 
            type="submit" 
            variant="secondary" 
            size="sm" 
            disabled={input.length === 0}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 border border-gray-400 hover:bg-gray-100 text-gray-700 rounded-md shadow-sm"
          >
            <span className="ml-1 text-xs text-gray-500">{shortcutText}</span>
          </Button>
        </div>
      </form>
    </div>
  )
}