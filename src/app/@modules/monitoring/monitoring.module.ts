import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { LocationComponent } from './location/location.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import { LocationTitleComponent } from './location/location-title/location-title.component';
import { LocationDataComponent } from './location/location-data/location-data.component';
import { StageComponent } from './location/location-data/stage/stage.component';
import { DeviceComponent } from './location/location-data/stage/device/device.component';
import { ServiceComponent } from './location/location-data/stage/device/service/service.component';
import { ProgressbarComponent } from './location/location-data/stage/device/service/progressbar/progressbar.component';
//import { MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatExpansionModule, MatTabsModule, MatListModule} from '@angular/material';
import {MonitoringComponent} from './monitoring.component'
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MonitoringComponent,
    LocationComponent, 
    LocationSearchComponent, 
    LocationTitleComponent, 
    LocationDataComponent, 
    StageComponent, 
    DeviceComponent, 
    ServiceComponent, 
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    //MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatExpansionModule, MatTabsModule, MatListModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MonitoringModule { }
