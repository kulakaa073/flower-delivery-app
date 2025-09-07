import type { Flower } from './flower';

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface Pagination {
  page: number;
  perPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalItems: number;
}

export interface ShopInventoryResponse extends Pagination {
  data: Flower[];
}

export interface RequestQuery {
  page: number;
  perPage: number;
  sortBy: 'price' | 'date';
  sortOrder: 'asc' | 'desc';
}
