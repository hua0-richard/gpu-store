import { Controller, Get, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { prisma } from '../../lib/prisma';

interface ShieldsBadge {
  schemaVersion: 1;
  label: string;
  message: string;
  color: string;
  cacheSeconds: number;
}

@Controller('health-check')
export class HealthCheckController {
  constructor(@Inject('REDIS') private readonly redis: Redis) {}

  @Get()
  async check() {
    const [db, cache] = await Promise.allSettled([prisma.$queryRaw`SELECT 1`, this.redis.ping()]);

    return {
      db: db.status === 'fulfilled' ? 'healthy' : 'down',
      redis: cache.status === 'fulfilled' ? 'healthy' : 'down',
    };
  }

  @Get('badge/db')
  async dbBadge(): Promise<ShieldsBadge> {
    let healthy = false;
    try {
      await prisma.$queryRaw`SELECT 1`;
      healthy = true;
    } catch (_) {
      // unhealthy
    }

    return {
      schemaVersion: 1,
      label: 'Neon DB',
      message: healthy ? 'healthy' : 'down',
      color: healthy ? 'brightgreen' : 'red',
      cacheSeconds: 30,
    };
  }

  @Get('badge/redis')
  async redisBadge(): Promise<ShieldsBadge> {
    let healthy = false;
    try {
      await this.redis.ping();
      healthy = true;
    } catch (_) {
      // unhealthy
    }

    return {
      schemaVersion: 1,
      label: 'Azure Cache',
      message: healthy ? 'healthy' : 'down',
      color: healthy ? 'brightgreen' : 'red',
      cacheSeconds: 30,
    };
  }
}
