import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../routes';

import './styles.css';

const Navigation = () => (
  <header className="Navigation">
    <div className="Navigation-link-wrapper">
      <Link className="Navigation-link" to={routes.PROFILE}>
        Profile
      </Link>
    </div>
    <div className="Navigation-link-wrapper">
      <Link className="Navigation-link" to={routes.ORGANIZATION}>
        Organisation
      </Link>
    </div>
  </header>
);

export default Navigation;
