# Stage 1: Build the React client
FROM node:18-alpine AS client-build

WORKDIR /app/client

# Copy client package files and install dependencies
COPY client/package*.json ./
RUN npm ci

# Copy client source and build
COPY client/ ./
RUN npm run build

# Stage 2: Production server image
FROM node:18-alpine

WORKDIR /app/server

# Copy server package files and install production dependencies
COPY server/package*.json ./
RUN npm ci --only=production

# Copy server source
COPY server/ ./

# Copy the React build output from Stage 1
COPY --from=client-build /app/client/build /app/client/build

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "/app/server/server.js"]
