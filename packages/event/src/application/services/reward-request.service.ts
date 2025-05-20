import { Injectable, BadRequestException } from '@nestjs/common';
import { RewardRequestRepository } from '../../infrastructure/reward-request.repository';
import { EventRepository } from '../../infrastructure/event.repository';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { RewardRequestStatus } from '../../domain/reward-request-status.enum';
import { RewardRequest } from '../../domain/reward-request.entity';
import { EventStatus } from '../../domain/event-status.enum';
import { ConditionType } from '../../domain/condition-type.enum';

@Injectable()
export class RewardRequestService {
  constructor(
    private readonly rewardRequestRepo: RewardRequestRepository,
    private readonly eventRepo: EventRepository,
    private readonly prisma: PrismaService,
  ) {}

  async requestReward(userId: string, eventId: string): Promise<RewardRequest> {
    // Prevent duplicate requests
    const existing = await this.rewardRequestRepo.findByUserAndEvent(userId, eventId);
    if (existing) {
      throw new BadRequestException('Reward already requested for this event');
    }

    // Fetch event
    const event = await this.eventRepo.findById(eventId);
    if (!event) {
      throw new BadRequestException('Event not found');
    }

    // Evaluate status
    const now = new Date();
    let status = RewardRequestStatus.FAILED;
    if (
      event.status === EventStatus.ACTIVE &&
      now >= event.startAt &&
      now <= event.endAt
    ) {
      status = RewardRequestStatus.SUCCESS;
    }

    // Create request using the repository with transaction support
    return this.rewardRequestRepo.create(userId, eventId, status);
  }

  // List reward requests with optional filters (userId, eventId, status)
  async findRequests(filter?: { userId?: string; eventId?: string; status?: RewardRequestStatus; }): Promise<RewardRequest[]> {
    return this.rewardRequestRepo.findAll(filter);
  }
} 