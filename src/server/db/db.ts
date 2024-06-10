import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import * as schema from './schema'

const client = new Client({
  connectionString: 'postgres://postgres:1qaz2wsx@localhost:5432/postgres',
})


await client.connect()
export const db = drizzle(client, { schema })
