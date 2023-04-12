import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TimelineEvent} from "../../models/timeline-event";
import {TimelineEventService} from "../../services/timeline-event.service";

@Component({
  selector: 'app-timeline-event-delete',
  templateUrl: './timeline-event-delete.component.html',
  styleUrls: ['./timeline-event-delete.component.css']
})
export class TimelineEventDeleteComponent {

  constructor(
    private timelineEventService: TimelineEventService,
    public dialogRef: MatDialogRef<TimelineEventDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public deletedTimelineEvent: TimelineEvent
  ) {
  }

  deleteEvent(): void {
    this.timelineEventService.deleteTimelineEvent(this.deletedTimelineEvent.id).subscribe({
      next: () => {
        this.dialogRef.close();
        window.location.reload();
      }
    })
  }

}
