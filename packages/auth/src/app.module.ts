import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { HealthController } from './presentation/controllers/health.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UserRepository } from './infrastructure/user.repository';
import { BcryptService } from './infrastructure/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  JwtStrategy,
  JwtAuthGuard,
  RolesGuard,
  Roles,
} from 'monorepo-libs';
import { LocalStrategy } from './infrastructure/auth/local.strategy';
import { LocalAuthGuard } from './infrastructure/auth/local-auth.guard';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    HealthController,
    AuthController,
  ],
  providers: [
    AuthService,
    UserRepository,
    BcryptService,
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
    RolesGuard,
  ],
})
export class AppModule {}
