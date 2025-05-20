import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Reward } from '../domain/reward.entity';
import { RewardType } from '../domain/reward-type.enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class RewardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(reward: Reward): Promise<Reward> {
    return this.prisma.withTransaction(async (tx) => {
      const created = await (tx as any).reward.create({
        data: {
          eventId: reward.eventId,
          type: reward.type,
          quantity: reward.quantity,
        },
      });
      return new Reward(
        created.id.toString(),
        created.eventId,
        created.type as RewardType,
        created.quantity,
      );
    });
  }

  async findByEventId(eventId: string): Promise<Reward[]> {
    const items = await (this.prisma as any).reward.findMany({
      where: { eventId },
    });
    return items.map((item: any) =>
      new Reward(
        item.id.toString(),
        item.eventId,
        item.type as RewardType,
        item.quantity,
      ),
    );
  }

  /**
   * Create a reward with transaction
   */
  async createWithTx(tx: Prisma.TransactionClient, reward: Reward): Promise<Reward> {
    const created = await (tx as any).reward.create({
      data: {
        eventId: reward.eventId,
        type: reward.type,
        quantity: reward.quantity,
      },
    });
    return new Reward(
      created.id.toString(),
      created.eventId,
      created.type as RewardType,
      created.quantity,
    );
  }
} 