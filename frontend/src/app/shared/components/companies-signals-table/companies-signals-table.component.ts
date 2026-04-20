import { Component, computed, signal, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, map, startWith, catchError, of, tap } from 'rxjs';
import { CompaniesService } from '../../services/company.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-companies-signals',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './companies-signals-table.component.html',
  styleUrls: ['./companies-signals-table.component.scss'],
})
export class CompaniesSignalsTableComponent {
  private companiesService = inject(CompaniesService);
  public columnsToDisplay = ['name', 'location', 'website', 'jobsCount'];
  public currentPage = signal(1);
  public currentLimit = signal(10);
  public searchControl = new FormControl('');

  private searchValue = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      tap(() => this.currentPage.set(1)),
    ),
    {
      initialValue: '',
    },
  );

  private tableState = computed(() => ({
    search: this.searchValue() || '',
    page: this.currentPage(),
    limit: this.currentLimit(),
  }));

  private fetchResult = toSignal(
    toObservable(this.tableState).pipe(
      switchMap((state) =>
        this.companiesService.getAll(state).pipe(
          map((response) => ({
            data: response.data,
            total: response.pagination.totalItems,
            loading: false,
          })),
          startWith({ data: [], total: 0, loading: true }),
          catchError(() => of({ data: [], total: 0, loading: false })),
        ),
      ),
    ),
    { initialValue: { data: [], total: 0, loading: true } },
  );

  public companies = computed(() => this.fetchResult().data);
  public totalCount = computed(() => this.fetchResult().total);
  public isLoading = computed(() => this.fetchResult().loading);
  public isEmpty = computed(() => this.companies().length === 0 && !this.isLoading());

  public onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.currentLimit.set(event.pageSize);
  }

  public clearSearch() {
    this.searchControl.setValue('');
    this.currentPage.set(1);
  }
}
