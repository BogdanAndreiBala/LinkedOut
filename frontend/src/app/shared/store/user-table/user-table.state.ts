import { User } from '../../models/user.model';
import { TablePreferences } from '../../models/table-preferences.model';

export interface UserTableState {
  users: User[];
  totalMatchCount: number;
  loading: boolean;
  error: string | null;
  preferences: TablePreferences;
}

export const initialTablePreferences: TablePreferences = {
  searchFilter: '',
  sort: { field: 'lastName', direction: 'asc' },
  pagination: { pageNumber: 1, pageSize: 10 },
};

export const initialUserTableState: UserTableState = {
  users: [],
  totalMatchCount: 0,
  loading: false,
  error: null,
  preferences: initialTablePreferences,
};
