import { ConditionType } from './condition-type.enum';
import { EventStatus } from './event-status.enum';

export class Event {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly conditionType: ConditionType,
    public readonly conditionValue: number,
    public readonly startAt: Date,
    public readonly endAt: Date,
    public readonly status: EventStatus,
  ) {}
} 