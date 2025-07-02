import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDTO } from './create-task.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateTaskDto extends PartialType(CreateTaskDTO) {}
