FROM node:20-alpine
RUN corepack enable

WORKDIR /app

# Copy all workspace manifests so pnpm can resolve the lockfile
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile

# Copy API source and build
COPY apps/api ./apps/api
RUN pnpm --filter api prisma:generate && pnpm --filter api build

EXPOSE 3001
CMD ["node", "apps/api/dist/src/main"]
