import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersService } from '../../services/user.service';
import {
  initAuth,
  initAuthFailure,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
} from './auth.actions';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);
  private authService = inject(AuthService);

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
}
