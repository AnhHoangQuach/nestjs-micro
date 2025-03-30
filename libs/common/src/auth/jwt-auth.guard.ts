import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const token = this.getAuthentication(context);
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      this.addUser(payload, context);
      return true;
    } catch (err) {
      this.logger.error('Invalid token', err.message);
      throw new UnauthorizedException(err.message || 'Invalid token');
    }
  }

  private getAuthentication(context: ExecutionContext): string {
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData()?.Authorization;
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest()?.headers?.authorization?.split(' ')[1];
    }
    if (!authentication) {
      throw new UnauthorizedException('Authentication token is required');
    }
    return authentication;
  }

  private addUser(payload: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = payload;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = payload;
    }
  }
}
