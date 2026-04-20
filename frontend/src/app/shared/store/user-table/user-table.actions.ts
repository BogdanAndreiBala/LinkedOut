import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { TablePreferences } from '../../models/table-preferences.model';

//API Interactions
export const loadUsers = createAction('[User Table] Load Users');

export const loadUsersSuccess = createAction(
  '[User Table] Load Users Success',
  props<{ users: User[]; totalMatchCount: number }>(),
);

export const loadUsersFailure = createAction(
  '[User Table] Load Users Failure',
  props<{ error: string }>(),
);

//User Interactions
export const setSearch = createAction('[User Table] Set Search', props<{ searchFilter: string }>());

export const setSort = createAction(
  '[User Table] Set Sort',
  props<{ field: string; direction: 'asc' | 'desc' }>(),
);

export const setPagination = createAction(
  '[User Table] Set Pagination',
  props<{ pageNumber: number; pageSize: number }>(),
);

//State Initialization
export const initTablePreferences = createAction(
  '[User Table] Init Preferences',
  props<{ preferences: TablePreferences }>(),
);

export const updatePreferencesSuccess = createAction('[User Table] Update Preferences Success');

export const updatePreferencesFailure = createAction(
  '[User Table] Update Preferences Failure',
  props<{ error: string }>(),
);

export const loadUsersCachedSuccess = createAction(
  '[User Table] Load Users Cached Success',
  props<{ users: User[]; totalMatchCount: number; warning: string }>(),
);

export const loadPreferencesFromStorage = createAction(
  '[User Table] Load Preferences From Storage',
);
