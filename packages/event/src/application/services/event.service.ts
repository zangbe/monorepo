import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from '../../infrastructure/event.repository';
import { Event } from '../../domain/event.entity';
import { ConditionType } from '../../domain/condition-type.enum';
import { EventStatus } from '../../domain/event-status.enum';

@Injectable()
export class EventService {
  constructor(private readonly repo: EventRepository) {}

  async create(
    name: string,
    conditionType: ConditionType,
    conditionValue: number,
    startAt: Date,
    endAt: Date,
  ): Promise<Event> {
    const entity = new Event(
      '',
      name,
      conditionType,
      conditionValue,
      startAt,
      endAt,
      EventStatus.ACTIVE,
    );
    return this.repo.create(entity);
  }

  async findAll(): Promise<Event[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Event> {
    const event = await this.repo.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }
} 