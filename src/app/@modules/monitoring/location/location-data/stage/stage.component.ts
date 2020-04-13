import { Component, OnInit, Input } from '@angular/core';
import { MonitoringDataStorageService } from '@app/@modules/monitoring/@core/services/monitoring-data-storage.service';
import { DeviceDataPack } from '@app/@modules/monitoring/@core/interfaces/device-data-pack.interface';

@Component({
  selector: 'ngx-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  @Input() public stage:any;
  @Input() public stageType:any;
  @Input() public systemID:any;
  @Input() public numberOfDisplays:any;
  @Input() public stageData:Array<any>;
  @Input() public deviceData:DeviceDataPack;
  public stageData_belonging_to_this_Stage:any;
  public furtherStageData:Array<any>=[];

  public devicePositions_of_this_stage:Array<any>;

  constructor(public storage:MonitoringDataStorageService) { }

  ngOnInit() {
    console.log("log stageID ",this.stage)
    this.getDevicePositionsToThisStage(this.stage.stageID);
    console.log("log device positions ",this.devicePositions_of_this_stage);
    console.log("log stage data in stagecomponent",this.stageData);
    this.stageData_belonging_to_this_Stage=this.stageData[this.stage.stageID];
    console.log("log stage data regarding stage id in stagecomponent",this.stageData_belonging_to_this_Stage);
    this.getFurtherStageinformation();
    console.log("log devideData pack ",this.deviceData);
    this.fillUpDeviceDataPack();
    console.log("log svg route ",this.stage.icon)
  }

  
  
  /**gets  the 'devicePositions' connecting to 
   * the current stageID
   * & filters the positions by the word 'screen'
   * */
  public getFurtherStageinformation():void{
    console.log("kéákéá ",Object.values(this.stageData_belonging_to_this_Stage) );
    for (const deviceOjbect of Object.entries(this.stageData_belonging_to_this_Stage)) {
      if (!deviceOjbect[0].includes("SCREEN")) {
        this.furtherStageData.push(deviceOjbect[1]);  
      }
      
      
    }

  }

  /**continues to fill up the inherited deviceDataPack object with the
   * current information
   */
  public fillUpDeviceDataPack():void{
    this.deviceData.stageID=this.stage.stageID;
  }

  /**gets the '_devicePositions' connecting to 
   * the current stageID
   */
  
  public getDevicePositionsToThisStage(stageID:string):void{
    this.devicePositions_of_this_stage=this.storage.locationData["_devicePositions"][stageID];
  }
  

  
}
