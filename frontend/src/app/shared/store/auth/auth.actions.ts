import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { LoginCredentials } from '../../../core/services/auth.service';
import { RegisterData } from '../../../core/services/auth.service';

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

export const login = createAction('[Auth] Login', props<{ credentials: LoginCredentials }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');

export const registerAction = createAction('[Auth] Register', props<{ data: RegisterData }>());

export const registerSuccess = createAction('[Auth] Register Success');

export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());
