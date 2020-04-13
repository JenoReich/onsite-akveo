import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationTicketComponent } from './station-ticket.component';

describe('StationTicketComponent', () => {
  let component: StationTicketComponent;
  let fixture: ComponentFixture<StationTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
