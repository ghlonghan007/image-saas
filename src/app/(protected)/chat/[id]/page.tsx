'use client'

import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Textarea from 'react-textarea-autosize';
import { useRef } from 'react';


export interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  });
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch ">
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
                  {'calling tool: ' + m?.toolInvocations?.[0]?.toolName}
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
  );
}