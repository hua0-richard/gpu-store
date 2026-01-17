import { Injectable, Post } from '@nestjs/common';
import { PaymentsService } from 'src/payments/payments.service';
import { LockService } from 'src/redis/lock.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(private lockService: LockService, private paymentsService: PaymentsService) {}

  async handleStripeEvent(stripeEvent: Stripe.Event) {
    const lockKey = `lock:stripe:event:${stripeEvent.id}`;
    const gotLock = await this.lockService.acquire(lockKey, 300);
    if (!gotLock) {
      return;
    }
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
        const email = paymentIntent.metadata.userEmail;
        console.log(email);
        this.paymentsService.createOne(stripeEvent.id, email);
        break;
      }
    }
  }
}
