import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

void (async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    await app.listen(process.env.PORT ?? 6000);
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  }
})();
