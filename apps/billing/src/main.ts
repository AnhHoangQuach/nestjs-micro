import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { BillingModule } from './billing.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('BillingService');
  try {
    const app = await NestFactory.create(BillingModule);

    // Get config service
    const configService = app.get(ConfigService);

    // Connect to RabbitMQ
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [configService.get('RABBIT_MQ_URI')],
        queue: configService.get('RABBIT_MQ_BILLING_QUEUE'),
        queueOptions: {
          durable: false,
        },
      },
    });

    // Global pipes and middleware
    app.useGlobalPipes(new ValidationPipe());

    // Start microservices first
    await app.startAllMicroservices();

    // Then start HTTP server
    const port = configService.get('PORT') || 3002;
    await app.listen(port);

    logger.log(`Billing service is running on port ${port}`);
    logger.log(`Connected to MongoDB at ${configService.get('MONGODB_URI')}`);
    logger.log(`Connected to RabbitMQ at ${configService.get('RABBIT_MQ_URI')}`);
  } catch (error) {
    logger.error('Failed to start billing service:', error);
    process.exit(1);
  }
}

bootstrap();
