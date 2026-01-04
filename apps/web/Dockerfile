FROM node:20-alpine

# Enable pnpm
RUN corepack enable

# Set working directory INSIDE container
WORKDIR /app

# Copy only what pnpm needs first (better caching)
COPY apps/web/package.json apps/web/pnpm-lock.yaml ./

# Install deps
RUN pnpm install

# Copy the rest of the web app
COPY apps/web .

# Next.js dev server
EXPOSE 3000

CMD ["pnpm", "run", "dev"]
