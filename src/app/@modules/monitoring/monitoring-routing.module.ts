import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import {MonitoringComponent} from './monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: MonitoringComponent,

    children:[
      {
        path:'',
        component: LocationSearchComponent,
      },
      {
        path:':locationID',
        component: LocationComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
