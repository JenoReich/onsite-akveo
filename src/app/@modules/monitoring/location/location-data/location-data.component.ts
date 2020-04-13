import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../@core/services/config.service';
import { MonitoringDataStorageService } from '../../@core/services/monitoring-data-storage.service';
import {DeviceDataPack,DefaultDeviceDataPack} from '../../@core/interfaces/device-data-pack.interface';

@Component({
  selector: 'ngx-location-data',
  templateUrl: './location-data.component.html',
  styleUrls: ['./location-data.component.scss']
})
export class LocationDataComponent implements OnInit {
  //ezt a jsont megváltoztatni, legyen bszédesebb
  public json: any;
  public locationID: string = 'empty';
  public location_name: string = 'empty';
  public countrycode: string = 'empty';
  public zip_city: string = 'empty';
  public address: string = 'empty';
  public description: string = 'empty';
  public location_code: string = 'empty';
  public opening_hours: string[];
  public device_positions: string[];
  public device_position_names: string[] = [];
  public stages: Array<any> = [];
  public stageData: Array<any> = [];
  public stageTypeID: any;
  public systemID: any;
  public numberOfDisplays:any;

  public deviceData:DeviceDataPack=new DefaultDeviceDataPack();


  constructor(private configService: ConfigService,
    public storage: MonitoringDataStorageService) { }

  ngOnInit() {
    this.storage.dataHasArrived.subscribe(
      () => {
        console.log("data has been arrived");
        if (this.storage.locationData != undefined) {
          this.deviceData.locationID=this.locationID = this.storage.locationData.location.locationID;
          this.location_name = this.storage.locationData.location.location_name;
          this.countrycode = this.storage.locationData.location.locationID.substring(0, 2) + ', ';
          this.zip_city = this.storage.locationData.location.location_zip + ' ' + this.storage.locationData.location.cityID;
          this.address = this.storage.locationData.location.location_address;
          this.description = this.storage.locationData.location.location_desc;
          this.location_code = this.storage.locationData.location.location_code;
          this.opening_hours = this.storage.locationData.openinghours;
          this.device_positions = this.storage.locationData.devicePositions;
          for (let key in this.device_positions) {
            this.device_position_names.push(key);
            console.log(key);
          };
          this.stages = this.storage.locationData.stages;
          this.stageData = this.storage.locationData.devicePositions;
          console.log("log stage data ", this.stageData);
          this.deviceData.stageTypeID=this.stageTypeID = Object.values(Object.values(this.stageData)[0])[0]["stagetypeID"];
          this.deviceData.systemID=this.systemID = Object.values(Object.values(this.stageData)[0])[0]["systemID"];
          this.numberOfDisplays = Object.values(Object.values(this.stageData)[0])[0]["stage_displays"];

          console.log("log stage type id ", Object.values(Object.values(this.stageData)[0])[0]["stagetypeID"]);
          console.log("log sysid ",this.systemID);

        }
      }
    )

    /*
  this.configService.getLocationData(this.storage.selectedLocationID).then(
    data => {
      this.json = data;

      console.log("log this.json ", this.json);
      this.stages = this.json.stages;
      console.log("log this.stages ", this.stages);
      // console.log("log json ",this.json["openinghours"]);
      // console.log(this.json.location);
      // console.log(this.json["location"].locationID);
      this.locationID = this.json.location.locationID;
      this.location_name = this.json["location"].location_name;
      this.countrycode = this.json["location"].locationID.substring(0, 2) + ', ';
      this.zip_city = this.json["location"].location_zip + ' ' + this.json["location"].cityID;
      this.address = this.json["location"].location_address;
      this.description = this.json["location"].location_desc;
      this.location_code = this.json["location"].location_code;
      this.opening_hours = this.json["openinghours"];
      this.device_positions = this.json["devicePositions"];
      console.log("log json dp", this.device_positions);
      for (let key in this.device_positions) {
        this.device_position_names.push(key);
        console.log(key);
      }
      console.log(this.device_position_names);
    }
  )
  */
  }
}
