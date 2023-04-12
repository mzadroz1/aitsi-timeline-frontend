import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventTypesComponent} from "./components/event-types/event-types.component";
import {LoginComponent} from "./components/login/login.component";
import {TimelineEventComponent} from "./components/timeline-event/timeline-event.component";
import {TimelineEventCreateComponent} from "./components/timeline-event-create/timeline-event-create.component";


const routes: Routes = [
  { path: '', component: TimelineEventComponent },
  { path: 'login', component: LoginComponent },
  { path: 'eventTypes', component: EventTypesComponent },
  { path: 'events', component: TimelineEventComponent },
  { path: 'events/create', component: TimelineEventCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
