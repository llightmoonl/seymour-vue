# ── Stage 1: build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

ARG VITE_API_URL
ARG VITE_CURRENT_LANGUAGE=ru
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CURRENT_LANGUAGE=$VITE_CURRENT_LANGUAGE

RUN npm run build-only

# ── Stage 2: serve ────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN npm install -g serve

WORKDIR /app
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
