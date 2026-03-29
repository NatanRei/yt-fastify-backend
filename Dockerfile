FROM public.ecr.aws/docker/library/node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM public.ecr.aws/docker/library/node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV DATABASE_URL="file:./prisma/dev.db"

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

RUN npx prisma generate

USER node

EXPOSE 3333

CMD ["node", "dist/server.js"]