import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthFacade } from './shared/store/auth/auth.facade';
import { AsyncPipe } from '@angular/common';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { UserTableFacade } from './shared/store/user-table/user-table.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AsyncPipe, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('forms-homework-project');

  public readonly authFacade = inject(AuthFacade);
  public readonly userTableFacade = inject(UserTableFacade);

  ngOnInit(): void {
    this.authFacade.init();
  }
}
