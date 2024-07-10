
// import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import * as schema from './schema'

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
// })

// ;async () => await client.connect()

// export const db = drizzle(client, { schema })
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);