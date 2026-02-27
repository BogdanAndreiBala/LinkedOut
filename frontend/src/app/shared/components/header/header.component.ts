import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [CommonModule, AvatarComponent, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly service = inject(UsersService);
  private router = inject(Router);

  public onLogoClick(): void {
    this.router.navigate(['network']);
  }

  public onSettingsClick(): void {
    this.router.navigate(['/settings']);
  }
}
