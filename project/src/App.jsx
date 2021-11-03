import React from 'react';
import { Provider } from 'react-redux';
import FlightsList from './flightsList/components/Flights.List';
import store from './store';

const App = () => (
  <Provider store={store}>
    <FlightsList />
  </Provider>
);
export default App;
