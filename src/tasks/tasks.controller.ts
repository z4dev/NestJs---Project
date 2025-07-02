import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDTO } from './create-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
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
