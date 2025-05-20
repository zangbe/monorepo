import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Event } from '../domain/event.entity';
import { ConditionType } from '../domain/condition-type.enum';
import { EventStatus } from '../domain/event-status.enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(event: Event): Promise<Event> {
    return this.prisma.withTransaction(async (tx) => {
      const created = await tx.event.create({
        data: {
          name: event.name,
          conditionType: event.conditionType,
          conditionValue: event.conditionValue,
          startAt: event.startAt,
          endAt: event.endAt,
          isActive: event.status === EventStatus.ACTIVE,
        },
      });
      return new Event(
        created.id.toString(),
        created.name,
        created.conditionType as ConditionType,
        created.conditionValue,
        created.startAt,
        created.endAt,
        created.isActive ? EventStatus.ACTIVE : EventStatus.INACTIVE,
      );
    });
  }

  async findAll(): Promise<Event[]> {
    const items = await this.prisma.event.findMany();
    return items.map((item: any) =>
      new Event(
        item.id.toString(),
        item.name,
        item.conditionType as ConditionType,
        item.conditionValue,
        item.startAt,
        item.endAt,
        item.isActive ? EventStatus.ACTIVE : EventStatus.INACTIVE,
      ),
    );
  }

  async findById(id: string): Promise<Event | null> {
    const item = await this.prisma.event.findUnique({ where: { id } });
    return item
      ? new Event(
          item.id.toString(),
          item.name,
          item.conditionType as ConditionType,
          item.conditionValue,
          item.startAt,
          item.endAt,
          item.isActive ? EventStatus.ACTIVE : EventStatus.INACTIVE,
        )
      : null;
  }

  /**
   * Create a new event with transaction
   */
  async createWithTx(tx: Prisma.TransactionClient, event: Event): Promise<Event> {
    const created = await tx.event.create({
      data: {
        name: event.name,
        conditionType: event.conditionType,
        conditionValue: event.conditionValue,
        startAt: event.startAt,
        endAt: event.endAt,
        isActive: event.status === EventStatus.ACTIVE,
      },
    });
    return new Event(
      created.id.toString(),
      created.name,
      created.conditionType as ConditionType,
      created.conditionValue,
      created.startAt,
      created.endAt,
      created.isActive ? EventStatus.ACTIVE : EventStatus.INACTIVE,
    );
  }
} 