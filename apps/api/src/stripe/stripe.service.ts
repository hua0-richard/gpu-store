import { Injectable, Post } from '@nestjs/common';
import { PaymentsService } from 'src/payments/payments.service';
import { LockService } from 'src/redis/lock.service';
import Stripe from 'stripe';
import { prisma } from '../../lib/prisma';

@Injectable()
export class StripeService {
  constructor(private lockService: LockService, private paymentsService: PaymentsService) { }

  async handleStripeEvent(stripeEvent: Stripe.Event) {
    if (!stripeEvent.id) {
      console.error('Error: Stripe event missing ID');
      return;
    }
    console.log(`Processing Stripe event: ${stripeEvent.type} (${stripeEvent.id})`);
    const lockKey = `lock:stripe:event:${stripeEvent.id}`;
    const gotLock = await this.lockService.acquire(lockKey, 300);
    if (!gotLock) {
      console.log(`Event ${stripeEvent.id} already locked/processed.`);
      return;
    }

    try {
      switch (stripeEvent.type) {
        case 'checkout.session.completed': {
          console.log('Handling checkout.session.completed');
          const session = stripeEvent.data.object as Stripe.Checkout.Session;
          const userEmail = session.payment_intent && typeof session.payment_intent === 'object'
            ? (session.payment_intent as any).metadata?.userEmail
            : session.metadata?.userEmail;

          console.log(`Found user email: ${userEmail}`);

          if (!userEmail) {
            console.error('No user email found in session metadata', session.id);
            return;
          }

          // Fetch line items to get details
          console.log('Fetching line items...');
          const lineItems = await new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2025-12-15.clover' // Matches installed library version
          }).checkout.sessions.listLineItems(session.id, {
            expand: ['data.price.product'],
          });
          console.log(`Fetched ${lineItems.data.length} line items`);

          // Create Order
          console.log('Creating order in database...');
          const order = await prisma.order.create({
            data: {
              userEmail,
              amount: session.amount_total || 0,
              currency: session.currency || 'usd',
              status: session.payment_status,
              items: {
                create: lineItems.data.map((item) => {
                  const product = item.price?.product as Stripe.Product | undefined;
                  const metadata = product?.metadata || {};
                  return {
                    name: item.description || product?.name || 'Unknown Item',
                    quantity: item.quantity || 1,
                    price: item.amount_total,
                    gpuId: metadata.gpuId,
                    cpus: metadata.cpus,
                    storage: metadata.storage,
                    hours: metadata.hours,
                  };
                }),
              },
            },
          });
          console.log('Order created successfully:', order.id);
          break;
        }
        case 'payment_intent.succeeded': {
          console.log('Handling payment_intent.succeeded');
          const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
          const email = paymentIntent.metadata.userEmail;
          console.log('Payment succeeded for:', email);
          if (email) {
            await this.paymentsService.createOne(stripeEvent.id, email);
          } else {
            console.warn('No email in payment intent metadata for paymentsService record');
          }
          break;
        }
      }
    } catch (error) {
      console.error('Error handling Stripe event:', error);
      console.log(`Releasing lock for event ${stripeEvent.id} due to error`);
      await this.lockService.release(lockKey);
      throw error;
    }
  }
}
