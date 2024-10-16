# Paterna (dads social) (WIP)

A social network focused on dads, whom are some of the most loneliest and forgotten bunch. Encourage frienships, meetups and seeking mental health support.

The app is mostly server side rendered, we use tansatack query for most queries and mutations, but these queries are prefetched on server, and are hydrated on client.

**The Stack**

- Next
- React
- Tailwind
- Tanstack query
- Shadcn ui
- Resend (magic link emails for handling authentication)
- Supabase
- Postgresql

## Setup

```bash
pnpm install
```

### Environment variables

- Copy `.env.example` and rename it to `.env`
- Create a [Supabase project](https://supabase.com/dashboard)
  - Copy the `Connection string` in project's database settings
    - Paste this value as `DIRECT_URL`
    - Paste this value as `DATABASE_URL` adding the following to the end: `?pgbouncer=true&connection_limit=1`
    - Ensure you replace `[YOUR-PASSWORD]` with your DB password created in Supabase.
- Create a [Resend API key](https://resend.com/api-keys)

Both `DIRECT_URL` and `DATABASE_URL` should look like this:

```
# Transaction connection pooler string
DATABASE_URL="postgresql://postgres.someusername:somepassword@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Session connection pooler string
DIRECT_URL="postgresql://postgres.someusername:somepassword@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
...
```

```bash
pnpm run dev
```

### Useful scripts (mostly found in package.json)

#### Seeds

It's useful in development to teardown the database and seed it with data to test a particular feature quickly.

You will find `seed.ts` files in `/prisma/` folder.

You can run these like so:

```bash
pnpm run seed
```

```bash
pnpm run seed-send-message
```

#### Clear database

To wipe the database

```bash
pnpm run prisma:clean
```

#### Update database schema + migrations

Edit your `/prisma/schema.prisma` file, then run

```bash
pnpm run prisma:update
```
