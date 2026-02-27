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
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
})
export class SettingsComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UsersService);
  private router = inject(Router);

  public settingsForm: FormGroup = this.formBuilder.group({
    personalInfo: this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      headline: ['', [Validators.maxLength(120)]],
      image: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
      dateOfBirth: [
        '',
        [Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/), pastDateValidator],
      ],
      location: ['', [Validators.maxLength(100)]],
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
          location: formData.personalInfo.location,
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

export function pastDateValidator(control: FormControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }

  const inputDate = new Date(value);
  const today = new Date();

  if (inputDate > today) {
    return { futureDate: true };
  }
  return null;
}
