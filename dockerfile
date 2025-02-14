# Stage 1: Build -------------------------
  FROM node:22-alpine AS build
  WORKDIR /app
  
  # Install dependencies
  COPY package.json pnpm-lock.yaml ./
  RUN npm install -g pnpm && pnpm install --frozen-lockfile
  
  # Build the application
  COPY . .
  RUN pnpm run build
  
  
  # Stage 2: Production -------------------------
  FROM node:22-alpine
  
  # Set the working directory
  WORKDIR /app
  
  # Copy the .next/standalone directory
  COPY --from=build /app/.next/standalone ./
  
  # Expose the port the app runs on
  EXPOSE 3000
  
  # Command to run the application
  CMD ["node", "server.js"]