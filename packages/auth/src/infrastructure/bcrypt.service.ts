import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  // Default to '10' if env var not provided
  private readonly saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
} 