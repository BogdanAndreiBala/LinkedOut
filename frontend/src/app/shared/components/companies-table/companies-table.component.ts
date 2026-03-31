import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CompaniesService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [GenericTableComponent, MatTableModule, MatIcon],
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss'],
})
export class CompaniesComponent implements OnInit {
  private companiesService = inject(CompaniesService);
  private destroyRef = inject(DestroyRef);

  public companies: Company[] = [];
  public totalCount: number = 0;
  public isLoading: boolean = false;
  public columnsToDisplay = ['name', 'location', 'website', 'jobsCount'];

  public currentSearch: string = '';
  public currentPage: number = 1;
  public currentLimit: number = 10;

  ngOnInit() {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.isLoading = true;
    this.companiesService
      .getAll({
        search: this.currentSearch,
        page: this.currentPage,
        limit: this.currentLimit,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.companies = response.data;
          this.totalCount = response.pagination.totalItems;
          this.isLoading = false;
        },
        error: () => (this.isLoading = false),
      });
  }

  public onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.currentLimit = event.pageSize;
    this.loadCompanies();
  }

  public onSearchChange(searchTerm: string) {
    this.currentSearch = searchTerm;
    this.currentPage = 1;
    this.loadCompanies();
  }
}
