import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FlightsList from '../src/flightsList/components/FlightsList/FlightsList';

import store from './store';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={FlightsList} />
      </Switch>
    </Provider>
  </BrowserRouter>
);
export default App;
