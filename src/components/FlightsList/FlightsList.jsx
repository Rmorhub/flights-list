import React, { useState, useEffect } from 'react';
import { Route, Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { showFlights, onLoad } from '../../js/flightsGateway';

import SearchForm from '../SearchForm/SearchForm';
import Flights from '../Flights/Flights';

import * as flightsActions from '../../js/flightsList.actions';
import { btnActivities } from '../../js/flightsStyles';

import './flightsList.scss';

const FlightsList = ({ searchList }) => {
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const searchText = params.get('search');

  const [status, setStatus] = useState(btnActivities.depAct);
  const [input, setInput] = useState('');

  const currentSearch = searchText === null ? '' : `?search=${searchText}`;
  const toDep = `/departures${currentSearch}`;
  const toArr = `/arrivals${currentSearch}`;

  const toggleFlights = () => {
    showFlights(pathname, searchText, input, searchList, setStatus);
  };

  useEffect(() => {
    onLoad(pathname, searchText, toggleFlights, searchList, setStatus);
  }, [pathname]);

  return (
    <main className="main">
      <div className="main-container">
        <SearchForm setStatus={setStatus} setInput={setInput} />
        <div className="main-nav">
          <Link
            to={toDep}
            className={`main-nav_departures main-nav_departures__${status.dep}`}
            onClick={toggleFlights}
          >
            <i className="fas fa-plane-departure" />
            Виліт
          </Link>
          <Link
            to={toArr}
            className={`main-nav_arrivals main-nav_arrivals__${status.arr}`}
            onClick={toggleFlights}
          >
            <i className="fas fa-plane-arrival" />
            Приліт
          </Link>
        </div>
        <div className="main_tabs-container">
          <Route path="/:direction">
            <Flights searchText={searchText} />
          </Route>
        </div>
      </div>
    </main>
  );
};

const mapDispatch = {
  searchList: flightsActions.searchList,
};

export default connect(null, mapDispatch)(FlightsList);
