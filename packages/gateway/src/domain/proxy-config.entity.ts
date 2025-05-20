export class ProxyConfig {
  constructor(
    public readonly target: string,
    public readonly pathRewrite: Record<string, string>,
    public readonly changeOrigin: boolean = true,
  ) {}
} 