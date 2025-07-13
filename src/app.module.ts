import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config/app.config';
import { appConfigSchema } from './config/config.type';
import { databaseConfig } from './config/database.config';
import { TypedConfigService } from './config/type-config.service';
import { TaskLabel } from './tasks/task-lable.entity';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ...configService.get('database'),
        entities: [Task, User, TaskLabel],
      }),
    }),

    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: TypedConfigService,
      useExisting: ConfigService,
    },
  ],
})
export class AppModule {}
