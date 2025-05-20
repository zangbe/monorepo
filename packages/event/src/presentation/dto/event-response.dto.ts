import { ConditionType } from '../../domain/condition-type.enum';
import { EventStatus } from '../../domain/event-status.enum';

export class EventResponseDto {
  id!: string;
  name!: string;
  conditionType!: ConditionType;
  conditionValue!: number;
  startAt!: Date;
  endAt!: Date;
  status!: EventStatus;

  constructor(partial: Partial<EventResponseDto>) {
    Object.assign(this, partial);
  }
} 