import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'The title of the task',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    comment: 'A detailed description of the task',
  })
  description: string;

  @Column({
    type: 'varchar',
    default: 'PENDING',
    comment: 'Indicates whether the task is completed or not',
  })
  status: boolean;
}
