import { Body, Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @EventPattern('orders.create')
  async createOrder(@Payload() request: CreateOrderRequest) {
    return this.ordersService.createOrder(request);
  }

  @EventPattern('orders.get_all')
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
