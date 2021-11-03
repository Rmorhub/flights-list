import * as flightGateway from './flightsGateway';

export const FLIGHTS_LIST_RECIEVED = 'FLIGHTS_LIST_RECIEVED';

export const flightsListRecieved = flightsList => {
  const action = {
    type: FLIGHTS_LIST_RECIEVED,
    payload: {
      flightsList,
    },
  };
  return action;
};

export const getFlightsList = () => {
  const thunkAction = function (dispatch) {
    flightGateway.fetchDeparturesList().then(flightsListData => {
      dispatch(flightsListRecieved(flightsListData));
    });
  };
  return thunkAction;
};
