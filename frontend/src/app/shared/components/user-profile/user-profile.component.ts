import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EndDatePipe } from '../../pipes/end-date.pipe';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule, MatChipSet } from '@angular/material/chips';
import { ProfileMainListItemComponent } from '../profile-main-list-item/profile-main-list-item.component';
import { ProfileInnerListItemComponent } from '../profile-inner-list-item/profile-inner-list-item.component';
import { ProfileHeaderCardComponent } from '../profile-header-card/profile-header-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RandomColorDirective } from '../../directives/random-color/random-color.directive';
import { Experience } from '../../models/experience.model';
import { Education } from '../../models/education.model';

@Component({
  selector: 'app-user-profile',
  imports: [
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatChipSet,
    ProfileMainListItemComponent,
    ProfileInnerListItemComponent,
    ProfileHeaderCardComponent,
    DatePipe,
    RandomColorDirective,
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

  public mappedEducation: Education[] = [];
  public mappedExperience: Experience[] = [];

  public ngOnInit(): void {
    const userId = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.userService
      .getUserById(userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User) => {
          this.user = user;

          this.mappedEducation = user.education.map((edu) => ({
            ...edu,
            institution: edu.institution,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            startYear: edu.startYear,
            endYear: edu.endYear,
          }));

          this.mappedExperience = user.experience.map((exp) => ({
            ...exp,
            title: exp.title,
            location: exp.location,
            startDate: exp.startDate,
            endDate: exp.endDate,
            description: exp.description,
            company: exp.company,
          }));
        },
      });
  }

  public getEducationDateRange(education: Education): string {
    const startYear = education.startYear;
    const endYear = this.endDatePipe.transform(education.endYear);
    return `${startYear}—${endYear}`;
  }

  public getExperienceDateRange(experience: Experience): string {
    const startDate = experience.startDate;
    const endDate = this.endDatePipe.transform(experience.endDate);
    return `${startDate}—${endDate}`;
  }
}
