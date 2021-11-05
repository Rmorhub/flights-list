import React, { useState } from 'react';
import { connect } from 'react-redux';

import { fetchAirportData, departuresFilter, arrivalsFilter } from '../flightsGateway';
import { flightsListSelector } from '../flightsList.selectors';

const SearchForm = ({ setSearchDataDeparture, setSearchDataArrival, flightsList }) => {
  const [formData, setFormData] = useState('');

  const hanndleChange = event => {
    setFormData(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetchAirportData().then(data => {
      setSearchDataDeparture(departuresFilter(data, formData));
      setSearchDataArrival(arrivalsFilter(data, formData));
    });
  };

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Номер рейсу або місто" onChange={hanndleChange} />
      <button type="submit">Знайти</button>
    </form>
  );
};

const mapState = state => ({
  flightsList: flightsListSelector(state),
});

export default connect(mapState)(SearchForm);
