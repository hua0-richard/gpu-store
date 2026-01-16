# Compute Billing Platform

Production-grade full-stack application featuring secure authentication, Stripe payments, background jobs, and modern frontend architecture.

---

## 📌 Overview
This project demonstrates an end-to-end web application with authentication, payments, and asynchronous processing, built using modern TypeScript-based tooling across the stack.

---

## Quick Start Local
1. `docker compose up`
2. `pnpm db:seed:dev`
3. `http://localhost:3000/`

## 🏗 Architecture
- **Authentication**: JWT access tokens with refresh tokens with multiple sessions
- **Security**: Password and Refresh token hashing using `bcrypt`
- **Payments**: Stripe Checkout with webhook-driven state updates
- **Background Jobs**: Redis-backed async processing
- **Data Layer**: Prisma ORM with PostgreSQL

---

## 🧰 Tech Stack

### Frontend
- **Next.js**
- **shadcn/ui**
- **TypeScript**

### Backend
- **NestJS**
- **Prisma**
- **PostgreSQL**
- **Stripe**
- **Redis**

---

## ✨ Core Features
- User authentication (login, refresh, logout)
- Shopping cart
- Secure Stripe payments
- Webhook-driven payment lifecycle
- Background job processing

---

## 🔄 Key Engineering Highlights
- Designed **token-based auth** with refresh tokens
<!-- - Implemented **Stripe webhooks** with signature verification and idempotency -->
<!-- - Built **Redis-backed job processing** for non-blocking workflows -->
- Enforced **clear service boundaries** in a NestJS architecture
- Used **Prisma migrations** for safe schema evolution

## 🧪 Local Development

### Database

Seed the database:
```bash
pnpm db:seed:dev
```

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecommerce pnpm prisma studio --port=5555
```

```bash
pnpm db:dev:reset
```
Enable Stripe webhooks locally using the Stripe CLI:
```
stripe listen --forward-to localhost:3001/webhooks/stripe
```
Could be required
```
stripe login
```

## CI / CD
Frontend is deployed on vercel

### Notes
Useful Test Billing Info

Card number: 4242 4242 4242 4242
Expiry: any future date (e.g., 12/34)
CVC: any 3 digits (e.g., 123)
ZIP/postal: any (e.g., 12345)