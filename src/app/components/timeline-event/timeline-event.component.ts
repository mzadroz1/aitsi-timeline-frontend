import {Component, OnInit, ViewChild} from '@angular/core';
import {TimelineEvent} from "../../models/timeline-event";
import {TimelineEventService} from "../../services/timeline-event.service";
import {EventType} from "../../models/event-type";
import {EventTypeService} from "../../services/event-type.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {TimelineEventCreateComponent} from "../timeline-event-create/timeline-event-create.component";
import {TimelineEventEditComponent} from "../timeline-event-edit/timeline-event-edit.component";
import {TimelineEventDeleteComponent} from "../timeline-event-delete/timeline-event-delete.component";
import {CookieService} from "ngx-cookie-service";
import jwtDecode from 'jwt-decode'
import {EventTypesComponent} from "../event-types/event-types.component";
import {InfoComponent} from "../info/info.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.scss']
})
export class TimelineEventComponent implements OnInit {

  timelineEventList: TimelineEvent[] = [];
  eventTypeList: EventType[] = [];

  constructor(private timelineEventService: TimelineEventService,
              private eventTypeService: EventTypeService,
              private cookieService: CookieService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTimelineEventList();
    this.getEventTypeList();
  }

  getTimelineEventList() : void {
    this.timelineEventService.getTimelineEventList()
      .subscribe({
        next: timelineEvents => {
          this.timelineEventList = timelineEvents;
          this.timelineEventList.sort((a, b) => (a.event_start_date < b.event_start_date ? -1 : 1));
        }
      })
  }

  getEventTypeList() : void {
    this.eventTypeService.getEventTypeList()
      .subscribe(eventTypes => {
        this.eventTypeList = eventTypes;
      })
  }

  findEventTypeById(eventTypeId: number) : EventType | undefined {
    return this.eventTypeList.find((eventType) => eventType.id === eventTypeId);
  }

  isEventStartDateEqualToEventEndDate(timelineEvent: TimelineEvent) : boolean {
    return timelineEvent.event_start_date === timelineEvent.event_end_date;
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent);

  }

  openInfoDialog(): void {
    // this.dialog.open(InfoComponent, {
    //   width: '500px'
    // });
    this.router.navigateByUrl("info");
  }

  openCreateEvent(): void {
    this.dialog.open(TimelineEventCreateComponent);
  }

  openEditDialog(item: TimelineEvent) {
    this.dialog.open(TimelineEventEditComponent, {
      data: {
        timelineEvent: item,
        eventTypeList: this.eventTypeList
      },
      width: '500px'
    });
  }

  openDeleteDialog(item: TimelineEvent) {
    this.dialog.open(TimelineEventDeleteComponent, {
      data: item,
      width: '500px'
    });
  }

  isUserLoggedIn() : boolean {
    let token = this.cookieService.get('access_token');
    // @ts-ignore
    return token !== null && token !== '' && (jwtDecode(token).exp as number) >= Date.now() / 1000
  }

  logout() {
    this.cookieService.delete('access_token');
  }

  openEventTypesDialog() {
    this.dialog.open(EventTypesComponent);
  }
}
