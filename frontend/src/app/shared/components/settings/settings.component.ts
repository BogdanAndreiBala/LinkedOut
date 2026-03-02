import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { ProfileMainListItemComponent } from '../profile-main-list-item/profile-main-list-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [
    ProfileMainListItemComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
})
export class SettingsComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UsersService);
  private router = inject(Router);
  public maxDate = new Date();
  public minDate = new Date(
    this.maxDate.getFullYear() - 100,
    this.maxDate.getMonth(),
    this.maxDate.getDate(),
  );

  public settingsForm: FormGroup = this.formBuilder.group({
    personalInfo: this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      headline: ['', [Validators.required, Validators.maxLength(120)]],
      image: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
      dateOfBirth: [''],
      location: [
        '',
        [Validators.maxLength(100), Validators.pattern(/^[A-Za-z][A-Za-z\s\-]+,\s[A-Za-z]{2}$/)],
      ],
    }),

    contactInfo: this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[+]?[0-9 \-()]{7,15}$/)]],
      website: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
    }),

    about: ['', Validators.maxLength(500)],
  });

  public ngOnInit(): void {
    this.userService.currentUser().subscribe({
      next: (user: User) => {
        this.settingsForm.get('personalInfo')?.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          headline: user.headline,
          image: '',
          dateOfBirth: user.dateOfBirth,
          location: user.location,
        });

        this.settingsForm.get('contactInfo')?.patchValue({
          email: user.email,
          phone: user.phone,
          website: user.website,
        });

        this.settingsForm.get('about')?.patchValue(user.about);
      },
    });
  }

  private formatLocation(location: string): string {
    if (!location || !location.includes(', ')) return location;

    const parts = location.split(', ');
    const city = parts[0].replace(/\b\w/g, (char) => char.toUpperCase());
    const country = parts[1].toUpperCase();

    return `${city}, ${country}`;
  }

  public onSave(): void {
    if (this.settingsForm.valid) {
      this.userService.currentUser().subscribe((currentUser) => {
        const formData = this.settingsForm.value;
        const updatedUser: User = {
          ...currentUser,
          firstName: formData.personalInfo.firstName,
          lastName: formData.personalInfo.lastName,
          headline: formData.personalInfo.headline,
          profileImage: formData.personalInfo.image || currentUser.profileImage,
          dateOfBirth: formData.personalInfo.dateOfBirth,
          location: this.formatLocation(formData.personalInfo.location),
          email: formData.contactInfo.email,
          phone: formData.contactInfo.phone,
          website: formData.contactInfo.website,
          about: formData.about,
        };

        this.userService.updateUser(updatedUser).subscribe({
          next: () => {
            this.router.navigate(['network']);
          },
        });
      });
    }
  }
}
