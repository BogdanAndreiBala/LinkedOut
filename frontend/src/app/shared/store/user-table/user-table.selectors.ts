import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserTableState } from './user-table.state';

export const USER_TABLE_FEATURE_KEY = 'userTable';

export const selectUserTableState = createFeatureSelector<UserTableState>(USER_TABLE_FEATURE_KEY);

export const selectUsers = createSelector(selectUserTableState, (state) => state.users);

export const selectTotalMatchCount = createSelector(
  selectUserTableState,
  (state) => state.totalMatchCount,
);

export const selectUserTableLoading = createSelector(
  selectUserTableState,
  (state) => state.loading,
);

export const selectPreferences = createSelector(selectUserTableState, (state) => state.preferences);

export const selectError = createSelector(selectUserTableState, (state) => state.error);
