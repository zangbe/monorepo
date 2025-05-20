import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../infrastructure/user.repository';
import { BcryptService } from '../../infrastructure/bcrypt.service';
import { User } from '../../domain/user.entity';
import { Role } from '../../domain/role.enum';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // Register a new user
  async register(email: string, password: string): Promise<User> {
    const hashed = await this.bcryptService.hash(password);
    // Create user in a transaction for atomicity
    return this.prisma.withTransaction((tx: Prisma.TransactionClient) =>
      this.userRepo.createWithTx(tx, email, hashed)
    );
  }

  // Validate credentials and return JWT
  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !(await this.bcryptService.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, role: user.roles[0], email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  // Validate user credentials (used by Passport local strategy)
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    if (user && await this.bcryptService.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  // Issue JWT for a validated user (used by LocalAuthGuard)
  async loginUser(user: User): Promise<{ accessToken: string }> {
    const payload = { sub: user.id, role: user.roles[0], email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  // Invalidate JWT (client side)
  async logout(): Promise<void> {
    // For stateless JWT, client discards token
    return;
  }

  // Update user's role
  async updateRole(userId: string, role: Role): Promise<void> {
    // Update role in a transaction
    await this.userRepo.updateRole(userId, role);
  }
} 