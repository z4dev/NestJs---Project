import { registerAs } from '@nestjs/config';

export interface AppConfig {
  messagePrefix: string;
}
export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    messagePrefix: process.env.APP_MESSAGE_PREFIX as string,
  }),
);

//type assertion to tell the ts compiler that I am sure a string would be returned
