import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Billing extends AbstractDocument {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  phoneNumber: string;
}

export const BillingSchema = SchemaFactory.createForClass(Billing).set('timestamps', true);
