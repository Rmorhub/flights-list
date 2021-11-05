import React, { useState } from 'react';

import { fetchAirportData, departuresFilter, arrivalsFilter } from '../flightsGateway';

const SearchForm = ({ setSearchDataDeparture, setSearchDataArrival }) => {
  const [formData, setFormData] = useState();

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

export default SearchForm;
