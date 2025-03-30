import { Controller, Post, Body, Get, Inject, Headers, UnauthorizedException, Logger, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  private readonly logger = new Logger(GatewayController.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientProxy,
  ) {}

  @Post('auth/register')
  async register(@Body() data: any) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('auth.register', data)
      );
      return result;
    } catch (err) {
      this.logger.error('Error during registration', err.message);
      throw new BadRequestException(err.message || 'Failed to register');
    }
  }

  @Post('auth/login')
  async login(@Body() data: any) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('auth.login', data)
      );
      return result;
    } catch (err) {
      this.logger.error('Error during login', err.message);
      throw new BadRequestException(err.message || 'Failed to login');
    }
  }

  @Post('orders')
  async createOrder(@Body() data: any, @Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }
    try {
      const result = await firstValueFrom(
        this.ordersClient.send('orders.create', {
          ...data,
          Authorization: authHeader.split(' ')[1],
        }),
      );
      return result;
    } catch (err) {
      this.logger.error('Error creating order', err.message);
      throw new BadRequestException(err.message || 'Failed to create order');
    }
  }

  @Get('orders')
  async getOrders(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }
    try {
      const result = await firstValueFrom(
        this.ordersClient.send('orders.get_all', {
          Authorization: authHeader.split(' ')[1],
        }),
      );
      return result;
    } catch (err) {
      this.logger.error('Error fetching orders', err.message);
      throw new BadRequestException(err.message || 'Failed to fetch orders');
    }
  }

  @Post('billing')
  async createBilling(@Body() data: any, @Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }
    try {
      const result = await firstValueFrom(
        this.billingClient.send('billing.create', {
          ...data,
          Authorization: authHeader.split(' ')[1],
        }),
      );
      return result;
    } catch (err) {
      this.logger.error('Error creating billing', err.message);
      throw new BadRequestException(err.message || 'Failed to create billing');
    }
  }

  @Get('billing')
  async getBillings(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }
    try {
      const result = await firstValueFrom(
        this.billingClient.send('billing.get_all', {
          Authorization: authHeader.split(' ')[1],
        }),
      );
      return result;
    } catch (err) {
      this.logger.error('Error fetching billings', err.message);
      throw new BadRequestException(err.message || 'Failed to fetch billings');
    }
  }
}
