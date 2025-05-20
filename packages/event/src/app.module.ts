import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy, JwtAuthGuard, RolesGuard } from '@monorepo/common-auth';

import { HealthController } from './presentation/controllers/health.controller';
import { EventController } from './presentation/controllers/event.controller';
import { RewardController } from './presentation/controllers/reward.controller';
import { RewardRequestController } from './presentation/controllers/reward-request.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { EventRepository } from './infrastructure/event.repository';
import { RewardRepository } from './infrastructure/reward.repository';
import { RewardRequestRepository } from './infrastructure/reward-request.repository';
import { EventService } from './application/services/event.service';
import { RewardService } from './application/services/reward.service';
import { RewardRequestService } from './application/services/reward-request.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({ 
      secret: process.env.JWT_SECRET || 'secretKey',
    }),
    PrismaModule
  ],
  controllers: [
    HealthController,
    EventController,
    RewardController,
    RewardRequestController,
  ],
  providers: [
    JwtStrategy,
    EventRepository,
    RewardRepository,
    RewardRequestRepository,
    EventService,
    RewardService,
    RewardRequestService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
