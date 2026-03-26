import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectPreferences,
  selectTotalMatchCount,
  selectUsers,
  selectUserTableLoading,
} from './user-table.selectors';
import {
  initTablePreferences,
  loadUsers,
  setPagination,
  setSearch,
  setSort,
} from './user-table.actions';
import { TablePreferences } from '../../models/table-preferences.model';

@Injectable({ providedIn: 'root' })
export class UserTableFacade {
  private store = inject(Store);

  public users$ = this.store.select(selectUsers);
  public totalMatchCount$ = this.store.select(selectTotalMatchCount);
  public loading$ = this.store.select(selectUserTableLoading);
  public preferences$ = this.store.select(selectPreferences);
  public error$ = this.store.select(selectError);

  public loadUsers(): void {
    this.store.dispatch(loadUsers());
  }

  public setSearch(searchFilter: string): void {
    this.store.dispatch(setSearch({ searchFilter }));
  }

  public setSort(field: string, direction: 'asc' | 'desc'): void {
    this.store.dispatch(setSort({ field, direction }));
  }

  public setPagination(pageNumber: number, pageSize: number): void {
    this.store.dispatch(setPagination({ pageNumber, pageSize }));
  }

  public initPreferences(preferences: TablePreferences): void {
    if (preferences) {
      this.store.dispatch(initTablePreferences({ preferences }));
    }
  }
}
