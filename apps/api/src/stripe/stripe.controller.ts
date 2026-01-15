import { Controller, Post, Req, Res, Headers, HttpCode } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';

@Controller('webhooks/stripe')
export class StripeController {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // set api version
  });

  @Post()
  @HttpCode(200)
  async handleStripeWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Res() res: Response,
    @Headers('stripe-signature') signature?: string,
  ) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    if (!signature) return res.status(400).send('Missing stripe-signature');

    if (!req.rawBody) return res.status(400).send('Missing raw body');

    let event: Stripe.Event;

    console.log('Stripe Event Triggered');

    try {
      event = this.stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: fulfill order / grant credits / mark paid
        // Use session.id, session.customer, session.metadata, etc.
        break;
      }

      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        // TODO: update billing state
        break;
      }

      // add others you care about
      default:
        break;
    }

    return res.json({ received: true });
  }

  @Post('500credits')
  async purchase500Credits() {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: 4500, // $45.00
            product_data: {
              name: 'GPU Credits – 500',
              description: '500 GPU compute credits',
              metadata: {
                credits: '500',
                sku: 'GPU-500',
              },
            },  
          },
        },
      ],
      success_url: "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://example.com/cancel",
    });

    if (!session.url) {
      throw new Error('Stripe session URL not created');
    }
    console.log(session.url);
    return { url: session.url };
  }
}
