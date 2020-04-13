import { Component, OnInit, Input } from '@angular/core';
import { DeviceDataPack } from '@app/@modules/monitoring/@core/interfaces/device-data-pack.interface';
import { MonitoringDataStorageService } from '@app/@modules/monitoring/@core/services/monitoring-data-storage.service';
import { ServiceDataPack } from '@app/@modules/monitoring/@core/interfaces/service-data-pack.interface';

@Component({
  selector: 'ngx-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  @Input() serviceID:string;
  @Input() deviceData:DeviceDataPack;
  @Input() serviceData:ServiceDataPack;

  public version_number:string;

  constructor(public storage:MonitoringDataStorageService) { }

  ngOnInit() {
    console.log("log device data pack from service ",this.deviceData);
    this.fillUpDeviceDataPack();
    console.log("log service data pack from service ",this.serviceData);
    this.serviceID=this.serviceData.serviceID;
    console.log("log serviceID ",this.serviceID);
  }

  /**continues to fill up the inherited deviceDataPack object with the
   * current information
   */
  public fillUpDeviceDataPack():void{
    for (const iterator of Object.values(this.storage.locationData["playerVersionsReportedByPlayers"])) {
      if (iterator["deviceID"]==this.deviceData.deviceID) {
        this.version_number=iterator["deviceproperty_value"];
        break;
      }
    }
    

  }

}
