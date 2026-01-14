import { Global, Module } from "@nestjs/common";
import Redis from "ioredis";

@Global()
@Module({
  providers: [
    {
      provide: "REDIS",
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST ?? "localhost",
          port: Number(process.env.REDIS_PORT ?? 6379),
          password: process.env.REDIS_PASSWORD || undefined,
          maxRetriesPerRequest: 3,
        });
      },
    },
  ],
  exports: ["REDIS"],
})
export class RedisModule {}