import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskLabelDTO } from './create-task-label.dto';
import { TaskLabel } from './task-lable.entity';
import { TaskLabelsService } from './tasks-label.service';

@Controller('task-labels')
export class TaskLabelController {
  constructor(private readonly taskLabelsService: TaskLabelsService) {}

  @Post()
  createLabel(
    @Body() createTaskLabelDTO: CreateTaskLabelDTO,
  ): Promise<TaskLabel> {
    return this.taskLabelsService.addTask(createTaskLabelDTO);
  }
}
