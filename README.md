## Overview

## Architecture

Authentication is handled using `bcrypt` and a JWT Token. 

## Tech Stack
Next.js 
Shadcn 

NestJS
Prisma
Postgres
Stripe Payments
Redis Caching

## Features

## Local Development

### Database
1. `docker exec -it api pnpm prisma:generate`
2. `docker exec -it api pnpm prisma:migrate`
3. `docker exec -it api pnpm db:populate`

To view the contents of the database
`DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecommerce pnpm prisma studio`

To reset the database
`docker exec -it api pnpm prisma migrate reset`

## Background Jobs

## Stripe Webhooks

## Deployment
Frontend is deployed on vercel
Server is deployed on Azure
Database is managed using Prisma

## Testing
