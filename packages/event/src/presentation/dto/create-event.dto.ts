import { IsString, IsEnum, IsInt, IsDateString } from 'class-validator';
import { ConditionType } from '../../domain/condition-type.enum';

export class CreateEventDto {
  @IsString()
  name!: string;

  @IsEnum(ConditionType)
  conditionType!: ConditionType;

  @IsInt()
  conditionValue!: number;

  @IsDateString()
  startAt!: string;

  @IsDateString()
  endAt!: string;
} 