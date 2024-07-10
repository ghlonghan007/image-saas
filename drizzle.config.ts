import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: './src/server/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:iE4BQeS9lUZo@ep-rapid-lake-a1y9s05j.ap-southeast-1.aws.neon.tech/mydb?sslmode=require',
    // host: 'postgresql://neondb_owner:iE4BQeS9lUZo@ep-rapid-lake-a1y9s05j.ap-southeast-1.aws.neon.tech/mydb?sslmode=require',
    // port: 5432,
    // database: 'mydb',
    // user: 'longhan',
    // password: '1qaz_2wsx',
    // ssl: false
  },
  verbose: true,
  strict: true,
})
