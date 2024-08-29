import { createResource } from '@/lib/actions/resources'
import { ollama } from 'ollama-ai-provider'
import { convertToCoreMessages, streamText, tool } from 'ai'
import { z } from 'zod'
import { findRelevantContent } from '@/lib/ai/embedding'
import { createOpenAI } from '@ai-sdk/openai'
import { auth } from '@/auth'
// 允许流式响应最多30秒
export const maxDuration = 30


const openai = createOpenAI({
  // 自定义设置，例如
  baseURL: 'https://api.pro365.top/v1',
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict', // 严格模式，使用OpenAI API时启用
})


import { generateText } from 'ai';


// 检查大模型连接状态的函数
async function checkModelConnection() {
  try {
    const text = await  generateText({
      model: openai('gpt-4-turbo'),
      prompt: 'ping',
    });
    console.log('大模型连接成功:pong')
    return true
  } catch (error) {
    console.error('大模型连接失败:', error)
    return false
  }
}
export async function POST(req: Request) {
  const { messages } = await req.json()
  
<<<<<<< HEAD
  // 检查大模型连接
  await checkModelConnection()
=======


>>>>>>> 6d08677 (ui修改)

  
  const result = await streamText({
    // model: ollama('llama3.1'),
    model: openai('gpt-3.5-turbo'),
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls."`,
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
<<<<<<< HEAD
}

=======
}
>>>>>>> 6d08677 (ui修改)
