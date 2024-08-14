import { createResource } from '@/lib/actions/resources'
import { ollama } from 'ollama-ai-provider'
import { convertToCoreMessages, streamText, tool } from 'ai'
import { z } from 'zod'
import { findRelevantContent } from '@/lib/ai/embedding'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30
import { createOpenAI } from '@ai-sdk/openai'
import { auth } from '@/auth'

const openai = createOpenAI({
  // custom settings, e.g.
  baseURL: 'https://api.pro365.top/v1',
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    // model: ollama('llama3.1'),
    model: openai('gpt-3.5-turbo'),
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
    messages: convertToCoreMessages(messages),
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z
            .string()
            .describe('the content or resource to add to the knowledge base'),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe('the users question'),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  })

  return result.toDataStreamResponse()
}
