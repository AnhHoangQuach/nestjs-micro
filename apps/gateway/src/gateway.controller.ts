import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
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
  async createOrder(@Body() data: any) {
    const result = await firstValueFrom(
      this.ordersClient.send('orders.create', data)
    );
    return result;
  }

  @Get('orders')
  async getOrders() {
    const result = await firstValueFrom(
      this.ordersClient.send('orders.get_all', {})
    );
    return result;
  }

  @Post('billing')
  async createBilling(@Body() data: any) {
    const result = await firstValueFrom(
      this.billingClient.send('billing.create', data)
    );
    return result;
  }

  @Get('billing')
  async getBillings() {
    const result = await firstValueFrom(
      this.billingClient.send('billing.get_all', {})
    );
    return result;
  }
}
