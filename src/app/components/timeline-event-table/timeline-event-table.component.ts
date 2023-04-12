import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TimelineEvent} from "../../models/timeline-event";
import {TimelineEventService} from "../../services/timeline-event.service";
import {EventTypeService} from "../../services/event-type.service";
import {MatSort} from "@angular/material/sort";
import {EventType} from "../../models/event-type";
import {TimelineEventEditComponent} from "../timeline-event-edit/timeline-event-edit.component";
import {TimelineEventDeleteComponent} from "../timeline-event-delete/timeline-event-delete.component";
import jwtDecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY'
  },
};

@Component({
  selector: 'app-timeline-event-table',
  templateUrl: './timeline-event-table.component.html',
  styleUrls: ['./timeline-event-table.component.css'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class TimelineEventTableComponent implements OnInit {

  timelineEventList: TimelineEvent[] = [];

  eventTypeList: EventType[] = [];

  filterDatesFormGroup: FormGroup;

  dataSource: MatTableDataSource<TimelineEvent>;
  displayedColumns: string[] = [
    'id',
    'event_name',
    'event_start_date',
    'event_end_date',
    'short_description',
    'description',
    'img_url',
    'event_type_id',
    'actions'
  ]

  @ViewChild(MatSort) sort: MatSort;

  constructor(private timelineEventService: TimelineEventService,
              private eventTypeService: EventTypeService,
              private cookieService: CookieService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.filterDatesFormGroup = formBuilder.group(
      {
        fromDate: new FormControl(null),
        toDate: new FormControl(null)
      }
    )
  }

  ngOnInit(): void {
    this.getTimelineEventList();
    this.getEventTypeList();
  }

  applyDateFilter() {
    let fromDate = this.filterDatesFormGroup.get('fromDate')?.value;
    let toDate = this.filterDatesFormGroup.get('toDate')?.value;
    this.dataSource.data=this.timelineEventList;
    if(fromDate === null && toDate !== null) {
      this.dataSource.data = this.dataSource.data.filter(e => e.event_start_date <= toDate.format());
    }
    if(fromDate !== null && toDate === null) {
      this.dataSource.data = this.dataSource.data.filter(e => e.event_start_date >= fromDate.format());
    }
    if(fromDate !== null && toDate !== null) {
      this.dataSource.data = this.dataSource.data.filter(e => e.event_start_date >= fromDate.format() && e.event_start_date <= toDate.format());
    }
  }

  clearFilters() {
    this.dataSource.data=this.timelineEventList;
    this.filterDatesFormGroup.reset()
  }


  isFilteringDisabled() : boolean {
    let fromDate = this.filterDatesFormGroup.get('fromDate')?.value;
    let toDate = this.filterDatesFormGroup.get('toDate')?.value;
    return fromDate === null && toDate  === null
  }

  isFromDateEarlierThanToDate() : boolean {
    let fromDate = this.filterDatesFormGroup.get('fromDate')?.value;
    let toDate = this.filterDatesFormGroup.get('toDate')?.value;
    return fromDate !== null && toDate !== null && fromDate > toDate
  }


  getDisplayedColumns(): string[] {
    if (!this.isUserLoggedIn()) {
      return this.displayedColumns.filter(col => col !== 'actions');
    }
    return this.displayedColumns;
  }

  getTimelineEventList(): void {
    this.timelineEventService.getTimelineEventList()
      .subscribe({
        next: timelineEvents => {
          this.timelineEventList = timelineEvents;
          this.timelineEventList.sort((a, b) => (a.event_start_date < b.event_start_date ? -1 : 1));
          this.dataSource = new MatTableDataSource<TimelineEvent>(timelineEvents);
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
            if (typeof data[sortHeaderId] === 'string') {
              return data[sortHeaderId].toLocaleLowerCase();
            }

            return data[sortHeaderId];
          };
        }
      })
  }

  getEventTypeList(): void {
    this.eventTypeService.getEventTypeList()
      .subscribe(eventTypes => {
        this.eventTypeList = eventTypes;
      })
  }

  findEventTypeById(eventTypeId: number): EventType | undefined {
    return this.eventTypeList.find((eventType) => eventType.id === eventTypeId);
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

  isUserLoggedIn(): boolean {
    let token = this.cookieService.get('access_token');
    // @ts-ignore
    return token !== null && token !== '' && (jwtDecode(token).exp as number) >= Date.now() / 1000
  }

}
