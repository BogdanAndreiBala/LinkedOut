import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EndDatePipe } from '../../pipes/end-date.pipe';
import { MatCardModule } from '@angular/material/card';
import { AvatarComponent } from '../avatar/avatar.component';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule, MatChipSet } from '@angular/material/chips';
import { ProfileMainListItemComponent } from '../profile-main-list-item/profile-main-list-item.component';
import { ProfileInnerListItemComponent } from '../profile-inner-list-item/profile-inner-list-item.component';

@Component({
  selector: 'app-user-profile',
  imports: [
    MatCardModule,
    AvatarComponent,
    MatIconModule,
    MatChipsModule,
    MatChipSet,
    ProfileMainListItemComponent,
    ProfileInnerListItemComponent,
    DatePipe,
    EndDatePipe,
  ],
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
