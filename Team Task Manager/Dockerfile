# ── Stage 1: Build the React client ──────────────────────────────────────────
FROM node:18-alpine AS client-build

WORKDIR /app/client

# Install client dependencies
COPY client/package*.json ./
RUN npm ci

# Copy client source and build
COPY client/ ./
RUN npm run build

# ── Stage 2: Production server ────────────────────────────────────────────────
FROM node:18-alpine

WORKDIR /app

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy server source
COPY server/ ./server/

# Copy compiled React build from stage 1
# server.js resolves: path.join(__dirname, '../client/build')
# __dirname = /app/server  →  /app/client/build
COPY --from=client-build /app/client/build ./client/build

# Expose port
EXPOSE 5000

# Run server in production mode so it serves the React build
ENV NODE_ENV=production
CMD ["node", "server/server.js"]
