FROM node:18-alpine AS builder
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./
COPY tsconfig.base.json ./

# Copy workspace packages
COPY packages/auth ./packages/auth
COPY libs ./libs

# Install dependencies
RUN npm ci

# Build the application
RUN npm run build --workspace=packages/auth

FROM node:18-alpine AS runner
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./
COPY tsconfig.base.json ./

# Copy workspace packages
COPY packages/auth ./packages/auth
COPY libs ./libs

# Install production dependencies
RUN npm ci --omit=dev

# Copy built application
COPY --from=builder /app/packages/auth/dist ./dist

EXPOSE 3000
CMD ["node","dist/main.js"]