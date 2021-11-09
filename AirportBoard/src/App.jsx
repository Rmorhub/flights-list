import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import FlightsList from '../src/flightsList/components/FlightsList/Flights.List';

import store from './store';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Route path="/">
        <FlightsList />
      </Route>
    </Provider>
  </BrowserRouter>
);
export default App;