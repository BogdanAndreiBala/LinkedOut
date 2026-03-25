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
            map((response) =>
              loadUsersSuccess({
                users: response.data,
                totalCount: response.pagination.totalItems || 0,
              }),
            ),
            catchError((error) => of(loadUsersFailure({ error: error.message }))),
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
          this.usersService
            .updateUser(currentUser.id, { tablePreferences: preferences })
            .subscribe();
        }
        return of(loadUsers());
      }),
    ),
  );
}
