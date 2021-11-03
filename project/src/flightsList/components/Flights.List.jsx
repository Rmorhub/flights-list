import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Departures from './Departures';
import Arrivals from './Arrivals';
import * as flightsActions from '../flightsList.actions';

const FlightsList = ({ getFlightsList }) => (
  <BrowserRouter>
    <main className="main">
      <h2 className="title">ПОШУК РЕЙСУ</h2>
      <form action="" className="form">
        <input type="text" placeholder="Номер рейсу або місто" />
        <button type="submit">Знайти</button>
      </form>
      <div className="nav-link">
        <Link to="/departures" className="nav-link-item" onClick={getFlightsList}>
          Виліт
        </Link>
        <Link to="/arrivals" className="nav-link-item">
          Приліт
        </Link>
      </div>
      <Switch>
        <Route exact path="/departures" component={Departures} />
        <Route path="/arrivals" component={Arrivals} />
      </Switch>
    </main>
  </BrowserRouter>
);

const mapDispatch = {
  getFlightsList: flightsActions.getFlightsList,
};

export default connect(null, mapDispatch)(FlightsList);
