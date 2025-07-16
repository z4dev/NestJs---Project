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
import { PaginationParams } from 'src/common/pagination.params';
import { PaginationResponse } from 'src/common/pagination.response';
import { CreateTaskDTO } from './create-task.dto';
import { FindTaskParams } from './find-task.params';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll(
    @Query() filters: FindTaskParams,
    @Query() pagination: PaginationParams,
  ): Promise<PaginationResponse<Task>> {
    const [items, total] = await this.taskService.findAll(filters, pagination);
    return {
      data: items,
      meta: {
        total,
        offset: (pagination.page - 1) * pagination.limit,
        limit: pagination.limit,
        page: pagination.page,
      },
    };
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
