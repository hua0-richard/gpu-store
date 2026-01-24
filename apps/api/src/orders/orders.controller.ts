import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard'; // Adjust import path
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getUserOrders(@Req() req: Record<string, any>) {
        const email = req.user.email;
        return this.ordersService.getUserOrders(email);
    }
}
