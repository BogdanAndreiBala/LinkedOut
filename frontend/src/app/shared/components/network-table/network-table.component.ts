import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-network-table',
  imports: [MatTableModule, AvatarComponent],
  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
  standalone: true,
})
export class NetworkTableComponent implements OnInit {
  private userService = inject(UsersService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  public users: User[] = [];
  public columnsToDisplay: string[] = ['name', 'headline', 'location', 'connections'];
  public isOffline: boolean = false;

  ngOnInit(): void {
    this.userService.allUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.isOffline = false;
        localStorage.setItem('cached-data', JSON.stringify(this.users));
      },
      error: (err) => {
        const savedData = localStorage.getItem('cached-data');
        if (savedData) {
          this.users = JSON.parse(savedData);
          this.isOffline = true;
          const snackBarRef = this.snackBar.open(
            'You are offline! This list might not contain the most recent data!!!',
            'Close',
            {
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar'],
            },
          );

          window.addEventListener(
            'online',
            () => {
              snackBarRef.dismiss();

              this.snackBar.open('You are back online! Please refresh the page.', 'Close', {
                duration: 10000,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['success-snackbar'],
              });
            },
            { once: true },
          );
        } else {
          this.snackBar.open('Cannot load network list. The server might be offline.', 'Close', {
            duration: 5000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar'],
          });
        }
      },
    });
  }

  public onRowClick(user: User) {
    this.router.navigate(['/profile', user.id]);
  }
}
