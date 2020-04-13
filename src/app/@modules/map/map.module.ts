import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MapRoutingModule } from './map-routing.module';
import { LeafletComponent } from './leaflet/leaflet.component';
import { NbCardModule } from '@nebular/theme';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [LeafletComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    NbCardModule,
    LeafletModule.forRoot(),
  ],
  exports:[
    LeafletComponent
  ]
})
export class MapModule { }
