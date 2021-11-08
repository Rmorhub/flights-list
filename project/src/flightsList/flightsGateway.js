import moment from 'moment';

const baseUrl = 'https://api.iev.aero/api/flights';

export const today = moment(new Date()).format('DD-MM-YYYY');

export const fetchAirportData = () =>
  fetch(`${baseUrl}/${today}`).then(response => {
    if (response.ok) {
      return response.json();
    }
  });

export const departuresFilter = (data, formData) =>
  data.body.departure.filter(el => {
    const elData = moment(new Date(el.timeDepShedule)).format('DD-MM-YYYY');
    const currentCity = el['airportToID.city'].toLowerCase();
    const flightNum = el.codeShareData[0].codeShare.toLowerCase();
    return (
      (flightNum.includes(formData.toLowerCase()) && elData === today) ||
      (currentCity.includes(formData.toLowerCase()) && elData === today)
    );
  });

export const arrivalsFilter = (data, formData) =>
  data.body.arrival.filter(el => {
    const elData = moment(new Date(el.timeToStand)).format('DD-MM-YYYY');
    const currentCity = el['airportFromID.city'].toLowerCase();
    const flightNum = el.codeShareData[0].codeShare.toLowerCase();
    return (
      (flightNum.includes(formData.toLowerCase()) && elData === today) ||
      (currentCity.includes(formData.toLowerCase()) && elData === today)
    );
  });

export const checkStatus = (status, time) => {
  if (status === 'FR') return 'В польоті';
  if (status === 'ON') return 'Вчасно';
  if (status === 'LN') return `Прибув ${moment(new Date(time)).format('H:mm')}`;
  if (status === 'CK') return 'Реєстрація';
  if (status === 'CC') return 'Реєстрація закінчена';
  if (status === 'BD') return 'Посадка';
  if (status === 'GC') return 'Посадка закінчена';
  if (status === 'DP' && !time) {
    return 'Вилетів';
  } else {
    return `Вилетів о ${moment(new Date(time)).format('H:mm')}`;
  }
};

export const timeFormatter = time => moment(new Date(time)).format('H:mm');

