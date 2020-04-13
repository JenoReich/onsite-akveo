import { Component, OnInit,Input } from '@angular/core';
import { MonitoringDataStorageService } from '@app/@modules/monitoring/@core/services/monitoring-data-storage.service';
import { DeviceDataPack, DefaultDeviceDataPack } from '@app/@modules/monitoring/@core/interfaces/device-data-pack.interface';
import { ServiceDataPack, DefaultServiceDataPack } from '@app/@modules/monitoring/@core/interfaces/service-data-pack.interface';

@Component({
  selector: 'ngx-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() devicePosition:any;
  @Input() deviceData:DeviceDataPack;
  public devicePropertyValue:string;
  public serviceIDS:string[];
  public servicePacks:ServiceDataPack[];

  public serviceData=new DefaultServiceDataPack();

  constructor(public storage:MonitoringDataStorageService) { }

  ngOnInit() {
    console.log("log dev position ",this.devicePosition);
    console.log("log deviceID ",this.devicePosition.deviceID);
    this.storage.dataHasArrived.subscribe(
      ()=>{
        this.get_deviceproperty_value(this.devicePosition.deviceID);
        this.getServiceIDS();
        this.fillUpDeviceDataPack();
        this.fillUpServiceDataPack();
        console.log("log device data pack in from device ",this.deviceData);
      }
    );
     console.log("log device prop value ",this.devicePropertyValue); 
    
  }

  /**gets deviceproperty_value in connection with
   * the given deviceID
   */
  public get_deviceproperty_value(deviceID:string):void{  
    for (const iterator of Object.values(this.storage.locationData["deviceIPV4s"])) {
      if (iterator["deviceID"]==deviceID) {
        this.devicePropertyValue=iterator["deviceproperty_value"];
      }
    }
  }

  
  /**get serviceIDS of the current device and convert it
   * into an array -> do it only if the serviceIDS key has a value
   */
  public getServiceIDS():string[] {
    if (this.devicePosition["serviceIDS"]!=undefined) {
      this.serviceIDS=[];
      this.deviceData.serviceIDS=[];
      for (const iterator of this.devicePosition["serviceIDS"].toString().split(",")) {
        console.log("log serviceIDS ",iterator);
        this.serviceIDS.push(iterator);

        /**fill up deviceData with the current information*/
        this.deviceData.serviceIDS.push(iterator);
      }  
    }
    return this.serviceIDS;
  }

  /**continues to fill up the inherited deviceDataPack object with the
   * current information
   */
  public fillUpDeviceDataPack():void{
    this.deviceData.deviceID=this.devicePosition.deviceID;
    this.deviceData.devicePositionID=this.devicePosition.devicepositionID;
    this.deviceData.device_activity=this.devicePosition["device_activities"].toString().split(",");
  }


  /**
   * fills up the servicePacks array with newly created ServiceDataPack objects;
   * these ServiceDataPack objects will get their id and activity value and
   * these information will be lended to the child (service) component
   */
  public fillUpServiceDataPack():void{
    this.servicePacks=[];
    for (const serviceID of this.serviceIDS) {
      var servicePackDataObject=new DefaultServiceDataPack();
      servicePackDataObject.serviceID=serviceID;
      this.servicePacks.push(servicePackDataObject)
    }

    //get the elements of the array and complete them with activity values
    for (const servicePack of this.servicePacks) {
      for (const activity of this.deviceData.device_activity) {
        servicePack.device_activity=activity;
        break;
      }    
    }
    
    console.log("log servicePack array ",this.servicePacks);
  }


  

}
