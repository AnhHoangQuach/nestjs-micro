import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '@app/common';

@Controller('billing')
export class BillingController {

  constructor(private readonly billingService: BillingService) {}

  @UseGuards(JwtAuthGuard)
  @EventPattern('billing.create')
  async handleOrderCreated(@Payload() data: any) {
    return this.billingService.createBilling(data);
  }

  @UseGuards(JwtAuthGuard)
  @EventPattern('billing.get_all')
  async getAllBillings() {
    return this.billingService.getAllBillings();
  }
}
