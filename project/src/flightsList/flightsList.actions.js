import moment from 'moment';
import * as flightGateway from './flightsGateway';

export const DEPARTURES_FLIGHTS_LIST = 'AIRPORT/DEPARTURES_FLIGHTS_LIST';
export const ARRIVALS_FLIGHTS_LIST = 'AIRPORT/ARRIVALS_FLIGHTS_LIST';

export const departuresFlightsList = flightsList => {
  const action = {
    type: DEPARTURES_FLIGHTS_LIST,
    payload: {
      flightsList,
    },
  };
  return action;
};

export const arrivalsFlightsList = flightsList => {
  const action = {
    type: ARRIVALS_FLIGHTS_LIST,
    payload: {
      flightsList,
    },
  };
  return action;
};

export const getDeparturesFlightsList = () => {
  const thunkAction = function (dispatch) {
    flightGateway
      .fetchAirportData()
      .then(data =>
        data.body.departure.filter(
          el => moment(new Date(el.timeDepExpectCalc)).format('DD-MM-YYYY') === flightGateway.today,
        ),
      )
      .then(flightsListData => {
        dispatch(departuresFlightsList(flightsListData));
      });
  };
  return thunkAction;
};

export const getArrivalsFlightsList = () => {
  const thunkAction = function (dispatch) {
    flightGateway
      .fetchAirportData()
      .then(data =>
        data.body.arrival.filter(
          el => moment(new Date(el.timeLandCalc)).format('DD-MM-YYYY') === flightGateway.today,
        ),
      )
      .then(flightsListData => {
        dispatch(arrivalsFlightsList(flightsListData));
      });
  };
  return thunkAction;
};
