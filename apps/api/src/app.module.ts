import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RefreshSessionsModule } from './refresh-sessions/refresh-sessions.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';

import { ScheduleModule } from '@nestjs/schedule';
import { InstancesModule } from './instances/instances.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    RefreshSessionsModule,
    StripeModule,
    PaymentsModule,
    OrdersModule,
    InstancesModule
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule { }
