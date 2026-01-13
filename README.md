## Overview

## Architecture
Authentication is handled via a Refresh Token and JWT token. Passwords are hashed with `bcrypt`. 

## Tech Stack

### Frontend
Next.js 
Shadcn 

### Backebd
NestJS
Prisma
PostgreSQL
Stripe Payments
Redis Caching

## Features
Cart
Login
Payments

## Local Development

### Database
1. `pnpm db:seed:dev`

To view the contents of the database
`DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecommerce pnpm prisma studio`

To reset the database
`pnpm: db:dev:reset`

## Background Jobs

## Stripe Webhooks

## Deployment
Frontend is deployed on vercel
Server is deployed on Azure
Database is managed using Prisma

## Testing

### Tooling
Prettier
Eslint
