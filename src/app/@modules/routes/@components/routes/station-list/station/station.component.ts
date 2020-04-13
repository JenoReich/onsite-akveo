import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../../../@core/services/config.service';

@Component({
  selector: 'ngx-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  
  public json:any;
  public stations:any;
  public opening_hours:any;
  public stationTickets:any ='empty';
  // public station_id = '2564';
  // public tickets:any;

  constructor( public configService:ConfigService ) {  }

  ngOnInit() {
    this.configService.getRouteData().then(
      data =>{
        this.json=data;

        // console.log("log opening_hours ",this.json.openingHours);
        this.stations=this.json.stations;
        this.opening_hours=this.json.openingHours;
        this.stationTickets=this.json.stationTickets;
        // this.tickets = this.stationTickets[this.station_id];
         console.log("log station_tickets ",this.stationTickets);
      }
    )}
    public dateformatterFunction( date:any ) {
      date = date.split('-').join('.');
      return date.slice(0, -3);
    }
      
}
