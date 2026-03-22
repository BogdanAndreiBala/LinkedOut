import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAuth, loadCurrentUser, logout } from './auth.actions';
import {
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

  public init(): void {
    this.store.dispatch(initAuth());
  }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
