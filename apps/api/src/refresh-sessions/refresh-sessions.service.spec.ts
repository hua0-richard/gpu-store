import { Test, TestingModule } from '@nestjs/testing';
import { RefreshSessionsService } from './refresh-sessions.service';

describe('RefreshSessionsService', () => {
  let service: RefreshSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshSessionsService],
    }).compile();

    service = module.get<RefreshSessionsService>(RefreshSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
