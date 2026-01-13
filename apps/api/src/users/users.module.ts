import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RefreshSessionsService } from 'src/refresh-sessions/refresh-sessions.service';

@Module({
  providers: [UsersService, RefreshSessionsService],
  exports: [UsersService],
})
export class UsersModule {}
