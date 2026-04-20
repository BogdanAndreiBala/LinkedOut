import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
<<<<<<< HEAD
import * as UiActions from './ui.actions';
=======
>>>>>>> master
import { selectIsDarkTheme } from './ui.selectors';
import { initTheme, toggleTheme } from './ui.actions';

@Injectable({ providedIn: 'root' })
export class UiFacade {
  private store = inject(Store);

  public isDarkTheme$ = this.store.select(selectIsDarkTheme);

  public initTheme(isDarkTheme: boolean): void {
    this.store.dispatch(initTheme({ isDarkTheme }));
  }

  public toggleTheme(): void {
    this.store.dispatch(toggleTheme());
  }
}
