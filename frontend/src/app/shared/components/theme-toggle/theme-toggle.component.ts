import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UiFacade } from '../../store/ui/ui.facade';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/internal/operators/map';
@Component({
  selector: 'app-theme-toggle',
  imports: [MatIconModule, MatButtonModule, AsyncPipe],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  standalone: true,
})
export class ThemeToggleComponent {
  public uiFacade = inject(UiFacade);

  public toggleTheme(): void {
    this.uiFacade.toggleTheme();
  }

  public themeIcon$ = this.uiFacade.isDarkTheme$.pipe(
    map((isDark) => (isDark ? 'light_mode' : 'dark_mode')),
  );
}
