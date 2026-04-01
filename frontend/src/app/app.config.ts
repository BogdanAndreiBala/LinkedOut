import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCustomIcons } from './shared/services/icon-registry';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AUTH_FEATURE_KEY } from './shared/store/auth/auth.selectors';
import { authReducer } from './shared/store/auth/auth.reducer';
import { AuthEffects } from './shared/store/auth/auth.effects';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { take } from 'rxjs/internal/operators/take';
import { AuthFacade } from './shared/store/auth/auth.facade';
import { filter } from 'rxjs/internal/operators/filter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
<<<<<<< HEAD
    provideHttpClient(withInterceptors([authInterceptor])),
    provideCustomIcons(),
    provideStore({
      [AUTH_FEATURE_KEY]: authReducer,
    }),
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAppInitializer(() => {
      const authFacade = inject(AuthFacade);
      authFacade.init();
      return authFacade.isAuthInitialized$.pipe(
        filter((isAuthInitialized: boolean) => isAuthInitialized === true),
        take(1),
      );
    }),
=======
    provideHttpClient(),
    provideCustomIcons(),
>>>>>>> master
  ],
};
