FROM node:18-alpine
WORKDIR /app

RUN npm install -g @nestjs/cli
RUN npm install -g typescript

COPY package.json package-lock.json tsconfig.base.json ./
COPY libs ./libs
COPY packages/auth ./packages/auth

RUN npm ci

WORKDIR /app/libs
RUN npm ci
RUN npm run build

WORKDIR /app
RUN npm --workspace=packages/auth exec prisma generate
WORKDIR /app/packages/auth
RUN npm ci
RUN nest build --config tsconfig.build.json    
