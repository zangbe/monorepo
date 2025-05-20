import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RewardService } from '../../application/services/reward.service';
import { CreateRewardDto } from '../dto/create-reward.dto';
import { RewardResponseDto } from '../dto/reward-response.dto';
import { Roles } from '@monorepo/common-auth';

@Controller('events/:eventId/rewards')
@ApiTags('Rewards')
@ApiBearerAuth()
export class RewardController {
  constructor(private readonly service: RewardService) {}

  @Post()
  @Roles('ADMIN', 'OPERATOR')
  @ApiOperation({ summary: 'Create a new reward for an event' })
  async create(
    @Param('eventId') eventId: string,
    @Body() dto: CreateRewardDto
  ): Promise<RewardResponseDto> {
    const reward = await this.service.create(
      eventId,
      dto.type,
      dto.quantity
    );
    return new RewardResponseDto(reward);
  }

  @Get()
  @Roles('ADMIN', 'OPERATOR', 'USER', 'AUDITOR')
  @ApiOperation({ summary: 'Get all rewards for an event' })
  async findByEvent(
    @Param('eventId') eventId: string
  ): Promise<RewardResponseDto[]> {
    const rewards = await this.service.findByEvent(eventId);
    return rewards.map(reward => new RewardResponseDto(reward));
  }
} 