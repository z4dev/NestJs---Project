import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  async findOne(taskId: string): Promise<Task | null> {
    if (!UUID_REGEX.test(taskId)) {
      throw new NotFoundException(`Task ID must be a valid UUID`);
    }
    const task = await this.tasksRepository.findOneBy({
      id: taskId,
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async addTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskDTO);
    return await this.tasksRepository.save(newTask);
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
