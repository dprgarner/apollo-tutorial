import React from 'react';
import { Route, Link } from 'react-router-dom';

import * as routes from '../routes';
import OrganizationSearch from '../OrganizationSearch';

import './styles.css';

const Navigation = props => (
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

    <Route>
      {({ location }) =>
        location.pathname === routes.ORGANIZATION && (
          <div className="Navigation-link-wrapper">
            <OrganizationSearch
              name={props.organizationName}
              onSearch={props.onSearchOrganization}
            />
          </div>
        )
      }
    </Route>
  </header>
);

export default Navigation;
