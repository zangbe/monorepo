FROM node:18-alpine
WORKDIR /app

RUN npm install -g @nestjs/cli
RUN npm install -g typescript

COPY package.json package-lock.json tsconfig.base.json ./
COPY libs ./libs
COPY packages/gateway ./packages/gateway

RUN npm ci

WORKDIR /app/libs
RUN npm ci
RUN npm run build

WORKDIR /app
RUN npm --workspace=packages/gateway exec prisma generate
WORKDIR /app/packages/gateway
RUN npm ci
RUN nest build 