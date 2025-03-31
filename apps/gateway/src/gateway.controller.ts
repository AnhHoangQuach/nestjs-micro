import { Body, Controller, Get, Headers, Inject, Logger, Post, UnauthorizedException } from '@nestjs/common';
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
    const result = await firstValueFrom(
      this.authClient.send('auth.register', data)
    );
    return result;
  }

  @Post('auth/login')
  async login(@Body() data: any) {
    const result = await firstValueFrom(
      this.authClient.send('auth.login', data)
    );
    return result;
  }

  @Post('orders')
  async createOrder(@Body() data: any, @Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }
    const result = await firstValueFrom(
      this.ordersClient.send('orders.create', {
        ...data,
        Authorization: authHeader.split(' ')[1],
      }),
    );
    return result;
  }

  @Get('orders')
  async getOrders(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }
    const result = await firstValueFrom(
      this.ordersClient.send('orders.get_all', {
        Authorization: authHeader.split(' ')[1],
      }),
    );
    return result;
  }

  @Post('billing')
  async createBilling(@Body() data: any, @Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }
    const result = await firstValueFrom(
      this.billingClient.send('billing.create', {
        ...data,
        Authorization: authHeader.split(' ')[1],
      }),
    );
    return result;
  }

  @Get('billing')
  async getBillings(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }
    const result = await firstValueFrom(
      this.billingClient.send('billing.get_all', {
        Authorization: authHeader.split(' ')[1],
      }),
    );
    return result;
  }
}
