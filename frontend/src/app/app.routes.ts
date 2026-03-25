import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'network', pathMatch: 'full' },
  {
    path: 'network',
    loadComponent: () =>
      import('./shared/components/network-table/network-table.component').then(
        (m) => m.NetworkTableComponent,
      ),
  },

  {
    path: 'profile/:id',
    loadComponent: () =>
      import('./shared/components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent,
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./shared/components/settings/settings.component').then((m) => m.SettingsComponent),
  },
];
