import { Component, inject, OnInit, DestroyRef } from '@angular/core';
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
import { ProfileHeaderCardComponent } from '../profile-header-card/profile-header-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface ProfileSectionListItem {
  title: string;
  subtitle: string;
  dateRange: string;
  description?: string;
}

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
    ProfileHeaderCardComponent,
    DatePipe,
  ],
  providers: [EndDatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
})
export class UserProfileComponent implements OnInit {
  private userService = inject(UsersService);
  private currentRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  private endDatePipe = inject(EndDatePipe);

  public user?: User;

  public mappedEducation: ProfileSectionListItem[] = [];
  public mappedExperience: ProfileSectionListItem[] = [];

  public ngOnInit(): void {
    const userId = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.userService
      .getUserById(userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User) => {
          this.user = user;

          this.mappedEducation = user.education.map((edu) => ({
            title: edu.institution,
            subtitle: `${edu.degree} • ${edu.fieldOfStudy}`,
            dateRange: `${edu.startYear}—${this.endDatePipe.transform(edu.endYear)}`,
          }));

          this.mappedExperience = user.experience.map((exp) => ({
            title: exp.title,
            subtitle: `${exp.company} • ${exp.location}`,
            dateRange: `${exp.startDate}—${this.endDatePipe.transform(exp.endDate)}`,
            description: exp.description,
          }));
        },
      });
  }
}
