/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationParams } from 'src/common/pagination.params';
import { Repository } from 'typeorm';
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

  async findAll(
    filters: any,
    pagination: PaginationParams,
  ): Promise<[Task[], number]> {
    try {
      const query = this.tasksRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.labels', 'labels');

      if (filters.status) {
        query.andWhere('task.status= :status', { status: filters.status });
      }
      if (filters.search?.trim()) {
        query.andWhere(
          'task.title ILIKE :search OR task.description ILIKE :search',
          { search: `%${filters.search.trim()}%` },
        );
      }
      query.orderBy(
        `task.${filters.sortBy || 'createdAt'}`,
        filters.sortOrder || 'DESC',
      );
      query.skip((pagination.page - 1) * pagination.limit);
      query.take(pagination.limit);

      return query.getManyAndCount();
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
