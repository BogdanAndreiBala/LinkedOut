import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthFacade } from '../../../shared/store/auth/auth.facade';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public authFacade = inject(AuthFacade);

  public isCollapsed = true;

  public toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public logout(): void {
    this.authFacade.logout();
  }
}
