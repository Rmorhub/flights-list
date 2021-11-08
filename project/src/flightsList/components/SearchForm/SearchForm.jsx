import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './searchForm.scss';

import { fetchAirportData, departuresFilter, arrivalsFilter } from '../../flightsGateway';

const SearchForm = ({ setSearchDataDeparture, setSearchDataArrival }) => {
  const history = useHistory();
  const [inputText, setInputText] = useState('');

  const hanndleChange = event => {
    setInputText(event.target.value);
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
    <div className="form">
      <div className="form-container">
        <h2 className="form-title">ПОШУК РЕЙСУ</h2>
        <form className="form-application" onSubmit={handleSubmit}>
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Номер рейсу або місто"
            className="form_search-input"
            value={inputText}
            onChange={hanndleChange}
          />

          <button className="form_search-btn" type="submit">
            Знайти
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
