# Dockerfile for Team Task Manager Backend
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application
COPY server/ ./

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "server.js"]
