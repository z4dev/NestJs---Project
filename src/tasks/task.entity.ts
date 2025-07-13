import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskLabel } from './task-lable.entity';
import { TaskStatus } from './tasks.helper';

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
    default: TaskStatus.IN_PROGRESS,
    comment: 'Indicates whether the task is completed or not',
  })
  status: boolean;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: User;
  @Column()
  userId: string;

  @OneToMany(() => TaskLabel, (taskLabel) => taskLabel.task, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  labels: TaskLabel[];
}
