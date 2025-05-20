import { RewardRequestStatus } from '../../domain/reward-request-status.enum';

export class RewardRequestResponseDto {
  id!: string;
  userId!: string;
  eventId!: string;
  status!: RewardRequestStatus;
  createdAt!: Date;

  constructor(partial: Partial<RewardRequestResponseDto>) {
    Object.assign(this, partial);
  }
} 