import { Routes } from '@angular/router';
import { NetworkTableComponent } from './shared/components/network-table/network-table.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { SettingsComponent } from './shared/components/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'network', pathMatch: 'full' },
  { path: 'network', component: NetworkTableComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'settings', component: SettingsComponent },
];
