export interface PageResponse<T> {
  items: Array<T>;
  page: {
    numberOfItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  };
}
