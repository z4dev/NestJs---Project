import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateTaskLabelDTO } from './create-task-label.dto';
import { TaskLabel } from './task-lable.entity';

export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskLabelDTO)
  labels?: TaskLabel[];
}
