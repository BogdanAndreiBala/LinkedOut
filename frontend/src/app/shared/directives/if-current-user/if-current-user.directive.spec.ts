import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { IfCurrentUserDirective } from './if-current-user.directive';
import { AuthFacade } from '../../store/auth/auth.facade';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  imports: [IfCurrentUserDirective],
  template: '<div *appIfCurrentUser="targetId" class="test-content">visible</div>',
})
class TestHostComponent {
  targetId: number = 2;
}

describe('IfCurrentUserDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let currentUserSubject: BehaviorSubject<User | null>;

  beforeEach(async () => {
    currentUserSubject = new BehaviorSubject<User | null>(null);
    const mockAuthFacade = {
      currentUser$: currentUserSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, IfCurrentUserDirective],
      providers: [{ provide: AuthFacade, useValue: mockAuthFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  it("should render the template when appIfCurrentUser matches the current user's id", () => {
    hostComponent.targetId = 2;
    currentUserSubject.next({ id: 2 } as User);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.test-content');
    expect(content).toBeTruthy();
  });

  it('should NOT render the template when the IDs do not match', () => {
    hostComponent.targetId = 3;
    currentUserSubject.next({ id: 231242 } as User);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.test-content');
    expect(content).toBeNull();
  });

  it('should clear and re-evaluate the view when the current user changes in the store', () => {
    hostComponent.targetId = 2;
    currentUserSubject.next({ id: 2 } as User);
    fixture.detectChanges();

    let content = fixture.nativeElement.querySelector('.test-content');
    expect(content).toBeTruthy();

    currentUserSubject.next({ id: 99 } as User);
    fixture.detectChanges();

    content = fixture.nativeElement.querySelector('.test-content');
    expect(content).toBeNull();
  });
});
