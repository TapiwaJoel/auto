export interface ServiceResponse<T> {
  message: string;
  data: T;
}

export interface ServiceSearchResponse<T> extends ServiceResponse<T> {
  direction: string;
  orderBy: string;
  page: number;
  size: number;
  total: number;
}
