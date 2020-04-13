import { Component, OnInit, Input } from '@angular/core';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { StationTicketPopupComponent } from '../station-ticket/station-ticket-popup/station-ticket-popup.component';

@Component({
  selector: 'ngx-station-ticket',
  templateUrl: './station-ticket.component.html',
  styleUrls: ['./station-ticket.component.scss']
})
export class StationTicketComponent {
  @Input() ticket:any;
  constructor( 
    private windowService: NbWindowService 
   ) { } 
    

  /**opens the ModalArticleMetaDataEditor's template*/
  TicketPopup() {
    this.windowService.open(StationTicketPopupComponent, { title: `Ticket: ticket_name or ticket_backend_issue` });
    console.log('it s magic!');
  }

}
