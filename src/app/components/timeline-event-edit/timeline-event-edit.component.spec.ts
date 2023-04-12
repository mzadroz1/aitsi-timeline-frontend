import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineEventEditComponent } from './timeline-event-edit.component';

describe('TimelineEventEditComponent', () => {
  let component: TimelineEventEditComponent;
  let fixture: ComponentFixture<TimelineEventEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineEventEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
