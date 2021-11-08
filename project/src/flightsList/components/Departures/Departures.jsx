import React from 'react';
import { connect } from 'react-redux';

import NotFound from '../NotFound/NotFound';

import { checkStatus, timeFormatter } from '../../flightsGateway';
import { flightsListSelector } from '../../flightsList.selectors';

import './departures.scss';

const Departures = ({ searchDataDeparture, flightsList }) => {
  const flights = searchDataDeparture ?? flightsList;
  const notFound = searchDataDeparture !== null ? <NotFound /> : null;

  const params = new URLSearchParams(window.location.search);
  const searchText = params.get('search');

  if (searchText && !searchDataDeparture && flightsList) {
    return null;
  }

  const displayTable = flights.length ? null : { display: 'none' };

  return (
    <table className="flight">
      <thead className="flight-nav" style={displayTable}>
        <tr>
          <th className="flight-nav_item__term">Термінал</th>
          <th className="flight-nav_item">Розклад</th>
          <th className="flight-nav_item">Напрямок</th>
          <th className="flight-nav_item">Статус</th>
          <th className="flight-nav_item">Авіакомпанія</th>
          <th className="flight-nav_item">Рейс</th>
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
                  <td className="flight-list_item__term">
                    <span className="flight-list_item__term-skin">{term}</span>
                  </td>
                  <td className="flight-list_item">{timeFormatter(timeDepShedule)}</td>
                  <td className="flight-list_item">{city}</td>
                  <td className="flight-list_item">{checkStatus(status, timeTakeofFact)}</td>
                  <td className="flight-list_item">
                    <div className="flight-list_item__box">
                      <img src={logo} alt={airlineCompany} className="flight-list_item__logo" />
                      <span className="flight-list_item__company">{airlineCompany}</span>
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
