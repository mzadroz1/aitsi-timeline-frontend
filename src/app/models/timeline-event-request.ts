export interface TimelineEventRequest {
  event_name : string,
  event_start_date : Date,
  event_end_date : Date,
  short_description : string,
  description : string,
  img_url : string,
  event_type_id : number
}
