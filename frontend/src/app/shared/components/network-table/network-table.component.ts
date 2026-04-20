import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HighlightTableRowDirective } from '../../directives/highlight-row/highlight-table-row.directive';
import { MatIcon } from '@angular/material/icon';
import { TechIconsDirective } from '../../directives/tech-icon/tech-icons.directive';
import { UserTableFacade } from '../../store/user-table/user-table.facade';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
  standalone: true,
})
export class NetworkTableComponent implements OnInit {
  private userFacade = inject(UserTableFacade);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  public columnsToDisplay: string[] = ['name', 'headline', 'location', 'connections'];

  public searchBar: FormControl = new FormControl('');

  public isOffline: boolean = false;
  private activeSnackBar: MatSnackBarRef<TextOnlySnackBar> | null = null;

  public users$ = this.userFacade.users$;
  public totalMatchCount$ = this.userFacade.totalMatchCount$;
  public loading$ = this.userFacade.loading$;
  public preferences$ = this.userFacade.preferences$;
  public error$ = this.userFacade.error$;

  public pageSizeOptions = [5, 10, 20, 50];

  ngOnInit(): void {
    this.preferences$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((preferences) => {
      if (this.searchBar.value !== preferences.searchFilter) {
        this.searchBar.setValue(preferences.searchFilter, { emitEvent: false });
      }
    });

    this.searchBar.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.userFacade.setSearch(value ?? ''));

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

    this.userFacade.loadUsers();
  }

  public onPageChange(event: PageEvent): void {
    this.userFacade.setPagination(event.pageIndex + 1, event.pageSize);
  }

  public onRowClick(user: User) {
    this.router.navigate(['/profile', user.id]);
  }
}
