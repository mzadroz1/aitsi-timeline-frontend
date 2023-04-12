import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineEventCreateComponent } from './timeline-event-create.component';

describe('TimelineEventCreateComponent', () => {
  let component: TimelineEventCreateComponent;
  let fixture: ComponentFixture<TimelineEventCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineEventCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineEventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
