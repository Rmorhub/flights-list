import React, { useState } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Departures from './Departures';
import Arrivals from './Arrivals';
import * as flightsActions from '../flightsList.actions';
import { flightsListSelector } from '../flightsList.selectors';
import { fetchAirportData } from '../flightsGateway';

const today = moment(new Date()).format('DD-MM-YYYY');

const FlightsList = ({ getDeparturesFlightsList, getArrivalsFlightsList, flightsList }) => {
  const [formData, setFormData] = useState();

  const [searchDataDeparture, setSearchDataDeparture] = useState([]);
  const [searchDataArrival, setSearchDataArrival] = useState([]);

  const hanndleChange = event => {
    setFormData(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('state', flightsList);

    fetchAirportData().then(data => {
      setSearchDataDeparture(
        data.body.departure.filter(el => {
          const elData = moment(new Date(el.actual)).format('DD-MM-YYYY');
          const currentCity = el['airportToID.city'].toLowerCase();
          const flightNum = el.codeShareData[0].codeShare.toLowerCase();
          return (
            (flightNum === formData && elData === today) ||
            (currentCity === formData && elData === today)
          );
        }),
      );

      setSearchDataArrival(
        data.body.arrival.filter(el => {
          const elData = moment(new Date(el.actual)).format('DD-MM-YYYY');
          const currentCity = el['airportFromID.city'].toLowerCase();
          const flightNum = el.codeShareData[0].codeShare.toLowerCase();
          return (
            (flightNum === formData && elData === today) ||
            (currentCity === formData && elData === today)
          );
        }),
      );
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
