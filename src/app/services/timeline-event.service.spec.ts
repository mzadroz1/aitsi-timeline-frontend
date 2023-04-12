import { TestBed } from '@angular/core/testing';

import { TimelineEventService } from './timeline-event.service';

describe('TimelineEventService', () => {
  let service: TimelineEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
