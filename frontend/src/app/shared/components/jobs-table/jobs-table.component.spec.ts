import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsComponent } from './jobs-table.component';
import { JobsService } from '../../services/job.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let mockJobsService: any;

  const mockPaginatedResponse = {
    data: [
      {
        id: 1,
        title: 'Frontend Developer',
        company: { name: 'Tech Corp' },
        location: 'Remote',
        type: 'Full-time',
        createdAt: new Date(),
      },
    ],
    pagination: { totalItems: 1 },
  };

  beforeEach(async () => {
    mockJobsService = {
      getAll: vi.fn().mockReturnValue(of(mockPaginatedResponse)),
    };

    await TestBed.configureTestingModule({
      imports: [JobsComponent, MatTableModule, MatIconModule],
      providers: [{ provide: JobsService, useValue: mockJobsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
  });

  it('should call getAll() on component init with no arguments', () => {
    fixture.detectChanges();
    expect(mockJobsService.getAll).toHaveBeenCalled();
  });

  it('should emit the paginated response returned by the mock to the data source', () => {
    fixture.detectChanges();
    expect(component.jobs).toEqual(mockPaginatedResponse.data);
    expect(component.totalCount).toBe(1);
  });

  it('should render the search input field in the DOM', () => {
    fixture.detectChanges();
    const genericTable = fixture.debugElement.query(By.css('app-generic-table'));
    expect(genericTable).toBeTruthy();
  });

  it('should call getAll() with the new page and limit on page change', () => {
    fixture.detectChanges();
    mockJobsService.getAll.mockClear();

    component.onPageChange({ pageIndex: 1, pageSize: 25, length: 100 });

    expect(component.currentPage).toBe(2);
    expect(component.currentLimit).toBe(25);
    expect(mockJobsService.getAll).toHaveBeenCalledWith({ search: undefined, page: 2, limit: 25 });
  });

  it('should pass undefined as search (not an empty string) to getAll()', () => {
    fixture.detectChanges();
    mockJobsService.getAll.mockClear();

    component.onSearchChange('');

    expect(mockJobsService.getAll).toHaveBeenCalledWith({ search: undefined, page: 1, limit: 10 });
  });

  it("should NOT call getAll() a second time during init if the search control hasn't changed", () => {
    fixture.detectChanges();

    expect(mockJobsService.getAll).toHaveBeenCalledTimes(1);
  });
});
