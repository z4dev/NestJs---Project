/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './create-task.dto';
import { Task } from './task.entity';
import { validateQueryParams } from './tasks.helper';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll(@Query() queryObj: any): Promise<Task[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { limit = 10, page = 1, ...filtered } = queryObj;
      validateQueryParams(filtered);
      console.log(filtered);
      return await this.taskService.findAll(filtered);
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error; // Re-throw the error to be handled by NestJS
    }
  }
  @Get('/:taskId')
  async findOne(@Param('taskId') taskId: string): Promise<Task | null> {
    return this.taskService.findOne(taskId);
  }

  @Post()
  create(@Body() task: CreateTaskDTO): Promise<Task> {
    return this.taskService.addTask(task);
  }
  @Patch('/:taskId')
  async update(
    @Param('taskId') taskId: string,
    @Body() updatedSchema: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(taskId, updatedSchema);
  }
  @Delete('/:taskId')
  async delete(@Param('taskId') taskId: string): Promise<void> {
    return this.taskService.delete(taskId);
  }
}
