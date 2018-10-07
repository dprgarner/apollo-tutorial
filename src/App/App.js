import React from 'react';
import logo from './logo.svg';

import Profile from '../Profile';

import './styles.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">React Apollo Tutorial</h1>
      <h2 className="App-subtitle">
        https://www.robinwieruch.de/react-graphql-apollo-tutorial/#react-apollo-client-caching
      </h2>
    </header>

    <Profile />
  </div>
);

export default App;
