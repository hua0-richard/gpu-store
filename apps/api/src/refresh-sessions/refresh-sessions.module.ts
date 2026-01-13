import { Module } from '@nestjs/common';
import { RefreshSessionsService } from './refresh-sessions.service';

@Module({
  providers: [RefreshSessionsService],
  exports: [RefreshSessionsService],
})
export class RefreshSessionsModule {}
