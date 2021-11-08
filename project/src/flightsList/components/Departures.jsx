import React from 'react';
import { connect } from 'react-redux';

import NotFound from './NotFound';

import { checkStatus, timeFormatter } from '../flightsGateway';
import { flightsListSelector } from '../flightsList.selectors';

const Departures = ({ searchDataDeparture, flightsList }) => {
  const flights = searchDataDeparture ?? flightsList;
  const notFound = searchDataDeparture !== null ? <NotFound /> : null;

  const params = new URLSearchParams(window.location.search);
  const searchText = params.get('search');

  if (searchText && !searchDataDeparture && flightsList) {
    return null;
  }

  return (
    <table className="flights">
      <thead className="flights-nav">
        <tr>
          <th className="flights-nav_item">Термінал</th>
          <th className="flights-nav_item">Розклад</th>
          <th className="flights-nav_item">Напрямок</th>
          <th className="flights-nav_item">Статус</th>
          <th className="flights-nav_item">Авіакомпанія</th>
          <th className="flights-nav_item">Рейс</th>
        </tr>
      </thead>
      {flights.length
        ? flights.map(el => {
            const { term, timeDepShedule, timeTakeofFact, status } = el;
            const city = el['airportToID.city'];
            const airlineCompany = el.airline.en.name;
            const flightNum = el.codeShareData[0].codeShare;
            const logo = el.codeShareData[0].airline.en.logoSmallName;

            return (
              <tbody key={el.ID} className="flight-list">
                <tr>
                  <td className="flight-list_item">
                    <span>{term}</span>
                  </td>
                  <td className="flight-list_item">{timeFormatter(timeDepShedule)}</td>
                  <td className="flight-list_item">{city}</td>
                  <td className="flight-list_item">{checkStatus(status, timeTakeofFact)}</td>
                  <td className="flight-list_item">
                    <div className="flight-list_item-box">
                      <img src={logo} alt={airlineCompany} className="flight-img" />
                      <span>{airlineCompany}</span>
                    </div>
                  </td>
                  <td className="flight-list_item">{flightNum}</td>
                </tr>
              </tbody>
            );
          })
        : notFound}
    </table>
  );
};

const mapState = state => ({
  flightsList: flightsListSelector(state),
});

export default connect(mapState)(Departures);
