import { StationTicketPopupComponent } from './@components/routes/station-list/station/station-ticket/station-ticket-popup/station-ticket-popup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsmViewComponent } from '../../osm-view/osm-view.component';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './@components/routes/routes.component';
import { MapComponent } from './@components/routes/map/map.component';
import { CloseStationComponent } from './@components/routes/close-station/close-station.component';
import { CloseStationTicketComponent } from './@components/routes/close-station/close-station-ticket/close-station-ticket.component';
import { StationListComponent } from './@components/routes/station-list/station-list.component';
import { StationComponent } from './@components/routes/station-list/station/station.component';
import { StationTicketComponent } from './@components/routes/station-list/station/station-ticket/station-ticket.component';
import { MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatExpansionModule, MatTabsModule, MatListModule, MatFormFieldModule } from '@angular/material';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbSelectModule, NbWindowService, NbButtonModule, NbTooltipModule } from '@nebular/theme';
import { MapModule } from '../map/map.module';


@NgModule({
  providers: [
    NbWindowService,
  ],
  declarations: [
    RoutesComponent, 
    MapComponent, 
    CloseStationComponent, 
    CloseStationTicketComponent, 
    StationListComponent, 
    StationComponent, 
    StationTicketComponent,
    StationTicketPopupComponent,
    OsmViewComponent,
  ],
  entryComponents:[StationTicketPopupComponent],
  imports: [
    MapModule,
    NbInputModule, 
    CommonModule,
    RoutesRoutingModule,
    AngularOpenlayersModule,
    MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatExpansionModule, MatTabsModule, MatListModule, MatFormFieldModule,
    NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbSelectModule, NbButtonModule, NbTooltipModule,
  ]
})
export class RoutesModule { }
