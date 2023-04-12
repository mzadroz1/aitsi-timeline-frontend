import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineEventTableComponent } from './timeline-event-table.component';

describe('TimelineEventTableComponent', () => {
  let component: TimelineEventTableComponent;
  let fixture: ComponentFixture<TimelineEventTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineEventTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineEventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
