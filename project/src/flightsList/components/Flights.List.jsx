import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Departures from './Departures';
import Arrivals from './Arrivals';
import SearchForm from './SearchForm';

import * as flightsActions from '../flightsList.actions';
import { fetchAirportData, departuresFilter, arrivalsFilter } from '../flightsGateway';

const FlightsList = ({ getDeparturesFlightsList, getArrivalsFlightsList }) => {
  const [searchDataDeparture, setSearchDataDeparture] = useState(null);
  const [searchDataArrival, setSearchDataArrival] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const searchText = params.get('search');

  useEffect(() => {
    const pathName = window.location.pathname;

    if (pathName === '/departures') {
      getDeparturesFlightsList();
    }

    if (pathName === '/arrivals') {
      getArrivalsFlightsList();
    }

    if (searchText) {
      fetchAirportData().then(data => {
        setSearchDataDeparture(departuresFilter(data, searchText));
        setSearchDataArrival(arrivalsFilter(data, searchText));
      });
    }
  }, []);

  const departureLink = !searchText ? 'departures' : `departures?search=${searchText}`;
  const arrivalLink = !searchText ? 'arrivals' : `arrivals?search=${searchText}`;

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
        <Switch>
          <Route exact path="/departures">
            <Departures searchDataDeparture={searchDataDeparture} />
          </Route>
          <Route path="/arrivals">
            <Arrivals searchDataArrival={searchDataArrival} />
          </Route>
        </Switch>
      </div>
    </main>
  );
};

const mapDispatch = {
  getDeparturesFlightsList: flightsActions.getDeparturesFlightsList,
  getArrivalsFlightsList: flightsActions.getArrivalsFlightsList,
};

export default connect(null, mapDispatch)(FlightsList);
