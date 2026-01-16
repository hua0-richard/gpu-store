import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client = new Redis(process.env.REDIS_URL!);

  get redis() {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}