import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeCreateComponent } from './event-type-create.component';

describe('EventTypeCreateComponent', () => {
  let component: EventTypeCreateComponent;
  let fixture: ComponentFixture<EventTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
