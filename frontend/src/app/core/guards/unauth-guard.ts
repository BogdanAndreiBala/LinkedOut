import { CanMatchFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthFacade } from '../../shared/store/auth/auth.facade';
import { inject } from '@angular/core/primitives/di';

export const unauthGuard: CanMatchFn = (route, segments) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return true;
      } else {
        return router.parseUrl('/network');
      }
    }),
  );
};
