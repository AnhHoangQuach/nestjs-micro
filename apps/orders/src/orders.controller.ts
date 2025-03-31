import { Body, Controller, Get, UseGuards, Logger } from '@nestjs/common';
import { EventPattern, Payload, RpcException } from '@nestjs/microservices';
import { JwtAuthGuard } from '@app/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);

  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @EventPattern('orders.create')
  async createOrder(@Payload() request: CreateOrderRequest) {
    return this.ordersService.createOrder(request);
  }

  @UseGuards(JwtAuthGuard)
  @EventPattern('orders.get_all')
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
