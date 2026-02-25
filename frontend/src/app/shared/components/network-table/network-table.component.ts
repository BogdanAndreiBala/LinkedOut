import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { AvatarComponent } from '../avatar/avatar.component';

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

  public users: User[] = [];
  public columnsToDisplay: string[] = ['name', 'headline', 'location', 'connections'];

  ngOnInit(): void {
    this.userService.allUsers().subscribe({
      next: (data: User[]) => (this.users = data),
    });
  }

  public onRowClick(user: User) {
    this.router.navigate(['/profile', user.id]);
  }
}
