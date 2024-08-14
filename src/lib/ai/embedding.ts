import { embed, embedMany } from 'ai'

import { db } from '@/server/db/db'
import { cosineDistance, desc, gt, sql,and } from 'drizzle-orm'
import { embeddings } from '@/server/db/schema'
import { ollama } from 'ollama-ai-provider'
import { createOpenAI } from '@ai-sdk/openai'
import { auth } from '@/auth'
import { getUserByEmail } from '@/data/user'

// const embeddingModel = ollama.embedding('nomic-embed-text');
const openai = createOpenAI({
  // custom settings, e.g.
  baseURL: 'https://api.pro365.top/v1',
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
})
const embeddingModel = openai.embedding('text-embedding-3-small')
const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split('.')
    .filter((i) => i !== '')
}

export const generateEmbeddings = async (
  value: string
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value)
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  })
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }))
}

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\\n', ' ')
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  })
  return embedding
}

export const findRelevantContent = async (userQuery: string) => {
  const session = await auth()
  const user = await getUserByEmail(session?.user?.email||'')
  console.log('user', user?.id);
  if (!user){
    return 'User not found'
  }
  const userQueryEmbedded = await generateEmbedding(userQuery)
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded
  )})`
  const similarGuides = await db
    .select({ name: embeddings.content, similarity })
    .from(embeddings)
    .where(and(sql`${embeddings.userId} = ${user?.id}`,gt(similarity, 0.5)))
    .orderBy((t) => desc(t.similarity))
    .limit(4)
  return similarGuides
}
