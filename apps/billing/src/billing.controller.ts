import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @EventPattern('billing.order_created')
  async handleOrderCreated(@Payload() data: any) {
    const { orderId, price, phoneNumber } = data;
    await this.billingService.createBilling(orderId, price, 'PENDING', phoneNumber);
  }

  @EventPattern('billing.get_all')
  async getAllBillings() {
    return this.billingService.getAllBillings();
  }
}
