import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UsersService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  initAuth,
  initAuthFailure,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  logout,
  login,
  loginFailure,
  registerAction,
  registerFailure,
  registerSuccess,
} from './auth.actions';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUser),
      switchMap(({ userId }) =>
        this.usersService.getUserById(userId).pipe(
          map((user) => loadCurrentUserSuccess({ user })),
          catchError((err) =>
            of(loadCurrentUserFailure({ error: err?.message ?? 'Unknown error' })),
          ),
        ),
      ),
    ),
  );

  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth),
      map(() => {
        const isValid = this.authService.validateToken();
        if (isValid) {
          const userId = this.authService.getUserIdFromToken();
          if (userId) {
            return loadCurrentUser({ userId });
          }
        }
        return initAuthFailure();
      }),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          sessionStorage.removeItem('token');
          localStorage.clear();
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(() => {
            const userId = this.authService.getUserIdFromToken();

            if (userId) {
              return loadCurrentUser({ userId });
            } else {
              return loginFailure({ error: 'An unexpected error occurred.' });
            }
          }),
          catchError((error) =>
            of(
              loginFailure({
                error: error?.error?.message || 'Login failed. Please check your credentials.',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ data }) =>
        this.authService.register(data).pipe(
          map(() => registerSuccess()),
          catchError((error) =>
            of(registerFailure({ error: error?.error?.message || 'Registration failed.' })),
          ),
        ),
      ),
    ),
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.snackBar.open('Registration successful! Please login.', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );
}
