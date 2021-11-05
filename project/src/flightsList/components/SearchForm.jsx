import React, { useState } from 'react';

const SearchForm = () => {
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
    <form action="" className="form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Номер рейсу або місто" onChange={hanndleChange} />
      <button type="submit">Знайти</button>
    </form>
  );
};

export default SearchForm;
