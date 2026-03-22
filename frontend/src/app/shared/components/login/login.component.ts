import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../core/services/auth.service';
import { AuthFacade } from '../../store/auth/auth.facade';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private authFacade = inject(AuthFacade);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  public hidePassword = true;
  public isLoggingIn = false;

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public ngOnInit(): void {
    this.authFacade.isAuthenticated$
      .pipe(
        filter((isAuthenticated) => isAuthenticated === true),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.router.navigate(['/network']);
      });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoggingIn = true;
      const credentials = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this.authService
        .login(credentials)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          error: (err) => {
            this.isLoggingIn = false;
            this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
              duration: 5000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar'],
            });
          },
        });
    }
  }
}
