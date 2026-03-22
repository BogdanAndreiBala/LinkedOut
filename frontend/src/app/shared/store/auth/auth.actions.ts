import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const initAuth = createAction('[Auth] Init Auth');
export const initAuthFailure = createAction('[Auth] Init Auth Failure');

export const loadCurrentUser = createAction(
  '[Auth] Load Current User',
  props<{ userId: number }>(),
);

export const loadCurrentUserSuccess = createAction(
  '[Auth] Load Current User Success',
  props<{ user: User }>(),
);

export const loadCurrentUserFailure = createAction(
  '[Auth] Load Current User Failure',
  props<{ error: string }>(),
);

export const updateCurrentUser = createAction(
  '[Auth] Update Current User',
  props<{ user: User }>(),
);

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());

export const logout = createAction('[Auth] Logout');
