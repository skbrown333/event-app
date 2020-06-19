import { MAP } from "../constants/constants";
import { Event } from "../models/Event";

export interface AppContext {
  account?: any;
  events: Array<Event>;
  current_location?: any;
  center?: any;
  zoom?: number;
  toast?: Array<any>;
}

export const InitialState: AppContext = {
  account: {},
  events: [],
  current_location: {},
  center: MAP.default_location,
  zoom: 15,
  toast: [],
};
