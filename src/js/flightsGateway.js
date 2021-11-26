import moment from 'moment';
import { btnActivities } from './flightsStyles';

const baseUrl = 'https://api.iev.aero/api/flights';

export const today = moment(new Date()).format('DD-MM-YYYY');

export const fetchAirportData = () =>
  fetch(`${baseUrl}/${today}`).then(response => {
    if (response.ok) {
      return response.json();
    }
  });

export const checkStatus = (status, time) => {
  if (status === 'FR') return 'В польоті';
  if (status === 'ON') return 'Вчасно';
  if (status === 'LN') return `Прибув ${moment(new Date(time)).format('H:mm')}`;
  if (status === 'CK') return 'Реєстрація';
  if (status === 'CC') return 'Реєстрація закінчена';
  if (status === 'DL') return 'Затримується';
  if (status === 'BD') return 'Посадка';
  if (status === 'GC') return 'Посадка закінчена';
  if (status === 'DP' && !time) {
    return 'Вилетів';
  } else {
    return `Вилетів о ${moment(new Date(time)).format('H:mm')}`;
  }
};

export const timeFormatter = time => moment(new Date(time)).format('H:mm');

export const showFlights = (pathname, searchText, input, searchList, setStatus) => {
  if (pathname === '/arrivals' && searchText) {
    searchList(pathname, searchText);
    setStatus(btnActivities.arrAct);
  }
  if (pathname === '/arrivals' && !searchText) {
    searchList(pathname, input);
    setStatus(btnActivities.arrAct);
  }

  if (pathname === '/departures' && searchText) {
    searchList(pathname, searchText);
    setStatus(btnActivities.depAct);
  }
  if (pathname === '/departures' && !searchText) {
    searchList(pathname, input);
    setStatus(btnActivities.depAct);
  }
};

export const onLoad = (path, searchText, toggleFlights, searchList, setStatus) => {
  if (path === '/departures' && !searchText) toggleFlights();
  if (path === '/arrivals' && !searchText) toggleFlights();
  if (path === '/departures' && searchText) {
    searchList(path, searchText);
    setStatus(btnActivities.depAct);
  }
  if (path === '/arrivals' && searchText) {
    searchList(path, searchText);
    setStatus(btnActivities.arrAct);
  }
};
