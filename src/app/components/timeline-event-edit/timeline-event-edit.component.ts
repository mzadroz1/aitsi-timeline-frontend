import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventType} from "../../models/event-type";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {TimelineEventService} from "../../services/timeline-event.service";
import {EventTypeService} from "../../services/event-type.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TimelineEventRequest} from "../../models/timeline-event-request";
import {TimelineEvent} from "../../models/timeline-event";

@Component({
  selector: 'app-timeline-event-edit',
  templateUrl: './timeline-event-edit.component.html',
  styleUrls: ['./timeline-event-edit.component.css']
})
export class TimelineEventEditComponent {

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
    public dialogRef: MatDialogRef<TimelineEventEditComponent>,
    @Inject(MAT_DIALOG_DATA) public editDialogData: EditDialogData
  ) {
    this.eventTypeList = editDialogData.eventTypeList;
    this.selectedEventType = this.findEventTypeById(editDialogData.timelineEvent.event_type_id).event_type_name;
    this.timelineEventFormGroup = formBuilder.group(
      {
        event_name: new FormControl(editDialogData.timelineEvent.event_name, [Validators.required]),
        event_start_date: new FormControl(editDialogData.timelineEvent.event_start_date, [Validators.required]),
        event_end_date: new FormControl(editDialogData.timelineEvent.event_end_date, [Validators.required]),
        short_description: new FormControl(editDialogData.timelineEvent.short_description, [Validators.required]),
        description: new FormControl(editDialogData.timelineEvent.description, [Validators.required]),
        img_url: new FormControl(editDialogData.timelineEvent.img_url),
        event_type_name: new FormControl(this.findEventTypeById(editDialogData.timelineEvent.event_type_id).event_type_name, [Validators.required]),
        // event_type_name: new FormControl('', [Validators.required]),
      }
    )
  }

  ngOnInit(): void {
    this.getEventTypeList();
  }

  editTimelineEvent() : void {
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

    this.timelineEventService.editTimelineEvent(timelineEventRequest, this.editDialogData.timelineEvent.id).subscribe({
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

  findEventTypeById(eventTypeId: number) : EventType {
    let eventType1 = this.eventTypeList.find((eventType) => eventType.id === eventTypeId);
    if(eventType1 !== undefined) {
      return eventType1;
    }
    throw new Error("Event type not found");
  }

  onSelectOption(event: any) {
    this.selectedEventType = event.value;
  }


}

export interface EditDialogData {
  timelineEvent: TimelineEvent;
  eventTypeList: EventType[];
}
