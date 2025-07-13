import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateTaskDTO } from './create-task.dto';
import { Task } from './task.entity';
import { UUID_REGEX } from './tasks.helper';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findAll(filters: FindOptionsWhere<Task>): Promise<Task[]> {
    try {
      const tasks = await this.tasksRepository.find({
        where: filters,
        relations: ['labels'],
      });
      return tasks;
    } catch {
      throw new NotFoundException('Tasks not found');
    }
  }

  async findOne(taskId: string): Promise<Task | null> {
    if (!UUID_REGEX.test(taskId)) {
      throw new NotFoundException(`Task ID must be a valid UUID`);
    }

    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ['labels'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async addTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return await this.tasksRepository.save(createTaskDTO);
  }

  async delete(taskId: string): Promise<void> {
    const task = await this.findOne(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    await this.tasksRepository.delete(taskId);

    return;
  }
  async update(taskId: string, updatedSchema: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    const updatedTask = this.tasksRepository.merge(task, updatedSchema);
    await this.tasksRepository.save(updatedTask);
    return updatedTask;
  }
}
