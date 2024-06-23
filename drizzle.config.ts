import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    host: 'pgm-2vchltj7nw3lhp6dyo.rwlb.cn-chengdu.rds.aliyuncs.com',
    port: 5432,
    database: 'mydb',
    user: 'longhan',
    password: '1qaz_2wsx',
    ssl: false
  },
  verbose: true,
  strict: true,
})
