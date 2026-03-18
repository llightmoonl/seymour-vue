export interface BasePagination {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Pagination<T> {
  data: T[];
  pagination: BasePagination;
}
