import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventType} from "../models/event-type";
import {EventTypeRequest} from "../models/event-type-request";
import {EventTypeResponse} from "../models/event-type-response";
import {TimelineEventResponse} from "../models/timeline-event-response";

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  private eventTypeListUrl = 'https://aitsi-timeline.herokuapp.com/public/index.php/event_types'

  constructor(private httpClient: HttpClient) { }

  getEventTypeList(): Observable<EventType[]> {
    return this.httpClient.get<EventType[]>(this.eventTypeListUrl);
  }

  createNewEventType(eventTypeRequest: EventTypeRequest): Observable<EventTypeResponse> {
    return this.httpClient.post<EventTypeResponse>(this.eventTypeListUrl, eventTypeRequest);
  }

  editEventType(eventTypeRequest: EventTypeRequest, id: number): Observable<EventTypeResponse> {
    return this.httpClient.put<EventTypeResponse>(this.eventTypeListUrl + '/' + id, eventTypeRequest);
  }

  deleteEventType(id: number) {
    return this.httpClient.delete<TimelineEventResponse>(this.eventTypeListUrl + '/' + id);
  }
}
