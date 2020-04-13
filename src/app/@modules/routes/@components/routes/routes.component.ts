import { Component, OnInit } from '@angular/core';

import { ConfigService } from '@app/@core/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { CentralDataStorageService } from '@app/@core/services/central-data-storage.service';


@Component({
  selector: 'ngx-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  public json:any;
  public routes:any;
  public showStart:boolean = false;
  public showStations:boolean = true;
  public showMap:boolean = true;

  constructor(
    
    public route: ActivatedRoute,
    public configService: ConfigService,
    public centralStorage:CentralDataStorageService
    ) { }

  ngOnInit() {

    this.configService.getLocationData("ATAWAI").then(
      data => {
        console.log("location data ", data)
      }
    ).catch(
      () => {
        console.log("failed to load data");
      }
    ),

      this.configService.getPlanningData().then(
        data => {
          console.log("planning data ", data)
        }
      ).catch(
        () => {
          console.log("failed to load data");
        }
      ),

      this.configService.getRouteData().then(
        data => {
          this.routes=data;
          console.log("routes ", this.routes);
          this.centralStorage.getAllTheCoordinates(this.routes);
        }
      ).catch(
        () => {
          console.log("failed to load data");
        }
      ),

      this.configService.getMonitoringData().then(
        data => {
          console.log("monitoring data ", data)
        }
      ).catch(
        () => {
          console.log("failed to load data");
        }
      )
  }
  public dateformatterFunction( date:any ) {
    date = date.split('-').join('.');
    return date.slice(0, -3);
  }
  public ShowStations() {
    console.log('showstations:', this.showStart, this.showStations, this.showMap)
    if(this.showStart== false) {
      this.showStart = true;
      this.showStations = false;
      this.showMap = false;
    }
    else if(this.showStart== true){
      this.showStart = false;
      this.showStations = true;
      this.showMap = true;
    }
  }
  // public showMap_() {
  //   console.log('test_map_hide', this.showMap);
  //   if(this.showMap==true) {
  //     this.showMap = false;
  //   }
  //   else if(this.showMap == false){
  //     this.showMap = true;
  //   }
    
  // }
}
