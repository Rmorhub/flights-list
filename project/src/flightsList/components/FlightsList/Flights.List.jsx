import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Departures from '../Departures/Departures';
import Arrivals from '../Arrivals/Arrivals';
import SearchForm from '../SearchForm/SearchForm';

import * as flightsActions from '../../flightsList.actions';
import { fetchAirportData, departuresFilter, arrivalsFilter } from '../../flightsGateway';

import './flightsList.scss';

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
      <div className="main-container">
        <SearchForm
          setSearchDataDeparture={setSearchDataDeparture}
          setSearchDataArrival={setSearchDataArrival}
        />
        <div className="main-nav">
          <Link
            to={departureLink}
            className="main-nav_departures"
            onClick={getDeparturesFlightsList}
          >
            <i className="fas fa-plane-departure" />
            Виліт
          </Link>

          <Link to={arrivalLink} className="main-nav_arrivals" onClick={getArrivalsFlightsList}>
            <i className="fas fa-plane-arrival" />
            Приліт
          </Link>
        </div>
        <div className="main_tabs-container">
          <Switch>
            <Route exact path="/departures">
              <Departures searchDataDeparture={searchDataDeparture} />
            </Route>
            <Route path="/arrivals">
              <Arrivals searchDataArrival={searchDataArrival} />
            </Route>
          </Switch>
        </div>
      </div>
    </main>
  );
};

const mapDispatch = {
  getDeparturesFlightsList: flightsActions.getDeparturesFlightsList,
  getArrivalsFlightsList: flightsActions.getArrivalsFlightsList,
};

export default connect(null, mapDispatch)(FlightsList);
