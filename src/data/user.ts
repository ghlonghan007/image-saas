import { db } from '@/server/db/db'
import { users } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email))
    return user[0]
  } catch (error) {
    console.log(error)
    return null
  }
}
