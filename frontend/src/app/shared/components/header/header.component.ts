import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, AvatarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly service = inject(UsersService);
  private router = inject(Router);

  public onLogoClick(): void {
    this.router.navigate(['network']);
  }
}
