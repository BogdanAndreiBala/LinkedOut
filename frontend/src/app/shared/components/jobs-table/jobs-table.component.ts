import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // 🌟 Needed for the DatePipe!
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JobsService } from '../../services/job.service';
import { Job } from '../../models/job.model'; // Adjust path!
import { GenericTableComponent } from '../generic-table/generic-table.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, GenericTableComponent],
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.scss'],
})
export class JobsComponent implements OnInit {
  private jobsService = inject(JobsService);
  private destroyRef = inject(DestroyRef);

  public jobs: Job[] = [];
  public totalCount: number = 0;
  public isLoading: boolean = false;

  public columnsToDisplay = ['job', 'location', 'type', 'posted'];

  public currentSearch: string = '';
  public currentPage: number = 1;
  public currentLimit: number = 10;

  ngOnInit() {
    this.loadJobs();
  }

  private loadJobs() {
    this.isLoading = true;
    const searchValue = this.currentSearch ? this.currentSearch : undefined;
    this.jobsService
      .getAll({
        search: searchValue,
        page: this.currentPage,
        limit: this.currentLimit,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.jobs = response.data;
          this.totalCount = response.pagination.totalItems;
          this.isLoading = false;
        },
        error: () => (this.isLoading = false),
      });
  }

  public onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.currentLimit = event.pageSize;
    this.loadJobs();
  }

  public onSearchChange(searchTerm: string) {
    this.currentSearch = searchTerm;
    this.currentPage = 1;
    this.loadJobs();
  }
}
