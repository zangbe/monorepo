import { IsString, IsEnum, IsInt } from 'class-validator';
import { RewardType } from '../../domain/reward-type.enum';

export class CreateRewardDto {
  @IsString()
  eventId!: string;

  @IsEnum(RewardType)
  type!: RewardType;

  @IsInt()
  quantity!: number;
} 