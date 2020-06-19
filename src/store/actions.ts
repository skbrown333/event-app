import { Event } from "../models/Event";

export const ADD_EVENT_ACTION = "AddEventAction";
export const UPDATE_EVENTS_ACTION = "UpdateEventsAction";
export const UPDATE_FILTER_ACTION = "UpdateFilterAction";
export const UPDATE_LOCATION_ACTION = "UpdateLocationAction";
export const UPDATE_CENTER_ACTION = "UpdateCenterAction";
export const UPDATE_ZOOM_ACTION = "UpdateZoomAction";
export const UPDATE_ACCOUNT_ACTION = "UpdateAccountAction";

export function addEvent(event: any) {
  return {
    type: ADD_EVENT_ACTION,
    payload: event,
  };
}

export function updateAccount(account) {
  return {
    type: UPDATE_ACCOUNT_ACTION,
    payload: account,
  };
}

export function updateEvents(events: Array<Event>) {
  return {
    type: UPDATE_EVENTS_ACTION,
    payload: events,
  };
}

export function updateLocation(current_location: any) {
  return {
    type: UPDATE_LOCATION_ACTION,
    payload: current_location,
  };
}

export function updateCenter(center: any) {
  return {
    type: UPDATE_CENTER_ACTION,
    payload: center,
  };
}

export function updateZoom(zoom: any) {
  return {
    type: UPDATE_ZOOM_ACTION,
    payload: zoom,
  };
}
