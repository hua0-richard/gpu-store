import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class LockService {
  constructor(private readonly redisService: RedisService) {}

async acquire(key: string, ttlSeconds = 300): Promise<boolean> {
  const res = await this.redisService.redis.set(key, "1", "EX", ttlSeconds, "NX");
  return res === "OK";
}

  async release(key: string) {
    await this.redisService.redis.del(key);
  }
}
