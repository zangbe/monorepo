import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';

// Import from common-auth library
import { JwtStrategy, JwtAuthGuard, RolesGuard } from '@monorepo/common-auth';
import { ProxyController } from './presentation/controllers/proxy.controller';
import { ProxyService } from './application/services/proxy.service';
import { ProxyRepository } from './infrastructure/proxy/proxy.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    HttpModule,
  ],
  controllers: [
    ProxyController,
  ],
  providers: [
    JwtStrategy,
    ProxyService,
    ProxyRepository,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}