import {
  Controller,
  All,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Roles } from '@monorepo/common-auth';
import { ProxyService } from '../../application/services/proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('auth/*path')
  @Roles('USER', 'OPERATOR', 'AUDITOR', 'ADMIN')
  async proxyAuth(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.proxyToAuth(req, res);
  }

  @All('event/*path')
  @Roles('OPERATOR', 'ADMIN')
  proxyEventManagement(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.proxyToEvent(req, res);
  }

  @All('event/*path')
  @Roles('USER', 'AUDITOR', 'ADMIN')
  proxyEventUser(@Req() req: Request, @Res() res: Response) {
    // 예: GET /event/... 는 USER/AUDITOR/ADMIN 허용
    return this.proxyService.proxyToEvent(req, res);
  }
} 