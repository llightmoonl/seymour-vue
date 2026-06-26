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

RUN npm run dev
