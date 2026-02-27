import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainListItemComponent } from './profile-main-list-item.component';

describe('ProfileMainListItemComponent', () => {
  let component: ProfileMainListItemComponent;
  let fixture: ComponentFixture<ProfileMainListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMainListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMainListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
