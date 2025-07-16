import { SelectQueryBuilder } from 'typeorm';
import { Task } from '../../tasks/task.entity';
import { PaginationParams } from '../pagination.params';

export class TaskQueryBuilder {
  private query: SelectQueryBuilder<Task>;

  constructor(query: SelectQueryBuilder<Task>) {
    this.query = query;
  }

  withLabels(): this {
    this.query.leftJoinAndSelect('task.labels', 'labels');
    return this;
  }

  filterByStatus(status?: string): this {
    if (status) {
      this.query.andWhere('task.status = :status', { status });
    }
    return this;
  }

  filterBySearch(search?: string): this {
    if (search?.trim()) {
      this.query.andWhere(
        'task.title ILIKE :search OR task.description ILIKE :search',
        { search: `%${search.trim()}%` },
      );
    }
    return this;
  }

  sortBy(sortBy?: string, sortOrder?: 'ASC' | 'DESC'): this {
    const column = sortBy || 'createdAt';
    const order = sortOrder || 'DESC';
    this.query.orderBy(`task.${column}`, order);
    return this;
  }

  paginate(pagination: PaginationParams): this {
    this.query.skip((pagination.page - 1) * pagination.limit);
    this.query.take(pagination.limit);
    return this;
  }

  async execute(): Promise<[Task[], number]> {
    return this.query.getManyAndCount();
  }

  async executeOne(): Promise<Task | null> {
    return this.query.getOne();
  }

  getRawQuery(): string {
    return this.query.getQuery();
  }
}
