import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchAirportData, departuresFilter, arrivalsFilter } from '../flightsGateway';

const SearchForm = ({ setSearchDataDeparture, setSearchDataArrival }) => {
  const history = useHistory();
  const [inputText, setInputText] = useState('');

  const hanndleChange = event => {
    setInputText(event.target.value.toLowerCase());
  };

  const params = new URLSearchParams(window.location.search);
  const searchText = params.get('search');

  useEffect(() => {
    if (searchText) {
      setInputText(searchText);
    }
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const pathName = window.location.pathname;

    const defaultLink = pathName !== '/' ? pathName : '/departures';
    const link = inputText ? `${defaultLink}?search=${inputText}` : pathName;

    fetchAirportData().then(data => {
      setSearchDataDeparture(departuresFilter(data, inputText));
      setSearchDataArrival(arrivalsFilter(data, inputText));
    });

    history.push(link);
  };

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Номер рейсу або місто"
        value={inputText}
        onChange={hanndleChange}
      />
      <button type="submit">Знайти</button>
    </form>
  );
};

export default SearchForm;
