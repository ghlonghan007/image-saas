## Getting Started

shadcn-ui https://ui.shadcn.com/

postgres:

```shell
 docker run -d \
        --name image-saas-postgres \
        -p 5432:5432 \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=1qaz2wsx \
        -e PGDATA=/var/lib/postgresql/data/pgdata \
        -v /pg/mount:/var/lib/postgresql/data \
        postgres
```

Drizzle ORM
pnpm add drizzle-orm postgres
pnpm add drizzle-orm pg
pnpm add -D drizzle-kit
drizzle-kit push
pnpm drizzle-kit studio

next-auth
https://authjs.dev/getting-started/session-management/login