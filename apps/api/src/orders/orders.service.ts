import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma';
import { Order } from 'generated/prisma/client';

@Injectable()
export class OrdersService {
    async getUserOrders(email: string) {
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
