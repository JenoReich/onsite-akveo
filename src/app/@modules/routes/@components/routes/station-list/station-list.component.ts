import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../../@core/services/config.service';


@Component({
  selector: 'ngx-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {

  public json:any;
  public routes:any;

  constructor( public configService:ConfigService ) { }

  ngOnInit() {
    this.configService.getRouteData().then(
      data =>{
        this.json=data;

        console.log("log this.json ",this.json);
        this.routes=this.json;
      }
    )}
    public dateformatterFunction( date:any ) {
      date = date.split('-').join('.');
      return date.slice(0, -3);
    }
}
