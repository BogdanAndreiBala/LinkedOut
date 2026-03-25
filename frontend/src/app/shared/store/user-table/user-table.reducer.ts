import { createReducer, on } from '@ngrx/store';
import { initialUserTableState } from './user-table.state';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  setPagination,
  setSearch,
  setSort,
  initTablePreferences,
} from './user-table.actions';

export const userTableReducer = createReducer(
  initialUserTableState,

  on(loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadUsersSuccess, (state, { users, totalCount }) => ({
    ...state,
    users,
    totalCount,
    loading: false,
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(setSearch, (state, { searchFilter }) => ({
    ...state,
    preferences: {
      ...state.preferences,
      searchFilter,
      pagination: { ...state.preferences.pagination, pageNumber: 1 },
    },
  })),

  on(setSort, (state, { field, direction }) => ({
    ...state,
    preferences: {
      ...state.preferences,
      sort: { field, direction },
      pagination: { ...state.preferences.pagination, pageNumber: 1 },
    },
  })),

  on(setPagination, (state, { pageNumber, pageSize }) => ({
    ...state,
    preferences: {
      ...state.preferences,
      pagination: { pageNumber, pageSize },
    },
  })),

  on(initTablePreferences, (state, { preferences }) => ({
    ...state,
    preferences: { ...preferences },
  })),
);
