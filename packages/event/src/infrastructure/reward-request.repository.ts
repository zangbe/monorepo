import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RewardRequest } from '../domain/reward-request.entity';
import { RewardRequestStatus } from '../domain/reward-request-status.enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class RewardRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndEvent(userId: string, eventId: string): Promise<RewardRequest | null> {
    const found = await (this.prisma as any).rewardRequest.findFirst({ where: { userId, eventId } });
    return found
      ? new RewardRequest(found.id.toString(), found.userId, found.eventId, found.status as RewardRequestStatus, found.createdAt)
      : null;
  }

  async create(userId: string, eventId: string, status: RewardRequestStatus): Promise<RewardRequest> {
    return this.prisma.withTransaction(async (tx) => {
      const created = await (tx as any).rewardRequest.create({ data: { userId, eventId, status } });
      return new RewardRequest(
        created.id.toString(), 
        created.userId, 
        created.eventId, 
        created.status as RewardRequestStatus, 
        created.createdAt
      );
    });
  }

  async updateStatus(id: string, status: RewardRequestStatus): Promise<void> {
    await this.prisma.withTransaction(async (tx) => {
      await (tx as any).rewardRequest.update({ where: { id }, data: { status } });
    });
  }

  async findAll(filter?: { userId?: string; eventId?: string; status?: RewardRequestStatus; }): Promise<RewardRequest[]> {
    const where: any = {};
    if (filter?.userId) where.userId = filter.userId;
    if (filter?.eventId) where.eventId = filter.eventId;
    if (filter?.status) where.status = filter.status;
    const items = await (this.prisma as any).rewardRequest.findMany({ where });
    return items.map((item: any) =>
      new RewardRequest(item.id.toString(), item.userId, item.eventId, item.status as RewardRequestStatus, item.createdAt),
    );
  }

  /**
   * Create a new reward request with transaction
   */
  async createWithTx(
    tx: Prisma.TransactionClient, 
    userId: string, 
    eventId: string, 
    status: RewardRequestStatus
  ): Promise<RewardRequest> {
    const created = await (tx as any).rewardRequest.create({ 
      data: { userId, eventId, status } 
    });
    return new RewardRequest(
      created.id.toString(), 
      created.userId, 
      created.eventId, 
      created.status as RewardRequestStatus, 
      created.createdAt
    );
  }

  /**
   * Update reward request status with transaction
   */
  async updateStatusWithTx(
    tx: Prisma.TransactionClient,
    id: string, 
    status: RewardRequestStatus
  ): Promise<void> {
    await (tx as any).rewardRequest.update({ 
      where: { id }, 
      data: { status } 
    });
  }
} 