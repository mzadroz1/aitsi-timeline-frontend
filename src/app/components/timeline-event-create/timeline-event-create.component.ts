import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {TimelineEventService} from "../../services/timeline-event.service";
import {TimelineEventRequest} from "../../models/timeline-event-request";
import {EventType} from "../../models/event-type";
import {EventTypeService} from "../../services/event-type.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-timeline-event-create',
  templateUrl: './timeline-event-create.component.html',
  styleUrls: ['./timeline-event-create.component.css']
})
export class TimelineEventCreateComponent {

  timelineEventFormGroup: FormGroup;
  eventTypeList: EventType[] = [];
  selectedEventType: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private timelineEventService: TimelineEventService,
    private eventTypeService: EventTypeService,
    public dialogRef: MatDialogRef<TimelineEventCreateComponent>
  ) {
    this.timelineEventFormGroup = formBuilder.group(
      {
        event_name: new FormControl('', [Validators.required]),
        event_start_date: new FormControl('', [Validators.required]),
        event_end_date: new FormControl('', [Validators.required]),
        short_description: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        img_url: new FormControl(''),
        event_type_name: new FormControl('', [Validators.required]),
      }
    )
  }

  ngOnInit(): void {
    this.getEventTypeList();
  }

  createTimelineEvent() : void {
    // @ts-ignore
    const timelineEventRequest: TimelineEventRequest = {
      event_name: this.timelineEventFormGroup.get('event_name')?.value,
      event_start_date: this.timelineEventFormGroup.get('event_start_date')?.value,
      event_end_date: this.timelineEventFormGroup.get('event_end_date')?.value,
      short_description: this.timelineEventFormGroup.get('short_description')?.value,
      description: this.timelineEventFormGroup.get('description')?.value,
      img_url: this.timelineEventFormGroup.get('img_url')?.value,
      event_type_id: this.findEventTypeByName(this.timelineEventFormGroup.get('event_type_name')?.value)?.id
    }

    this.timelineEventService.createNewTimelineEvent(timelineEventRequest).subscribe({
      next: () => {
        this.dialogRef.close();
        window.location.reload();
      }
    })
  }

  getEventTypeList() : void {
    this.eventTypeService.getEventTypeList()
      .subscribe(eventTypes => {
        this.eventTypeList = eventTypes;
      })
  }

  findEventTypeByName(eventTypeName: string) : EventType {
    let eventType1 = this.eventTypeList.find((eventType) => eventType.event_type_name === eventTypeName);
    if(eventType1 !== undefined) {
      return eventType1;
    }
    throw new Error("Event type not found");
  }

  onSelectOption(event: any) {
    this.selectedEventType = event.value;
  }

}
