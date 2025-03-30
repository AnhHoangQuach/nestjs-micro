import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Billing } from './billing.schema';

@Injectable()
export class BillingService {
  constructor(
    @InjectModel(Billing.name) private readonly billingModel: Model<Billing>,
  ) {}

  async createBilling(orderId: string, amount: number, status: string, phoneNumber: string) {
    const billing = new this.billingModel({ orderId, amount, status, phoneNumber });
    return billing.save();
  }

  async getAllBillings() {
    return this.billingModel.find().exec();
  }
}
