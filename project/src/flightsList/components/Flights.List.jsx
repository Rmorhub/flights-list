import React, { useState } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Departures from './Departures';
import Arrivals from './Arrivals';

import { fetchAirportData, departuresFilter, arrivalsFilter } from '../flightsGateway';
import * as flightsActions from '../flightsList.actions';
import { flightsListSelector } from '../flightsList.selectors';

const FlightsList = ({ getDeparturesFlightsList, getArrivalsFlightsList, flightsList }) => {
  const [formData, setFormData] = useState();

  const [searchDataDeparture, setSearchDataDeparture] = useState(null);
  const [searchDataArrival, setSearchDataArrival] = useState(null);

  const hanndleChange = event => {
    setFormData(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(flightsList);

    fetchAirportData().then(data => {
      setSearchDataDeparture(departuresFilter(data, formData));
      setSearchDataArrival(arrivalsFilter(data, formData));
    });
  };

  return (
    <BrowserRouter>
      <main className="main">
        <h2 className="title">ПОШУК РЕЙСУ</h2>
        <form action="" className="form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Номер рейсу або місто" onChange={hanndleChange} />
          <button type="submit">Знайти</button>
        </form>
        <div className="nav-link">
          <Link to="/departures" className="nav-link-item" onClick={getDeparturesFlightsList}>
            Виліт
          </Link>
          <Link to="/arrivals" className="nav-link-item" onClick={getArrivalsFlightsList}>
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
    </BrowserRouter>
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
