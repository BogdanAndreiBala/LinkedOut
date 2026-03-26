import { DestroyRef, Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Input } from '@angular/core';
import { User } from '../../models/user.model';
import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthFacade } from '../../store/auth/auth.facade';

@Directive({
  selector: '[appIfCurrentUser]',
  standalone: true,
  host: {},
})
export class IfCurrentUserDirective implements OnInit {
  private destroyRef = inject(DestroyRef);

  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  private authFacade = inject(AuthFacade);

  private loggedUserId!: number;
  private revieweduserId!: number;

  @Input() set appIfCurrentUser(id: number) {
    this.revieweduserId = id;
    this.decideRender();
  }

  ngOnInit(): void {
    this.authFacade.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.loggedUserId = user.id;
          this.decideRender();
        }
      },
    });
  }

  public decideRender() {
    if (this.loggedUserId && this.revieweduserId && this.loggedUserId === this.revieweduserId) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
