import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EventService } from '../../application/services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventResponseDto } from '../dto/event-response.dto';
import { Roles } from '@monorepo/common-auth';

@Controller('events')
@ApiTags('Events')
@ApiBearerAuth()
export class EventController {
  constructor(private readonly service: EventService) {}

  @Post()
  @Roles('ADMIN', 'OPERATOR')
  @ApiOperation({ summary: 'Create a new event' })
  async create(@Body() dto: CreateEventDto): Promise<EventResponseDto> {
    const event = await this.service.create(
      dto.name,
      dto.conditionType,
      dto.conditionValue,
      new Date(dto.startAt),
      new Date(dto.endAt),
    );
    return new EventResponseDto(event);
  }

  @Get()
  @Roles('ADMIN', 'OPERATOR', 'USER', 'AUDITOR')
  @ApiOperation({ summary: 'Get all events' })
  async findAll(): Promise<EventResponseDto[]> {
    const events = await this.service.findAll();
    return events.map(e => new EventResponseDto(e));
  }

  @Get(':id')
  @Roles('ADMIN', 'OPERATOR', 'USER', 'AUDITOR')
  @ApiOperation({ summary: 'Get event by ID' })
  async findOne(@Param('id') id: string): Promise<EventResponseDto> {
    const event = await this.service.findById(id);
    return new EventResponseDto(event);
  }
} 