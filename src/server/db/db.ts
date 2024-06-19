
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import * as schema from './schema'

const client = new Client({
  connectionString:
    'postgres://longhan:1qaz_2wsx@pgm-2vchltj7nw3lhp6dyo.rwlb.cn-chengdu.rds.aliyuncs.com/mydb',
})

;async () => await client.connect()
export const db = drizzle(client, { schema })
