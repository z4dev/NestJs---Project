import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLabel } from './task-lable.entity';
import { Task } from './task.entity';
import { TaskLabelController } from './tasks-label.controller';
import { TaskLabelsService } from './tasks-label.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskLabel])],
  controllers: [TasksController, TaskLabelController],
  providers: [TasksService, TaskLabelsService],
})
export class TasksModule {}
