import { RewardType } from './reward-type.enum';

export class Reward {
  constructor(
    public readonly id: string,
    public readonly eventId: string,
    public readonly type: RewardType,
    public readonly quantity: number,
  ) {}
} 