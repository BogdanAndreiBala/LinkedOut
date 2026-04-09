import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, tap, filter } from 'rxjs/operators';
import { UsersService } from '../../services/user.service';
import { AuthFacade } from '../auth/auth.facade';
import { selectPreferences } from './user-table.selectors';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  setPagination,
  setSearch,
  setSort,
  updatePreferencesSuccess,
  updatePreferencesFailure,
  loadUsersCachedSuccess,
  loadPreferencesFromStorage,
  initTablePreferences,
} from './user-table.actions';

@Injectable()
export class UserTableEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private usersService = inject(UsersService);
  private authFacade = inject(AuthFacade);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.select(selectPreferences)),
      switchMap(([, preferences]) =>
        this.usersService
          .getAllUsers({
            search: preferences.searchFilter,
            sort: preferences.sort.field,
            order: preferences.sort.direction,
            page: preferences.pagination.pageNumber,
            limit: preferences.pagination.pageSize,
          })
          .pipe(
            tap((response) => {
              localStorage.setItem('cached-networkTable', JSON.stringify(response));
            }),
            map((response) =>
              loadUsersSuccess({
                users: response.data,
                totalMatchCount: response.pagination.totalItems || 0,
              }),
            ),
            catchError(() => {
              const cachedData = localStorage.getItem('cached-networkTable');

              if (cachedData) {
                const parsed = JSON.parse(cachedData);
                return of(
                  loadUsersCachedSuccess({
                    users: parsed.data,
                    totalMatchCount: parsed.pagination.totalItems || 0,
                    warning: 'You are offline! This list might not contain the most recent data!!!',
                  }),
                );
              }

              return of(
                loadUsersFailure({
                  error: 'Cannot load network list. The server might be offline.',
                }),
              );
            }),
          ),
      ),
    ),
  );

  preferencesChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSearch, setSort, setPagination),
      withLatestFrom(this.store.select(selectPreferences), this.authFacade.currentUser$),
      switchMap(([, preferences, currentUser]) => {
        if (currentUser) {
          localStorage.setItem('userTablePreferences', JSON.stringify(preferences));
          return this.usersService
            .updateUser(currentUser.id, { tablePreferences: preferences })
            .pipe(
              map(() => updatePreferencesSuccess()),
              catchError(() =>
                of(
                  updatePreferencesFailure({
                    error: 'Failed to save preferences. Please try again.',
                  }),
                ),
              ),
            );
        }
        return of(
          updatePreferencesFailure({
            error: 'Failed to save preferences. Create a user account first.',
          }),
        );
      }),
    ),
  );

  loadUsersOnPreferencesChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePreferencesSuccess, updatePreferencesFailure),
      switchMap(() => of(loadUsers())),
    ),
  );

  loadPreferencesFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPreferencesFromStorage),
      map(() => localStorage.getItem('userTablePreferences')),
      filter((savedPrefs): savedPrefs is string => savedPrefs !== null),
      map((savedPrefs) => {
        const preferences = JSON.parse(savedPrefs);
        return initTablePreferences({ preferences });
      }),
    ),
  );
}
