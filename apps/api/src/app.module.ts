import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RefreshSessionsModule } from './refresh-sessions/refresh-sessions.module';

@Module({
  imports: [AuthModule, UsersModule, RefreshSessionsModule],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
