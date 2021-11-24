import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchForm from '../SearchForm/SearchForm';
import Flights from '../Flights/Flights';

import * as flightsActions from '../../flightsList.actions';
import { fetchAirportData, departuresFilter, arrivalsFilter } from '../../flightsGateway';

import './flightsList.scss';

const FlightsList = ({ getDeparturesFlightsList, getArrivalsFlightsList }) => {
  const [searchDataDeparture, setSearchDataDeparture] = useState(null);
  const [searchDataArrival, setSearchDataArrival] = useState(null);

  const [depStatus, setDepStatus] = useState('active');
  const [arrStatus, setArrStatus] = useState('disabled');

  const params = new URLSearchParams(window.location.search);
  const searchText = params.get('search');

  const departureLink = !searchText ? 'departures' : `departures?search=${searchText}`;
  const arrivalLink = !searchText ? 'arrivals' : `arrivals?search=${searchText}`;

  useEffect(() => {
    const pathName = window.location.pathname;

    if (pathName === '/departures') {
      getDeparturesFlightsList();
      setDepStatus('active');
      setArrStatus('disabled');
    }

    if (pathName === '/arrivals') {
      getArrivalsFlightsList();
      setDepStatus('disabled');
      setArrStatus('active');
    }

    if (searchText) {
      fetchAirportData().then(data => {
        setSearchDataDeparture(departuresFilter(data, searchText));
        setSearchDataArrival(arrivalsFilter(data, searchText));
      });
    }
  }, []);

  const depTheme = event => {
    if (!event.target.className.includes('active')) {
      setArrStatus('disabled');
      setDepStatus('active');
    }
  };

  const arrTheme = event => {
    if (!event.target.className.includes('active')) {
      setArrStatus('active');
      setDepStatus('disabled');
    }
  };

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
            className={`main-nav_departures main-nav_departures__${depStatus}`}
            onClick={getDeparturesFlightsList}
            onClickCapture={event => depTheme(event)}
          >
            <i className="fas fa-plane-departure" />
            Виліт
          </Link>
          <Link
            to={arrivalLink}
            className={`main-nav_arrivals main-nav_arrivals__${arrStatus}`}
            onClick={getArrivalsFlightsList}
            onClickCapture={event => arrTheme(event)}
          >
            <i className="fas fa-plane-arrival" />
            Приліт
          </Link>
        </div>
        <div className="main_tabs-container">
          <Switch>
            <Route exact path="/departures">
              <Flights searchData={searchDataDeparture} />
            </Route>
            <Route path="/arrivals">
              <Flights searchData={searchDataArrival} />
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
