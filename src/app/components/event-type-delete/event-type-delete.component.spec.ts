import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeDeleteComponent } from './event-type-delete.component';

describe('EventTypeDeleteComponent', () => {
  let component: EventTypeDeleteComponent;
  let fixture: ComponentFixture<EventTypeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTypeDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTypeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
