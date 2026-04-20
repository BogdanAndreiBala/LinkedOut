import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthFacade } from './shared/store/auth/auth.facade';
import { AsyncPipe } from '@angular/common';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { UserTableFacade } from './shared/store/user-table/user-table.facade';
import { UiFacade } from './shared/store/ui/ui.facade';
import { loadPreferencesFromStorage } from './shared/store/user-table/user-table.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AsyncPipe, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('forms-homework-project');
  public readonly userTableFacade = inject(UserTableFacade);
  public readonly authFacade = inject(AuthFacade);
  public readonly uiFacade = inject(UiFacade);

  ngOnInit(): void {
    this.authFacade.currentUser$.subscribe((user) => {
      if (user) {
        this.uiFacade.initTheme(user.isDarkTheme || false);
      }
    });
    this.userTableFacade.loadPreferencesFromStorage();
  }
}
