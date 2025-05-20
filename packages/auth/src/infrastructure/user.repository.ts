import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from '../domain/user.entity';
import { Role } from '../domain/role.enum';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new user with default USER role
  async create(email: string, password: string): Promise<User> {
    return this.prisma.withTransaction(async (tx) => {
      const created = await tx.user.create({
        data: { email, password, role: Role.USER },
      });
      
      return new User(
        created.id.toString(),
        created.email,
        created.password,
        [created.role],
      );
    });
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { email } });
    return found
      ? new User(found.id.toString(), found.email, found.password, [found.role])
      : null;
  }

  // Find user by ID
  async findById(id: string): Promise<User | null> {  
    const found = await this.prisma.user.findUnique({ where: { id } });
    return found
      ? new User(found.id.toString(), found.email, found.password, [found.role])
      : null;
  }

  // Update user's role
  async updateRole(id: string, role: Role): Promise<void> {
    await this.prisma.withTransaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: { role },
      });
    });
  }

  /**
   * Create a new user in a given transaction context
   */
  async createWithTx(tx: Prisma.TransactionClient, email: string, password: string): Promise<User> {
    const created = await tx.user.create({
      data: { email, password, role: "USER" },
    });
    return new User(
      created.id.toString(),
      created.email,
      created.password,
      [created.role],
    );
  }
} 