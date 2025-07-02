import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as joi from 'joi';
import { AppConfig } from './app.config';

export interface ConfigType {
  app: AppConfig;
  database: TypeOrmModuleOptions;
}

export const appConfigSchema = joi.object({
  APP_MESSAGE_PREFIX: joi.string().default('Hello'),
  DB_HOST: joi.string().default('localhost'),
  DB_PORT: joi.number().default(5432),
  DB_USERNAME: joi.string().default('postgres'),
  DB_PASSWORD: joi.string().default('postgres'),
  DB_DATABASE: joi.string().default('nestjs_intro'),
});
