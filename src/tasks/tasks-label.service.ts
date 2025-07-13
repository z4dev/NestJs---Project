import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskLabelDTO } from './create-task-label.dto';
import { TaskLabel } from './task-lable.entity';
import { UUID_REGEX } from './tasks.helper';
import { TasksService } from './tasks.service';

@Injectable()
export class TaskLabelsService {
  constructor(
    @InjectRepository(TaskLabel)
    private readonly tasksLabelRepository: Repository<TaskLabel>,
    private readonly taskService: TasksService,
  ) {}

  async findAll(): Promise<TaskLabel[]> {
    const taskLabels = await this.tasksLabelRepository.find();
    return taskLabels;
  }

  async findOne(taskLabelId: string): Promise<TaskLabel | null> {
    if (!UUID_REGEX.test(taskLabelId)) {
      throw new NotFoundException(`Task ID must be a valid UUID`);
    }
    const taskLabeled = await this.tasksLabelRepository.findOneBy({
      id: taskLabelId,
    });

    if (!taskLabeled) {
      throw new NotFoundException(`Task with ID ${taskLabelId} not found`);
    }
    return taskLabeled;
  }

  async addTask(createTaskLabelDTO: CreateTaskLabelDTO): Promise<TaskLabel> {
    const { taskId } = createTaskLabelDTO;
    const task = await this.taskService.findOne(taskId);
    const taskLabelExists = await this.tasksLabelRepository.findOneBy({
      taskId: createTaskLabelDTO.taskId,
      name: createTaskLabelDTO.name,
    });
    if (taskLabelExists) {
      throw new NotFoundException(
        `Task label with name ${createTaskLabelDTO.name} already exists for task ID ${taskId}`,
      );
    }
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return await this.tasksLabelRepository.save(createTaskLabelDTO);
  }

  //   async delete(taskId: string): Promise<void> {
  //     const task = await this.findOne(taskId);
  //     if (!task) {
  //       throw new NotFoundException(`Task with ID ${taskId} not found`);
  //     }
  //     await this.tasksRepository.delete(taskId);

  //     return;
  //   }
  //   async update(taskId: string, updatedSchema: UpdateTaskDto): Promise<Task> {
  //     const task = await this.findOne(taskId);
  //     if (!task) {
  //       throw new NotFoundException(`Task with ID ${taskId} not found`);
  //     }
  //     const updatedTask = this.tasksRepository.merge(task, updatedSchema);
  //     await this.tasksRepository.save(updatedTask);
  //     return updatedTask;
  //   }
}
