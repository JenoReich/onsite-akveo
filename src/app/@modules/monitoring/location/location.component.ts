import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitoringDataStorageService } from '../@core/services/monitoring-data-storage.service';
import {ConfigService} from '../../../@core/services/config.service';

@Component({
  selector: 'ngx-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor(
    public storage: MonitoringDataStorageService,
    public route: ActivatedRoute,
    public ajax_service:ConfigService
    ) { }

  ngOnInit() {
    this.setVarsFromUrl();
    this.getLocationData();
  }

  /**retrieve locationID from current url and stores it in
   * the storage
   */
  public setVarsFromUrl(): void {
    this.storage.selectedLocationID = this.route.snapshot.paramMap.get('locationID');
    console.log("a lekérdezett locationID ", this.storage.selectedLocationID);
  }

  /**sends request to load data regarding the previously
   * retrieved locationID
   */
  public getLocationData():void{
    this.ajax_service.getLocationData(this.storage.selectedLocationID).then(
      data => {
        this.storage.locationData=data;
        this.storage.deviceData=data["_devicePositions"];
        console.log("log location data",this.storage.locationData);
        console.log("log devicePositions",this.storage.deviceData);
        this.storage.update();
      }
    )
  }



}
