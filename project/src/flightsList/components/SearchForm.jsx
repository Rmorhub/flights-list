import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchAirportData, departuresFilter, arrivalsFilter, pathName } from '../flightsGateway';

const SearchForm = ({ setSearchDataDeparture, setSearchDataArrival }) => {
  const history = useHistory();
  const [formData, setFormData] = useState('');

  const hanndleChange = event => {
    setFormData(event.target.value.toLowerCase());
  };

  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');

  useEffect(() => {
    if (search) {
      setFormData(search);
    }
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    const defaultLink = pathName !== '/' ? pathName : '/departures';
    const link = formData ? `${defaultLink}?search=${formData}` : pathName;

    fetchAirportData().then(data => {
      setSearchDataDeparture(departuresFilter(data, formData));
      setSearchDataArrival(arrivalsFilter(data, formData));
    });

    history.push(link);
  };

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Номер рейсу або місто"
        value={formData}
        onChange={hanndleChange}
      />
      <button type="submit">Знайти</button>
    </form>
  );
};

export default SearchForm;
