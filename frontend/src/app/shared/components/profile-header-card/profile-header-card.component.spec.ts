import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHeaderCardComponent } from './profile-header-card.component';

describe('ProfileHeaderCardComponent', () => {
  let component: ProfileHeaderCardComponent;
  let fixture: ComponentFixture<ProfileHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileHeaderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
