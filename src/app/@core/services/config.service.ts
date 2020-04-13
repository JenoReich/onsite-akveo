import { Injectable,Inject } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpRequest, HttpRequestDefaults } from './http-interfaces';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

export const config_file: string = 'assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public url_getLocationData: string="";
  public url_getRoutes: string="";
  public url_planning: string="";
  public url_monitoring: string="";

  /**stores the newly created http addresses */
  public urls: Object = {};

  /**triggers event when AJAX request has been finished */
  public dataHasArrived:BehaviorSubject<any>=new BehaviorSubject({});

  constructor(
    private httpService: HttpService,
    private http: HttpClient,

    /**baseHref:returns the absolute path, useful if the project is deployed 
     * on a server
     */
    @Inject(APP_BASE_HREF) private baseHref: string,
  ) {
    this.getUrls();
  }

  /**get endpoints from config file & create http addresses */
  public getUrls(): void {
    this.http.get(config_file).toPromise().then(data => {
      var server: string = data["urls"]["dev"].server;

      for (const endpoint of Object.entries(data["urls"]["dev"]["endpoints"])) {
        // console.log("display endpoints ", endpoint);
        var object = new Object();
        object[endpoint[0]] = server + endpoint[1];
        Object.assign(this.urls, object);
      }

      this.url_getLocationData = this.urls["getLocationData"];
      this.url_planning = this.urls["planning"];
      this.url_getRoutes = this.urls["getRoutes"];
      this.url_monitoring = this.urls["monitoring"];

      this.dataHasArrived.next(this.urls);
    })

  }


  /**loads data from server belonging to the locationID */
  public getLocationData(locationID: string): Promise<any> {
    var r: HttpRequest = { url: this.url_getLocationData + locationID, method: "GET", withCredentials: true, enableCache: false };
    return this.httpService.load(r);
  }


  /**loads route data from server*/
  public getRouteData(): Promise<any> {
    var r: HttpRequest = { url: this.url_getRoutes, method: "GET", withCredentials: true, enableCache: false };
    return this.httpService.load(r);
  }

  /**loads planning data from server*/
  public getPlanningData(): Promise<any> {
    var r: HttpRequest = { url: this.url_planning, method: "POST", withCredentials: true, enableCache: false };
    return this.httpService.load(r);
  }

  /**loads data regarding each location from the server*/
  public getMonitoringData(): Promise<any> {
    var r: HttpRequest = { url: this.url_monitoring, method: "GET", withCredentials: true, enableCache: false };
    return this.httpService.load(r);
  }

}
