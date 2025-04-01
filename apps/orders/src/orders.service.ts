import {
  Injectable,
  Logger
} from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async createOrder(request: CreateOrderRequest) {
    const order = await this.ordersRepository.create(request);
    return order;
  }

  async getOrders() {
    const result = await this.ordersRepository.find({});
    return result;
  }
}
