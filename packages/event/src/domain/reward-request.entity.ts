import { RewardRequestStatus } from './reward-request-status.enum';

export class RewardRequest {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly eventId: string,
    public readonly status: RewardRequestStatus,
    public readonly createdAt: Date,
  ) {}
} 