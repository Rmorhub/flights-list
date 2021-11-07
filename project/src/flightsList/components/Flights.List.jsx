import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Departures from './Departures';
import Arrivals from './Arrivals';
import SearchForm from './SearchForm';

import * as flightsActions from '../flightsList.actions';
import { flightsListSelector } from '../flightsList.selectors';
import { fetchAirportData, departuresFilter, arrivalsFilter } from '../flightsGateway';

const FlightsList = ({ getDeparturesFlightsList, getArrivalsFlightsList }) => {
  const [searchDataDeparture, setSearchDataDeparture] = useState(null);
  const [searchDataArrival, setSearchDataArrival] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');

  useEffect(() => {
    const pathName = window.location.pathname;

    if (pathName === '/departures') {
      getDeparturesFlightsList();
    }

    if (pathName === '/arrivals') {
      getArrivalsFlightsList();
    }

    if (search) {
      fetchAirportData().then(data => {
        setSearchDataDeparture(departuresFilter(data, search));
        setSearchDataArrival(arrivalsFilter(data, search));
      });
    }
  }, []);

  const departureLink = !search ? 'departures' : `departures?search=${search}`;
  const arrivalLink = !search ? 'arrivals' : `arrivals?search=${search}`;

  return (
    <main className="main">
      <h2 className="title">ПОШУК РЕЙСУ</h2>
      <SearchForm
        setSearchDataDeparture={setSearchDataDeparture}
        setSearchDataArrival={setSearchDataArrival}
      />
      <div className="nav-link">
        <Link to={departureLink} className="nav-link-item" onClick={getDeparturesFlightsList}>
          Виліт
        </Link>
        <Link to={arrivalLink} className="nav-link-item" onClick={getArrivalsFlightsList}>
          Приліт
        </Link>
      </div>
      <div className="tabs-container">
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
          <Switch>
            <Route exact path="/departures">
              <Departures searchDataDeparture={searchDataDeparture} />
            </Route>
            <Route path="/arrivals">
              <Arrivals searchDataArrival={searchDataArrival} />
            </Route>
          </Switch>
        </table>
      </div>
    </main>
  );
};

const mapState = state => ({
  flightsList: flightsListSelector(state),
});

const mapDispatch = {
  getDeparturesFlightsList: flightsActions.getDeparturesFlightsList,
  getArrivalsFlightsList: flightsActions.getArrivalsFlightsList,
};

export default connect(mapState, mapDispatch)(FlightsList);
