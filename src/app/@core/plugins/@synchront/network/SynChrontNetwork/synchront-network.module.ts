import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpService} from './@core/services/http-service/http-service.service';
import {SynchrontNetworkRoutingModule} from './synchront-network-routing.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    //SynchrontNetworkRoutingModule,
    

  ],
  providers:[
    HttpService,
      ]
  ,entryComponents:[
    ]
})
export class SynchrontNetworkModule { }
