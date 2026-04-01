export interface TablePreferences {
  sort: { field: string; direction: 'asc' | 'desc' };
  pagination: { pageSize: number; pageNumber: number };
  searchFilter: string;
}
