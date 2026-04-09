import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { UsersService } from '../../services/user.service';
import { selectIsDarkTheme } from './ui.selectors';
import { selectCurrentUser } from '../auth/auth.selectors';
import { initTheme, toggleTheme, toggleThemeFailure, toggleThemeSuccess } from './ui.actions';

@Injectable()
export class UiEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private usersService = inject(UsersService);

  toggleTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleTheme),
      withLatestFrom(this.store.select(selectIsDarkTheme), this.store.select(selectCurrentUser)),
      switchMap(([, isDarkTheme, currentUser]) => {
        const newTheme = !isDarkTheme;
        if (!currentUser) {
          return of(toggleThemeFailure({ error: 'No user' }));
        }
        return this.usersService
          .updateUser(currentUser.id, { ...currentUser, isDarkTheme: newTheme })
          .pipe(
            map(() => toggleThemeSuccess({ isDarkTheme: newTheme })),
            catchError((error) => of(toggleThemeFailure({ error: error.message }))),
          );
      }),
    ),
  );

  applyTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initTheme, toggleThemeSuccess),
        tap(({ isDarkTheme }) => {
          document.documentElement.classList.toggle('dark-theme', isDarkTheme);
        }),
      ),
    { dispatch: false },
  );
}
