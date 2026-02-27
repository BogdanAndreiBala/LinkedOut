import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AvatarComponent } from '../avatar/avatar.component';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  imports: [MatCardModule, AvatarComponent, MatIconModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
})
export class UserProfileComponent implements OnInit {
  private userService = inject(UsersService);
  private currentRoute = inject(ActivatedRoute);

  public user?: User;

  public ngOnInit(): void {
    const userId = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.userService.getUserById(userId).subscribe({
      next: (user: User) => (this.user = user),
    });
  }
}
