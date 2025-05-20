import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Health')
export class HealthController {
  @Get()
  healthCheck() {
    return { status: 'ok' };
  }

  @Get('ping')
  ping() {
    return { service: 'auth' };
  }
} 