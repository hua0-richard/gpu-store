import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '../../lib/prisma';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class InstancesService {
    private readonly logger = new Logger(InstancesService.name);

    async findAll(userEmail: string) {
        return prisma.instance.findMany({
            where: { userEmail },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createFromOrder(order: any, userEmail: string) {
        // order.items is assumed to be present
        // Need to refetch items if not present?
        // In StripeService we perform prisma.order.create with nested items.
        // The 'order' object returned by create includes items if we use include.
        // Assuming we pass order including items.

        if (!order.items) {
            // Fallback or fetch? 
            this.logger.warn(`Order ${order.id} has no items to provision.`);
            return;
        }

        for (const item of order.items) {
            const quantity = item.quantity || 1;
            for (let i = 0; i < quantity; i++) {
                await prisma.instance.create({
                    data: {
                        orderId: order.id,
                        userEmail: userEmail,
                        name: `${item.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 7)}`,
                        type: item.name,
                        status: 'PROVISIONING',
                        region: 'us-east-1',
                    },
                });
            }
        }
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async handleLifecycle() {
        this.logger.debug('Running instance simulation...');

        // 1. Find instances that are PROVISIONING
        const provisioning = await prisma.instance.findMany({
            where: { status: 'PROVISIONING' },
        });

        for (const instance of provisioning) {
            // detailed simulation: wait 15-30 seconds
            // For demo, just 20% chance per tick (every 5s) to start
            if (Math.random() > 0.8 || (Date.now() - instance.createdAt.getTime() > 10000)) {
                const ip = `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

                await prisma.instance.update({
                    where: { id: instance.id },
                    data: {
                        status: 'RUNNING',
                        ipAddress: ip,
                    },
                });
                this.logger.log(`Instance ${instance.name} started at ${ip}`);
            }
        }
    }
}
