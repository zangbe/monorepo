# NestJS Microservices Monorepo

A comprehensive NestJS monorepo implementing a microservices architecture with shared libraries. This project follows Domain-Driven Design (DDD) principles and provides a scalable foundation for building distributed systems.

## Architecture Overview

This monorepo implements a microservices architecture with the following components:

- **Shared Libraries**: Common code used across services (auth components, utilities, filters)
- **Authentication Service**: Handles user authentication, JWT generation, and authorization
- **Event Service**: Manages event processing and related business logic
- **API Gateway**: Routes requests to appropriate microservices and provides a unified API

## Project Structure

```
monorepo/
├── packages/                # All microservices
│   ├── auth/                # Authentication service
│   │   ├── src/             # Service source code
│   │   ├── prisma/          # Prisma schema and migrations
│   │   └── Dockerfile       # Service-specific Docker build
│   ├── event/               # Event processing service
│   │   ├── src/             # Service source code
│   │   ├── prisma/          # Prisma schema and migrations
│   │   └── Dockerfile       # Service-specific Docker build
│   └── gateway/             # API Gateway
│       ├── src/             # Service source code
│       └── Dockerfile       # Service-specific Docker build
├── libs/                    # Shared libraries
│   ├── src/                 # Library source code
│   │   ├── common/          # Common utilities & filters
│   │   │   └── filters/     # Exception filters
│   │   ├── common-auth/     # Shared authentication components
│   │   └── index.ts         # Main exports
│   └── package.json         # Library dependencies
├── package.json             # Root package with workspace configuration
├── tsconfig.base.json       # Base TypeScript configuration
└── docker-compose.yml       # Docker services configuration
```

## Shared Libraries (libs)

The `libs` package contains shared code used across multiple services to promote code reuse and consistency:

### Common Authentication (`common-auth`)

Authentication components shared between services:

- **JWT Strategy**: Implementation of Passport JWT strategy
- **JWT Auth Guard**: NestJS guard for protecting routes requiring JWT authentication
- **Roles Decorator**: Custom decorator for role-based access control
- **Roles Guard**: Guard that enforces role-based permissions

### Common Utilities (`common`)

Shared utilities and helpers:

- **HTTP Exception Filter**: Standardized exception handling for all services

## Services

### Authentication Service (`auth`)

Responsible for user authentication and authorization:

- User registration and login
- JWT token generation and validation
- Role-based access control

### Event Service (`event`)

Handles event-related functionality:

- Event creation and management
- Event processing and business logic

### API Gateway (`gateway`)

Serves as the entry point for all client requests:

- Routes requests to appropriate microservices
- Handles authentication via JWT tokens
- Provides a unified API for clients

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- npm (v8+)

### Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd monorepo
   ```

2. Install dependencies and build shared libraries:
   ```bash
   npm run setup
   ```

### Development

#### Running Services Locally with Docker

Build and start all services:
```bash
npm run build:all
```

Or build and start individual services:
```bash
npm run build:auth    # Build and start Auth service
npm run build:event   # Build and start Event service
npm run build:gateway # Build and start Gateway service
```

#### Database Management with Prisma

Generate Prisma clients:
```bash
npm run prisma:generate
```

Push schema changes to databases:
```bash
npm run prisma:push
```

Clean up all containers and volumes:
```bash
npm run clean
```

## Docker Configuration

The project uses Docker Compose to orchestrate all services. Key configurations:

- **MongoDB**: Database used by all services with replica set for transaction support
- **Individual Service Containers**: Each service runs in its own container
- **Network Configuration**: Services can communicate with each other using service names
- **Environment Variables**: Configuration via environment variables for flexibility

## Module Resolution

Services import shared libraries in two ways:

1. Using the package name directly:
   ```typescript
   import { JwtAuthGuard } from 'monorepo-libs';
   ```

2. Using specific module paths:
   ```typescript
   import { HttpExceptionFilter } from 'monorepo-libs/common';
   ```

## Build Process

Each service has its own Dockerfile that:

1. Installs global dependencies
2. Copies and builds the shared libraries
3. Builds the specific service
4. Generates Prisma client (for services using Prisma)

This approach ensures that each service container includes all necessary dependencies including the compiled shared libraries.

## Troubleshooting

### Module Resolution Issues

If experiencing "Cannot find module 'monorepo-libs'" errors during Docker builds:

1. Ensure the libs package is properly built before building services
2. Verify the correct path mapping in the service's tsconfig.json
3. Check that the Dockerfile builds the libs package before building the service

### Prisma Client Generation

If Prisma client generation fails:

1. Ensure MongoDB is running and accessible
2. Verify the DATABASE_URL environment variable is correctly set
3. Try running the prisma:generate commands manually

## License

[MIT](LICENSE)
