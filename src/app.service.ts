import { Injectable } from '@nestjs/common';
import { AppConfig } from './config/app.config';
import { TypedConfigService } from './config/type-config.service';

@Injectable()
export class AppService {
  constructor(private readonly configService: TypedConfigService) {}
  getHello(): string {
    const messagePrefix =
      this.configService.get<AppConfig>('app')?.messagePrefix;

    return `${messagePrefix} Welcome to NestJS!`;
  }
}
