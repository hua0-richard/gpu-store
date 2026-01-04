FROM node:20-alpine
WORKDIR /app
COPY apps/api/package. ./
RUN corepack enable
EXPOSE 3001
CMD ["sh", "-c", "pnpm install && pnpm start:dev"]