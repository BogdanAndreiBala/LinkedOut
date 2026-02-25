import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { NetworkTableComponent } from './shared/components/network-table/network-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NetworkTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('forms-homework-project');
}
