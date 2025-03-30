import { Controller, Post, Body, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserRequest } from './users/dto/create-user.request';
import { LoginRequest } from './dto/login.request';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get('health')
  async health() {
    try {
      // Check MongoDB connection
      const dbState = this.connection.readyState;
      const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: dbStatus,
        uptime: process.uptime(),
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @EventPattern('auth.register')
  async register(@Payload() request: CreateUserRequest) {
    return this.authService.register(request);
  }

  @EventPattern('auth.login')
  async login(@Payload() request: LoginRequest) {
    return this.authService.login(request);
  }

  @EventPattern('auth.validate_user')
  async validateUser(@Payload() data: { email: string; password: string }) {
    return this.authService.validateUser(data.email, data.password);
  }
}
