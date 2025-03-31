import { Inject, Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      // await lastValueFrom(
      //   this.billingClient.send('billing.order_created', {
      //     orderId: order._id,
      //     name: order.name,
      //     price: order.price,
      //     phoneNumber: order.phoneNumber,
      //   }),
      // );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
    }
  }

  async getOrders() {
    const result = await this.ordersRepository.find({});
    return result
  }
}
