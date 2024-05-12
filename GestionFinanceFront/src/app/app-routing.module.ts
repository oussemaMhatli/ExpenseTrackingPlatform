// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import DashAnalyticsComponent from './demo/dash-analytics copy/dash-analytics.component';
import { TransactionComponent } from './demo/transaction/transaction.component';

const routes: Routes = [
  { path: 'dashboard ', component: DashAnalyticsComponent },


  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signup',
        pathMatch: 'full'
      },

      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics/dash-analytics.component')
      },
      {
        path: 'home',
        loadComponent: () => import('./demo/dash-analytics copy/dash-analytics.component')

      },

      { path: 'temperature',
      loadChildren: () => import('./demo/temperature-centre/temperature.module').then(m => m.TemperatureModule)

    },

      {
      path: 'Equipement',
      loadComponent: () => import('./demo/connected-devices/connected-devices.component')
    },
     {
      path: 'Remote',
      loadComponent: () => import('./demo/remote/remote.component')
    },

     {
      path: 'alerts',
      loadChildren: () => import('./demo/alerts/alerts.module').then((m) => m.AlertsModule)
    },

      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./demo/user-management/user-management.module').then((m) => m.UserManagementModule)
      },
      {
        path: 'site-configurations',
        loadChildren: () => import('./demo/site-configurations/site-configurations/site-configurations.module').then(m => m.SiteConfigurationsModule)

      },

      {
        path: 'chart',
        loadComponent: () => import('./demo/chart & map/core-apex/core-apex.component')
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms & tables/form-elements/form-elements.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/forms & tables/tbl-bootstrap/tbl-bootstrap.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      },
      {path:"transaction",component:TransactionComponent}

    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'auth/signup',
        loadComponent: () => import('./demo/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./demo/authentication/sign-in/sign-in.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
