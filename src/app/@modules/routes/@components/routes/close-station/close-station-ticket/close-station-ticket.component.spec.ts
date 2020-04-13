import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseStationTicketComponent } from './close-station-ticket.component';

describe('CloseStationTicketComponent', () => {
  let component: CloseStationTicketComponent;
  let fixture: ComponentFixture<CloseStationTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseStationTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseStationTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
