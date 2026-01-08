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
1. `pnpm prisma:generate`
2. `pnpm prisma:migrate`
3. `pnpm db:populate`

To view the contents of the database
`pnpm prisma studio`

To reset the database
`pnpm prisma migrate reset`

## Background Jobs

## Stripe Webhooks

## Deployment
Frontend is deployed on vercel
Server is deployed on Azure
Database is managed using Prisma

## Testing
