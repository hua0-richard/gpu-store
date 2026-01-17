import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { RedisModule } from '../redis/redis.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [RedisModule, PaymentsModule],
  controllers: [StripeController],
  providers: [StripeService]
})
export class StripeModule { }
