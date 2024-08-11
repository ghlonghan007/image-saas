'use server';

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from '@/server/db/schema';

import { db } from '@/server/db/db';
import { generateEmbeddings } from '@/lib/ai/embedding';
import { embeddings as embeddingsTable } from '@/server/db/schema';

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = insertResourceSchema.parse(input);
    console.log('content', content);
    const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();
    console.log('resource', resource);
    const embeddings = await generateEmbeddings(content);
    console.log('embeddings', embeddings);
    await db.insert(embeddingsTable).values(
      embeddings.map(embedding => ({
        resourceId: resource.id,
        ...embedding,
        
      })),
    );
    

    return 'Resource successfully created and embedded.';
  } catch (error) {
    console.log('error', error);

    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};