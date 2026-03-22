import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthFacade } from './shared/store/auth/auth.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('forms-homework-project');

  private readonly authFacade = inject(AuthFacade);

  ngOnInit(): void {
    this.authFacade.init();
  }
}
