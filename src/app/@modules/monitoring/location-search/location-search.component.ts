import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import { ConfigService } from '@app/@core/services/config.service';
import { Router } from '@angular/router';
import { MonitoringDataStorageService } from '../@core/services/monitoring-data-storage.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit, AfterViewInit {

  myControl = new FormControl();
  public selections: Array<any> = [];
  public filteredOptions: Observable<any[]>;
  
  /**contains the options: data will be come from ajax */
  public options: Array<any> = [];


  constructor(
    private ajax_service: ConfigService,
    private router:Router,
    private storage:MonitoringDataStorageService
    ) { }

  ngOnInit() {
    this.ajax_service.getMonitoringData().then(
      data => {
        console.log("display each location ", data["locations"]);
        this.options = data["locations"];
        this.ajax_service.dataHasArrived.next("");
      }
    )
  }

  public ngAfterViewInit(): void {
    //do it only after data has been arrived from ajax request
    this.ajax_service.dataHasArrived.subscribe(
      () => {
        this.filteredOptions = this.myControl.valueChanges.debounceTime(10)
          .pipe(
            startWith(''),
            map(value => this.displayCategoryTitle(value)),
          );

        this.myControl.valueChanges.debounceTime(10).subscribe(
          ()=>{
            console.log("log input value ",this.myControl.value);
            console.log("log selection ",this.selections);
          }
        )  
        
      }
    )

  }

  public displayCategoryTitle(value: any): any[] {
    this.selections = [];
    const filterValue = value.toLowerCase();
    for (const option of this.options) {
      if (option["locationID"].toLowerCase().includes(filterValue)) {
        this.selections.push(option["locationID"]);
      }
    }
    if (this.selections.length > 0) {
      return this.selections;
    } else {
      return ["no macthes"];
    }
  }


  /**navigates to the detailed page of the selected location */
  public viewLocationDetails():void{
    this.router.navigateByUrl('monitoring/'+this.storage.selectedLocationID).then(
      ()=>{
        console.log("navigation works");
        this.storage.selectedLocationID=this.myControl.value;
      }
    ).catch(
      ()=>{
        console.log("navigation failed");
      }
    )
  }


  /**sends request to load data regarding the previously
   * retrieved locationID
   */
  public getLocationData():void{
    //retrieve locationID from input field
    this.storage.selectedLocationID=this.myControl.value
    this.ajax_service.getLocationData(this.storage.selectedLocationID).then(
      data => {
        this.storage.locationData=data;
        this.storage.deviceData=data["_devicePositions"];
        this.viewLocationDetails();
      }
    )
  }

}
