import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * contains data which is to share between more modules
 */
export class CentralDataStorageService {

  /**
   * contains the gps coordinates of each station
   */
  public currentRoute:any[]=[];

  constructor() { }

  /**
   * collects all of the coordinates of the current route and
   * push them into the currentroute variable
   */
  public getAllTheCoordinates(route:any):void{
    for (const station of route["stations"]) {
      var x=new Object();
      x["location_gps_lat"]=station["location_gps_lat"];
      x["location_gps_lng"]=station["location_gps_lng"];
      this.currentRoute.push(x);
    }
  }
}
