import { Controller, Get } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController {
  @Get()
  getHello(): string {
    return 'OK';
  }
}
