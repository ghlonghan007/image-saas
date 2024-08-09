import { embed, embedMany } from 'ai';

import { db } from '@/server/db/db';
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
import { embeddings } from '@/server/db/embeddings';
import { ollama } from 'ollama-ai-provider';

const embeddingModel = ollama.embedding('nomic-embed-text');
const generateChunks = (input: string): string[] => {
    return input
      .trim()
      .split('.')
      .filter(i => i !== '');
  };


  export const generateEmbeddings = async (
    value: string,
  ): Promise<Array<{ embedding: number[]; content: string }>> => {
    const chunks = generateChunks(value);
    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: chunks,
    });
    return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
  };


  export const generateEmbedding = async (value: string): Promise<number[]> => {
    const input = value.replaceAll('\\n', ' ');
    const { embedding } = await embed({
      model: embeddingModel,
      value: input,
    });
    return embedding;
  };
  
  export const findRelevantContent = async (userQuery: string) => {
    const userQueryEmbedded = await generateEmbedding(userQuery);
    const similarity = sql<number>`1 - (${cosineDistance(
      embeddings.embedding,
      userQueryEmbedded,
    )})`;
    const similarGuides = await db
      .select({ name: embeddings.content, similarity })
      .from(embeddings)
      .where(gt(similarity, 0.5))
      .orderBy(t => desc(t.similarity))
      .limit(4);
    return similarGuides;
  };