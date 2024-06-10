import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '1qaz2wsx',
    ssl: false
  },
  verbose: true,
  strict: true,
})
