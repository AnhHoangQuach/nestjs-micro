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
    try {
      return await this.ordersService.createOrder(request);
    } catch (err) {
      this.logger.error('Error in createOrder handler', err.message);
      throw new RpcException({
        message: err.response?.message || 'Failed to create order',
        details: err.response?.details || err.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @EventPattern('orders.get_all')
  async getOrders() {
    try {
      return await this.ordersService.getOrders();
    } catch (err) {
      this.logger.error('Error in getOrders handler', err.message);
      throw new RpcException({
        message: err.response?.message || 'Failed to fetch orders',
        details: err.response?.details || err.message,
      });
    }
  }
}
