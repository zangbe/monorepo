import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RewardRequestService } from '../../application/services/reward-request.service';
import { CreateRewardRequestDto } from '../dto/create-reward-request.dto';
import { RewardRequestResponseDto } from '../dto/reward-request-response.dto';
import { RewardRequestStatus } from '../../domain/reward-request-status.enum';
import { Roles } from '@monorepo/common-auth';

@Controller('reward-requests')
@ApiTags('Reward Requests')
@ApiBearerAuth()
export class RewardRequestController {
  constructor(private readonly service: RewardRequestService) {}

  @Post()
  @Roles('USER')
  @ApiOperation({ summary: 'Request a reward' })
  async request(@Body() dto: CreateRewardRequestDto): Promise<RewardRequestResponseDto> {
    const result = await this.service.requestReward(dto.userId, dto.eventId);
    return new RewardRequestResponseDto(result);
  }

  @Get()
  @Roles('ADMIN', 'OPERATOR', 'AUDITOR')
  @ApiOperation({ summary: 'Get all reward requests' })
  async list(
    @Query('userId') userId?: string,
    @Query('eventId') eventId?: string,
    @Query('status') status?: RewardRequestStatus,
  ): Promise<RewardRequestResponseDto[]> {
    const items = await this.service.findRequests({ userId, eventId, status });
    return items.map(i => new RewardRequestResponseDto(i));
  }
} 