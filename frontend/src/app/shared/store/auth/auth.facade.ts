import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAuth, logout } from './auth.actions';
import { LoginCredentials } from '../../../core/services/auth.service';
import { registerAction } from './auth.actions';
import { RegisterData } from '../../../core/services/auth.service';
import {
  selectAuthError,
  selectAuthLoading,
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAuthInitialized,
} from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  public readonly currentUser$ = this.store.select(selectCurrentUser);
  public readonly loading$ = this.store.select(selectAuthLoading);
  readonly isAuthenticated$ = this.store.select(selectIsAuthenticated);
  readonly isAuthInitialized$ = this.store.select(selectIsAuthInitialized);
  readonly errors$ = this.store.select(selectAuthError);

  public init(): void {
    this.store.dispatch(initAuth());
  }

  public logout(): void {
    this.store.dispatch(logout());
  }

  public login(credentials: LoginCredentials): void {
    this.store.dispatch({ type: '[Auth] Login', credentials });
  }

  public register(data: RegisterData): void {
    this.store.dispatch(registerAction({ data }));
  }
}
