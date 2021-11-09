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
    <div className="main_search">
      <div className="main_search-container">
        <h2 className="main_search-title">ПОШУК РЕЙСУ</h2>
        <form className="main_search-application" onSubmit={handleSubmit}>
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Номер рейсу або місто"
            className="main_search-input"
            value={inputText}
            onChange={hanndleChange}
          />

          <button className="main_search-btn" type="submit">
            Знайти
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
