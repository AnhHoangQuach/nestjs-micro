import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private billings: any[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  bill(data: any) {
    this.logger.log('Billing...', data);
    this.billings.push({
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
    });
    return this.billings[this.billings.length - 1];
  }

  getBillings() {
    return this.billings;
  }
}
