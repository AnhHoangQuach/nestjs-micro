import { Injectable } from '@nestjs/common';
import { BillingRepository } from 'apps/billing/src/billing.repository';
import { CreateBillingRequest } from 'apps/billing/src/dto/create-billing.request';

@Injectable()
export class BillingService {

  constructor(
    private readonly billingRepository: BillingRepository,
  ) {}

  async createBilling(request: CreateBillingRequest) {
    const result = await this.billingRepository.create({...request, status: 'PENDING'});
    return result;
  }

  async getAllBillings() {
    const result = await this.billingRepository.find({});
    return result
  }
}
