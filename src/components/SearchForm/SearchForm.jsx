import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import './searchForm.scss';

import * as flightsActions from '../../js/flightsList.actions';

const SearchForm = ({ searchList, setInput }) => {
  const [inputText, setInputText] = useState('');

  const history = useHistory();
  const { pathname, search } = useLocation();

  const hanndleChange = event => {
    setInputText(event.target.value);
  };

  const params = new URLSearchParams(search);
  const searchText = params.get('search');

  const handleSubmit = event => {
    event.preventDefault();
    setInput(inputText);
    searchList(pathname, inputText);
    const defaultLink = pathname !== '/' ? pathname : '/departures';
    const link = inputText ? `${defaultLink}?search=${inputText}` : pathname;
    history.push(link);
  };

  useEffect(() => {
    if (searchText) {
      setInputText(searchText);
    }
  }, [pathname]);

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

const mapDispatch = {
  searchList: flightsActions.searchList,
};

export default connect(null, mapDispatch)(SearchForm);
