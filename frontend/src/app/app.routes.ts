import { Routes } from '@angular/router';
import { NetworkTableComponent } from './shared/components/network-table/network-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'network', pathMatch: 'full' },
  { path: 'network', component: NetworkTableComponent },
];
