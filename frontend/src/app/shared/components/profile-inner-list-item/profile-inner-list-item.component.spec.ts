import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInnerListItemComponent } from './profile-inner-list-item.component';

describe('ProfileInnerListItemComponent', () => {
  let component: ProfileInnerListItemComponent;
  let fixture: ComponentFixture<ProfileInnerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInnerListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInnerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
