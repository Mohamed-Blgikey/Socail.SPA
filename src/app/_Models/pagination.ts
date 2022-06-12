export interface Pagination<T> {
  currentPage:number;
  itemPerPage:number;
  totalItems:number;
  totalPages:number;
  data : T
}

