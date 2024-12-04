import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpiration(): string {
    return this.configService.get<string>('JWT_EXPIRATION');
  }

  getRefreshTokenExpiration(): string {
    return this.configService.get<string>('REFRESH_TOKEN_EXPIRATION');
  }
}
