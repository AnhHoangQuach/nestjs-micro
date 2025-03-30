import { Body, Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @EventPattern('billing.create')
  async createBilling(@Payload() data: any) {
    return this.billingService.bill(data);
  }

  @EventPattern('billing.get_all')
  async getBillings() {
    return this.billingService.getBillings();
  }
}
