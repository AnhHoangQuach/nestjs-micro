import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Billing extends Document {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BillingSchema = SchemaFactory.createForClass(Billing);
