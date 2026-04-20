import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { filter } from 'rxjs/internal/operators/filter';
import { AuthFacade } from '../../store/auth/auth.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authFacade = inject(AuthFacade);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  public hidePassword = true;

  public isLoading$ = this.authFacade.loading$;

  public registerForm: FormGroup = this.formBuilder.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator },
  );

  public ngOnInit(): void {
    this.authFacade.errors$
      ?.pipe(
        filter((error) => error !== null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((err) => {
        this.snackBar.open(err, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      const registrationData = { firstName, lastName, email, password };

      this.authFacade.register(registrationData);
    }
  }
}
