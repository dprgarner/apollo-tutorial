import React from 'react';

import './styles.css';

const ErrorMessage = ({ error }) => (
  <div className="ErrorMessage">
    <pre>{error.toString()}</pre>
  </div>
);

export default ErrorMessage;
