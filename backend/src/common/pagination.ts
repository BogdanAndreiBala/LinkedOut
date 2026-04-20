export interface PaginationMeta {
  /** Total number of items matching the query */
  totalItems: number;
  /** Maximum items per page */
  itemsPerPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Current page number (1-based) */
  currentPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export function paginate<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResponse<T> {
  return {
    data: items,
    pagination: {
      totalItems: total,
      itemsPerPage: limit,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    },
  };
}
