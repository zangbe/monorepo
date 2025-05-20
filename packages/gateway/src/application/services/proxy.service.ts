import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ProxyRepository } from '../../infrastructure/proxy/proxy.repository';

@Injectable()
export class ProxyService {
  private authProxy;
  private eventProxy;

  constructor(private readonly proxyRepository: ProxyRepository) {
    const authConfig = this.proxyRepository.getAuthProxyConfig();
    this.authProxy = createProxyMiddleware({
      target: authConfig.target,
      pathRewrite: authConfig.pathRewrite,
      changeOrigin: authConfig.changeOrigin,
    });

    const eventConfig = this.proxyRepository.getEventProxyConfig();
    this.eventProxy = createProxyMiddleware({
      target: eventConfig.target,
      pathRewrite: eventConfig.pathRewrite,
      changeOrigin: eventConfig.changeOrigin,
    });
  }

  async proxyToAuth(req: Request, res: Response) {
    const result = await this.authProxy(req, res);
    console.log('Auth proxy result:', result);
    return result;
  }

  proxyToEvent(req: Request, res: Response) {
    console.log('Event proxy called');
    return this.eventProxy(req, res);
  }
} 