# Stage 1: Build React client
FROM node:18-alpine AS client-build

WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

# Stage 2: Production server
FROM node:18-alpine

WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci --only=production

COPY server/ ./

COPY --from=client-build /app/client/build /app/client/build

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]
