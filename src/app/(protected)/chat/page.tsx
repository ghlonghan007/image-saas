'use client';

import { Message, useChat } from 'ai/react';
import ToolCallCard from '@/components/ToolExecutionCard';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  });
  const isLoading = (message: Message) => {
    if (!message.toolInvocations) return false
    // Example logic, modify according to your actual loading state handling
    return message.toolInvocations?.some((invocation) => !invocation)
  }
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map(m => (
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

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}