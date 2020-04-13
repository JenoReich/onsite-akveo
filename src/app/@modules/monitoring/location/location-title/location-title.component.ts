import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../@core/services/config.service';
import { MonitoringDataStorageService } from '../../@core/services/monitoring-data-storage.service';

@Component({
  selector: 'ngx-location-title',
  templateUrl: './location-title.component.html',
  styleUrls: ['./location-title.component.scss']
})
export class LocationTitleComponent implements OnInit {

  public json: any;
  public locationID: string = 'empty';
  public location_name: string = 'empty';

  constructor(private configService: ConfigService,
    public storage: MonitoringDataStorageService
  ) { }

  ngOnInit() {
    this.storage.dataHasArrived.subscribe(
      () => {
        console.log("data has been arrived", this.storage.locationData);
        if (this.storage.locationData != undefined) {
            this.locationID = this.storage.locationData.location.locationID,
            this.location_name = this.storage.locationData.location.location_name,
            console.log("location name ", this.location_name)
        }

      }
    )
  }

}
