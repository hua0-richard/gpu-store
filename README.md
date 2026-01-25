# Compute Billing Platform

Production-grade full-stack application featuring secure authentication, Stripe payments, background jobs, and modern frontend architecture.

---

## 📌 Overview
This project demonstrates an end-to-end web application with authentication, payments, and asynchronous processing, built using modern TypeScript-based tooling across the stack.

---

## Demo
![Demo screenshot](demo.png)

## Quick Start Local

Stripe CLI is required for local webhook testing: https://stripe.com/docs/stripe-cli

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

## Architecture Diagram




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
    %% Nodes
    User(["Customer Browser<br/>(Client)"])

    subgraph Frontend["Frontend (Web)"]
        direction TB
        Web["Next.js Storefront<br/>(Server-Side Rendering)"]
    end

    subgraph Backend["Backend (Services)"]
        direction TB
        API["NestJS API<br/>(Business Logic)"]
        Auth["Auth Module<br/>(JWT + Refresh Sessions)"]
    end

    subgraph Data["Data (State)"]
        direction TB
        DB[("PostgreSQL<br/>(Primary Database)")]
        Redis[("Redis<br/>(Stripe Locks)")]
    end

    subgraph External["External (Payments)"]
        direction TB
        Stripe["Stripe<br/>(Payment Processor)"]
    end

    %% Edge label nodes (text only)
    L_User_Web["HTTPS / User Actions"]
    L_Web_API["REST API / JSON + Auth Cookies"]
    L_API_DB["Prisma ORM"]
    L_API_Redis["Event Idempotency Lock"]
    L_API_Auth["Auth Endpoints / JWT"]
    L_Auth_DB["Users + Refresh Sessions"]
    L_API_Stripe["Webhooks / Events"]
    L_Web_Stripe["Checkout Redirect"]
    L_API_Checkout["Create Checkout Session"]

    %% Connections (label nodes inline)
    User --> L_User_Web --> Web
    Web --> L_Web_API --> API
    Web --> L_API_Checkout --> API
    API --> L_API_Auth --> Auth --> L_Auth_DB --> DB
    API --> L_API_DB --> DB
    API --> L_API_Redis --> Redis
    API <--> L_API_Stripe <--> Stripe
    Web --> L_Web_Stripe --> Stripe

    %% Node styles
    classDef neutral fill:#111827,stroke:#334155,color:#ffffff;
    classDef next fill:#1e293b,stroke:#94a3b8,color:#ffffff;
    classDef nest fill:#3f1d2a,stroke:#fb7185,color:#ffffff;
    classDef postgres fill:#0f2a3d,stroke:#38bdf8,color:#ffffff;
    classDef redis fill:#3b1f1f,stroke:#f87171,color:#ffffff;
    classDef stripe fill:#2b1b4b,stroke:#a78bfa,color:#ffffff;

    %% Text-only label style (GitHub-safe)
    classDef edgeText fill:transparent,stroke:transparent,color:#cbd5f5;

    %% Apply styles
    class User neutral;
    class Web next;
    class API,Auth nest;
    class DB postgres;
    class Redis redis;
    class Stripe stripe;

    class L_User_Web,L_Web_API,L_API_DB,L_API_Redis,L_API_Auth,L_Auth_DB,L_API_Stripe,L_Web_Stripe,L_API_Checkout edgeText;

    %% Subgraph styles
    style Frontend fill:#0f172a,stroke:#334155,color:#ffffff,stroke-width:1px,rx:10,ry:10
    style Backend fill:#0f172a,stroke:#334155,color:#ffffff,stroke-width:1px,rx:10,ry:10
    style Data fill:#0f172a,stroke:#334155,color:#ffffff,stroke-width:1px,rx:10,ry:10
    style External fill:#0f172a,stroke:#334155,color:#ffffff,stroke-width:1px,rx:10,ry:10

    %% Edge style
    linkStyle default stroke:#94a3b8,stroke-width:1.5px
```

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
