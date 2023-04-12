import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventTypeService} from "../../services/event-type.service";
import {EventType} from "../../models/event-type";

@Component({
  selector: 'app-event-type-delete',
  templateUrl: './event-type-delete.component.html',
  styleUrls: ['./event-type-delete.component.css']
})
export class EventTypeDeleteComponent {

  unableToDelete: boolean;

  constructor(
    private eventTypeService: EventTypeService,
    public dialogRef: MatDialogRef<EventTypeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public deletedEventType: EventType
  ) {
    this.unableToDelete = false;
  }

  deleteEventType(): void {
    this.eventTypeService.deleteEventType(this.deletedEventType.id).subscribe({
      next: () => {
        this.dialogRef.close();
        window.location.reload();
      },
      error: () => {
        this.unableToDelete = true;
      }
    })
  }
}
