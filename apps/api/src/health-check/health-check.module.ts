import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
