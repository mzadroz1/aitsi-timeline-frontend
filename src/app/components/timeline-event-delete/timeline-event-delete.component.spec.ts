import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineEventDeleteComponent } from './timeline-event-delete.component';

describe('TimelineEventDeleteComponent', () => {
  let component: TimelineEventDeleteComponent;
  let fixture: ComponentFixture<TimelineEventDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineEventDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineEventDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
