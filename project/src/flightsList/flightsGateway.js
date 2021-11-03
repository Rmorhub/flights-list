import moment from 'moment';

const baseUrl = 'https://api.iev.aero/api/flights/03-11-2021'; // после флайтс сегодняшняя дата в формате 10-02-2020
const logoUrl = 'https://api.iev.aero/';

export const fetchDeparturesList = () =>
  fetch(baseUrl)
    .then(responce => {
      if (responce.ok) {
        return responce.json();
      }
    })
    .then(data => {
      const flightsList = data.body.departure.filter(
        el =>
          moment(new Date(el.timeDepExpectCalc)).format('MMM DD YYYY') ===
          moment(new Date()).format('MMM DD YYYY'),
      );

      console.log('departures', flightsList);
      return flightsList;
    });

export const fetchArrivalsList = () => {
  fetch(baseUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      const flightsList = data.body.arrival.filter(
        el =>
          moment(new Date(el.timeLandCalc)).format('MMM DD YYYY') ===
          moment(new Date()).format('MMM DD YYYY'),
      );
      console.log('arrivals', flightsList);
      return flightsList;
    });
};
