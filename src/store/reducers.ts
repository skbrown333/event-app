import * as Actions from "./actions";

export const Reducer = (state, action) => {
  switch (action.type) {
    case Actions.UPDATE_LOCATION_ACTION:
      return { ...state, ...{ current_location: action.payload } };
    case Actions.UPDATE_CENTER_ACTION:
      return { ...state, ...{ center: action.payload } };
    case Actions.UPDATE_ZOOM_ACTION:
      let zoom = action.payload;
      return { ...state, ...{ zoom } };
    case Actions.UPDATE_EVENTS_ACTION:
      return { ...state, ...{ events: state.concat(action.payload) } };
    case Actions.ADD_EVENT_ACTION:
      return { ...state, ...{ events: [action.payload].concat(state) } };
    case Actions.UPDATE_ACCOUNT_ACTION:
      return { ...state, ...{ account: action.payload } };
    default:
      return state;
  }
};
