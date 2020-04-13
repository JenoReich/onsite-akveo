import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseStationComponent } from './close-station.component';

describe('CloseStationComponent', () => {
  let component: CloseStationComponent;
  let fixture: ComponentFixture<CloseStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
