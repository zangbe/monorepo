import { Injectable } from '@nestjs/common';
import { ProxyConfig } from '../../domain/proxy-config.entity';

@Injectable()
export class ProxyRepository {
  getAuthProxyConfig(): ProxyConfig {
    return new ProxyConfig(
      process.env.AUTH_URL || 'http://auth:3000',
      { '^/api/auth': '/auth' },
      true
    );
  }

  getEventProxyConfig(): ProxyConfig {
    return new ProxyConfig(
      process.env.EVENT_URL || 'http://event:3000',
      { '^/api/event': '/event' },
      true
    );
  }
} 