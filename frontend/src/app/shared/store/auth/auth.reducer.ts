import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import {
  initAuth,
  initAuthFailure,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  loginFailure,
  loginSuccess,
  logout,
  updateCurrentUser,
  login,
  registerFailure,
  registerSuccess,
  registerAction,
} from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(initAuth, (state) => ({ ...state, loading: true })),

  on(initAuthFailure, (state) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    isAuthInitialized: true,
  })),

  on(loadCurrentUser, (state) => ({ ...state, loading: true, error: null })),

  on(loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
    isAuthenticated: true,
    isAuthInitialized: true,
  })),

  on(loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
    isAuthInitialized: true,
  })),

  on(updateCurrentUser, (state, { user }) => ({
    ...state,
    currentUser: user,
  })),

  on(logout, () => ({
    ...initialAuthState,
    isAuthenticated: false,
    isAuthInitialized: true,
  })),

  on(login, (state) => ({ ...state, loading: true, error: null })),

  on(loginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    currentUser: user,
    isAuthenticated: true,
    isAuthInitialized: true,
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(registerAction, (state) => ({ ...state, loading: true, error: null })),

  on(registerSuccess, (state) => ({ ...state, loading: false })),

  on(registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
