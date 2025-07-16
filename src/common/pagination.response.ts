interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  offset: number;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
