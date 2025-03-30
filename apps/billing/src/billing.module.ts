import { Module } from '@nestjs/common';
import { RmqModule, DatabaseModule } from '@app/common';
import * as Joi from 'joi';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Billing, BillingSchema } from './billing.schema';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@app/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    RmqModule,
    MongooseModule.forFeature([{ name: Billing.name, schema: BillingSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BillingController],
  providers: [
    BillingService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class BillingModule {}
