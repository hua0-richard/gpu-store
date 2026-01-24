import { Controller, Post, Req, Res, Headers, HttpCode, UseGuards, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';
import { AuthGuard } from 'src/auth/auth.guard';
import Stripe from 'stripe';

@Controller('webhooks/stripe')
export class StripeController {
  constructor(private stripeService: StripeService) { }
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
    console.log("HOOK")
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
  @Post('checkout')
  async checkout(@Req() req: Record<string, any>, @Body() body: { items: any[] }) {
    console.log('Checkout request body:', JSON.stringify(body));
    const { items } = body;
    console.log('Items received:', items?.length);
    const userEmail = req.user?.email;

    if (!items || items.length === 0) {
      throw new Error('No items provided for checkout');
    }

    // Transform items to Stripe line items
    const line_items = items.map((item) => ({
      quantity: item.quantity || 1,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.pricePerStep ? item.pricePerStep * item.hours * 100 : item.unitPrice * 100),
        product_data: {
          name: item.name,
          description: item.description || `GPU Configuration: ${item.name}`,
          metadata: {
            gpuId: item.gpuId,
            cpus: item.cpus ? String(item.cpus) : undefined,
            storage: item.storage ? String(item.storage) : undefined,
            hours: item.hours ? String(item.hours) : undefined,
            ...item.metadata,
          },
        },
      },
    }));

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      metadata: {
        userEmail,
      },
      payment_intent_data: {
        metadata: {
          userEmail,
        },
      },
      line_items,
      success_url: `${process.env.FRONTEND_URL}/account?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?canceled=true`,
    });

    if (!session.url) {
      throw new Error('Stripe session URL not created');
    }
    return { url: session.url };
  }
}
