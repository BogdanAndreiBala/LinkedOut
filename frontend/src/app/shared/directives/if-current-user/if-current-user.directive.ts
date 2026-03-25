import { DestroyRef, Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Input } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appIfCurrentUser]',
  standalone: true,
  host: {},
})
export class IfCurrentUserDirective implements OnInit {
  private userService: UsersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  private loggedUserId!: number;
  private revieweduserId!: number;

  @Input() set appIfCurrentUser(id: number) {
    this.revieweduserId = id;
    this.decideRender();
  }

  ngOnInit(): void {
    this.userService
      .currentUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.loggedUserId = user.id;
          this.decideRender();
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

  constructor() {}
}
