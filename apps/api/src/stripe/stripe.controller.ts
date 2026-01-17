import { Controller, Post, Req, Res, Headers, HttpCode, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';
import { AuthGuard } from 'src/auth/auth.guard';
import Stripe from 'stripe';

@Controller('webhooks/stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}
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

    let stripeEvent: Stripe.Event;

    try {
      stripeEvent = this.stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
      this.stripeService.handleStripeEvent(stripeEvent);
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    return res.json({ received: true });
  }

  @UseGuards(AuthGuard)
  @Post('500credits')
  async purchase500Credits(@Req() req: Record<string, any>) {
    const user = req.user as { email: string; name: string | null };
    console.log(req.user);
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_intent_data: {
        metadata: {
          userEmail: req.user.email,
        },
      },
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
      success_url: process.env.FRONTEND_URL,
      cancel_url: process.env.FRONTEND_URL,
    });

    if (!session.url) {
      throw new Error('Stripe session URL not created');
    }
    return { url: session.url };
  }
}
