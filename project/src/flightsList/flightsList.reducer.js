import { FLIGHTS_LIST_RECIEVED } from './flightsList.actions';

const initialState = {
  flightsList: [],
};

const flightsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FLIGHTS_LIST_RECIEVED:
      return {
        ...state,
        flightsList: action.payload.flightsList,
      };
    default:
      return state;
  }
};

export default flightsListReducer;
