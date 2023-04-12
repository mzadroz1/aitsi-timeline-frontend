import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventTypeService} from "../../services/event-type.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventTypeRequest} from "../../models/event-type-request";
import {EventType} from "../../models/event-type";

@Component({
  selector: 'app-event-type-create',
  templateUrl: './event-type-create.component.html',
  styleUrls: ['./event-type-create.component.css']
})
export class EventTypeCreateComponent implements OnInit{

  eventTypeFormGroup: FormGroup;
  invalidNewEventType: boolean;
  eventTypeList: EventType[] = [];
  colorList: string[] = [
    'white',
    'red',
    'blue',
    'black',
    'orange',
    'orangered',
    'deepskyblue',
    'green',
    'silver',
    'magenta',
    'yellow',
    'cyan',
    'indigo'
  ]

  selectedColor: string;

  constructor(
    private formBuilder: FormBuilder,
    private eventTypeService: EventTypeService,
    public dialogRef: MatDialogRef<EventTypeCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public editedEventType: EventType
) {
    console.log(this.editedEventType)
    if(this.editedEventType === null) {
      this.eventTypeFormGroup = formBuilder.group(
        {
          event_type_name: new FormControl('', [Validators.required]),
          color: new FormControl('', [Validators.required])
        }
      )
    } else {
      this.selectedColor = this.editedEventType.color;
      this.eventTypeFormGroup = formBuilder.group(
        {
          event_type_name: new FormControl(editedEventType.event_type_name, [Validators.required]),
          color: new FormControl(this.editedEventType.color, [Validators.required])
        }
      )
    }
  }

  ngOnInit(): void {
    this.getEventTypeList();
  }

  getEventTypeList(): void {
    this.eventTypeService.getEventTypeList()
      .subscribe(eventTypes => {
        this.eventTypeList = eventTypes;
      })
  }

  onSelectOption(event: any) {
    this.selectedColor = event.value;
  }

  createEventType() : void {
    const eventTypeRequest : EventTypeRequest = {
      event_type_name: this.eventTypeFormGroup.get('event_type_name')?.value,
      color: this.eventTypeFormGroup.get('color')?.value
    }

    if(this.editedEventType === null) {
      this.eventTypeService.createNewEventType(eventTypeRequest).subscribe( {
        next: () => {
          this.dialogRef.close();
          window.location.reload();
        },
        error: () => {
          this.invalidNewEventType = true;
        }
      })
    } else {
      this.eventTypeService.editEventType(eventTypeRequest, this.editedEventType.id).subscribe( {
        next: () => {
          this.dialogRef.close();
          window.location.reload();
        },
        error: () => {
          this.invalidNewEventType = true;
        }
      })
    }
  }

  getColorList() {
    return this.colorList.filter(color => !this.eventTypeList.some(eventType => eventType.color === color));
  }

  getFormLabel() : string {
    if(this.editedEventType === null) {
      return 'Create new event type!';
    } else {
      return 'Edit event type!';
    }
  }

  getButtonLabel() : string {
    if(this.editedEventType === null) {
      return 'Create Event Type';
    } else {
      return 'Edit Event Type';
    }
  }
}
