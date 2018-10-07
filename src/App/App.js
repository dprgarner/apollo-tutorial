import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Profile from '../Profile';
import Organization from '../Organization';
import Navigation from '../Navigation';
import * as routes from '../routes';

import './styles.css';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">React Apollo Tutorial</h1>
        <h2 className="App-subtitle">
          https://www.robinwieruch.de/react-graphql-apollo-tutorial/#react-apollo-client-caching
        </h2>
      </header>
      <Navigation />

      <Route exact path={routes.ORGANIZATION} component={Organization} />
      <Route exact path={routes.PROFILE} component={Profile} />
    </div>
  </Router>
);

export default App;
