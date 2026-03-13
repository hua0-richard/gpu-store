import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma';

@Injectable()
export class OrdersService {
  getUserOrders(email: string) {
    return prisma.order.findMany({
      where: {
        userEmail: email,
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
