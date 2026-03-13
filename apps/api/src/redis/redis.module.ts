import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { LockService } from './lock.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: () => {
        const tls = process.env.REDIS_TLS === 'true';
        return new Redis({
          host: process.env.REDIS_HOST ?? 'localhost',
          port: Number(process.env.REDIS_PORT ?? 6379),
          password: process.env.REDIS_PASSWORD || undefined,
          maxRetriesPerRequest: 10,
          tls: tls ? {} : undefined,
        });
      },
    },
    RedisService,
    LockService,
  ],
  exports: ['REDIS', RedisService, LockService],
})
export class RedisModule {}
