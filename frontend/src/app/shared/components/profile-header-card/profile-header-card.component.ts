import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-profile-header-card',
  imports: [MatCardModule, MatIconModule, AvatarComponent],
  templateUrl: './profile-header-card.component.html',
  styleUrl: './profile-header-card.component.scss',
  standalone: true,
})
export class ProfileHeaderCardComponent {
  @Input({ required: true }) user!: User;
}
