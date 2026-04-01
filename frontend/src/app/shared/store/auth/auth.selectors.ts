import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_FEATURE_KEY = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectCurrentUser = createSelector(selectAuthState, (s) => s.currentUser);

export const selectAuthLoading = createSelector(selectAuthState, (s) => s.loading);

export const selectAuthError = createSelector(selectAuthState, (state: AuthState) => state.error);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated,
);

export const selectIsAuthInitialized = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthInitialized,
);
