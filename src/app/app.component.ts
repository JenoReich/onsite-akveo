import { Component, OnInit } from '@angular/core';
import { ConfigService } from './@core/services/config.service';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    console.log("appcomponent is beginning");
    }
}