import { Injectable } from '@nestjs/common';
import { RewardRepository } from '../../infrastructure/reward.repository';
import { Reward } from '../../domain/reward.entity';
import { RewardType } from '../../domain/reward-type.enum';

@Injectable()
export class RewardService {
  constructor(private readonly repo: RewardRepository) {}

  async create(
    eventId: string,
    type: RewardType,
    quantity: number,
  ): Promise<Reward> {
    const entity = new Reward('', eventId, type, quantity);
    return this.repo.create(entity);
  }

  async findByEvent(eventId: string): Promise<Reward[]> {
    return this.repo.findByEventId(eventId);
  }
} 