import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesSignalsTableComponent } from './companies-signals-table.component';

describe('CompaniesSignalsTableComponent', () => {
  let component: CompaniesSignalsTableComponent;
  let fixture: ComponentFixture<CompaniesSignalsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesSignalsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesSignalsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
