import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma';

@Injectable()
export class PaymentsService {
  async findOne(eventId: string): Promise<boolean> {
    const paymentEvent = await prisma.paymentEvents.findUnique({
      where: { eventId: eventId },
    });
    if (paymentEvent) {
      return true;
    }
    return false;
  }

  async createOne(eventId: string, userEmail: string): Promise<void> {
    console.log('Creating payment event:', eventId, userEmail);
    await prisma.paymentEvents.create({
      data: {
        eventId: eventId,
        userEmail: userEmail,
      },
    });
  }
}
