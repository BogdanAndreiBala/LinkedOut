import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HighlightTableRowDirective } from '../../directives/highlight-row/highlight-table-row.directive';
import { MatIcon } from '@angular/material/icon';
import { TechIconsDirective } from '../../directives/tech-icon/tech-icons.directive';
import { PaginatedResponse } from '../../models/pagination.model';
import { UserTableFacade } from '../../store/user-table/user-table.facade';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-network-table',
  imports: [
    MatTableModule,
    AvatarComponent,
    HighlightTableRowDirective,
    MatIcon,
    TechIconsDirective,
    MatPaginator,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatFormField,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
  standalone: true,
})
export class NetworkTableComponent implements OnInit {
  private facade = inject(UserTableFacade);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  public columnsToDisplay: string[] = ['name', 'headline', 'location', 'connections'];

  public searchBar: FormControl = new FormControl('');

  public isOffline: boolean = false;
  private activeSnackBar: MatSnackBarRef<TextOnlySnackBar> | null = null;

  public users$ = this.facade.users$;
  public totalMatchCount$ = this.facade.totalMatchCount$;
  public loading$ = this.facade.loading$;
  public preferences$ = this.facade.preferences$;
  public error$ = this.facade.error$;

  public pageSizeOptions = [5, 10, 20, 50];

  ngOnInit(): void {
    this.preferences$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((preferences) => {
      if (this.searchBar.value !== preferences.searchFilter) {
        this.searchBar.setValue(preferences.searchFilter, { emitEvent: false });
      }
    });

    this.searchBar.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.facade.setSearch(value ?? ''));

    this.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((err) => {
      if (err) {
        this.activeSnackBar = this.snackBar.open(err, 'Close', {
          duration: 5000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'],
        });
      }
    });

    const savedPrefs = localStorage.getItem('userTablePreferences');
    if (savedPrefs) {
      this.facade.initPreferences(JSON.parse(savedPrefs));
    }

    const onlineHandler = () => {
      if (this.activeSnackBar) {
        this.activeSnackBar.dismiss();
        this.activeSnackBar = null;
      }
      this.snackBar.open('You are back online! Please refresh the page.', 'Close', {
        duration: 5000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      });
    };

    window.addEventListener('online', onlineHandler);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('online', onlineHandler);
    });

    this.facade.loadUsers();
  }

  public onPageChange(event: PageEvent): void {
    this.facade.setPagination(event.pageIndex + 1, event.pageSize);
  }

  public onRowClick(user: User) {
    this.router.navigate(['/profile', user.id]);
  }
}
