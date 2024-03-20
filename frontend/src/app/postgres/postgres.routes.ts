import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatabaseSettingsComponent } from './dashboard/database-settings/database-settings.component';

export const postgresRoutes: Routes = [
    {
      path:'postgres/plan',
      component: LandingComponent
    },
    {
      path: 'postgres',
      component: DashboardComponent
    },
    {
      path: 'postgres/settings/:UUID',
      component: DatabaseSettingsComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./dashboard/database-settings/database-settings-routing.module').then(m => m.DatabaseSettingsRoutingModule)
        }
      ]
    },
    {
      path: 'settings',
      loadChildren: () => import('./dashboard/database-settings/database-settings.module').then(m => m.DatabaseSettingsModule)
    },
  ];