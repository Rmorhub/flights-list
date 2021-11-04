import { DEPARTURES_FLIGHTS_LIST, ARRIVALS_FLIGHTS_LIST } from './flightsList.actions';

const initialState = {
  flightsList: [],
};

const flightsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEPARTURES_FLIGHTS_LIST:
      return {
        ...state,
        flightsList: action.payload.flightsList,
      };
    case ARRIVALS_FLIGHTS_LIST:
      return {
        ...state,
        flightsList: action.payload.flightsList,
      };
    default:
      return state;
  }
};

export default flightsListReducer;
