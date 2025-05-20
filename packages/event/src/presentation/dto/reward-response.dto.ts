import { RewardType } from '../../domain/reward-type.enum';

export class RewardResponseDto {
  id!: string;
  eventId!: string;
  type!: RewardType;
  quantity!: number;

  constructor(partial: Partial<RewardResponseDto>) {
    Object.assign(this, partial);
  }
} 