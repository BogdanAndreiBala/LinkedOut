import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { IfCurrentUserDirective } from '../../directives/if-current-user/if-current-user.directive';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-profile-header-card',
  imports: [MatCardModule, MatIconModule, AvatarComponent, IfCurrentUserDirective, MatButton],

  templateUrl: './profile-header-card.component.html',
  styleUrl: './profile-header-card.component.scss',
  standalone: true,
})
export class ProfileHeaderCardComponent {
  @Input({ required: true }) user!: User;
  private router = inject(Router);

  public onClick(): void {
    this.router.navigate(['/settings']);
  }
}
