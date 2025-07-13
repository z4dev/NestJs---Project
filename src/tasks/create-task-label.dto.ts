import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskLabelDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  taskId: string;
}
