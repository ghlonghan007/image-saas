'use client'

import { Message, useChat } from 'ai/react'
import ToolCallCard from '@/components/ToolExecutionCard'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  })

  const isLoading = (message: Message) => {
    if (!message.toolInvocations) return false
    // Example logic, modify according to your actual loading state handling
    return message.toolInvocations?.some((invocation) => !invocation)
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
                    {/* {'calling tool: ' + m?.toolInvocations?.[0]?.toolName} */}
                    <ToolCallCard
                      isLoading={isLoading(m)}
                      toolName={m?.toolInvocations?.[0]?.toolName}
                    />
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md p-2 mb-8  rounded">
            <div className="relative flex items-center w-full">
              <Textarea
                name="input"
                rows={1}
                placeholder="想问点什么..."
                value={input}
                className="resize-none w-full min-h-12 rounded-lg bg-gray-100 border border-gray-300 pl-4 pr-10 pt-3 pb-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
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
    </div>
  )
}
