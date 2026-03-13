# GPU Store

Full-stack compute billing platform with Stripe payments, JWT auth, webhook processing, and Redis-backed distributed locking.

[![Vercel Status](https://img.shields.io/github/deployments/hua0-richard/gpu-store/Production?label=Vercel&logo=vercel&logoColor=white&style=flat&labelColor=0a0a0a)](https://vercel.com)
[![Azure Deploy](https://custom-icon-badges.demolab.com/github/actions/workflow/status/hua0-richard/gpu-store/ci-cd.yml?style=flat&label=Azure+Deploy&logo=msazure&logoColor=white&labelColor=0a0a0a&cacheSeconds=60)](https://github.com/hua0-richard/gpu-store/actions/workflows/ci-cd.yml)
[![Neon DB](https://img.shields.io/endpoint?url=https%3A%2F%2Fgpu-store-api.gentlemoss-10838ef4.eastus2.azurecontainerapps.io%2Fhealth-check%2Fbadge%2Fdb&style=flat&v=1&logo=data:image/svg%2Bxml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjMgMC4wMTc3OTA5VjYzLjU1MjZMMzguNDE3OCA0Mi4yNTAxVjYzLjU1MjZIMFYwTDYzIDAuMDE3NzkwOVpNNy43MjI1MSA1NS44Mzg5SDMwLjY5NTNWMjUuMzIzOEw1NS4yNzc5IDQ3LjA0NzZWNy43MjkyMkw3LjcyMjUxIDcuNzE1NTlWNTUuODM4OVoiIGZpbGw9IndoaXRlIi8+PC9zdmc+&logoColor=white&labelColor=0a0a0a)](https://neon.tech)
[![Azure Cache](https://img.shields.io/endpoint?url=https%3A%2F%2Fgpu-store-api.gentlemoss-10838ef4.eastus2.azurecontainerapps.io%2Fhealth-check%2Fbadge%2Fredis&style=flat&v=1&logo=redis&logoColor=white&labelColor=0a0a0a)](https://azure.microsoft.com/products/cache)

---

![Demo](demo.gif)

## Demo Access

Log in with the test account to explore the full purchase flow without a real payment.

> Test account

| Field    | Value              |
| -------- | ------------------ |
| Email    | `demo@gpustore.dev` |
| Password | `Demo1234!`        |

---

## Architecture

Next.js frontend on Vercel, NestJS API on Azure Container Apps, PostgreSQL (Neon) for persistence, and Redis for distributed locking.

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#0b1020",
    "mainBkg": "#0b1020",
    "primaryTextColor": "#ffffff",
    "textColor": "#ffffff",
    "labelBackground": "rgba(0,0,0,0)",
    "edgeLabelBackground": "rgba(0,0,0,0)",
    "edgeLabelBorder": "rgba(0,0,0,0)",
    "edgeLabelBorderWidth": "0",
    "edgeLabelColor": "#ffffff",
    "lineColor": "#94a3b8",
    "clusterBkg": "#0b1020",
    "clusterBorder": "#334155",
    "clusterLabelColor": "#ffffff"
  }
} }%%

flowchart LR
    User(["Customer Browser<br/>(Client)"])

    subgraph Frontend["▲ Vercel — Frontend"]
        direction TB
        Web["Next.js Storefront<br/>(SSR / Edge Network)"]
    end

    subgraph Backend["☁ Azure Container Apps — Backend"]
        direction TB
        API["NestJS API<br/>(Business Logic)"]
        Auth["Auth Module<br/>(JWT + Refresh Sessions)"]
    end

    subgraph Data["Data (State)"]
        direction TB
        DB[("Neon<br/>(PostgreSQL)")]
        Redis[("Azure Cache<br/>(Redis)")]
    end

    subgraph External["External (Payments)"]
        direction TB
        Stripe["Stripe<br/>(Payment Processor)"]
    end

    L_User_Web["HTTPS / User Actions"]
    L_Web_API["REST API / JSON + Auth Cookies"]
    L_API_DB["Prisma ORM"]
    L_API_Redis["Event Idempotency Lock"]
    L_API_Auth["Auth Endpoints / JWT"]
    L_Auth_DB["Users + Refresh Sessions"]
    L_API_Stripe["Webhooks / Events"]
    L_Web_Stripe["Checkout Redirect"]
    L_API_Checkout["Create Checkout Session"]

    User --> L_User_Web --> Web
    Web --> L_Web_API --> API
    Web --> L_API_Checkout --> API
    API --> L_API_Auth --> Auth --> L_Auth_DB --> DB
    API --> L_API_DB --> DB
    API --> L_API_Redis --> Redis
    API <--> L_API_Stripe <--> Stripe
    Web --> L_Web_Stripe --> Stripe

    classDef neutral fill:#111827,stroke:#334155,color:#ffffff;
    classDef next fill:#111111,stroke:#ffffff,color:#ffffff;
    classDef nest fill:#3f1d2a,stroke:#fb7185,color:#ffffff;
    classDef neon fill:#002b1f,stroke:#00e599,color:#ffffff;
    classDef azurecache fill:#0c2340,stroke:#50abf1,color:#ffffff;
    classDef stripe fill:#2b1b4b,stroke:#a78bfa,color:#ffffff;
    classDef edgeText fill:transparent,stroke:transparent,color:#cbd5f5;

    class User neutral;
    class Web next;
    class API,Auth nest;
    class DB neon;
    class Redis azurecache;
    class Stripe stripe;
    class L_User_Web,L_Web_API,L_API_DB,L_API_Redis,L_API_Auth,L_Auth_DB,L_API_Stripe,L_Web_Stripe,L_API_Checkout edgeText;

    style Frontend fill:#0a0a0a,stroke:#ffffff,color:#ffffff,stroke-width:1px
    style Backend fill:#001529,stroke:#0078d4,color:#ffffff,stroke-width:1px
    style Data fill:#0f172a,stroke:#334155,color:#ffffff,stroke-width:1px
    style External fill:#0f172a,stroke:#334155,color:#ffffff,stroke-width:1px

    linkStyle default stroke:#94a3b8,stroke-width:1.5px
```

## Stack

Technologies used across the frontend, backend, and infrastructure.

| Layer         | Technology                                |
| ------------- | ----------------------------------------- |
| Frontend      | Next.js, shadcn/ui, TypeScript            |
| Backend       | NestJS, Prisma, TypeScript                |
| Database      | PostgreSQL (Neon)                         |
| Cache / Locks | Redis (Azure Cache)                       |
| Payments      | Stripe                                    |
| Hosting       | Vercel (web), Azure Container Apps (API)  |
| CI/CD         | GitHub Actions → Azure Container Registry |

## Features

What the app does end-to-end.

- JWT auth with refresh token rotation and multi-session support
- Shopping cart with Stripe Checkout
- Webhook-driven payment lifecycle with signature verification and idempotency
- Redis distributed locking for concurrent payment events
- Prisma migrations for schema evolution

---

## Key Engineering Highlights

- **Duplicate webhook protection with Redis locking** — Stripe can deliver the same payment event more than once. To prevent double-charging or double-provisioning, each event claims an atomic Redis lock on arrival. If the lock is already held, the duplicate is dropped.

- **Payment state driven by webhooks, not redirects** — A checkout redirect only means the user left Stripe's page not that the payment went through. Orders and GPU instances are created only after receiving and verifying a signed webhook from Stripe, so the system reacts to what actually happened.

- **Refresh tokens hashed before storage** — Long-lived refresh tokens are stored as bcrypt hashes rather than plaintext, so a leaked database doesn't expose usable credentials. Same approach as password storage.

---

## Dev Tooling

Monorepo managed with pnpm workspaces. Linting, formatting, and tests run across both apps via root-level scripts.

| Tool          | Purpose                                                    |
| ------------- | ---------------------------------------------------------- |
| pnpm          | Package manager and workspace orchestration                |
| ESLint 9      | Linting with TypeScript-aware rules (flat config)          |
| Prettier      | Code formatting, enforced via lint-staged on commit        |
| Husky         | Pre-commit hook — runs lint-staged before every commit     |
| GitHub Actions | CI pipeline: lint → build → Docker push → Azure deploy   |

---

## Local Development

Runs fully in Docker. Stripe CLI is needed to test payment webhooks locally.

### Prerequisites

- Docker
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (for local webhook testing)

### Quick Start

Starts the full stack and seeds the database with sample data.

```bash
docker compose up
pnpm --filter api db:seed:dev
# open http://localhost:3000
```

### Stripe Webhooks

Forwards Stripe events to your local API so the payment flow works end-to-end.

```bash
stripe listen --forward-to localhost:3001/webhooks/stripe
```

### Test Card

Use this card number to complete a payment in test mode.

```
╔═══════════════════════════════════════╗
║  STRIPE TEST BANK                VISA ║
║                                       ║
║  ▓▓▓ ))                               ║
║                                       ║
║  4242   4242   4242   4242            ║
║  TEST CARDHOLDER   VALID  CVC  ZIP    ║
║                    12/34  123  12345  ║
╚═══════════════════════════════════════╝
```
