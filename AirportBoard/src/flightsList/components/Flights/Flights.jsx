import React from 'react';
import { connect } from 'react-redux';

import NotFound from '../NotFound/NotFound';

import { checkStatus, timeFormatter } from '../../flightsGateway';
import { flightsListSelector } from '../../flightsList.selectors';
import { terminalStyles } from '../../flightsStyles';

import './flights.scss';

const Flights = ({ searchData, flightsList }) => {
  const flights = searchData ?? flightsList;
  const notFound = searchData !== null ? <NotFound /> : null;

  const params = new URLSearchParams(window.location.search);
  const searchText = params.get('search');

  const flightDirection = window.location.pathname.includes('/departure')
    ? 'Напрямок'
    : 'Прилітає з';

  if (searchText && !searchData && flightsList) {
    return null;
  }

  const displayTable = flights.length ? null : { display: 'none' };

  return (
    <table className="flight">
      <thead className="flight-nav" style={displayTable}>
        <tr>
          <th className="flight-nav_item__term">Термінал</th>
          <th className="flight-nav_item">Розклад</th>
          <th className="flight-nav_item">{flightDirection}</th>
          <th className="flight-nav_item">Статус</th>
          <th className="flight-nav_item">Авіакомпанія</th>
          <th className="flight-nav_item">Рейс</th>
        </tr>
      </thead>
      {flights.length
        ? flights.map(el => {
            const { term, timeDepShedule, timeTakeofFact, status, timeToStand, timeLandFact } = el;
            const cityDep = el['airportToID.city'];
            const cityArr = el['airportFromID.city'];
            const airlineCompany = el.airline.ua.name;
            const flightNum = el.codeShareData[0].codeShare;
            const logo = el.codeShareData[0].airline.en.logoSmallName;
            const timeLandOrDep = cityDep ? timeTakeofFact : timeLandFact;

            return (
              <tbody key={el.ID} className="flight-list">
                <tr>
                  <td className="flight-list_item__term">
                    <span className="flight-list_item__term-skin" style={terminalStyles(term)}>
                      {term}
                    </span>
                  </td>
                  <td className="flight-list_item">
                    {timeFormatter(timeDepShedule || timeToStand)}
                  </td>
                  <td className="flight-list_item">{cityDep || cityArr}</td>
                  <td className="flight-list_item">{checkStatus(status, timeLandOrDep)}</td>
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

export default connect(mapState)(Flights);
