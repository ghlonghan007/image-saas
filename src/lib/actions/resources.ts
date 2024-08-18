'use server';

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from '@/server/db/schema';

import { db } from '@/server/db/db';
import { generateEmbeddings } from '@/lib/ai/embedding';
import { embeddings as embeddingsTable } from '@/server/db/schema';
import {  getUserByid } from '@/data/user';
import { auth } from '@/auth';

export const createResource = async (input: NewResourceParams) => {
  const session = await auth()
  const user = await getUserByid(session?.user?.id||'')

  if (!user){
    return 'User not found'
  }

  try {
    const { content } = insertResourceSchema.parse(input);
    const [resource] = await db
      .insert(resources)
      .values({content ,userId: user.id})
      .returning();
    const embeddings = await generateEmbeddings(content);

    await db.insert(embeddingsTable).values(
      embeddings.map(embedding => ({
        resourceId: resource.id,
        userId: user.id,
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