import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {EventTypesComponent} from './components/event-types/event-types.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './components/login/login.component';
import {LoginInterceptor} from "./components/interceptors/login.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {TimelineEventComponent} from './components/timeline-event/timeline-event.component';
import {MatTabsModule} from "@angular/material/tabs";
import {NgxMatTimelineModule} from "ngx-mat-timeline";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TimelineEventCreateComponent} from './components/timeline-event-create/timeline-event-create.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import { TimelineEventEditComponent } from './components/timeline-event-edit/timeline-event-edit.component';
import { TimelineEventDeleteComponent } from './components/timeline-event-delete/timeline-event-delete.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatBadgeModule} from "@angular/material/badge";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { TimelineEventTableComponent } from './components/timeline-event-table/timeline-event-table.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { EventTypeCreateComponent } from './components/event-type-create/event-type-create.component';
import { EventTypeDeleteComponent } from './components/event-type-delete/event-type-delete.component';
import { InfoComponent } from './components/info/info.component';
import {MatListModule} from "@angular/material/list";
import {CdkColumnDef} from "@angular/cdk/table";

@NgModule({
  declarations: [
    AppComponent,
    EventTypesComponent,
    LoginComponent,
    TimelineEventComponent,
    TimelineEventCreateComponent,
    TimelineEventEditComponent,
    TimelineEventDeleteComponent,
    TimelineEventTableComponent,
    EventTypeCreateComponent,
    EventTypeDeleteComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterOutlet,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    NgxMatTimelineModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true},
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
