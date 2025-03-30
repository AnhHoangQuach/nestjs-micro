import { Controller, Get, Post, Body } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  async createBilling(
    @Body('orderId') orderId: string,
    @Body('amount') amount: number,
    @Body('status') status: string,
  ) {
    return this.billingService.createBilling(orderId, amount, status);
  }

  @Get()
  async getAllBillings() {
    return this.billingService.getAllBillings();
  }
}
