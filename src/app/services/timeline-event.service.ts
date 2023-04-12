import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TimelineEvent} from "../models/timeline-event";
import {TimelineEventResponse} from "../models/timeline-event-response";
import {TimelineEventRequest} from "../models/timeline-event-request";

@Injectable({
  providedIn: 'root'
})
export class TimelineEventService {

  private timelineEventListUrl = 'https://aitsi-timeline.herokuapp.com/public/index.php/events'

  constructor(private httpClient: HttpClient) { }

  getTimelineEventList(): Observable<TimelineEvent[]> {
    return this.httpClient.get<TimelineEvent[]>(this.timelineEventListUrl);
  }

  getTimelineEventById(timelineEventId: number): Observable<TimelineEvent> {
    return this.httpClient.get<TimelineEvent>(this.timelineEventListUrl + '/' + timelineEventId);
  }

  createNewTimelineEvent(timelineEventRequest: TimelineEventRequest): Observable<TimelineEventResponse> {
    return this.httpClient.post<TimelineEventResponse>(this.timelineEventListUrl, timelineEventRequest);
  }

  editTimelineEvent(timelineEventRequest: TimelineEventRequest, timelineEventId: number): Observable<TimelineEventResponse> {
    return this.httpClient.put<TimelineEventResponse>(this.timelineEventListUrl + '/' + timelineEventId, timelineEventRequest);
  }

  deleteTimelineEvent(timelineEventId: number): Observable<TimelineEventResponse> {
    return this.httpClient.delete<TimelineEventResponse>(this.timelineEventListUrl + '/' + timelineEventId);
  }

}
