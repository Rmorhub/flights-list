import moment from 'moment';
import * as flightGateway from './flightsGateway';

export const GET_FLIGHTS_LIST = 'AIRPORT/SEARCH_FLIGHTS_LIST';

export const getFlightsListData = flightsList => {
  const action = {
    type: GET_FLIGHTS_LIST,
    payload: {
      flightsList,
    },
  };
  return action;
};

export const searchList = (location, formData) => {
  const thunkAction = function (dispatch) {
    if (location.includes('/departures')) {
      flightGateway
        .fetchAirportData()
        .then(data =>
          data.body.departure.filter(el => {
            const elData = moment(new Date(el.timeDepShedule)).format('DD-MM-YYYY');
            const currentCity = el['airportToID.city'].toLowerCase();
            const flightNum = el.codeShareData[0].codeShare.toLowerCase();
            return (
              (flightNum.includes(formData.toLowerCase()) && elData === flightGateway.today) ||
              (currentCity.includes(formData.toLowerCase()) && elData === flightGateway.today)
            );
          }),
        )
        .then(flightsListData => {
          dispatch(getFlightsListData(flightsListData));
        });
    }
    if (location.includes('/arrivals')) {
      flightGateway
        .fetchAirportData()
        .then(data =>
          data.body.arrival.filter(el => {
            const elData = moment(new Date(el.timeToStand)).format('DD-MM-YYYY');
            const currentCity = el['airportFromID.city'].toLowerCase();
            const flightNum = el.codeShareData[0].codeShare.toLowerCase();
            return (
              (flightNum.includes(formData.toLowerCase()) && elData === flightGateway.today) ||
              (currentCity.includes(formData.toLowerCase()) && elData === flightGateway.today)
            );
          }),
        )
        .then(flightsListData => {
          dispatch(getFlightsListData(flightsListData));
        });
    }
  };
  return thunkAction;
};
