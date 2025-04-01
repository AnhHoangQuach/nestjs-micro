import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Billing } from './schemas/billing.schema';

@Injectable()
export class BillingRepository extends AbstractRepository<Billing> {
  protected readonly logger = new Logger(BillingRepository.name);

  constructor(
    @InjectModel(Billing.name) billingModel: Model<Billing>,
    @InjectConnection() connection: Connection,
  ) {
    super(billingModel, connection);
  }
}
