import { Component, OnInit } from '@angular/core';
import { NbWindowService, NbWindowRef, NbInputModule } from '@nebular/theme';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ngx-station-ticket-popup-component',
  templateUrl: './station-ticket-popup.component.html',
  styleUrls: ['./station-ticket-popup.component.scss']
})
export class StationTicketPopupComponent implements OnInit {

  constructor(
    public windowRef: NbWindowRef,
    private windowService: NbWindowService,
  ) {
    //ide jon a megjelenítendo cucc
   }

  ngOnInit() {
  }

  /**close modal */
  close() {
    this.windowRef.close();
  }

}