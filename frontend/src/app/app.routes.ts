import { Routes } from '@angular/router';
import { NetworkTableComponent } from './shared/components/network-table/network-table.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'network', pathMatch: 'full' },
  { path: 'network', component: NetworkTableComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  {
    path: 'settings',
    loadComponent: () =>
      import('./shared/components/settings/settings.component').then((m) => m.SettingsComponent),
  },
];
