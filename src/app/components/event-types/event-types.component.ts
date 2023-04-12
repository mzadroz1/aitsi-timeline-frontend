import {Component, OnInit} from '@angular/core';
import {EventTypeService} from "../../services/event-type.service";
import {EventType} from "../../models/event-type";
import {MatTableDataSource} from "@angular/material/table";
import {CookieService} from "ngx-cookie-service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import jwtDecode from "jwt-decode";
import {EventTypeCreateComponent} from "../event-type-create/event-type-create.component";
import {EventTypeDeleteComponent} from "../event-type-delete/event-type-delete.component";

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.css']
})
export class EventTypesComponent implements OnInit {

  eventTypeList: EventType[] = [];

  dataSource: MatTableDataSource<EventType>;
  displayedColumns: string[] = [
    'id',
    'event_type_name',
    'color',
    'actions'
  ]

  constructor(private eventTypeService: EventTypeService,
              private cookieService: CookieService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EventTypesComponent>) { }

  ngOnInit(): void {
    this.getEventTypeList();
  }

  getEventTypeList() : void {
    this.eventTypeService.getEventTypeList()
      .subscribe(eventTypes => {
        this.eventTypeList = eventTypes;
        this.dataSource = new MatTableDataSource<EventType>(eventTypes);
      })
  }

  getDisplayedColumns(): string[] {
    if (!this.isUserLoggedIn()) {
      return this.displayedColumns.filter(col => col !== 'actions');
    }
    return this.displayedColumns;
  }

  isUserLoggedIn(): boolean {
    let token = this.cookieService.get('access_token');
    // @ts-ignore
    return token !== null && token !== '' && (jwtDecode(token).exp as number) >= Date.now() / 1000
  }

  openEditDialog(row : EventType) {
    this.dialog.open(EventTypeCreateComponent, {
      width: '400px',
      data: row
    })
  }

  openDeleteDialog(row : EventType) {
    this.dialog.open(EventTypeDeleteComponent, {
      data: row,
      width: '500px'
    });
  }

  openCreateEventType() {
    this.dialog.open(EventTypeCreateComponent, {
      width: '400px'
    });
  }
}
