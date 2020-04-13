import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@auth/auth.guard';
import { DefaultLayoutComponent } from './@components/layouts/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    /** Different layout for inner pages (with authentication) */
    //canActivate: [ AuthGuard ],
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        //canActivate: [ AuthGuard ],
        loadChildren: () => import('./@modules/default-layout/default-layout.module').then(m => m.DefaultLayoutModule),
      },

      {
        path: 'routes',
        //canActivate: [ AuthGuard ],
        loadChildren: () => import('./@modules/routes/routes.module').then(m => m.RoutesModule),
      },

      {
        path: 'monitoring',
        //canActivate: [ AuthGuard ],
        loadChildren: () => import('./@modules/monitoring/monitoring.module').then(m => m.MonitoringModule),
      },

      { path: '', redirectTo: 'routes', pathMatch: 'full' },
      { path: '**', redirectTo: 'routes' },

    ]
  },
  {
    path: 'auth',
    /** It use "empty" layout for auth/login form etc. */
    loadChildren: () => import('@app/@auth/auth.module').then(m => m.AuthModule),
  },

  { path: '', redirectTo: 'routes', pathMatch: 'full' },
  { path: '**', redirectTo: 'routes' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() { }
}