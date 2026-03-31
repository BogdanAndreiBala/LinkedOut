import { Routes } from '@angular/router';
import { unauthGuard } from './core/guards/unauth-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'network', pathMatch: 'full' },

  {
    path: 'login',
    canActivate: [unauthGuard],
    loadComponent: () =>
      import('./shared/components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [unauthGuard],
    loadComponent: () =>
      import('./shared/components/register/register.component').then((m) => m.RegisterComponent),
  },

  {
    path: 'network',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/components/network-table/network-table.component').then(
        (m) => m.NetworkTableComponent,
      ),
  },

  {
    path: 'profile/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent,
      ),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/components/settings/settings.component').then((m) => m.SettingsComponent),
  },

  {
    path: 'companies',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/components/companies-table/companies-table.component').then(
        (m) => m.CompaniesComponent,
      ),
  },

  {
    path: 'jobs',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/components/jobs-table/jobs-table.component').then((m) => m.JobsComponent),
  },

  { path: '**', redirectTo: 'network' },
];
