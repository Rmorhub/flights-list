import React from 'react';
import { connect } from 'react-redux';

import NotFound from '../NotFound/NotFound';

import { checkStatus, timeFormatter } from '../../flightsGateway';
import { flightsListSelector } from '../../flightsList.selectors';

import './arrivals.scss';

const Arrivals = ({ searchDataArrival, flightsList }) => {
  const flights = searchDataArrival ?? flightsList;
  const notFound = searchDataArrival !== null ? <NotFound /> : null;

  const params = new URLSearchParams(window.location.search);
  const searchText = params.get('search');

  if (searchText && !searchDataArrival && flightsList) {
    return null;
  }
  return (
    <table className="flight">
      <thead className="flight-nav">
        <tr>
          <th className="flight-nav_item__term">Термінал</th>
          <th className="flight-nav_item">Розклад</th>
          <th className="flight-nav_item">Прилітає з</th>
          <th className="flight-nav_item">Статус</th>
          <th className="flight-nav_item">Авіакомпанія</th>
          <th className="flight-nav_item">Рейс</th>
        </tr>
      </thead>
      {flights.length
        ? flights.map(el => {
            const { term, timeToStand, timeLandFact, status } = el;
            const city = el['airportFromID.city'];
            const airlineCompany = el.airline.ua.name;
            const flightNum = el.codeShareData[0].codeShare;
            const logo = el.codeShareData[0].airline.en.logoSmallName;

            return (
              <tbody key={el.ID} className="flight-list">
                <tr>
                  <td className="flight-list_item__term">
                    <span className="flight-list_item__term-skin">{term}</span>
                  </td>
                  <td className="flight-list_item">{timeFormatter(timeToStand)}</td>
                  <td className="flight-list_item">{city}</td>
                  <td className="flight-list_item">{checkStatus(status, timeLandFact)}</td>
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

export default connect(mapState)(Arrivals);
