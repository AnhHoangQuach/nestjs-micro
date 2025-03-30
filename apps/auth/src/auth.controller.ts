import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.request';
import { CreateUserRequest } from './users/dto/create-user.request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @EventPattern('auth.register')
  async register(@Payload() request: CreateUserRequest) {
    const result = await this.authService.register(request);
    return result;
  }

  @EventPattern('auth.login')
  async login(@Payload() request: LoginRequest) {
    const result = await this.authService.login(request);
    return result;
  }
}
